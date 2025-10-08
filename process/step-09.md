# Step 9: HTTP Server - BLE Operation Endpoints

**Status:** ✅ Complete - 2025-10-07

## Objective
Implement HTTP endpoints for BLE operations (scan, connect, discover, read, write, monitor, RSSI) with protobuf request/response handling.

## Prerequisites
- Step 8: Vapor server and health endpoint (✅ Complete - 2025-10-07)
- Step 7: BLEManager with all operations (✅ Complete - 2025-10-06)
- Understanding of async/await and Vapor's request/response model
- Physical BLE peripheral for integration testing

## Technical Details

**Important:** From Steps 3-8, the following infrastructure is ready:
- ✅ `BLEManager`: All operations with completion callbacks
- ✅ `BLEError.toProto()`: Converts BLE errors to protobuf
- ✅ `Generated` module: All protobuf types (prefix: `Bleproxy_V1_`)
- ✅ Vapor extensions: `Request.decodeProto()`, `Response.proto()`, `Response.error()`
- ✅ Server: 127.0.0.1:5050, application/x-protobuf content-type

### Architecture: Singleton BLEController

**Decision:** Use singleton class (not actor) - BLEManager is already thread-safe via queue.

```swift
final class BLEController {
    static let shared = BLEController()
    private let bleManager: BLEManager

    private init() {
        self.bleManager = BLEManager()
    }

    // Endpoint methods...
}
```

### File Location
`/Users/ericfrank/ble_bridge/server/Sources/BLEProxyServer/Controllers/BLEController.swift`

### Callback → Async/Await Pattern

Use `withCheckedThrowingContinuation` to bridge BLEManager callbacks:

```swift
func connect(_ req: Request) async throws -> Response {
    let request = try req.decodeProto(Bleproxy_V1_ConnectRequest.self)

    guard let deviceId = UUID(uuidString: request.deviceID) else {
        return try Response.error(BLEError(code: .errorInvalidIdentifiers,
                                          message: "Invalid device UUID"))
    }

    return try await withCheckedThrowingContinuation { continuation in
        bleManager.connect(deviceId: deviceId) { result in
            var response = Bleproxy_V1_ConnectResponse()
            switch result {
            case .success:
                response.success = true
            case .failure(let error):
                response.success = false
                response.error = (error as? BLEError)?.toProto() ??
                    BLEError(code: .errorServerError, message: error.localizedDescription).toProto()
            }

            do {
                continuation.resume(returning: try Response.proto(response))
            } catch {
                continuation.resume(throwing: error)
            }
        }
    }
}
```

### Endpoints Implementation

**13 Endpoints to Implement:**

1. **POST /v1/state** - Get Bluetooth adapter state (synchronous)
2. **POST /v1/scan/start** - Start scanning (results via WebSocket in Step 10)
3. **POST /v1/scan/stop** - Stop scanning
4. **POST /v1/device/connect** - Connect to device (60s timeout)
5. **POST /v1/device/disconnect** - Disconnect device
6. **POST /v1/device/isconnected** - Check connection status (synchronous)
7. **POST /v1/device/discover** - Discover services/characteristics (30s timeout)
8. **POST /v1/device/services** - Get cached services
9. **POST /v1/device/characteristics** - Get characteristics for service
10. **POST /v1/device/read** - Read characteristic (10s timeout)
11. **POST /v1/device/write** - Write characteristic (10s timeout if with_response)
12. **POST /v1/device/monitor** - Enable/disable notifications (values via WebSocket)
13. **POST /v1/device/rssi** - Read RSSI (10s timeout)

**Common Error Handling:**
- Invalid UUID → `ERROR_INVALID_IDENTIFIERS` (code 5)
- Device not found → `ERROR_DEVICE_NOT_FOUND` (code 204)
- Device not connected → `ERROR_DEVICE_NOT_CONNECTED` (code 205)
- Bluetooth off → `ERROR_BLUETOOTH_POWERED_OFF` (code 102)
- BLEError → use `bleError.toProto()` directly
- Generic Error → wrap in `ERROR_SERVER_ERROR` (code 1000)

### Update configure.swift

Add request size limit:
```swift
func configure(_ app: Application) throws {
    app.http.server.configuration.hostname = "127.0.0.1"
    app.http.server.configuration.port = 5050

    // BLE write operations limited to ~512 bytes, set 1MB for overhead
    app.routes.defaultMaxBodySize = "1mb"

    try routes(app)
    app.logger.info("BLE Proxy Server configured on 127.0.0.1:5050")
}
```

### Update routes.swift

Register all endpoints:
```swift
import Vapor

func routes(_ app: Application) throws {
    let ble = BLEController.shared

    // Health endpoint (Step 8)
    app.get("v1", "health") { req async throws -> Response in
        return try await HealthController.health(req)
    }

    // State query
    app.post("v1", "state") { req async throws -> Response in
        return try await ble.state(req)
    }

    // Scan endpoints
    app.post("v1", "scan", "start") { req async throws -> Response in
        return try await ble.startScan(req)
    }
    app.post("v1", "scan", "stop") { req async throws -> Response in
        return try await ble.stopScan(req)
    }

    // Connection endpoints
    app.post("v1", "device", "connect") { req async throws -> Response in
        return try await ble.connect(req)
    }
    app.post("v1", "device", "disconnect") { req async throws -> Response in
        return try await ble.disconnect(req)
    }
    app.post("v1", "device", "isconnected") { req async throws -> Response in
        return try await ble.isConnected(req)
    }

    // Discovery endpoints
    app.post("v1", "device", "discover") { req async throws -> Response in
        return try await ble.discover(req)
    }
    app.post("v1", "device", "services") { req async throws -> Response in
        return try await ble.services(req)
    }
    app.post("v1", "device", "characteristics") { req async throws -> Response in
        return try await ble.characteristics(req)
    }

    // Read/write endpoints
    app.post("v1", "device", "read") { req async throws -> Response in
        return try await ble.read(req)
    }
    app.post("v1", "device", "write") { req async throws -> Response in
        return try await ble.write(req)
    }
    app.post("v1", "device", "monitor") { req async throws -> Response in
        return try await ble.monitor(req)
    }
    app.post("v1", "device", "rssi") { req async throws -> Response in
        return try await ble.readRSSI(req)
    }
}
```

### Logging Pattern

Log at key points:
```swift
func connect(_ req: Request) async throws -> Response {
    req.logger.info("POST /v1/device/connect")
    let request = try req.decodeProto(Bleproxy_V1_ConnectRequest.self)
    req.logger.info("Connecting to device: \(request.deviceID)")

    guard let deviceId = UUID(uuidString: request.deviceID) else {
        req.logger.error("Invalid device UUID: \(request.deviceID)")
        return try Response.error(BLEError(code: .errorInvalidIdentifiers,
                                          message: "Invalid UUID"))
    }

    // ... async/await bridge ...

    req.logger.info("Device connected: \(request.deviceID)")
    return try Response.proto(response)
}
```

## Acceptance Criteria

### Functional Requirements
- [ ] All 13 endpoints respond to POST (except health: GET)
- [ ] All endpoints accept/return protobuf with application/x-protobuf
- [ ] Scan start/stop work correctly
- [ ] Connect/disconnect/isConnected work correctly
- [ ] Discover/services/characteristics work correctly
- [ ] Read returns characteristic value
- [ ] Write supports with_response and without_response
- [ ] Monitor enables/disables notifications
- [ ] RSSI returns signal strength
- [ ] State returns Bluetooth adapter state

### Error Handling
- [ ] Invalid UUIDs return ERROR_INVALID_IDENTIFIERS
- [ ] Device not found returns ERROR_DEVICE_NOT_FOUND
- [ ] Device not connected returns ERROR_DEVICE_NOT_CONNECTED
- [ ] Bluetooth off returns ERROR_BLUETOOTH_POWERED_OFF
- [ ] Timeouts handled by BLEManager (10-60s)
- [ ] Malformed protobuf returns HTTP 400

### Non-Functional Requirements
- [ ] Request body size limited to 1MB
- [ ] All endpoints log requests/responses
- [ ] Concurrent requests handled correctly (BLEManager serializes)
- [ ] No memory leaks (continuations resume exactly once)

## Testing Instructions

### Build and Run
```bash
cd /Users/ericfrank/ble_bridge/server

# Build
swift build

# Run unit tests
swift test --filter BLEControllerTests

# Run server
swift run ble-proxy-server
```

### Integration Test Script

Create `/tmp/test_step9.sh`:
```bash
#!/bin/bash
PROTO_DIR="/Users/ericfrank/ble_bridge/proto"
PROTO_FILE="$PROTO_DIR/ble_proxy.proto"
BASE_URL="http://127.0.0.1:5050"

# Helper: Encode protobuf
encode() {
    echo "$2" | protoc --encode=bleproxy.v1.$1 --proto_path=$PROTO_DIR $PROTO_FILE
}

# Helper: Decode protobuf
decode() {
    protoc --decode=bleproxy.v1.$1 --proto_path=$PROTO_DIR $PROTO_FILE < $2
}

# Test 1: State query
echo "Test 1: Query Bluetooth state"
encode StateRequest "" > /tmp/state.bin
curl -s -X POST "$BASE_URL/v1/state" \
    -H "Content-Type: application/x-protobuf" \
    --data-binary @/tmp/state.bin -o /tmp/state_resp.bin
decode StateResponse /tmp/state_resp.bin

# Test 2: Start scan
echo "Test 2: Start scan"
encode StartScanRequest "" > /tmp/scan_start.bin
curl -s -X POST "$BASE_URL/v1/scan/start" \
    --data-binary @/tmp/scan_start.bin -o /tmp/scan_resp.bin
decode StartScanResponse /tmp/scan_resp.bin

sleep 5

# Test 3: Stop scan
echo "Test 3: Stop scan"
encode StopScanRequest "" > /tmp/scan_stop.bin
curl -s -X POST "$BASE_URL/v1/scan/stop" \
    --data-binary @/tmp/scan_stop.bin -o /tmp/stop_resp.bin
decode StopScanResponse /tmp/stop_resp.bin

# Test 4: Connect (replace DEVICE_ID with actual device)
DEVICE_ID="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
echo "Test 4: Connect to $DEVICE_ID"
encode ConnectRequest "device_id: \"$DEVICE_ID\"" > /tmp/connect.bin
curl -s -X POST "$BASE_URL/v1/device/connect" \
    --data-binary @/tmp/connect.bin -o /tmp/connect_resp.bin
decode ConnectResponse /tmp/connect_resp.bin

# Test 5: Discover services
echo "Test 5: Discover services"
encode DiscoverRequest "device_id: \"$DEVICE_ID\"" > /tmp/discover.bin
curl -s -X POST "$BASE_URL/v1/device/discover" \
    --data-binary @/tmp/discover.bin -o /tmp/discover_resp.bin
decode DiscoverResponse /tmp/discover_resp.bin

# Test 6: Read RSSI
echo "Test 6: Read RSSI"
encode RSSIRequest "device_id: \"$DEVICE_ID\"" > /tmp/rssi.bin
curl -s -X POST "$BASE_URL/v1/device/rssi" \
    --data-binary @/tmp/rssi.bin -o /tmp/rssi_resp.bin
decode RSSIResponse /tmp/rssi_resp.bin

# Test 7: Read characteristic (update UUIDs)
SERVICE="180A"
CHAR="2A29"
echo "Test 7: Read characteristic"
encode ReadRequest "device_id: \"$DEVICE_ID\" service_uuid: \"$SERVICE\" characteristic_uuid: \"$CHAR\"" > /tmp/read.bin
curl -s -X POST "$BASE_URL/v1/device/read" \
    --data-binary @/tmp/read.bin -o /tmp/read_resp.bin
decode ReadResponse /tmp/read_resp.bin

# Test 8: Disconnect
echo "Test 8: Disconnect"
encode DisconnectRequest "device_id: \"$DEVICE_ID\"" > /tmp/disconnect.bin
curl -s -X POST "$BASE_URL/v1/device/disconnect" \
    --data-binary @/tmp/disconnect.bin -o /tmp/disconnect_resp.bin
decode DisconnectResponse /tmp/disconnect_resp.bin
```

Run: `chmod +x /tmp/test_step9.sh && /tmp/test_step9.sh`

### Unit Tests

Create `/Users/ericfrank/ble_bridge/server/Tests/BLEProxyTests/BLEControllerTests.swift`:

**Test Coverage (minimum 30 tests):**
1. UUID parsing (4 tests) - valid, invalid, empty, malformed
2. Endpoint registration (13 tests) - each endpoint responds correctly
3. Protobuf decode (5 tests) - valid, empty, malformed, large, oversized
4. Error responses (8 tests) - each error code maps correctly

## Dependencies
- ✅ Step 8: Vapor server and health endpoint
- ✅ Step 7: BLEManager with all operations
- ✅ Step 2: Generated protobuf code
- Physical BLE peripheral for integration testing

## Risks/Blockers

### Key Risks
1. **Continuation Resume Errors**
   - Mitigation: Use `withCheckedThrowingContinuation` (enforces single resume)
   - Test all error paths

2. **Concurrent Request Handling**
   - Mitigation: BLEManager already thread-safe via queue
   - Operations serialize automatically

3. **Timeout Coordination**
   - Mitigation: BLE timeouts (10-60s) handled by BLEManager
   - HTTP waits for completion callback
   - Vapor default timeout: 60s (matches connection timeout)

4. **UUID Parsing Failures**
   - Mitigation: Use `UUID(uuidString:)` which returns optional
   - Return ERROR_INVALID_IDENTIFIERS for nil

5. **Memory Leaks**
   - Mitigation: Checked continuations enforce resume
   - BLEManager callbacks execute exactly once

### Edge Cases
- Multiple scans: Starting scan while already scanning → fail gracefully
- Double connect: Already-connected device → ERROR_DEVICE_ALREADY_CONNECTED
- Read during disconnect: Operation in progress → ERROR_DEVICE_DISCONNECTED
- Invalid characteristic: Non-existent characteristic → ERROR_CHARACTERISTIC_NOT_FOUND

## Integration with Step 10

**Step 9 Prepares:**
- BLEController.shared instance available
- BLEManager accessible for WebSocket callbacks
- Scan, state, disconnect, monitor callbacks → need WebSocket broadcast

**Step 10 Will Add:**
- WebSocket endpoint: GET /v1/events
- Event broadcasting: Scan results, state changes, disconnections, notifications
- WsEvent protobuf wrapper

## Recommended Agent
swift-backend-engineer

## Estimated Time
3-4 hours
