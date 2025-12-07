# BLE Bridge User Guide

A system enabling BLE communications from React Native apps running in iOS Simulator and Android Emulator.

## Overview

iOS Simulator and Android Emulator don't have access to Bluetooth hardware. This system solves that by routing BLE operations through a localhost server on your macOS development machine.

**Components:**
1. **BLE Proxy Server** (Swift) - macOS CLI exposing CoreBluetooth via HTTP/WebSocket
2. **react-native-ble-proxy** (TypeScript) - Drop-in replacement for `react-native-ble-plx`

## Key Limitations

**Must understand before using:**

- **Non-bonded peripherals only** - Devices requiring pairing cause 60s connection timeouts
- **GATT-only** - No L2CAP, pairing, or bonding support
- **macOS host required** - Server uses CoreBluetooth
- **Localhost only** - Server binds to 127.0.0.1:5050

**Compatible peripherals:** Development boards (nRF52, ESP32), fitness sensors in pairing mode, BLE beacons, environmental sensors.

**Incompatible peripherals:** Apple devices (AirPods, Watch), previously paired devices, smart locks, any device showing a pairing dialog.

## Quick Start

### 1. Start the Server

```bash
cd server
swift build
swift run ble-proxy-server
```

Server runs on `http://127.0.0.1:5050`. Keep running while using the simulator.

### 2. Install the Client Library

```bash
npm install react-native-ble-proxy react-native-ble-plx
```

### 3. Use in Your App

```typescript
import { createBleManager } from 'react-native-ble-proxy';

// Auto-detects simulator/emulator and routes accordingly
const bleManager = createBleManager();

// Use exactly like react-native-ble-plx
bleManager.startDeviceScan(null, null, (error, device) => {
  if (device) {
    console.log('Found:', device.name, device.rssi);
  }
});
```

## Configuration

### Environment Variables

```bash
# Force proxy on real device (testing)
BLE_FORCE_PROXY=true

# Disable proxy on simulator (testing)
BLE_FORCE_PROXY=false

# Custom proxy URL
BLE_PROXY_URL=http://192.168.1.100:5050
```

### Platform Detection

```typescript
import { PlatformDetector } from 'react-native-ble-proxy';

PlatformDetector.isSimulator();     // true in simulator/emulator
PlatformDetector.shouldUseProxy();  // respects env overrides
PlatformDetector.getProxyUrl();     // default: http://localhost:5050
```

## API Reference

The library provides 100% API compatibility with `react-native-ble-plx`. All methods work identically:

| Method | Description |
|--------|-------------|
| `state()` | Get Bluetooth adapter state |
| `startDeviceScan()` | Scan for peripherals |
| `stopDeviceScan()` | Stop scanning |
| `connectToDevice()` | Connect to peripheral |
| `cancelDeviceConnection()` | Disconnect |
| `discoverAllServicesAndCharacteristicsForDevice()` | Discover GATT |
| `readCharacteristicForDevice()` | Read characteristic value |
| `writeCharacteristicWithResponseForDevice()` | Write with confirmation |
| `writeCharacteristicWithoutResponseForDevice()` | Write without confirmation |
| `monitorCharacteristicForDevice()` | Subscribe to notifications |
| `readRSSIForDevice()` | Read signal strength |

## Error Codes

All error codes match `react-native-ble-plx` (0-601) plus:

| Code | Name | When |
|------|------|------|
| 3 | OperationTimedOut | BLE operation timeout |
| 102 | BluetoothPoweredOff | Bluetooth is off |
| 200 | DeviceConnectionFailed | Connection failed (check if device needs pairing) |
| 201 | DeviceDisconnected | Device disconnected |
| 205 | DeviceNotConnected | Operation on disconnected device |
| **1000** | **ServerError** | **Proxy server communication error** |

## Troubleshooting

### Connection times out after 60 seconds
**Cause:** Attempting to connect to a bonded/paired device.
**Solution:** Use a non-bonded peripheral. Check System Settings > Bluetooth and unpair the device if necessary.

### No scan results
1. Ensure server is running before starting the app
2. Verify Bluetooth is on (state should be `PoweredOn`)
3. Ensure peripheral is advertising

### Simulator not using proxy
1. Verify `createBleManager()` is used (not direct `BleManager` import)
2. Check `PlatformDetector.shouldUseProxy()` returns true
3. Verify `BLE_FORCE_PROXY` isn't set to `false`

### Server won't start
1. Check port 5050 isn't in use: `lsof -i :5050`
2. Ensure Bluetooth is enabled in System Settings
3. Grant Terminal Bluetooth permission if prompted

## Prerequisites

- macOS 14+ with Bluetooth
- Xcode 15+ and Swift 5.9+
- Node.js 16+
- React Native 0.70+
- Physical BLE peripheral for testing
