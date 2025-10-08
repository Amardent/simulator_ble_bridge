# BLE Proxy PRD — React Native wrapper + localhost CoreBluetooth server

**Filename:** `ble-proxy-prd.md`  
**Author:** Engineering  
**Date:** 2025-10-02

---

## Overview

The goal is to enable **BLE communications with non-bonded peripherals** from a React Native application running in simulators/emulators. Since iOS Simulator and Android Emulator do not provide access to Bluetooth hardware, this system reroutes BLE calls through a host-side server on macOS.

The solution consists of two main components:

1. **React Native BLE Proxy Library**

   - Wraps `react-native-ble-plx`.
   - Provides a **drop-in replacement** with identical API surface.
   - At runtime:
     - **Real devices** → call `react-native-ble-plx` directly.
     - **Simulators/Emulators** → proxy calls via `localhost:5050` to the host server.

2. **BLE Proxy Server**
   - A macOS CLI server implemented in Swift.
   - Exposes CoreBluetooth APIs over HTTP (for commands) and WebSocket (for events/streams).
   - Uses **protobuf3** messages for all communication.
   - Runs only on the host machine, bound to `127.0.0.1:5050`.

---

## Goals

- Support **iOS and Android** React Native apps.
- Handle **GATT-only** features (no L2CAP, pairing, or bonding).
- Proxy real physical peripherals only (no simulated devices in v1).
- Maintain **API parity** with `react-native-ble-plx`.
- Use **promises + event listeners** for async flows.
- Provide identical error codes to `react-native-ble-plx` plus an additional `ServerError`.
- Localhost-only, single-client design.

---

## Non-Goals

- No support for bonding/pairing or background restoration.
- No Linux or Windows host support.
- No virtual peripherals in v1.
- No TLS or authentication (localhost only).
- No multi-client support.
- No GUI — server logs suffice.

---

## System Architecture

+---------------------------+ +---------------------------+
| React Native App | | macOS BLE Proxy Server |
| (iOS/Android) | | (Swift CLI) |
| | | |
| BLE Proxy Wrapper | | ┌───────────────┐ |
| ├─ Real device → BLE-PLX | | | CoreBluetooth | |
| └─ Simulator → Localhost | <──HTTP/WS──> | └───────────────┘ |
+---------------------------+ +---------------------------+

markdown
Copy code

- **Wrapper**: Detects simulator vs device and routes calls.
- **Server**: Proxies BLE calls to CoreBluetooth and returns results via protobuf.

---

## App-Side Behaviors

The wrapper must expose the same API as `react-native-ble-plx`.

### Supported Functions

1. **Manager State**

   - `state()` — returns `.unknown`, `.resetting`, `.unsupported`, `.unauthorized`, `.poweredOff`, `.poweredOn`.

2. **Scanning**

   - `startDeviceScan(serviceUUIDs, options, callback)`
   - `stopDeviceScan()`

3. **Connection**

   - `connectToDevice(deviceId, options?)`
   - `cancelDeviceConnection(deviceId)`

4. **Discovery**

   - `discoverAllServicesAndCharacteristicsForDevice(deviceId)`
   - `servicesForDevice(deviceId)`
   - `characteristicsForDevice(deviceId, serviceUUID)`

5. **Read/Write**

   - `readCharacteristicForDevice(deviceId, serviceUUID, characteristicUUID)`
   - `writeCharacteristicWithResponseForDevice(...)`
   - `writeCharacteristicWithoutResponseForDevice(...)`

6. **Monitoring**

   - `monitorCharacteristicForDevice(deviceId, serviceUUID, characteristicUUID, callback)`

7. **Utilities**

   - `isDeviceConnected(deviceId)`
   - `readRSSIForDevice(deviceId)`

8. **Errors**
   - Same as `react-native-ble-plx`, with an extra `ServerError`.

---

## Server-Side Behaviors

- **Binding:** `127.0.0.1:5050` only.
- **Endpoints (HTTP, protobuf3):**

  - `/v1/health`
  - `/v1/scan/start`, `/v1/scan/stop`
  - `/v1/device/connect`, `/v1/device/disconnect`
  - `/v1/device/read`, `/v1/device/write`
  - `/v1/device/discover`
  - `/v1/device/rssi`

- **WebSocket (protobuf3 binary):**

  - `ManagerState`
  - `ScanResult`
  - `PeripheralConnected` / `PeripheralDisconnected`
  - `CharacteristicValueUpdated`
  - `ServerErrorEvent`

- **Identifiers:**

  - Use `CBPeripheral.identifier.UUIDString` to mimic iOS persistent IDs.

- **Logging:**
  - Log all commands, events, and errors to stdout/stderr.

---

## Example Protobuf (proto3)

```proto
syntax = "proto3";
package bleproxy.v1;

message StartScanRequest {
  repeated string service_uuids = 1;
}
message ScanResult {
  string device_id = 1;
  string local_name = 2;
  int32 rssi = 3;
  repeated string service_uuids = 4;
  bytes manufacturer_data = 5;
}
message ConnectRequest { string device_id = 1; }
message ConnectResponse { bool success = 1; }
message DisconnectRequest { string device_id = 1; }
message DisconnectResponse { bool success = 1; }

message ReadRequest {
  string device_id = 1;
  string service_uuid = 2;
  string characteristic_uuid = 3;
}
message ReadResponse {
  bytes value = 1;
  bool success = 2;
}

message WriteRequest {
  string device_id = 1;
  string service_uuid = 2;
  string characteristic_uuid = 3;
  bytes value = 4;
  bool with_response = 5;
}
message WriteResponse { bool success = 1; }

message ManagerState {
  enum State {
    UNKNOWN = 0;
    RESETTING = 1;
    UNSUPPORTED = 2;
    UNAUTHORIZED = 3;
    POWERED_OFF = 4;
    POWERED_ON = 5;
  }
  State state = 1;
}

message Error {
  int32 code = 1;
  string message = 2;
}
```

# Implementation Notes

- Server language: Swift recommended (tight CoreBluetooth integration).

- Distribution: dev-only CLI, installed separately from the RN library.

## Testing:

- Unit tests + local integration harness.

- No CI integration needed.

# Milestones

1. ✅ Proto + design finalization (Steps 1-2 complete)

2. ✅ Swift code to scan for ble peripherals (Step 3 complete)

3. ✅ Swift BLE core implementation complete - scanning, connection, discovery, read, write, monitor, RSSI, error handling (Steps 3-7 complete)

4. ✅ HTTP server foundation with Vapor framework and health endpoint (Step 8 complete)

5. ✅ Implementation of BLE operation HTTP endpoints (Step 9 complete)

6. ✅ WebSocket event broadcasting implementation (Step 10 complete)

7. Pending: RN wrapper prototype (drop-in replacement) (Steps 11-12)

8. Pending: Integration harness app (Steps 13-14)

9. Pending: Docs + polish (Step 15)

See `/Users/ericfrank/ble_bridge/process/README.md` for detailed step-by-step progress tracking.

# Acceptance Criteria

- Wrapper runs unchanged RN-ble-plx apps.

- In simulator:

  - Can scan, connect, read, write, subscribe, and disconnect against a real peripheral.

- Server logs every request/response.

- Protobuf schema is consistent across HTTP + WebSocket.
