# BLE Proxy Implementation Plan

This directory contains the step-by-step implementation plan for the BLE Proxy system, broken down into minimal, independently testable steps.

## Overview

The implementation follows the milestones outlined in `/Users/ericfrank/ble_bridge/project.md` and breaks them into 15 focused steps, each designed to be completed in 1-4 hours.

## Implementation Steps

### Phase 1: Protocol and Code Generation (Steps 1-2)

#### [Step 1: Finalize Protobuf Schema](step-01.md)
**Status:** ✅ Complete
**Objective:** Define complete protobuf3 schema for all client-server communication
**Estimated Time:** 1-2 hours
**Recommended Agent:** interface-architect
**Dependencies:** None

#### [Step 2: Generate Protobuf Code for Swift and JavaScript](step-02.md)
**Status:** ✅ Complete
**Objective:** Generate type-safe protobuf code for server and client
**Estimated Time:** 1 hour
**Recommended Agent:** build-automation-specialist
**Dependencies:** Step 1

### Phase 2: Swift BLE Core Implementation (Steps 3-7)

#### [Step 3: Swift BLE Manager - Scan for Peripherals](step-03.md)
**Status:** ✅ Complete
**Objective:** Create CoreBluetooth wrapper for peripheral scanning
**Estimated Time:** 2-3 hours
**Recommended Agent:** macos-bluetooth-expert
**Dependencies:** Step 2
**Completion Date:** 2025-10-05

#### [Step 4: Swift BLE Manager - Connect and Discover Services](step-04.md)
**Status:** ✅ Complete
**Objective:** Implement connection management and service/characteristic discovery
**Estimated Time:** 2-3 hours
**Recommended Agent:** macos-bluetooth-expert
**Dependencies:** Step 3
**Completion Date:** 2025-10-05

#### [Step 5: Swift BLE Manager - Read Characteristics](step-05.md)
**Status:** ✅ Complete
**Objective:** Implement characteristic read operations with timeout and error handling
**Estimated Time:** 2 hours
**Recommended Agent:** macos-bluetooth-expert
**Dependencies:** Step 4
**Completion Date:** 2025-10-06

#### [Step 6: Swift BLE Manager - Write Characteristics and Monitor Notifications](step-06.md)
**Status:** ✅ Complete
**Objective:** Implement write operations and notification monitoring
**Estimated Time:** 2-3 hours
**Recommended Agent:** macos-bluetooth-expert
**Dependencies:** Step 5
**Completion Date:** 2025-10-06

#### [Step 7: Swift BLE Manager - RSSI Reading and Error Handling](step-07.md)
**Status:** ✅ Complete
**Objective:** Implement RSSI reading and comprehensive error handling system
**Estimated Time:** 2 hours
**Recommended Agent:** macos-bluetooth-expert
**Dependencies:** Step 6
**Completion Date:** 2025-10-06

### Phase 3: Swift Server Implementation (Steps 8-10)

#### [Step 8: HTTP Server - Vapor Setup and Health Endpoint](step-08.md)
**Status:** ✅ Complete
**Objective:** Set up Vapor framework and implement basic HTTP server with health endpoint
**Estimated Time:** 2 hours
**Recommended Agent:** swift-backend-engineer
**Dependencies:** Step 7
**Completion Date:** 2025-10-07

#### [Step 9: HTTP Server - BLE Operation Endpoints](step-09.md)
**Status:** ✅ Complete
**Objective:** Implement all HTTP endpoints for BLE operations
**Estimated Time:** 3 hours
**Recommended Agent:** swift-backend-engineer
**Dependencies:** Step 8
**Completion Date:** 2025-10-07

#### [Step 10: WebSocket Server - Event Broadcasting](step-10.md)
**Status:** ✅ Complete
**Objective:** Implement WebSocket endpoint for streaming BLE events
**Estimated Time:** 2-3 hours
**Recommended Agent:** swift-backend-engineer
**Dependencies:** Step 9
**Completion Date:** 2025-10-07

### Phase 4: React Native Client (Steps 11-12)

#### [Step 11: React Native Wrapper - Project Setup and Platform Detection](step-11.md)
**Status:** ✅ Complete
**Objective:** Create library package structure and implement simulator detection
**Estimated Time:** 2 hours
**Recommended Agent:** react-native-library-developer
**Dependencies:** Step 2
**Completion Date:** 2025-10-07

#### [Step 12: React Native Wrapper - ProxyBleManager Implementation](step-12.md)
**Status:** ✅ Complete
**Objective:** Implement complete BLE manager that proxies to server
**Estimated Time:** 4 hours
**Recommended Agent:** react-native-library-developer
**Dependencies:** Steps 10, 11
**Completion Date:** 2025-10-11

### Phase 5: Integration and Polish (Steps 13-15)

#### [Step 13: Integration Harness - Test Application Setup](step-13.md)
**Status:** ✅ Complete
**Objective:** Create comprehensive React Native test app for validation
**Estimated Time:** 3 hours
**Recommended Agent:** react-native-app-developer
**Dependencies:** Step 12
**Completion Date:** 2025-10-11

#### [Step 14: Integration Testing and Bug Fixes](step-14.md)
**Status:** Not Started
**Objective:** Execute end-to-end testing, identify and fix bugs
**Estimated Time:** 4-6 hours
**Recommended Agent:** qa-integration-specialist
**Dependencies:** Step 13

#### [Step 15: Documentation and Polish](step-15.md)
**Status:** Partially Complete (BRIDGE_GUIDE.md created)
**Objective:** Create comprehensive documentation and prepare for release
**Estimated Time:** 4 hours
**Recommended Agent:** technical-writer
**Dependencies:** Step 14

## Dependency Graph

```
Step 1 (Proto Schema)
  └─> Step 2 (Code Generation)
        ├─> Step 3 (BLE Scan)
        │     └─> Step 4 (Connect/Discover)
        │           └─> Step 5 (Read)
        │                 └─> Step 6 (Write/Monitor)
        │                       └─> Step 7 (RSSI/Errors)
        │                             └─> Step 8 (Vapor Setup)
        │                                   └─> Step 9 (HTTP Endpoints)
        │                                         └─> Step 10 (WebSocket)
        │                                               └─> Step 12 (ProxyManager)
        │                                                     └─> Step 13 (Test App)
        │                                                           └─> Step 14 (Integration Testing)
        │                                                                 └─> Step 15 (Documentation)
        └─> Step 11 (RN Setup)
              └─> Step 12 (ProxyManager)
```

## Total Estimated Time

- **Phase 1 (Proto):** 2-3 hours
- **Phase 2 (BLE Core):** 10-13 hours
- **Phase 3 (Server):** 7-8 hours
- **Phase 4 (Client):** 6 hours
- **Phase 5 (Integration):** 11-14 hours

**Total:** 36-44 hours (approximately 1 week of focused work)

## Progress Tracking

Update the status of each step as work progresses:
- **Not Started** - No work has begun
- **In Progress** - Currently being implemented
- **Testing** - Implementation complete, undergoing testing
- **Complete** - Tested and verified
- **Blocked** - Cannot proceed due to dependencies or issues

## Notes

- Each step is designed to be independently testable
- Steps should be completed sequentially within each phase
- Cross-phase dependencies are minimal (Steps 11-12 can run parallel to Steps 3-10)
- All steps include specific acceptance criteria and testing instructions
- File paths are absolute to ensure clarity
- Physical BLE peripheral required for testing from Step 3 onwards

## Getting Started

1. Read `/Users/ericfrank/ble_bridge/project.md` for full requirements
2. Start with Step 1 (Protobuf Schema)
3. Follow each step sequentially
4. Verify acceptance criteria before moving to next step
5. Document any deviations or issues in step files

## File Naming Convention

- `step-XX.md` where XX is zero-padded step number (01-15)
- Each step file contains: Objective, Prerequisites, Technical Details, Acceptance Criteria, Testing Instructions, Dependencies, Risks/Blockers, Recommended Agent, Estimated Time

## Implementation Discoveries

### Step 3 Key Learnings (2025-10-05)

**Protobuf Type Naming:**
- All generated Swift protobuf types use `Bleproxy_V1_` prefix
  - Examples: `Bleproxy_V1_Device`, `Bleproxy_V1_ManagerState`, `Bleproxy_V1_Service`
- Must import `Generated` module: `import Generated`
- Enum cases use Swift camelCase: `.poweredOn`, `.unknown` (not `.POWERED_ON`)

**Optional Field Handling:**
- Protobuf optional fields have `has*` accessor properties
  - Example: `device.hasManufacturerData`, `device.hasTxPowerLevel`
  - Direct access returns default value: `device.manufacturerData` returns `Data()` if not set
  - Use `has*` check before accessing to distinguish unset from empty

**BLEManager Architecture:**
- Class is `public` (needed for server layer in Steps 8-10)
- Dedicated background queue: `DispatchQueue(label: "com.bleproxy.central", qos: .userInitiated)`
- All CoreBluetooth operations execute on this queue
- Callbacks execute on background queue (callers must dispatch to main if needed)
- Peripheral storage pattern: `[UUID: CBPeripheral]` dictionary
  - Prevents deallocation during scan/connection
  - Keyed by `peripheral.identifier` (stable UUID)

**Thread Safety:**
- All operations synchronized via background queue
- No separate locks needed when all access goes through queue
- Document thread behavior in public API comments

**Testing:**
- XCTest works well for integration testing with real peripherals
- Tests discovered actual BLE devices (verified signal strength, UUIDs)
- Use `XCTestExpectation` for async operations
- State callbacks must be checked before scanning

**CLI Tool Pattern:**
- Created `ble-scan` executable for manual testing
- Uses Swift Package Manager `.executableTarget`
- RunLoop.main.run() keeps process alive
- Signal handlers (SIGINT) for clean shutdown

### Step 4 Key Learnings (2025-10-05)

**Connection Timeout Implementation:**
- CoreBluetooth has no built-in connection timeout mechanism
- Implemented using `DispatchWorkItem` scheduled on background queue
- Timeout set to 60 seconds (liberal to accommodate slower peripherals)
- Timeout cancellation required in three delegate callbacks:
  - `didConnect` - Success case
  - `didFailToConnect` - Explicit failure case
  - `didDisconnectPeripheral` - Defensive cleanup
- Timeout work item stored in `[UUID: DispatchWorkItem]` dictionary for cleanup
- Timeout error message includes helpful context about pairing requirements

**Non-Bonded Peripheral Requirement:**
- Project scope explicitly excludes pairing/bonding support (GATT-only)
- Peripherals requiring pairing will cause connection timeouts (expected behavior)
- Connection attempts to paired devices hang waiting for authentication dialog
- This is a **feature limitation, not a bug**
- Compatible peripherals:
  - Development boards (nRF52, ESP32) with custom firmware
  - Fitness sensors in pairing mode
  - BLE beacons with readable characteristics
  - Simple environmental sensors
- Incompatible peripherals:
  - Apple devices (require pairing)
  - Previously paired fitness devices (must be reset)
  - Smart locks, security devices
  - Any device showing pairing dialog

**Service Discovery Pattern:**
- Two-phase discovery: services first, then characteristics per service
- Track completion using `Set<CBUUID>` for pending service UUIDs
- `didDiscoverCharacteristicsFor` called once per service
- Completion called only when all services have finished characteristic discovery
- Discovery state stored per peripheral UUID in `pendingCharacteristics` dictionary

**Protobuf Conversion for GATT Hierarchy:**
- `CBService` → `Bleproxy_V1_Service`
  - Properties: `uuid` (String), `isPrimary` (Bool), `characteristics` (Array)
  - Use `hasIsPrimary` to check if primary flag is set
- `CBCharacteristic` → `Bleproxy_V1_Characteristic`
  - Properties: `uuid` (String), `properties` (String Array), `descriptors` (Array)
  - Property strings: "read", "write", "writeWithoutResponse", "notify", "indicate", etc.
- `CBCharacteristicProperties` converted to string array for cross-platform compatibility
- Standard BLE UUIDs (16-bit) returned in short form: "180A", "2A29"
  - This is correct per BLE spec, tests should accept both forms

### Step 5 Key Learnings (2025-10-06)

**Service Caching Architecture:**
- Discovered services cached in `cachedServices: [UUID: [Bleproxy_V1_Service]]` dictionary
- Cache populated in `didDiscoverCharacteristicsFor` delegate (after full discovery)
- Read operations validate against cached services (no need to re-discover)
- Cache cleared on disconnect to force fresh discovery on reconnect
- Prevents race conditions between discovery completion and read requests

**Read Operation Timeout:**
- 10-second timeout for read operations (more liberal than 60s connection timeout)
- Uses same DispatchWorkItem pattern from Step 4 connection timeouts
- Timeout work item scheduled on background queue: `queue.asyncAfter(deadline: .now() + 10)`
- Timeout cancellation in two places:
  - `didUpdateValueFor` - Success case with value
  - `didUpdateValueFor` with error - Explicit failure case
- Timeout cleanup critical to prevent completion handler leaks

**CharacteristicKey Pattern:**
- Composite key for tracking per-characteristic operations:
  ```swift
  struct CharacteristicKey: Hashable {
      let deviceId: UUID
      let serviceUUID: CBUUID
      let characteristicUUID: CBUUID
  }
  ```
- Enables concurrent reads to different characteristics on same device
- Prevents collision between operations on same characteristic
- Used for both `pendingReads` and `readTimeouts` dictionaries
- Will be reused for write operations (Step 6) and monitor tracking (Step 6)

**Read vs Notification Disambiguation:**
- `didUpdateValueFor` delegate called for BOTH read responses and notifications
- Differentiate by checking `pendingReads` dictionary first:
  - If key exists in `pendingReads` → it's a read response, consume completion
  - If not in `pendingReads` → it's a notification, route to monitor callback
- Critical pattern for Step 6 (notifications) to avoid conflicting with reads
- Completion handlers removed from dictionary after calling (single use)
- Monitor callbacks remain in dictionary (persistent until disabled)

**Characteristic Property Validation:**
- Read operations validate `.read` property exists before attempting read
- Error returned immediately if characteristic not readable: `errorCharacteristicReadFailed`
- Validation uses `CBCharacteristicProperties.contains(.read)`
- Prevents CoreBluetooth silent failures or unexpected errors
- Same pattern will apply to write validation (`.write` or `.writeWithoutResponse`)

**Empty Value Handling:**
- `characteristic.value` can be nil (empty characteristic)
- Return empty `Data()` instead of nil for consistent API: `characteristic.value ?? Data()`
- Protobuf `bytes` field handles empty data gracefully
- Clients can check `data.count == 0` for empty values

**Disconnect Cleanup:**
- Enhanced `didDisconnectPeripheral` to clean up read state:
  - Clear cached services: `cachedServices.removeValue(forKey: uuid)`
  - Cancel all pending read timeouts for device
  - Call pending read completions with `errorDeviceDisconnected`
  - Prevents completion handler leaks on unexpected disconnect
- Cleanup pattern will extend to write timeouts and active monitors in Step 6

**Testing with Real Peripherals:**
- Successfully read Device Information Service (0x180A) characteristics
- Manufacturer Name (0x2A29) returned "Apple Inc." (10 bytes)
- Concurrent reads to different characteristics validated (no conflicts)
- Empty value handling tested with characteristics returning 0 bytes
- Timeout behavior verified (though requires slow/unresponsive peripheral)

### Step 6 Key Learnings (2025-10-06)

**Write Operations Architecture:**
- Dual write types: with response (timeout + confirmation) vs without response (immediate)
- Write with response uses 10-second timeout (consistent with Step 5 reads)
- Write without response checks `peripheral.canSendWriteWithoutResponse` for flow control
- `didWriteValueFor` delegate only called for writes with response
- Write timeouts use same `DispatchWorkItem` pattern as reads

**Write State Tracking:**
- `pendingWrites: [CharacteristicKey: (Result<Void, Error>) -> Void]` - Completion handlers
- `writeTimeouts: [CharacteristicKey: DispatchWorkItem]` - Timeout work items
- CharacteristicKey reused from Step 5 (deviceId + serviceUUID + characteristicUUID)
- Timeout cancellation in both success (`didWriteValueFor`) and error cases

**Monitor/Notification Architecture:**
- `activeMonitors: [CharacteristicKey: (Data) -> Void]` - Persistent callbacks
- Enable: `setNotifyValue(true, for: characteristic)` + store callback
- Disable: `setNotifyValue(false, for: characteristic)` + remove callback
- `didUpdateNotificationStateFor` delegate logs enable/disable confirmation
- Monitor callbacks fire on background queue (same as other operations)

**Read/Notification Disambiguation (CRITICAL):**
- `didUpdateValueFor` delegate handles BOTH reads and notifications
- Check order is critical:
  1. Check `pendingReads` FIRST → if found, it's a read response
  2. Early return after handling read
  3. Check `activeMonitors` SECOND → if found, it's a notification
- Without early return, reads could be misrouted to monitor callbacks
- This pattern allows reads and monitors on same characteristic without conflicts

**Disconnect Cleanup Extensions:**
- Step 6 added three cleanup sections to `didDisconnectPeripheral`:
  1. Write timeouts: cancel all `writeTimeouts` for device, remove from dictionary
  2. Pending writes: call completions with `errorDeviceDisconnected`, remove from dictionary
  3. Active monitors: remove all `activeMonitors` for device
- Prevents memory leaks and orphaned callbacks
- Complements existing cleanup from Steps 4-5 (connection timeouts, read state, service cache)

**Real-World Testing Results:**
- Tested with Fi-FC35D000113 device (Fi collar hardware)
- Target characteristic: `57B40012-2528-D6BC-B043-B49AF0EC06C1` (read, write)
- Test 1: Wrote safe data `0x01 0x02 0x03` → Write confirmed successfully
- Test 2: Wrote `"kittenss"` (8 bytes) → Write confirmed, device disconnected as expected
- Validates: write confirmation, timeout mechanism, disconnect detection
- Also tested with FB6418/FB8113 peripherals for discovery/monitoring

**Property Validation:**
- Write operations validate characteristic properties before attempting write:
  - `.write` → use `type: .withResponse`
  - `.writeWithoutResponse` → use `type: .withoutResponse`
- Monitor operations validate `.notify` or `.indicate` properties
- Validation returns specific error codes (`errorCharacteristicWriteFailed`, `errorCharacteristicNotifyChangeFailed`)

**Flow Control for Write Without Response:**
- Must check `peripheral.canSendWriteWithoutResponse` before each write
- If false, write fails immediately with error (no queuing in Step 6)
- Future enhancement: could implement queuing and wait for `peripheralIsReadyToSendWriteWithoutResponse`
- Current implementation favors fail-fast over automatic retry

**Implementation Notes:**
- All code in `/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEManager.swift`
- `writeCharacteristic` method: lines 473-639
- `monitorCharacteristic` method: lines 640-745
- `didWriteValueFor` delegate: lines 1247-1287
- `didUpdateNotificationStateFor` delegate: lines 1289-1303
- Extended `didUpdateValueFor` for notifications: lines 1233-1243
- Extended `didDisconnectPeripheral` for Step 6 cleanup: lines 1056-1073
- Tests in `/Users/ericfrank/ble_bridge/server/Tests/BLEProxyTests/WriteMonitorTests.swift`
- CLI test tools: `ble-write-monitor-test`, `ble-fi-test` in Sources/

### Step 8 Key Learnings (2025-10-07)

**Vapor Framework Integration:**
- Vapor 4.117.0 successfully integrated into Swift Package Manager project
- Top-level code pattern used instead of @main attribute (avoids module conflicts)
- Server binds to 127.0.0.1:5050 (localhost-only for security)
- Clean separation: main.swift → configure.swift → routes.swift → controllers

**Protobuf HTTP Integration:**
- Created reusable extensions for all future endpoints:
  - `HTTPMediaType.protobuf` - Content-type constant
  - `Request.decodeProto<T>()` - Generic protobuf request decoder
  - `Response.proto<T>()` - Generic protobuf response factory
  - `Response.error()` - BLEError to protobuf error conversion
- ByteBuffer → Data conversion required for protobuf deserialization
- NIOCore import needed for `Data(buffer:)` conversion

**Health Endpoint Implementation:**
- GET /v1/health returns Bleproxy_V1_HealthResponse
- Response fields: `ready: true`, `serverVersion: "1.0.0"`
- Protobuf serialization: 9 bytes for minimal health response
- Content-Type header: application/x-protobuf

**Testing Patterns:**
- Unit tests: 16 tests using XCTVapor framework
- Integration tests: curl + protoc decode validation
- Localhost binding verified with lsof (TCP 127.0.0.1:5050)
- Graceful shutdown tested with SIGINT signal

**Server Architecture:**
- Controllers/ directory pattern established for endpoint handlers
- Static methods for stateless endpoints (health)
- Actor-based controllers planned for Step 9 (stateful BLE operations)
- Placeholder comments in routes.swift document future endpoints

**Key Files Created:**
- Sources/BLEProxyServer/main.swift (11 lines)
- Sources/BLEProxyServer/configure.swift (13 lines)
- Sources/BLEProxyServer/routes.swift (22 lines)
- Sources/BLEProxyServer/Controllers/HealthController.swift (53 lines)
- Tests/BLEProxyTests/ServerTests.swift (343 lines, 16 tests)

**Design Decisions:**
- Vapor's built-in signal handling sufficient for graceful shutdown
- Protobuf extensions in HealthController.swift for easy reuse
- Testing mode application for unit tests: `Application(.testing)`
- Server configuration centralized in configure.swift

**Integration Points for Step 9:**
- BLEManager instantiation pattern: create in configure.swift, store in app.storage
- Actor isolation for thread-safe BLE operations
- withCheckedThrowingContinuation for callback → async/await bridging
- Response factory methods ready for all BLE endpoints

### Step 7 Key Learnings (2025-10-06)

**RSSI Reading Architecture:**
- `readRSSI(deviceId:completion:)` method with 10-second timeout (consistent with read/write operations)
- State tracking: `pendingRSSIReads: [UUID: (Result<Int32, Error>) -> Void]`
- Timeout tracking: `rssiTimeouts: [UUID: DispatchWorkItem]`
- Delegate: `peripheral(_:didReadRSSI:error:)` converts NSNumber to Int32 for protobuf compatibility
- Cleanup on disconnect: cancel timeouts, fail pending reads with `errorDeviceDisconnected`
- Location: BLEManager.swift lines 796-852 (readRSSI), lines 1386-1414 (delegate)

**Error Handling System:**
- BLEError struct wraps `Bleproxy_V1_BleErrorCode` protobuf enum
- `toProto()` method for HTTP layer conversion (Steps 8-10)
- All error codes 0-699 match react-native-ble-plx specification
- Server-specific codes 1000+ (`ERROR_SERVER_ERROR`, `ERROR_SERVER_TIMEOUT`, etc.)
- Timeout operations use code 3 (`ERROR_OPERATION_TIMED_OUT`) for BLE layer
- Code 1001 (`ERROR_SERVER_TIMEOUT`) reserved for HTTP/WebSocket timeouts
- BLEError provides convenience constructors for common errors
- Used consistently throughout BLEManager (52+ instances)

**RSSI Characteristics:**
- Values are negative integers (typically -30 to -100 dBm)
- Range validated: -120 to 0 dBm (theoretical limits per BLE spec)
- Can be read while scanning (advertisement RSSI) or connected (peripheral.readRSSI())
- RSSI fluctuates due to signal interference, distance, obstructions
- Testing showed variance of 5-20 dB typical for stationary devices
- Some peripherals may not support RSSI reading while connected (rare)

**Disconnect Cleanup Extensions:**
- Added RSSI cleanup to `didDisconnectPeripheral` (lines 1148-1158):
  - Cancel all `rssiTimeouts` for device
  - Call pending RSSI completions with `errorDeviceDisconnected`
  - Remove from dictionaries
- Complements existing cleanup from Steps 4-6
- Prevents memory leaks and orphaned completion handlers

**Real-World Testing:**
- 8/8 tests passing with physical peripherals
- RSSI values: -75 to -98 dBm observed in testing
- Multiple sequential reads validated (tested 3-5 consecutive reads)
- Disconnect cleanup verified (pending operations fail gracefully)
- CLI tool `ble-rssi-test` demonstrates practical usage with statistics

**Implementation Files:**
- RSSI reading: `/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEManager.swift` (lines 796-852, 1386-1414, 1148-1158)
- Error handling: `/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEError.swift` (44 lines)
- Tests: `/Users/ericfrank/ble_bridge/server/Tests/BLEProxyTests/RSSITests.swift` (397 lines, 8 test cases)
- CLI tool: `/Users/ericfrank/ble_bridge/server/Sources/BLERSSITool/main.swift` (196 lines)

**Design Decisions:**
- 10-second timeout chosen (not 5 seconds as spec suggested) for consistency with Step 5/6
- Error code 3 used for BLE operation timeouts (not 1001) - correct layer separation
- Int32 return type for protobuf compatibility (NSNumber conversion in delegate)
- Device UUID keying (not CharacteristicKey) since RSSI is per-device, not per-characteristic

### Step 9 Key Learnings (2025-10-07)

**BLEController Architecture:**
- Singleton pattern implementation: `BLEController.shared` with private BLEManager instance
- Thread safety inherited from BLEManager (no additional synchronization needed)
- All endpoints use async/await for clean API surface
- Location: `/Users/ericfrank/ble_bridge/server/Sources/BLEProxyServer/Controllers/BLEController.swift` (481 lines)

**Async/Await Bridging Pattern:**
- `withCheckedThrowingContinuation` bridges BLEManager callbacks to async/await
- Pattern prevents multiple resume calls (compiler enforced)
- Error handling: BLEError → protobuf via `bleError.toProto()`, generic errors wrapped
- Success/failure mapped to protobuf response messages with `success` boolean

**UUID Validation:**
- All endpoints validate device/service/characteristic UUIDs using `UUID(uuidString:)`
- Invalid UUIDs return `ERROR_INVALID_IDENTIFIERS` (code 5) immediately
- No CoreBluetooth operations attempted with malformed UUIDs

**Request Body Size Limiting:**
- Added `app.routes.defaultMaxBodySize = "1mb"` to configure.swift
- Protects against oversized payloads (BLE writes typically ~512 bytes max)
- HTTP 413 returned automatically by Vapor for oversized requests

**Empty Protobuf Handling:**
- Enhanced `Request.decodeProto()` to handle empty protobuf messages correctly
- StateRequest, StopScanRequest have no fields → return default instance on empty body
- Critical fix: `guard buffer.readableBytes > 0 else { return T() }`

**Services/Characteristics Endpoint Pattern:**
- `services()` and `characteristics()` return errors directing to `discover()` endpoint
- Rationale: Discovery populates cache, then read from cache (not supported in v1)
- Step 10 may reconsider if cache access needed for RN client convenience

**13 Endpoints Implemented:**
1. **state** - Synchronous, no continuation (direct BLEManager.getState() call)
2. **startScan** - Scan callback logged but not used (WebSocket in Step 10)
3. **stopScan** - Simple synchronous call
4. **connect** - 60s timeout handled by BLEManager
5. **disconnect** - Returns success even if already disconnected
6. **isConnected** - Synchronous status check
7. **discover** - 30s timeout, caches services in BLEManager
8. **services** - Returns error directing to discover endpoint
9. **characteristics** - Returns error directing to discover endpoint
10. **read** - 10s timeout, validates characteristic exists
11. **write** - 10s timeout if with_response, validates writable properties
12. **monitor** - Enable/disable notifications (values via WebSocket in Step 10)
13. **readRSSI** - 10s timeout, returns Int32 RSSI value

**Testing Strategy:**
- 33 unit tests in BLEControllerTests.swift (852 lines)
- HTTP layer testing only (no BLE hardware required)
- Test categories: UUID parsing (4), endpoint registration (13), protobuf decode (5), errors (8), edge cases (3)
- All tests passing with XCTVapor framework

**Logging Pattern:**
- Entry: `req.logger.info("POST /v1/device/connect")`
- Parameters: `req.logger.info("Connecting to device: \(deviceId)")`
- Errors: `req.logger.error("Invalid device UUID: \(deviceId)")`
- Success: `req.logger.info("Device connected successfully")`
- Consistent structured logging for debugging and monitoring

**Routes Registration:**
- All endpoints registered in routes.swift with clean hierarchy
- Pattern: `app.post("v1", "device", "connect") { req async throws -> Response in ... }`
- Health endpoint uses GET, all BLE operations use POST
- Placeholder comment for Step 10 WebSocket endpoint added

**Integration Points for Step 10:**
- Scan callbacks currently log only → need WebSocket broadcast
- State changes not propagated → need WebSocket state events
- Monitor callbacks stored but values not forwarded → need WebSocket notifications
- Disconnect events not broadcasted → need WebSocket disconnect events

**Real-World Validation:**
- Created `ble-amdt-test` CLI tool for end-to-end testing
- Validates: scan, connect, discover, write operations
- Tested with amdt_9c7cfd22 device (Fi collar hardware variant)
- Confirms: characteristic 4C3F067B-0003-4E8B-80AF-F4AA7553E25E write success
- Write confirmed: 1 byte (0x01) with response acknowledgment

**Performance Characteristics:**
- Server startup: <0.5s
- Endpoint response times: <5ms for synchronous operations
- BLE operation latency: 10-60s (hardware dependent, timeouts enforced)
- 33 tests execute in 0.085 seconds (unit tests only)

**Design Decisions:**
- Singleton over actor: BLEManager already thread-safe, no additional isolation needed
- Checked continuations: Prevents memory leaks, compiler-enforced single resume
- Services cache error: Step 10 may need cache access, but v1 requires fresh discovery
- Body size limit: 1MB chosen for safety margin (BLE writes typically 20-512 bytes)
- Empty protobuf fix: Enables endpoints with no request fields (state, stopScan)
