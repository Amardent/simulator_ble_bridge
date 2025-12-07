# BLE Proxy Test App

React Native test application for the BLE Proxy system.

## Quick Start

### 1. Start the BLE Proxy Server
```bash
cd /Users/ericfrank/ble_bridge/server
swift run ble-proxy-server
```

Server must be running on `localhost:5050` before launching the app.

### 2. Run the App
```bash
cd /Users/ericfrank/ble_bridge/BleProxyTestApp
npm run ios
```

## Features

- **BLE State Monitor**: Real-time Bluetooth adapter state display
- **Device Scanning**: Discover nearby BLE peripherals with RSSI
- **Connection Management**: Connect/disconnect from devices
- **Service Discovery**: Automatic discovery of all services and characteristics
- **Read Operations**: Read characteristic values
- **Write Operations**: Write hex values to characteristics
- **Notifications**: Monitor characteristic notifications
- **RSSI Reading**: Read current signal strength

## Usage

1. **Scan for Devices**
   - Tap "Start Scan" to discover nearby BLE peripherals
   - Devices appear with name, UUID, and RSSI
   - Scan auto-stops after 10 seconds

2. **Connect to Device**
   - Tap any discovered device to connect
   - App automatically discovers services and characteristics
   - Navigate to device details screen

3. **Read Characteristics**
   - Tap "Read" button on any readable characteristic
   - Value displays in Alert (base64 format)

4. **Write Characteristics**
   - Enter hex value in text input (e.g., "01FF")
   - Tap "Write" button on writable characteristic
   - Success confirmation shows in Alert

5. **Monitor Notifications**
   - Tap "Monitor" button on notifiable characteristic
   - Receives notifications for 30 seconds
   - Each notification shows in Alert

6. **Read RSSI**
   - Tap "Read RSSI" button
   - Current signal strength shows in Alert and header

7. **Disconnect**
   - Tap "Disconnect" button
   - Returns to scan screen

## Architecture

- **App.tsx**: Navigation setup and global BLE manager
- **StateMonitor.tsx**: BLE state visualization
- **ScanScreen.tsx**: Device discovery UI
- **DeviceScreen.tsx**: Service/characteristic operations

## Dependencies

- `react-native-ble-proxy`: Local BLE proxy library
- `react-native-ble-plx`: BLE library (peer dependency)
- `@react-navigation/*`: Navigation framework

## Platform Detection

The app automatically detects if running in simulator/emulator:
- **Simulator**: Routes all BLE calls to proxy server (localhost:5050)
- **Physical Device**: Uses native BLE directly

## Notes

- Requires physical BLE peripheral for testing
- Only non-bonded (unpaired) devices supported
- Write operations expect hex input (e.g., "01", "00FF")
- Notifications show as Alerts (one at a time)
- Server must be running before app launch
