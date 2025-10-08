# Step 7: Swift BLE Manager - RSSI Reading and Error Handling

## Objective
Implement RSSI reading for connected peripherals and create comprehensive error handling system with proper error code mapping.

## Prerequisites
- Step 6: Write and monitor operations working (✅ Complete)
- Generated protobuf types available at `server/Sources/Generated/`
- Understanding of BLE error conditions
- react-native-ble-plx error code reference
- **Non-bonded (unpaired) BLE peripheral** - devices requiring pairing are not supported

## Technical Details

**Important:** Error handling uses generated protobuf types:
- Error codes defined in `Bleproxy_V1_BleErrorCode` enum (see server/Sources/Generated/ble_proxy.pb.swift)
- Enum includes all react-native-ble-plx error codes (0-599)
- Swift enum uses camelCase: `.errorUnknown`, `.errorBluetoothPoweredOff`, etc.
- **✅ ALREADY IMPLEMENTED:** Swift `BLEError` struct created in Step 4 (`server/Sources/BLEProxy/BLEError.swift`)
- BLEError wraps `Bleproxy_V1_BleErrorCode` and provides `toProto()` method
- Server layer (Steps 8-10) will use `BLEError.toProto()` to convert to `Bleproxy_V1_Error` message
- Following Step 4-6 patterns: timeout using `DispatchWorkItem`, background queue scheduling

### File Location
`/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEManager.swift`
`/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEError.swift` (✅ already exists from Step 4)

### Extend BLEManager
```swift
import CoreBluetooth
import Foundation
import Generated

public class BLEManager {
    // Existing from Steps 3-6
    private let queue = DispatchQueue(label: "com.bleproxy.central", qos: .userInitiated)
    private var discoveredPeripherals: [UUID: CBPeripheral] = [:]
    private var connectedPeripherals: [UUID: CBPeripheral] = [:]
    private var connectionTimeouts: [UUID: DispatchWorkItem] = [:]  // From Step 4
    private var readTimeouts: [CharacteristicKey: DispatchWorkItem] = [:]  // From Step 5
    private var writeTimeouts: [CharacteristicKey: DispatchWorkItem] = [:]  // From Step 6

    // New for Step 7
    private var pendingRSSIReads: [UUID: (Result<Int32, Error>) -> Void] = [:]
    private var rssiTimeouts: [UUID: DispatchWorkItem] = [:]

    public func readRSSI(deviceId: String, completion: @escaping (Result<Int32, Error>) -> Void)  // String UUID to match API pattern
}
```

### Required CBPeripheralDelegate Method
- `peripheral(_:didReadRSSI:error:)` - RSSI read response

### RSSI Read Flow
Follow Step 4 timeout pattern:
1. Dispatch async to background queue
2. Parse deviceId string to UUID
3. Verify peripheral is connected
4. Store completion in pendingRSSIReads (keyed by device UUID)
5. Create timeout work item (10 seconds - consistent with read/write timeouts)
6. Schedule timeout on background queue using `queue.asyncAfter`
7. Call peripheral.readRSSI()
8. On didReadRSSI: cancel timeout, convert NSNumber to Int32, call completion
9. On error or timeout: cancel/call completion with BLEError

### Error System

**Note:** The protobuf schema already defines all error codes in `Bleproxy_V1_BleErrorCode` enum matching react-native-ble-plx.
Available error codes include (see ble_proxy.pb.swift for complete list):
- `.errorUnknown` (0)
- `.errorBluetoothManagerDestroyed` (1)
- `.errorOperationCancelled` (2)
- `.errorOperationTimedOut` (3)
- `.errorBluetoothUnsupported` (100)
- `.errorBluetoothUnauthorized` (101)
- `.errorBluetoothPoweredOff` (102)
- `.errorDeviceNotFound` (200)
- `.errorDeviceNotConnected` (201)
- `.errorDeviceAlreadyConnected` (202)
- And many more (300-599 for characteristic/service/descriptor operations)

#### Create BLEError Wrapper
Create `BLEProxy/BLEError.swift` to wrap protobuf error codes:
```swift
import Foundation
import Generated

/// BLE operation error with protobuf error code mapping
public struct BLEError: Error {
    public let code: Bleproxy_V1_BleErrorCode
    public let message: String

    public init(code: Bleproxy_V1_BleErrorCode, message: String) {
        self.code = code
        self.message = message
    }

    // Convenience constructors for common errors
    public static func unknown(_ message: String = "Unknown error") -> BLEError {
        BLEError(code: .errorUnknown, message: message)
    }

    public static func timeout(_ message: String = "Operation timed out") -> BLEError {
        BLEError(code: .errorOperationTimedOut, message: message)
    }

    public static func deviceNotFound(_ deviceId: String) -> BLEError {
        BLEError(code: .errorDeviceNotFound, message: "Device not found: \(deviceId)")
    }

    public static func deviceNotConnected(_ deviceId: String) -> BLEError {
        BLEError(code: .errorDeviceNotConnected, message: "Device not connected: \(deviceId)")
    }

    public static func bluetoothPoweredOff() -> BLEError {
        BLEError(code: .errorBluetoothPoweredOff, message: "Bluetooth is powered off")
    }

    // Add more convenience methods as needed

    /// Convert to protobuf Error message for server responses
    public func toProto() -> Bleproxy_V1_Error {
        var error = Bleproxy_V1_Error()
        error.code = code
        error.message = message
        return error
    }
}
```

#### CoreBluetooth Error Mapping
```swift
func mapCoreBluetoothError(_ error: Error?) -> BLEError {
    guard let cbError = error as? CBError else {
        return .serverError(reason: error?.localizedDescription ?? "Unknown error")
    }

    switch cbError.code {
    case .connectionFailed:
        return .deviceConnectionFailed(reason: cbError.localizedDescription)
    case .connectionTimeout:
        return .deviceConnectionFailed(reason: "Connection timeout")
    case .peripheralDisconnected:
        return .deviceDisconnected(reason: cbError.localizedDescription)
    case .unknown:
        return .serverError(reason: "Unknown CoreBluetooth error")
    default:
        return .serverError(reason: cbError.localizedDescription)
    }
}
```

### Update All Operations
- Replace generic errors with BLEError throughout BLEManager
- Add validation checks that throw appropriate errors
- Convert CBError to BLEError in all delegate callbacks

## Acceptance Criteria
- [x] Can read RSSI for connected peripheral
- [x] RSSI value is correct (negative integer)
- [x] Returns error if device not connected
- [x] RSSI read times out after 10 seconds (deviation: 10s instead of 5s for consistency with read/write)
- [x] All error codes match react-native-ble-plx
- [x] ServerError code is 1000
- [x] Error messages are descriptive
- [x] Error.toProto() generates valid protobuf Error
- [x] All BLEManager operations use BLEError
- [x] CoreBluetooth errors are properly mapped
- [x] Timeout errors have code 3 (deviation: ERROR_OPERATION_TIMED_OUT, not 1001 which is for server layer)

## Testing Instructions
```bash
# Create RSSI test
cat > /Users/ericfrank/ble_bridge/server/Tests/BLEProxyTests/RSSITests.swift << 'EOF'
import XCTest
@testable import BLEProxy

final class RSSITests: XCTestCase {
    var manager: BLEManager!
    var testDeviceId: UUID!

    func testRSSIRead() {
        let exp = XCTestExpectation(description: "RSSI")

        manager.readRSSI(deviceId: testDeviceId) { result in
            switch result {
            case .success(let rssi):
                XCTAssertLessThan(rssi, 0, "RSSI should be negative")
                XCTAssertGreaterThan(rssi, -100, "RSSI should be > -100")
                print("RSSI: \(rssi) dBm")
            case .failure(let error):
                XCTFail("RSSI read failed: \(error)")
            }
            exp.fulfill()
        }

        wait(for: [exp], timeout: 6.0)
    }

    func testRSSINotConnected() {
        let disconnectedId = UUID()
        let exp = XCTestExpectation(description: "Error")

        manager.readRSSI(deviceId: disconnectedId) { result in
            switch result {
            case .success:
                XCTFail("Should have failed")
            case .failure(let error as BLEError):
                XCTAssertEqual(error.code, 205) // DEVICE_NOT_CONNECTED
            case .failure:
                XCTFail("Wrong error type")
            }
            exp.fulfill()
        }

        wait(for: [exp], timeout: 1.0)
    }
}

# Error mapping test
final class ErrorMappingTests: XCTestCase {
    func testErrorCodes() {
        XCTAssertEqual(BLEError.bluetoothPoweredOff.code, 100)
        XCTAssertEqual(BLEError.deviceNotConnected.code, 205)
        XCTAssertEqual(BLEError.characteristicNotFound(uuid: "test").code, 503)
        XCTAssertEqual(BLEError.serverError(reason: "test").code, 1000)
    }

    func testProtoConversion() {
        let bleError = BLEError.deviceNotFound
        let protoError = bleError.toProto()
        XCTAssertEqual(protoError.code, 204)
        XCTAssertFalse(protoError.message.isEmpty)
    }
}
EOF

# Run tests
swift test --filter RSSITests
swift test --filter ErrorMappingTests

# Verify error code completeness
swift run BLEProxyServer --list-error-codes
```

## Dependencies
- CoreBluetooth framework
- Step 6 operations for error integration
- swift-protobuf for Error message
- Physical connected peripheral for RSSI testing

## Risks/Blockers
- RSSI values can fluctuate significantly
- Some peripherals don't support RSSI reading while connected
- Error code mapping must be exhaustive
- Need to verify all react-native-ble-plx error codes are covered
- Timeout error code may conflict with future versions
- LocalizedDescription may not be user-friendly
- Need consistent error handling pattern across all operations

## Recommended Agent
macos-bluetooth-expert

## Estimated Time
2 hours

## Completion Notes (2025-10-06)

**Status:** ✅ COMPLETE

All functionality was already implemented in the codebase. The macos-bluetooth-expert agent validated and tested the implementation.

**Implementation Summary:**
- RSSI reading: `BLEManager.readRSSI()` method (lines 796-852)
- Delegate: `peripheral(_:didReadRSSI:error:)` (lines 1386-1414)
- Error handling: `BLEError.swift` wraps protobuf error codes (44 lines)
- Disconnect cleanup: Extended in lines 1148-1158
- Tests: `RSSITests.swift` with 8 test cases (5 unit, 3 integration)
- CLI tool: `ble-rssi-test` for manual validation

**Test Results:**
- 8/8 tests passing
- Real hardware validation with Fi-*, FB-* peripherals
- RSSI values: -75 to -98 dBm (typical range)
- One test fixed: `testRSSICleanupOnDisconnect` race condition resolved

**Design Deviations (Intentional):**
1. **10-second timeout** instead of 5 seconds - Maintains consistency with Step 5 (read) and Step 6 (write) operations
2. **Error code 3** for timeouts instead of 1001 - Code 3 (`ERROR_OPERATION_TIMED_OUT`) is correct for BLE layer; code 1001 (`ERROR_SERVER_TIMEOUT`) is reserved for HTTP/WebSocket layer in Steps 8-10

**Hardware Tested:**
- Fi-FC35D000113 (Fi collar) - RSSI reads successful
- FB6418, FB8113 - Discovery and RSSI validated
- Multiple Apple devices - Used for general BLE testing

**Key Insights:**
- RSSI fluctuates 5-20 dB for stationary devices (expected behavior)
- NSNumber to Int32 conversion required for protobuf compatibility
- UUID keying used (not CharacteristicKey) since RSSI is per-device property
- BLEError system ready for server layer (Steps 8-10) via `toProto()` method

**Next Step:** Ready for Step 8 (Vapor HTTP Server Setup)
