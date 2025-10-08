# Step 6: Swift BLE Manager - Write Characteristics and Monitor Notifications

**Status:** ✅ Complete (2025-10-06)

## Objective
Implement characteristic write operations (with and without response) and notification/indication monitoring with proper callback routing.

## Prerequisites
- Step 5: Read operations working (✅ Complete - 2025-10-06)
- Generated protobuf types available at `server/Sources/Generated/`
- Understanding of write types and notification mechanisms
- Connected peripheral with writable and notifiable characteristics
- **Non-bonded (unpaired) BLE peripheral** - devices requiring pairing are not supported
- Service caching architecture from Step 5 (`cachedServices` dictionary)
- CharacteristicKey pattern from Step 5 for operation tracking
- Read vs notification disambiguation pattern from Step 5

## Technical Details

**Important:** Following Step 3-5 patterns:
- BLEManager is `public class` with background queue operations
- Import `Generated` module for protobuf types
- Error codes use `Bleproxy_V1_BleErrorCode` enum via `BLEError` struct
- All operations synchronized on background queue: `DispatchQueue(label: "com.bleproxy.central", qos: .userInitiated)`
- Callbacks execute on background queue (callers must dispatch to main if needed)
- Monitor callbacks will be used for WebSocket events in Step 10
- Timeout pattern from Steps 4-5: `DispatchWorkItem` scheduled on background queue
- All public methods dispatch async to background queue
- **Service caching from Step 5:** Use `cachedServices[uuid]` to lookup services/characteristics
- **CharacteristicKey from Step 5:** Reuse for `pendingWrites`, `writeTimeouts`, and `activeMonitors`
- **Timeout duration:** Use 10 seconds for write operations (consistent with Step 5 reads)
- **Cleanup pattern from Step 5:** Clear write state and monitors in `didDisconnectPeripheral`

### File Location
`/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEManager.swift`

### Extend BLEManager
```swift
import CoreBluetooth
import Foundation
import Generated

public class BLEManager {
    // Existing from Steps 3-5 (verified in BLEManager.swift)
    private let queue = DispatchQueue(label: "com.bleproxy.central", qos: .userInitiated)
    private var discoveredPeripherals: [UUID: CBPeripheral] = [:]
    private var connectedPeripherals: [UUID: CBPeripheral] = [:]
    private var connectionTimeouts: [UUID: DispatchWorkItem] = [:]  // Step 4
    private var cachedServices: [UUID: [Bleproxy_V1_Service]] = [:]  // Step 5 - Service cache
    private var pendingReads: [CharacteristicKey: (Result<Data, Error>) -> Void] = [:]  // Step 5
    private var readTimeouts: [CharacteristicKey: DispatchWorkItem] = [:]  // Step 5

    // New for Step 6
    private var pendingWrites: [CharacteristicKey: (Result<Void, Error>) -> Void] = [:]
    private var writeTimeouts: [CharacteristicKey: DispatchWorkItem] = [:]
    private var activeMonitors: [CharacteristicKey: (Data) -> Void] = [:]

    public func writeCharacteristic(
        deviceId: String,  // String UUID, not UUID - matches API pattern
        serviceUUID: String,
        characteristicUUID: String,
        value: Data,
        withResponse: Bool,
        completion: @escaping (Result<Void, Error>) -> Void
    )

    public func monitorCharacteristic(
        deviceId: String,
        serviceUUID: String,
        characteristicUUID: String,
        enable: Bool,
        callback: ((Data) -> Void)?
    ) throws
}
```

### Required CBPeripheralDelegate Methods
- `peripheral(_:didWriteValueFor:error:)` - Write with response confirmation
- `peripheral(_:didUpdateValueFor:error:)` - Notification/indication data (shared with read)
- `peripheral(_:didUpdateNotificationStateFor:error:)` - Monitor enable/disable confirmation

### Write Flow (with response)
1. Validate device UUID format (same as Step 5 read flow)
2. Verify peripheral is connected (check `connectedPeripherals[uuid]`)
3. Verify services discovered (check `cachedServices[uuid]` exists)
4. Lookup service and characteristic from `cachedServices` (Step 5 pattern)
5. Verify characteristic has `.write` property using `CBCharacteristicProperties.contains(.write)`
6. Create CharacteristicKey for tracking (reuse Step 5 struct)
7. Store completion in `pendingWrites[key]`
8. Create timeout work item (10 seconds - same as Step 5 read timeout for consistency)
9. Store timeout in `writeTimeouts[key]`
10. Schedule timeout on background queue: `queue.asyncAfter(deadline: .now() + 10, execute: timeoutWork)`
11. Call `peripheral.writeValue(value, for: characteristic, type: .withResponse)`
12. On `didWriteValueFor`: cancel timeout from `writeTimeouts`, call completion with success
13. On error or timeout: cancel timeout (if exists), call completion with `BLEError`

### Write Flow (without response)
1. Validate device UUID format (same as Step 5 read flow)
2. Verify peripheral is connected (check `connectedPeripherals[uuid]`)
3. Verify services discovered (check `cachedServices[uuid]` exists)
4. Lookup service and characteristic from `cachedServices` (Step 5 pattern)
5. Verify characteristic has `.writeWithoutResponse` property
6. Check `peripheral.canSendWriteWithoutResponse` before writing (flow control)
7. Call `peripheral.writeValue(value, for: characteristic, type: .withoutResponse)`
8. Call completion immediately with success (no response expected, no timeout needed)

### Monitor Flow
1. Validate device UUID format (same as Step 5 read flow)
2. Verify peripheral is connected (check `connectedPeripherals[uuid]`)
3. Verify services discovered (check `cachedServices[uuid]` exists)
4. Lookup service and characteristic from `cachedServices` (Step 5 pattern)
5. Verify characteristic has `.notify` or `.indicate` property
6. Create CharacteristicKey for tracking (reuse Step 5 struct)
7. If enable:
   - Store callback in `activeMonitors[key]`
   - Call `peripheral.setNotifyValue(true, for: characteristic)`
8. If disable:
   - Remove callback from `activeMonitors[key]`
   - Call `peripheral.setNotifyValue(false, for: characteristic)`
9. On `didUpdateNotificationStateFor`: verify success, log errors if any
10. On `didUpdateValueFor`: use Step 5 disambiguation pattern
    - First check `pendingReads[key]` → if exists, it's a read response
    - Then check `activeMonitors[key]` → if exists, it's a notification
11. If monitor: call monitor callback with `characteristic.value ?? Data()`
12. If read: call read completion with data (Step 5 existing logic)

### Differentiating Read vs Notification (Step 5 Pattern - CRITICAL)
**IMPORTANT:** This is the exact pattern from Step 5 implementation (BLEManager.swift:824-865).
You MUST extend the existing `didUpdateValueFor` delegate, not replace it.

```swift
// Existing Step 5 implementation - EXTEND this, don't replace
func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
    let uuid = peripheral.identifier
    let key = CharacteristicKey(
        deviceId: uuid,
        serviceUUID: characteristic.service!.uuid,
        characteristicUUID: characteristic.uuid
    )

    // Step 5: Check if this is a response to a read (existing code)
    if let completion = pendingReads.removeValue(forKey: key) {
        // Cancel read timeout (Step 5 existing)
        if let timeoutWork = readTimeouts.removeValue(forKey: key) {
            timeoutWork.cancel()
        }

        if let error = error {
            let bleError = BLEError(code: .errorCharacteristicReadFailed, message: error.localizedDescription)
            completion(.failure(bleError))
        } else {
            completion(.success(characteristic.value ?? Data()))
        }
        return  // CRITICAL: return early for read responses
    }

    // Step 6: Add this - check if it's a notification/indication
    if let callback = activeMonitors[key] {
        if let error = error {
            print("BLEManager: Notification error for \(characteristic.uuid): \(error)")
            return
        }
        callback(characteristic.value ?? Data())
    }
}
```

## Acceptance Criteria
- [x] Can write with response to writable characteristic
- [x] Write with response confirms success via `didWriteValueFor` delegate
- [x] Write with response returns error on failure
- [x] Write with response times out after 10 seconds (consistent with Step 5 read timeout)
- [x] Write timeout cancels properly on success/failure
- [x] Can write without response to characteristic
- [x] Write without response returns immediately (no timeout needed)
- [x] Respects `canSendWriteWithoutResponse` flow control
- [x] Can enable notifications on notifiable characteristic
- [x] Can disable notifications
- [x] Monitor callback fires on each notification/indication
- [x] Monitor callback includes characteristic data (handles nil values as empty Data)
- [x] Multiple monitors on different characteristics work concurrently
- [x] Read and monitor don't conflict on same characteristic (Step 5 disambiguation pattern)
- [x] `didUpdateValueFor` correctly routes to read completion vs monitor callback
- [x] Cleanup write timeouts on disconnect (extend Step 5 disconnect cleanup)
- [x] Cleanup active monitors on disconnect (prevent orphaned callbacks)

## Testing Instructions
```bash
# Create write/monitor test
cat > /Users/ericfrank/ble_bridge/server/Tests/BLEProxyTests/WriteMonitorTests.swift << 'EOF'
import XCTest
@testable import BLEProxy

final class WriteMonitorTests: XCTestCase {
    var manager: BLEManager!
    var testDeviceId: UUID!
    var writeCharUUID: CBUUID!
    var notifyCharUUID: CBUUID!

    func testWriteWithResponse() {
        let testData = Data([0x01, 0x02, 0x03])
        let exp = XCTestExpectation(description: "Write")

        manager.writeCharacteristic(
            deviceId: testDeviceId,
            serviceUUID: testServiceUUID,
            characteristicUUID: writeCharUUID,
            value: testData,
            withResponse: true
        ) { result in
            XCTAssertNoThrow(try result.get())
            exp.fulfill()
        }

        wait(for: [exp], timeout: 6.0)
    }

    func testWriteWithoutResponse() {
        let testData = Data([0x01, 0x02, 0x03])
        let exp = XCTestExpectation(description: "Write")

        manager.writeCharacteristic(
            deviceId: testDeviceId,
            serviceUUID: testServiceUUID,
            characteristicUUID: writeCharUUID,
            value: testData,
            withResponse: false
        ) { result in
            XCTAssertNoThrow(try result.get())
            exp.fulfill()
        }

        wait(for: [exp], timeout: 1.0)
    }

    func testMonitor() {
        let exp = XCTestExpectation(description: "Notification")
        exp.expectedFulfillmentCount = 3

        try! manager.monitorCharacteristic(
            deviceId: testDeviceId,
            serviceUUID: testServiceUUID,
            characteristicUUID: notifyCharUUID,
            enable: true
        ) { data in
            print("Received notification: \(data.hexString)")
            exp.fulfill()
        }

        wait(for: [exp], timeout: 10.0)

        try! manager.monitorCharacteristic(
            deviceId: testDeviceId,
            serviceUUID: testServiceUUID,
            characteristicUUID: notifyCharUUID,
            enable: false,
            callback: nil
        )
    }
}
EOF

# Run tests
swift test --filter WriteMonitorTests
```

## Dependencies
- CoreBluetooth framework
- Steps 4-5 (connection, discovery, read)
- Physical peripheral with writable and notifiable characteristics
- Dispatch framework for timeouts

## Key Patterns from Step 5 to Apply

**Service Lookup Pattern (from Step 5 Read):**
```swift
// Validate and lookup service/characteristic (lines 324-449 in BLEManager.swift)
guard let protoServices = cachedServices[uuid] else {
    completion(.failure(BLEError(code: .errorServicesNotDiscovered, message: "Services not discovered")))
    return
}

guard let protoService = protoServices.first(where: { $0.uuid.uppercased() == serviceUUID.uppercased() }) else {
    completion(.failure(BLEError(code: .errorServiceNotFound, message: "Service \(serviceUUID) not found")))
    return
}

guard let protoChar = protoService.characteristics.first(where: { $0.uuid.uppercased() == characteristicUUID.uppercased() }) else {
    completion(.failure(BLEError(code: .errorCharacteristicNotFound, message: "Characteristic not found")))
    return
}
```

**Timeout Pattern (from Step 5 Read):**
```swift
// Create and schedule timeout (Step 5: lines 398-410)
let timeoutWork = DispatchWorkItem { [weak self] in
    guard let self = self else { return }
    if let completion = self.pendingWrites.removeValue(forKey: key) {
        let error = BLEError(code: .errorCharacteristicWriteFailed, message: "Write timeout after 10 seconds")
        completion(.failure(error))
        print("BLEManager: Write timeout for \(characteristicUUID)")
    }
}
self.writeTimeouts[key] = timeoutWork
self.queue.asyncAfter(deadline: .now() + 10, execute: timeoutWork)
```

**Disconnect Cleanup Pattern (from Step 5):**
```swift
// In didDisconnectPeripheral (extend lines 709-727)
// Clear cached services (existing from Step 5)
cachedServices.removeValue(forKey: uuid)

// Clear pending read state (existing from Step 5)
// ... existing read cleanup ...

// Step 6: Add write timeout cleanup
for (key, timeoutWork) in writeTimeouts where key.deviceId == uuid {
    timeoutWork.cancel()
    writeTimeouts.removeValue(forKey: key)
}

// Step 6: Add write completion cleanup
for (key, completion) in pendingWrites where key.deviceId == uuid {
    let error = BLEError(code: .errorDeviceDisconnected, message: "Device disconnected")
    completion(.failure(error))
    pendingWrites.removeValue(forKey: key)
}

// Step 6: Add monitor cleanup
for (key, _) in activeMonitors where key.deviceId == uuid {
    activeMonitors.removeValue(forKey: key)
}
```

## Risks/Blockers
- **Write without response has no confirmation mechanism**
  - No delegate callback for `.withoutResponse` writes
  - Can only verify success by checking `canSendWriteWithoutResponse`
  - Complete immediately after sending (no timeout needed)
- **MTU size limitations for large writes**
  - Default MTU is 23 bytes (20 bytes payload after 3-byte ATT overhead)
  - Need to respect MTU size for large writes
  - Long writes use ATT_WRITE_LONG_CHARACTERISTIC (automatic in CoreBluetooth)
- **Some characteristics require authentication for write**
  - **CRITICAL:** Project only supports non-bonded peripherals (Step 4 learning)
  - Characteristics requiring pairing/bonding cannot be written
  - Write will fail with error if authentication required
  - Solution: Test with publicly writable characteristics
- **Notification enable may fail silently on some devices**
  - `didUpdateNotificationStateFor` confirms enable/disable
  - Check `characteristic.isNotifying` property for actual state
  - Some peripherals don't support notifications (error returned)
- **Rapid notification bursts may overwhelm callback**
  - No built-in buffering in CoreBluetooth
  - Each notification triggers immediate callback
  - Fast peripherals (100+ Hz) may cause queue backup
  - Solution: Process notifications on background queue (already using this pattern)
- **Monitor cleanup on disconnect is critical**
  - **✅ MITIGATED:** Using Step 5 disconnect cleanup pattern
  - Must remove all activeMonitors for disconnected device
  - Prevents orphaned callbacks and memory leaks
- **canSendWriteWithoutResponse flow control**
  - Must check before each write without response
  - If false, queue write or wait for `peripheralIsReadyToSendWriteWithoutResponse` delegate
  - Step 6 implementation should check and fail fast if not ready
- **Read/notification disambiguation must be precise**
  - **✅ MITIGATED:** Step 5 already implements correct pattern
  - `didUpdateValueFor` first checks `pendingReads`, then `activeMonitors`
  - Early return after read completion prevents double-handling
  - Order is critical: read check MUST come before monitor check

## Recommended Agent
macos-bluetooth-expert

## Estimated Time
2-3 hours
