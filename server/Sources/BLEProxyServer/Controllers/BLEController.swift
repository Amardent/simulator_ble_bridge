import Vapor
import SwiftProtobuf
import Generated
import BLEProxy
import CoreBluetooth

/// BLEController implements all BLE operation HTTP endpoints
/// Uses singleton pattern - BLEManager is already thread-safe via queue
final class BLEController {
    static let shared = BLEController()
    private let bleManager: BLEManager

    private init() {
        self.bleManager = BLEManager()
    }

    // MARK: - State Endpoint

    /// GET /v1/state - Query Bluetooth adapter state
    func state(_ req: Request) async throws -> Response {
        req.logger.info("POST /v1/state")

        // Decode request (empty but validates protobuf format)
        _ = try req.decodeProto(Bleproxy_V1_StateRequest.self)

        // Get current state (synchronous operation)
        var response = Bleproxy_V1_StateResponse()
        response.state = bleManager.getState()

        req.logger.info("Bluetooth state: \(response.state)")
        return try Response.proto(response)
    }

    // MARK: - Scan Endpoints

    /// POST /v1/scan/start - Start scanning for peripherals
    func startScan(_ req: Request) async throws -> Response {
        req.logger.info("POST /v1/scan/start")

        let request = try req.decodeProto(Bleproxy_V1_StartScanRequest.self)
        req.logger.info("Starting scan with \(request.serviceUuids.count) service filters")

        var response = Bleproxy_V1_StartScanResponse()

        // Convert service UUID strings to CBUUID array
        let serviceUUIDs: [CBUUID]? = request.serviceUuids.isEmpty ? nil : request.serviceUuids.map { CBUUID(string: $0) }

        // Start scanning - results are delivered via WebSocket callbacks registered at startup
        bleManager.startScan(serviceUUIDs: serviceUUIDs)

        response.success = true
        req.logger.info("Scan started successfully")
        return try Response.proto(response)
    }

    /// POST /v1/scan/stop - Stop scanning
    func stopScan(_ req: Request) async throws -> Response {
        req.logger.info("POST /v1/scan/stop")

        // Decode request (empty but validates protobuf format)
        _ = try req.decodeProto(Bleproxy_V1_StopScanRequest.self)

        // Stop scanning
        bleManager.stopScan()

        var response = Bleproxy_V1_StopScanResponse()
        response.success = true

        req.logger.info("Scan stopped successfully")
        return try Response.proto(response)
    }

    // MARK: - Connection Endpoints

    /// POST /v1/device/connect - Connect to a device
    func connect(_ req: Request) async throws -> Response {
        req.logger.info("POST /v1/device/connect")

        let request = try req.decodeProto(Bleproxy_V1_ConnectRequest.self)
        let deviceId = request.deviceID
        req.logger.info("Connecting to device: \(deviceId)")

        // Validate UUID format
        guard UUID(uuidString: deviceId) != nil else {
            req.logger.error("Invalid device UUID: \(deviceId)")
            return try Response.error(BLEError(
                code: .errorInvalidIdentifiers,
                message: "Invalid device UUID: \(deviceId)"
            ))
        }

        // Use continuation to bridge callback to async/await
        let response = try await withCheckedThrowingContinuation { continuation in
            bleManager.connect(deviceId: deviceId) { result in
                var response = Bleproxy_V1_ConnectResponse()

                switch result {
                case .success:
                    response.success = true
                    req.logger.info("Device connected: \(deviceId)")

                case .failure(let error):
                    response.success = false
                    response.error = (error as? BLEError)?.toProto() ??
                        BLEError(code: .errorServerError, message: error.localizedDescription).toProto()
                    req.logger.error("Connection failed: \(error.localizedDescription)")
                }

                continuation.resume(returning: response)
            }
        }

        // Populate device field after connection succeeds (outside callback to avoid deadlock)
        if response.success, let device = bleManager.getConnectedDevice(deviceId: deviceId) {
            var updatedResponse = response
            updatedResponse.device = device
            return try Response.proto(updatedResponse)
        }

        return try Response.proto(response)
    }

    /// POST /v1/device/disconnect - Disconnect from a device
    func disconnect(_ req: Request) async throws -> Response {
        req.logger.info("POST /v1/device/disconnect")

        let request = try req.decodeProto(Bleproxy_V1_DisconnectRequest.self)
        let deviceId = request.deviceID
        req.logger.info("Disconnecting from device: \(deviceId)")

        // Validate UUID format
        guard UUID(uuidString: deviceId) != nil else {
            req.logger.error("Invalid device UUID: \(deviceId)")
            return try Response.error(BLEError(
                code: .errorInvalidIdentifiers,
                message: "Invalid device UUID: \(deviceId)"
            ))
        }

        return try await withCheckedThrowingContinuation { continuation in
            bleManager.disconnect(deviceId: deviceId) { result in
                var response = Bleproxy_V1_DisconnectResponse()

                switch result {
                case .success:
                    response.success = true
                    req.logger.info("Device disconnected: \(deviceId)")

                case .failure(let error):
                    response.success = false
                    response.error = (error as? BLEError)?.toProto() ??
                        BLEError(code: .errorServerError, message: error.localizedDescription).toProto()
                    req.logger.error("Disconnection failed: \(error.localizedDescription)")
                }

                do {
                    continuation.resume(returning: try Response.proto(response))
                } catch {
                    continuation.resume(throwing: error)
                }
            }
        }
    }

    /// POST /v1/device/isconnected - Check if device is connected
    func isConnected(_ req: Request) async throws -> Response {
        req.logger.info("POST /v1/device/isconnected")

        let request = try req.decodeProto(Bleproxy_V1_IsConnectedRequest.self)
        let deviceId = request.deviceID
        req.logger.info("Checking connection status for device: \(deviceId)")

        // Validate UUID format
        guard UUID(uuidString: deviceId) != nil else {
            req.logger.error("Invalid device UUID: \(deviceId)")
            return try Response.error(BLEError(
                code: .errorInvalidIdentifiers,
                message: "Invalid device UUID: \(deviceId)"
            ))
        }

        // Check connection status (synchronous operation)
        var response = Bleproxy_V1_IsConnectedResponse()
        response.isConnected = bleManager.isConnected(deviceId: deviceId)

        req.logger.info("Device \(deviceId) connected: \(response.isConnected)")
        return try Response.proto(response)
    }

    // MARK: - Discovery Endpoints

    /// POST /v1/device/discover - Discover services and characteristics
    func discover(_ req: Request) async throws -> Response {
        req.logger.info("POST /v1/device/discover")

        let request = try req.decodeProto(Bleproxy_V1_DiscoverRequest.self)
        let deviceId = request.deviceID
        req.logger.info("Discovering services for device: \(deviceId)")

        // Validate UUID format
        guard UUID(uuidString: deviceId) != nil else {
            req.logger.error("Invalid device UUID: \(deviceId)")
            return try Response.error(BLEError(
                code: .errorInvalidIdentifiers,
                message: "Invalid device UUID: \(deviceId)"
            ))
        }

        return try await withCheckedThrowingContinuation { continuation in
            bleManager.discoverServices(deviceId: deviceId) { result in
                var response = Bleproxy_V1_DiscoverResponse()

                switch result {
                case .success(let services):
                    response.services = services
                    req.logger.info("Discovered \(services.count) services for device: \(deviceId)")

                case .failure(let error):
                    response.error = (error as? BLEError)?.toProto() ??
                        BLEError(code: .errorServerError, message: error.localizedDescription).toProto()
                    req.logger.error("Discovery failed: \(error.localizedDescription)")
                }

                do {
                    continuation.resume(returning: try Response.proto(response))
                } catch {
                    continuation.resume(throwing: error)
                }
            }
        }
    }

    /// POST /v1/device/services - Get cached services
    func services(_ req: Request) async throws -> Response {
        req.logger.info("POST /v1/device/services")

        let request = try req.decodeProto(Bleproxy_V1_ServicesRequest.self)
        let deviceId = request.deviceID
        req.logger.info("Getting cached services for device: \(deviceId)")

        // Validate UUID format
        guard UUID(uuidString: deviceId) != nil else {
            req.logger.error("Invalid device UUID: \(deviceId)")
            return try Response.error(BLEError(
                code: .errorInvalidIdentifiers,
                message: "Invalid device UUID: \(deviceId)"
            ))
        }

        // Note: BLEManager doesn't expose cached services directly
        // We need to call discoverServices to get them
        // This is a limitation we'll accept for v1 - clients should use discover endpoint
        return try Response.error(BLEError(
            code: .errorServicesNotDiscovered,
            message: "Use /v1/device/discover endpoint to get services"
        ))
    }

    /// POST /v1/device/characteristics - Get characteristics for a service
    func characteristics(_ req: Request) async throws -> Response {
        req.logger.info("POST /v1/device/characteristics")

        let request = try req.decodeProto(Bleproxy_V1_CharacteristicsRequest.self)
        let deviceId = request.deviceID
        let serviceUUID = request.serviceUuid
        req.logger.info("Getting characteristics for service \(serviceUUID) on device: \(deviceId)")

        // Validate UUID format
        guard UUID(uuidString: deviceId) != nil else {
            req.logger.error("Invalid device UUID: \(deviceId)")
            return try Response.error(BLEError(
                code: .errorInvalidIdentifiers,
                message: "Invalid device UUID: \(deviceId)"
            ))
        }

        // Note: BLEManager doesn't expose cached characteristics directly
        // We need to call discoverServices to get them
        // This is a limitation we'll accept for v1 - clients should use discover endpoint
        return try Response.error(BLEError(
            code: .errorCharacteristicsNotDiscovered,
            message: "Use /v1/device/discover endpoint to get characteristics"
        ))
    }

    // MARK: - Read/Write Endpoints

    /// POST /v1/device/read - Read characteristic value
    func read(_ req: Request) async throws -> Response {
        req.logger.info("POST /v1/device/read")

        let request = try req.decodeProto(Bleproxy_V1_ReadRequest.self)
        let deviceId = request.deviceID
        let serviceUUID = request.serviceUuid
        let characteristicUUID = request.characteristicUuid
        req.logger.info("Reading characteristic \(characteristicUUID) from service \(serviceUUID) on device: \(deviceId)")

        // Validate UUID format
        guard UUID(uuidString: deviceId) != nil else {
            req.logger.error("Invalid device UUID: \(deviceId)")
            return try Response.error(BLEError(
                code: .errorInvalidIdentifiers,
                message: "Invalid device UUID: \(deviceId)"
            ))
        }

        return try await withCheckedThrowingContinuation { continuation in
            bleManager.readCharacteristic(
                deviceId: deviceId,
                serviceUUID: serviceUUID,
                characteristicUUID: characteristicUUID
            ) { result in
                var response = Bleproxy_V1_ReadResponse()

                switch result {
                case .success(let data):
                    response.value = data
                    req.logger.info("Read \(data.count) bytes from characteristic \(characteristicUUID)")

                case .failure(let error):
                    response.error = (error as? BLEError)?.toProto() ??
                        BLEError(code: .errorServerError, message: error.localizedDescription).toProto()
                    req.logger.error("Read failed: \(error.localizedDescription)")
                }

                do {
                    continuation.resume(returning: try Response.proto(response))
                } catch {
                    continuation.resume(throwing: error)
                }
            }
        }
    }

    /// POST /v1/device/write - Write characteristic value
    func write(_ req: Request) async throws -> Response {
        req.logger.info("POST /v1/device/write")

        let request = try req.decodeProto(Bleproxy_V1_WriteRequest.self)
        let deviceId = request.deviceID
        let serviceUUID = request.serviceUuid
        let characteristicUUID = request.characteristicUuid
        let value = request.value
        let withResponse = request.withResponse
        req.logger.info("Writing \(value.count) bytes to characteristic \(characteristicUUID) on service \(serviceUUID) (withResponse: \(withResponse))")

        // Validate UUID format
        guard UUID(uuidString: deviceId) != nil else {
            req.logger.error("Invalid device UUID: \(deviceId)")
            return try Response.error(BLEError(
                code: .errorInvalidIdentifiers,
                message: "Invalid device UUID: \(deviceId)"
            ))
        }

        return try await withCheckedThrowingContinuation { continuation in
            bleManager.writeCharacteristic(
                deviceId: deviceId,
                serviceUUID: serviceUUID,
                characteristicUUID: characteristicUUID,
                value: value,
                withResponse: withResponse
            ) { result in
                var response = Bleproxy_V1_WriteResponse()

                switch result {
                case .success:
                    response.success = true
                    req.logger.info("Write successful to characteristic \(characteristicUUID)")

                case .failure(let error):
                    response.success = false
                    response.error = (error as? BLEError)?.toProto() ??
                        BLEError(code: .errorServerError, message: error.localizedDescription).toProto()
                    req.logger.error("Write failed: \(error.localizedDescription)")
                }

                do {
                    continuation.resume(returning: try Response.proto(response))
                } catch {
                    continuation.resume(throwing: error)
                }
            }
        }
    }

    /// POST /v1/device/monitor - Enable/disable characteristic notifications
    func monitor(_ req: Request) async throws -> Response {
        req.logger.info("POST /v1/device/monitor")

        let request = try req.decodeProto(Bleproxy_V1_MonitorRequest.self)
        let deviceId = request.deviceID
        let serviceUUID = request.serviceUuid
        let characteristicUUID = request.characteristicUuid
        let enable = request.enable
        req.logger.info("\(enable ? "Enabling" : "Disabling") monitoring for characteristic \(characteristicUUID) on service \(serviceUUID)")

        // Validate UUID format
        guard UUID(uuidString: deviceId) != nil else {
            req.logger.error("Invalid device UUID: \(deviceId)")
            return try Response.error(BLEError(
                code: .errorInvalidIdentifiers,
                message: "Invalid device UUID: \(deviceId)"
            ))
        }

        var response = Bleproxy_V1_MonitorResponse()

        do {
            // Set up monitoring (notifications will be sent via WebSocket in Step 10)
            try bleManager.monitorCharacteristic(
                deviceId: deviceId,
                serviceUUID: serviceUUID,
                characteristicUUID: characteristicUUID,
                enable: enable,
                callback: enable ? { data in
                    // Notification callback will be used in Step 10 for WebSocket events
                    // For now, just log notifications
                    req.logger.debug("Received notification (\(data.count) bytes) for characteristic \(characteristicUUID)")
                } : nil
            )

            response.success = true
            req.logger.info("Monitoring \(enable ? "enabled" : "disabled") for characteristic \(characteristicUUID)")

        } catch let error as BLEError {
            response.success = false
            response.error = error.toProto()
            req.logger.error("Monitor operation failed: \(error.localizedDescription)")

        } catch {
            response.success = false
            response.error = BLEError(code: .errorServerError, message: error.localizedDescription).toProto()
            req.logger.error("Monitor operation failed: \(error.localizedDescription)")
        }

        return try Response.proto(response)
    }

    // MARK: - RSSI Endpoint

    /// POST /v1/device/rssi - Read RSSI (signal strength)
    func readRSSI(_ req: Request) async throws -> Response {
        req.logger.info("POST /v1/device/rssi")

        let request = try req.decodeProto(Bleproxy_V1_RSSIRequest.self)
        let deviceId = request.deviceID
        req.logger.info("Reading RSSI for device: \(deviceId)")

        // Validate UUID format
        guard UUID(uuidString: deviceId) != nil else {
            req.logger.error("Invalid device UUID: \(deviceId)")
            return try Response.error(BLEError(
                code: .errorInvalidIdentifiers,
                message: "Invalid device UUID: \(deviceId)"
            ))
        }

        return try await withCheckedThrowingContinuation { continuation in
            bleManager.readRSSI(deviceId: deviceId) { result in
                var response = Bleproxy_V1_RSSIResponse()

                switch result {
                case .success(let rssi):
                    response.rssi = rssi
                    req.logger.info("RSSI read successful: \(rssi) dBm")

                case .failure(let error):
                    response.error = (error as? BLEError)?.toProto() ??
                        BLEError(code: .errorServerError, message: error.localizedDescription).toProto()
                    req.logger.error("RSSI read failed: \(error.localizedDescription)")
                }

                do {
                    continuation.resume(returning: try Response.proto(response))
                } catch {
                    continuation.resume(throwing: error)
                }
            }
        }
    }

    // MARK: - WebSocket Support (Step 10)

    private var connectedWebSockets: [WebSocket] = []
    private let wsQueue = DispatchQueue(label: "com.bleproxy.websockets")
    private var bleCallbacksRegistered = false

    func handleWebSocket(_ req: Request, _ ws: WebSocket) {
        let logger = req.logger
        logger.info("WebSocket connected")

        // Add to connected clients (synchronized)
        wsQueue.sync {
            connectedWebSockets.append(ws)
            logger.info("Active WebSocket clients: \(connectedWebSockets.count)")
        }

        // Register BLE callbacks once
        var shouldSetup = false
        wsQueue.sync {
            if !bleCallbacksRegistered {
                bleCallbacksRegistered = true
                shouldSetup = true
            }
        }
        if shouldSetup {
            setupBLECallbacks(logger: logger)
        }

        // Send initial state after a brief delay to ensure connection is fully established
        DispatchQueue.global().asyncAfter(deadline: .now() + 0.1) { [weak self] in
            self?.sendInitialState(to: ws, logger: logger)
        }

        // Handle close
        ws.onClose.whenComplete { [weak self] _ in
            guard let self = self else { return }
            self.wsQueue.async {
                self.connectedWebSockets.removeAll { $0 === ws }
                logger.info("WebSocket disconnected, \(self.connectedWebSockets.count) remaining")
            }
        }

        // Ignore text frames
        ws.onText { ws, text in
            logger.warning("Unexpected text frame received: \(text)")
        }
    }

    private func sendInitialState(to ws: WebSocket, logger: Logger) {
        var stateEvent = Bleproxy_V1_ManagerStateEvent()
        stateEvent.state = bleManager.getState()
        stateEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

        var wsEvent = Bleproxy_V1_WsEvent()
        wsEvent.managerStateEvent = stateEvent

        do {
            let data = try wsEvent.serializedData()
            ws.send([UInt8](data))
            logger.debug("Sent initial ManagerStateEvent: \(stateEvent.state)")
        } catch {
            logger.error("Failed to send initial state: \(error)")
        }
    }

    private func broadcast(_ event: Bleproxy_V1_WsEvent, logger: Logger) {
        do {
            let data = try event.serializedData()

            wsQueue.async { [weak self] in
                guard let self = self else { return }

                // Remove closed sockets and send to active ones
                self.connectedWebSockets.removeAll { ws in
                    if ws.isClosed { return true }
                    ws.send([UInt8](data))
                    return false
                }

                logger.debug("Broadcast to \(self.connectedWebSockets.count) clients")
            }
        } catch {
            logger.error("Failed to serialize event: \(error)")
        }
    }

    private func setupBLECallbacks(logger: Logger) {
        logger.info("Registering BLE callbacks for WebSocket event broadcasting")

        // Manager state changes
        bleManager.stateCallback = { [weak self] state in
            guard let self = self else { return }
            var stateEvent = Bleproxy_V1_ManagerStateEvent()
            stateEvent.state = state
            stateEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

            var wsEvent = Bleproxy_V1_WsEvent()
            wsEvent.managerStateEvent = stateEvent
            self.broadcast(wsEvent, logger: logger)
        }

        // Scan results (Step 10)
        bleManager.addScanCallback(id: "websocket") { [weak self] device in
            guard let self = self else { return }
            var scanEvent = Bleproxy_V1_ScanResultEvent()
            scanEvent.device = device
            scanEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

            var wsEvent = Bleproxy_V1_WsEvent()
            wsEvent.scanResultEvent = scanEvent
            self.broadcast(wsEvent, logger: logger)
        }

        // Connection state changes (Step 10)
        bleManager.connectionCallback = { [weak self] uuid, isConnected, error in
            guard let self = self else { return }
            let deviceId = uuid.uuidString

            if isConnected {
                // Connected event
                var connectedEvent = Bleproxy_V1_PeripheralConnectedEvent()
                connectedEvent.deviceID = deviceId
                connectedEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

                var wsEvent = Bleproxy_V1_WsEvent()
                wsEvent.peripheralConnectedEvent = connectedEvent
                self.broadcast(wsEvent, logger: logger)
            } else {
                // Disconnected event
                var disconnectedEvent = Bleproxy_V1_PeripheralDisconnectedEvent()
                disconnectedEvent.deviceID = deviceId
                disconnectedEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

                // Include error if present
                if let error = error as? BLEError {
                    disconnectedEvent.error = error.toProto()
                } else if let error = error {
                    disconnectedEvent.error = BLEError(
                        code: .errorServerError,
                        message: error.localizedDescription
                    ).toProto()
                }

                var wsEvent = Bleproxy_V1_WsEvent()
                wsEvent.peripheralDisconnectedEvent = disconnectedEvent
                self.broadcast(wsEvent, logger: logger)
            }
        }

        // Characteristic notifications (Step 10)
        bleManager.notificationCallback = { [weak self] uuid, serviceUUID, characteristicUUID, value in
            guard let self = self else { return }
            var notificationEvent = Bleproxy_V1_CharacteristicValueUpdatedEvent()
            notificationEvent.deviceID = uuid.uuidString
            notificationEvent.serviceUuid = serviceUUID.uuidString
            notificationEvent.characteristicUuid = characteristicUUID.uuidString
            notificationEvent.value = value
            notificationEvent.timestamp = Int64(Date().timeIntervalSince1970 * 1000)

            var wsEvent = Bleproxy_V1_WsEvent()
            wsEvent.characteristicValueUpdatedEvent = notificationEvent
            self.broadcast(wsEvent, logger: logger)
        }
    }
}
