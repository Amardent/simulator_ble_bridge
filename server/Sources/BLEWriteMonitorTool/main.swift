import Foundation
import CoreBluetooth
import BLEProxy
import Generated

print("🔧 BLE Write/Monitor Test Tool")
print("Looking for FB* peripherals to test write and monitor operations...\n")

let manager = BLEManager()
var testDevice: (id: String, name: String)?
var isConnecting = false

// State callback
manager.stateCallback = { state in
    if state == .poweredOn {
        print("✅ Bluetooth powered on")
        print("🔍 Scanning for FB* peripherals...\n")

        // Start scanning
        manager.startScan(serviceUUIDs: nil) { device in
            // Look for FB* devices (FB6418, FB8113)
            let name = device.hasName ? device.name : ""
            if name.hasPrefix("FB") && testDevice == nil && !isConnecting {
                testDevice = (id: device.id, name: name)
                isConnecting = true

                print("🎯 Found test device: \(name)")
                print("   Device ID: \(device.id)")
                print("   RSSI: \(device.rssi) dBm\n")
                print("Stopping scan and connecting...\n")

                manager.stopScan()

                // Connect to device
                manager.connect(deviceId: device.id) { result in
                    switch result {
                    case .success:
                        print("✅ Connected to \(name)")
                        print("🔍 Discovering services and characteristics...\n")

                        // Discover all services
                        manager.discoverServices(deviceId: device.id) { discResult in
                            switch discResult {
                            case .success(let services):
                                print("✅ Discovered \(services.count) services\n")

                                var testCount = 0

                                // Print all services and characteristics
                                for service in services {
                                    print("📋 Service: \(service.uuid)")
                                    for char in service.characteristics {
                                        let props = char.properties.joined(separator: ", ")
                                        print("   📌 Characteristic: \(char.uuid)")
                                        print("      Properties: \(props)")

                                        // Test write if writable
                                        if char.properties.contains("write") || char.properties.contains("writeWithoutResponse") {
                                            print("      🔧 Testing WRITE operation...")
                                            let testData = Data([0x01, 0x02, 0x03])
                                            let withResponse = char.properties.contains("write")

                                            manager.writeCharacteristic(
                                                deviceId: device.id,
                                                serviceUUID: service.uuid,
                                                characteristicUUID: char.uuid,
                                                value: testData,
                                                withResponse: withResponse
                                            ) { writeResult in
                                                switch writeResult {
                                                case .success:
                                                    print("      ✅ Write successful (type: \(withResponse ? "with response" : "without response"))")
                                                case .failure(let error):
                                                    print("      ❌ Write failed: \(error)")
                                                }
                                            }
                                            testCount += 1
                                        }

                                        // Test monitor if notifiable
                                        if char.properties.contains("notify") || char.properties.contains("indicate") {
                                            print("      🔧 Testing MONITOR operation...")

                                            do {
                                                try manager.monitorCharacteristic(
                                                    deviceId: device.id,
                                                    serviceUUID: service.uuid,
                                                    characteristicUUID: char.uuid,
                                                    enable: true,
                                                    callback: { data in
                                                        print("      📬 Notification: \(data.count) bytes - \(data.map { String(format: "%02X", $0) }.joined(separator: " "))")
                                                    }
                                                )
                                                print("      ✅ Monitor enabled")

                                                // Disable after 5 seconds
                                                DispatchQueue.main.asyncAfter(deadline: .now() + 5) {
                                                    try? manager.monitorCharacteristic(
                                                        deviceId: device.id,
                                                        serviceUUID: service.uuid,
                                                        characteristicUUID: char.uuid,
                                                        enable: false,
                                                        callback: nil
                                                    )
                                                    print("      ⏸️ Monitor disabled")
                                                }
                                                testCount += 1
                                            } catch {
                                                print("      ❌ Monitor failed: \(error)")
                                            }
                                        }
                                    }
                                    print()
                                }

                                if testCount == 0 {
                                    print("⚠️  No writable or notifiable characteristics found")
                                    print("    This peripheral may not support write/monitor operations")
                                } else {
                                    print("🎉 Initiated \(testCount) write/monitor tests")
                                }

                                // Disconnect after 12 seconds
                                DispatchQueue.main.asyncAfter(deadline: .now() + 12) {
                                    print("\n🔌 Disconnecting...")
                                    manager.disconnect(deviceId: device.id) { _ in
                                        print("✅ Test complete!")
                                        exit(0)
                                    }
                                }

                            case .failure(let error):
                                print("❌ Service discovery failed: \(error)")
                                exit(1)
                            }
                        }

                    case .failure(let error):
                        print("❌ Connection failed: \(error)")
                        print("\n💡 This might be a bonded peripheral (pairing required)")
                        print("   This project only supports non-bonded GATT peripherals")
                        exit(1)
                    }
                }
            }
        }
    }
}

// Keep running
signal(SIGINT) { _ in
    print("\n👋 Exiting...")
    exit(0)
}

// Timeout if no device found
DispatchQueue.main.asyncAfter(deadline: .now() + 15) {
    if testDevice == nil {
        print("\n⏱️  No FB* peripherals found after 15 seconds")
        print("Available devices should have names like: FB6418, FB8113")
        exit(1)
    }
}

print("Press Ctrl+C to stop")
RunLoop.main.run()
