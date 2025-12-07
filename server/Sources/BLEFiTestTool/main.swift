import Foundation
import CoreBluetooth
import BLEProxy
import Generated

print("🐱 Fi-FC35D000113 Write Test")
print("Testing write to characteristic 57B40012*")
print("Expected: Writing 'kittenss' should disconnect device\n")

let manager = BLEManager()
let targetDeviceName = "Fi-FC35D000113"
let targetCharPrefix = "57B40012"
var testDevice: (id: String, name: String)?
var isConnecting = false

// Scan callback
manager.addScanCallback(id: "cli-tool") { device in
    let name = device.hasName ? device.name : ""

    if name == targetDeviceName && testDevice == nil && !isConnecting {
        testDevice = (id: device.id, name: name)
        isConnecting = true

        print("🎯 Found target device: \(name)")
        print("   Device ID: \(device.id)")
        print("   RSSI: \(device.rssi) dBm\n")

        manager.stopScan()
        print("Connecting...\n")

        // Connect to device
        manager.connect(deviceId: device.id) { result in
            switch result {
            case .success:
                print("✅ Connected to \(name)")
                print("🔍 Discovering services...\n")

                // Discover all services
                manager.discoverServices(deviceId: device.id) { discResult in
                    switch discResult {
                    case .success(let services):
                        print("✅ Discovered \(services.count) services\n")

                        var foundTarget = false

                        // Find the target characteristic
                        for service in services {
                            print("📋 Service: \(service.uuid)")
                            for char in service.characteristics {
                                print("   📌 Characteristic: \(char.uuid)")
                                print("      Properties: \(char.properties.joined(separator: ", "))")

                                // Check if this is our target characteristic
                                if char.uuid.uppercased().hasPrefix(targetCharPrefix.uppercased()) {
                                    foundTarget = true
                                    print("      🎯 FOUND TARGET CHARACTERISTIC!")

                                    // Check if writable
                                    if char.properties.contains("write") || char.properties.contains("writeWithoutResponse") {
                                        let withResponse = char.properties.contains("write")
                                        print("      ✅ Characteristic is writable (type: \(withResponse ? "with response" : "without response"))")

                                        // Test 1: Write a safe value first
                                        print("\n📝 Test 1: Writing safe test data (0x01 0x02 0x03)...")
                                        let safeData = Data([0x01, 0x02, 0x03])

                                        manager.writeCharacteristic(
                                            deviceId: device.id,
                                            serviceUUID: service.uuid,
                                            characteristicUUID: char.uuid,
                                            value: safeData,
                                            withResponse: withResponse
                                        ) { writeResult in
                                            switch writeResult {
                                            case .success:
                                                print("   ✅ Safe write successful!")

                                                // Wait 2 seconds before the disconnect test
                                                print("\n⏳ Waiting 2 seconds before disconnect test...")
                                                DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                                                    // Test 2: Write "kittenss" - should cause disconnect
                                                    print("\n📝 Test 2: Writing 'kittenss' (expected to disconnect)...")
                                                    let kittenssData = "kittenss".data(using: .utf8)!

                                                    manager.writeCharacteristic(
                                                        deviceId: device.id,
                                                        serviceUUID: service.uuid,
                                                        characteristicUUID: char.uuid,
                                                        value: kittenssData,
                                                        withResponse: withResponse
                                                    ) { disconnectWriteResult in
                                                        switch disconnectWriteResult {
                                                        case .success:
                                                            print("   ✅ Write completed successfully")
                                                            print("   ⏳ Waiting for device disconnect...")
                                                        case .failure(let error):
                                                            print("   ⚠️  Write failed or device disconnected: \(error)")
                                                            if let bleError = error as? BLEError {
                                                                if bleError.code == .errorDeviceDisconnected {
                                                                    print("   ✅ EXPECTED: Device disconnected as expected!")
                                                                }
                                                            }
                                                        }
                                                    }

                                                    // Wait up to 5 seconds to observe disconnect
                                                    DispatchQueue.main.asyncAfter(deadline: .now() + 5) {
                                                        print("\n🏁 Test complete")
                                                        print("   If device is still connected, the disconnect didn't occur")
                                                        exit(0)
                                                    }
                                                }

                                            case .failure(let error):
                                                print("   ❌ Safe write failed: \(error)")
                                                print("   Cannot proceed with disconnect test")
                                                exit(1)
                                            }
                                        }
                                    } else {
                                        print("      ❌ Characteristic is NOT writable!")
                                        print("      Properties: \(char.properties.joined(separator: ", "))")
                                        exit(1)
                                    }
                                }
                            }
                        }

                        if !foundTarget {
                            print("\n❌ Target characteristic \(targetCharPrefix)* not found!")
                            print("Available characteristics:")
                            for service in services {
                                for char in service.characteristics {
                                    print("   - \(char.uuid) (\(char.properties.joined(separator: ", ")))")
                                }
                            }
                            exit(1)
                        }

                    case .failure(let error):
                        print("❌ Service discovery failed: \(error)")
                        exit(1)
                    }
                }

            case .failure(let error):
                print("❌ Connection failed: \(error)")
                if let bleError = error as? BLEError {
                    if bleError.message.contains("timeout") {
                        print("\n💡 Connection timeout - this device may require pairing/bonding")
                        print("   This project only supports non-bonded GATT peripherals")
                    }
                }
                exit(1)
            }
        }
    }
}

// State callback
manager.stateCallback = { state in
    if state == .poweredOn {
        print("✅ Bluetooth powered on")
        print("🔍 Scanning for \(targetDeviceName)...\n")

        // Start scanning
        manager.startScan(serviceUUIDs: nil)
    }
}

// Keep running
signal(SIGINT) { _ in
    print("\n👋 Exiting...")
    exit(0)
}

// Timeout if no device found
DispatchQueue.main.asyncAfter(deadline: .now() + 20) {
    if testDevice == nil {
        print("\n⏱️  Device '\(targetDeviceName)' not found after 20 seconds")
        print("\nMake sure:")
        print("  1. Device is powered on")
        print("  2. Device is in range")
        print("  3. Device is advertising (not already connected)")
        exit(1)
    }
}

print("Press Ctrl+C to stop\n")
RunLoop.main.run()
