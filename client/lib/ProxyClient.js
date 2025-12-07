"use strict";
// ABOUTME: WebSocket and HTTP client for BLE proxy server communication
// ABOUTME: Handles binary protobuf encoding/decoding for all server interactions
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyClient = void 0;
const ble_proxy_1 = require("./generated/ble_proxy");
const types_1 = require("./types");
class ProxyClient {
    constructor(baseUrl, wsUrl) {
        this.ws = null;
        this.eventHandlers = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 3;
        this.baseUrl = baseUrl;
        this.wsUrl = wsUrl;
    }
    async connect() {
        return new Promise((resolve, reject) => {
            try {
                this.ws = new WebSocket(this.wsUrl);
                this.ws.binaryType = 'arraybuffer';
                this.ws.onopen = () => {
                    this.reconnectAttempts = 0;
                    resolve();
                };
                this.ws.onerror = (error) => {
                    reject(new types_1.BleError(types_1.BleErrorCode.ServerError, 'Failed to connect to BLE proxy server', 'WebSocket connection error'));
                };
                this.ws.onmessage = (event) => {
                    this.handleWebSocketMessage(event);
                };
                this.ws.onclose = () => {
                    this.handleDisconnect();
                };
            }
            catch (error) {
                reject(new types_1.BleError(types_1.BleErrorCode.ServerError, 'Failed to create WebSocket connection', error instanceof Error ? error.message : String(error)));
            }
        });
    }
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.eventHandlers.clear();
    }
    async request(endpoint, RequestType, ResponseType, data) {
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
                throw new types_1.BleError(types_1.BleErrorCode.ServerError, `HTTP ${response.status}: ${response.statusText}`, `Failed to ${endpoint}`);
            }
            const responseBytes = new Uint8Array(await response.arrayBuffer());
            const responseMessage = ResponseType.decode(responseBytes);
            if (responseMessage.error) {
                throw this.convertProtoError(responseMessage.error);
            }
            return responseMessage;
        }
        catch (error) {
            if (error instanceof types_1.BleError) {
                throw error;
            }
            throw new types_1.BleError(types_1.BleErrorCode.ServerError, 'Network request failed', error instanceof Error ? error.message : String(error));
        }
    }
    on(eventType, handler) {
        if (!this.eventHandlers.has(eventType)) {
            this.eventHandlers.set(eventType, new Set());
        }
        this.eventHandlers.get(eventType).add(handler);
    }
    off(eventType, handler) {
        const handlers = this.eventHandlers.get(eventType);
        if (handlers) {
            handlers.delete(handler);
            if (handlers.size === 0) {
                this.eventHandlers.delete(eventType);
            }
        }
    }
    handleWebSocketMessage(event) {
        try {
            const bytes = new Uint8Array(event.data);
            const wsEvent = ble_proxy_1.bleproxy.v1.WsEvent.decode(bytes);
            if (wsEvent.managerStateEvent) {
                this.emit('managerState', wsEvent.managerStateEvent);
            }
            else if (wsEvent.scanResultEvent) {
                this.emit('scanResult', wsEvent.scanResultEvent);
            }
            else if (wsEvent.peripheralConnectedEvent) {
                this.emit('peripheralConnected', wsEvent.peripheralConnectedEvent);
            }
            else if (wsEvent.peripheralDisconnectedEvent) {
                this.emit('peripheralDisconnected', wsEvent.peripheralDisconnectedEvent);
            }
            else if (wsEvent.characteristicValueUpdatedEvent) {
                this.emit('characteristicValueUpdated', wsEvent.characteristicValueUpdatedEvent);
            }
            else if (wsEvent.serverErrorEvent) {
                this.emit('serverError', wsEvent.serverErrorEvent);
            }
        }
        catch (error) {
            console.error('[BLE Proxy] Failed to decode WebSocket message:', error);
        }
    }
    emit(eventType, data) {
        const handlers = this.eventHandlers.get(eventType);
        if (handlers) {
            handlers.forEach((handler) => handler(data));
        }
    }
    handleDisconnect() {
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
        }
        else {
            console.error('[BLE Proxy] Max reconnection attempts reached');
            this.emit('serverError', {
                error: {
                    code: types_1.BleErrorCode.ServerError,
                    message: 'WebSocket connection lost',
                },
            });
        }
    }
    convertProtoError(protoError) {
        const errorCode = protoError.code || types_1.BleErrorCode.UnknownError;
        const message = protoError.message || 'Unknown error';
        const reason = protoError.platformError || undefined;
        return new types_1.BleError(errorCode, message, reason);
    }
}
exports.ProxyClient = ProxyClient;
