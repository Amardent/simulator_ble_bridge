import XCTest
import Vapor
import XCTVapor
@testable import BLEProxyServer
import Generated
import BLEProxy
import SwiftProtobuf
import NIOCore

/// Test suite for BLEController HTTP endpoints (Step 9)
///
/// This test suite validates:
/// - All 13 BLE operation endpoints
/// - UUID parsing and validation
/// - Protobuf request/response handling
/// - Error responses for various scenarios
/// - Endpoint registration and routing
///
/// **Testing Strategy:**
/// - Integration tests for endpoint registration
/// - UUID validation tests
/// - Protobuf decode tests
/// - Error response tests
/// - No actual BLE hardware required (testing HTTP layer only)
final class BLEControllerTests: XCTestCase {
    var app: Application!

    override func setUpWithError() throws {
        app = Application(.testing)
        try configure(app)
    }

    override func tearDownWithError() throws {
        app.shutdown()
    }

    // MARK: - UUID Parsing Tests (4 tests)

    /// Test valid UUID format is accepted
    func testValidUUIDFormat() throws {
        let validUUID = "12345678-1234-1234-1234-123456789ABC"

        var connectRequest = Bleproxy_V1_ConnectRequest()
        connectRequest.deviceID = validUUID

        let requestData = try connectRequest.serializedData()

        try app.test(.POST, "v1/device/connect", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            // Should not return INVALID_IDENTIFIERS error
            XCTAssertEqual(res.status, .ok)
        }
    }

    /// Test invalid UUID format returns ERROR_INVALID_IDENTIFIERS
    func testInvalidUUIDFormat() throws {
        let invalidUUID = "not-a-valid-uuid"

        var connectRequest = Bleproxy_V1_ConnectRequest()
        connectRequest.deviceID = invalidUUID

        let requestData = try connectRequest.serializedData()

        try app.test(.POST, "v1/device/connect", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .badRequest)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let errorProto = try Bleproxy_V1_Error(serializedBytes: data)
            XCTAssertEqual(
                errorProto.code,
                Int32(Bleproxy_V1_BleErrorCode.errorInvalidIdentifiers.rawValue),
                "Invalid UUID should return ERROR_INVALID_IDENTIFIERS"
            )
        }
    }

    /// Test empty UUID string returns ERROR_INVALID_IDENTIFIERS
    func testEmptyUUIDString() throws {
        var connectRequest = Bleproxy_V1_ConnectRequest()
        connectRequest.deviceID = ""

        let requestData = try connectRequest.serializedData()

        try app.test(.POST, "v1/device/connect", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .badRequest)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let errorProto = try Bleproxy_V1_Error(serializedBytes: data)
            XCTAssertEqual(
                errorProto.code,
                Int32(Bleproxy_V1_BleErrorCode.errorInvalidIdentifiers.rawValue)
            )
        }
    }

    /// Test malformed UUID (wrong format) returns ERROR_INVALID_IDENTIFIERS
    func testMalformedUUID() throws {
        let malformedUUIDs = [
            "12345678-1234-1234-1234",  // Too short
            "12345678-1234-1234-1234-123456789ABC-EXTRA",  // Too long
            "ZZZZZZZZ-1234-1234-1234-123456789ABC",  // Invalid hex characters
        ]

        for malformedUUID in malformedUUIDs {
            var connectRequest = Bleproxy_V1_ConnectRequest()
            connectRequest.deviceID = malformedUUID

            let requestData = try connectRequest.serializedData()

            try app.test(.POST, "v1/device/connect", beforeRequest: { req in
                req.headers.contentType = .protobuf
                req.body = ByteBuffer(data: requestData)
            }) { res in
                XCTAssertEqual(res.status, .badRequest, "Malformed UUID '\(malformedUUID)' should return error")

                var body = res.body
                guard let data = body.readData(length: body.readableBytes) else {
                    XCTFail("Failed to read response body")
                    return
                }

                let errorProto = try Bleproxy_V1_Error(serializedBytes: data)
                XCTAssertEqual(
                    errorProto.code,
                    Int32(Bleproxy_V1_BleErrorCode.errorInvalidIdentifiers.rawValue)
                )
            }
        }
    }

    // MARK: - Endpoint Registration Tests (13 tests)

    /// Test /v1/state endpoint is registered
    func testStateEndpointRegistered() throws {
        let request = Bleproxy_V1_StateRequest()
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/state", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
            XCTAssertEqual(res.headers.contentType, .protobuf)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_StateResponse(serializedBytes: data)
            // Should return a valid manager state
            XCTAssertTrue(
                response.state != .UNRECOGNIZED(Int.max),
                "Should return valid manager state"
            )
        }
    }

    /// Test /v1/scan/start endpoint is registered
    func testStartScanEndpointRegistered() throws {
        let request = Bleproxy_V1_StartScanRequest()
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/scan/start", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
            XCTAssertEqual(res.headers.contentType, .protobuf)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_StartScanResponse(serializedBytes: data)
            // Should return success (even if Bluetooth is off, scan is initiated)
            XCTAssertNotNil(response)
        }
    }

    /// Test /v1/scan/stop endpoint is registered
    func testStopScanEndpointRegistered() throws {
        let request = Bleproxy_V1_StopScanRequest()
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/scan/stop", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
            XCTAssertEqual(res.headers.contentType, .protobuf)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_StopScanResponse(serializedBytes: data)
            XCTAssertTrue(response.success)
        }
    }

    /// Test /v1/device/connect endpoint is registered
    func testConnectEndpointRegistered() throws {
        var request = Bleproxy_V1_ConnectRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/connect", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
            XCTAssertEqual(res.headers.contentType, .protobuf)

            // Will fail with DEVICE_NOT_FOUND but endpoint is registered
            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_ConnectResponse(serializedBytes: data)
            XCTAssertNotNil(response)
        }
    }

    /// Test /v1/device/disconnect endpoint is registered
    func testDisconnectEndpointRegistered() throws {
        var request = Bleproxy_V1_DisconnectRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/disconnect", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
            XCTAssertEqual(res.headers.contentType, .protobuf)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_DisconnectResponse(serializedBytes: data)
            XCTAssertNotNil(response)
        }
    }

    /// Test /v1/device/isconnected endpoint is registered
    func testIsConnectedEndpointRegistered() throws {
        var request = Bleproxy_V1_IsConnectedRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/isconnected", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
            XCTAssertEqual(res.headers.contentType, .protobuf)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_IsConnectedResponse(serializedBytes: data)
            // Should return false for non-existent device
            XCTAssertFalse(response.isConnected)
        }
    }

    /// Test /v1/device/discover endpoint is registered
    func testDiscoverEndpointRegistered() throws {
        var request = Bleproxy_V1_DiscoverRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/discover", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
            XCTAssertEqual(res.headers.contentType, .protobuf)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_DiscoverResponse(serializedBytes: data)
            XCTAssertNotNil(response)
        }
    }

    /// Test /v1/device/services endpoint is registered
    func testServicesEndpointRegistered() throws {
        var request = Bleproxy_V1_ServicesRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/services", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .badRequest)
            XCTAssertEqual(res.headers.contentType, .protobuf)

            // This endpoint returns error (use discover instead)
            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let errorProto = try Bleproxy_V1_Error(serializedBytes: data)
            XCTAssertEqual(
                errorProto.code,
                Int32(Bleproxy_V1_BleErrorCode.errorServicesNotDiscovered.rawValue)
            )
        }
    }

    /// Test /v1/device/characteristics endpoint is registered
    func testCharacteristicsEndpointRegistered() throws {
        var request = Bleproxy_V1_CharacteristicsRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        request.serviceUuid = "180A"
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/characteristics", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .badRequest)
            XCTAssertEqual(res.headers.contentType, .protobuf)

            // This endpoint returns error (use discover instead)
            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let errorProto = try Bleproxy_V1_Error(serializedBytes: data)
            XCTAssertEqual(
                errorProto.code,
                Int32(Bleproxy_V1_BleErrorCode.errorCharacteristicsNotDiscovered.rawValue)
            )
        }
    }

    /// Test /v1/device/read endpoint is registered
    func testReadEndpointRegistered() throws {
        var request = Bleproxy_V1_ReadRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        request.serviceUuid = "180A"
        request.characteristicUuid = "2A29"
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/read", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
            XCTAssertEqual(res.headers.contentType, .protobuf)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_ReadResponse(serializedBytes: data)
            XCTAssertNotNil(response)
        }
    }

    /// Test /v1/device/write endpoint is registered
    func testWriteEndpointRegistered() throws {
        var request = Bleproxy_V1_WriteRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        request.serviceUuid = "180A"
        request.characteristicUuid = "2A29"
        request.value = Data([0x01, 0x02, 0x03])
        request.withResponse = true
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/write", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
            XCTAssertEqual(res.headers.contentType, .protobuf)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_WriteResponse(serializedBytes: data)
            XCTAssertNotNil(response)
        }
    }

    /// Test /v1/device/monitor endpoint is registered
    func testMonitorEndpointRegistered() throws {
        var request = Bleproxy_V1_MonitorRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        request.serviceUuid = "180A"
        request.characteristicUuid = "2A29"
        request.enable = true
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/monitor", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
            XCTAssertEqual(res.headers.contentType, .protobuf)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_MonitorResponse(serializedBytes: data)
            XCTAssertNotNil(response)
        }
    }

    /// Test /v1/device/rssi endpoint is registered
    func testRSSIEndpointRegistered() throws {
        var request = Bleproxy_V1_RSSIRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/rssi", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
            XCTAssertEqual(res.headers.contentType, .protobuf)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_RSSIResponse(serializedBytes: data)
            XCTAssertNotNil(response)
        }
    }

    // MARK: - Protobuf Decode Tests (5 tests)

    /// Test decoding valid protobuf request
    func testDecodeValidProtobuf() throws {
        var connectRequest = Bleproxy_V1_ConnectRequest()
        connectRequest.deviceID = "12345678-1234-1234-1234-123456789ABC"
        let requestData = try connectRequest.serializedData()

        try app.test(.POST, "v1/device/connect", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
        }
    }

    /// Test decoding empty protobuf request
    func testDecodeEmptyProtobuf() throws {
        let emptyRequest = Bleproxy_V1_StopScanRequest()
        let requestData = try emptyRequest.serializedData()

        try app.test(.POST, "v1/scan/stop", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
        }
    }

    /// Test decoding malformed protobuf returns error
    func testDecodeMalformedProtobuf() throws {
        let malformedData = Data([0xFF, 0xFF, 0xFF, 0xFF])

        try app.test(.POST, "v1/device/connect", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: malformedData)
        }) { res in
            // Should return error (400 or 500)
            XCTAssertTrue(res.status == .badRequest || res.status == .internalServerError)
        }
    }

    /// Test decoding large protobuf request
    func testDecodeLargeProtobuf() throws {
        var writeRequest = Bleproxy_V1_WriteRequest()
        writeRequest.deviceID = "12345678-1234-1234-1234-123456789ABC"
        writeRequest.serviceUuid = "180A"
        writeRequest.characteristicUuid = "2A29"
        writeRequest.value = Data(repeating: 0xAB, count: 512) // 512 bytes
        writeRequest.withResponse = true
        let requestData = try writeRequest.serializedData()

        try app.test(.POST, "v1/device/write", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
        }
    }

    /// Test decoding protobuf request at body size limit
    func testDecodeProtobufAtBodySizeLimit() throws {
        // Test request body size configuration (1MB limit)
        var writeRequest = Bleproxy_V1_WriteRequest()
        writeRequest.deviceID = "12345678-1234-1234-1234-123456789ABC"
        writeRequest.serviceUuid = "180A"
        writeRequest.characteristicUuid = "2A29"
        // Create large payload (but under 1MB limit)
        writeRequest.value = Data(repeating: 0xAB, count: 900_000) // 900KB
        writeRequest.withResponse = false
        let requestData = try writeRequest.serializedData()

        try app.test(.POST, "v1/device/write", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            // Should succeed (under 1MB limit)
            XCTAssertEqual(res.status, .ok)
        }
    }

    // MARK: - Error Response Tests (8 tests)

    /// Test ERROR_INVALID_IDENTIFIERS response
    func testErrorInvalidIdentifiersResponse() throws {
        var request = Bleproxy_V1_ConnectRequest()
        request.deviceID = "invalid-uuid"
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/connect", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .badRequest)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let errorProto = try Bleproxy_V1_Error(serializedBytes: data)
            XCTAssertEqual(
                errorProto.code,
                Int32(Bleproxy_V1_BleErrorCode.errorInvalidIdentifiers.rawValue)
            )
            XCTAssertTrue(errorProto.message.contains("UUID"))
        }
    }

    /// Test ERROR_DEVICE_NOT_FOUND or ERROR_BLUETOOTH_POWERED_OFF response
    func testErrorDeviceNotFoundResponse() throws {
        var request = Bleproxy_V1_ConnectRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC" // Valid UUID but not discovered
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/connect", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_ConnectResponse(serializedBytes: data)
            XCTAssertFalse(response.success)
            XCTAssertTrue(response.hasError)

            // During unit tests, Bluetooth may be powered off (error 102) or device not found (error 204)
            // Both are valid responses depending on Bluetooth state
            let errorCode = response.error.code
            XCTAssertTrue(
                errorCode == Int32(Bleproxy_V1_BleErrorCode.errorDeviceNotFound.rawValue) ||
                errorCode == Int32(Bleproxy_V1_BleErrorCode.errorBluetoothPoweredOff.rawValue),
                "Expected ERROR_DEVICE_NOT_FOUND (204) or ERROR_BLUETOOTH_POWERED_OFF (102), got \(errorCode)"
            )
        }
    }

    /// Test ERROR_DEVICE_NOT_CONNECTED response
    func testErrorDeviceNotConnectedResponse() throws {
        var request = Bleproxy_V1_DisconnectRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC" // Valid UUID but not connected
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/disconnect", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_DisconnectResponse(serializedBytes: data)
            XCTAssertFalse(response.success)
            XCTAssertTrue(response.hasError)
            XCTAssertEqual(
                response.error.code,
                Int32(Bleproxy_V1_BleErrorCode.errorDeviceNotConnected.rawValue)
            )
        }
    }

    /// Test ERROR_SERVICES_NOT_DISCOVERED response
    func testErrorServicesNotDiscoveredResponse() throws {
        var request = Bleproxy_V1_ServicesRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/services", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .badRequest)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let errorProto = try Bleproxy_V1_Error(serializedBytes: data)
            XCTAssertEqual(
                errorProto.code,
                Int32(Bleproxy_V1_BleErrorCode.errorServicesNotDiscovered.rawValue)
            )
        }
    }

    /// Test ERROR_CHARACTERISTICS_NOT_DISCOVERED response
    func testErrorCharacteristicsNotDiscoveredResponse() throws {
        var request = Bleproxy_V1_CharacteristicsRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        request.serviceUuid = "180A"
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/characteristics", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .badRequest)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let errorProto = try Bleproxy_V1_Error(serializedBytes: data)
            XCTAssertEqual(
                errorProto.code,
                Int32(Bleproxy_V1_BleErrorCode.errorCharacteristicsNotDiscovered.rawValue)
            )
        }
    }

    /// Test state endpoint returns valid state
    func testStateEndpointReturnsValidState() throws {
        let request = Bleproxy_V1_StateRequest()
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/state", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_StateResponse(serializedBytes: data)
            // Should return one of the valid states
            XCTAssertTrue(
                response.state == .unknown ||
                response.state == .resetting ||
                response.state == .unsupported ||
                response.state == .unauthorized ||
                response.state == .poweredOff ||
                response.state == .poweredOn
            )
        }
    }

    /// Test isConnected endpoint returns false for non-existent device
    func testIsConnectedReturnsFalseForNonExistentDevice() throws {
        var request = Bleproxy_V1_IsConnectedRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/isconnected", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_IsConnectedResponse(serializedBytes: data)
            XCTAssertFalse(response.isConnected)
        }
    }

    /// Test scan endpoints handle empty service filter
    func testScanHandlesEmptyServiceFilter() throws {
        var request = Bleproxy_V1_StartScanRequest()
        request.serviceUuids = [] // Empty filter
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/scan/start", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)

            var body = res.body
            guard let data = body.readData(length: body.readableBytes) else {
                XCTFail("Failed to read response body")
                return
            }

            let response = try Bleproxy_V1_StartScanResponse(serializedBytes: data)
            XCTAssertTrue(response.success)
        }
    }

    // MARK: - Edge Cases

    /// Test endpoints reject GET requests (should be POST)
    func testEndpointsRejectGETRequests() throws {
        try app.test(.GET, "v1/state") { res in
            XCTAssertEqual(res.status, .notFound)
        }

        try app.test(.GET, "v1/scan/start") { res in
            XCTAssertEqual(res.status, .notFound)
        }

        try app.test(.GET, "v1/device/connect") { res in
            XCTAssertEqual(res.status, .notFound)
        }
    }

    /// Test write endpoint handles large payload
    func testWriteEndpointHandlesLargePayload() throws {
        var request = Bleproxy_V1_WriteRequest()
        request.deviceID = "12345678-1234-1234-1234-123456789ABC"
        request.serviceUuid = "180A"
        request.characteristicUuid = "2A29"
        request.value = Data(repeating: 0xAB, count: 512)
        request.withResponse = false
        let requestData = try request.serializedData()

        try app.test(.POST, "v1/device/write", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: requestData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
        }
    }

    /// Test monitor endpoint with both enable and disable
    func testMonitorEndpointEnableDisable() throws {
        // Test enable
        var enableRequest = Bleproxy_V1_MonitorRequest()
        enableRequest.deviceID = "12345678-1234-1234-1234-123456789ABC"
        enableRequest.serviceUuid = "180A"
        enableRequest.characteristicUuid = "2A29"
        enableRequest.enable = true
        let enableData = try enableRequest.serializedData()

        try app.test(.POST, "v1/device/monitor", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: enableData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
        }

        // Test disable
        var disableRequest = Bleproxy_V1_MonitorRequest()
        disableRequest.deviceID = "12345678-1234-1234-1234-123456789ABC"
        disableRequest.serviceUuid = "180A"
        disableRequest.characteristicUuid = "2A29"
        disableRequest.enable = false
        let disableData = try disableRequest.serializedData()

        try app.test(.POST, "v1/device/monitor", beforeRequest: { req in
            req.headers.contentType = .protobuf
            req.body = ByteBuffer(data: disableData)
        }) { res in
            XCTAssertEqual(res.status, .ok)
        }
    }
}
