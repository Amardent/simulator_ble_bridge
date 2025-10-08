# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a BLE (Bluetooth Low Energy) proxy system enabling React Native apps running in iOS Simulator or Android Emulator to communicate with physical BLE peripherals. The project consists of two components:

1. **React Native BLE Proxy Library** - A drop-in replacement wrapper for `react-native-ble-plx`
2. **macOS BLE Proxy Server** - A Swift CLI server that exposes CoreBluetooth APIs via HTTP and WebSocket

## Architecture

The system uses a localhost proxy pattern:
- React Native apps detect if running on a simulator/emulator
- If simulator: route BLE calls to `localhost:5050`
- If real device: call `react-native-ble-plx` directly
- Server translates HTTP/WebSocket requests to CoreBluetooth calls

Communication uses **protobuf3** for all messages between client and server.

## Key Technical Constraints

- **GATT-only operations** - No L2CAP, pairing, or bonding support
- **Non-bonded peripherals only** - Devices requiring pairing/bonding are not supported (will cause connection timeouts)
- **Localhost-only** - Server binds to `127.0.0.1:5050` (no TLS/auth needed)
- **Single-client design** - One simulator connects to one server instance
- **macOS host only** - Server uses CoreBluetooth (iOS/macOS framework)
- **Physical peripherals only** - No virtual/simulated devices in v1

## API Surface

The wrapper must maintain **complete API parity** with `react-native-ble-plx`:
- Manager state queries
- Device scanning with service filters
- Connection management
- Service/characteristic discovery
- Read/write operations (with and without response)
- Characteristic monitoring (notifications/indications)
- RSSI reading

Error codes match `react-native-ble-plx` with one addition: `ServerError`.

## Server Endpoints

**HTTP (protobuf3 request/response):**
- `/v1/health`
- `/v1/scan/start`, `/v1/scan/stop`
- `/v1/device/connect`, `/v1/device/disconnect`
- `/v1/device/read`, `/v1/device/write`
- `/v1/device/discover`
- `/v1/device/rssi`

**WebSocket (protobuf3 binary events):**
- `ManagerState` - Bluetooth adapter state changes
- `ScanResult` - Discovered peripherals
- `PeripheralConnected` / `PeripheralDisconnected`
- `CharacteristicValueUpdated` - Notification/indication data
- `ServerErrorEvent`

## Device Identifiers

Use `CBPeripheral.identifier.UUIDString` for device IDs to maintain consistency with iOS's persistent peripheral identifiers.

## Protobuf Schema

See project.md:148-204 for complete protobuf3 definitions. Key messages:
- `StartScanRequest`, `ScanResult`
- `ConnectRequest`, `ConnectResponse`
- `ReadRequest`, `ReadResponse`
- `WriteRequest`, `WriteResponse`
- `ManagerState`, `Error`

## Implementation Milestones

1. ✅ Finalize protobuf schema (Step 1)
2. ✅ Generate protobuf code (Step 2)
3. ✅ Swift BLE scanning (Step 3)
4. ✅ Swift BLE connection and service discovery (Step 4)
5. ✅ Swift BLE read operations (Step 5)
6. ✅ Swift BLE write/monitor operations (Step 6)
7. ✅ Swift BLE RSSI and error handling (Step 7)
8. ✅ Swift HTTP server with Vapor framework (Step 8)
9. ✅ HTTP endpoints for BLE operations (Step 9)
10. WebSocket event broadcasting (Step 10)
11. React Native wrapper prototype (Steps 11-12)
12. Integration harness app (Steps 13-14)
13. Documentation (Step 15)

## Swift Implementation Patterns

### Protobuf Integration

**Type Naming:**
- All generated Swift protobuf types use `Bleproxy_V1_` prefix
- Examples: `Bleproxy_V1_Device`, `Bleproxy_V1_ManagerState`, `Bleproxy_V1_Service`, `Bleproxy_V1_Characteristic`
- Import required: `import Generated`
- Enum cases use Swift camelCase: `.poweredOn`, `.errorUnknown` (not uppercase)

**Optional Fields:**
- Protobuf optional fields generate `has*` accessor properties
- Example: `device.hasManufacturerData`, `service.hasIsPrimary`
- Direct access returns default value if unset
- Always use `has*` to distinguish unset from empty

### BLEManager Architecture

**Class Design:**
- BLEManager is `public class` (required for server layer access)
- All CoreBluetooth operations execute on dedicated background queue:
  ```swift
  private let queue = DispatchQueue(label: "com.bleproxy.central", qos: .userInitiated)
  ```
- Callbacks execute on background queue (callers must dispatch to main if updating UI)

**Peripheral Storage:**
- Store peripherals by UUID to prevent deallocation: `[UUID: CBPeripheral]`
- Use `peripheral.identifier` as key (stable across discoveries)
- Dictionary access synchronized via background queue (no additional locks needed)
- Separate storage for discovered and connected peripherals:
  - `discoveredPeripherals` - Found during scan
  - `connectedPeripherals` - Successfully connected

**Connection Management:**
- Connection timeout using `DispatchWorkItem` pattern
- Timeout duration: 60 seconds (liberal to accommodate slower peripherals)
- Timeout cancellation in three delegate methods:
  - `didConnect` - Success case
  - `didFailToConnect` - Explicit failure
  - `didDisconnectPeripheral` - Defensive cleanup
- Store timeout work items in `[UUID: DispatchWorkItem]` dictionary
- Schedule timeout on background queue using `queue.asyncAfter`

**Service Discovery:**
- Two-phase discovery: services first, then characteristics per service
- Track completion using `Set<CBUUID>` for pending service UUIDs
- Cache discovered services in `[UUID: [Bleproxy_V1_Service]]` dictionary
- Discovery completion called when all services have characteristics discovered

**Device Identifiers:**
- Use `peripheral.identifier.uuidString` for device IDs
- Format: Standard UUID string (e.g., "8C80878D-A1C8-DAFE-90CA-7C8C7A847CC1")
- IDs are stable and persistent across app launches

### Error Handling

**Error Code System:**
- Complete error enum defined in protobuf: `Bleproxy_V1_BleErrorCode`
- Includes all react-native-ble-plx error codes (0-599)
- Swift `BLEError` struct wraps protobuf error codes:
  ```swift
  public struct BLEError: Error {
      public let code: Bleproxy_V1_BleErrorCode
      public let message: String
      public func toProto() -> Bleproxy_V1_Error
  }
  ```
- Server responses use `Bleproxy_V1_Error` message type

### Testing Patterns

**Integration Testing:**
- Use XCTest with real BLE hardware for validation
- `XCTestExpectation` for async CoreBluetooth operations
- State callbacks must resolve before operations (e.g., wait for `.poweredOn` before scanning)
- Tests can discover and interact with actual peripherals

**Peripheral Requirements:**
- **Non-bonded (unpaired) peripherals only** - Project scope excludes pairing/bonding
- Compatible peripherals:
  - Development boards (nRF52, ESP32) with custom firmware
  - Fitness sensors in pairing mode (not previously paired)
  - BLE beacons with readable characteristics
  - Environmental sensors without security
- Incompatible peripherals (will cause timeouts):
  - Apple devices (AirPods, Watch, etc.) - require pairing
  - Previously paired devices - must be unpaired/reset first
  - Smart locks, security devices - require authentication
  - Any device showing pairing dialog on connection
- Connection attempts to paired devices will timeout after 60 seconds (expected behavior)

**CLI Tools:**
- Create executable targets for manual testing: `.executableTarget(name: "ToolName", ...)`
- Use `RunLoop.main.run()` to keep process alive
- Signal handlers (SIGINT) for graceful shutdown
- Examples:
  - `ble-scan` - Continuous peripheral discovery
  - `ble-write-monitor-test` - General write/monitor testing
  - `ble-fi-test` - Specific test for Fi-FC35D000113 device (validates write operations)

### Thread Safety

**Queue-Based Synchronization:**
- Single background queue for all CoreBluetooth operations
- All peripheral/state mutations happen on this queue
- No separate locks needed when all access is queue-synchronized
- Document callback threading in public API comments

### File Organization

**Package Structure:**
```
server/
├── Sources/
│   ├── Generated/          # Protobuf generated code
│   ├── BLEProxy/           # BLE implementation (BLEManager, BLEError)
│   └── BLEScanTool/        # CLI tools
├── Tests/
│   └── BLEProxyTests/      # XCTest integration tests
└── Package.swift           # Swift Package Manager manifest
```

## Development Commands

**Build:**
```bash
cd server
swift build
```

**Test:**
```bash
swift test
swift test --filter BLEManagerTests  # Run specific test suite
```

**Run CLI Tools:**
```bash
swift run ble-scan               # Scan for all BLE peripherals
swift run ble-write-monitor-test # Test write/monitor on FB* devices
swift run ble-fi-test            # Test write to Fi-FC35D000113
swift run ble-rssi-test          # Read RSSI with statistics
swift run ble-amdt-test          # Test AMDT device Identify characteristic write
swift build -c release           # Build optimized binaries
.build/release/ble-scan          # Run optimized binary
```

**CLI Tool Details:**

- **ble-scan**: Continuous peripheral scanner with RSSI tracking and service discovery
- **ble-write-monitor-test**: Write and notification monitoring on FB6418/FB8113 test devices
- **ble-fi-test**: Specialized test for Fi-FC35D000113 collar hardware (write-triggered disconnect validation)
- **ble-rssi-test**: Multiple RSSI reads with min/max/avg/stddev statistics
- **ble-amdt-test**: Auto-detects and tests AMDT devices (prefix "amdt_"), writes value 1 to Identify characteristic (4C3F067B-0003-*), validates write success with optional read-back

**Validated Peripherals:**
- **AMDT devices** (amdt_9c7cfd22): Identify characteristic write validated (4C3F067B-0003-4E8B-80AF-F4AA7553E25E)
- **Fi-FC35D000113**: Write operations validated (characteristic 57B40012*)
- **FB6418, FB8113**: Scanning and discovery validated
- **Multiple Apple devices**: Read operations validated (Device Information Service)
