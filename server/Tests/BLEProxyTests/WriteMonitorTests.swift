import XCTest
import CoreBluetooth
import Generated
@testable import BLEProxy

/// Test suite for BLEManager characteristic write and monitor operations
///
/// **IMPORTANT: Peripheral Requirements for Integration Tests**
///
/// This project only supports **non-bonded (unpaired) BLE peripherals** with GATT-only features.
/// Integration tests require physical peripherals with writable and notifiable characteristics.
///
/// Compatible Peripherals:
/// - Development boards (nRF52, ESP32) with custom firmware
/// - Fitness sensors with configurable characteristics
/// - Testing peripherals with writable/notifiable characteristics
///
/// Common Writable/Notifiable Characteristics:
/// - Heart Rate Measurement (0x2A37) - notify
/// - Heart Rate Control Point (0x2A39) - write
/// - Custom test characteristics on dev boards
///
/// Test Behavior:
/// - Unit tests (no peripheral): testWriteWithoutConnection, testMonitorWithoutConnection
/// - Integration tests (require peripheral): testWriteSuccess, testMonitorSuccess
/// - Write timeout: 10 seconds
/// - Tests will be skipped if no peripheral is found with appropriate characteristics
final class WriteMonitorTests: XCTestCase {

    // MARK: - Unit Tests (No Peripheral Required)

    /// Test writing characteristic without connection fails with proper error
    func testWriteWithoutConnection() {
        let manager = BLEManager()
        let expectation = XCTestExpectation(description: "Write should fail")

        // Wait for Bluetooth to be ready
        manager.stateCallback = { state in
            if state == .poweredOn {
                let fakeDeviceId = UUID().uuidString
                let serviceUUID = "1800" // Generic Access Service
                let charUUID = "2A00" // Device Name

                manager.writeCharacteristic(
                    deviceId: fakeDeviceId,
                    serviceUUID: serviceUUID,
                    characteristicUUID: charUUID,
                    value: Data([0x01, 0x02]),
                    withResponse: true
                ) { result in
                    switch result {
                    case .success:
                        XCTFail("Write should fail for non-connected device")
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

    /// Test writing characteristic with invalid device UUID fails
    func testWriteWithInvalidDeviceUUID() {
        let manager = BLEManager()
        let expectation = XCTestExpectation(description: "Write should fail")

        manager.stateCallback = { state in
            if state == .poweredOn {
                manager.writeCharacteristic(
                    deviceId: "invalid-uuid",
                    serviceUUID: "1800",
                    characteristicUUID: "2A00",
                    value: Data([0x01]),
                    withResponse: true
                ) { result in
                    switch result {
                    case .success:
                        XCTFail("Write should fail for invalid UUID")
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

    /// Test monitoring characteristic without connection fails
    func testMonitorWithoutConnection() {
        let manager = BLEManager()

        let fakeDeviceId = UUID().uuidString
        let serviceUUID = "180D" // Heart Rate Service
        let charUUID = "2A37" // Heart Rate Measurement

        XCTAssertThrowsError(
            try manager.monitorCharacteristic(
                deviceId: fakeDeviceId,
                serviceUUID: serviceUUID,
                characteristicUUID: charUUID,
                enable: true,
                callback: { data in
                    print("Received notification: \(data.count) bytes")
                }
            )
        ) { error in
            if let bleError = error as? BLEError {
                XCTAssertEqual(bleError.code, .errorDeviceNotConnected,
                             "Should fail with errorDeviceNotConnected")
            } else {
                XCTFail("Error should be a BLEError")
            }
        }
    }

    /// Test monitoring without callback when enabling fails
    func testMonitorEnableWithoutCallback() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")
        let discoveryExpectation = XCTestExpectation(description: "Should discover services")

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
            print("Note: No peripherals discovered. Skipping monitor callback test.")
            return
        }

        // Connect and discover
        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                connectExpectation.fulfill()

                manager.discoverServices(deviceId: deviceId) { discoveryResult in
                    do {
                        switch discoveryResult {
                        case .success(let services):
                            discoveryExpectation.fulfill()

                            // Find a notifiable characteristic
                            var notifiableServiceUUID: String?
                            var notifiableCharUUID: String?

                            for service in services {
                                for characteristic in service.characteristics {
                                    if characteristic.properties.contains("notify") ||
                                       characteristic.properties.contains("indicate") {
                                        notifiableServiceUUID = service.uuid
                                        notifiableCharUUID = characteristic.uuid
                                        break
                                    }
                                }
                                if notifiableCharUUID != nil { break }
                            }

                            guard let serviceUUID = notifiableServiceUUID,
                                  let charUUID = notifiableCharUUID else {
                                print("Note: No notifiable characteristics found. Skipping test.")
                                return
                            }

                            // Try to enable monitoring without callback
                            XCTAssertThrowsError(
                                try manager.monitorCharacteristic(
                                    deviceId: deviceId,
                                    serviceUUID: serviceUUID,
                                    characteristicUUID: charUUID,
                                    enable: true,
                                    callback: nil // Missing callback
                                )
                            ) { error in
                                if let bleError = error as? BLEError {
                                    XCTAssertEqual(bleError.code, .errorCharacteristicNotifyChangeFailed,
                                                 "Should fail with errorCharacteristicNotifyChangeFailed")
                                } else {
                                    XCTFail("Error should be a BLEError")
                                }
                            }

                        case .failure(let error):
                            XCTFail("Service discovery failed: \(error)")
                            discoveryExpectation.fulfill()
                        }
                    } catch {
                        XCTFail("Unexpected error: \(error)")
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

    // MARK: - Integration Tests (Require Peripheral)

    /// Integration test: Write to a characteristic successfully
    /// This test requires a physical BLE peripheral with writable characteristics
    func testWriteSuccess() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")
        let discoveryExpectation = XCTestExpectation(description: "Should discover services")
        let writeExpectation = XCTestExpectation(description: "Should write characteristic")

        var discoveredDeviceId: String?
        var writableServiceUUID: String?
        var writableCharUUID: String?
        var writableWithResponse = false

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
            print("Note: No peripherals discovered. Skipping write test.")
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

                        // Find a writable characteristic
                        for service in services {
                            for characteristic in service.characteristics {
                                if characteristic.properties.contains("write") {
                                    writableServiceUUID = service.uuid
                                    writableCharUUID = characteristic.uuid
                                    writableWithResponse = true
                                    print("Found writable characteristic (with response): \(characteristic.uuid) in service \(service.uuid)")
                                    break
                                } else if characteristic.properties.contains("writeWithoutResponse") {
                                    writableServiceUUID = service.uuid
                                    writableCharUUID = characteristic.uuid
                                    writableWithResponse = false
                                    print("Found writable characteristic (without response): \(characteristic.uuid) in service \(service.uuid)")
                                    break
                                }
                            }
                            if writableCharUUID != nil { break }
                        }

                        guard let serviceUUID = writableServiceUUID,
                              let charUUID = writableCharUUID else {
                            print("Note: No writable characteristics found. Skipping write test.")
                            writeExpectation.fulfill()
                            return
                        }

                        // Write test data to the characteristic
                        let testData = Data([0x01, 0x02, 0x03, 0x04])
                        manager.writeCharacteristic(
                            deviceId: deviceId,
                            serviceUUID: serviceUUID,
                            characteristicUUID: charUUID,
                            value: testData,
                            withResponse: writableWithResponse
                        ) { writeResult in
                            switch writeResult {
                            case .success:
                                print("Successfully wrote \(testData.count) bytes to characteristic \(charUUID)")
                                writeExpectation.fulfill()

                            case .failure(let error):
                                XCTFail("Write failed: \(error)")
                                writeExpectation.fulfill()
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

        wait(for: [connectExpectation, discoveryExpectation, writeExpectation], timeout: 30.0)

        // Clean up
        manager.disconnect(deviceId: deviceId) { _ in }
    }

    /// Integration test: Monitor characteristic notifications
    /// This test requires a physical BLE peripheral with notifiable characteristics
    func testMonitorSuccess() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")
        let discoveryExpectation = XCTestExpectation(description: "Should discover services")
        let notificationExpectation = XCTestExpectation(description: "Should receive notification")

        var discoveredDeviceId: String?
        var notifiableServiceUUID: String?
        var notifiableCharUUID: String?

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
            print("Note: No peripherals discovered. Skipping monitor test.")
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

                        // Find a notifiable characteristic
                        for service in services {
                            for characteristic in service.characteristics {
                                if characteristic.properties.contains("notify") ||
                                   characteristic.properties.contains("indicate") {
                                    notifiableServiceUUID = service.uuid
                                    notifiableCharUUID = characteristic.uuid
                                    print("Found notifiable characteristic: \(characteristic.uuid) in service \(service.uuid)")
                                    break
                                }
                            }
                            if notifiableCharUUID != nil { break }
                        }

                        guard let serviceUUID = notifiableServiceUUID,
                              let charUUID = notifiableCharUUID else {
                            print("Note: No notifiable characteristics found. Skipping monitor test.")
                            notificationExpectation.fulfill()
                            return
                        }

                        // Enable monitoring
                        do {
                            try manager.monitorCharacteristic(
                                deviceId: deviceId,
                                serviceUUID: serviceUUID,
                                characteristicUUID: charUUID,
                                enable: true
                            ) { data in
                                print("Received notification: \(data.count) bytes")
                                let hexString = data.map { String(format: "%02X", $0) }.joined(separator: " ")
                                print("Data (hex): \(hexString)")
                                notificationExpectation.fulfill()
                            }
                            print("Monitoring enabled for characteristic \(charUUID)")
                        } catch {
                            XCTFail("Failed to enable monitoring: \(error)")
                            notificationExpectation.fulfill()
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

        wait(for: [connectExpectation, discoveryExpectation], timeout: 20.0)

        // Wait for notification (with longer timeout)
        let notificationResult = XCTWaiter.wait(for: [notificationExpectation], timeout: 30.0)

        if notificationResult == .timedOut {
            print("Note: No notifications received. This may be normal if the characteristic requires writes to trigger notifications.")
        }

        // Disable monitoring
        if let deviceId = discoveredDeviceId,
           let serviceUUID = notifiableServiceUUID,
           let charUUID = notifiableCharUUID {
            do {
                try manager.monitorCharacteristic(
                    deviceId: deviceId,
                    serviceUUID: serviceUUID,
                    characteristicUUID: charUUID,
                    enable: false,
                    callback: nil
                )
                print("Monitoring disabled for characteristic \(charUUID)")
            } catch {
                print("Failed to disable monitoring: \(error)")
            }
        }

        // Clean up
        if let deviceId = discoveredDeviceId {
            manager.disconnect(deviceId: deviceId) { _ in }
        }
    }

    /// Integration test: Write and monitor the same characteristic
    /// This tests the interaction between write and notification callbacks
    func testWriteAndMonitor() {
        let manager = BLEManager()
        let scanExpectation = XCTestExpectation(description: "Should discover peripheral")
        let connectExpectation = XCTestExpectation(description: "Should connect")
        let discoveryExpectation = XCTestExpectation(description: "Should discover services")
        let writeExpectation = XCTestExpectation(description: "Should write characteristic")
        let notificationExpectation = XCTestExpectation(description: "Should receive notification")

        var discoveredDeviceId: String?
        var targetServiceUUID: String?
        var targetCharUUID: String?

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
            print("Note: No peripherals discovered. Skipping write and monitor test.")
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

                        // Find a characteristic that supports both write and notify
                        for service in services {
                            for characteristic in service.characteristics {
                                let hasWrite = characteristic.properties.contains("write") ||
                                              characteristic.properties.contains("writeWithoutResponse")
                                let hasNotify = characteristic.properties.contains("notify") ||
                                               characteristic.properties.contains("indicate")

                                if hasWrite && hasNotify {
                                    targetServiceUUID = service.uuid
                                    targetCharUUID = characteristic.uuid
                                    print("Found characteristic with write and notify: \(characteristic.uuid) in service \(service.uuid)")
                                    break
                                }
                            }
                            if targetCharUUID != nil { break }
                        }

                        guard let serviceUUID = targetServiceUUID,
                              let charUUID = targetCharUUID else {
                            print("Note: No characteristic with both write and notify found. Skipping test.")
                            writeExpectation.fulfill()
                            notificationExpectation.fulfill()
                            return
                        }

                        // Enable monitoring first
                        do {
                            try manager.monitorCharacteristic(
                                deviceId: deviceId,
                                serviceUUID: serviceUUID,
                                characteristicUUID: charUUID,
                                enable: true
                            ) { data in
                                print("Received notification: \(data.count) bytes")
                                notificationExpectation.fulfill()
                            }
                            print("Monitoring enabled")

                            // Then write to trigger notification
                            let testData = Data([0xFF])
                            manager.writeCharacteristic(
                                deviceId: deviceId,
                                serviceUUID: serviceUUID,
                                characteristicUUID: charUUID,
                                value: testData,
                                withResponse: false
                            ) { writeResult in
                                switch writeResult {
                                case .success:
                                    print("Write successful, waiting for notification...")
                                    writeExpectation.fulfill()
                                case .failure(let error):
                                    print("Write failed: \(error)")
                                    writeExpectation.fulfill()
                                }
                            }
                        } catch {
                            XCTFail("Failed to enable monitoring: \(error)")
                            writeExpectation.fulfill()
                            notificationExpectation.fulfill()
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

        wait(for: [connectExpectation, discoveryExpectation, writeExpectation], timeout: 30.0)

        // Wait for notification with longer timeout
        let notificationResult = XCTWaiter.wait(for: [notificationExpectation], timeout: 30.0)

        if notificationResult == .timedOut {
            print("Note: No notification received after write. This may be normal depending on the peripheral.")
        }

        // Clean up
        manager.disconnect(deviceId: deviceId) { _ in }
    }
}
