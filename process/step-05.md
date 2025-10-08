# Step 5: Swift BLE Manager - Read Characteristics

## Objective
Implement characteristic read operations with proper error handling, timeout management, and response delivery.

## Prerequisites
- Step 4: Connection and service discovery working (✅ Complete)
- Generated protobuf types available at `server/Sources/Generated/`
- Connected peripheral with readable characteristics
- Understanding of GATT read operations
- **Non-bonded (unpaired) BLE peripheral** - devices requiring pairing are not supported

## Technical Details

**Important:** Following Step 3-4 patterns:
- BLEManager is `public class` with background queue operations
- Import `Generated` module for protobuf types
- Error codes use `Bleproxy_V1_BleErrorCode` enum via `BLEError` struct
- All operations synchronized on background queue: `DispatchQueue(label: "com.bleproxy.central", qos: .userInitiated)`
- Return types use protobuf `Data` type (compatible with Swift `Data`)
- Timeout pattern from Step 4: `DispatchWorkItem` scheduled on background queue
- All public methods dispatch async to background queue
- Callbacks execute on background queue (callers must dispatch to main if needed)

### File Location
`/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEManager.swift`

### Extend BLEManager
```swift
import CoreBluetooth
import Foundation
import Generated

public class BLEManager {
    // Existing from Steps 3-4
    private let queue = DispatchQueue(label: "com.bleproxy.central", qos: .userInitiated)
    private var discoveredPeripherals: [UUID: CBPeripheral] = [:]
    private var connectedPeripherals: [UUID: CBPeripheral] = [:]
    private var connectionTimeouts: [UUID: DispatchWorkItem] = [:]  // From Step 4

    // New for Step 5
    private var pendingReads: [CharacteristicKey: (Result<Data, Error>) -> Void] = [:]
    private var readTimeouts: [CharacteristicKey: DispatchWorkItem] = [:]
    private var cachedServices: [UUID: [Bleproxy_V1_Service]] = [:]  // From Step 4 discovery

    public func readCharacteristic(
        deviceId: String,  // String UUID, not UUID - matches API pattern
        serviceUUID: String,
        characteristicUUID: String,
        completion: @escaping (Result<Data, Error>) -> Void
    )
}

struct CharacteristicKey: Hashable {
    let deviceId: UUID
    let serviceUUID: CBUUID
    let characteristicUUID: CBUUID
}
```

### Required CBPeripheralDelegate Method
- `peripheral(_:didUpdateValueFor:error:)` - Read response

### Read Flow
1. Verify peripheral is connected
2. Lookup service from cached services (from discovery)
3. Lookup characteristic from service
4. Verify characteristic has .read property
5. Create CharacteristicKey for tracking
6. Store completion in pendingReads
7. Call peripheral.readValue(for: characteristic)
8. Set timeout (5 seconds)
9. On didUpdateValueFor: retrieve completion, return characteristic.value
10. On error: call completion with error
11. On timeout: call completion with timeout error, cancel read

### Error Handling
Use `BLEError` struct from Step 4 with `Bleproxy_V1_BleErrorCode`:
- `errorDeviceNotConnected` - Device not in connectedPeripherals
- `errorServicesNotDiscovered` - No cached services for device (discovery step skipped)
- `errorServiceNotFound` - Service UUID not in cached services
- `errorCharacteristicNotFound` - Characteristic UUID not found in service
- `errorCharacteristicReadFailed` - Read operation failed or timeout (10 seconds)
- `errorCharacteristicNotReadable` - Characteristic doesn't have .read property
- `errorInvalidIdentifiers` - Invalid UUID format

### Timeout Implementation
Follow Step 4 pattern - use background queue for timeout scheduling:

```swift
public func readCharacteristic(deviceId: String, serviceUUID: String, characteristicUUID: String,
                               completion: @escaping (Result<Data, Error>) -> Void) {
    queue.async { [weak self] in
        guard let self = self else {
            completion(.failure(BLEError(code: .errorBluetoothManagerDestroyed, message: "BLEManager deallocated")))
            return
        }

        // ... validation (device connected, service/characteristic lookup) ...

        let key = CharacteristicKey(deviceId: uuid, serviceUUID: serviceUUID, characteristicUUID: charUUID)

        // Create timeout work item (10 seconds for read operations - more liberal than connection)
        let timeoutWork = DispatchWorkItem { [weak self] in
            guard let self = self else { return }

            if let completion = self.pendingReads.removeValue(forKey: key) {
                let error = BLEError(
                    code: .errorCharacteristicReadFailed,
                    message: "Read timeout after 10 seconds"
                )
                completion(.failure(error))
                print("BLEManager: Read timeout for \(characteristicUUID)")
            }
        }

        // Store completion and timeout
        self.pendingReads[key] = completion
        self.readTimeouts[key] = timeoutWork

        // Schedule timeout on background queue
        self.queue.asyncAfter(deadline: .now() + 10, execute: timeoutWork)

        // Initiate read
        peripheral.readValue(for: characteristic)
        print("BLEManager: Reading characteristic \(characteristicUUID) (10s timeout)")
    }
}

// In didUpdateValueFor delegate:
func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
    let uuid = peripheral.identifier
    // ... create key ...

    // Cancel timeout
    if let timeoutWork = readTimeouts.removeValue(forKey: key) {
        timeoutWork.cancel()
    }

    // Call completion
    if let completion = pendingReads.removeValue(forKey: key) {
        if let error = error {
            completion(.failure(BLEError(code: .errorCharacteristicReadFailed, message: error.localizedDescription)))
        } else {
            completion(.success(characteristic.value ?? Data()))
        }
    }
}
```

## Acceptance Criteria
- [ ] Can read characteristic value by UUID triplet
- [ ] Returns error if device not connected
- [ ] Returns error if services not discovered
- [ ] Returns error if service not found
- [ ] Returns error if characteristic not found
- [ ] Returns error if characteristic not readable
- [ ] Read timeout after 10 seconds (liberal timeout for slower peripherals)
- [ ] Returns Data (bytes) on success
- [ ] Handles empty characteristic values (0 bytes)
- [ ] Handles large values (up to 512 bytes)
- [ ] Concurrent reads to different characteristics work
- [ ] Completion called exactly once per read

## Testing Instructions

**IMPORTANT:** Integration tests require a **non-bonded (unpaired) BLE peripheral** with readable characteristics. See ConnectionTests.swift header for compatible peripheral types. Devices requiring pairing will cause connection timeouts in the connection phase.

**Peripheral Requirements:**
- Must be connectable (not just advertising)
- Must have at least one service with readable characteristics
- Common readable characteristics:
  - Device Name (0x2A00) - usually in Generic Access Service (0x1800)
  - Manufacturer Name (0x2A29) - usually in Device Information Service (0x180A)
  - Battery Level (0x2A19) - in Battery Service (0x180F)
  - Heart Rate Measurement (0x2A37) - in Heart Rate Service (0x180D)

```bash
# Create read test
cat > /Users/ericfrank/ble_bridge/server/Tests/BLEProxyTests/ReadTests.swift << 'EOF'
import XCTest
@testable import BLEProxy

final class ReadTests: XCTestCase {
    var manager: BLEManager!
    var testDeviceId: UUID!
    var testServiceUUID: CBUUID!
    var testCharUUID: CBUUID!

    override func setUp() {
        // Setup from previous tests - connect and discover
        manager = BLEManager()
        // ... scan, connect, discover ...
        // Store known readable characteristic UUIDs
    }

    func testReadSuccess() {
        let exp = XCTestExpectation(description: "Read")

        manager.readCharacteristic(
            deviceId: testDeviceId,
            serviceUUID: testServiceUUID,
            characteristicUUID: testCharUUID
        ) { result in
            switch result {
            case .success(let data):
                XCTAssertNotNil(data)
                print("Read \(data.count) bytes: \(data.hexString)")
            case .failure(let error):
                XCTFail("Read failed: \(error)")
            }
            exp.fulfill()
        }

        wait(for: [exp], timeout: 6.0)
    }

    func testReadNotFound() {
        let fakeUUID = CBUUID(string: "00000000-0000-0000-0000-000000000000")
        let exp = XCTestExpectation(description: "Read error")

        manager.readCharacteristic(
            deviceId: testDeviceId,
            serviceUUID: testServiceUUID,
            characteristicUUID: fakeUUID
        ) { result in
            switch result {
            case .success:
                XCTFail("Should have failed")
            case .failure(let error):
                XCTAssertTrue(error.localizedDescription.contains("not found"))
            }
            exp.fulfill()
        }

        wait(for: [exp], timeout: 1.0)
    }

    func testReadDisconnected() {
        let disconnectedId = UUID()
        let exp = XCTestExpectation(description: "Not connected")

        manager.readCharacteristic(
            deviceId: disconnectedId,
            serviceUUID: testServiceUUID,
            characteristicUUID: testCharUUID
        ) { result in
            XCTAssertThrowsError(try result.get())
            exp.fulfill()
        }

        wait(for: [exp], timeout: 1.0)
    }
}
EOF

# Run tests
swift test --filter ReadTests

# Manual test with known device
swift run BLEProxyServer --test-read <device-id> <service-uuid> <char-uuid>
```

## Dependencies
- CoreBluetooth framework
- Step 4 connection and discovery
- Physical peripheral with readable characteristics
- Dispatch framework for timeouts

## Risks/Blockers
- **Some characteristics require authentication to read**
  - **CRITICAL:** Project only supports non-bonded peripherals (Step 4 learning)
  - Characteristics requiring pairing/bonding cannot be read
  - Read will fail with error or timeout if authentication required
  - Solution: Test with publicly readable characteristics (Device Name, Manufacturer Name, etc.)
- iOS/macOS cache characteristic values aggressively
  - May return cached value instead of fresh read
  - No way to force cache bypass in CoreBluetooth
- Timeout mechanism must cancel pending operation
  - **✅ MITIGATED:** Using Step 4 timeout pattern with DispatchWorkItem
  - 10-second timeout (liberal for slower peripherals)
- Need to handle case where value is nil (empty characteristic)
  - Return empty Data() instead of nil for consistency
- Concurrent reads to same characteristic may conflict
  - CharacteristicKey includes all three UUIDs for uniqueness
  - Multiple reads to same characteristic should queue or be rejected
- Some devices have maximum read size limitations
  - Standard BLE max is 512 bytes per read
  - Long reads use ATT_READ_BLOB (automatic in CoreBluetooth)
- Need proper cleanup if peripheral disconnects during read
  - Cleanup in `didDisconnectPeripheral` delegate (from Step 4)
  - Remove pending reads and cancel timeouts on disconnect

## Recommended Agent
macos-bluetooth-expert

## Estimated Time
2 hours
