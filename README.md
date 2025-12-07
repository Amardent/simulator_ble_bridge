# BLE Bridge

A BLE proxy system enabling Bluetooth Low Energy development in iOS Simulator and Android Emulator—and an experiment in AI-assisted software development.

## Dual Purpose

This repository serves two goals:

### 1. Practical Tool: BLE Development in Simulators

iOS Simulator and Android Emulator lack Bluetooth hardware access. This project provides a transparent proxy that routes BLE operations through your macOS host, enabling real peripheral communication during development.

### 2. Process Experiment: Claude Code as Development Partner

This codebase was built almost entirely through collaboration with Claude Code. The `/process` directory documents a structured, step-by-step approach to AI-assisted development—serving as both implementation guide and case study in effective human-AI collaboration.

## Goals

- Enable BLE-dependent React Native apps to run in simulators with real peripherals
- Maintain 100% API compatibility with `react-native-ble-plx`
- Document patterns for effective AI-assisted development
- Demonstrate test-driven development with AI tooling
- Explore the boundaries of what's achievable with AI pair programming

## Architecture

```
┌─────────────────────────────┐      ┌─────────────────────────────┐
│   iOS Simulator /           │      │   macOS Host                │
│   Android Emulator          │      │                             │
│                             │      │   BLE Proxy Server (Swift)  │
│   React Native App          │      │   └─ Vapor HTTP/WebSocket   │
│   └─ react-native-ble-proxy │─────▶│   └─ CoreBluetooth          │
│      (drop-in replacement)  │:5050 │                             │
│                             │      └──────────────┬──────────────┘
└─────────────────────────────┘                     │
                                                    │ BLE Radio
                                                    ▼
                                         ┌──────────────────┐
                                         │  Physical        │
                                         │  BLE Peripheral  │
                                         └──────────────────┘
```

**Components:**

| Component | Location | Purpose |
|-----------|----------|---------|
| BLE Proxy Server | `/server` | Swift CLI using Vapor, exposes CoreBluetooth via HTTP + WebSocket |
| Client Library | `/client` | TypeScript wrapper, drop-in replacement for react-native-ble-plx |
| Test App | `/BleProxyTestApp` | React Native app for integration testing |
| Process Docs | `/process` | Step-by-step implementation specs with completion notes |
| Protobuf Schema | `/proto` | Protocol definitions for client-server communication |

## Quick Start

### Prerequisites

- macOS 14+ with Bluetooth hardware
- Xcode 15+ and Swift 5.9+
- Node.js 16+
- Physical BLE peripheral (non-bonded—see limitations below)

### 1. Start the Server

```bash
cd server
swift build
swift run ble-proxy-server
# Server runs on http://127.0.0.1:5050
```

### 2. Install in Your React Native App

```bash
npm install react-native-ble-proxy react-native-ble-plx
```

### 3. Use the Library

```typescript
import { createBleManager } from 'react-native-ble-proxy';

// Automatically uses proxy in simulator, native BLE on real devices
const bleManager = createBleManager();

// API identical to react-native-ble-plx
bleManager.startDeviceScan(null, null, (error, device) => {
  console.log('Found:', device?.name, device?.rssi);
});
```

See [BRIDGE_GUIDE.md](BRIDGE_GUIDE.md) for complete usage documentation.

## Key Limitations

- **Non-bonded peripherals only** — Devices requiring pairing will timeout (60s)
- **GATT operations only** — No L2CAP, pairing, or bonding
- **macOS host required** — Server uses CoreBluetooth
- **Localhost only** — Server binds to 127.0.0.1:5050

## Project Status

| Phase | Status |
|-------|--------|
| Protobuf schema | ✅ Complete |
| Swift BLE core (scan, connect, read, write, monitor, RSSI) | ✅ Complete |
| HTTP/WebSocket server | ✅ Complete |
| React Native client library | ✅ Complete |
| Test application | ✅ Complete |
| Integration testing | 🔄 In Progress |
| Documentation | 🔄 In Progress |

## Future Direction

### Near-term
- Complete integration testing with diverse BLE peripherals
- Publish `react-native-ble-proxy` to npm
- Add Android Emulator testing verification

### Exploratory
- Multi-client support (multiple simulators, one server)
- Remote server mode (proxy to BLE hardware on different machine)
- Record/replay mode for CI testing without hardware
- Investigate pairing/bonding support feasibility

### Process Documentation
- Publish learnings on Claude Code collaboration patterns
- Document effective prompting strategies for complex projects
- Create reusable templates for AI-assisted development

## Documentation

| Document | Audience | Purpose |
|----------|----------|---------|
| [BRIDGE_GUIDE.md](BRIDGE_GUIDE.md) | Library users | Usage guide, API reference, troubleshooting |
| [CLAUDE.md](CLAUDE.md) | Developers | Project rules, development commands, coding standards |
| [process/README.md](process/README.md) | Developers | Implementation journey and technical discoveries |
| [client/README.md](client/README.md) | Library users | Client library specifics |

## Development

```bash
# Build server
cd server && swift build

# Run server tests
swift test

# Build client library
cd client && npm install && npm run build

# Run test app
cd BleProxyTestApp && npm run ios
```

## Contributing

This project welcomes contributions. Please read [CLAUDE.md](CLAUDE.md) for coding standards and development workflow.

## License

[TBD]

---

*Built with Claude Code as an experiment in AI-assisted software development.*
