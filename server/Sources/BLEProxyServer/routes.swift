import Vapor

func routes(_ app: Application) throws {
    let ble = BLEController.shared

    // Health endpoint (Step 8)
    app.get("v1", "health") { req async throws -> Response in
        return try await HealthController.health(req)
    }

    // State query
    app.post("v1", "state") { req async throws -> Response in
        return try await ble.state(req)
    }

    // Scan endpoints
    app.post("v1", "scan", "start") { req async throws -> Response in
        return try await ble.startScan(req)
    }
    app.post("v1", "scan", "stop") { req async throws -> Response in
        return try await ble.stopScan(req)
    }

    // Connection endpoints
    app.post("v1", "device", "connect") { req async throws -> Response in
        return try await ble.connect(req)
    }
    app.post("v1", "device", "disconnect") { req async throws -> Response in
        return try await ble.disconnect(req)
    }
    app.post("v1", "device", "isconnected") { req async throws -> Response in
        return try await ble.isConnected(req)
    }

    // Discovery endpoints
    app.post("v1", "device", "discover") { req async throws -> Response in
        return try await ble.discover(req)
    }
    app.post("v1", "device", "services") { req async throws -> Response in
        return try await ble.services(req)
    }
    app.post("v1", "device", "characteristics") { req async throws -> Response in
        return try await ble.characteristics(req)
    }

    // Read/write endpoints
    app.post("v1", "device", "read") { req async throws -> Response in
        return try await ble.read(req)
    }
    app.post("v1", "device", "write") { req async throws -> Response in
        return try await ble.write(req)
    }
    app.post("v1", "device", "monitor") { req async throws -> Response in
        return try await ble.monitor(req)
    }
    app.post("v1", "device", "rssi") { req async throws -> Response in
        return try await ble.readRSSI(req)
    }

    // WebSocket endpoint (Step 10)
    app.webSocket("v1", "events") { req, ws in
        ble.handleWebSocket(req, ws)
    }
}
