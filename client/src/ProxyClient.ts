// ABOUTME: WebSocket and HTTP client for BLE proxy server communication
// ABOUTME: Handles binary protobuf encoding/decoding for all server interactions

import { bleproxy } from './generated/ble_proxy';
import { BleError, BleErrorCode } from './types';

type EventHandler = (data: any) => void;

export class ProxyClient {
  private ws: WebSocket | null = null;
  private eventHandlers: Map<string, Set<EventHandler>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private baseUrl: string;
  private wsUrl: string;

  constructor(baseUrl: string, wsUrl: string) {
    this.baseUrl = baseUrl;
    this.wsUrl = wsUrl;
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.wsUrl);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = () => {
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onerror = (error) => {
          reject(
            new BleError(
              BleErrorCode.ServerError,
              'Failed to connect to BLE proxy server',
              'WebSocket connection error'
            )
          );
        };

        this.ws.onmessage = (event: any) => {
          this.handleWebSocketMessage(event);
        };

        this.ws.onclose = () => {
          this.handleDisconnect();
        };
      } catch (error) {
        reject(
          new BleError(
            BleErrorCode.ServerError,
            'Failed to create WebSocket connection',
            error instanceof Error ? error.message : String(error)
          )
        );
      }
    });
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.eventHandlers.clear();
  }

  async request<TRequest, TResponse>(
    endpoint: string,
    RequestType: any,
    ResponseType: any,
    data: TRequest
  ): Promise<TResponse> {
    const requestMessage = RequestType.create(data);
    const requestBytes = RequestType.encode(requestMessage).finish();

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-protobuf',
        },
        body: requestBytes,
      });

      if (!response.ok) {
        throw new BleError(
          BleErrorCode.ServerError,
          `HTTP ${response.status}: ${response.statusText}`,
          `Failed to ${endpoint}`
        );
      }

      const responseBytes = new Uint8Array(await response.arrayBuffer());
      const responseMessage = ResponseType.decode(responseBytes);

      if (responseMessage.error) {
        throw this.convertProtoError(responseMessage.error);
      }

      return responseMessage as TResponse;
    } catch (error) {
      if (error instanceof BleError) {
        throw error;
      }
      throw new BleError(
        BleErrorCode.ServerError,
        'Network request failed',
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  on(eventType: string, handler: EventHandler): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, new Set());
    }
    this.eventHandlers.get(eventType)!.add(handler);
  }

  off(eventType: string, handler: EventHandler): void {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.eventHandlers.delete(eventType);
      }
    }
  }

  private handleWebSocketMessage(event: any): void {
    try {
      const bytes = new Uint8Array(event.data);
      const wsEvent = bleproxy.v1.WsEvent.decode(bytes);

      if (wsEvent.managerStateEvent) {
        this.emit('managerState', wsEvent.managerStateEvent);
      } else if (wsEvent.scanResultEvent) {
        this.emit('scanResult', wsEvent.scanResultEvent);
      } else if (wsEvent.peripheralConnectedEvent) {
        this.emit('peripheralConnected', wsEvent.peripheralConnectedEvent);
      } else if (wsEvent.peripheralDisconnectedEvent) {
        this.emit('peripheralDisconnected', wsEvent.peripheralDisconnectedEvent);
      } else if (wsEvent.characteristicValueUpdatedEvent) {
        this.emit('characteristicValueUpdated', wsEvent.characteristicValueUpdatedEvent);
      } else if (wsEvent.serverErrorEvent) {
        this.emit('serverError', wsEvent.serverErrorEvent);
      }
    } catch (error) {
      console.error('[BLE Proxy] Failed to decode WebSocket message:', error);
    }
  }

  private emit(eventType: string, data: any): void {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }

  private handleDisconnect(): void {
    console.warn('[BLE Proxy] WebSocket disconnected');
    this.ws = null;

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
      console.log(`[BLE Proxy] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
      setTimeout(() => {
        this.connect().catch((error) => {
          console.error('[BLE Proxy] Reconnection failed:', error);
        });
      }, delay);
    } else {
      console.error('[BLE Proxy] Max reconnection attempts reached');
      this.emit('serverError', {
        error: {
          code: BleErrorCode.ServerError,
          message: 'WebSocket connection lost',
        },
      });
    }
  }

  private convertProtoError(protoError: bleproxy.v1.IError): BleError {
    const errorCode = protoError.code || BleErrorCode.UnknownError;
    const message = protoError.message || 'Unknown error';
    const reason = protoError.platformError || undefined;

    return new BleError(errorCode, message, reason);
  }
}
