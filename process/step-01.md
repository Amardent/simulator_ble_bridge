# Step 1: Finalize Protobuf Schema

## Objective
Define and validate the complete protobuf3 schema for all client-server communication, ensuring it covers all required BLE operations with proper message structures.

## Prerequisites
- None (first step)
- Access to proto3 specification
- Understanding of react-native-ble-plx API surface

## Technical Details

### File Location
`/Users/ericfrank/ble_bridge/proto/ble_proxy.proto`

### Required Messages

#### Request Messages
- `HealthRequest` (empty)
- `HealthResponse` (string version, bool ready)
- `StartScanRequest` (repeated string service_uuids, map<string,string> options)
- `StopScanRequest` (empty)
- `ConnectRequest` (string device_id, map<string,string> options)
- `DisconnectRequest` (string device_id)
- `DiscoverRequest` (string device_id)
- `ReadRequest` (string device_id, string service_uuid, string characteristic_uuid)
- `WriteRequest` (string device_id, string service_uuid, string characteristic_uuid, bytes value, bool with_response)
- `MonitorRequest` (string device_id, string service_uuid, string characteristic_uuid, bool enable)
- `RSSIRequest` (string device_id)

#### Response Messages
- `ConnectResponse` (bool success, Error error)
- `DisconnectResponse` (bool success, Error error)
- `DiscoverResponse` (repeated Service services, Error error)
- `ReadResponse` (bytes value, Error error)
- `WriteResponse` (bool success, Error error)
- `RSSIResponse` (int32 rssi, Error error)

#### Event Messages (WebSocket)
- `ManagerState` (State state enum)
- `ScanResult` (string device_id, string local_name, int32 rssi, repeated string service_uuids, bytes manufacturer_data, int64 timestamp)
- `PeripheralConnected` (string device_id)
- `PeripheralDisconnected` (string device_id, Error error)
- `CharacteristicValueUpdated` (string device_id, string service_uuid, string characteristic_uuid, bytes value)
- `ServerErrorEvent` (Error error)

#### Data Structures
- `Service` (string uuid, repeated Characteristic characteristics)
- `Characteristic` (string uuid, repeated string properties, repeated Descriptor descriptors)
- `Descriptor` (string uuid)
- `Error` (int32 code, string message)

#### Enums
- `ManagerState.State`: UNKNOWN=0, RESETTING=1, UNSUPPORTED=2, UNAUTHORIZED=3, POWERED_OFF=4, POWERED_ON=5
- `ErrorCode`: UNKNOWN=0, BLUETOOTH_LE_NOT_SUPPORTED=1, BLUETOOTH_MANAGER_DESTROYED=2, BLUETOOTH_POWERED_OFF=100, BLUETOOTH_RESETTING=101, BLUETOOTH_UNAUTHORIZED=102, BLUETOOTH_UNSUPPORTED=103, BLUETOOTH_STATE_CHANGE_FAILED=104, DEVICE_CONNECTION_FAILED=200, DEVICE_DISCONNECTED=201, DEVICE_RSSI_READ_FAILED=202, DEVICE_ALREADY_CONNECTED=203, DEVICE_NOT_FOUND=204, DEVICE_NOT_CONNECTED=205, DEVICE_MTU_CHANGE_FAILED=206, SCANNING_START_FAILED=300, SCANNING_IN_PROGRESS=301, SERVICE_DISCOVERY_FAILED=400, SERVICES_NOT_DISCOVERED=401, SERVICES_NOT_FOUND=402, CHARACTERISTIC_READ_FAILED=500, CHARACTERISTIC_WRITE_FAILED=501, CHARACTERISTIC_NOTIFY_CHANGE_FAILED=502, CHARACTERISTIC_NOT_FOUND=503, DESCRIPTOR_READ_FAILED=600, DESCRIPTOR_WRITE_FAILED=601, DESCRIPTOR_NOT_FOUND=602, SERVER_ERROR=1000

### Wrapper Message
- `WsEvent` (oneof event: ManagerState, ScanResult, PeripheralConnected, PeripheralDisconnected, CharacteristicValueUpdated, ServerErrorEvent) - for WebSocket framing

## Acceptance Criteria
- [ ] Complete proto file compiles without errors
- [ ] All error codes from react-native-ble-plx are included
- [ ] ServerError (code 1000) is added
- [ ] All HTTP endpoints have request/response message pairs
- [ ] All WebSocket events are defined
- [ ] Service/Characteristic/Descriptor hierarchy is complete
- [ ] UUID fields use string type (not bytes)
- [ ] Binary data (values, manufacturer_data) uses bytes type
- [ ] Options maps are defined as map<string,string>
- [ ] Package name is `bleproxy.v1`

## Testing Instructions
```bash
# Install protoc if not present
brew install protobuf

# Validate proto syntax
protoc --proto_path=/Users/ericfrank/ble_bridge/proto \
  --descriptor_set_out=/dev/null \
  /Users/ericfrank/ble_bridge/proto/ble_proxy.proto

# Generate Swift code (test)
protoc --proto_path=/Users/ericfrank/ble_bridge/proto \
  --swift_out=/tmp/proto_test \
  /Users/ericfrank/ble_bridge/proto/ble_proxy.proto

# Generate JavaScript code (test)
npm install -g protobufjs
pbjs -t static-module -w commonjs \
  /Users/ericfrank/ble_bridge/proto/ble_proxy.proto \
  -o /tmp/proto_test.js
```

## Dependencies
- protoc compiler (v3.0+)
- Swift protobuf plugin (for validation)
- protobufjs (for JavaScript validation)

## Risks/Blockers
- Error code mapping must exactly match react-native-ble-plx
- Field numbering must remain stable for future versions
- Need to verify characteristic properties encoding (string array vs enum)
- WebSocket framing strategy (length prefix vs delimited vs wrapper message)

## Recommended Agent
interface-architect

## Estimated Time
1-2 hours
