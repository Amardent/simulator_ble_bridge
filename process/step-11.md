# Step 11: React Native Wrapper - Project Setup and Platform Detection

## Objective
Create the React Native library package structure, set up TypeScript configuration, and implement platform/simulator detection logic.

## Prerequisites
- Step 2: Protobuf JavaScript code generated
- Understanding of React Native library development
- Node.js and npm installed

## Technical Details

### Directory Structure
```
/Users/ericfrank/ble_bridge/client/
├── package.json
├── tsconfig.json
├── .npmignore
├── src/
│   ├── index.ts
│   ├── BleProxyManager.ts
│   ├── PlatformDetector.ts
│   ├── ProxyClient.ts
│   ├── types.ts
│   └── generated/
│       ├── ble_proxy.js
│       ├── ble_proxy.d.ts
│       └── index.ts
└── README.md
```

### package.json
```json
{
  "name": "react-native-ble-proxy",
  "version": "1.0.0",
  "description": "BLE proxy wrapper for React Native simulators/emulators",
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "clean": "rm -rf lib",
    "prepublishOnly": "npm run clean && npm run build"
  },
  "keywords": [
    "react-native",
    "bluetooth",
    "ble",
    "simulator",
    "emulator"
  ],
  "peerDependencies": {
    "react-native": ">=0.70.0",
    "react-native-ble-plx": "^3.0.0"
  },
  "dependencies": {
    "protobufjs": "^7.2.5"
  },
  "devDependencies": {
    "@types/react-native": "^0.72.0",
    "typescript": "^5.0.0"
  }
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "declaration": true,
    "outDir": "./lib",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "lib", "**/*.test.ts"]
}
```

### PlatformDetector.ts
```typescript
import { Platform } from 'react-native';

export class PlatformDetector {
  /**
   * Detects if the app is running in a simulator/emulator
   * Returns true for iOS Simulator or Android Emulator
   */
  static isSimulator(): boolean {
    if (Platform.OS === 'ios') {
      // iOS Simulator detection
      // In simulator, Platform.isPad and Platform.isTVOS are set,
      // but the most reliable way is to check __DEV__ and specific constants
      return Platform.constants.uiMode !== 'car' &&
             (Platform.constants.interfaceIdiom === 'pad' ||
              Platform.constants.interfaceIdiom === 'phone') &&
             __DEV__;
    } else if (Platform.OS === 'android') {
      // Android Emulator detection
      // Check for known emulator characteristics
      const { Brand, Manufacturer, Model, Fingerprint } = Platform.constants;

      return (
        Brand === 'google' ||
        Manufacturer === 'Google' ||
        Model?.includes('sdk') ||
        Model?.includes('Emulator') ||
        Model?.includes('Android SDK') ||
        Fingerprint?.includes('generic') ||
        Fingerprint?.includes('emulator')
      );
    }

    return false;
  }

  /**
   * Gets the proxy server URL
   * Default: http://localhost:5050
   */
  static getProxyUrl(): string {
    // Allow override via environment variable
    return process.env.BLE_PROXY_URL || 'http://localhost:5050';
  }

  /**
   * Gets the WebSocket URL for events
   * Default: ws://localhost:5050/v1/events
   */
  static getWebSocketUrl(): string {
    const baseUrl = this.getProxyUrl();
    const wsUrl = baseUrl.replace('http://', 'ws://').replace('https://', 'wss://');
    return `${wsUrl}/v1/events`;
  }

  /**
   * Determines if proxy should be used
   * Can be overridden for testing on real devices
   */
  static shouldUseProxy(): boolean {
    // Check for explicit override
    if (process.env.BLE_FORCE_PROXY === 'true') {
      return true;
    }
    if (process.env.BLE_FORCE_PROXY === 'false') {
      return false;
    }

    return this.isSimulator();
  }
}
```

### types.ts
```typescript
/**
 * Re-export types from react-native-ble-plx for convenience
 */
import type {
  BleManager as NativeBleManager,
  Device,
  Service,
  Characteristic,
  Descriptor,
  State,
  ScanOptions,
  ConnectionOptions,
  Subscription,
} from 'react-native-ble-plx';

export type {
  Device,
  Service,
  Characteristic,
  Descriptor,
  State,
  ScanOptions,
  ConnectionOptions,
  Subscription,
};

export type BleManagerInterface = NativeBleManager;

/**
 * Error codes matching react-native-ble-plx
 */
export enum BleErrorCode {
  UnknownError = 0,
  BluetoothManagerDestroyed = 1,
  OperationCancelled = 2,
  OperationTimedOut = 3,
  OperationStartFailed = 4,
  InvalidIdentifiers = 5,
  // ... (include all error codes from react-native-ble-plx)

  // Additional error for proxy
  ServerError = 1000,
}

export class BleError extends Error {
  constructor(
    public errorCode: BleErrorCode,
    message: string,
    public reason?: string
  ) {
    super(message);
    this.name = 'BleError';
  }
}
```

### index.ts (initial)
```typescript
import { PlatformDetector } from './PlatformDetector';
import { BleManager } from 'react-native-ble-plx';
// ProxyBleManager will be implemented in next step

export * from './types';

/**
 * Creates a BLE manager instance
 * Automatically detects simulator/emulator and uses proxy if needed
 */
export function createBleManager(): BleManager {
  if (PlatformDetector.shouldUseProxy()) {
    console.log('[BLE Proxy] Using proxy server at', PlatformDetector.getProxyUrl());
    // Return ProxyBleManager (Step 12)
    throw new Error('ProxyBleManager not yet implemented');
  } else {
    console.log('[BLE Proxy] Using native BLE');
    return new BleManager();
  }
}

// Re-export BleManager class for advanced usage
export { BleManager };
```

## Acceptance Criteria
- [ ] Package structure is correct
- [ ] TypeScript compiles without errors
- [ ] PlatformDetector correctly identifies iOS Simulator
- [ ] PlatformDetector correctly identifies Android Emulator
- [ ] PlatformDetector returns false for real devices
- [ ] Environment variable overrides work
- [ ] Proxy URL configuration is flexible
- [ ] WebSocket URL is correctly derived
- [ ] Types are properly exported
- [ ] Package builds successfully
- [ ] No peer dependency warnings

## Testing Instructions
```bash
# Install dependencies
cd /Users/ericfrank/ble_bridge/client
npm install

# Build TypeScript
npm run build

# Check output
ls -la lib/

# Create test file
cat > test_detector.ts << 'EOF'
import { PlatformDetector } from './src/PlatformDetector';

console.log('Is Simulator:', PlatformDetector.isSimulator());
console.log('Proxy URL:', PlatformDetector.getProxyUrl());
console.log('WebSocket URL:', PlatformDetector.getWebSocketUrl());
console.log('Should Use Proxy:', PlatformDetector.shouldUseProxy());

// Test environment overrides
process.env.BLE_PROXY_URL = 'http://192.168.1.100:5050';
console.log('Custom URL:', PlatformDetector.getProxyUrl());

process.env.BLE_FORCE_PROXY = 'true';
console.log('Forced Proxy:', PlatformDetector.shouldUseProxy());
EOF

npx ts-node test_detector.ts

# Test in actual React Native app
# Create test component that logs detection results
```

## Dependencies
- Node.js 16+
- TypeScript 5.0+
- react-native (peer)
- react-native-ble-plx (peer)
- protobufjs (for Step 12)

## Risks/Blockers
- Platform detection may be unreliable on some devices
- Android emulator detection varies by AVD configuration
- Environment variable access in React Native requires special setup
- iOS Simulator detection doesn't work in release builds
- Need to handle case where proxy server is not running
- TypeScript compilation target must match React Native version
- Peer dependency version ranges may conflict

## Recommended Agent
react-native-library-developer

## Estimated Time
2 hours
