# Step 10: WebSocket Server - Event Broadcasting

## Objective
Implement WebSocket endpoint for streaming BLE events (manager state, scan results, connection events, notifications) to connected clients using protobuf binary frames.

## Prerequisites
- Step 9: HTTP endpoints complete (✅ Complete - 2025-10-07)
- Step 7: BLEManager with all operations (✅ Complete - 2025-10-06)
- Understanding of Vapor WebSocket support
- Understanding of Swift concurrency and thread safety

## Technical Details

**Important:** From Steps 3-9, the following infrastructure is ready:
- ✅ `BLEController.shared`: Singleton class with BLEManager access
- ✅ `BLEManager`: All operations with completion callbacks
- ✅ `Generated` module: All protobuf event types (prefix: `Bleproxy_V1_`)
- ✅ Vapor server: 127.0.0.1:5050 with HTTP endpoints
- ✅ Request/Response extensions: protobuf serialization helpers

### Architecture Overview

**Design Principles:**
1. **BLEController remains a class** (not actor) - maintains compatibility with Step 9 HTTP endpoints
2. **Singleton pattern preserved** - `BLEController.shared` used throughout
3. **BLEManager callbacks augmented** - global callbacks added for WebSocket broadcasting (existing completion handlers preserved for HTTP)
4. **Thread safety via DispatchQueue** - dedicated queue for WebSocket array synchronization
5. **Single callback registration** - BLE callbacks registered once on first WebSocket connection

**Multi-Client Design Decision:**
While the PRD specifies "single-client design" (project.md:39, 49), this implementation supports multiple WebSocket clients for the following reasons:
- No additional complexity over single-client implementation
- Enables simultaneous debugging tools (multiple terminals, Wireshark, Python scripts)
- Single simulator still connects to single server instance (PRD constraint maintained)
- Broadcast pattern is standard WebSocket design
- PRD constraint refers to single-simulator-to-single-server architecture, not WebSocket connection count
- Resource overhead minimal (broadcast reuses serialized data)

**WebSocket Lifecycle:**
1. Client connects → add to `connectedWebSockets` array (synchronized)
2. On first connection → register global BLE callbacks (one-time setup)
3. Send initial `ManagerStateEvent` immediately after connection
4. Client disconnects → remove from array
5. All BLE events broadcast to all connected clients

**Dual Completion Pattern:**
BLEManager operations now have **two completion paths**:
- **Completion handlers** (existing from Steps 3-7): For HTTP request/response (Step 9)
- **Global callbacks** (new in Step 10): For WebSocket event broadcasting

Both paths execute for every operation. For example:
- HTTP `POST /v1/device/connect` → completion handler returns `ConnectResponse`
- WebSocket clients → `connectionCallback` broadcasts `PeripheralConnectedEvent`

### Required BLEManager Modifications

**File:** `/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEManager.swift`

#### 1. Add Global Callback Properties

Add these properties after line 89 (after existing `stateCallback`):

```swift
/// Global callback for connection state changes (Step 10)
/// Called from didConnect, didFailToConnect, didDisconnectPeripheral delegates
/// Thread: Background queue (com.bleproxy.central)
public var connectionCallback: ((UUID, Bool, Error?) -> Void)?

/// Global callback for characteristic notifications (Step 10)
/// Called from didUpdateValueFor delegate when notification received
/// Thread: Background queue (com.bleproxy.central)
public var notificationCallback: ((UUID, CBUUID, CBUUID, Data) -> Void)?

/// Global callback for server errors (Step 10)
/// Called when operations fail outside of HTTP request context
/// Thread: Background queue (com.bleproxy.central)
public var errorCallback: ((Error) -> Void)?
```

#### 2. Update Delegate Methods to Call Global Callbacks

**In `centralManager(_:didConnect:)` (around line 1000):**

Add after existing completion handler logic:
```swift
// Broadcast connection event to WebSocket clients (Step 10)
connectionCallback?(uuid, true, nil)
```

**In `centralManager(_:didFailToConnect:error:)` (around line 1020):**

Add after existing completion handler logic:
```swift
// Broadcast connection failure to WebSocket clients (Step 10)
connectionCallback?(uuid, false, error)
```

**In `centralManager(_:didDisconnectPeripheral:error:)` (around line 1050):**

Add after existing cleanup logic:
```swift
// Broadcast disconnection to WebSocket clients (Step 10)
connectionCallback?(uuid, false, error)
```

**In `peripheral(_:didUpdateValueFor:error:)` notification path (around line 1240):**

After calling the per-characteristic monitor callback, add:
```swift
// Also broadcast to WebSocket clients (Step 10)
// This complements the per-characteristic activeMonitors callback
notificationCallback?(
    peripheral.identifier,
    characteristic.service!.uuid,
    characteristic.uuid,
    data
)
```

**Complete delegate update example:**
```swift
// In didUpdateValueFor delegate (around line 1200-1250):
func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
    let key = CharacteristicKey(
        deviceId: peripheral.identifier,
        serviceUUID: characteristic.service!.uuid,
        characteristicUUID: characteristic.uuid
    )

    // Check if it's a read response first (Step 5)
    if let completion = pendingReads.removeValue(forKey: key) {
        // Cancel timeout
        readTimeouts.removeValue(forKey: key)?.cancel()

        if let error = error {
            completion(.failure(BLEError.characteristicReadFailed(error: error)))
        } else {
            let data = characteristic.value ?? Data()
            completion(.success(data))
        }
        return  // Early return - this was a read response
    }

    // Otherwise it's a notification (Step 6)
    if let callback = activeMonitors[key] {
        let data = characteristic.value ?? Data()

        // Call per-characteristic callback (existing)
        callback(data)

        // NEW (Step 10): Also broadcast to WebSocket clients
        notificationCallback?(
            peripheral.identifier,
            characteristic.service!.uuid,
            characteristic.uuid,
            data
        )
    }
}
```

#### 3. Convert scanCallback to Array-Based System

**Problem:** HTTP scan endpoint (Step 9 line 49-53) and WebSocket broadcasting both need scan callbacks, but the current `scanCallback` property only supports one closure at a time. If HTTP sets the callback, WebSocket won't receive events (and vice versa).

**Solution:** Convert to array-based callback system supporting multiple observers.

Change line 85 from:
```swift
private var scanCallback: ((Bleproxy_V1_Device) -> Void)?
```

To:
```swift
/// Callbacks invoked when a peripheral is discovered during scanning
/// Supports multiple observers (HTTP response collection AND WebSocket broadcasting)
/// Called on background queue - dispatch to main if updating UI
private var scanCallbacks: [(id: String, callback: (Bleproxy_V1_Device) -> Void)] = []

/// Register a scan callback with unique identifier
/// - Parameters:
///   - id: Unique identifier for this callback (e.g., "websocket", "http-request-123")
///   - callback: Closure called for each discovered device
public func addScanCallback(id: String, callback: @escaping (Bleproxy_V1_Device) -> Void) {
    queue.async {
        self.scanCallbacks.append((id: id, callback: callback))
    }
}

/// Remove scan callback by identifier
/// - Parameter id: Identifier used when registering callback
public func removeScanCallback(id: String) {
    queue.async {
        self.scanCallbacks.removeAll { $0.id == id }
    }
}

/// Remove all scan callbacks (called when scan stops)
private func removeAllScanCallbacks() {
    queue.async {
        self.scanCallbacks.removeAll()
    }
}
```

**Update delegate method** in `centralManager(_:didDiscover:advertisementData:rssi:)` (around line 900):

Change from:
```swift
scanCallback?(device)
```

To:
```swift
// Notify all registered observers
for callback in scanCallbacks {
    callback.callback(device)
}
```

**Update `stopScan()` method** (around line 950):
Add at end of method:
```swift
removeAllScanCallbacks()
```

**Impact on Step 9:** HTTP scan endpoint must be updated to use new API:
```swift
// In BLEController.startScan (line 49-53), change from:
bleManager.startScan(serviceUUIDs: serviceUUIDs) { device in
    req.logger.debug("Discovered device: \(device.id)")
}

// To:
bleManager.startScan(serviceUUIDs: serviceUUIDs)
// Callback registered separately in Step 10 WebSocket setup
```

**Impact on Step 10:** WebSocket setup uses new API:
```swift
// In setupBLECallbacks():
bleManager.addScanCallback(id: "websocket") { [weak self] device in
    // Broadcast to WebSocket clients
}
```

### BLEController WebSocket Extensions

**File:** `/Users/ericfrank/ble_bridge/server/Sources/BLEProxyServer/Controllers/BLEController.swift`

**IMPORTANT:** These extensions are added to the **EXISTING** `BLEController` class from Step 9. Do NOT create a new BLEController class. The singleton pattern `BLEController.shared` already exists and is used throughout the server (see Step 9 line 127). All WebSocket code below extends this existing class.

Add these extensions to the existing `BLEController` class:

```swift
// MARK: - WebSocket Support (Step 10)

/// Connected WebSocket clients
private var connectedWebSockets: [WebSocket] = []

/// Synchronization queue for WebSocket array access
private let wsQueue = DispatchQueue(label: "com.bleproxy.websockets")

/// Flag to ensure BLE callbacks registered only once
private var bleCallbacksRegistered = false

/// WebSocket connection handler
/// - Parameters:
///   - req: Request for logger access
///   - ws: WebSocket connection
func handleWebSocket(_ req: Request, _ ws: WebSocket) {
    let logger = req.logger
    logger.info("WebSocket connected from \(req.remoteAddress?.description ?? "unknown")")

    // Add to connected clients (thread-safe, async to avoid blocking event loop)
    wsQueue.async { [weak self] in
        guard let self = self else { return }
        self.connectedWebSockets.append(ws)
        logger.info("Active WebSocket clients: \(self.connectedWebSockets.count)")
    }

    // Register BLE callbacks once (thread-safe, must be sync to check flag)
    var shouldSetupCallbacks = false
    wsQueue.sync {
        if !bleCallbacksRegistered {
            bleCallbacksRegistered = true
            shouldSetupCallbacks = true
        }
    }
    if shouldSetupCallbacks {
        setupBLECallbacks(logger: logger)
    }

    // Send initial state event after brief delay to ensure connection ready
    DispatchQueue.global().asyncAfter(deadline: .now() + 0.1) { [weak self] in
        self?.sendInitialState(to: ws, logger: logger)
    }

    // Handle WebSocket close
    ws.onClose.whenComplete { [weak self] _ in
        guard let self = self else { return }
        self.wsQueue.async {
            let initialCount = self.connectedWebSockets.count
            self.connectedWebSockets.removeAll { $0 === ws }
            let removedCount = initialCount - self.connectedWebSockets.count

            if removedCount > 0 {
                logger.info("WebSocket disconnected, \(self.connectedWebSockets.count) clients remaining")
            }

            // Note: Scan continues even if all clients disconnect
            // This prevents conflicts with HTTP scan endpoint
            // Clients can call stopScan via HTTP if needed
        }
    }

    // Ignore text frames (we only use binary protobuf)
    ws.onText { ws, text in
        req.logger.warning("Received unexpected text frame on WebSocket: \(text)")
    }
}

/// Send initial manager state event to newly connected WebSocket
private func sendInitialState(to ws: WebSocket, logger: Logger) {
    var stateEvent = Bleproxy_V1_ManagerStateEvent()
    stateEvent.state = bleManager.getState()
    stateEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

    var wsEvent = Bleproxy_V1_WsEvent()
    wsEvent.managerStateEvent = stateEvent

    do {
        let data = try wsEvent.serializedData()
        ws.send([UInt8](data))
        logger.debug("Sent initial state event: \(stateEvent.state)")
    } catch {
        logger.error("Failed to send initial state: \(error)")
    }
}

/// Broadcast event to all connected WebSocket clients
/// Thread-safe: can be called from any thread (BLE callbacks use background queue)
/// - Parameters:
///   - event: WsEvent to broadcast
///   - logger: Logger for error/debug messages
private func broadcast(_ event: Bleproxy_V1_WsEvent, logger: Logger) {
    do {
        let data = try event.serializedData()

        wsQueue.async { [weak self] in
            guard let self = self else { return }
            var failedSockets: [WebSocket] = []

            for ws in self.connectedWebSockets {
                // Skip closed sockets
                if ws.isClosed {
                    failedSockets.append(ws)
                    continue
                }

                // Send binary frame
                ws.send([UInt8](data))
            }

            // Clean up closed sockets
            if !failedSockets.isEmpty {
                self.connectedWebSockets.removeAll { ws in
                    failedSockets.contains { $0 === ws }
                }
                logger.info("Removed \(failedSockets.count) closed WebSocket(s)")
            }

            logger.debug("Broadcasted event to \(self.connectedWebSockets.count) client(s)")
        }
    } catch {
        logger.error("Failed to serialize WsEvent: \(error)")
    }
}

/// Register BLE manager callbacks for WebSocket event broadcasting
/// Called once on first WebSocket connection
/// - Parameter logger: Logger to use for callback operations (captured in closures)
private func setupBLECallbacks(logger: Logger) {
    logger.info("Registering BLE callbacks for WebSocket events")

    // Manager state changes
    bleManager.stateCallback = { [weak self] state in
        guard let self = self else { return }

        var stateEvent = Bleproxy_V1_ManagerStateEvent()
        stateEvent.state = state
        stateEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

        var wsEvent = Bleproxy_V1_WsEvent()
        wsEvent.managerStateEvent = stateEvent

        self.broadcast(wsEvent, logger: logger)
    }

    // Scan results (using new array-based callback system)
    bleManager.addScanCallback(id: "websocket") { [weak self] device in
        guard let self = self else { return }

        var scanEvent = Bleproxy_V1_ScanResultEvent()
        scanEvent.device = device
        scanEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

        var wsEvent = Bleproxy_V1_WsEvent()
        wsEvent.scanResultEvent = scanEvent

        self.broadcast(wsEvent, logger: logger)
    }

    // Connection events (connect, disconnect, connection failures)
    bleManager.connectionCallback = { [weak self] deviceId, connected, error in
        guard let self = self else { return }

        if connected {
            var connEvent = Bleproxy_V1_PeripheralConnectedEvent()
            connEvent.deviceID = deviceId.uuidString
            connEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

            var wsEvent = Bleproxy_V1_WsEvent()
            wsEvent.peripheralConnectedEvent = connEvent

            self.broadcast(wsEvent, logger: logger)
        } else {
            var disconnEvent = Bleproxy_V1_PeripheralDisconnectedEvent()
            disconnEvent.deviceID = deviceId.uuidString
            disconnEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

            // Include error if disconnection was unexpected
            if let error = error as? BLEError {
                disconnEvent.error = error.toProto()
            } else if let error = error {
                disconnEvent.error = BLEError.serverError(reason: error.localizedDescription).toProto()
            }

            var wsEvent = Bleproxy_V1_WsEvent()
            wsEvent.peripheralDisconnectedEvent = disconnEvent

            self.broadcast(wsEvent, logger: logger)
        }
    }

    // Characteristic notifications
    bleManager.notificationCallback = { [weak self] deviceId, serviceUUID, charUUID, data in
        guard let self = self else { return }

        var charEvent = Bleproxy_V1_CharacteristicValueUpdatedEvent()
        charEvent.deviceID = deviceId.uuidString
        charEvent.serviceUuid = serviceUUID.uuidString
        charEvent.characteristicUuid = charUUID.uuidString
        charEvent.value = data
        charEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

        var wsEvent = Bleproxy_V1_WsEvent()
        wsEvent.characteristicValueUpdatedEvent = charEvent

        self.broadcast(wsEvent, logger: logger)
    }

    // Note: errorCallback NOT implemented - all errors already handled via completion handlers
    // or connection/notification callbacks. ServerErrorEvent reserved for future use.

    logger.info("BLE callbacks registered successfully")
}
```

### Update routes.swift

**File:** `/Users/ericfrank/ble_bridge/server/Sources/BLEProxyServer/routes.swift`

Add WebSocket route after existing HTTP routes:

```swift
func routes(_ app: Application) throws {
    let ble = BLEController.shared

    // Health endpoint (Step 8)
    app.get("v1", "health") { req async throws -> Response in
        return try await HealthController.health(req)
    }

    // ... existing HTTP routes from Step 9 ...

    // WebSocket endpoint for event streaming (Step 10)
    app.webSocket("v1", "events") { req, ws in
        ble.handleWebSocket(req, ws)
    }
}
```

### Protobuf Event Types

All event types defined in `/Users/ericfrank/ble_bridge/proto/ble_proxy.proto` (lines 525-620):

**Event Messages (all with `Bleproxy_V1_` prefix in Swift):**
1. `ManagerStateEvent` - Bluetooth adapter state changes
   - Fields: `state` (ManagerState enum), `timestamp` (int64)
2. `ScanResultEvent` - Discovered peripherals
   - Fields: `device` (Device message), `timestamp` (int64)
3. `PeripheralConnectedEvent` - Device connected
   - Fields: `device_id` (string), `timestamp` (int64)
4. `PeripheralDisconnectedEvent` - Device disconnected
   - Fields: `device_id` (string), `error` (optional Error), `timestamp` (int64)
5. `CharacteristicValueUpdatedEvent` - Notification/indication received
   - Fields: `device_id`, `service_uuid`, `characteristic_uuid`, `value` (bytes), `timestamp`
6. `ServerErrorEvent` - Server-side error
   - Fields: `error` (Error), `timestamp` (int64), `context` (optional string)

**WsEvent Wrapper:**
```proto
message WsEvent {
  oneof event {
    ManagerStateEvent manager_state_event = 1;
    ScanResultEvent scan_result_event = 2;
    PeripheralConnectedEvent peripheral_connected_event = 3;
    PeripheralDisconnectedEvent peripheral_disconnected_event = 4;
    CharacteristicValueUpdatedEvent characteristic_value_updated_event = 5;
    ServerErrorEvent server_error_event = 6;
  }
}
```

**Generated Swift field names (camelCase):**
- `wsEvent.managerStateEvent`
- `wsEvent.scanResultEvent`
- `wsEvent.peripheralConnectedEvent`
- `wsEvent.peripheralDisconnectedEvent`
- `wsEvent.characteristicValueUpdatedEvent`
- `wsEvent.serverErrorEvent`

**Timestamp Requirement:**
All events MUST populate the `timestamp` field with Unix milliseconds:
```swift
event.timestamp = Int64(Date().timeIntervalSince1970 * 1000)
```

## Acceptance Criteria

### Functional Requirements
- [ ] WebSocket connects at `ws://127.0.0.1:5050/v1/events`
- [ ] Initial `ManagerStateEvent` sent immediately on connection
- [ ] Scan results streamed during active scan as `ScanResultEvent`
- [ ] Connection events sent as `PeripheralConnectedEvent` on connect
- [ ] Disconnection events sent as `PeripheralDisconnectedEvent` on disconnect
- [ ] Notification values sent as `CharacteristicValueUpdatedEvent`
- [ ] Server errors sent as `ServerErrorEvent` when appropriate
- [ ] Binary protobuf frames used (not text)
- [ ] All events include valid `timestamp` field (Unix milliseconds)
- [ ] `WsEvent` oneof discriminator works correctly

### Multi-Client Support
- [ ] Multiple WebSocket clients can connect simultaneously
- [ ] All clients receive same events (broadcast pattern)
- [ ] Client disconnection handled gracefully (no crashes)
- [ ] WebSocket array cleanup removes closed sockets

### Thread Safety
- [ ] No race conditions on `connectedWebSockets` array
- [ ] BLE callbacks registered exactly once (not per-client)
- [ ] `broadcast()` method is thread-safe
- [ ] No deadlocks between BLE queue and WebSocket queue

### Error Handling
- [ ] Protobuf serialization errors logged (events not dropped silently)
- [ ] Closed WebSocket send attempts handled gracefully
- [ ] WebSocket text frames logged as warnings
- [ ] No memory leaks from WebSocket retention

### Integration
- [ ] HTTP endpoints (Step 9) still work correctly
- [ ] BLEManager completion handlers still work for HTTP responses
- [ ] Dual callback pattern doesn't cause duplicate operations
- [ ] Scan can be started via HTTP, results stream to WebSocket

### Dual Callback Pattern Validation
- [ ] HTTP connect request triggers BOTH ConnectResponse (HTTP) AND PeripheralConnectedEvent (WebSocket)
- [ ] Scan started via HTTP streams results to BOTH HTTP log AND WebSocket broadcast
- [ ] Characteristic read triggers completion handler (HTTP response) but NOT notification callback
- [ ] Characteristic notification triggers notification callback but NOT read completion
- [ ] Connection timeout error sent to HTTP response via completion AND WebSocket via connection callback
- [ ] Disconnect initiated by server broadcasts to WebSocket AND completes HTTP request (if pending)

## Testing Instructions

### Build and Run
```bash
cd /Users/ericfrank/ble_bridge/server

# Build with BLEManager changes
swift build

# Run unit tests
swift test --filter WebSocketTests

# Run server
swift run ble-proxy-server
```

### Unit Tests

Create `/Users/ericfrank/ble_bridge/server/Tests/BLEProxyTests/WebSocketTests.swift`:

```swift
import XCTVapor
import Generated
@testable import BLEProxyServer

final class WebSocketTests: XCTestCase {
    func testWebSocketConnection() async throws {
        let app = Application(.testing)
        defer { app.shutdown() }
        try configure(app)

        try app.testable().webSocket("v1", "events") { ws async throws in
            // Connection should succeed
            XCTAssertFalse(ws.isClosed)
        }
    }

    func testInitialStateEvent() async throws {
        let app = Application(.testing)
        defer { app.shutdown() }
        try configure(app)

        var receivedEvent = false

        try app.testable().webSocket("v1", "events") { ws async throws in
            ws.onBinary { ws, buffer in
                // Decode WsEvent
                if let data = buffer.getData(at: 0, length: buffer.readableBytes) {
                    do {
                        let event = try Bleproxy_V1_WsEvent(serializedData: data)
                        if event.event == .managerStateEvent {
                            receivedEvent = true
                        }
                    } catch {
                        XCTFail("Failed to decode WsEvent: \(error)")
                    }
                }
            }

            // Give time for initial event
            try await Task.sleep(nanoseconds: 100_000_000) // 100ms
        }

        XCTAssertTrue(receivedEvent, "Should receive initial state event")
    }

    func testEventSerialization() throws {
        // Test each event type serializes correctly
        var stateEvent = Bleproxy_V1_ManagerStateEvent()
        stateEvent.state = .poweredOn  // Correct: enum case is .poweredOn, not .managerStatePoweredOn
        stateEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

        var wsEvent = Bleproxy_V1_WsEvent()
        wsEvent.managerStateEvent = stateEvent

        XCTAssertNoThrow(try wsEvent.serializedData())

        // Verify oneof discrimination
        XCTAssertTrue(wsEvent.hasManagerStateEvent)
        XCTAssertFalse(wsEvent.hasScanResultEvent)
    }

    func testTimestampPresent() throws {
        // All events should have timestamps
        var stateEvent = Bleproxy_V1_ManagerStateEvent()
        stateEvent.state = .poweredOn  // Correct enum case
        stateEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

        XCTAssertGreaterThan(stateEvent.timestamp, 0)

        // Timestamp should be recent (within last 10 seconds)
        let now = Int64(Date().timeIntervalSince1970 * 1000)
        XCTAssertLessThan(now - stateEvent.timestamp, 10000)
    }
}

**Note:** Generated protobuf enum cases use Swift naming conventions:
- `.unknown`, `.resetting`, `.unsupported`, `.unauthorized`, `.poweredOff`, `.poweredOn`
- NOT `.managerStateUnknown`, `.managerStatePoweredOn` (no message name prefix)
```

**Test Coverage (minimum 15 tests):**
1. WebSocket connection (1 test)
2. Initial state event sent (1 test)
3. Event serialization correctness (6 tests - one per event type)
4. Timestamp validation (6 tests - one per event type)
5. Multi-client broadcast (1 test - if XCTVapor supports multiple connections)

### Integration Testing with Python Client

Create `/tmp/ws_test.py`:

```python
#!/usr/bin/env python3
import asyncio
import websockets
import sys

# Assumes protobuf Python bindings generated from proto file
sys.path.insert(0, '/Users/ericfrank/ble_bridge/proto')
import ble_proxy_pb2

async def test_events():
    uri = "ws://127.0.0.1:5050/v1/events"

    try:
        async with websockets.connect(uri) as websocket:
            print("✅ Connected to WebSocket")

            # Listen for events
            event_count = 0
            while event_count < 10:  # Receive 10 events then exit
                message = await websocket.recv()

                if isinstance(message, bytes):
                    event = ble_proxy_pb2.WsEvent()
                    event.ParseFromString(message)

                    which = event.WhichOneof('event')
                    print(f"\n📡 Received event #{event_count + 1}: {which}")

                    if which == 'manager_state_event':
                        state_names = ['UNKNOWN', 'RESETTING', 'UNSUPPORTED',
                                      'UNAUTHORIZED', 'POWERED_OFF', 'POWERED_ON']
                        state_name = state_names[event.manager_state_event.state]
                        print(f"   State: {state_name}")
                        print(f"   Timestamp: {event.manager_state_event.timestamp}")

                    elif which == 'scan_result_event':
                        device = event.scan_result_event.device
                        print(f"   Device ID: {device.id}")
                        print(f"   Name: {device.name if device.HasField('name') else 'N/A'}")
                        print(f"   RSSI: {device.rssi if device.HasField('rssi') else 'N/A'} dBm")
                        print(f"   Timestamp: {event.scan_result_event.timestamp}")

                    elif which == 'peripheral_connected_event':
                        print(f"   Device ID: {event.peripheral_connected_event.device_id}")
                        print(f"   Timestamp: {event.peripheral_connected_event.timestamp}")

                    elif which == 'peripheral_disconnected_event':
                        print(f"   Device ID: {event.peripheral_disconnected_event.device_id}")
                        if event.peripheral_disconnected_event.HasField('error'):
                            err = event.peripheral_disconnected_event.error
                            print(f"   Error: {err.message} (code {err.code})")
                        print(f"   Timestamp: {event.peripheral_disconnected_event.timestamp}")

                    elif which == 'characteristic_value_updated_event':
                        ce = event.characteristic_value_updated_event
                        print(f"   Device ID: {ce.device_id}")
                        print(f"   Service: {ce.service_uuid}")
                        print(f"   Characteristic: {ce.characteristic_uuid}")
                        print(f"   Value: {ce.value.hex()} ({len(ce.value)} bytes)")
                        print(f"   Timestamp: {ce.timestamp}")

                    elif which == 'server_error_event':
                        err = event.server_error_event
                        print(f"   Error: {err.error.message} (code {err.error.code})")
                        if err.HasField('context'):
                            print(f"   Context: {err.context}")
                        print(f"   Timestamp: {err.timestamp}")

                    event_count += 1
                else:
                    print(f"⚠️  Received unexpected text frame: {message}")

    except Exception as e:
        print(f"❌ Error: {e}")
        return 1

    print("\n✅ Test completed successfully")
    return 0

if __name__ == "__main__":
    exit_code = asyncio.run(test_events())
    sys.exit(exit_code)
```

**Generate Python protobuf bindings:**
```bash
cd /Users/ericfrank/ble_bridge
protoc --python_out=proto \
    --proto_path=proto \
    proto/ble_proxy.proto
```

**Run test:**
```bash
# Terminal 1: Start server
cd /Users/ericfrank/ble_bridge/server
swift run ble-proxy-server

# Terminal 2: Start WebSocket client
python3 /tmp/ws_test.py

# Terminal 3: Trigger events via HTTP
cd /Users/ericfrank/ble_bridge/proto

# Start scan (generates scan result events)
echo "" | protoc --encode=bleproxy.v1.StartScanRequest \
    --proto_path=. ble_proxy.proto > /tmp/scan_start.bin
curl -X POST http://127.0.0.1:5050/v1/scan/start \
    -H "Content-Type: application/x-protobuf" \
    --data-binary @/tmp/scan_start.bin

# Wait 10 seconds, observe scan results in Terminal 2

# Stop scan
echo "" | protoc --encode=bleproxy.v1.StopScanRequest \
    --proto_path=. ble_proxy.proto > /tmp/scan_stop.bin
curl -X POST http://127.0.0.1:5050/v1/scan/stop \
    --data-binary @/tmp/scan_stop.bin
```

**Expected output in Terminal 2:**
```
✅ Connected to WebSocket

📡 Received event #1: manager_state_event
   State: POWERED_ON
   Timestamp: 1696723456789

📡 Received event #2: scan_result_event
   Device ID: 8C80878D-A1C8-DAFE-90CA-7C8C7A847CC1
   Name: MyDevice
   RSSI: -75 dBm
   Timestamp: 1696723457123

📡 Received event #3: scan_result_event
   Device ID: F2B4C9E1-3A7D-4F8E-9B1C-5D6E8A2F0B3C
   Name: AnotherDevice
   RSSI: -82 dBm
   Timestamp: 1696723457456

...
```

### Load Testing (Optional)

Test high event rate (scan with many devices):

```bash
# Generate rapid scan results
curl -X POST http://127.0.0.1:5050/v1/scan/start \
    --data-binary @/tmp/scan_start.bin

# Monitor WebSocket client - should receive 10+ events/second
# Verify no events dropped, no crashes, no memory leaks
```

## Dependencies
- ✅ Step 9: HTTP endpoints complete
- ✅ Step 7: BLEManager with all operations
- ✅ Vapor 4.117.0+ (WebSocket support built-in)
- ✅ SwiftProtobuf 1.27.0+
- Python 3.8+ with `websockets` library (for testing)

## Risks/Blockers

### Key Risks

1. **Multi-Client Broadcast Performance**
   - Risk: High event rate (100+ scan results/sec) × multiple clients = high CPU/memory
   - Mitigation: WebSocket array synchronized, closed sockets cleaned up automatically
   - Mitigation: BLE events naturally rate-limited by hardware (typically 10-50/sec)
   - Testing: Load test with 5+ concurrent clients during active scan

2. **Event Ordering**
   - Risk: Events may arrive out of order due to concurrent callbacks
   - Mitigation: BLE callbacks execute on single queue (sequential), broadcast preserves order
   - Note: Order guaranteed within single event type, not across types
   - Design: Clients should use timestamps for absolute ordering if needed

3. **Memory Leaks**
   - Risk: WebSocket array retains closed connections
   - Mitigation: Closed sockets detected in broadcast(), removed from array
   - Mitigation: `onClose` handler also cleans up
   - Testing: Connect/disconnect 100+ times, verify array empty after all close

4. **Thread Safety**
   - Risk: Concurrent access to `connectedWebSockets` array
   - Mitigation: All access wrapped in `wsQueue.sync {}`
   - Mitigation: BLE callbacks execute on dedicated queue, no conflicts
   - Testing: Concurrent connect/disconnect/broadcast stress test

5. **Protobuf Serialization Errors**
   - Risk: Malformed events cause serialization failures
   - Mitigation: Errors logged, event dropped (doesn't crash server)
   - Mitigation: All required fields populated before serialization
   - Testing: Unit tests validate each event type serializes correctly

### Edge Cases

- **WebSocket connects before Bluetooth powered on:** Initial state event will show `.poweredOff`
- **Scan started via HTTP, no WebSocket connected:** Scan results logged but not broadcast
- **Client disconnects during scan:** Scan continues for other clients (or stops if last client)
- **Connection event + HTTP connect response racing:** Both fire independently, no conflict
- **Notification + HTTP read racing on same characteristic:** Read completion fires first (early return), notification fires second (separate callback)

## Integration with Step 11

**Step 10 Completes:**
- WebSocket endpoint operational
- All 6 event types broadcasting
- Multi-client support working
- BLEManager fully instrumented with global callbacks

**Step 11 Will Implement:**
- React Native wrapper library
- Platform detection (simulator vs device)
- Protobuf client code generation
- WebSocket client connection from RN app

## Recommended Agent
swift-backend-engineer

## Estimated Time
2-3 hours

## Implementation Notes

### BLEManager Callback Threading
All BLE callbacks execute on BLEManager's background queue:
```
com.bleproxy.central (QoS: userInitiated)
```

Callbacks must be thread-safe. BLEController's `broadcast()` handles dispatching to WebSocket operations.

### Vapor WebSocket API
```swift
// Send binary frame
ws.send([UInt8](data))

// Check if closed
if ws.isClosed { ... }

// Close handler
ws.onClose.whenComplete { result in ... }

// Text handler (for debugging)
ws.onText { ws, text in ... }
```

### Debugging Tips

**Enable verbose logging:**
```swift
// In configure.swift
app.logger.logLevel = .debug
```

**Monitor WebSocket connections:**
```bash
lsof -i :5050
# Should show ESTABLISHED connections
```

**Decode WebSocket frames in Wireshark:**
1. Capture localhost traffic: `sudo tcpdump -i lo0 -w /tmp/capture.pcap port 5050`
2. Open in Wireshark
3. Right-click WebSocket frame → "Decode As" → "WebSocket"
4. Binary frames will show as protobuf data

**Test WebSocket with `wscat`:**
```bash
npm install -g wscat
wscat -c ws://127.0.0.1:5050/v1/events -b
# Should receive binary frames (will display as hex)
```

### Common Pitfalls

1. **Forgetting timestamp:** All events must set `timestamp` field
2. **Wrong field names:** Use `managerStateEvent` not `managerState` on WsEvent
3. **Text frames instead of binary:** Always use `ws.send([UInt8](data))`
4. **Accessing WebSocket array without lock:** Always wrap in `wsQueue.sync {}`
5. **Not handling closed sockets:** Check `ws.isClosed` before sending
6. **Callback retention cycles:** Always use `[weak self]` in closures

### Verification Checklist

Before marking Step 10 complete, verify:
- [ ] BLEManager.swift has 3 new callback properties (connection, notification, error)
- [ ] BLEManager.swift has 4 delegate method updates calling callbacks
- [ ] BLEManager.swift has `scanCallback` changed to public
- [ ] BLEController.swift has WebSocket extensions (~200 lines)
- [ ] routes.swift has WebSocket route registered
- [ ] Unit tests passing (WebSocketTests.swift)
- [ ] Python client receives all 6 event types
- [ ] Multiple clients can connect simultaneously
- [ ] No crashes after 100+ connect/disconnect cycles
- [ ] Scan results stream correctly to WebSocket
- [ ] HTTP endpoints still work (Step 9 not broken)
