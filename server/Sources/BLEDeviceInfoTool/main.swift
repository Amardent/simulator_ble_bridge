import Foundation
import BLEProxy
import Generated

// MARK: - BLE Device Info Test Tool

/// CLI tool to test device field population during scan and after connection
/// Tests: name, isConnectable, rssi (scan) and MTU (after connection)
/// Usage: Run the tool, it will scan and attempt to connect to the first connectable device

print("🔵 BLE Device Info Test Tool")
print("This tool tests device field population:\n")
print("   During Scan: name, isConnectable, rssi")
print("   After Connection: MTU\n")

let manager = BLEManager()
var testDeviceId: String?
var scanStarted = false

// Scan callback
manager.addScanCallback(id: "cli-tool") { device in
    // Only process if we haven't selected a device yet
    guard testDeviceId == nil else { return }

    // Only consider devices that advertise as connectable
    guard device.hasIsConnectable && device.isConnectable else { return }

    testDeviceId = device.id
    manager.stopScan()

    let name = device.name.isEmpty ? "<No Name>" : device.name
    print("✅ SCAN RESULTS - Device Found:")
    print("   Name: \(name)")
    print("   ID: \(device.id)")
    print("   RSSI: \(device.rssi) dBm")
    print("   Connectable: \(device.isConnectable ? "Yes" : "No")")

    if device.hasMtu {
        print("   MTU (scan): \(device.mtu) bytes [Should NOT be populated during scan]")
    } else {
        print("   MTU (scan): Not set ✅ [Correct - MTU only available after connection]")
    }

    if !device.serviceUuids.isEmpty {
        print("   Services: \(device.serviceUuids.prefix(3).joined(separator: ", "))\(device.serviceUuids.count > 3 ? "..." : "")")
    }
    print()

    // Now attempt connection
    print("🔗 Connecting to device...")
    manager.connect(deviceId: device.id) { result in
        switch result {
        case .success:
            print("✅ Connected successfully!\n")

            // Wait a moment for MTU negotiation to complete
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                // Get device info after connection
                if let connectedDevice = manager.getConnectedDevice(deviceId: device.id) {
                    print("✅ POST-CONNECTION DEVICE INFO:")
                    print("   ID: \(connectedDevice.id)")

                    if connectedDevice.hasName {
                        print("   Name: \(connectedDevice.name)")
                    }

                    if connectedDevice.hasMtu {
                        print("   MTU: \(connectedDevice.mtu) bytes ✅ [Populated after connection]")
                    } else {
                        print("   MTU: Not set ❌ [Should be populated after connection]")
                    }
                    print()
                } else {
                    print("❌ Failed to retrieve connected device info\n")
                }

                // Clean up
                print("🧹 Disconnecting...")
                manager.disconnect(deviceId: device.id) { _ in
                    print("✅ Test complete!\n")
                    exit(0)
                }
            }

        case .failure(let error):
            print("❌ Connection failed: \(error.localizedDescription)\n")
            print("⚠️  Note: This is expected for devices requiring pairing/bonding")
            print("   The test verified scan field population successfully.\n")
            exit(1)
        }
    }
}

// Track state changes
manager.stateCallback = { state in
    let stateString: String
    switch state {
    case .unknown:
        stateString = "Unknown"
    case .resetting:
        stateString = "Resetting"
    case .unsupported:
        stateString = "Unsupported ⚠️"
    case .unauthorized:
        stateString = "Unauthorized ⚠️"
    case .poweredOff:
        stateString = "Powered Off 🔴"
    case .poweredOn:
        stateString = "Powered On 🟢"
    case .UNRECOGNIZED:
        stateString = "Unrecognized"
    }

    print("📡 Bluetooth State: \(stateString)\n")

    // Start scanning when powered on
    if state == .poweredOn && !scanStarted {
        scanStarted = true
        print("🔍 Scanning for connectable BLE devices...\n")
        manager.startScan(serviceUUIDs: nil)
    }
}

// Setup signal handler for clean exit
signal(SIGINT) { _ in
    print("\n\n🛑 Test interrupted by user")
    manager.stopScan()
    exit(1)
}

// Timeout after 30 seconds if no connectable device found
DispatchQueue.main.asyncAfter(deadline: .now() + 30) {
    if testDeviceId == nil {
        print("\n⏱️  Timeout: No connectable devices found within 30 seconds")
        print("   Make sure there are BLE devices nearby that advertise as connectable.\n")
        exit(1)
    }
}

// Keep running
RunLoop.main.run()
