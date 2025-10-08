import XCTest
@testable import BLEProxyServer
@testable import BLEProxy
@testable import Generated

/// Tests for WebSocket event broadcasting functionality (Step 10)
///
/// Note: Full WebSocket integration tests use Python test client (/tmp/ws_test.py).
/// These unit tests verify protobuf serialization/deserialization for all WebSocket event types.
final class WebSocketTests: XCTestCase {

    // MARK: - Protobuf Serialization Tests

    /// Test: ManagerStateEvent structure and serialization
    func testManagerStateEventStructure() throws {
        var stateEvent = Bleproxy_V1_ManagerStateEvent()
        stateEvent.state = .poweredOn
        stateEvent.timestamp = 1234567890000

        var wsEvent = Bleproxy_V1_WsEvent()
        wsEvent.managerStateEvent = stateEvent

        let data = try wsEvent.serializedData()
        let parsed = try Bleproxy_V1_WsEvent(serializedBytes: data)

        // Verify event parsed correctly
        XCTAssertEqual(parsed.managerStateEvent.state, .poweredOn)
        XCTAssertEqual(parsed.managerStateEvent.timestamp, 1234567890000)
    }

    /// Test: ScanResultEvent structure and serialization
    func testScanResultEventStructure() throws {
        var device = Bleproxy_V1_Device()
        device.id = "TEST-UUID-1234"
        device.rssi = -50

        var scanEvent = Bleproxy_V1_ScanResultEvent()
        scanEvent.device = device
        scanEvent.timestamp = 1234567890000

        var wsEvent = Bleproxy_V1_WsEvent()
        wsEvent.scanResultEvent = scanEvent

        let data = try wsEvent.serializedData()
        let parsed = try Bleproxy_V1_WsEvent(serializedBytes: data)

        // Verify event parsed correctly
        XCTAssertEqual(parsed.scanResultEvent.device.id, "TEST-UUID-1234")
        XCTAssertEqual(parsed.scanResultEvent.device.rssi, -50)
        XCTAssertEqual(parsed.scanResultEvent.timestamp, 1234567890000)
    }

    /// Test: PeripheralConnectedEvent structure and serialization
    func testPeripheralConnectedEventStructure() throws {
        var connectedEvent = Bleproxy_V1_PeripheralConnectedEvent()
        connectedEvent.deviceID = "CONNECTED-UUID"
        connectedEvent.timestamp = 1234567890000

        var wsEvent = Bleproxy_V1_WsEvent()
        wsEvent.peripheralConnectedEvent = connectedEvent

        let data = try wsEvent.serializedData()
        let parsed = try Bleproxy_V1_WsEvent(serializedBytes: data)

        // Verify event parsed correctly
        XCTAssertEqual(parsed.peripheralConnectedEvent.deviceID, "CONNECTED-UUID")
        XCTAssertEqual(parsed.peripheralConnectedEvent.timestamp, 1234567890000)
    }

    /// Test: PeripheralDisconnectedEvent structure and serialization
    func testPeripheralDisconnectedEventStructure() throws {
        var disconnectedEvent = Bleproxy_V1_PeripheralDisconnectedEvent()
        disconnectedEvent.deviceID = "DISCONNECTED-UUID"
        disconnectedEvent.timestamp = 1234567890000

        var bleError = Bleproxy_V1_Error()
        bleError.code = 2  // ERROR_DEVICE_DISCONNECTED
        bleError.message = "Test disconnect"
        disconnectedEvent.error = bleError

        var wsEvent = Bleproxy_V1_WsEvent()
        wsEvent.peripheralDisconnectedEvent = disconnectedEvent

        let data = try wsEvent.serializedData()
        let parsed = try Bleproxy_V1_WsEvent(serializedBytes: data)

        // Verify event parsed correctly
        XCTAssertEqual(parsed.peripheralDisconnectedEvent.deviceID, "DISCONNECTED-UUID")
        XCTAssertEqual(parsed.peripheralDisconnectedEvent.timestamp, 1234567890000)
        XCTAssertEqual(parsed.peripheralDisconnectedEvent.error.code, 2)
        XCTAssertEqual(parsed.peripheralDisconnectedEvent.error.message, "Test disconnect")
    }

    /// Test: CharacteristicValueUpdatedEvent structure and serialization
    func testCharacteristicValueUpdatedEventStructure() throws {
        var notificationEvent = Bleproxy_V1_CharacteristicValueUpdatedEvent()
        notificationEvent.deviceID = "NOTIFY-UUID"
        notificationEvent.serviceUuid = "SERVICE-UUID"
        notificationEvent.characteristicUuid = "CHAR-UUID"
        notificationEvent.value = Data([0x01, 0x02, 0x03, 0x04, 0x05])
        notificationEvent.timestamp = 1234567890000

        var wsEvent = Bleproxy_V1_WsEvent()
        wsEvent.characteristicValueUpdatedEvent = notificationEvent

        let data = try wsEvent.serializedData()
        let parsed = try Bleproxy_V1_WsEvent(serializedBytes: data)

        // Verify event parsed correctly
        XCTAssertEqual(parsed.characteristicValueUpdatedEvent.deviceID, "NOTIFY-UUID")
        XCTAssertEqual(parsed.characteristicValueUpdatedEvent.serviceUuid, "SERVICE-UUID")
        XCTAssertEqual(parsed.characteristicValueUpdatedEvent.characteristicUuid, "CHAR-UUID")
        XCTAssertEqual(parsed.characteristicValueUpdatedEvent.value, Data([0x01, 0x02, 0x03, 0x04, 0x05]))
        XCTAssertEqual(parsed.characteristicValueUpdatedEvent.timestamp, 1234567890000)
    }

    /// Test: Binary serialization produces non-empty data
    func testBinarySerialization() throws {
        var stateEvent = Bleproxy_V1_ManagerStateEvent()
        stateEvent.state = .poweredOn
        stateEvent.timestamp = 1000

        var wsEvent = Bleproxy_V1_WsEvent()
        wsEvent.managerStateEvent = stateEvent

        let data = try wsEvent.serializedData()

        // Verify binary data is not empty
        XCTAssertGreaterThan(data.count, 0, "Serialized protobuf should not be empty")

        // Verify data can be deserialized back
        let parsed = try Bleproxy_V1_WsEvent(serializedBytes: data)
        XCTAssertEqual(parsed.managerStateEvent.state, .poweredOn)
    }
}
