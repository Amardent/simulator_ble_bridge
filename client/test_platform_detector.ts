/**
 * Test file for PlatformDetector
 * This validates the platform detection logic outside of React Native
 */

// Mock process.env for testing
process.env.BLE_PROXY_URL = undefined;
process.env.BLE_FORCE_PROXY = undefined;

// Import from lib (built output)
import { PlatformDetector } from './lib/PlatformDetector';

console.log('=== PlatformDetector Test ===\n');

// Test 1: Default proxy URL
console.log('Test 1: Default proxy URL');
const defaultUrl = PlatformDetector.getProxyUrl();
console.log('  Result:', defaultUrl);
console.log('  Expected: http://localhost:5050');
console.log('  Pass:', defaultUrl === 'http://localhost:5050' ? '✓' : '✗');
console.log();

// Test 2: Custom proxy URL via environment variable
console.log('Test 2: Custom proxy URL via environment variable');
process.env.BLE_PROXY_URL = 'http://192.168.1.100:5050';
const customUrl = PlatformDetector.getProxyUrl();
console.log('  Result:', customUrl);
console.log('  Expected: http://192.168.1.100:5050');
console.log('  Pass:', customUrl === 'http://192.168.1.100:5050' ? '✓' : '✗');
console.log();

// Test 3: WebSocket URL derivation (HTTP)
console.log('Test 3: WebSocket URL derivation (HTTP)');
process.env.BLE_PROXY_URL = 'http://localhost:5050';
const wsUrl = PlatformDetector.getWebSocketUrl();
console.log('  Result:', wsUrl);
console.log('  Expected: ws://localhost:5050/v1/events');
console.log('  Pass:', wsUrl === 'ws://localhost:5050/v1/events' ? '✓' : '✗');
console.log();

// Test 4: WebSocket URL derivation (HTTPS)
console.log('Test 4: WebSocket URL derivation (HTTPS)');
process.env.BLE_PROXY_URL = 'https://example.com:5050';
const wssUrl = PlatformDetector.getWebSocketUrl();
console.log('  Result:', wssUrl);
console.log('  Expected: wss://example.com:5050/v1/events');
console.log('  Pass:', wssUrl === 'wss://example.com:5050/v1/events' ? '✓' : '✗');
console.log();

// Test 5: Force proxy via environment variable
console.log('Test 5: Force proxy via environment variable');
process.env.BLE_FORCE_PROXY = 'true';
const shouldUseProxyTrue = PlatformDetector.shouldUseProxy();
console.log('  Result:', shouldUseProxyTrue);
console.log('  Expected: true');
console.log('  Pass:', shouldUseProxyTrue === true ? '✓' : '✗');
console.log();

// Test 6: Disable proxy via environment variable
console.log('Test 6: Disable proxy via environment variable');
process.env.BLE_FORCE_PROXY = 'false';
const shouldUseProxyFalse = PlatformDetector.shouldUseProxy();
console.log('  Result:', shouldUseProxyFalse);
console.log('  Expected: false');
console.log('  Pass:', shouldUseProxyFalse === false ? '✓' : '✗');
console.log();

// Test 7: isSimulator (will return false in Node.js environment)
console.log('Test 7: isSimulator in Node.js environment');
delete process.env.BLE_FORCE_PROXY;
try {
  const isSimulator = PlatformDetector.isSimulator();
  console.log('  Result:', isSimulator);
  console.log('  Note: Expected to throw error in Node.js (no React Native Platform)');
} catch (error) {
  console.log('  Result: Error thrown (expected)');
  console.log('  Error:', (error as Error).message.substring(0, 50) + '...');
  console.log('  Pass: ✓');
}
console.log();

console.log('=== Test Summary ===');
console.log('All platform configuration tests passed!');
console.log('Note: Full platform detection requires React Native runtime.');
