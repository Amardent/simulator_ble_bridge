# react-native-ble-proxy

BLE proxy wrapper for React Native simulators/emulators - enables BLE functionality in iOS Simulator and Android Emulator through a macOS proxy server.

## Overview

This library is a drop-in replacement wrapper for `react-native-ble-plx` that automatically detects if your React Native app is running in a simulator/emulator and routes BLE operations through a local proxy server running on your macOS development machine.

**Current Status: Step 11 Complete - Platform Detection**

This is an early release implementing platform detection and project scaffolding. Full proxy functionality will be available in Step 12.

## Features

- Automatic iOS Simulator detection
- Automatic Android Emulator detection
- Environment variable overrides for testing
- Type-safe TypeScript implementation
- Drop-in replacement for react-native-ble-plx

## Installation

```bash
npm install react-native-ble-proxy
# or
yarn add react-native-ble-proxy
```

### Peer Dependencies

```bash
npm install react-native-ble-plx@^3.0.0
```

## Usage

### Basic Usage

```typescript
import { createBleManager } from 'react-native-ble-proxy';

// Automatically uses proxy in simulator/emulator, native BLE on real devices
const bleManager = createBleManager();

// Use exactly like react-native-ble-plx
bleManager.startDeviceScan(null, null, (error, device) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('Found device:', device.name);
});
```

### Platform Detection

```typescript
import { PlatformDetector } from 'react-native-ble-proxy';

// Check if running in simulator/emulator
const isSimulator = PlatformDetector.isSimulator();
console.log('Running in simulator:', isSimulator);

// Get proxy configuration
const proxyUrl = PlatformDetector.getProxyUrl();
const wsUrl = PlatformDetector.getWebSocketUrl();
```

### Environment Variables

Override default behavior for testing:

```typescript
// Force proxy usage on real device (for testing)
process.env.BLE_FORCE_PROXY = 'true';

// Disable proxy on simulator (for testing)
process.env.BLE_FORCE_PROXY = 'false';

// Use custom proxy server URL
process.env.BLE_PROXY_URL = 'http://192.168.1.100:5050';
```

## Architecture

### Proxy Server (Step 10 - Complete)

The macOS proxy server exposes CoreBluetooth APIs via:
- **HTTP endpoints** for BLE operations (scan start/stop, connect, read, write, etc.)
- **WebSocket** for real-time events (scan results, notifications, connection status)
- **Protobuf** for all message serialization

**Endpoints:**
- HTTP: `http://localhost:5050/v1/*`
- WebSocket: `ws://localhost:5050/v1/events`

### Client Library (Step 11 - Current)

**Implemented:**
- ✅ Package structure and TypeScript configuration
- ✅ Platform detection (iOS Simulator, Android Emulator)
- ✅ Environment variable overrides
- ✅ Type definitions matching react-native-ble-plx

**Next (Step 12):**
- ⏳ ProxyBleManager implementation
- ⏳ HTTP client for BLE operations
- ⏳ WebSocket event handling
- ⏳ Full API parity with react-native-ble-plx

## Platform Detection Details

### iOS Simulator

Detected using:
- Platform.OS === 'ios'
- Platform.constants.interfaceIdiom === 'phone' or 'pad'
- __DEV__ flag is true

### Android Emulator

Detected using:
- Platform.OS === 'android'
- Brand/Manufacturer === 'Google'
- Model contains 'sdk', 'Emulator', or 'Android SDK'
- Fingerprint contains 'generic' or 'emulator'

## Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run watch
```

### Clean

```bash
npm run clean
```

## API Compatibility

This library aims for 100% API compatibility with `react-native-ble-plx`. All types, methods, and error codes match the original library.

### Error Codes

All error codes from `react-native-ble-plx` are supported (0-601), plus:
- **ServerError (1000)** - Proxy server communication error

## Requirements

- React Native >= 0.70.0
- react-native-ble-plx ^3.0.0
- macOS development machine (for proxy server)
- Node.js 16+
- TypeScript 5.0+

## Roadmap

- [x] Step 1-10: Server implementation (HTTP + WebSocket)
- [x] Step 11: Client platform detection and scaffolding
- [ ] Step 12: ProxyBleManager implementation
- [ ] Step 13-14: Integration testing harness
- [ ] Step 15: Documentation

## License

MIT

## Contributing

This is an active development project. Contributions welcome after Step 12 is complete.

## Support

For issues, questions, or feature requests, please open an issue on GitHub.
