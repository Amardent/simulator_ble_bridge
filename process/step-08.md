# Step 8: HTTP Server - Vapor Setup and Health Endpoint

## Objective
Set up Vapor web framework for the Swift server, implement HTTP protobuf request/response handling, and create the /v1/health endpoint.

## Prerequisites
- Step 7: BLEManager complete with all operations (✅ Complete - 2025-10-06)
- Understanding of Vapor framework
- Swift Package Manager knowledge
- Existing Package.swift with BLEProxy and Generated modules configured

## Technical Details

**Important:** From Steps 3-7, the following infrastructure is already in place:
- ✅ `BLEProxy` module with `BLEManager` (public class, all operations implemented)
- ✅ `BLEError` struct with `toProto()` method for HTTP error responses
- ✅ `Generated` module with all protobuf types (prefix: `Bleproxy_V1_`)
- ✅ Swift Package Manager configuration with test infrastructure
- ✅ Existing CLI tools: `ble-scan`, `ble-write-monitor-test`, `ble-fi-test`, `ble-rssi-test`

### Package.swift Configuration

**Update existing `/Users/ericfrank/ble_bridge/server/Package.swift`** to add Vapor dependency and server executable:

```swift
// ADD to dependencies array (after swift-protobuf):
dependencies: [
    .package(url: "https://github.com/apple/swift-protobuf.git", from: "1.27.0"),
    .package(url: "https://github.com/vapor/vapor.git", from: "4.89.0"),  // ADD THIS
],

// ADD to products array:
products: [
    // ... existing products (Generated, BLEProxy, ble-scan, etc.) ...
    .executable(
        name: "ble-proxy-server",
        targets: ["BLEProxyServer"]
    ),  // ADD THIS
],

// ADD to targets array:
targets: [
    // ... existing targets (Generated, BLEProxy, BLEProxyTests, CLI tools) ...
    .executableTarget(
        name: "BLEProxyServer",
        dependencies: [
            .target(name: "BLEProxy"),
            .target(name: "Generated"),
            .product(name: "Vapor", package: "vapor"),
        ],
        path: "Sources/BLEProxyServer"
    ),  // ADD THIS
]
```

**Note:** Keep all existing targets (BLEProxy, Generated, test tools). Only ADD the Vapor dependency and BLEProxyServer executable.

### Project Structure

**Current state** (from Steps 3-7):
```
/Users/ericfrank/ble_bridge/server/
├── Package.swift (✅ exists, needs Vapor dependency added)
├── Sources/
│   ├── BLEProxy/ (✅ exists from Steps 3-7)
│   │   ├── BLEManager.swift (✅ complete: scan, connect, discover, read, write, monitor, RSSI)
│   │   └── BLEError.swift (✅ complete: wraps protobuf error codes, has toProto() method)
│   ├── Generated/ (✅ exists from Step 2)
│   │   └── ble_proxy.pb.swift (✅ all protobuf types with Bleproxy_V1_ prefix)
│   ├── BLEScanTool/ (✅ CLI tool from Step 3)
│   ├── BLEWriteMonitorTool/ (✅ CLI tool from Step 6)
│   ├── BLEFiTestTool/ (✅ CLI tool from Step 6)
│   └── BLERSSITool/ (✅ CLI tool from Step 7)
└── Tests/
    └── BLEProxyTests/ (✅ exists: BLEManagerTests, WriteMonitorTests, RSSITests)
```

**New for Step 8** (create these):
```
/Users/ericfrank/ble_bridge/server/Sources/BLEProxyServer/
├── main.swift
├── configure.swift
├── routes.swift
└── Controllers/
    └── HealthController.swift
```

### Main.swift
```swift
import Vapor

@main
struct BLEProxyServer {
    static func main() async throws {
        var env = try Environment.detect()
        try LoggingSystem.bootstrap(from: &env)

        let app = Application(env)
        defer { app.shutdown() }

        try configure(app)
        try app.run()
    }
}
```

### Configure.swift
```swift
import Vapor

func configure(_ app: Application) throws {
    // Bind to localhost only
    app.http.server.configuration.hostname = "127.0.0.1"
    app.http.server.configuration.port = 5050

    // Register routes
    try routes(app)

    app.logger.info("BLE Proxy Server configured on 127.0.0.1:5050")
}
```

### Routes.swift
```swift
import Vapor

func routes(_ app: Application) throws {
    // Health endpoint
    app.get("v1", "health") { req async throws -> Response in
        return try await HealthController.health(req)
    }

    // Placeholder for other endpoints
}
```

### HealthController.swift
```swift
import Vapor
import SwiftProtobuf
import Generated  // Import for protobuf types

struct HealthController {
    static func health(_ req: Request) async throws -> Response {
        // Use generated protobuf type (with Bleproxy_V1_ prefix)
        var response = Bleproxy_V1_HealthResponse()
        response.version = "1.0.0"
        response.ready = true

        let data = try response.serializedData()

        var httpResponse = Response(status: .ok)
        httpResponse.headers.contentType = .init(type: "application", subType: "x-protobuf")
        httpResponse.body = .init(data: data)

        return httpResponse
    }
}
```

**Note:** All protobuf types use `Bleproxy_V1_` prefix (e.g., `Bleproxy_V1_HealthResponse`, `Bleproxy_V1_Error`). This was established in Steps 3-7.

### Protobuf Content-Type Handler
```swift
import Vapor
import SwiftProtobuf
import Generated

extension HTTPMediaType {
    static let protobuf = HTTPMediaType(type: "application", subType: "x-protobuf")
}

extension Request {
    func decodeProto<T: SwiftProtobuf.Message>(_ type: T.Type) throws -> T {
        guard let data = self.body.data else {
            throw Abort(.badRequest, reason: "Empty request body")
        }
        return try T(serializedData: data)
    }
}

extension Response {
    /// Create Response from protobuf message
    static func proto<T: SwiftProtobuf.Message>(_ message: T, status: HTTPStatus = .ok) throws -> Response {
        let data = try message.serializedData()
        var response = Response(status: status)
        response.headers.contentType = .protobuf
        response.body = .init(data: data)
        return response
    }

    /// Create error Response from BLEError (Step 7)
    static func error(_ bleError: BLEError, status: HTTPStatus = .badRequest) throws -> Response {
        return try proto(bleError.toProto(), status: status)
    }
}
```

**Integration Notes:**
- `BLEError.toProto()` from Step 7 converts to `Bleproxy_V1_Error` message
- Error responses use `Response.error()` helper for consistency
- All protobuf serialization errors should be caught and logged

## Acceptance Criteria
- [ ] Swift package builds successfully
- [ ] Server starts on 127.0.0.1:5050
- [ ] /v1/health endpoint responds
- [ ] Response uses application/x-protobuf content-type
- [ ] Response body is valid protobuf HealthResponse
- [ ] HealthResponse.ready is true
- [ ] HealthResponse.version is set
- [ ] Server logs startup information
- [ ] Server only binds to localhost (not 0.0.0.0)
- [ ] Graceful shutdown on SIGINT/SIGTERM

## Testing Instructions
```bash
# Build server
cd /Users/ericfrank/ble_bridge/server
swift build

# Run server
swift run BLEProxyServer

# In another terminal, test health endpoint
curl -v http://127.0.0.1:5050/v1/health \
  --output /tmp/health.bin

# Decode response with protoc
protoc --decode=bleproxy.v1.HealthResponse \
  --proto_path=/Users/ericfrank/ble_bridge/proto \
  /Users/ericfrank/ble_bridge/proto/ble_proxy.proto \
  < /tmp/health.bin

# Test from external network (should fail)
curl -v http://<your-ip>:5050/v1/health
# Expected: Connection refused

# Test content type
curl -v http://127.0.0.1:5050/v1/health 2>&1 | grep "content-type"
# Expected: content-type: application/x-protobuf
```

## Dependencies
- Vapor 4.89.0+
- SwiftProtobuf 1.27.0+ (already in Package.swift from Step 2)
- Swift 5.9+
- macOS 13+
- Step 1: Protobuf schema (✅ complete)
- Step 2: Generated Swift protobuf code (✅ complete)
- Step 7: BLEManager and BLEError infrastructure (✅ complete)

## Risks/Blockers
- Vapor may have breaking changes in future versions
- Need to ensure protobuf binary serialization is correct
- Localhost-only binding must be enforced
- Need to handle malformed protobuf requests gracefully
- Large request bodies may need size limits
- Server startup may fail if port 5050 is in use
- Need proper signal handling for graceful shutdown

## Recommended Agent
swift-backend-engineer

## Estimated Time
2 hours

## Implementation Notes from Steps 3-7

**BLEManager Integration (for Steps 9-10):**
- BLEManager is `public class`, can be instantiated in server
- All operations are async with `completion: @escaping (Result<T, Error>) -> Void`
- Operations execute on background queue (`com.bleproxy.central`)
- State changes broadcast via callbacks (scan, state change, disconnect)
- Thread-safe via queue-based synchronization (no locks needed)

**Error Handling:**
- `BLEError` struct wraps `Bleproxy_V1_BleErrorCode` enum
- Use `BLEError.toProto()` to convert to `Bleproxy_V1_Error` for HTTP responses
- Error codes 0-699: match react-native-ble-plx
- Error codes 1000+: server-specific (`ERROR_SERVER_ERROR`, `ERROR_SERVER_TIMEOUT`)
- Code 3: `ERROR_OPERATION_TIMED_OUT` (BLE layer timeouts)
- Code 1001: `ERROR_SERVER_TIMEOUT` (HTTP/WebSocket layer - use this in Step 8-10)

**Protobuf Types:**
- All types prefixed with `Bleproxy_V1_` (e.g., `Bleproxy_V1_HealthResponse`)
- Enum cases use camelCase: `.poweredOn`, `.errorUnknown`
- Optional fields have `has*` properties: `device.hasManufacturerData`
- Import `Generated` module to access all types

**Testing Patterns:**
- Use `curl` for HTTP endpoint testing (see existing step tests)
- Use `protoc --decode` to verify binary protobuf responses
- Follow signal handling pattern from CLI tools (SIGINT for graceful shutdown)
- Log all requests/responses to stdout for debugging

**Next Steps Preview:**
- Step 9: Add BLE operation endpoints (scan, connect, read, write, discover, rssi)
- Step 10: Add WebSocket for event streaming (scan results, state changes, notifications)
