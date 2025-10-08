import Vapor
import SwiftProtobuf
import Generated
import BLEProxy
import NIOCore

// MARK: - Protobuf Extensions

extension HTTPMediaType {
    static let protobuf = HTTPMediaType(type: "application", subType: "x-protobuf")
}

extension Request {
    /// Decode protobuf message from request body
    func decodeProto<T: SwiftProtobuf.Message>(_ type: T.Type) throws -> T {
        guard let buffer = self.body.data else {
            // Empty body is valid for protobuf messages with no required fields
            // Return default instance
            return T()
        }
        // Convert ByteBuffer to Data
        let data = Data(buffer: buffer)
        // Handle empty data (valid for messages with all optional fields)
        if data.isEmpty {
            return T()
        }
        return try T(serializedBytes: data)
    }
}

extension Response {
    /// Create Response from protobuf message
    static func proto<T: SwiftProtobuf.Message>(_ message: T, status: HTTPStatus = .ok) throws -> Response {
        let data = try message.serializedData()
        let response = Response(status: status)
        response.headers.contentType = .protobuf
        response.body = .init(data: data)
        return response
    }

    /// Create error Response from BLEError
    static func error(_ bleError: BLEError, status: HTTPStatus = .badRequest) throws -> Response {
        return try proto(bleError.toProto(), status: status)
    }
}

// MARK: - Health Controller

struct HealthController {
    static func health(_ req: Request) async throws -> Response {
        // Use generated protobuf type (with Bleproxy_V1_ prefix)
        var response = Bleproxy_V1_HealthResponse()
        response.serverVersion = "1.0.0"
        response.ready = true

        return try Response.proto(response)
    }
}
