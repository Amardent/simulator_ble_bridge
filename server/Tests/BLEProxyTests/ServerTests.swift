import XCTest
import Vapor
import XCTVapor
@testable import BLEProxyServer
import Generated
import BLEProxy
import SwiftProtobuf
import NIOCore

/// Test suite for HTTP server components (Step 8)
///
/// This test suite validates:
/// - Health endpoint functionality
/// - Protobuf request/response handling
/// - Server configuration (hostname, port)
/// - Extension methods for Request/Response
/// - Error handling and serialization
///
/// **Testing Strategy:**
/// - Integration tests for endpoints (using XCTVapor)
/// - Unit tests for Response extension methods
/// - Configuration validation
/// - Both success and error paths
final class ServerTests: XCTestCase {
    var app: Application!

    override func setUpWithError() throws {
        app = Application(.testing)
        try configure(app)
    }

    override func tearDownWithError() throws {
        app.shutdown()
    }

    // MARK: - Health Endpoint Tests

    /// Test that health endpoint returns HTTP 200 with valid protobuf response
    func testHealthEndpointReturnsSuccess() throws {
        try app.test(.GET, "v1/health") { res in
            XCTAssertEqual(res.status, .ok, "Health endpoint should return 200 OK")
            XCTAssertEqual(
                res.headers.contentType,
                .protobuf,
                "Health endpoint should return protobuf content type"
            )
        }
    }

    /// Test that health endpoint returns valid protobuf content
    func testHealthEndpointProtobufContent() throws {
        try app.test(.GET, "v1/health") { res in
            // Extract response body (ByteBuffer)
            var body = res.body

            // Convert ByteBuffer to Data using readData
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read data from ByteBuffer")
                return
            }

            // Decode protobuf response
            let response = try Bleproxy_V1_HealthResponse(serializedBytes: data)

            // Verify response fields
            XCTAssertTrue(response.ready, "Server should be ready")
            XCTAssertEqual(response.serverVersion, "1.0.0", "Server version should be 1.0.0")
        }
    }

    /// Test that health endpoint is accessible at correct path
    func testHealthEndpointPath() throws {
        // Should succeed at /v1/health
        try app.test(.GET, "v1/health") { res in
            XCTAssertEqual(res.status, .ok)
        }

        // Should fail at incorrect path
        try app.test(.GET, "health") { res in
            XCTAssertEqual(res.status, .notFound)
        }

        try app.test(.GET, "v1/healthz") { res in
            XCTAssertEqual(res.status, .notFound)
        }
    }

    /// Test that health endpoint only accepts GET requests
    func testHealthEndpointOnlyAcceptsGET() throws {
        // GET should succeed
        try app.test(.GET, "v1/health") { res in
            XCTAssertEqual(res.status, .ok)
        }

        // POST should fail (Vapor returns 404 for unsupported methods)
        try app.test(.POST, "v1/health") { res in
            XCTAssertEqual(res.status, .notFound)
        }

        // PUT should fail
        try app.test(.PUT, "v1/health") { res in
            XCTAssertEqual(res.status, .notFound)
        }

        // DELETE should fail
        try app.test(.DELETE, "v1/health") { res in
            XCTAssertEqual(res.status, .notFound)
        }
    }

    // MARK: - Protobuf Media Type Tests

    /// Test that protobuf media type constant is correctly defined
    func testProtobufMediaTypeConstant() {
        let mediaType = HTTPMediaType.protobuf

        XCTAssertEqual(mediaType.type, "application", "Media type should be 'application'")
        XCTAssertEqual(mediaType.subType, "x-protobuf", "Media subtype should be 'x-protobuf'")

        // Verify full string representation
        XCTAssertEqual(mediaType.serialize(), "application/x-protobuf", "Full media type should be 'application/x-protobuf'")
    }

    // MARK: - Response Extension Tests

    /// Test Response.proto factory with default status
    func testResponseProtoFactoryDefaultStatus() throws {
        var healthResponse = Bleproxy_V1_HealthResponse()
        healthResponse.ready = true
        healthResponse.serverVersion = "1.0.0"

        let response = try Response.proto(healthResponse)

        XCTAssertEqual(response.status, .ok, "Default status should be .ok")
        XCTAssertEqual(response.headers.contentType, .protobuf, "Content-Type should be protobuf")

        // Verify body contains serialized protobuf
        guard let data = response.body.data else {
            XCTFail("Response body should not be nil")
            return
        }

        let decoded = try Bleproxy_V1_HealthResponse(serializedBytes: data)
        XCTAssertTrue(decoded.ready)
        XCTAssertEqual(decoded.serverVersion, "1.0.0")
    }

    /// Test Response.proto factory with custom status
    func testResponseProtoFactoryCustomStatus() throws {
        var connectResponse = Bleproxy_V1_ConnectResponse()
        connectResponse.success = true

        let response = try Response.proto(connectResponse, status: .created)

        XCTAssertEqual(response.status, .created, "Custom status should be set")
        XCTAssertEqual(response.headers.contentType, .protobuf, "Content-Type should be protobuf")

        // Verify body
        guard let data = response.body.data else {
            XCTFail("Response body should not be nil")
            return
        }

        let decoded = try Bleproxy_V1_ConnectResponse(serializedBytes: data)
        XCTAssertTrue(decoded.success)
    }

    /// Test Response.error factory with BLEError
    func testResponseErrorFactory() throws {
        let bleError = BLEError(
            code: .errorDeviceNotFound,
            message: "Device with ID not found"
        )

        let response = try Response.error(bleError)

        XCTAssertEqual(response.status, .badRequest, "Default error status should be .badRequest")
        XCTAssertEqual(response.headers.contentType, .protobuf, "Content-Type should be protobuf")

        // Verify body contains error protobuf
        guard let data = response.body.data else {
            XCTFail("Response body should not be nil")
            return
        }

        let errorProto = try Bleproxy_V1_Error(serializedBytes: data)
        XCTAssertEqual(errorProto.code, Int32(Bleproxy_V1_BleErrorCode.errorDeviceNotFound.rawValue))
        XCTAssertEqual(errorProto.message, "Device with ID not found")
    }

    /// Test Response.error factory with custom status
    func testResponseErrorFactoryCustomStatus() throws {
        let bleError = BLEError(
            code: .errorServerError,
            message: "Internal server error"
        )

        let response = try Response.error(bleError, status: .internalServerError)

        XCTAssertEqual(response.status, .internalServerError, "Custom status should be set")
        XCTAssertEqual(response.headers.contentType, .protobuf, "Content-Type should be protobuf")

        // Verify body
        guard let data = response.body.data else {
            XCTFail("Response body should not be nil")
            return
        }

        let errorProto = try Bleproxy_V1_Error(serializedBytes: data)
        XCTAssertEqual(errorProto.code, Int32(Bleproxy_V1_BleErrorCode.errorServerError.rawValue))
        XCTAssertEqual(errorProto.message, "Internal server error")
    }

    /// Test that Response.proto correctly serializes complex protobuf messages
    func testResponseProtoComplexMessage() throws {
        var writeRequest = Bleproxy_V1_WriteRequest()
        writeRequest.deviceID = "12345678-1234-1234-1234-123456789ABC"
        writeRequest.serviceUuid = "180A"
        writeRequest.characteristicUuid = "2A29"
        writeRequest.value = Data(repeating: 0xAB, count: 100) // 100 bytes of data
        writeRequest.withResponse = true

        let response = try Response.proto(writeRequest)

        guard let data = response.body.data else {
            XCTFail("Response body should not be nil")
            return
        }

        let decoded = try Bleproxy_V1_WriteRequest(serializedBytes: data)
        XCTAssertEqual(decoded.deviceID, "12345678-1234-1234-1234-123456789ABC")
        XCTAssertEqual(decoded.value.count, 100)
        XCTAssertEqual(decoded.value.first, 0xAB)
        XCTAssertTrue(decoded.withResponse)
    }

    // MARK: - Server Configuration Tests

    /// Test that server is configured to bind to localhost
    func testServerConfigurationHostname() {
        XCTAssertEqual(
            app.http.server.configuration.hostname,
            "127.0.0.1",
            "Server should bind to 127.0.0.1 (localhost only)"
        )
    }

    /// Test that server is configured to use port 5050
    func testServerConfigurationPort() {
        XCTAssertEqual(
            app.http.server.configuration.port,
            5050,
            "Server should use port 5050"
        )
    }

    // MARK: - Error Path Tests

    /// Test BLEError to protobuf conversion
    func testBLEErrorToProtoConversion() {
        let bleError = BLEError(
            code: .errorBluetoothPoweredOff,
            message: "Bluetooth is powered off"
        )

        let errorProto = bleError.toProto()

        XCTAssertEqual(errorProto.code, Int32(Bleproxy_V1_BleErrorCode.errorBluetoothPoweredOff.rawValue))
        XCTAssertEqual(errorProto.message, "Bluetooth is powered off")
    }

    /// Test that all error codes can be serialized to protobuf
    func testAllErrorCodesSerializeCorrectly() throws {
        let testCases: [(Bleproxy_V1_BleErrorCode, String)] = [
            (.errorUnknown, "Unknown error"),
            (.errorBluetoothUnsupported, "Bluetooth unsupported"),
            (.errorBluetoothPoweredOff, "Bluetooth powered off"),
            (.errorDeviceNotFound, "Device not found"),
            (.errorDeviceNotConnected, "Device not connected"),
            (.errorServicesNotDiscovered, "Services not discovered"),
            (.errorCharacteristicNotFound, "Characteristic not found"),
            (.errorServerError, "Server error"),
        ]

        for (code, message) in testCases {
            let bleError = BLEError(code: code, message: message)
            let response = try Response.error(bleError)

            guard let data = response.body.data else {
                XCTFail("Response body should not be nil for error code \(code)")
                continue
            }

            let errorProto = try Bleproxy_V1_Error(serializedBytes: data)

            XCTAssertEqual(errorProto.code, Int32(code.rawValue), "Error code should match for \(code)")
            XCTAssertEqual(errorProto.message, message, "Error message should match for \(code)")
        }
    }

    // MARK: - Edge Cases

    /// Test protobuf response with empty string fields
    func testProtobufResponseWithEmptyStrings() throws {
        var healthResponse = Bleproxy_V1_HealthResponse()
        healthResponse.ready = false
        healthResponse.serverVersion = "" // Empty string

        let response = try Response.proto(healthResponse)

        guard let data = response.body.data else {
            XCTFail("Response body should not be nil")
            return
        }

        let decoded = try Bleproxy_V1_HealthResponse(serializedBytes: data)

        XCTAssertFalse(decoded.ready)
        XCTAssertEqual(decoded.serverVersion, "")
    }

    /// Test protobuf response with large data
    func testProtobufResponseWithLargeData() throws {
        var writeRequest = Bleproxy_V1_WriteRequest()
        writeRequest.deviceID = "12345678-1234-1234-1234-123456789ABC"
        writeRequest.serviceUuid = "180A"
        writeRequest.characteristicUuid = "2A29"
        writeRequest.value = Data(repeating: 0xAB, count: 512) // 512 bytes of data
        writeRequest.withResponse = true

        let response = try Response.proto(writeRequest)

        guard let data = response.body.data else {
            XCTFail("Response body should not be nil")
            return
        }

        let decoded = try Bleproxy_V1_WriteRequest(serializedBytes: data)

        XCTAssertEqual(decoded.value.count, 512)
        XCTAssertEqual(decoded.value.first, 0xAB)
    }
}
