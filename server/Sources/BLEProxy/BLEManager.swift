import CoreBluetooth
import Foundation
import Generated

/// BLEManager wraps CoreBluetooth's CBCentralManager to provide scanning,
/// connection management, and peripheral interaction capabilities.
///
/// This class handles:
/// - Bluetooth adapter state tracking
/// - Peripheral scanning with optional service UUID filtering
/// - Discovered peripheral storage and management
/// - Advertisement data extraction and conversion to protobuf types
/// - Connection management and service discovery
///
/// Thread Safety:
/// - CBCentralManager operations occur on a dedicated background queue
/// - Peripheral dictionary access is synchronized via the same queue
/// - Callbacks are invoked on the background queue (callers must dispatch to main if needed)
public class BLEManager: NSObject {

    // MARK: - Properties

    /// Central manager instance for BLE operations
    private var centralManager: CBCentralManager!

    /// Background queue for all CoreBluetooth operations
    private let queue = DispatchQueue(label: "com.bleproxy.central", qos: .userInitiated)

    /// Storage for discovered peripherals (keyed by UUID)
    /// Retains peripherals to prevent deallocation during scan
    private var discoveredPeripherals: [UUID: CBPeripheral] = [:]

    /// Storage for connected peripherals (keyed by UUID)
    /// Retains peripherals to prevent deallocation while connected
    private var connectedPeripherals: [UUID: CBPeripheral] = [:]

    /// Pending connection completion handlers
    private var pendingConnections: [UUID: (Result<Void, Error>) -> Void] = [:]

    /// Pending connection timeout work items
    private var connectionTimeouts: [UUID: DispatchWorkItem] = [:]

    /// Pending service discovery completion handlers
    private var pendingDiscoveries: [UUID: (Result<[Bleproxy_V1_Service], Error>) -> Void] = [:]

    /// Tracks characteristic discovery progress per peripheral
    /// Key: peripheral UUID, Value: set of service UUIDs pending characteristic discovery
    private var pendingCharacteristics: [UUID: Set<CBUUID>] = [:]

    /// Cached services from discovery operations (Step 5)
    /// Key: peripheral UUID, Value: array of discovered Service protobuf messages
    private var cachedServices: [UUID: [Bleproxy_V1_Service]] = [:]

    /// Pending characteristic read completion handlers (Step 5)
    /// Key: CharacteristicKey combining device, service, and characteristic UUIDs
    private var pendingReads: [CharacteristicKey: (Result<Data, Error>) -> Void] = [:]

    /// Pending read timeout work items (Step 5)
    /// Key: CharacteristicKey matching pendingReads
    private var readTimeouts: [CharacteristicKey: DispatchWorkItem] = [:]

    /// Pending characteristic write completion handlers (Step 6)
    /// Key: CharacteristicKey combining device, service, and characteristic UUIDs
    private var pendingWrites: [CharacteristicKey: (Result<Void, Error>) -> Void] = [:]

    /// Pending write timeout work items (Step 6)
    /// Key: CharacteristicKey matching pendingWrites
    private var writeTimeouts: [CharacteristicKey: DispatchWorkItem] = [:]

    /// Active characteristic monitoring callbacks (Step 6)
    /// Key: CharacteristicKey identifying the monitored characteristic
    /// Value: Callback invoked when notification/indication is received
    private var activeMonitors: [CharacteristicKey: (Data) -> Void] = [:]

    /// Pending RSSI read completion handlers (Step 7)
    /// Key: peripheral UUID
    private var pendingRSSIReads: [UUID: (Result<Int32, Error>) -> Void] = [:]

    /// Pending RSSI read timeout work items (Step 7)
    /// Key: peripheral UUID matching pendingRSSIReads
    private var rssiTimeouts: [UUID: DispatchWorkItem] = [:]

    /// Callback invoked when a peripheral is discovered during scanning
    /// Called on background queue - dispatch to main if updating UI
    /// Multiple callbacks supported for WebSocket broadcasting (Step 10)
    private var scanCallbacks: [(id: String, callback: (Bleproxy_V1_Device) -> Void)] = []

    /// Callback invoked when manager state changes
    /// Called on background queue - dispatch to main if updating UI
    public var stateCallback: ((Bleproxy_V1_ManagerState) -> Void)?

    /// Global callback for connection state changes (Step 10)
    /// Parameters: deviceId UUID, isConnected, error (nil if successful connection)
    /// Called on background queue - dispatch to main if updating UI
    public var connectionCallback: ((UUID, Bool, Error?) -> Void)?

    /// Global callback for characteristic notifications (Step 10)
    /// Parameters: deviceId UUID, serviceUUID, characteristicUUID, value Data
    /// Called on background queue - dispatch to main if updating UI
    public var notificationCallback: ((UUID, CBUUID, CBUUID, Data) -> Void)?

    // MARK: - Initialization

    public override init() {
        super.init()
        // Initialize CBCentralManager on background queue
        // State updates will trigger centralManagerDidUpdateState delegate method
        centralManager = CBCentralManager(delegate: self, queue: queue)
    }

    // MARK: - Public API

    /// Returns the current Bluetooth adapter state
    public func getState() -> Bleproxy_V1_ManagerState {
        return mapState(centralManager.state)
    }

    /// Adds a scan callback to receive discovered peripherals (Step 10)
    /// - Parameters:
    ///   - id: Unique identifier for this callback (used to remove later)
    ///   - callback: Called for each discovered peripheral with device information
    public func addScanCallback(id: String, callback: @escaping (Bleproxy_V1_Device) -> Void) {
        queue.async { [weak self] in
            guard let self = self else { return }
            // Remove any existing callback with the same ID
            self.scanCallbacks.removeAll { $0.id == id }
            // Add new callback
            self.scanCallbacks.append((id: id, callback: callback))
            print("BLEManager: Added scan callback '\(id)' (total: \(self.scanCallbacks.count))")
        }
    }

    /// Removes a scan callback by ID (Step 10)
    /// - Parameter id: The unique identifier of the callback to remove
    public func removeScanCallback(id: String) {
        queue.async { [weak self] in
            guard let self = self else { return }
            self.scanCallbacks.removeAll { $0.id == id }
            print("BLEManager: Removed scan callback '\(id)' (remaining: \(self.scanCallbacks.count))")
        }
    }

    /// Removes all scan callbacks (Step 10)
    private func removeAllScanCallbacks() {
        // Must be called on queue
        scanCallbacks.removeAll()
        print("BLEManager: Removed all scan callbacks")
    }

    /// Starts scanning for BLE peripherals
    /// - Parameters:
    ///   - serviceUUIDs: Optional array of service UUIDs to filter scan results.
    ///                   If nil, discovers all peripherals.
    ///   - callback: Called for each discovered peripheral with device information
    /// - Throws: Will log error if Bluetooth is not powered on
    public func startScan(serviceUUIDs: [CBUUID]?, callback: @escaping (Bleproxy_V1_Device) -> Void) {
        queue.async { [weak self] in
            guard let self = self else { return }

            // Verify Bluetooth is powered on before scanning
            guard self.centralManager.state == .poweredOn else {
                print("BLEManager: Cannot start scan - Bluetooth state is \(self.centralManager.state.rawValue)")
                return
            }

            // Add callback with temporary ID for HTTP endpoint compatibility
            self.scanCallbacks.append((id: "http-endpoint", callback: callback))

            // Start scanning with option to report duplicate discoveries
            // This allows tracking RSSI changes for the same peripheral
            let options: [String: Any] = [
                CBCentralManagerScanOptionAllowDuplicatesKey: true
            ]

            self.centralManager.scanForPeripherals(withServices: serviceUUIDs, options: options)
            print("BLEManager: Started scanning for peripherals")
        }
    }

    /// Stops any active scan operation
    public func stopScan() {
        queue.async { [weak self] in
            guard let self = self else { return }
            self.centralManager.stopScan()
            self.removeAllScanCallbacks()
            print("BLEManager: Stopped scanning")
        }
    }

    // MARK: - Connection Management

    /// Connects to a peripheral by device ID
    /// - Parameters:
    ///   - deviceId: The UUID string of the peripheral to connect to
    ///   - completion: Called with Result when connection completes or fails
    /// - Note: Completion is called on the background queue
    public func connect(deviceId: String, completion: @escaping (Result<Void, Error>) -> Void) {
        queue.async { [weak self] in
            guard let self = self else {
                completion(.failure(BLEError(
                    code: .errorBluetoothManagerDestroyed,
                    message: "BLEManager deallocated"
                )))
                return
            }

            // Verify Bluetooth is powered on
            guard self.centralManager.state == .poweredOn else {
                completion(.failure(BLEError(
                    code: .errorBluetoothPoweredOff,
                    message: "Bluetooth is not powered on"
                )))
                return
            }

            // Parse UUID
            guard let uuid = UUID(uuidString: deviceId) else {
                completion(.failure(BLEError(
                    code: .errorInvalidIdentifiers,
                    message: "Invalid device ID: \(deviceId)"
                )))
                return
            }

            // Check if already connected
            if self.connectedPeripherals[uuid] != nil {
                completion(.failure(BLEError(
                    code: .errorDeviceAlreadyConnected,
                    message: "Device \(deviceId) is already connected"
                )))
                return
            }

            // Find peripheral in discovered peripherals
            guard let peripheral = self.discoveredPeripherals[uuid] else {
                completion(.failure(BLEError(
                    code: .errorDeviceNotFound,
                    message: "Device \(deviceId) not found in discovered peripherals"
                )))
                return
            }

            // Store completion handler
            self.pendingConnections[uuid] = completion

            // Create timeout work item (60 seconds to allow for slower peripherals)
            let timeoutWork = DispatchWorkItem { [weak self] in
                guard let self = self else { return }

                // Check if connection is still pending
                if let completion = self.pendingConnections.removeValue(forKey: uuid) {
                    // Cancel the connection attempt
                    self.centralManager.cancelPeripheralConnection(peripheral)

                    // Call completion with timeout error
                    let error = BLEError(
                        code: .errorDeviceConnectionFailed,
                        message: "Connection timeout after 60 seconds. Device may require pairing (not supported) or may not be connectable."
                    )
                    completion(.failure(error))
                    print("BLEManager: Connection to \(deviceId) timed out")
                }
            }

            // Store timeout work item so we can cancel it on success
            self.connectionTimeouts[uuid] = timeoutWork

            // Schedule timeout
            self.queue.asyncAfter(deadline: .now() + 60, execute: timeoutWork)

            // Set delegate and initiate connection
            peripheral.delegate = self
            self.centralManager.connect(peripheral, options: nil)
            print("BLEManager: Initiating connection to \(deviceId) (60s timeout)")
        }
    }

    /// Disconnects from a peripheral by device ID
    /// - Parameters:
    ///   - deviceId: The UUID string of the peripheral to disconnect
    ///   - completion: Called with Result when disconnection completes
    /// - Note: Completion is called on the background queue
    public func disconnect(deviceId: String, completion: @escaping (Result<Void, Error>) -> Void) {
        queue.async { [weak self] in
            guard let self = self else {
                completion(.failure(BLEError(
                    code: .errorBluetoothManagerDestroyed,
                    message: "BLEManager deallocated"
                )))
                return
            }

            // Parse UUID
            guard let uuid = UUID(uuidString: deviceId) else {
                completion(.failure(BLEError(
                    code: .errorInvalidIdentifiers,
                    message: "Invalid device ID: \(deviceId)"
                )))
                return
            }

            // Find peripheral in connected peripherals
            guard let peripheral = self.connectedPeripherals[uuid] else {
                completion(.failure(BLEError(
                    code: .errorDeviceNotConnected,
                    message: "Device \(deviceId) is not connected"
                )))
                return
            }

            // Initiate disconnection
            self.centralManager.cancelPeripheralConnection(peripheral)
            print("BLEManager: Initiating disconnection from \(deviceId)")

            // Success - disconnection callback will clean up
            completion(.success(()))
        }
    }

    /// Checks if a peripheral is currently connected
    /// - Parameter deviceId: The UUID string of the peripheral to check
    /// - Returns: true if connected, false otherwise
    public func isConnected(deviceId: String) -> Bool {
        guard let uuid = UUID(uuidString: deviceId) else {
            return false
        }

        // Access must be synchronized via queue
        var result = false
        queue.sync {
            result = self.connectedPeripherals[uuid] != nil
        }
        return result
    }

    // MARK: - Service Discovery

    /// Discovers all services and characteristics for a connected peripheral
    /// - Parameters:
    ///   - deviceId: The UUID string of the connected peripheral
    ///   - completion: Called with Result containing array of Service messages or error
    /// - Note: Completion is called on the background queue
    public func discoverServices(deviceId: String, completion: @escaping (Result<[Bleproxy_V1_Service], Error>) -> Void) {
        queue.async { [weak self] in
            guard let self = self else {
                completion(.failure(BLEError(
                    code: .errorBluetoothManagerDestroyed,
                    message: "BLEManager deallocated"
                )))
                return
            }

            // Parse UUID
            guard let uuid = UUID(uuidString: deviceId) else {
                completion(.failure(BLEError(
                    code: .errorInvalidIdentifiers,
                    message: "Invalid device ID: \(deviceId)"
                )))
                return
            }

            // Verify peripheral is connected
            guard let peripheral = self.connectedPeripherals[uuid] else {
                completion(.failure(BLEError(
                    code: .errorDeviceNotConnected,
                    message: "Device \(deviceId) is not connected"
                )))
                return
            }

            // Store completion handler
            self.pendingDiscoveries[uuid] = completion

            // Initiate service discovery (nil = discover all services)
            peripheral.discoverServices(nil)
            print("BLEManager: Discovering services for \(deviceId)")
        }
    }

    // MARK: - Characteristic Operations

    /// Reads a characteristic value from a connected peripheral
    /// - Parameters:
    ///   - deviceId: The UUID string of the connected peripheral
    ///   - serviceUUID: The UUID string of the service containing the characteristic
    ///   - characteristicUUID: The UUID string of the characteristic to read
    ///   - completion: Called with Result containing Data on success or Error on failure
    /// - Note: Completion is called on the background queue
    public func readCharacteristic(
        deviceId: String,
        serviceUUID: String,
        characteristicUUID: String,
        completion: @escaping (Result<Data, Error>) -> Void
    ) {
        queue.async { [weak self] in
            guard let self = self else {
                completion(.failure(BLEError(
                    code: .errorBluetoothManagerDestroyed,
                    message: "BLEManager deallocated"
                )))
                return
            }

            // Parse device UUID
            guard let uuid = UUID(uuidString: deviceId) else {
                completion(.failure(BLEError(
                    code: .errorInvalidIdentifiers,
                    message: "Invalid device ID: \(deviceId)"
                )))
                return
            }

            // Parse service UUID
            let serviceUUID = CBUUID(string: serviceUUID)

            // Parse characteristic UUID
            let charUUID = CBUUID(string: characteristicUUID)

            // Verify peripheral is connected
            guard let peripheral = self.connectedPeripherals[uuid] else {
                completion(.failure(BLEError(
                    code: .errorDeviceNotConnected,
                    message: "Device \(deviceId) is not connected"
                )))
                return
            }

            // Verify services have been discovered and cached
            guard let services = self.cachedServices[uuid] else {
                completion(.failure(BLEError(
                    code: .errorServicesNotDiscovered,
                    message: "Services not discovered for device \(deviceId). Call discoverServices first."
                )))
                return
            }

            // Find the service
            guard let service = services.first(where: { $0.uuid == serviceUUID.uuidString }) else {
                completion(.failure(BLEError(
                    code: .errorServiceNotFound,
                    message: "Service \(serviceUUID.uuidString) not found on device \(deviceId)"
                )))
                return
            }

            // Find the characteristic
            guard let characteristic = service.characteristics.first(where: { $0.uuid == charUUID.uuidString }) else {
                completion(.failure(BLEError(
                    code: .errorCharacteristicNotFound,
                    message: "Characteristic \(charUUID.uuidString) not found in service \(serviceUUID.uuidString)"
                )))
                return
            }

            // Verify characteristic has read property
            guard characteristic.properties.contains("read") else {
                completion(.failure(BLEError(
                    code: .errorCharacteristicReadFailed,
                    message: "Characteristic \(charUUID.uuidString) does not have read property"
                )))
                return
            }

            // Find the actual CBService and CBCharacteristic from the peripheral
            guard let cbService = peripheral.services?.first(where: { $0.uuid == serviceUUID }) else {
                completion(.failure(BLEError(
                    code: .errorServiceNotFound,
                    message: "CoreBluetooth service \(serviceUUID.uuidString) not found"
                )))
                return
            }

            guard let cbCharacteristic = cbService.characteristics?.first(where: { $0.uuid == charUUID }) else {
                completion(.failure(BLEError(
                    code: .errorCharacteristicNotFound,
                    message: "CoreBluetooth characteristic \(charUUID.uuidString) not found"
                )))
                return
            }

            // Create tracking key
            let key = CharacteristicKey(
                deviceId: uuid,
                serviceUUID: serviceUUID,
                characteristicUUID: charUUID
            )

            // Create timeout work item (10 seconds for read operations)
            let timeoutWork = DispatchWorkItem { [weak self] in
                guard let self = self else { return }

                // Check if read is still pending
                if let completion = self.pendingReads.removeValue(forKey: key) {
                    let error = BLEError(
                        code: .errorCharacteristicReadFailed,
                        message: "Read timeout after 10 seconds for characteristic \(charUUID.uuidString)"
                    )
                    completion(.failure(error))
                    print("BLEManager: Read timeout for characteristic \(charUUID.uuidString)")
                }
            }

            // Store completion and timeout
            self.pendingReads[key] = completion
            self.readTimeouts[key] = timeoutWork

            // Schedule timeout on background queue
            self.queue.asyncAfter(deadline: .now() + 10, execute: timeoutWork)

            // Initiate read
            peripheral.readValue(for: cbCharacteristic)
            print("BLEManager: Reading characteristic \(charUUID.uuidString) from service \(serviceUUID.uuidString) (10s timeout)")
        }
    }

    /// Writes a value to a characteristic on a connected peripheral
    /// - Parameters:
    ///   - deviceId: The UUID string of the connected peripheral
    ///   - serviceUUID: The UUID string of the service containing the characteristic
    ///   - characteristicUUID: The UUID string of the characteristic to write
    ///   - value: The data to write
    ///   - withResponse: If true, waits for peripheral confirmation; if false, completes immediately
    ///   - completion: Called with Result when write completes or fails
    /// - Note: Completion is called on the background queue
    public func writeCharacteristic(
        deviceId: String,
        serviceUUID: String,
        characteristicUUID: String,
        value: Data,
        withResponse: Bool,
        completion: @escaping (Result<Void, Error>) -> Void
    ) {
        queue.async { [weak self] in
            guard let self = self else {
                completion(.failure(BLEError(
                    code: .errorBluetoothManagerDestroyed,
                    message: "BLEManager deallocated"
                )))
                return
            }

            // Parse device UUID
            guard let uuid = UUID(uuidString: deviceId) else {
                completion(.failure(BLEError(
                    code: .errorInvalidIdentifiers,
                    message: "Invalid device ID: \(deviceId)"
                )))
                return
            }

            // Parse service UUID
            let serviceUUID = CBUUID(string: serviceUUID)

            // Parse characteristic UUID
            let charUUID = CBUUID(string: characteristicUUID)

            // Verify peripheral is connected
            guard let peripheral = self.connectedPeripherals[uuid] else {
                completion(.failure(BLEError(
                    code: .errorDeviceNotConnected,
                    message: "Device \(deviceId) is not connected"
                )))
                return
            }

            // Verify services have been discovered and cached
            guard let services = self.cachedServices[uuid] else {
                completion(.failure(BLEError(
                    code: .errorServicesNotDiscovered,
                    message: "Services not discovered for device \(deviceId). Call discoverServices first."
                )))
                return
            }

            // Find the service
            guard let service = services.first(where: { $0.uuid == serviceUUID.uuidString }) else {
                completion(.failure(BLEError(
                    code: .errorServiceNotFound,
                    message: "Service \(serviceUUID.uuidString) not found on device \(deviceId)"
                )))
                return
            }

            // Find the characteristic
            guard let characteristic = service.characteristics.first(where: { $0.uuid == charUUID.uuidString }) else {
                completion(.failure(BLEError(
                    code: .errorCharacteristicNotFound,
                    message: "Characteristic \(charUUID.uuidString) not found in service \(serviceUUID.uuidString)"
                )))
                return
            }

            // Verify characteristic has appropriate write property
            let hasWriteWithResponse = characteristic.properties.contains("write")
            let hasWriteWithoutResponse = characteristic.properties.contains("writeWithoutResponse")

            if withResponse && !hasWriteWithResponse {
                completion(.failure(BLEError(
                    code: .errorCharacteristicWriteFailed,
                    message: "Characteristic \(charUUID.uuidString) does not support write with response"
                )))
                return
            }

            if !withResponse && !hasWriteWithoutResponse {
                completion(.failure(BLEError(
                    code: .errorCharacteristicWriteFailed,
                    message: "Characteristic \(charUUID.uuidString) does not support write without response"
                )))
                return
            }

            // Find the actual CBService and CBCharacteristic from the peripheral
            guard let cbService = peripheral.services?.first(where: { $0.uuid == serviceUUID }) else {
                completion(.failure(BLEError(
                    code: .errorServiceNotFound,
                    message: "CoreBluetooth service \(serviceUUID.uuidString) not found"
                )))
                return
            }

            guard let cbCharacteristic = cbService.characteristics?.first(where: { $0.uuid == charUUID }) else {
                completion(.failure(BLEError(
                    code: .errorCharacteristicNotFound,
                    message: "CoreBluetooth characteristic \(charUUID.uuidString) not found"
                )))
                return
            }

            // Handle write without response (completes immediately)
            if !withResponse {
                // Check if peripheral is ready to send write without response
                guard peripheral.canSendWriteWithoutResponse else {
                    completion(.failure(BLEError(
                        code: .errorCharacteristicWriteFailed,
                        message: "Peripheral not ready for write without response"
                    )))
                    return
                }

                // Perform write without response
                peripheral.writeValue(value, for: cbCharacteristic, type: .withoutResponse)
                print("BLEManager: Wrote \(value.count) bytes to characteristic \(charUUID.uuidString) (without response)")
                completion(.success(()))
                return
            }

            // Handle write with response (requires timeout and delegate callback)
            let key = CharacteristicKey(
                deviceId: uuid,
                serviceUUID: serviceUUID,
                characteristicUUID: charUUID
            )

            // Create timeout work item (10 seconds for write operations)
            let timeoutWork = DispatchWorkItem { [weak self] in
                guard let self = self else { return }

                // Check if write is still pending
                if let completion = self.pendingWrites.removeValue(forKey: key) {
                    let error = BLEError(
                        code: .errorCharacteristicWriteFailed,
                        message: "Write timeout after 10 seconds for characteristic \(charUUID.uuidString)"
                    )
                    completion(.failure(error))
                    print("BLEManager: Write timeout for characteristic \(charUUID.uuidString)")
                }
            }

            // Store completion and timeout
            self.pendingWrites[key] = completion
            self.writeTimeouts[key] = timeoutWork

            // Schedule timeout on background queue
            self.queue.asyncAfter(deadline: .now() + 10, execute: timeoutWork)

            // Initiate write with response
            peripheral.writeValue(value, for: cbCharacteristic, type: .withResponse)
            print("BLEManager: Writing \(value.count) bytes to characteristic \(charUUID.uuidString) (with response, 10s timeout)")
        }
    }

    /// Enables or disables notifications/indications for a characteristic
    /// - Parameters:
    ///   - deviceId: The UUID string of the connected peripheral
    ///   - serviceUUID: The UUID string of the service containing the characteristic
    ///   - characteristicUUID: The UUID string of the characteristic to monitor
    ///   - enable: If true, enables notifications; if false, disables them
    ///   - callback: Called when notification/indication data is received (only used if enable is true)
    /// - Throws: BLEError if validation fails
    /// - Note: Callback is invoked on the background queue
    public func monitorCharacteristic(
        deviceId: String,
        serviceUUID: String,
        characteristicUUID: String,
        enable: Bool,
        callback: ((Data) -> Void)?
    ) throws {
        // Use a Result to capture async errors
        var asyncError: Error?
        let semaphore = DispatchSemaphore(value: 0)

        queue.async { [weak self] in
            defer { semaphore.signal() }

            guard let self = self else {
                asyncError = BLEError(
                    code: .errorBluetoothManagerDestroyed,
                    message: "BLEManager deallocated"
                )
                return
            }

            // Parse device UUID
            guard let uuid = UUID(uuidString: deviceId) else {
                asyncError = BLEError(
                    code: .errorInvalidIdentifiers,
                    message: "Invalid device ID: \(deviceId)"
                )
                return
            }

            // Parse service UUID
            let serviceUUID = CBUUID(string: serviceUUID)

            // Parse characteristic UUID
            let charUUID = CBUUID(string: characteristicUUID)

            // Verify peripheral is connected
            guard let peripheral = self.connectedPeripherals[uuid] else {
                asyncError = BLEError(
                    code: .errorDeviceNotConnected,
                    message: "Device \(deviceId) is not connected"
                )
                return
            }

            // Verify services have been discovered and cached
            guard let services = self.cachedServices[uuid] else {
                asyncError = BLEError(
                    code: .errorServicesNotDiscovered,
                    message: "Services not discovered for device \(deviceId). Call discoverServices first."
                )
                return
            }

            // Find the service
            guard let service = services.first(where: { $0.uuid == serviceUUID.uuidString }) else {
                asyncError = BLEError(
                    code: .errorServiceNotFound,
                    message: "Service \(serviceUUID.uuidString) not found on device \(deviceId)"
                )
                return
            }

            // Find the characteristic
            guard let characteristic = service.characteristics.first(where: { $0.uuid == charUUID.uuidString }) else {
                asyncError = BLEError(
                    code: .errorCharacteristicNotFound,
                    message: "Characteristic \(charUUID.uuidString) not found in service \(serviceUUID.uuidString)"
                )
                return
            }

            // Verify characteristic supports notify or indicate
            let hasNotify = characteristic.properties.contains("notify")
            let hasIndicate = characteristic.properties.contains("indicate")

            guard hasNotify || hasIndicate else {
                asyncError = BLEError(
                    code: .errorCharacteristicNotifyChangeFailed,
                    message: "Characteristic \(charUUID.uuidString) does not support notifications or indications"
                )
                return
            }

            // Find the actual CBService and CBCharacteristic from the peripheral
            guard let cbService = peripheral.services?.first(where: { $0.uuid == serviceUUID }) else {
                asyncError = BLEError(
                    code: .errorServiceNotFound,
                    message: "CoreBluetooth service \(serviceUUID.uuidString) not found"
                )
                return
            }

            guard let cbCharacteristic = cbService.characteristics?.first(where: { $0.uuid == charUUID }) else {
                asyncError = BLEError(
                    code: .errorCharacteristicNotFound,
                    message: "CoreBluetooth characteristic \(charUUID.uuidString) not found"
                )
                return
            }

            // Create tracking key
            let key = CharacteristicKey(
                deviceId: uuid,
                serviceUUID: serviceUUID,
                characteristicUUID: charUUID
            )

            if enable {
                // Store callback for notifications
                guard let callback = callback else {
                    asyncError = BLEError(
                        code: .errorCharacteristicNotifyChangeFailed,
                        message: "Callback must be provided when enabling monitoring"
                    )
                    return
                }

                self.activeMonitors[key] = callback

                // Enable notifications/indications
                peripheral.setNotifyValue(true, for: cbCharacteristic)
                print("BLEManager: Enabled monitoring for characteristic \(charUUID.uuidString)")
            } else {
                // Remove callback
                self.activeMonitors.removeValue(forKey: key)

                // Disable notifications/indications
                peripheral.setNotifyValue(false, for: cbCharacteristic)
                print("BLEManager: Disabled monitoring for characteristic \(charUUID.uuidString)")
            }
        }

        semaphore.wait()

        if let error = asyncError {
            throw error
        }
    }

    // MARK: - RSSI Reading

    /// Reads the RSSI (signal strength) for a connected peripheral
    /// - Parameters:
    ///   - deviceId: The UUID string of the connected peripheral
    ///   - completion: Called with Result containing Int32 RSSI value on success or Error on failure
    /// - Note: Completion is called on the background queue
    public func readRSSI(deviceId: String, completion: @escaping (Result<Int32, Error>) -> Void) {
        queue.async { [weak self] in
            guard let self = self else {
                completion(.failure(BLEError(
                    code: .errorBluetoothManagerDestroyed,
                    message: "BLEManager deallocated"
                )))
                return
            }

            // Parse device UUID
            guard let uuid = UUID(uuidString: deviceId) else {
                completion(.failure(BLEError(
                    code: .errorInvalidIdentifiers,
                    message: "Invalid device ID: \(deviceId)"
                )))
                return
            }

            // Verify peripheral is connected
            guard let peripheral = self.connectedPeripherals[uuid] else {
                completion(.failure(BLEError(
                    code: .errorDeviceNotConnected,
                    message: "Device \(deviceId) is not connected"
                )))
                return
            }

            // Store completion handler
            self.pendingRSSIReads[uuid] = completion

            // Create timeout work item (10 seconds for RSSI read)
            let timeoutWork = DispatchWorkItem { [weak self] in
                guard let self = self else { return }

                // Check if RSSI read is still pending
                if let completion = self.pendingRSSIReads.removeValue(forKey: uuid) {
                    let error = BLEError(
                        code: .errorDeviceRssiReadFailed,
                        message: "RSSI read timeout after 10 seconds for device \(deviceId)"
                    )
                    completion(.failure(error))
                    print("BLEManager: RSSI read timeout for device \(deviceId)")
                }
            }

            // Store timeout work item
            self.rssiTimeouts[uuid] = timeoutWork

            // Schedule timeout on background queue
            self.queue.asyncAfter(deadline: .now() + 10, execute: timeoutWork)

            // Initiate RSSI read
            peripheral.readRSSI()
            print("BLEManager: Reading RSSI for device \(deviceId) (10s timeout)")
        }
    }

    // MARK: - Private Helpers

    /// Maps CoreBluetooth CBManagerState to protobuf ManagerState
    private func mapState(_ state: CBManagerState) -> Bleproxy_V1_ManagerState {
        switch state {
        case .unknown:
            return .unknown
        case .resetting:
            return .resetting
        case .unsupported:
            return .unsupported
        case .unauthorized:
            return .unauthorized
        case .poweredOff:
            return .poweredOff
        case .poweredOn:
            return .poweredOn
        @unknown default:
            return .unknown
        }
    }

    /// Converts CBCharacteristicProperties to an array of property strings
    /// - Parameter properties: CoreBluetooth characteristic properties
    /// - Returns: Array of property names matching react-native-ble-plx conventions
    private func convertProperties(_ properties: CBCharacteristicProperties) -> [String] {
        var result: [String] = []

        if properties.contains(.broadcast) {
            result.append("broadcast")
        }
        if properties.contains(.read) {
            result.append("read")
        }
        if properties.contains(.writeWithoutResponse) {
            result.append("writeWithoutResponse")
        }
        if properties.contains(.write) {
            result.append("write")
        }
        if properties.contains(.notify) {
            result.append("notify")
        }
        if properties.contains(.indicate) {
            result.append("indicate")
        }
        if properties.contains(.authenticatedSignedWrites) {
            result.append("authenticatedSignedWrites")
        }
        if properties.contains(.extendedProperties) {
            result.append("extendedProperties")
        }

        return result
    }

    /// Converts a CBCharacteristic to a protobuf Characteristic message
    /// - Parameter characteristic: CoreBluetooth characteristic
    /// - Returns: Populated Bleproxy_V1_Characteristic instance
    private func convertToProtoCharacteristic(_ characteristic: CBCharacteristic) -> Bleproxy_V1_Characteristic {
        var proto = Bleproxy_V1_Characteristic()
        proto.uuid = characteristic.uuid.uuidString
        proto.properties = convertProperties(characteristic.properties)

        // Include value if it has been read
        if let value = characteristic.value {
            proto.value = value
        }

        // Note: Descriptors are not included in this implementation (Step 4)
        // They will be added in a future step if needed

        return proto
    }

    /// Converts a CBService to a protobuf Service message
    /// - Parameter service: CoreBluetooth service
    /// - Returns: Populated Bleproxy_V1_Service instance
    private func convertToProtoService(_ service: CBService) -> Bleproxy_V1_Service {
        var proto = Bleproxy_V1_Service()
        proto.uuid = service.uuid.uuidString
        proto.isPrimary = service.isPrimary

        // Convert characteristics if they have been discovered
        if let characteristics = service.characteristics {
            proto.characteristics = characteristics.map { convertToProtoCharacteristic($0) }
        }

        return proto
    }

    /// Converts a discovered peripheral and its advertisement data to a Device protobuf message
    /// - Parameters:
    ///   - peripheral: The discovered CBPeripheral
    ///   - advertisementData: Advertisement data dictionary from CoreBluetooth
    ///   - rssi: Signal strength in dBm
    /// - Returns: Populated Bleproxy_V1_Device instance
    private func createDevice(
        from peripheral: CBPeripheral,
        advertisementData: [String: Any],
        rssi: NSNumber
    ) -> Bleproxy_V1_Device {
        var device = Bleproxy_V1_Device()

        // Required field: Device identifier (stable UUID)
        device.id = peripheral.identifier.uuidString

        // Required field: RSSI (signal strength)
        device.rssi = rssi.int32Value

        // Optional: Local name from advertisement
        if let name = advertisementData[CBAdvertisementDataLocalNameKey] as? String {
            device.name = name
        }

        // Optional: Service UUIDs
        if let serviceUUIDs = advertisementData[CBAdvertisementDataServiceUUIDsKey] as? [CBUUID] {
            device.serviceUuids = serviceUUIDs.map { $0.uuidString }
        }

        // Optional: Manufacturer data
        if let manufacturerData = advertisementData[CBAdvertisementDataManufacturerDataKey] as? Data {
            device.manufacturerData = manufacturerData
        }

        // Optional: Service data (map of service UUID to data)
        if let serviceData = advertisementData[CBAdvertisementDataServiceDataKey] as? [CBUUID: Data] {
            device.serviceData = Dictionary(
                uniqueKeysWithValues: serviceData.map { (key, value) in
                    (key.uuidString, value)
                }
            )
        }

        // Optional: TX power level
        if let txPower = advertisementData[CBAdvertisementDataTxPowerLevelKey] as? NSNumber {
            device.txPowerLevel = txPower.int32Value
        }

        // Optional: Is connectable flag
        if let isConnectable = advertisementData[CBAdvertisementDataIsConnectable] as? NSNumber {
            device.isConnectable = isConnectable.boolValue
        }

        // Optional: Solicited service UUIDs
        if let solicitedUUIDs = advertisementData[CBAdvertisementDataSolicitedServiceUUIDsKey] as? [CBUUID] {
            device.solicitedServiceUuids = solicitedUUIDs.map { $0.uuidString }
        }

        // Optional: Overflow service UUIDs
        if let overflowUUIDs = advertisementData[CBAdvertisementDataOverflowServiceUUIDsKey] as? [CBUUID] {
            device.overflowServiceUuids = overflowUUIDs.map { $0.uuidString }
        }

        return device
    }
}

// MARK: - CBCentralManagerDelegate

extension BLEManager: CBCentralManagerDelegate {

    /// Called when the central manager's state changes
    /// This is called on initialization and whenever Bluetooth state changes
    public func centralManagerDidUpdateState(_ central: CBCentralManager) {
        let state = mapState(central.state)
        print("BLEManager: State changed to \(state)")

        // Notify state callback on the same queue (background)
        stateCallback?(state)
    }

    /// Called when a peripheral is discovered during scanning
    /// - Parameters:
    ///   - central: The central manager
    ///   - peripheral: The discovered peripheral
    ///   - advertisementData: Advertisement data from the peripheral
    ///   - RSSI: Signal strength in dBm
    public func centralManager(
        _ central: CBCentralManager,
        didDiscover peripheral: CBPeripheral,
        advertisementData: [String: Any],
        rssi RSSI: NSNumber
    ) {
        // Store peripheral reference to prevent deallocation
        // Use UUID as key for stable identification
        discoveredPeripherals[peripheral.identifier] = peripheral

        // Convert to protobuf Device message
        let device = createDevice(
            from: peripheral,
            advertisementData: advertisementData,
            rssi: RSSI
        )

        // Invoke all scan callbacks with discovered device (Step 10)
        for (_, callback) in scanCallbacks {
            callback(device)
        }
    }

    /// Called when a peripheral successfully connects
    public func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        let uuid = peripheral.identifier
        print("BLEManager: Connected to \(uuid.uuidString)")

        // Cancel connection timeout
        if let timeoutWork = connectionTimeouts.removeValue(forKey: uuid) {
            timeoutWork.cancel()
        }

        // Move peripheral to connected storage
        connectedPeripherals[uuid] = peripheral

        // Invoke completion handler if pending
        if let completion = pendingConnections.removeValue(forKey: uuid) {
            completion(.success(()))
        }

        // Invoke global connection callback (Step 10)
        connectionCallback?(uuid, true, nil)
    }

    /// Called when a peripheral fails to connect
    public func centralManager(
        _ central: CBCentralManager,
        didFailToConnect peripheral: CBPeripheral,
        error: Error?
    ) {
        let uuid = peripheral.identifier
        print("BLEManager: Failed to connect to \(uuid.uuidString): \(error?.localizedDescription ?? "unknown error")")

        // Cancel connection timeout
        if let timeoutWork = connectionTimeouts.removeValue(forKey: uuid) {
            timeoutWork.cancel()
        }

        // Invoke completion handler with error
        if let completion = pendingConnections.removeValue(forKey: uuid) {
            let bleError = BLEError(
                code: .errorDeviceConnectionFailed,
                message: error?.localizedDescription ?? "Connection failed"
            )
            completion(.failure(bleError))
        }

        // Invoke global connection callback (Step 10) - failed connection
        connectionCallback?(uuid, false, error)
    }

    /// Called when a peripheral disconnects
    public func centralManager(
        _ central: CBCentralManager,
        didDisconnectPeripheral peripheral: CBPeripheral,
        error: Error?
    ) {
        let uuid = peripheral.identifier
        print("BLEManager: Disconnected from \(uuid.uuidString)")

        // Remove from connected peripherals
        connectedPeripherals.removeValue(forKey: uuid)

        // Clean up any pending operations
        pendingDiscoveries.removeValue(forKey: uuid)
        pendingCharacteristics.removeValue(forKey: uuid)

        // Clean up cached services (Step 5)
        cachedServices.removeValue(forKey: uuid)

        // Clean up any pending reads and their timeouts (Step 5)
        for (key, timeoutWork) in readTimeouts where key.deviceId == uuid {
            timeoutWork.cancel()
            readTimeouts.removeValue(forKey: key)
        }
        for (key, completion) in pendingReads where key.deviceId == uuid {
            let error = BLEError(
                code: .errorDeviceDisconnected,
                message: "Device disconnected during read operation"
            )
            completion(.failure(error))
            pendingReads.removeValue(forKey: key)
        }

        // Clean up any pending writes and their timeouts (Step 6)
        for (key, timeoutWork) in writeTimeouts where key.deviceId == uuid {
            timeoutWork.cancel()
            writeTimeouts.removeValue(forKey: key)
        }
        for (key, completion) in pendingWrites where key.deviceId == uuid {
            let error = BLEError(
                code: .errorDeviceDisconnected,
                message: "Device disconnected during write operation"
            )
            completion(.failure(error))
            pendingWrites.removeValue(forKey: key)
        }

        // Clean up active monitors (Step 6)
        for (key, _) in activeMonitors where key.deviceId == uuid {
            activeMonitors.removeValue(forKey: key)
        }

        // Clean up any pending RSSI reads and their timeouts (Step 7)
        if let timeoutWork = rssiTimeouts.removeValue(forKey: uuid) {
            timeoutWork.cancel()
        }
        if let completion = pendingRSSIReads.removeValue(forKey: uuid) {
            let error = BLEError(
                code: .errorDeviceDisconnected,
                message: "Device disconnected during RSSI read"
            )
            completion(.failure(error))
        }

        // Clean up any pending connection timeout (shouldn't happen, but defensive)
        if let timeoutWork = connectionTimeouts.removeValue(forKey: uuid) {
            timeoutWork.cancel()
        }

        // Invoke global connection callback (Step 10) - disconnection
        connectionCallback?(uuid, false, error)

        // Note: We don't call pendingConnections here because disconnect is
        // initiated by the app, not a failure. The completion is already called
        // in the disconnect() method.
    }
}

// MARK: - CBPeripheralDelegate

extension BLEManager: CBPeripheralDelegate {

    /// Called when services are discovered
    public func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
        let uuid = peripheral.identifier

        if let error = error {
            print("BLEManager: Service discovery failed for \(uuid.uuidString): \(error.localizedDescription)")

            // Call completion with error
            if let completion = pendingDiscoveries.removeValue(forKey: uuid) {
                let bleError = BLEError(
                    code: .errorServicesDiscoveryFailed,
                    message: error.localizedDescription
                )
                completion(.failure(bleError))
            }

            // Clean up tracking
            pendingCharacteristics.removeValue(forKey: uuid)
            return
        }

        guard let services = peripheral.services, !services.isEmpty else {
            print("BLEManager: No services found for \(uuid.uuidString)")

            // Call completion with empty array
            if let completion = pendingDiscoveries.removeValue(forKey: uuid) {
                completion(.success([]))
            }
            return
        }

        print("BLEManager: Discovered \(services.count) services for \(uuid.uuidString)")

        // Initialize tracking for characteristic discovery
        // We need to wait for all services to have their characteristics discovered
        var pendingServices = Set<CBUUID>()
        for service in services {
            pendingServices.insert(service.uuid)
        }
        pendingCharacteristics[uuid] = pendingServices

        // Start discovering characteristics for each service
        for service in services {
            peripheral.discoverCharacteristics(nil, for: service)
        }
    }

    /// Called when characteristics are discovered for a service
    public func peripheral(
        _ peripheral: CBPeripheral,
        didDiscoverCharacteristicsFor service: CBService,
        error: Error?
    ) {
        let uuid = peripheral.identifier

        if let error = error {
            print("BLEManager: Characteristic discovery failed for service \(service.uuid) on \(uuid.uuidString): \(error.localizedDescription)")

            // Call completion with error
            if let completion = pendingDiscoveries.removeValue(forKey: uuid) {
                let bleError = BLEError(
                    code: .errorCharacteristicsDiscoveryFailed,
                    message: error.localizedDescription
                )
                completion(.failure(bleError))
            }

            // Clean up tracking
            pendingCharacteristics.removeValue(forKey: uuid)
            return
        }

        print("BLEManager: Discovered \(service.characteristics?.count ?? 0) characteristics for service \(service.uuid)")

        // Mark this service as complete
        if var pending = pendingCharacteristics[uuid] {
            pending.remove(service.uuid)
            pendingCharacteristics[uuid] = pending

            // Check if all services have completed characteristic discovery
            if pending.isEmpty {
                print("BLEManager: All characteristics discovered for \(uuid.uuidString)")

                // Clean up tracking
                pendingCharacteristics.removeValue(forKey: uuid)

                // Convert all services to protobuf and call completion
                if let completion = pendingDiscoveries.removeValue(forKey: uuid) {
                    guard let services = peripheral.services else {
                        completion(.success([]))
                        return
                    }

                    let protoServices = services.map { convertToProtoService($0) }

                    // Cache services for future read/write operations (Step 5)
                    cachedServices[uuid] = protoServices

                    completion(.success(protoServices))
                }
            }
        }
    }

    /// Called when a characteristic value is updated (read or notification)
    public func peripheral(
        _ peripheral: CBPeripheral,
        didUpdateValueFor characteristic: CBCharacteristic,
        error: Error?
    ) {
        let uuid = peripheral.identifier

        // Create key to lookup pending read
        let key = CharacteristicKey(
            deviceId: uuid,
            serviceUUID: characteristic.service?.uuid ?? CBUUID(string: "00000000-0000-0000-0000-000000000000"),
            characteristicUUID: characteristic.uuid
        )

        // Check if this is a pending read operation FIRST (Step 5)
        if let completion = pendingReads.removeValue(forKey: key) {
            // Cancel timeout
            if let timeoutWork = readTimeouts.removeValue(forKey: key) {
                timeoutWork.cancel()
            }

            // Handle read result
            if let error = error {
                print("BLEManager: Read failed for characteristic \(characteristic.uuid.uuidString): \(error.localizedDescription)")
                let bleError = BLEError(
                    code: .errorCharacteristicReadFailed,
                    message: error.localizedDescription
                )
                completion(.failure(bleError))
            } else {
                // Return value (or empty Data if nil)
                let value = characteristic.value ?? Data()
                print("BLEManager: Read \(value.count) bytes from characteristic \(characteristic.uuid.uuidString)")
                completion(.success(value))
            }
            return  // CRITICAL: Early return to prevent handling as notification
        }

        // Check if this is an active monitor (Step 6)
        if let callback = activeMonitors[key] {
            if let error = error {
                print("BLEManager: Notification error for characteristic \(characteristic.uuid.uuidString): \(error.localizedDescription)")
                // Note: We don't remove the monitor on error - peripheral might recover
            } else {
                let value = characteristic.value ?? Data()
                print("BLEManager: Received notification (\(value.count) bytes) for characteristic \(characteristic.uuid.uuidString)")
                callback(value)

                // Also invoke global notification callback (Step 10)
                if let serviceUUID = characteristic.service?.uuid {
                    notificationCallback?(uuid, serviceUUID, characteristic.uuid, value)
                }
            }
        }
    }

    /// Called when a write operation completes (only for writes with response)
    public func peripheral(
        _ peripheral: CBPeripheral,
        didWriteValueFor characteristic: CBCharacteristic,
        error: Error?
    ) {
        let uuid = peripheral.identifier

        // Create key to lookup pending write
        let key = CharacteristicKey(
            deviceId: uuid,
            serviceUUID: characteristic.service?.uuid ?? CBUUID(string: "00000000-0000-0000-0000-000000000000"),
            characteristicUUID: characteristic.uuid
        )

        // Check if this is a pending write operation
        guard let completion = pendingWrites.removeValue(forKey: key) else {
            print("BLEManager: Received write confirmation for characteristic \(characteristic.uuid.uuidString) (not a pending write)")
            return
        }

        // Cancel timeout
        if let timeoutWork = writeTimeouts.removeValue(forKey: key) {
            timeoutWork.cancel()
        }

        // Handle write result
        if let error = error {
            print("BLEManager: Write failed for characteristic \(characteristic.uuid.uuidString): \(error.localizedDescription)")
            let bleError = BLEError(
                code: .errorCharacteristicWriteFailed,
                message: error.localizedDescription
            )
            completion(.failure(bleError))
        } else {
            print("BLEManager: Write confirmed for characteristic \(characteristic.uuid.uuidString)")
            completion(.success(()))
        }
    }

    /// Called when the notification state changes for a characteristic
    public func peripheral(
        _ peripheral: CBPeripheral,
        didUpdateNotificationStateFor characteristic: CBCharacteristic,
        error: Error?
    ) {
        if let error = error {
            print("BLEManager: Failed to update notification state for characteristic \(characteristic.uuid.uuidString): \(error.localizedDescription)")
        } else {
            let state = characteristic.isNotifying ? "enabled" : "disabled"
            print("BLEManager: Notification state \(state) for characteristic \(characteristic.uuid.uuidString)")
        }
    }

    /// Called when RSSI is read from a peripheral
    public func peripheral(_ peripheral: CBPeripheral, didReadRSSI RSSI: NSNumber, error: Error?) {
        let uuid = peripheral.identifier

        // Check if this is a pending RSSI read
        guard let completion = pendingRSSIReads.removeValue(forKey: uuid) else {
            print("BLEManager: Received RSSI for \(uuid.uuidString) (not a pending read)")
            return
        }

        // Cancel timeout
        if let timeoutWork = rssiTimeouts.removeValue(forKey: uuid) {
            timeoutWork.cancel()
        }

        // Handle RSSI result
        if let error = error {
            print("BLEManager: RSSI read failed for \(uuid.uuidString): \(error.localizedDescription)")
            let bleError = BLEError(
                code: .errorDeviceRssiReadFailed,
                message: error.localizedDescription
            )
            completion(.failure(bleError))
        } else {
            // Convert NSNumber to Int32 for protobuf compatibility
            let rssiValue = RSSI.int32Value
            print("BLEManager: RSSI read successful for \(uuid.uuidString): \(rssiValue) dBm")
            completion(.success(rssiValue))
        }
    }
}

// MARK: - CharacteristicKey

/// Unique key for tracking pending characteristic operations
/// Combines device UUID, service UUID, and characteristic UUID for unique identification
struct CharacteristicKey: Hashable {
    let deviceId: UUID
    let serviceUUID: CBUUID
    let characteristicUUID: CBUUID
}
