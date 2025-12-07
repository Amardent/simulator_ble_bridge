/**
 * Simple test to verify the build output
 * Tests non-React Native dependent functions
 */

// Test import from built output
const { PlatformDetector } = require('./lib/PlatformDetector');
const { BleError, BleErrorCode } = require('./lib/types');

console.log('=== Simple Build Verification Test ===\n');

let passed = 0;
let failed = 0;

// Test 1: BleErrorCode enum is defined
console.log('Test 1: BleErrorCode enum is defined');
try {
  if (typeof BleErrorCode === 'object' && BleErrorCode.UnknownError === 0) {
    console.log('  ✓ Pass - BleErrorCode.UnknownError = 0');
    passed++;
  } else {
    console.log('  ✗ Fail - BleErrorCode enum not properly defined');
    failed++;
  }
} catch (error) {
  console.log('  ✗ Fail - Error:', error.message);
  failed++;
}
console.log();

// Test 2: BleError class is defined
console.log('Test 2: BleError class is defined');
try {
  const error = new BleError(BleErrorCode.ServerError, 'Test error', 'Test reason');
  if (error.errorCode === 1000 && error.message === 'Test error' && error.reason === 'Test reason') {
    console.log('  ✓ Pass - BleError instantiated correctly');
    passed++;
  } else {
    console.log('  ✗ Fail - BleError properties not correct');
    failed++;
  }
} catch (error) {
  console.log('  ✗ Fail - Error:', error.message);
  failed++;
}
console.log();

// Test 3: Default proxy URL
console.log('Test 3: Default proxy URL (without environment variable)');
try {
  delete process.env.BLE_PROXY_URL;
  const url = PlatformDetector.getProxyUrl();
  if (url === 'http://localhost:5050') {
    console.log('  ✓ Pass - Default URL is http://localhost:5050');
    passed++;
  } else {
    console.log('  ✗ Fail - Got:', url);
    failed++;
  }
} catch (error) {
  console.log('  ✗ Fail - Error:', error.message);
  failed++;
}
console.log();

// Test 4: Custom proxy URL via environment
console.log('Test 4: Custom proxy URL via environment variable');
try {
  process.env.BLE_PROXY_URL = 'http://192.168.1.100:5050';
  const url = PlatformDetector.getProxyUrl();
  if (url === 'http://192.168.1.100:5050') {
    console.log('  ✓ Pass - Custom URL working');
    passed++;
  } else {
    console.log('  ✗ Fail - Got:', url);
    failed++;
  }
  delete process.env.BLE_PROXY_URL;
} catch (error) {
  console.log('  ✗ Fail - Error:', error.message);
  failed++;
}
console.log();

// Test 5: WebSocket URL from HTTP
console.log('Test 5: WebSocket URL derived from HTTP');
try {
  process.env.BLE_PROXY_URL = 'http://localhost:5050';
  const url = PlatformDetector.getWebSocketUrl();
  if (url === 'ws://localhost:5050/v1/events') {
    console.log('  ✓ Pass - WebSocket URL correct');
    passed++;
  } else {
    console.log('  ✗ Fail - Got:', url);
    failed++;
  }
  delete process.env.BLE_PROXY_URL;
} catch (error) {
  console.log('  ✗ Fail - Error:', error.message);
  failed++;
}
console.log();

// Test 6: WebSocket URL from HTTPS
console.log('Test 6: WebSocket URL derived from HTTPS');
try {
  process.env.BLE_PROXY_URL = 'https://example.com:5050';
  const url = PlatformDetector.getWebSocketUrl();
  if (url === 'wss://example.com:5050/v1/events') {
    console.log('  ✓ Pass - WSS URL correct');
    passed++;
  } else {
    console.log('  ✗ Fail - Got:', url);
    failed++;
  }
  delete process.env.BLE_PROXY_URL;
} catch (error) {
  console.log('  ✗ Fail - Error:', error.message);
  failed++;
}
console.log();

// Test 7: Force proxy true
console.log('Test 7: Force proxy = true');
try {
  process.env.BLE_FORCE_PROXY = 'true';
  const shouldUse = PlatformDetector.shouldUseProxy();
  if (shouldUse === true) {
    console.log('  ✓ Pass - Forced proxy enabled');
    passed++;
  } else {
    console.log('  ✗ Fail - Got:', shouldUse);
    failed++;
  }
  delete process.env.BLE_FORCE_PROXY;
} catch (error) {
  console.log('  ✗ Fail - Error:', error.message);
  failed++;
}
console.log();

// Test 8: Force proxy false
console.log('Test 8: Force proxy = false');
try {
  process.env.BLE_FORCE_PROXY = 'false';
  const shouldUse = PlatformDetector.shouldUseProxy();
  if (shouldUse === false) {
    console.log('  ✓ Pass - Forced proxy disabled');
    passed++;
  } else {
    console.log('  ✗ Fail - Got:', shouldUse);
    failed++;
  }
  delete process.env.BLE_FORCE_PROXY;
} catch (error) {
  console.log('  ✗ Fail - Error:', error.message);
  failed++;
}
console.log();

// Summary
console.log('=== Test Summary ===');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log();

if (failed === 0) {
  console.log('✓ All tests passed!');
  console.log('Step 11 implementation is complete and working correctly.');
  process.exit(0);
} else {
  console.log('✗ Some tests failed');
  process.exit(1);
}
