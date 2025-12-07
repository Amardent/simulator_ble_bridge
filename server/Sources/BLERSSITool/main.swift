import Foundation
import CoreBluetooth
import BLEProxy
import Generated

/// CLI tool for testing BLE RSSI reading functionality
///
/// This tool demonstrates RSSI reading from connected BLE peripherals.
/// It scans for peripherals, connects to the first one found, and reads RSSI
/// multiple times to show signal strength variation.
///
/// Usage:
///   swift run ble-rssi-test
///
/// Expected Output:
/// - Discovers nearby BLE peripherals
/// - Connects to first discovered peripheral
/// - Reads RSSI 5 times with 2-second intervals
/// - Displays RSSI values in dBm
/// - Shows RSSI variance and average
///
/// Requirements:
/// - macOS with Bluetooth LE support
/// - Bluetooth enabled
/// - Non-bonded BLE peripheral within range
///
/// Exit: Ctrl+C to stop

let manager = BLEManager()
var discoveredDeviceId: String?
var isScanning = false
var isConnected = false

// Track RSSI readings
var rssiReadings: [Int32] = []
let targetReadings = 5
let readInterval: TimeInterval = 2.0

print("BLE RSSI Test Tool")
print("==================")
print("Waiting for Bluetooth to power on...")

// Scan callback
manager.addScanCallback(id: "cli-tool") { device in
    guard discoveredDeviceId == nil else { return }

    discoveredDeviceId = device.id
    manager.stopScan()

    print("\n--- Device Discovered ---")
    print("ID: \(device.id)")
    if !device.name.isEmpty {
        print("Name: \(device.name)")
    }
    print("Scan RSSI: \(device.rssi) dBm")

    // Connect to the device
    print("\nConnecting...")
    manager.connect(deviceId: device.id) { result in
        switch result {
        case .success:
            isConnected = true
            print("Connected successfully!")
            print("\nReading RSSI \(targetReadings) times (interval: \(Int(readInterval))s)...")

            // Start reading RSSI
            readRSSISequentially(deviceId: device.id, count: targetReadings)

        case .failure(let error):
            print("Connection failed: \(error)")
            print("\nNote: If timeout, device may require pairing (not supported)")
            exit(1)
        }
    }
}

manager.stateCallback = { state in
    print("Bluetooth state: \(state)")

    if state == .poweredOn && !isScanning {
        isScanning = true
        print("\nScanning for BLE peripherals...")
        print("(Will connect to first device discovered)")

        manager.startScan(serviceUUIDs: nil)
    }
}

/// Reads RSSI sequentially with delays between reads
func readRSSISequentially(deviceId: String, count: Int) {
    guard count > 0 else {
        // All reads complete, show summary
        showRSSISummary()
        cleanup(deviceId: deviceId)
        return
    }

    let readNumber = targetReadings - count + 1

    manager.readRSSI(deviceId: deviceId) { result in
        switch result {
        case .success(let rssi):
            rssiReadings.append(rssi)
            print("[\(readNumber)/\(targetReadings)] RSSI: \(rssi) dBm")

            // Schedule next read
            if count > 1 {
                DispatchQueue.main.asyncAfter(deadline: .now() + readInterval) {
                    readRSSISequentially(deviceId: deviceId, count: count - 1)
                }
            } else {
                // All reads complete
                showRSSISummary()
                cleanup(deviceId: deviceId)
            }

        case .failure(let error):
            print("[\(readNumber)/\(targetReadings)] RSSI read failed: \(error)")

            // Continue with remaining reads
            if count > 1 {
                DispatchQueue.main.asyncAfter(deadline: .now() + readInterval) {
                    readRSSISequentially(deviceId: deviceId, count: count - 1)
                }
            } else {
                showRSSISummary()
                cleanup(deviceId: deviceId)
            }
        }
    }
}

/// Displays RSSI statistics
func showRSSISummary() {
    print("\n--- RSSI Summary ---")

    guard !rssiReadings.isEmpty else {
        print("No RSSI readings collected")
        return
    }

    let minRSSI = rssiReadings.min() ?? 0
    let maxRSSI = rssiReadings.max() ?? 0
    let avgRSSI = rssiReadings.reduce(0, +) / Int32(rssiReadings.count)
    let variance = maxRSSI - minRSSI

    print("Readings: \(rssiReadings.count)/\(targetReadings)")
    print("Range: \(minRSSI) to \(maxRSSI) dBm")
    print("Average: \(avgRSSI) dBm")
    print("Variance: \(variance) dB")

    // Interpret signal strength
    print("\nSignal Quality:")
    if avgRSSI >= -50 {
        print("  Excellent (very close)")
    } else if avgRSSI >= -70 {
        print("  Good (typical indoor range)")
    } else if avgRSSI >= -85 {
        print("  Fair (usable)")
    } else {
        print("  Poor (far away or obstructed)")
    }
}

/// Cleanup and exit
func cleanup(deviceId: String) {
    print("\nDisconnecting...")

    manager.disconnect(deviceId: deviceId) { result in
        switch result {
        case .success:
            print("Disconnected")
        case .failure(let error):
            print("Disconnect error: \(error)")
        }

        print("\nTest complete. Exiting.")
        exit(0)
    }
}

// Handle Ctrl+C gracefully
signal(SIGINT) { _ in
    print("\n\nInterrupted. Cleaning up...")

    if let deviceId = discoveredDeviceId, isConnected {
        manager.disconnect(deviceId: deviceId) { _ in
            exit(0)
        }
        // Give disconnect a moment
        sleep(1)
    }

    exit(0)
}

// Keep the process running
RunLoop.main.run()
