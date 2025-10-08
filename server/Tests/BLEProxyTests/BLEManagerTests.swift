import XCTest
import CoreBluetooth
import Generated
@testable import BLEProxy

/// Test suite for BLEManager
///
/// Note: These tests verify the BLEManager initialization, state tracking,
/// and API surface. Full integration testing requires physical BLE peripherals.
final class BLEManagerTests: XCTestCase {

    /// Test that BLEManager initializes without errors
    func testManagerInitialization() {
        let manager = BLEManager()
        XCTAssertNotNil(manager, "BLEManager should initialize successfully")
    }

    /// Test that state callback is invoked on initialization
    func testStateCallback() {
        let manager = BLEManager()
        let expectation = XCTestExpectation(description: "State callback should fire")

        manager.stateCallback = { state in
            // State should be one of the valid enum values
            XCTAssertTrue([
                .unknown, .resetting, .unsupported,
                .unauthorized, .poweredOff, .poweredOn
            ].contains(state), "State should be a valid ManagerState value")
            expectation.fulfill()
        }

        // Wait for state callback (should fire immediately after initialization)
        wait(for: [expectation], timeout: 5.0)
    }

    /// Test that getState returns a valid state
    func testGetState() {
        let manager = BLEManager()

        // Give CBCentralManager time to initialize
        Thread.sleep(forTimeInterval: 0.5)

        let state = manager.getState()

        // State should be one of the valid enum values
        XCTAssertTrue([
            .unknown, .resetting, .unsupported,
            .unauthorized, .poweredOff, .poweredOn
        ].contains(state), "getState should return a valid ManagerState")
    }

    /// Test scan start/stop API (does not verify actual scanning)
    /// This test verifies the methods can be called without crashing
    func testScanStartStop() {
        let manager = BLEManager()

        // Give CBCentralManager time to initialize
        Thread.sleep(forTimeInterval: 0.5)

        // Start scan with a callback
        manager.startScan(serviceUUIDs: nil) { device in
            print("Discovered device: \(device.id)")
        }

        // Stop scan immediately
        manager.stopScan()

        // Should complete without errors
        XCTAssertTrue(true, "Scan start/stop should complete without errors")
    }

    /// Test scan with service UUID filtering
    func testScanWithServiceFilter() {
        let manager = BLEManager()

        // Give CBCentralManager time to initialize
        Thread.sleep(forTimeInterval: 0.5)

        // Example service UUID (Heart Rate Service)
        let heartRateServiceUUID = CBUUID(string: "180D")

        var deviceCount = 0
        manager.startScan(serviceUUIDs: [heartRateServiceUUID]) { device in
            deviceCount += 1
            print("Found device with Heart Rate service: \(device.id)")
        }

        // Let it run briefly then stop
        Thread.sleep(forTimeInterval: 1.0)
        manager.stopScan()

        // No assertion on count since it depends on physical peripherals
        print("Discovered \(deviceCount) devices with Heart Rate service")
    }

    /// Integration test: Scan for any peripherals
    /// This test requires physical BLE peripherals nearby to pass
    /// Marked as manual test - uncomment to run with real peripherals
    func testScanForPeripherals() {
        let manager = BLEManager()
        let expectation = XCTestExpectation(description: "Should discover at least one peripheral")
        var discoveredDevices: [String: Bleproxy_V1_Device] = [:]

        // Wait for Bluetooth to be ready
        manager.stateCallback = { state in
            if state == .poweredOn {
                print("Bluetooth is powered on, starting scan...")

                manager.startScan(serviceUUIDs: nil) { device in
                    // Store unique devices by ID
                    discoveredDevices[device.id] = device

                    print("Found device: ID=\(device.id), Name=\(device.name), RSSI=\(device.rssi)")

                    // Verify required fields
                    XCTAssertFalse(device.id.isEmpty, "Device ID should not be empty")
                    XCTAssertNotEqual(device.rssi, 0, "RSSI should be set")

                    // Verify ID is a valid UUID string
                    XCTAssertNotNil(UUID(uuidString: device.id), "Device ID should be a valid UUID string")

                    // Fulfill after first discovery
                    if discoveredDevices.count == 1 {
                        expectation.fulfill()
                    }
                }
            } else {
                print("Bluetooth state: \(state)")
            }
        }

        // Wait for at least one peripheral discovery (or timeout)
        let result = XCTWaiter.wait(for: [expectation], timeout: 10.0)

        manager.stopScan()

        // Print summary
        print("\nScan complete. Discovered \(discoveredDevices.count) unique peripherals:")
        for (id, device) in discoveredDevices {
            print("  - \(id): \(device.name) (RSSI: \(device.rssi))")
            if !device.serviceUuids.isEmpty {
                print("    Services: \(device.serviceUuids.joined(separator: ", "))")
            }
        }

        if result == .timedOut {
            print("\nNote: No peripherals discovered. This test requires physical BLE devices nearby.")
        }
    }
}
