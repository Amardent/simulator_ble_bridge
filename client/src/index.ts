import { PlatformDetector } from './PlatformDetector';
import { BleProxyManager } from './BleProxyManager';

export * from './types';
export { PlatformDetector } from './PlatformDetector';

// Conditional import of BleManager to avoid loading react-native in Node.js
let BleManager: any = null;
if (!PlatformDetector.shouldUseProxy()) {
  try {
    BleManager = require('react-native-ble-plx').BleManager;
  } catch (e) {
    console.error('[BLE Proxy] Failed to load react-native-ble-plx:', e);
  }
}

/**
 * Creates a BLE manager instance
 * Automatically detects simulator/emulator and uses proxy if needed
 */
export function createBleManager(): any {
  if (PlatformDetector.shouldUseProxy()) {
    console.log('[BLE Proxy] Using proxy server at', PlatformDetector.getProxyUrl());
    return new BleProxyManager();
  } else {
    console.log('[BLE Proxy] Using native BLE');
    if (!BleManager) {
      throw new Error('react-native-ble-plx not available');
    }
    return new BleManager();
  }
}

// Re-export BleManager class for advanced usage (only available in non-proxy mode)
export { BleManager };
