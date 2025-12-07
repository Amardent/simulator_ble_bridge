import Foundation
import BLEProxy
import Generated

// MARK: - AMDT Device Write Test
//
// This tool:
// 1. Scans for devices with "amdt_" prefix
// 2. Connects to the first matching device
// 3. Discovers services and characteristics
// 4. Writes value 1 to the Identify characteristic
// 5. Verifies the write was successful

print("🔵 AMDT Device Write Test")
print("========================\n")

// MARK: - Configuration
// AMDT device uses custom service with characteristic ending in -0003-
let IDENTIFY_SERVICE_UUID: String? = "4C3F067B-0000-4E8B-80AF-F4AA7553E25E"
let IDENTIFY_CHARACTERISTIC_UUID: String? = "4C3F067B-0003-4E8B-80AF-F4AA7553E25E"
let DEVICE_NAME_PREFIX = "amdt_"

// Alternative: Try to match by characteristic pattern (UUID contains "-0003-")
let IDENTIFY_CHARACTERISTIC_KEYWORDS = ["identify", "ident", "id", "-0003-"]

// MARK: - Test State
var foundDevice: Bleproxy_V1_Device?
var testComplete = false
var testPassed = false

let manager = BLEManager()

// MARK: - Helper Functions
func exitTest(success: Bool) {
    testComplete = true
    testPassed = success
    print("\n" + String(repeating: "=", count: 50))
    if success {
        print("✅ Test PASSED")
    } else {
        print("❌ Test FAILED")
    }
    print(String(repeating: "=", count: 50) + "\n")
    exit(success ? 0 : 1)
}

// MARK: - Scan Callback
manager.addScanCallback(id: "cli-tool") { device in
    // Check if device name matches prefix
    guard device.hasName,
          device.name.lowercased().hasPrefix(DEVICE_NAME_PREFIX.lowercased()) else {
        return
    }

    // Found matching device
    if foundDevice == nil {
        foundDevice = device
        let rssiStr = device.hasRssi ? "\(device.rssi) dBm" : "unknown"
        print("✅ Found device: \(device.name) (ID: \(device.id), RSSI: \(rssiStr))")

        // Stop scanning
        manager.stopScan()
        print("🛑 Stopped scanning\n")

        // Connect to device
        print("🔌 Connecting to \(device.name)...")
        let deviceId = device.id  // String UUID

        manager.connect(deviceId: deviceId) { result in
            switch result {
            case .success:
                print("✅ Connected successfully\n")

                // Discover services
                print("🔍 Discovering services and characteristics...")
                manager.discoverServices(deviceId: deviceId) { discoverResult in
                    switch discoverResult {
                    case .success(let services):
                        print("✅ Discovered \(services.count) service(s)\n")

                        // Print all services and characteristics
                        for service in services {
                            print("📦 Service: \(service.uuid)")
                            for char in service.characteristics {
                                let props = char.properties.joined(separator: ", ")
                                print("   └─ Characteristic: \(char.uuid) [\(props)]")
                            }
                        }

                        // Find the Identify characteristic
                        var identifyChar: Bleproxy_V1_Characteristic?
                        var identifyServiceUUID: String?

                        for service in services {
                            for char in service.characteristics {
                                var isMatch = false

                                // Method 1: Exact UUID match (if provided)
                                if let targetUUID = IDENTIFY_CHARACTERISTIC_UUID,
                                   char.uuid.lowercased() == targetUUID.lowercased() {
                                    isMatch = true
                                }

                                // Method 2: UUID contains keywords
                                if !isMatch {
                                    for keyword in IDENTIFY_CHARACTERISTIC_KEYWORDS {
                                        if char.uuid.lowercased().contains(keyword.lowercased()) {
                                            isMatch = true
                                            break
                                        }
                                    }
                                }

                                // Method 3: If no UUID specified and no keyword match,
                                // try first writable characteristic as fallback
                                if !isMatch && IDENTIFY_CHARACTERISTIC_UUID == nil {
                                    let supportsWrite = char.properties.contains("write") ||
                                                      char.properties.contains("writeWithoutResponse")
                                    if supportsWrite && identifyChar == nil {
                                        isMatch = true
                                        print("   ℹ️  No Identify characteristic specified, trying first writable: \(char.uuid)")
                                    }
                                }

                                if isMatch {
                                    identifyChar = char
                                    identifyServiceUUID = service.uuid
                                    break
                                }
                            }
                            if identifyChar != nil { break }
                        }

                        guard let characteristic = identifyChar,
                              let serviceUUID = identifyServiceUUID else {
                            print("\n❌ Error: Could not find Identify characteristic")
                            if let targetUUID = IDENTIFY_CHARACTERISTIC_UUID {
                                print("   Expected UUID: \(targetUUID)")
                            } else {
                                print("   Searched for keywords: \(IDENTIFY_CHARACTERISTIC_KEYWORDS.joined(separator: ", "))")
                            }
                            print("   Please update IDENTIFY_CHARACTERISTIC_UUID at the top of this script")

                            // Disconnect
                            manager.disconnect(deviceId: deviceId) { _ in
                                exitTest(success: false)
                            }
                            return
                        }

                        print("\n📝 Found Identify characteristic: \(characteristic.uuid)")
                        print("   Service: \(serviceUUID)")
                        print("   Properties: \(characteristic.properties.joined(separator: ", "))")

                        // Verify characteristic supports write
                        let supportsWrite = characteristic.properties.contains("write") ||
                                          characteristic.properties.contains("writeWithoutResponse")
                        guard supportsWrite else {
                            print("❌ Error: Characteristic does not support write operations")
                            manager.disconnect(deviceId: deviceId) { _ in
                                exitTest(success: false)
                            }
                            return
                        }

                        // Write value 1 to the characteristic
                        let writeValue = Data([0x01])  // Single byte: 1
                        let withResponse = characteristic.properties.contains("write")

                        print("\n✍️  Writing value 1 (0x01) to Identify characteristic...")
                        print("   Write type: \(withResponse ? "with response" : "without response")")

                        manager.writeCharacteristic(
                            deviceId: deviceId,
                            serviceUUID: serviceUUID,
                            characteristicUUID: characteristic.uuid,
                            value: writeValue,
                            withResponse: withResponse
                        ) { writeResult in
                            switch writeResult {
                            case .success:
                                print("✅ Write successful!\n")

                                // Optionally read back to verify (if characteristic supports read)
                                if characteristic.properties.contains("read") {
                                    print("📖 Reading back to verify...")
                                    manager.readCharacteristic(
                                        deviceId: deviceId,
                                        serviceUUID: serviceUUID,
                                        characteristicUUID: characteristic.uuid
                                    ) { readResult in
                                        switch readResult {
                                        case .success(let data):
                                            print("✅ Read back: \(data.map { String(format: "0x%02X", $0) }.joined(separator: " "))")

                                            if data == writeValue {
                                                print("✅ Verification: Value matches!")
                                            } else {
                                                print("⚠️  Verification: Value differs (this may be expected)")
                                            }

                                            // Disconnect and exit
                                            print("\n🔌 Disconnecting...")
                                            manager.disconnect(deviceId: deviceId) { _ in
                                                print("✅ Disconnected")
                                                exitTest(success: true)
                                            }

                                        case .failure(let error):
                                            print("⚠️  Could not read back (characteristic may not support read)")
                                            print("   Error: \(error)")

                                            // Still consider test passed since write succeeded
                                            print("\n🔌 Disconnecting...")
                                            manager.disconnect(deviceId: deviceId) { _ in
                                                print("✅ Disconnected")
                                                exitTest(success: true)
                                            }
                                        }
                                    }
                                } else {
                                    // No read support, just disconnect
                                    print("ℹ️  Characteristic does not support read, skipping verification\n")
                                    print("🔌 Disconnecting...")
                                    manager.disconnect(deviceId: deviceId) { _ in
                                        print("✅ Disconnected")
                                        exitTest(success: true)
                                    }
                                }

                            case .failure(let error):
                                print("❌ Write failed: \(error)")
                                manager.disconnect(deviceId: deviceId) { _ in
                                    exitTest(success: false)
                                }
                            }
                        }

                    case .failure(let error):
                        print("❌ Service discovery failed: \(error)")
                        manager.disconnect(deviceId: deviceId) { _ in
                            exitTest(success: false)
                        }
                    }
                }

            case .failure(let error):
                print("❌ Connection failed: \(error)")
                exitTest(success: false)
            }
        }
    }
}

// MARK: - State Callback
manager.stateCallback = { state in
    print("📡 Bluetooth state: \(state)")

    guard state == .poweredOn else {
        if state == .poweredOff {
            print("❌ Error: Bluetooth is powered off")
            exitTest(success: false)
        } else if state == .unauthorized {
            print("❌ Error: Bluetooth access unauthorized")
            exitTest(success: false)
        }
        return
    }

    print("\n🔍 Scanning for devices with prefix '\(DEVICE_NAME_PREFIX)'...")

    // Start scanning
    manager.startScan(serviceUUIDs: nil)
}

// MARK: - Timeout Handler
DispatchQueue.main.asyncAfter(deadline: .now() + 30) {
    if !testComplete {
        print("\n⏰ Timeout: No matching device found within 30 seconds")
        print("   Make sure your 'amdt_' device is:")
        print("   - Powered on")
        print("   - In range")
        print("   - Advertising")
        exitTest(success: false)
    }
}

// MARK: - Signal Handler
signal(SIGINT) { _ in
    print("\n\n⚠️  Interrupted by user")
    exit(1)
}

// Keep the script running
RunLoop.main.run()
