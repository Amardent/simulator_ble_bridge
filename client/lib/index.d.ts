export * from './types';
export { PlatformDetector } from './PlatformDetector';
declare let BleManager: any;
/**
 * Creates a BLE manager instance
 * Automatically detects simulator/emulator and uses proxy if needed
 */
export declare function createBleManager(): any;
export { BleManager };
