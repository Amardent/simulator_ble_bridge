import Foundation
import BLEProxy
import Generated

// MARK: - Continuous BLE Scanner

/// Simple CLI tool for continuous BLE peripheral scanning
/// Press Ctrl+C to stop

print("🔵 BLE Scanner Starting...")
print("Press Ctrl+C to stop\n")

let manager = BLEManager()
var discoveredDevices: [String: (name: String?, rssi: Int32, count: Int)] = [:]
let startTime = Date()

// Register scan callback
manager.addScanCallback(id: "cli-scanner") { device in
    // Update or add device
    let previousCount = discoveredDevices[device.id]?.count ?? 0
    let name = device.name.isEmpty ? "<No Name>" : device.name
    discoveredDevices[device.id] = (name: device.name.isEmpty ? nil : device.name,
                                   rssi: device.rssi,
                                   count: previousCount + 1)

    // Print discovery
    let elapsed = String(format: "%.1f", Date().timeIntervalSince(startTime))
    print("[\(elapsed)s] 📱 \(name)")
    print("       ID: \(device.id)")
    print("       RSSI: \(device.rssi) dBm")

    if device.hasIsConnectable {
        print("       Connectable: \(device.isConnectable ? "Yes" : "No")")
    }

    if !device.serviceUuids.isEmpty {
        print("       Services: \(device.serviceUuids.joined(separator: ", "))")
    }

    if device.hasManufacturerData && !device.manufacturerData.isEmpty {
        print("       Manufacturer Data: \(device.manufacturerData.count) bytes")
    }

    if device.hasTxPowerLevel {
        print("       TX Power: \(device.txPowerLevel) dBm")
    }

    print("       Advertisements: \(discoveredDevices[device.id]?.count ?? 1)")
    print()
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

    print("📡 Bluetooth State: \(stateString)")

    // Start scanning when powered on
    if state == .poweredOn {
        print("🔍 Starting scan for all BLE peripherals...\n")
        manager.startScan(serviceUUIDs: nil)
    }
}

// Setup signal handler for clean exit
signal(SIGINT) { _ in
    print("\n\n🛑 Stopping scan...")
    manager.stopScan()

    print("\n📊 Summary:")
    print("   Duration: \(String(format: "%.1f", Date().timeIntervalSince(startTime)))s")
    print("   Unique Devices: \(discoveredDevices.count)")

    if !discoveredDevices.isEmpty {
        print("\n   Discovered Peripherals:")
        for (id, info) in discoveredDevices.sorted(by: { $0.value.rssi > $1.value.rssi }) {
            let name = info.name ?? "<No Name>"
            print("   • \(name) (\(info.rssi) dBm) - \(info.count) advertisements")
            print("     \(id)")
        }
    }

    print("\n✅ Scan complete\n")
    exit(0)
}

// Keep running
RunLoop.main.run()
