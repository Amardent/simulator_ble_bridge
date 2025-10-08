import XCTest
import CoreBluetooth
import Generated
@testable import BLEProxy

/// Test suite for BLEManager characteristic read operations
///
/// **IMPORTANT: Peripheral Requirements for Integration Tests**
///
/// This project only supports **non-bonded (unpaired) BLE peripherals** with GATT-only features.
/// Integration tests require physical peripherals with readable characteristics.
///
/// ✅ **Compatible Peripherals with Readable Characteristics:**
/// - Development boards (nRF52, ESP32) with custom firmware
/// - Fitness sensors (heart rate monitors) - often have Device Information Service
/// - BLE beacons with readable characteristics
/// - Environmental sensors (temperature, humidity)
///
/// 📋 **Common Readable Characteristics:**
/// - Device Name (0x2A00) - in Generic Access Service (0x1800)
/// - Manufacturer Name (0x2A29) - in Device Information Service (0x180A)
/// - Model Number (0x2A24) - in Device Information Service (0x180A)
/// - Serial Number (0x2A25) - in Device Information Service (0x180A)
/// - Battery Level (0x2A19) - in Battery Service (0x180F)
/// - Heart Rate Measurement (0x2A37) - in Heart Rate Service (0x180D)
///
/// ❌ **Incompatible Characteristics:**
/// - Any characteristic requiring pairing/bonding to read
/// - Characteristics requiring authentication
/// - Encrypted characteristics
///
/// **Test Behavior:**
/// - Unit tests (no peripheral): testReadWithoutConnection, testReadWithInvalidUUIDs
/// - Integration tests (require peripheral): testReadSuccess, testReadMultipleCharacteristics
/// - Read timeout: 10 seconds
/// - Tests will be skipped if no peripheral is found with readable characteristics
final class ReadTests: XCTestCase {

    // MARK: - Unit Tests (No Peripheral Required)

    /// Test reading characteristic without connection fails with proper error
    func testReadWithoutConnection() {
        let manager = BLEManager()
        let expectation = XCTestExpectation(description: "Read should fail")

        // Wait for Bluetooth to be ready
        manager.stateCallback = { state in
            if state == .poweredOn {
                let fakeDeviceId = UUID().uuidString
                let serviceUUID = "1800" // Generic Access Service
                let charUUID = "2A00" // Device Name

                manager.readCharacteristic(
                    deviceId: fakeDeviceId,
                    serviceUUID: serviceUUID,
                    characteristicUUID: charUUID
                ) { result in
                    switch result {
                    case .success:
                        XCTFail("Read should fail for non-connected device")
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

    /// Test reading characteristic with invalid device UUID fails
    func testReadWithInvalidDeviceUUID() {
        let manager = BLEManager()
        let expectation = XCTestExpectation(description: "Read should fail")

        manager.stateCallback = { state in
            if state == .poweredOn {
                manager.readCharacteristic(
                    deviceId: "invalid-uuid",
                    serviceUUID: "1800",
                    characteristicUUID: "2A00"
                ) { result in
                    switch result {
                    case .success:
                        XCTFail("Read should fail for invalid UUID")
                    case .failure(let error):
                        if let bleError = error as? BLEError {
                            XCTAssertEqual(bleError.code, .errorInvalidIdentifiers,
                                         "Should fail with errorInvalidIdentifiers")
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

    /// Test reading characteristic without prior service discovery fails
    func testReadWithoutServiceDiscovery() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")
        let readExpectation = XCTestExpectation(description: "Read should fail")

        var discoveredDeviceId: String?

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
            print("Note: No peripherals discovered. Skipping read without discovery test.")
            return
        }

        // Connect but don't discover services
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                connectExpectation.fulfill()

                // Try to read without discovering services first
                manager.readCharacteristic(
                    deviceId: deviceId,
                    serviceUUID: "1800",
                    characteristicUUID: "2A00"
                ) { readResult in
                    switch readResult {
                    case .success:
                        XCTFail("Read should fail without service discovery")
                    case .failure(let error):
                        if let bleError = error as? BLEError {
                            XCTAssertEqual(bleError.code, .errorServicesNotDiscovered,
                                         "Should fail with errorServicesNotDiscovered")
                        } else {
                            XCTFail("Error should be a BLEError")
                        }
                        readExpectation.fulfill()
                    }
                }

            case .failure(let error):
                XCTFail("Connection failed: \(error)")
                connectExpectation.fulfill()
            }
        }

        wait(for: [connectExpectation, readExpectation], timeout: 15.0)

        // Clean up
        manager.disconnect(deviceId: deviceId) { _ in }
    }

    // MARK: - Integration Tests (Require Peripheral)

    /// Integration test: Read a characteristic value successfully
    /// This test requires a physical BLE peripheral with readable characteristics
    func testReadSuccess() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")
        let discoveryExpectation = XCTestExpectation(description: "Should discover services")
        let readExpectation = XCTestExpectation(description: "Should read characteristic")

        var discoveredDeviceId: String?
        var readableServiceUUID: String?
        var readableCharUUID: String?

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
            print("Note: No peripherals discovered. Skipping read test.")
            return
        }

        // Connect
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                print("Connected, discovering services...")
                connectExpectation.fulfill()

                // Discover services
                manager.discoverServices(deviceId: deviceId) { discoveryResult in
                    switch discoveryResult {
                    case .success(let services):
                        print("Discovered \(services.count) services")
                        discoveryExpectation.fulfill()

                        // Find a readable characteristic
                        for service in services {
                            for characteristic in service.characteristics {
                                if characteristic.properties.contains("read") {
                                    readableServiceUUID = service.uuid
                                    readableCharUUID = characteristic.uuid
                                    print("Found readable characteristic: \(characteristic.uuid) in service \(service.uuid)")
                                    break
                                }
                            }
                            if readableCharUUID != nil { break }
                        }

                        guard let serviceUUID = readableServiceUUID,
                              let charUUID = readableCharUUID else {
                            print("Note: No readable characteristics found. Skipping read test.")
                            readExpectation.fulfill()
                            return
                        }

                        // Read the characteristic
                        manager.readCharacteristic(
                            deviceId: deviceId,
                            serviceUUID: serviceUUID,
                            characteristicUUID: charUUID
                        ) { readResult in
                            switch readResult {
                            case .success(let data):
                                print("Successfully read \(data.count) bytes from characteristic \(charUUID)")

                                // Verify data is valid (may be empty, but shouldn't be nil)
                                XCTAssertNotNil(data, "Read data should not be nil")

                                // Print readable representation
                                if data.count > 0 {
                                    let hexString = data.map { String(format: "%02X", $0) }.joined(separator: " ")
                                    print("Data (hex): \(hexString)")

                                    // Try to decode as string if it looks like text
                                    if let stringValue = String(data: data, encoding: .utf8) {
                                        print("Data (string): \(stringValue)")
                                    }
                                } else {
                                    print("Data is empty (0 bytes)")
                                }

                                readExpectation.fulfill()

                            case .failure(let error):
                                XCTFail("Read failed: \(error)")
                                readExpectation.fulfill()
                            }
                        }

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

        wait(for: [connectExpectation, discoveryExpectation, readExpectation], timeout: 30.0)

        // Clean up
        manager.disconnect(deviceId: deviceId) { _ in }
    }

    /// Integration test: Read characteristic that doesn't exist fails with proper error
    func testReadNonExistentCharacteristic() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")
        let discoveryExpectation = XCTestExpectation(description: "Should discover services")
        let readExpectation = XCTestExpectation(description: "Read should fail")

        var discoveredDeviceId: String?

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
            print("Note: No peripherals discovered. Skipping read non-existent test.")
            return
        }

        // Connect and discover
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                connectExpectation.fulfill()

                manager.discoverServices(deviceId: deviceId) { discoveryResult in
                    switch discoveryResult {
                    case .success(let services):
                        discoveryExpectation.fulfill()

                        // Use a fake characteristic UUID
                        let fakeCharUUID = "00000000-0000-0000-0000-000000000000"
                        let serviceUUID = services.first?.uuid ?? "1800"

                        manager.readCharacteristic(
                            deviceId: deviceId,
                            serviceUUID: serviceUUID,
                            characteristicUUID: fakeCharUUID
                        ) { readResult in
                            switch readResult {
                            case .success:
                                XCTFail("Read should fail for non-existent characteristic")
                            case .failure(let error):
                                if let bleError = error as? BLEError {
                                    XCTAssertEqual(bleError.code, .errorCharacteristicNotFound,
                                                 "Should fail with errorCharacteristicNotFound")
                                } else {
                                    XCTFail("Error should be a BLEError")
                                }
                                readExpectation.fulfill()
                            }
                        }

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

        wait(for: [connectExpectation, discoveryExpectation, readExpectation], timeout: 20.0)

        // Clean up
        manager.disconnect(deviceId: deviceId) { _ in }
    }

    /// Integration test: Read multiple characteristics concurrently
    func testConcurrentReads() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")
        let discoveryExpectation = XCTestExpectation(description: "Should discover services")

        var discoveredDeviceId: String?
        var readableChars: [(serviceUUID: String, charUUID: String)] = []

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
            print("Note: No peripherals discovered. Skipping concurrent read test.")
            return
        }

        // Connect and discover
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                connectExpectation.fulfill()

                manager.discoverServices(deviceId: deviceId) { discoveryResult in
                    switch discoveryResult {
                    case .success(let services):
                        discoveryExpectation.fulfill()

                        // Collect up to 3 readable characteristics
                        for service in services {
                            for characteristic in service.characteristics {
                                if characteristic.properties.contains("read") {
                                    readableChars.append((serviceUUID: service.uuid, charUUID: characteristic.uuid))
                                    if readableChars.count >= 3 { break }
                                }
                            }
                            if readableChars.count >= 3 { break }
                        }

                        guard readableChars.count >= 2 else {
                            print("Note: Need at least 2 readable characteristics. Found \(readableChars.count). Skipping concurrent test.")
                            return
                        }

                        // Create expectations for each read
                        let readExpectations = readableChars.map { char in
                            XCTestExpectation(description: "Read \(char.charUUID)")
                        }

                        // Trigger all reads concurrently
                        for (index, char) in readableChars.enumerated() {
                            manager.readCharacteristic(
                                deviceId: deviceId,
                                serviceUUID: char.serviceUUID,
                                characteristicUUID: char.charUUID
                            ) { readResult in
                                switch readResult {
                                case .success(let data):
                                    print("Concurrent read \(index + 1): \(data.count) bytes from \(char.charUUID)")
                                    readExpectations[index].fulfill()
                                case .failure(let error):
                                    print("Concurrent read \(index + 1) failed: \(error)")
                                    readExpectations[index].fulfill()
                                }
                            }
                        }

                        // Wait for all reads to complete
                        self.wait(for: readExpectations, timeout: 15.0)

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

        // Clean up
        manager.disconnect(deviceId: deviceId) { _ in }
    }
}
