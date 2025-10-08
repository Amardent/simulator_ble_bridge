import XCTest
import CoreBluetooth
import Generated
@testable import BLEProxy

/// Test suite for BLEManager RSSI reading operations
///
/// **IMPORTANT: Peripheral Requirements for Integration Tests**
///
/// This project only supports **non-bonded (unpaired) BLE peripherals** with GATT-only features.
/// Integration tests require physical peripherals that are connectable.
///
/// ✅ **Compatible Peripherals:**
/// - Development boards (nRF52, ESP32) with custom firmware
/// - Fitness sensors in pairing mode (not previously paired)
/// - BLE beacons that allow connection
/// - Environmental sensors without security
///
/// ❌ **Incompatible Peripherals (will timeout):**
/// - Apple devices (AirPods, Watch, etc.) - require pairing
/// - Previously paired devices - must be unpaired/reset first
/// - Smart locks, security devices - require authentication
/// - Any device showing pairing dialog on connection
///
/// **RSSI Characteristics:**
/// - RSSI values are negative integers (typically -30 to -100 dBm)
/// - Values closer to 0 indicate stronger signal
/// - RSSI can be read while scanning (in advertisement) or while connected
/// - Connected RSSI may differ from scan RSSI
/// - RSSI read timeout: 10 seconds
///
/// **Test Behavior:**
/// - Unit tests (no peripheral): testRSSINotConnected, testRSSIInvalidDeviceUUID
/// - Integration tests (require peripheral): testRSSIReadSuccess, testRSSIReadMultipleTimes
/// - Tests will be skipped if no peripheral is found
final class RSSITests: XCTestCase {

    // MARK: - Unit Tests (No Peripheral Required)

    /// Test reading RSSI without connection fails with proper error
    func testRSSINotConnected() {
        let manager = BLEManager()
        let expectation = XCTestExpectation(description: "RSSI read should fail")

        // Wait for Bluetooth to be ready
        manager.stateCallback = { state in
            if state == .poweredOn {
                let fakeDeviceId = UUID().uuidString

                manager.readRSSI(deviceId: fakeDeviceId) { result in
                    switch result {
                    case .success:
                        XCTFail("RSSI read should fail for non-connected device")
                    case .failure(let error):
                        if let bleError = error as? BLEError {
                            XCTAssertEqual(bleError.code, .errorDeviceNotConnected,
                                         "Should fail with errorDeviceNotConnected")
                            print("Correctly failed with: \(bleError.message)")
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

    /// Test reading RSSI with invalid device UUID fails
    func testRSSIInvalidDeviceUUID() {
        let manager = BLEManager()
        let expectation = XCTestExpectation(description: "RSSI read should fail")

        manager.stateCallback = { state in
            if state == .poweredOn {
                manager.readRSSI(deviceId: "invalid-uuid") { result in
                    switch result {
                    case .success:
                        XCTFail("RSSI read should fail for invalid UUID")
                    case .failure(let error):
                        if let bleError = error as? BLEError {
                            XCTAssertEqual(bleError.code, .errorInvalidIdentifiers,
                                         "Should fail with errorInvalidIdentifiers")
                            print("Correctly failed with: \(bleError.message)")
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

    // MARK: - Integration Tests (Require Peripheral)

    /// Integration test: Read RSSI successfully from a connected peripheral
    /// This test requires a physical BLE peripheral
    func testRSSIReadSuccess() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")
        let rssiExpectation = XCTestExpectation(description: "Should read RSSI")

        var discoveredDeviceId: String?

        manager.stateCallback = { state in
            if state == .poweredOn {
                manager.startScan(serviceUUIDs: nil) { device in
                    if discoveredDeviceId == nil {
                        discoveredDeviceId = device.id
                        print("Discovered device: \(device.id)")
                        print("Scan RSSI: \(device.rssi) dBm")
                        manager.stopScan()
                        scanExpectation.fulfill()
                    }
                }
            }
        }

        let scanResult = XCTWaiter.wait(for: [scanExpectation], timeout: 10.0)

        guard scanResult == .completed, let deviceId = discoveredDeviceId else {
            print("Note: No peripherals discovered. Skipping RSSI read test.")
            return
        }

        // Connect to the peripheral
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                print("Connected successfully, reading RSSI...")
                connectExpectation.fulfill()

                // Read RSSI from connected peripheral
                manager.readRSSI(deviceId: deviceId) { rssiResult in
                    switch rssiResult {
                    case .success(let rssi):
                        print("Successfully read RSSI: \(rssi) dBm")

                        // Verify RSSI is in reasonable range
                        XCTAssertLessThan(rssi, 0, "RSSI should be negative")
                        XCTAssertGreaterThanOrEqual(rssi, -120, "RSSI should be >= -120 dBm (practical minimum)")
                        XCTAssertLessThanOrEqual(rssi, 0, "RSSI should be <= 0 dBm (theoretical maximum)")

                        // Typical range check (most devices fall in this range)
                        if rssi >= -100 && rssi <= -30 {
                            print("RSSI is in typical range (-100 to -30 dBm)")
                        } else {
                            print("Warning: RSSI \(rssi) dBm is outside typical range (-100 to -30 dBm)")
                        }

                        rssiExpectation.fulfill()

                    case .failure(let error):
                        XCTFail("RSSI read failed: \(error)")
                        rssiExpectation.fulfill()
                    }
                }

            case .failure(let error):
                print("Connection failed (this may indicate a device requiring pairing): \(error)")
                connectExpectation.fulfill()
                rssiExpectation.fulfill()
            }
        }

        wait(for: [connectExpectation, rssiExpectation], timeout: 70.0)  // Allow 60s connection + 10s RSSI read

        // Clean up
        manager.disconnect(deviceId: deviceId) { _ in }
    }

    /// Integration test: Read RSSI multiple times to verify consistency
    func testRSSIReadMultipleTimes() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")

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
            print("Note: No peripherals discovered. Skipping multiple RSSI read test.")
            return
        }

        // Connect
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                connectExpectation.fulfill()

                // Read RSSI 3 times sequentially
                let rssiExpectations = (1...3).map { XCTestExpectation(description: "RSSI read \($0)") }
                var rssiValues: [Int32] = []

                // First read
                manager.readRSSI(deviceId: deviceId) { result1 in
                    switch result1 {
                    case .success(let rssi):
                        print("RSSI read 1: \(rssi) dBm")
                        rssiValues.append(rssi)
                        rssiExpectations[0].fulfill()

                        // Second read
                        manager.readRSSI(deviceId: deviceId) { result2 in
                            switch result2 {
                            case .success(let rssi):
                                print("RSSI read 2: \(rssi) dBm")
                                rssiValues.append(rssi)
                                rssiExpectations[1].fulfill()

                                // Third read
                                manager.readRSSI(deviceId: deviceId) { result3 in
                                    switch result3 {
                                    case .success(let rssi):
                                        print("RSSI read 3: \(rssi) dBm")
                                        rssiValues.append(rssi)
                                        rssiExpectations[2].fulfill()

                                        // Verify all reads succeeded
                                        XCTAssertEqual(rssiValues.count, 3, "Should have 3 RSSI readings")

                                        // All values should be negative
                                        for (index, value) in rssiValues.enumerated() {
                                            XCTAssertLessThan(value, 0, "RSSI read \(index + 1) should be negative")
                                        }

                                        // Print variance
                                        let maxRSSI = rssiValues.max() ?? 0
                                        let minRSSI = rssiValues.min() ?? 0
                                        let variance = maxRSSI - minRSSI
                                        print("RSSI variance: \(variance) dBm (range: \(minRSSI) to \(maxRSSI))")

                                    case .failure(let error):
                                        XCTFail("Third RSSI read failed: \(error)")
                                        rssiExpectations[2].fulfill()
                                    }
                                }

                            case .failure(let error):
                                XCTFail("Second RSSI read failed: \(error)")
                                rssiExpectations[1].fulfill()
                            }
                        }

                    case .failure(let error):
                        XCTFail("First RSSI read failed: \(error)")
                        rssiExpectations[0].fulfill()
                    }
                }

                // Wait for all RSSI reads
                self.wait(for: rssiExpectations, timeout: 35.0)  // 3 reads * 10s timeout + buffer

            case .failure(let error):
                print("Connection failed: \(error)")
                connectExpectation.fulfill()
            }
        }

        wait(for: [connectExpectation], timeout: 70.0)

        // Clean up
        manager.disconnect(deviceId: deviceId) { _ in }
    }

    /// Integration test: RSSI read is cleaned up properly on disconnect
    func testRSSICleanupOnDisconnect() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")
        let rssiExpectation = XCTestExpectation(description: "RSSI read should fail after disconnect")

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
            print("Note: No peripherals discovered. Skipping RSSI cleanup test.")
            return
        }

        // Connect
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                connectExpectation.fulfill()

                // Disconnect immediately before RSSI read (to ensure failure)
                manager.disconnect(deviceId: deviceId) { disconnectResult in
                    print("Disconnect completed: \(disconnectResult)")

                    // Now try to read RSSI from disconnected device
                    manager.readRSSI(deviceId: deviceId) { rssiResult in
                        switch rssiResult {
                        case .success(let rssi):
                            XCTFail("RSSI read should fail after disconnect, got: \(rssi)")
                        case .failure(let error):
                            if let bleError = error as? BLEError {
                                XCTAssertEqual(bleError.code, .errorDeviceNotConnected,
                                             "Should fail with errorDeviceNotConnected")
                                print("Correctly failed with: \(bleError.message)")
                            } else {
                                XCTFail("Error should be a BLEError")
                            }
                        }
                        rssiExpectation.fulfill()
                    }
                }

            case .failure(let error):
                print("Connection failed: \(error)")
                connectExpectation.fulfill()
                rssiExpectation.fulfill()
            }
        }

        wait(for: [connectExpectation, rssiExpectation], timeout: 75.0)
    }

    // MARK: - Error Code Validation Tests

    /// Test that BLEError codes match expected protobuf error codes
    func testErrorCodeValues() {
        // Create errors and verify their codes
        let notConnectedError = BLEError(code: .errorDeviceNotConnected, message: "Test")
        XCTAssertEqual(notConnectedError.code.rawValue, 205, "errorDeviceNotConnected should be 205")

        let rssiFailedError = BLEError(code: .errorDeviceRssiReadFailed, message: "Test")
        XCTAssertEqual(rssiFailedError.code.rawValue, 202, "errorDeviceRssiReadFailed should be 202")

        let invalidIdError = BLEError(code: .errorInvalidIdentifiers, message: "Test")
        XCTAssertEqual(invalidIdError.code.rawValue, 5, "errorInvalidIdentifiers should be 5")

        let disconnectedError = BLEError(code: .errorDeviceDisconnected, message: "Test")
        XCTAssertEqual(disconnectedError.code.rawValue, 201, "errorDeviceDisconnected should be 201")

        print("All error codes verified")
    }

    /// Test BLEError to protobuf conversion
    func testErrorProtoConversion() {
        let bleError = BLEError(code: .errorDeviceRssiReadFailed, message: "RSSI read failed test")
        let protoError = bleError.toProto()

        XCTAssertEqual(protoError.code, 202, "Proto error code should match")
        XCTAssertEqual(protoError.message, "RSSI read failed test", "Proto error message should match")
        XCTAssertFalse(protoError.message.isEmpty, "Proto error message should not be empty")

        print("Proto conversion verified: code=\(protoError.code), message='\(protoError.message)'")
    }

    /// Test that all RSSI-related error codes are properly defined
    func testRSSIErrorCodesExist() {
        // Verify all error codes used in RSSI operations exist
        let _ = Bleproxy_V1_BleErrorCode.errorDeviceNotConnected
        let _ = Bleproxy_V1_BleErrorCode.errorDeviceRssiReadFailed
        let _ = Bleproxy_V1_BleErrorCode.errorDeviceDisconnected
        let _ = Bleproxy_V1_BleErrorCode.errorInvalidIdentifiers
        let _ = Bleproxy_V1_BleErrorCode.errorBluetoothManagerDestroyed

        // If we got here, all codes exist
        XCTAssert(true, "All RSSI error codes are defined")
        print("All RSSI-related error codes verified")
    }
}
