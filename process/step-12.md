# Step 12: React Native Wrapper - ProxyBleManager Implementation

## Objective
Implement the ProxyBleManager class that mimics react-native-ble-plx API and communicates with the Swift server via HTTP and WebSocket.

## Prerequisites
- Step 11: Project setup and platform detection
- Step 10: WebSocket server working
- Step 9: HTTP endpoints working
- Understanding of react-native-ble-plx API

## Technical Details

### ProxyClient.ts
```typescript
import BleProxy from './generated';

export class ProxyClient {
  private baseUrl: string;
  private ws: WebSocket | null = null;
  private eventHandlers: Map<string, Set<(data: any) => void>> = new Map();

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const wsUrl = this.baseUrl.replace('http://', 'ws://').replace('https://', 'wss://');
      this.ws = new WebSocket(`${wsUrl}/v1/events`);
      this.ws.binaryType = 'arraybuffer';

      this.ws.onopen = () => resolve();
      this.ws.onerror = (error) => reject(error);
      this.ws.onmessage = (event) => this.handleMessage(event);
      this.ws.onclose = () => this.handleClose();
    });
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const buffer = new Uint8Array(event.data);
      const wsEvent = BleProxy.bleproxy.v1.WsEvent.decode(buffer);

      const eventType = wsEvent.event;
      if (!eventType) return;

      const handlers = this.eventHandlers.get(eventType) || new Set();
      handlers.forEach(handler => handler(wsEvent[eventType]));
    } catch (error) {
      console.error('[ProxyClient] Failed to decode event:', error);
    }
  }

  private handleClose(): void {
    console.log('[ProxyClient] WebSocket closed');
    // TODO: Implement reconnection logic
  }

  on(eventType: string, handler: (data: any) => void): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, new Set());
    }
    this.eventHandlers.get(eventType)!.add(handler);
  }

  off(eventType: string, handler: (data: any) => void): void {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  async request<TRequest, TResponse>(
    endpoint: string,
    requestType: any,
    responseType: any,
    data: TRequest
  ): Promise<TResponse> {
    const requestBytes = requestType.encode(data).finish();

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-protobuf',
      },
      body: requestBytes,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const responseBytes = new Uint8Array(await response.arrayBuffer());
    return responseType.decode(responseBytes) as TResponse;
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.eventHandlers.clear();
  }
}
```

### BleProxyManager.ts
```typescript
import {
  BleManager,
  Device,
  State,
  ScanOptions,
  ConnectionOptions,
  Subscription,
} from 'react-native-ble-plx';
import { ProxyClient } from './ProxyClient';
import { PlatformDetector } from './PlatformDetector';
import { BleError, BleErrorCode } from './types';
import BleProxy from './generated';

export class BleProxyManager {
  private client: ProxyClient;
  private currentState: State = State.Unknown;
  private scanListener: ((device: Device) => void) | null = null;

  constructor() {
    this.client = new ProxyClient(PlatformDetector.getProxyUrl());
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Manager state changes
    this.client.on('managerState', (state: any) => {
      this.currentState = this.mapState(state.state);
    });

    // Scan results
    this.client.on('scanResult', (result: any) => {
      if (this.scanListener) {
        const device = this.scanResultToDevice(result);
        this.scanListener(device);
      }
    });

    // Connection events
    this.client.on('peripheralDisconnected', (event: any) => {
      // TODO: Emit disconnection events
    });

    // Characteristic updates
    this.client.on('characteristicValueUpdated', (event: any) => {
      // TODO: Emit monitor callbacks
    });
  }

  private mapState(protoState: number): State {
    const stateMap: { [key: number]: State } = {
      0: State.Unknown,
      1: State.Resetting,
      2: State.Unsupported,
      3: State.Unauthorized,
      4: State.PoweredOff,
      5: State.PoweredOn,
    };
    return stateMap[protoState] || State.Unknown;
  }

  private scanResultToDevice(result: any): Device {
    // Convert protobuf ScanResult to react-native-ble-plx Device
    return {
      id: result.deviceId,
      name: result.localName || null,
      rssi: result.rssi,
      manufacturerData: result.manufacturerData,
      serviceUUIDs: result.serviceUuids,
      // ... other Device properties
    } as Device;
  }

  async state(): Promise<State> {
    await this.client.connect();
    return this.currentState;
  }

  async startDeviceScan(
    serviceUUIDs: string[] | null,
    options: ScanOptions | null,
    listener: (error: BleError | null, device: Device | null) => void
  ): Promise<void> {
    await this.client.connect();

    this.scanListener = (device: Device) => {
      listener(null, device);
    };

    const request = {
      serviceUuids: serviceUUIDs || [],
    };

    try {
      await this.client.request(
        '/v1/scan/start',
        BleProxy.bleproxy.v1.StartScanRequest,
        BleProxy.bleproxy.v1.StartScanResponse,
        request
      );
    } catch (error) {
      listener(new BleError(BleErrorCode.ServerError, 'Failed to start scan'), null);
    }
  }

  async stopDeviceScan(): Promise<void> {
    this.scanListener = null;

    await this.client.request(
      '/v1/scan/stop',
      BleProxy.bleproxy.v1.StopScanRequest,
      BleProxy.bleproxy.v1.StopScanResponse,
      {}
    );
  }

  async connectToDevice(
    deviceId: string,
    options?: ConnectionOptions
  ): Promise<Device> {
    const request = { deviceId };

    const response = await this.client.request(
      '/v1/device/connect',
      BleProxy.bleproxy.v1.ConnectRequest,
      BleProxy.bleproxy.v1.ConnectResponse,
      request
    );

    if (!response.success) {
      throw this.protoErrorToBleError(response.error);
    }

    // Return device object (would need to cache device info from scan)
    return { id: deviceId } as Device;
  }

  async cancelDeviceConnection(deviceId: string): Promise<Device> {
    const request = { deviceId };

    const response = await this.client.request(
      '/v1/device/disconnect',
      BleProxy.bleproxy.v1.DisconnectRequest,
      BleProxy.bleproxy.v1.DisconnectResponse,
      request
    );

    if (!response.success) {
      throw this.protoErrorToBleError(response.error);
    }

    return { id: deviceId } as Device;
  }

  async discoverAllServicesAndCharacteristicsForDevice(
    deviceId: string
  ): Promise<Device> {
    const request = { deviceId };

    const response = await this.client.request(
      '/v1/device/discover',
      BleProxy.bleproxy.v1.DiscoverRequest,
      BleProxy.bleproxy.v1.DiscoverResponse,
      request
    );

    if (response.error) {
      throw this.protoErrorToBleError(response.error);
    }

    // Cache services for later queries
    return { id: deviceId } as Device;
  }

  async readCharacteristicForDevice(
    deviceId: string,
    serviceUUID: string,
    characteristicUUID: string
  ): Promise<any> {
    const request = {
      deviceId,
      serviceUuid: serviceUUID,
      characteristicUuid: characteristicUUID,
    };

    const response = await this.client.request(
      '/v1/device/read',
      BleProxy.bleproxy.v1.ReadRequest,
      BleProxy.bleproxy.v1.ReadResponse,
      request
    );

    if (response.error) {
      throw this.protoErrorToBleError(response.error);
    }

    // Return Characteristic object with value
    return {
      uuid: characteristicUUID,
      serviceUUID: serviceUUID,
      deviceID: deviceId,
      value: this.base64Encode(response.value),
    };
  }

  async writeCharacteristicWithResponseForDevice(
    deviceId: string,
    serviceUUID: string,
    characteristicUUID: string,
    valueBase64: string
  ): Promise<any> {
    const request = {
      deviceId,
      serviceUuid: serviceUUID,
      characteristicUuid: characteristicUUID,
      value: this.base64Decode(valueBase64),
      withResponse: true,
    };

    const response = await this.client.request(
      '/v1/device/write',
      BleProxy.bleproxy.v1.WriteRequest,
      BleProxy.bleproxy.v1.WriteResponse,
      request
    );

    if (!response.success) {
      throw this.protoErrorToBleError(response.error);
    }

    return {
      uuid: characteristicUUID,
      serviceUUID: serviceUUID,
      deviceID: deviceId,
    };
  }

  async writeCharacteristicWithoutResponseForDevice(
    deviceId: string,
    serviceUUID: string,
    characteristicUUID: string,
    valueBase64: string
  ): Promise<any> {
    const request = {
      deviceId,
      serviceUuid: serviceUUID,
      characteristicUuid: characteristicUUID,
      value: this.base64Decode(valueBase64),
      withResponse: false,
    };

    const response = await this.client.request(
      '/v1/device/write',
      BleProxy.bleproxy.v1.WriteRequest,
      BleProxy.bleproxy.v1.WriteResponse,
      request
    );

    if (!response.success) {
      throw this.protoErrorToBleError(response.error);
    }

    return {
      uuid: characteristicUUID,
      serviceUUID: serviceUUID,
      deviceID: deviceId,
    };
  }

  monitorCharacteristicForDevice(
    deviceId: string,
    serviceUUID: string,
    characteristicUUID: string,
    listener: (error: BleError | null, characteristic: any | null) => void
  ): Subscription {
    // Set up WebSocket listener for this characteristic
    const key = `${deviceId}:${serviceUUID}:${characteristicUUID}`;

    const handler = (event: any) => {
      if (
        event.deviceId === deviceId &&
        event.serviceUuid === serviceUUID &&
        event.characteristicUuid === characteristicUUID
      ) {
        listener(null, {
          uuid: characteristicUUID,
          serviceUUID: serviceUUID,
          deviceID: deviceId,
          value: this.base64Encode(event.value),
        });
      }
    };

    this.client.on('characteristicValueUpdated', handler);

    return {
      remove: () => {
        this.client.off('characteristicValueUpdated', handler);
      },
    };
  }

  async readRSSIForDevice(deviceId: string): Promise<Device> {
    const request = { deviceId };

    const response = await this.client.request(
      '/v1/device/rssi',
      BleProxy.bleproxy.v1.RSSIRequest,
      BleProxy.bleproxy.v1.RSSIResponse,
      request
    );

    if (response.error) {
      throw this.protoErrorToBleError(response.error);
    }

    return {
      id: deviceId,
      rssi: response.rssi,
    } as Device;
  }

  private protoErrorToBleError(error: any): BleError {
    return new BleError(
      error.code,
      error.message,
      error.message
    );
  }

  private base64Encode(bytes: Uint8Array): string {
    // Convert bytes to base64 (React Native compatible)
    return Buffer.from(bytes).toString('base64');
  }

  private base64Decode(base64: string): Uint8Array {
    return new Uint8Array(Buffer.from(base64, 'base64'));
  }

  destroy(): void {
    this.client.disconnect();
  }
}
```

### Update index.ts
```typescript
import { PlatformDetector } from './PlatformDetector';
import { BleManager } from 'react-native-ble-plx';
import { BleProxyManager } from './BleProxyManager';

export * from './types';

export function createBleManager(): BleManager | BleProxyManager {
  if (PlatformDetector.shouldUseProxy()) {
    console.log('[BLE Proxy] Using proxy server at', PlatformDetector.getProxyUrl());
    return new BleProxyManager() as any; // Cast to satisfy type
  } else {
    console.log('[BLE Proxy] Using native BLE');
    return new BleManager();
  }
}

export { BleManager, BleProxyManager };
```

## Acceptance Criteria
- [ ] BleProxyManager implements all required methods
- [ ] API matches react-native-ble-plx exactly
- [ ] HTTP requests use protobuf encoding
- [ ] WebSocket events are properly decoded
- [ ] Scan listener receives device objects
- [ ] Monitor subscriptions work correctly
- [ ] Base64 encoding/decoding is correct
- [ ] Error conversion from protobuf works
- [ ] Manager state is tracked correctly
- [ ] WebSocket reconnection is handled
- [ ] Memory leaks are prevented (cleanup)

## Testing Instructions
```bash
# Build library
cd /Users/ericfrank/ble_bridge/client
npm run build

# Create test app
npx react-native init BleProxyTest
cd BleProxyTest

# Install dependencies
npm install file:../client
npm install react-native-ble-plx

# Create test component
cat > App.tsx << 'EOF'
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { createBleManager } from 'react-native-ble-proxy';

const App = () => {
  const manager = createBleManager();

  useEffect(() => {
    manager.state().then(state => {
      console.log('BLE State:', state);
    });
  }, []);

  const startScan = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Scan error:', error);
        return;
      }
      console.log('Found device:', device?.name, device?.id);
    });
  };

  const stopScan = () => {
    manager.stopDeviceScan();
  };

  return (
    <View>
      <Text>BLE Proxy Test</Text>
      <Button title="Start Scan" onPress={startScan} />
      <Button title="Stop Scan" onPress={stopScan} />
    </View>
  );
};

export default App;
EOF

# Run in simulator (ensure server is running)
npm run ios
```

## Dependencies
- Step 11: Project setup
- Step 10: WebSocket server
- Step 9: HTTP endpoints
- react-native-ble-plx (peer)
- protobufjs
- Buffer polyfill (for React Native)

## Risks/Blockers
- WebSocket support varies across React Native versions
- Buffer encoding may need polyfill
- Type casting for BleManager interface may be fragile
- Need to cache device/service information from scan/discovery
- Subscription cleanup is critical to prevent memory leaks
- Base64 encoding must match server expectations
- WebSocket reconnection logic is complex
- Error handling must be comprehensive

## Recommended Agent
react-native-library-developer

## Estimated Time
4 hours
