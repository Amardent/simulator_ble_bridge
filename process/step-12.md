# Step 12: React Native Wrapper - ProxyBleManager Implementation

## Objective
Implement the ProxyBleManager class that mimics react-native-ble-plx API and communicates with the Swift server via HTTP and WebSocket.

## Prerequisites
- Step 11: Project setup and platform detection ✅ COMPLETE
- Step 10: WebSocket server working ✅ COMPLETE
- Step 9: HTTP endpoints working ✅ COMPLETE
- Understanding of react-native-ble-plx API

## Step 11 Status
The following infrastructure exists at `/Users/ericfrank/ble_bridge/client/`:
- ✅ package.json, tsconfig.json configured
- ✅ src/PlatformDetector.ts implemented
- ✅ src/types.ts with BleError, BleErrorCode
- ✅ src/index.ts with placeholder (throws error for proxy)
- ✅ src/generated/ with protobuf code
- ✅ Build pipeline working (npm run build)

**Step 12 adds:** ProxyClient.ts, BleProxyManager.ts, and updates index.ts to remove placeholder error.

## Technical Details

### Architecture

**ProxyClient.ts** - WebSocket and HTTP communication layer:
- Manages WebSocket connection to `/v1/events`
- Handles binary protobuf event decoding
- Provides HTTP request/response via fetch
- Event emitter pattern for WebSocket messages
- Methods: `connect()`, `disconnect()`, `request()`, `on()`, `off()`

**BleProxyManager.ts** - react-native-ble-plx API implementation:
- Constructor: Creates ProxyClient, sets up event listeners
- Implements all BleManager methods (scan, connect, read, write, monitor, etc.)
- Maps protobuf types to react-native-ble-plx types
- Manages scan listener and monitor subscriptions
- Base64 encoding/decoding for binary data

**index.ts Update:**
- Replace Step 11 placeholder with `createBleManager()` implementation
- Return `BleProxyManager` for proxy, `BleManager` for native

### Key Implementation Patterns

**WebSocket Setup (CRITICAL):**
```typescript
this.ws = new WebSocket(`${wsUrl}/v1/events`);
this.ws.binaryType = 'arraybuffer';  // REQUIRED for protobuf

this.ws.onmessage = (event: MessageEvent) => {
  const buffer = new Uint8Array(event.data);
  const wsEvent = BleProxy.bleproxy.v1.WsEvent.decode(buffer);
  // Dispatch to registered handlers...
};
```

**HTTP Request Pattern:**
```typescript
async request<TRequest, TResponse>(
  endpoint: string,
  requestType: any,
  responseType: any,
  data: TRequest
): Promise<TResponse> {
  const requestBytes = requestType.encode(data).finish();
  const response = await fetch(`${this.baseUrl}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-protobuf' },
    body: requestBytes,
  });
  const responseBytes = new Uint8Array(await response.arrayBuffer());
  return responseType.decode(responseBytes) as TResponse;
}
```

**Scan Flow (HTTP + WebSocket Hybrid):**
```typescript
async startDeviceScan(serviceUUIDs, options, listener) {
  await this.client.connect();  // WebSocket first
  this.scanListener = listener;

  // HTTP starts scan
  await this.client.request('/v1/scan/start', ...);

  // Results arrive via WebSocket scanResultEvent
}
```

**Monitor Pattern (HTTP + WebSocket):**
```typescript
monitorCharacteristicForDevice(deviceId, serviceUUID, charUUID, listener): Subscription {
  // Enable via HTTP
  await this.client.request('/v1/device/monitor', ..., { enable: true });

  // Listen via WebSocket
  const handler = (event) => { /* filter and call listener */ };
  this.client.on('characteristicValueUpdatedEvent', handler);

  return {
    remove: () => {
      this.client.off('characteristicValueUpdatedEvent', handler);
      // Disable via HTTP
    }
  };
}
```

### Critical WebSocket Integration Details (from Step 10)

**Field Name Mapping:**
- Protobufjs uses **camelCase** in JavaScript (not snake_case from .proto)
- `manager_state_event` → `managerStateEvent`
- `scan_result_event` → `scanResultEvent`
- `device_id` → `deviceID` (all caps ID)
- `service_uuid` → `serviceUuid`

**Device Field Mapping:**
- All protobuf optional fields map to TypeScript optional (`?`)
- Base64 encode: `manufacturerData`, `serviceData` values, characteristic values
- MTU: undefined during scan, available after connection
- Handle all optional fields gracefully (check for undefined)

**Event Types:**
- `managerStateEvent` - Bluetooth adapter state changes
- `scanResultEvent` - Discovered peripherals (contains `device` object)
- `peripheralConnectedEvent` - Connection success
- `peripheralDisconnectedEvent` - Disconnection (may include error)
- `characteristicValueUpdatedEvent` - Notification/indication data

**Error Handling:**
- All responses may include `Bleproxy_V1_Error` with `code` and `message`
- Convert to BleError: `new BleError(error.code, error.message, error.message)`

### File Locations

1. `/Users/ericfrank/ble_bridge/client/src/ProxyClient.ts` (new)
2. `/Users/ericfrank/ble_bridge/client/src/BleProxyManager.ts` (new)
3. `/Users/ericfrank/ble_bridge/client/src/index.ts` (UPDATE - remove placeholder)

## Acceptance Criteria

### Functional Requirements
- [ ] ProxyClient.ts created with WebSocket and HTTP support
- [ ] BleProxyManager.ts implements all react-native-ble-plx methods
- [ ] index.ts updated with working createBleManager()
- [ ] WebSocket uses binary protobuf (binaryType = 'arraybuffer')
- [ ] HTTP requests use protobuf encoding (application/x-protobuf)
- [ ] Scan flow works (HTTP start/stop, WebSocket results)
- [ ] Monitor flow works (HTTP enable/disable, WebSocket values)
- [ ] Device fields mapped correctly (including optional fields)
- [ ] Base64 encoding/decoding for binary data
- [ ] Error conversion from protobuf works

### Non-Functional Requirements
- [ ] Event listeners properly registered/unregistered
- [ ] Memory leaks prevented (cleanup in destroy())
- [ ] TypeScript compiles without errors
- [ ] Package builds successfully (npm run build)

## Testing Instructions

### Build Library
```bash
cd /Users/ericfrank/ble_bridge/client
npm run build  # Should compile all new files
```

### Integration Test
```bash
# Create test app
npx react-native init BleProxyTest
cd BleProxyTest

# Install dependencies
npm install file:../client
npm install react-native-ble-plx

# Create test component (see step-12.md lines 542-580 for App.tsx)
# Run in simulator (ensure server is running)
npm run ios
```

**Expected Behavior:**
1. App detects simulator, uses ProxyBleManager
2. State query returns Bluetooth state
3. Scan discovers peripherals with name, RSSI, isConnectable
4. Stop scan halts discovery

## Dependencies
- Step 11: Project setup ✅
- Step 10: WebSocket server ✅
- Step 9: HTTP endpoints ✅
- react-native-ble-plx (peer dependency)
- protobufjs (dev dependency)

## Risks/Blockers

### Key Risks
1. **WebSocket Binary Type**
   - Mitigation: Always set `binaryType = 'arraybuffer'`
   - Failure mode: Text decoding will fail

2. **Field Name Mapping**
   - Mitigation: Use camelCase consistently (protobufjs convention)
   - Test with real protobuf messages from server

3. **Memory Leaks**
   - Mitigation: Implement destroy() with proper cleanup
   - Remove all event listeners
   - Close WebSocket connection

4. **Type Casting**
   - Mitigation: BleProxyManager cast to BleManager may be fragile
   - Alternative: Use duck typing, accept any BleManager-like object

5. **Buffer Encoding**
   - Mitigation: React Native >=0.70 has Buffer global
   - May need polyfill for older versions

### Edge Cases
- WebSocket disconnect during scan → implement reconnection (not in Step 12)
- Concurrent requests → server handles serialization
- Optional device fields → check for undefined before access
- MTU only available post-connection → return undefined during scan

## Integration Notes

**Step 11 Known Issues (deferred to Step 13):**
- PlatformDetector uses `__DEV__` (fails in release builds)
- PlatformDetector uses `process.env` (doesn't exist in RN runtime)
- These will surface during Step 13 testing and can be fixed then

**WebSocket Reconnection (not implemented):**
- Detect `ws.onclose` event
- Exponential backoff strategy
- Restore subscriptions after reconnect
- Handle in-flight HTTP requests

## Recommended Agent
rn-library-architect (implementing library architecture with HTTP/WebSocket clients)

## Estimated Time
4 hours

## Completion Notes (2025-10-11)

**Status:** ✅ COMPLETE

### Files Created
- `/client/src/ProxyClient.ts` - WebSocket + HTTP client with protobuf support
- `/client/src/BleProxyManager.ts` - Complete BLE Manager API implementation

### Test Results
| Test | Result |
|------|--------|
| Manager State Query | ✅ PoweredOn |
| Device Scanning | ✅ 14 unique devices, 98 events |
| Stop Scan | ✅ HTTP POST succeeded |
| Device Connection | ✅ With workaround |

### API Verification
| Method | Status |
|--------|--------|
| `state()` | ✅ Working |
| `startDeviceScan()` | ✅ Working |
| `stopDeviceScan()` | ✅ Working |
| `connectToDevice()` | ✅ Working (with workaround) |
| `cancelDeviceConnection()` | ✅ Implemented |
| `discoverAllServicesAndCharacteristics()` | ✅ Implemented |
| `readCharacteristicForDevice()` | ✅ Implemented |
| `writeCharacteristic...()` | ✅ Implemented |
| `monitorCharacteristicForDevice()` | ✅ Implemented |
| `readRSSIForDevice()` | ✅ Implemented |
| `destroy()` | ✅ Working |

### Known Issues (Fixed in Server)
Server ConnectResponse was missing device field - fixed via post-callback device fetch pattern to avoid queue deadlock.

### Build Verification
- TypeScript compiles without errors
- HTTP: POST with `Content-Type: application/x-protobuf` working
- WebSocket: Binary mode (arrayBuffer) with protobuf decode working
- camelCase field name conversion working (protobufjs convention)
