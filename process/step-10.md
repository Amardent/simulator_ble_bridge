# Step 10: WebSocket Server - Event Broadcasting

**Status:** ✅ Complete (2025-10-07)

## Objective
Implement WebSocket endpoint for streaming BLE events (manager state, scan results, connection events, notifications) to connected clients using protobuf binary frames.

## Prerequisites
- Step 9: HTTP endpoints complete (✅ Complete - 2025-10-07)
- Step 7: BLEManager with all operations (✅ Complete - 2025-10-06)
- Understanding of Vapor WebSocket support
- Physical BLE peripheral for integration testing

## Technical Details

**Important:** From Steps 3-9, the following infrastructure is ready:
- ✅ `BLEController.shared`: Singleton class with BLEManager access
- ✅ `BLEManager`: All operations with completion callbacks
- ✅ `Generated` module: All protobuf event types (prefix: `Bleproxy_V1_`)
- ✅ Vapor server: 127.0.0.1:5050 with HTTP endpoints

### Architecture Overview

**Design Decisions:**
1. **BLEController remains a class** (not actor) - maintains compatibility with Step 9
2. **Singleton pattern preserved** - `BLEController.shared` used throughout
3. **BLEManager callbacks augmented** - global callbacks added for WebSocket (existing completion handlers preserved for HTTP)
4. **Thread safety via DispatchQueue** - dedicated queue for WebSocket array
5. **Single callback registration** - BLE callbacks registered once on first WebSocket connection

**WebSocket Lifecycle:**
1. Client connects → add to `connectedWebSockets` array (synchronized)
2. On first connection → register global BLE callbacks (one-time)
3. Send initial `ManagerStateEvent` immediately
4. Client disconnects → remove from array
5. All BLE events broadcast to all connected clients

**Dual Completion Pattern:**
BLEManager operations have two completion paths:
- **Completion handlers** (existing): For HTTP request/response
- **Global callbacks** (new): For WebSocket event broadcasting

Both execute for every operation. Example:
- HTTP `POST /v1/device/connect` → completion handler returns `ConnectResponse`
- WebSocket clients → `connectionCallback` broadcasts `PeripheralConnectedEvent`

### Required BLEManager Modifications

**File:** `/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEManager.swift`

#### 1. Add Global Callback Properties

Add after line 89 (after existing `stateCallback`):

```swift
/// Global callback for connection state changes (Step 10)
public var connectionCallback: ((UUID, Bool, Error?) -> Void)?

/// Global callback for characteristic notifications (Step 10)
public var notificationCallback: ((UUID, CBUUID, CBUUID, Data) -> Void)?
```

#### 2. Update Delegate Methods

**In `centralManager(_:didConnect:)` around line 1054:**
```swift
// Broadcast connection event to WebSocket clients (Step 10)
connectionCallback?(uuid, true, nil)
```

**In `centralManager(_:didFailToConnect:error:)` around line 1073:**
```swift
// Broadcast connection failure to WebSocket clients (Step 10)
connectionCallback?(uuid, false, error)
```

**In `centralManager(_:didDisconnectPeripheral:error:)` around line 1097:**
```swift
// Broadcast disconnection to WebSocket clients (Step 10)
connectionCallback?(uuid, false, error)
```

**In `peripheral(_:didUpdateValueFor:error:)` around line 1280 (notification path):**

After calling per-characteristic monitor callback:
```swift
// Also broadcast to WebSocket clients (Step 10)
notificationCallback?(
    peripheral.identifier,
    characteristic.service!.uuid,
    characteristic.uuid,
    data
)
```

#### 3. Convert scanCallback to Array-Based System

**Problem:** HTTP scan endpoint and WebSocket both need scan callbacks, but current property only supports one closure.

**Solution:** Convert to array-based callback system.

Change line 85 from:
```swift
private var scanCallback: ((Bleproxy_V1_Device) -> Void)?
```

To:
```swift
/// Callbacks invoked when peripheral discovered during scanning
private var scanCallbacks: [(id: String, callback: (Bleproxy_V1_Device) -> Void)] = []

/// Register scan callback with unique identifier
public func addScanCallback(id: String, callback: @escaping (Bleproxy_V1_Device) -> Void) {
    queue.async {
        self.scanCallbacks.append((id: id, callback: callback))
    }
}

/// Remove scan callback by identifier
public func removeScanCallback(id: String) {
    queue.async {
        self.scanCallbacks.removeAll { $0.id == id }
    }
}

/// Remove all scan callbacks
private func removeAllScanCallbacks() {
    queue.async {
        self.scanCallbacks.removeAll()
    }
}
```

**Update delegate** in `centralManager(_:didDiscover:advertisementData:rssi:)` around line 1050:

Change from:
```swift
scanCallback?(device)
```

To:
```swift
for callback in scanCallbacks {
    callback.callback(device)
}
```

**Update `stopScan()`** around line 950:
```swift
removeAllScanCallbacks()
```

### BLEController WebSocket Extensions

**File:** `/Users/ericfrank/ble_bridge/server/Sources/BLEProxyServer/Controllers/BLEController.swift`

**IMPORTANT:** Extend the EXISTING BLEController class from Step 9. Do NOT create new class.

Add these properties and methods:

```swift
// MARK: - WebSocket Support (Step 10)

private var connectedWebSockets: [WebSocket] = []
private let wsQueue = DispatchQueue(label: "com.bleproxy.websockets")
private var bleCallbacksRegistered = false

func handleWebSocket(_ req: Request, _ ws: WebSocket) {
    let logger = req.logger
    logger.info("WebSocket connected")

    // Add to connected clients (synchronized)
    wsQueue.sync {
        connectedWebSockets.append(ws)
        logger.info("Active clients: \(connectedWebSockets.count)")
    }

    // Register BLE callbacks once
    var shouldSetup = false
    wsQueue.sync {
        if !bleCallbacksRegistered {
            bleCallbacksRegistered = true
            shouldSetup = true
        }
    }
    if shouldSetup {
        setupBLECallbacks(logger: logger)
    }

    // Send initial state
    DispatchQueue.global().asyncAfter(deadline: .now() + 0.1) { [weak self] in
        self?.sendInitialState(to: ws, logger: logger)
    }

    // Handle close
    ws.onClose.whenComplete { [weak self] _ in
        guard let self = self else { return }
        self.wsQueue.async {
            self.connectedWebSockets.removeAll { $0 === ws }
            logger.info("Client disconnected, \(self.connectedWebSockets.count) remaining")
        }
    }

    // Ignore text frames
    ws.onText { ws, text in
        logger.warning("Unexpected text frame: \(text)")
    }
}

private func sendInitialState(to ws: WebSocket, logger: Logger) {
    var stateEvent = Bleproxy_V1_ManagerStateEvent()
    stateEvent.state = bleManager.getState()
    stateEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

    var wsEvent = Bleproxy_V1_WsEvent()
    wsEvent.managerStateEvent = stateEvent

    do {
        let data = try wsEvent.serializedData()
        ws.send([UInt8](data))
        logger.debug("Sent initial state: \(stateEvent.state)")
    } catch {
        logger.error("Failed to send initial state: \(error)")
    }
}

private func broadcast(_ event: Bleproxy_V1_WsEvent, logger: Logger) {
    do {
        let data = try event.serializedData()

        wsQueue.async { [weak self] in
            guard let self = self else { return }

            // Remove closed sockets and send to active ones
            self.connectedWebSockets.removeAll { ws in
                if ws.isClosed { return true }
                ws.send([UInt8](data))
                return false
            }

            logger.debug("Broadcast to \(self.connectedWebSockets.count) clients")
        }
    } catch {
        logger.error("Failed to serialize event: \(error)")
    }
}

private func setupBLECallbacks(logger: Logger) {
    logger.info("Registering BLE callbacks for WebSocket")

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

    // Scan results
    bleManager.addScanCallback(id: "websocket") { [weak self] device in
        guard let self = self else { return }
        var scanEvent = Bleproxy_V1_ScanResultEvent()
        scanEvent.device = device
        scanEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

        var wsEvent = Bleproxy_V1_WsEvent()
        wsEvent.scanResultEvent = scanEvent
        self.broadcast(wsEvent, logger: logger)
    }

    // Connection events
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

            if let error = error as? BLEError {
                disconnEvent.error = error.toProto()
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
}
```

### Update routes.swift

**File:** `/Users/ericfrank/ble_bridge/server/Sources/BLEProxyServer/routes.swift`

Add after existing HTTP routes:

```swift
// WebSocket endpoint (Step 10)
app.webSocket("v1", "events") { req, ws in
    ble.handleWebSocket(req, ws)
}
```

### Protobuf Event Types

All 6 event types defined in `ble_proxy.proto` (lines 526-620):

1. `ManagerStateEvent` - Bluetooth state changes
2. `ScanResultEvent` - Discovered peripherals
3. `PeripheralConnectedEvent` - Device connected
4. `PeripheralDisconnectedEvent` - Device disconnected
5. `CharacteristicValueUpdatedEvent` - Notifications
6. `ServerErrorEvent` - Server errors (reserved for future)

**Generated Swift field names (camelCase):**
- `wsEvent.managerStateEvent`
- `wsEvent.scanResultEvent`
- `wsEvent.peripheralConnectedEvent`
- `wsEvent.peripheralDisconnectedEvent`
- `wsEvent.characteristicValueUpdatedEvent`
- `wsEvent.serverErrorEvent`

**Timestamp requirement:** All events use `Int64(Date().timeIntervalSince1970 * 1000)`

## Acceptance Criteria

### Functional
- [ ] WebSocket connects at `ws://127.0.0.1:5050/v1/events`
- [ ] Initial `ManagerStateEvent` sent on connection
- [ ] Scan results streamed as `ScanResultEvent`
- [ ] Connection events sent as `PeripheralConnectedEvent`/`PeripheralDisconnectedEvent`
- [ ] Notifications sent as `CharacteristicValueUpdatedEvent`
- [ ] Binary protobuf frames used (not text)
- [ ] All events include valid timestamp

### Multi-Client
- [ ] Multiple clients can connect simultaneously
- [ ] All clients receive same events
- [ ] Client disconnection handled gracefully
- [ ] Closed sockets cleaned up automatically

### Integration
- [ ] HTTP endpoints (Step 9) still work
- [ ] Scan started via HTTP streams to WebSocket

## Testing Instructions

### Build and Run
```bash
cd /Users/ericfrank/ble_bridge/server
swift build
swift run ble-proxy-server
```

### Python WebSocket Client

Create `/tmp/ws_test.py`:

```python
#!/usr/bin/env python3
import asyncio
import websockets
import sys
sys.path.insert(0, '/Users/ericfrank/ble_bridge/proto')
import ble_proxy_pb2

async def test():
    uri = "ws://127.0.0.1:5050/v1/events"
    async with websockets.connect(uri) as ws:
        print("✅ Connected")

        for i in range(5):
            msg = await ws.recv()
            event = ble_proxy_pb2.WsEvent()
            event.ParseFromString(msg)

            which = event.WhichOneof('event')
            print(f"Event {i+1}: {which}")

            if which == 'manager_state_event':
                print(f"  State: {event.manager_state_event.state}")
            elif which == 'scan_result_event':
                print(f"  Device: {event.scan_result_event.device.id}")

asyncio.run(test())
```

Generate Python bindings:
```bash
cd /Users/ericfrank/ble_bridge
protoc --python_out=proto --proto_path=proto proto/ble_proxy.proto
```

Run test:
```bash
# Terminal 1: Server
swift run ble-proxy-server

# Terminal 2: WebSocket client
python3 /tmp/ws_test.py

# Terminal 3: Trigger scan
echo "" | protoc --encode=bleproxy.v1.StartScanRequest \
    --proto_path=/Users/ericfrank/ble_bridge/proto \
    /Users/ericfrank/ble_bridge/proto/ble_proxy.proto > /tmp/scan.bin
curl -X POST http://127.0.0.1:5050/v1/scan/start \
    -H "Content-Type: application/x-protobuf" \
    --data-binary @/tmp/scan.bin
```

Expected: WebSocket client receives scan result events.

## Dependencies
- ✅ Step 9: HTTP endpoints
- ✅ Step 7: BLEManager complete
- Vapor 4.117.0+ (WebSocket built-in)
- Python 3.8+ with `websockets` (for testing)

## Risks/Blockers
- WebSocket backpressure under high scan rate (hardware limited to ~50 events/sec)
- Thread safety requires careful queue usage
- Memory leaks if WebSocket array not cleaned up
- Event ordering not guaranteed across types (use timestamps)

## Recommended Agent
swift-backend-engineer

## Estimated Time
2-3 hours

## Completion Notes (2025-10-07)

**Status:** ✅ COMPLETE

### Test Results
- ✅ WebSocket connects at `ws://127.0.0.1:5050/v1/events`
- ✅ Initial `ManagerStateEvent` sent (POWERED_ON)
- ✅ Scan results stream as `ScanResultEvent` (~13 events/sec)
- ✅ Connection/disconnection events broadcast
- ✅ Characteristic notifications broadcast
- ✅ Binary protobuf frames (not text)
- ✅ Multiple clients supported
- ✅ All 39 tests passing

### Files Modified
- `BLEManager.swift`: Added `scanCallbacks` array, `connectionCallback`, `notificationCallback`
- `BLEController.swift`: Added `handleWebSocket`, `broadcast`, `setupBLECallbacks` (lines 484-645)
- `routes.swift`: WebSocket route at `/v1/events` (already existed)

### Key Decisions
- Array-based scan callbacks (HTTP + WebSocket both receive results)
- Single registration flag (`bleCallbacksRegistered`)
- 0.1s delay for initial state event (ensures connection established)
- Closed sockets cleaned up atomically during broadcast

## Implementation Notes

**Threading:** All BLE callbacks execute on background queue. WebSocket operations use dedicated `wsQueue`.

**Common Pitfalls:**
1. Forgetting timestamp on events
2. Using wrong field names (`managerStateEvent` not `managerState`)
3. Text frames instead of binary
4. Not checking `ws.isClosed` before sending

**Enum Cases:** Use `.poweredOn` not `.managerStatePoweredOn`
