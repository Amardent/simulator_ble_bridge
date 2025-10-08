import Foundation
import Generated

/// BLEError wraps protobuf error codes with Swift Error conformance
/// This provides a bridge between CoreBluetooth errors and the protobuf error system
public struct BLEError: Error {

    /// The protobuf error code
    public let code: Bleproxy_V1_BleErrorCode

    /// Human-readable error message
    public let message: String

    /// Initializes a BLEError with a code and message
    /// - Parameters:
    ///   - code: The protobuf error code
    ///   - message: A descriptive error message
    public init(code: Bleproxy_V1_BleErrorCode, message: String) {
        self.code = code
        self.message = message
    }

    /// Converts this error to a protobuf Error message
    /// - Returns: Populated Bleproxy_V1_Error instance
    public func toProto() -> Bleproxy_V1_Error {
        var error = Bleproxy_V1_Error()
        error.code = Int32(code.rawValue)
        error.message = message
        return error
    }
}

extension BLEError: LocalizedError {
    public var errorDescription: String? {
        return message
    }
}

extension BLEError: CustomStringConvertible {
    public var description: String {
        return "BLEError(\(code), \"\(message)\")"
    }
}
