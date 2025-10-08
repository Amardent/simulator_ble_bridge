# Step 4: Swift BLE Manager - Connect and Discover Services

## Objective
Extend BLEManager to connect to peripherals, discover services and characteristics, and maintain connection state.

## Prerequisites
- Step 3: BLE scanning is working (✅ Complete)
- Generated protobuf types available at `server/Sources/Generated/`
- Understanding of CBPeripheral delegate pattern
- Knowledge of GATT service/characteristic hierarchy

## Technical Details

**Important:** Updated to reflect actual implementation patterns from Step 3:
- BLEManager is a `public class` (used by server layer in Steps 8-10)
- All operations use dedicated background queue: `DispatchQueue(label: "com.bleproxy.central", qos: .userInitiated)`
- Peripherals stored by UUID: `[UUID: CBPeripheral]`
- Protobuf types use `Bleproxy_V1_` prefix (e.g., `Bleproxy_V1_Service`, `Bleproxy_V1_Characteristic`)
- Must import `Generated` module for protobuf types
- Callbacks execute on background queue (callers dispatch to main if needed)

### File Location
`/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEManager.swift`

### Extend BLEManager
```swift
import CoreBluetooth
import Foundation
import Generated

public class BLEManager: NSObject, CBCentralManagerDelegate, CBPeripheralDelegate {
    // Existing from Step 3
    private var centralManager: CBCentralManager!
    private let queue = DispatchQueue(label: "com.bleproxy.central", qos: .userInitiated)
    private var discoveredPeripherals: [UUID: CBPeripheral] = [:]

    // New for Step 4
    private var connectedPeripherals: [UUID: CBPeripheral] = [:]
    private var pendingConnections: [UUID: (Result<Void, Error>) -> Void] = [:]
    private var pendingDiscoveries: [UUID: (Result<[Bleproxy_V1_Service], Error>) -> Void] = [:]
    private var characteristicDiscoveryCount: [UUID: (total: Int, completed: Int)] = [:]

    public func connect(deviceId: UUID, completion: @escaping (Result<Void, Error>) -> Void)
    public func disconnect(deviceId: UUID, completion: @escaping (Result<Void, Error>) -> Void)
    public func discoverServices(deviceId: UUID, completion: @escaping (Result<[Bleproxy_V1_Service], Error>) -> Void)
    public func isConnected(deviceId: UUID) -> Bool
}
```

### Required CBCentralManagerDelegate Methods
- `centralManager(_:didConnect:)` - Handle successful connection
- `centralManager(_:didFailToConnect:error:)` - Handle connection failure
- `centralManager(_:didDisconnectPeripheral:error:)` - Handle disconnection

### Required CBPeripheralDelegate Methods
- `peripheral(_:didDiscoverServices:)` - Services discovered
- `peripheral(_:didDiscoverCharacteristicsFor:error:)` - Characteristics discovered
- `peripheral(_:didDiscoverDescriptorsFor:error:)` - Descriptors discovered (optional for v1)

### Connection Flow
1. Lookup peripheral from discoveredPeripherals
2. Return error if peripheral not found
3. Set peripheral.delegate = self
4. Call centralManager.connect(peripheral, options: nil)
5. Store completion handler in pendingConnections
6. On didConnect: call completion, move to connectedPeripherals
7. On didFailToConnect: call completion with error, cleanup

### Discovery Flow
1. Verify peripheral is connected
2. Call peripheral.discoverServices(nil) for all services
3. Store completion in pendingDiscoveries
4. On didDiscoverServices: iterate each service
5. Call service.discoverCharacteristics(nil, for: service)
6. On didDiscoverCharacteristics: convert to protobuf Service
7. Call completion with array of Services

### Protobuf Conversion

**Note:** Actual protobuf types from `server/Sources/Generated/ble_proxy.pb.swift`:
- `Bleproxy_V1_Service` has: `uuid: String`, `characteristics: [Bleproxy_V1_Characteristic]`, `isPrimary: Bool` (optional with `hasIsPrimary`)
- `Bleproxy_V1_Characteristic` has: `uuid: String`, `properties: [String]`, `descriptors: [Bleproxy_V1_Descriptor]`, `value: Data` (optional with `hasValue`)
- Properties are strings: `"broadcast"`, `"read"`, `"writeWithoutResponse"`, `"write"`, `"notify"`, `"indicate"`, `"authenticatedSignedWrites"`, `"extendedProperties"`

```swift
/// Convert CBService to protobuf Service type
private func convertToProtoService(_ cbService: CBService) -> Bleproxy_V1_Service {
    var service = Bleproxy_V1_Service()
    service.uuid = cbService.uuid.uuidString
    service.isPrimary = cbService.isPrimary
    service.characteristics = cbService.characteristics?.map { char in
        convertToProtoCharacteristic(char)
    } ?? []
    return service
}

/// Convert CBCharacteristic to protobuf Characteristic type
private func convertToProtoCharacteristic(_ char: CBCharacteristic) -> Bleproxy_V1_Characteristic {
    var characteristic = Bleproxy_V1_Characteristic()
    characteristic.uuid = char.uuid.uuidString
    characteristic.properties = convertProperties(char.properties)
    // Note: value is not set here, only during read operations (Step 5)
    // Note: descriptors discovery is optional for v1
    return characteristic
}

/// Convert CBCharacteristicProperties to string array
private func convertProperties(_ cbProps: CBCharacteristicProperties) -> [String] {
    var props: [String] = []
    if cbProps.contains(.broadcast) { props.append("broadcast") }
    if cbProps.contains(.read) { props.append("read") }
    if cbProps.contains(.writeWithoutResponse) { props.append("writeWithoutResponse") }
    if cbProps.contains(.write) { props.append("write") }
    if cbProps.contains(.notify) { props.append("notify") }
    if cbProps.contains(.indicate) { props.append("indicate") }
    if cbProps.contains(.authenticatedSignedWrites) { props.append("authenticatedSignedWrites") }
    if cbProps.contains(.extendedProperties) { props.append("extendedProperties") }
    return props
}
```

## Acceptance Criteria
- [ ] Can connect to discovered peripheral by UUID
- [ ] Connection fails with error if peripheral not found
- [ ] Connection timeout handled (30 second default)
- [ ] Can disconnect from peripheral
- [ ] Disconnection callback includes error if unexpected
- [ ] Can discover all services after connection
- [ ] Discovery returns all characteristics for each service
- [ ] Characteristic properties are correctly mapped
- [ ] Cannot discover services on disconnected peripheral
- [ ] Multiple simultaneous connections are handled
- [ ] Completion handlers are called exactly once
- [ ] Cleanup on connection failure

## Testing Instructions

**IMPORTANT:** Integration tests require a **non-bonded (unpaired) BLE peripheral**. See ConnectionTests.swift header for compatible peripheral types. Devices requiring pairing (Apple devices, previously paired sensors, smart locks) will cause connection timeouts.

```bash
# Create test file
cat > /Users/ericfrank/ble_bridge/server/Tests/BLEProxyTests/ConnectionTests.swift << 'EOF'
import XCTest
import Generated
@testable import BLEProxy

final class ConnectionTests: XCTestCase {
    var manager: BLEManager!
    var testDeviceId: UUID?

    override func setUp() {
        manager = BLEManager()

        // Wait for powered on state
        let stateExp = XCTestExpectation(description: "Powered on")
        manager.stateCallback = { state in
            if state == .poweredOn {
                stateExp.fulfill()
            }
        }
        wait(for: [stateExp], timeout: 5.0)

        // Scan for any peripheral (use first discovered)
        let scanExp = XCTestExpectation(description: "Find device")
        manager.startScan(serviceUUIDs: nil) { device in
            // Use first discovered device
            if self.testDeviceId == nil {
                self.testDeviceId = UUID(uuidString: device.id)
                scanExp.fulfill()
            }
        }
        wait(for: [scanExp], timeout: 10.0)
        manager.stopScan()
    }

    func testConnection() {
        guard let deviceId = testDeviceId else {
            XCTFail("No test device")
            return
        }

        let connectExp = XCTestExpectation(description: "Connect")
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                print("✓ Connected to \(deviceId)")
            case .failure(let error):
                XCTFail("Connection failed: \(error)")
            }
            connectExp.fulfill()
        }
        wait(for: [connectExp], timeout: 30.0)

        XCTAssertTrue(manager.isConnected(deviceId: deviceId))
    }

    func testDiscovery() {
        // First connect
        guard let deviceId = testDeviceId else {
            XCTFail("No test device")
            return
        }

        let connectExp = XCTestExpectation(description: "Connect")
        manager.connect(deviceId: deviceId) { result in
            XCTAssertNoThrow(try result.get())
            connectExp.fulfill()
        }
        wait(for: [connectExp], timeout: 30.0)

        // Then discover
        let discoverExp = XCTestExpectation(description: "Discover")
        manager.discoverServices(deviceId: deviceId) { result in
            switch result {
            case .success(let services):
                XCTAssertGreaterThan(services.count, 0, "Should discover at least one service")
                for service in services {
                    XCTAssertFalse(service.uuid.isEmpty, "Service UUID should not be empty")
                    print("  Service: \(service.uuid), Primary: \(service.hasIsPrimary ? service.isPrimary : false)")
                    for char in service.characteristics {
                        print("    Characteristic: \(char.uuid), Properties: \(char.properties)")
                    }
                }
            case .failure(let error):
                XCTFail("Discovery failed: \(error)")
            }
            discoverExp.fulfill()
        }
        wait(for: [discoverExp], timeout: 15.0)
    }

    func testDisconnect() {
        guard let deviceId = testDeviceId else {
            XCTFail("No test device")
            return
        }

        // Connect first
        let connectExp = XCTestExpectation(description: "Connect")
        manager.connect(deviceId: deviceId) { _ in
            connectExp.fulfill()
        }
        wait(for: [connectExp], timeout: 30.0)

        // Then disconnect
        let disconnectExp = XCTestExpectation(description: "Disconnect")
        manager.disconnect(deviceId: deviceId) { result in
            XCTAssertNoThrow(try result.get())
            disconnectExp.fulfill()
        }
        wait(for: [disconnectExp], timeout: 5.0)

        XCTAssertFalse(manager.isConnected(deviceId: deviceId))
    }
}
EOF

# Run tests (requires physical BLE peripheral nearby)
cd /Users/ericfrank/ble_bridge/server
swift test --filter ConnectionTests
```

## Dependencies
- CoreBluetooth framework
- Step 3 BLEManager scan functionality
- Physical BLE peripheral with known services

## Risks/Blockers
- Connection can fail silently (no timeout in CBCentralManager)
  - **✅ MITIGATED:** Implemented 60-second timeout using DispatchWorkItem
- Peripheral may disconnect unexpectedly during discovery
- **Some peripherals require pairing (not supported in v1)**
  - **CRITICAL:** This is a fundamental limitation of the project scope
  - Peripherals requiring pairing will cause connection timeouts (expected behavior)
  - Only GATT-only, non-bonded peripherals are supported
  - Connection attempts to paired devices will timeout after 60 seconds with descriptive error
  - Solution: Use non-bonded peripherals for testing (see Testing Instructions)
- Service discovery can be slow on some devices
- Need to handle case where characteristics list is nil
- Concurrent discovery requests need queueing

## Recommended Agent
macos-bluetooth-expert

## Estimated Time
2-3 hours
