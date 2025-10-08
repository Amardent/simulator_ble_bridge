import XCTest
import CoreBluetooth
import Generated
@testable import BLEProxy

/// Test suite for BLEManager connection and service discovery
///
/// **IMPORTANT: Peripheral Requirements for Integration Tests**
///
/// This project only supports **non-bonded (unpaired) BLE peripherals** with GATT-only features.
/// Integration tests require physical peripherals that meet these criteria:
///
/// ✅ **Compatible Peripherals:**
/// - Development boards (nRF52, ESP32) running custom firmware
/// - Fitness sensors in pairing mode (heart rate monitors, cycling sensors)
/// - BLE beacons with readable characteristics
/// - Environmental sensors (temperature, humidity, air quality)
/// - Simple IoT devices without security requirements
///
/// ❌ **Incompatible Peripherals (will cause connection timeouts):**
/// - Apple devices (AirPods, Apple Watch, iPhone, iPad, Mac) - require pairing
/// - Previously paired fitness devices - must be unpaired/reset first
/// - Smart locks, security devices - require authentication
/// - Payment devices (contactless cards) - require secure pairing
/// - Any device showing a pairing dialog on connection
///
/// **Test Behavior:**
/// - Unit tests (no peripheral required): testConnectToInvalidDeviceId, testIsConnected*, testDisconnectFromNonConnectedDevice
/// - Integration tests (require peripheral): testConnectToRealPeripheral, testConnectAndDisconnect, testConnectAndDiscoverServices
/// - Connection timeout: 60 seconds (liberal to accommodate slow peripherals)
/// - If tests timeout, ensure peripheral is non-bonded and connectable
///
/// **Troubleshooting Connection Timeouts:**
/// 1. Verify peripheral doesn't require pairing (check device documentation)
/// 2. Reset/unpair device if previously paired with macOS
/// 3. Ensure peripheral is advertising and connectable (not just scannable)
/// 4. Check peripheral isn't in deep sleep or low-power mode
/// 5. Try a different known-good non-bonded peripheral
final class ConnectionTests: XCTestCase {

    // MARK: - Phase 1 Tests: Connection Management

    /// Test connecting to a non-existent device ID fails with proper error
    func testConnectToInvalidDeviceId() {
        let manager = BLEManager()
        let expectation = XCTestExpectation(description: "Connection should fail")

        // Wait for Bluetooth to be ready
        manager.stateCallback = { state in
            if state == .poweredOn {
                // Try to connect to non-existent device
                let fakeDeviceId = UUID().uuidString

                manager.connect(deviceId: fakeDeviceId) { result in
                    switch result {
                    case .success:
                        XCTFail("Connection should fail for non-existent device")
                    case .failure(let error):
                        // Should fail with device not found error
                        if let bleError = error as? BLEError {
                            XCTAssertEqual(bleError.code, .errorDeviceNotFound,
                                         "Should fail with errorDeviceNotFound")
                        } else {
                            XCTFail("Error should be a BLEError")
                        }
                        expectation.fulfill()
                    }
                }
            }
        }

        wait(for: [expectation], timeout: 5.0)
    }

    /// Test isConnected returns false for non-existent device
    func testIsConnectedReturnsFalseForNonExistentDevice() {
        let manager = BLEManager()
        let fakeDeviceId = UUID().uuidString

        // Give CBCentralManager time to initialize
        Thread.sleep(forTimeInterval: 0.5)

        XCTAssertFalse(manager.isConnected(deviceId: fakeDeviceId),
                      "isConnected should return false for non-existent device")
    }

    /// Test isConnected handles invalid UUID gracefully
    func testIsConnectedHandlesInvalidUUID() {
        let manager = BLEManager()

        // Give CBCentralManager time to initialize
        Thread.sleep(forTimeInterval: 0.5)

        XCTAssertFalse(manager.isConnected(deviceId: "invalid-uuid"),
                      "isConnected should return false for invalid UUID")
    }

    /// Integration test: Connect to a real peripheral
    /// This test requires a physical BLE peripheral nearby
    func testConnectToRealPeripheral() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover at least one peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect to peripheral")

        var discoveredDeviceId: String?

        // Wait for Bluetooth to be ready
        manager.stateCallback = { state in
            if state == .poweredOn {
                print("Bluetooth is powered on, starting scan...")

                manager.startScan(serviceUUIDs: nil) { device in
                    // Only try to connect to the first discovered peripheral
                    if discoveredDeviceId == nil {
                        discoveredDeviceId = device.id
                        print("Found device: \(device.id), attempting connection...")

                        manager.stopScan()
                        scanExpectation.fulfill()
                    }
                }
            } else {
                print("Bluetooth state: \(state)")
            }
        }

        // Wait for scan to complete
        let scanResult = XCTWaiter.wait(for: [scanExpectation], timeout: 10.0)

        guard scanResult == .completed, let deviceId = discoveredDeviceId else {
            print("Note: No peripherals discovered. Skipping connection test.")
            return
        }

        // Attempt connection
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                print("Successfully connected to \(deviceId)")

                // Verify isConnected returns true
                XCTAssertTrue(manager.isConnected(deviceId: deviceId),
                            "isConnected should return true after successful connection")

                connectExpectation.fulfill()

            case .failure(let error):
                XCTFail("Connection failed: \(error)")
                connectExpectation.fulfill()
            }
        }

        // Wait for connection
        wait(for: [connectExpectation], timeout: 10.0)
    }

    /// Integration test: Connect and disconnect
    /// This test requires a physical BLE peripheral nearby
    func testConnectAndDisconnect() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")
        let disconnectExpectation = XCTestExpectation(description: "Should disconnect")

        var discoveredDeviceId: String?

        // Wait for Bluetooth and scan
        manager.stateCallback = { state in
            if state == .poweredOn {
                manager.startScan(serviceUUIDs: nil) { device in
                    if discoveredDeviceId == nil {
                        discoveredDeviceId = device.id
                        manager.stopScan()
                        scanExpectation.fulfill()
                    }
                }
            }
        }

        let scanResult = XCTWaiter.wait(for: [scanExpectation], timeout: 10.0)

        guard scanResult == .completed, let deviceId = discoveredDeviceId else {
            print("Note: No peripherals discovered. Skipping connect/disconnect test.")
            return
        }

        // Connect
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                print("Connected to \(deviceId)")
                XCTAssertTrue(manager.isConnected(deviceId: deviceId))
                connectExpectation.fulfill()

                // Disconnect after successful connection
                manager.disconnect(deviceId: deviceId) { disconnectResult in
                    switch disconnectResult {
                    case .success:
                        print("Disconnected from \(deviceId)")

                        // Give time for disconnect to complete
                        Thread.sleep(forTimeInterval: 0.5)

                        // Verify isConnected returns false after disconnect
                        XCTAssertFalse(manager.isConnected(deviceId: deviceId),
                                     "isConnected should return false after disconnect")

                        disconnectExpectation.fulfill()

                    case .failure(let error):
                        XCTFail("Disconnect failed: \(error)")
                        disconnectExpectation.fulfill()
                    }
                }

            case .failure(let error):
                XCTFail("Connection failed: \(error)")
                connectExpectation.fulfill()
            }
        }

        wait(for: [connectExpectation, disconnectExpectation], timeout: 15.0)
    }

    /// Test disconnecting from non-connected device fails with proper error
    func testDisconnectFromNonConnectedDevice() {
        let manager = BLEManager()
        let expectation = XCTestExpectation(description: "Disconnect should fail")

        // Wait for Bluetooth to be ready
        manager.stateCallback = { state in
            if state == .poweredOn {
                let fakeDeviceId = UUID().uuidString

                manager.disconnect(deviceId: fakeDeviceId) { result in
                    switch result {
                    case .success:
                        XCTFail("Disconnect should fail for non-connected device")
                    case .failure(let error):
                        if let bleError = error as? BLEError {
                            XCTAssertEqual(bleError.code, .errorDeviceNotConnected,
                                         "Should fail with errorDeviceNotConnected")
                        } else {
                            XCTFail("Error should be a BLEError")
                        }
                        expectation.fulfill()
                    }
                }
            }
        }

        wait(for: [expectation], timeout: 5.0)
    }

    /// Test connecting to already connected device fails
    func testConnectToAlreadyConnectedDevice() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let firstConnectExpectation = XCTestExpectation(description: "First connection should succeed")
        let secondConnectExpectation = XCTestExpectation(description: "Second connection should fail")

        var discoveredDeviceId: String?

        // Wait for Bluetooth and scan
        manager.stateCallback = { state in
            if state == .poweredOn {
                manager.startScan(serviceUUIDs: nil) { device in
                    if discoveredDeviceId == nil {
                        discoveredDeviceId = device.id
                        manager.stopScan()
                        scanExpectation.fulfill()
                    }
                }
            }
        }

        let scanResult = XCTWaiter.wait(for: [scanExpectation], timeout: 10.0)

        guard scanResult == .completed, let deviceId = discoveredDeviceId else {
            print("Note: No peripherals discovered. Skipping double-connect test.")
            return
        }

        // First connection
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                print("First connection successful")
                firstConnectExpectation.fulfill()

                // Try to connect again
                manager.connect(deviceId: deviceId) { secondResult in
                    switch secondResult {
                    case .success:
                        XCTFail("Second connection should fail")
                    case .failure(let error):
                        if let bleError = error as? BLEError {
                            XCTAssertEqual(bleError.code, .errorDeviceAlreadyConnected,
                                         "Should fail with errorDeviceAlreadyConnected")
                        } else {
                            XCTFail("Error should be a BLEError")
                        }
                        secondConnectExpectation.fulfill()
                    }
                }

            case .failure(let error):
                XCTFail("First connection failed: \(error)")
                firstConnectExpectation.fulfill()
            }
        }

        wait(for: [firstConnectExpectation, secondConnectExpectation], timeout: 15.0)

        // Clean up - disconnect
        manager.disconnect(deviceId: deviceId) { _ in }
    }

    // MARK: - Phase 2 Tests: Service Discovery

    /// Test service discovery on non-connected device fails
    func testDiscoverServicesOnNonConnectedDevice() {
        let manager = BLEManager()
        let expectation = XCTestExpectation(description: "Discovery should fail")

        // Wait for Bluetooth to be ready
        manager.stateCallback = { state in
            if state == .poweredOn {
                let fakeDeviceId = UUID().uuidString

                manager.discoverServices(deviceId: fakeDeviceId) { result in
                    switch result {
                    case .success:
                        XCTFail("Discovery should fail for non-connected device")
                    case .failure(let error):
                        if let bleError = error as? BLEError {
                            XCTAssertEqual(bleError.code, .errorDeviceNotConnected,
                                         "Should fail with errorDeviceNotConnected")
                        } else {
                            XCTFail("Error should be a BLEError")
                        }
                        expectation.fulfill()
                    }
                }
            }
        }

        wait(for: [expectation], timeout: 5.0)
    }

    /// Integration test: Connect and discover services
    /// This test requires a physical BLE peripheral nearby
    func testConnectAndDiscoverServices() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")
        let discoveryExpectation = XCTestExpectation(description: "Should discover services")

        var discoveredDeviceId: String?

        // Wait for Bluetooth and scan
        manager.stateCallback = { state in
            if state == .poweredOn {
                manager.startScan(serviceUUIDs: nil) { device in
                    if discoveredDeviceId == nil {
                        discoveredDeviceId = device.id
                        manager.stopScan()
                        scanExpectation.fulfill()
                    }
                }
            }
        }

        let scanResult = XCTWaiter.wait(for: [scanExpectation], timeout: 10.0)

        guard scanResult == .completed, let deviceId = discoveredDeviceId else {
            print("Note: No peripherals discovered. Skipping service discovery test.")
            return
        }

        // Connect
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                print("Connected, starting service discovery...")
                connectExpectation.fulfill()

                // Discover services
                manager.discoverServices(deviceId: deviceId) { discoveryResult in
                    switch discoveryResult {
                    case .success(let services):
                        print("Discovered \(services.count) services")

                        // Verify services structure
                        for service in services {
                            XCTAssertFalse(service.uuid.isEmpty, "Service UUID should not be empty")

                            // Verify it's a valid UUID
                            XCTAssertNotNil(UUID(uuidString: service.uuid),
                                          "Service UUID should be valid: \(service.uuid)")

                            print("  Service: \(service.uuid), isPrimary: \(service.isPrimary), characteristics: \(service.characteristics.count)")

                            // Verify characteristics
                            for characteristic in service.characteristics {
                                XCTAssertFalse(characteristic.uuid.isEmpty,
                                             "Characteristic UUID should not be empty")

                                // Verify it's a valid UUID
                                XCTAssertNotNil(UUID(uuidString: characteristic.uuid),
                                              "Characteristic UUID should be valid: \(characteristic.uuid)")

                                XCTAssertFalse(characteristic.properties.isEmpty,
                                             "Characteristic should have at least one property")

                                print("    Characteristic: \(characteristic.uuid), properties: \(characteristic.properties)")

                                // Verify properties are valid strings
                                let validProperties = ["broadcast", "read", "writeWithoutResponse",
                                                     "write", "notify", "indicate",
                                                     "authenticatedSignedWrites", "extendedProperties"]
                                for property in characteristic.properties {
                                    XCTAssertTrue(validProperties.contains(property),
                                                "Property '\(property)' should be a valid characteristic property")
                                }
                            }
                        }

                        discoveryExpectation.fulfill()

                    case .failure(let error):
                        XCTFail("Service discovery failed: \(error)")
                        discoveryExpectation.fulfill()
                    }
                }

            case .failure(let error):
                XCTFail("Connection failed: \(error)")
                connectExpectation.fulfill()
            }
        }

        wait(for: [connectExpectation, discoveryExpectation], timeout: 20.0)

        // Clean up - disconnect
        manager.disconnect(deviceId: deviceId) { _ in }
    }

    /// Test that services can be discovered multiple times on same connection
    func testMultipleServiceDiscoveries() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")
        let firstDiscoveryExpectation = XCTestExpectation(description: "First discovery should succeed")
        let secondDiscoveryExpectation = XCTestExpectation(description: "Second discovery should succeed")

        var discoveredDeviceId: String?

        // Wait for Bluetooth and scan
        manager.stateCallback = { state in
            if state == .poweredOn {
                manager.startScan(serviceUUIDs: nil) { device in
                    if discoveredDeviceId == nil {
                        discoveredDeviceId = device.id
                        manager.stopScan()
                        scanExpectation.fulfill()
                    }
                }
            }
        }

        let scanResult = XCTWaiter.wait(for: [scanExpectation], timeout: 10.0)

        guard scanResult == .completed, let deviceId = discoveredDeviceId else {
            print("Note: No peripherals discovered. Skipping multiple discovery test.")
            return
        }

        // Connect
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                connectExpectation.fulfill()

                // First discovery
                manager.discoverServices(deviceId: deviceId) { firstResult in
                    switch firstResult {
                    case .success(let services):
                        print("First discovery: \(services.count) services")
                        firstDiscoveryExpectation.fulfill()

                        // Second discovery
                        manager.discoverServices(deviceId: deviceId) { secondResult in
                            switch secondResult {
                            case .success(let services):
                                print("Second discovery: \(services.count) services")
                                secondDiscoveryExpectation.fulfill()
                            case .failure(let error):
                                XCTFail("Second discovery failed: \(error)")
                                secondDiscoveryExpectation.fulfill()
                            }
                        }

                    case .failure(let error):
                        XCTFail("First discovery failed: \(error)")
                        firstDiscoveryExpectation.fulfill()
                    }
                }

            case .failure(let error):
                XCTFail("Connection failed: \(error)")
                connectExpectation.fulfill()
            }
        }

        wait(for: [connectExpectation, firstDiscoveryExpectation, secondDiscoveryExpectation], timeout: 30.0)

        // Clean up
        manager.disconnect(deviceId: deviceId) { _ in }
    }
}
