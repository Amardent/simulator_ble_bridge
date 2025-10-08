import Vapor

func configure(_ app: Application) throws {
    // Bind to localhost only
    app.http.server.configuration.hostname = "127.0.0.1"
    app.http.server.configuration.port = 5050

    // BLE write operations limited to ~512 bytes, set 1MB for overhead
    app.routes.defaultMaxBodySize = "1mb"

    // Register routes
    try routes(app)

    app.logger.info("BLE Proxy Server configured on 127.0.0.1:5050")
}
