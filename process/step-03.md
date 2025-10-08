# Step 3: Swift BLE Manager - Scan for Peripherals

## Objective
Create a Swift CoreBluetooth wrapper that can scan for BLE peripherals and report discovered devices via a callback mechanism.

## Prerequisites
- Step 2: Protobuf code generation is complete
- Generated Swift code at `server/Sources/Generated/ble_proxy.pb.swift`
- Swift Package Manager configured with SwiftProtobuf dependency
- macOS development environment with Xcode
- Understanding of CBCentralManager and CBPeripheral

## Technical Details

**Important:** This step has been updated to reflect the actual generated protobuf types from Steps 1-2:
- Generated Swift types use `Bleproxy_V1_` prefix (e.g., `Bleproxy_V1_Device`, `Bleproxy_V1_ManagerState`)
- The `Generated` module must be imported to access protobuf types
- Enum cases use Swift camelCase convention (e.g., `.poweredOn`, not `.POWERED_ON`)

### File Location
`/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEManager.swift`

### Package.swift Updates
Before implementing BLEManager, update `server/Package.swift` to add the BLEProxy target:
```swift
.target(
    name: "BLEProxy",
    dependencies: [
        .target(name: "Generated"),
        .product(name: "SwiftProtobuf", package: "swift-protobuf"),
    ],
    path: "Sources/BLEProxy"
),
```

### Class Structure
```swift
import CoreBluetooth
import Foundation
import Generated  // Import generated protobuf types

class BLEManager: NSObject, CBCentralManagerDelegate {
    private var centralManager: CBCentralManager!
    private var discoveredPeripherals: [UUID: CBPeripheral] = [:]
    private var scanCallback: ((Bleproxy_V1_Device) -> Void)?
    private var stateCallback: ((Bleproxy_V1_ManagerState) -> Void)?

    func startScan(serviceUUIDs: [CBUUID]?, callback: @escaping (Bleproxy_V1_Device) -> Void)
    func stopScan()
    func getState() -> Bleproxy_V1_ManagerState
}
```

**Note:** The callback uses `Bleproxy_V1_Device` directly (not `ScanResultEvent`). The `ScanResultEvent` wrapper with timestamp will be created at the server/HTTP layer when broadcasting via WebSocket.

### Required CBCentralManagerDelegate Methods
- `centralManagerDidUpdateState(_:)` - Track manager state and invoke stateCallback
- `centralManager(_:didDiscover:advertisementData:rssi:)` - Convert to `Bleproxy_V1_Device` and invoke scanCallback

### Key Implementation Details
- Initialize CBCentralManager on background queue (DispatchQueue for Swift)
- Map CBManagerState to `Bleproxy_V1_ManagerState` enum
- Extract advertisement data and populate `Bleproxy_V1_Device`:
  - `id`: peripheral.identifier.uuidString (String)
  - `name`: kCBAdvDataLocalName (optional String)
  - `rssi`: NSNumber converted to Int32
  - `service_uuids`: kCBAdvDataServiceUUIDs converted to [String]
  - `manufacturer_data`: kCBAdvDataManufacturerData (optional Data)
  - `service_data`: kCBAdvDataServiceData as [String: Data] map
  - `tx_power_level`: kCBAdvDataTxPowerLevel (optional Int32)
  - `is_connectable`: kCBAdvDataIsConnectable (optional Bool)
  - `solicited_service_uuids`: kCBAdvDataSolicitedServiceUUIDs (optional [String])
  - `overflow_service_uuids`: kCBAdvDataOverflowServiceUUIDs (optional [String])
- Store peripheral references to prevent deallocation
- Thread-safe access to peripherals dictionary using dispatch queue or actor

### State Mapping
```swift
CBManagerState.unknown → Bleproxy_V1_ManagerState.unknown
CBManagerState.resetting → Bleproxy_V1_ManagerState.resetting
CBManagerState.unsupported → Bleproxy_V1_ManagerState.unsupported
CBManagerState.unauthorized → Bleproxy_V1_ManagerState.unauthorized
CBManagerState.poweredOff → Bleproxy_V1_ManagerState.poweredOff
CBManagerState.poweredOn → Bleproxy_V1_ManagerState.poweredOn
```

## Acceptance Criteria
- [ ] BLEManager initializes without errors
- [ ] State callback fires on initialization with valid `Bleproxy_V1_ManagerState`
- [ ] Can start scan when powered on
- [ ] Cannot start scan when not powered on (returns error)
- [ ] Scan callback fires for each discovered peripheral
- [ ] `Bleproxy_V1_Device` contains all required fields (id, rssi) and available optional fields
- [ ] Device IDs are stable across multiple discoveries (same peripheral = same UUID string)
- [ ] Can stop scan successfully
- [ ] Peripherals are retained during scan (stored in dictionary)
- [ ] Thread-safe access to peripheral dictionary
- [ ] Service UUIDs are correctly converted from CBUUID to String format

## Testing Instructions
```bash
# First, update Package.swift to add test target
# Add to Package.swift targets array:
# .testTarget(
#     name: "BLEProxyTests",
#     dependencies: ["BLEProxy", "Generated"]
# )

# Create test directory
mkdir -p /Users/ericfrank/ble_bridge/server/Tests/BLEProxyTests

# Create test harness
cat > /Users/ericfrank/ble_bridge/server/Tests/BLEProxyTests/BLEManagerTests.swift << 'EOF'
import XCTest
import Generated
@testable import BLEProxy

final class BLEManagerTests: XCTestCase {
    func testManagerInitialization() {
        let manager = BLEManager()
        let expectation = XCTestExpectation(description: "State callback")

        manager.stateCallback = { state in
            XCTAssertNotEqual(state, .unknown)
            expectation.fulfill()
        }

        wait(for: [expectation], timeout: 5.0)
    }

    func testScanStart() {
        let manager = BLEManager()
        var results: [Bleproxy_V1_Device] = []

        manager.startScan(serviceUUIDs: nil) { device in
            results.append(device)
            print("Found device: \(device.id), name: \(device.name ?? "unknown"), rssi: \(device.rssi)")
        }

        // Manually verify peripheral is nearby
        sleep(5)
        manager.stopScan()

        XCTAssertGreaterThan(results.count, 0, "Should discover at least one peripheral")
    }

    func testStateMapping() {
        let manager = BLEManager()
        let state = manager.getState()

        // State should be one of the valid enum values
        XCTAssertTrue([
            .unknown, .resetting, .unsupported,
            .unauthorized, .poweredOff, .poweredOn
        ].contains(state))
    }
}
EOF

# Run tests (requires physical BLE peripheral nearby)
cd /Users/ericfrank/ble_bridge/server
swift test --filter BLEManagerTests

# For manual testing, create a simple executable
# (This will be part of Step 8 server implementation)
```

## Dependencies
- CoreBluetooth framework (macOS SDK)
- Dispatch framework (for thread-safe queue management)
- Generated module (`server/Sources/Generated/`) - contains protobuf types
- SwiftProtobuf package (already in Package.swift from Step 2)
- macOS 13.0+ (as specified in Package.swift platforms)

## Risks/Blockers
- Bluetooth permission prompts on first run (requires Info.plist configuration if building app)
- Need physical BLE peripheral for testing
- CBCentralManager state may not be immediately poweredOn
- Peripheral discovery callback rate limiting
- Advertisement data may be incomplete on some devices (not all fields always present)
- Thread safety for peripheral dictionary access
- CBUUID to String conversion format (ensure consistent UUID string representation)
- Data/NSData conversion to Swift Data type for protobuf bytes fields
- Service data map requires proper conversion from [CBUUID: Any] to [String: Data]

## Recommended Agent
macos-bluetooth-expert

## Estimated Time
2-3 hours

---

## Completion Summary

**Status:** ✅ Complete (2025-10-05)

### Implementation Results
- **File Created:** `server/Sources/BLEProxy/BLEManager.swift` (244 lines)
- **Tests Created:** `server/Tests/BLEProxyTests/BLEManagerTests.swift` (134 lines, 6 tests, 100% pass rate)
- **CLI Tool Created:** `server/Sources/BLEScanTool/main.swift` (103 lines)
- **Package Updated:** `server/Package.swift` (added BLEProxy, BLEProxyTests, BLEScanTool targets)

### Test Results
```
Executed 6 tests, with 0 failures (0 unexpected) in 2.660 seconds
✓ Integration test discovered real BLE peripheral (ID: 8C80878D-A1C8-DAFE-90CA-7C8C7A847CC1, RSSI: -79 dBm)
✓ All 11 acceptance criteria validated
```

### Key Implementation Details

**Protobuf Type Usage:**
- All types use `Bleproxy_V1_` prefix: `Bleproxy_V1_Device`, `Bleproxy_V1_ManagerState`
- Must `import Generated` module
- Enum cases are camelCase: `.poweredOn`, `.unknown` (not uppercase)
- Optional fields have `has*` properties: `device.hasManufacturerData`, `device.hasTxPowerLevel`

**Architecture Established:**
- BLEManager is `public class` (needed for server layer in Steps 8-10)
- Background queue for all CoreBluetooth operations: `DispatchQueue(label: "com.bleproxy.central", qos: .userInitiated)`
- Callbacks execute on background queue (callers must dispatch to main if updating UI)
- Peripheral storage: `[UUID: CBPeripheral]` dictionary prevents deallocation
- Device IDs: `peripheral.identifier.uuidString` ensures stability across discoveries

**Thread Safety:**
- All peripheral dictionary access synchronized via background queue
- No separate locks needed when all access goes through queue
- Documented callback threading behavior in comments

### Files Reference
- **Implementation:** `server/Sources/BLEProxy/BLEManager.swift`
- **Tests:** `server/Tests/BLEProxyTests/BLEManagerTests.swift`
- **CLI Tool:** `server/Sources/BLEScanTool/main.swift` (run with `swift run ble-scan`)
- **Package Config:** `server/Package.swift`

### Next Step
Ready to proceed to Step 4 (Connect and Discover Services). All patterns documented in step-04.md.
