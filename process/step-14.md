# Step 14: Integration Testing and Bug Fixes

## Objective
Execute comprehensive end-to-end testing of the BLE proxy system, identify and fix bugs, validate all operations against real peripherals, and ensure stability.

## Prerequisites
- Step 13: Test harness app complete
- Step 12: ProxyBleManager implementation
- Step 10: WebSocket server
- Step 9: HTTP endpoints
- Steps 3-7: BLEManager functionality
- Physical BLE peripheral for testing

## Technical Details

### Test Matrix

#### Device Discovery Tests
1. Start scan without service filter
2. Start scan with specific service UUIDs
3. Scan timeout behavior
4. Duplicate device handling (RSSI updates)
5. Stop scan immediately
6. Rapid start/stop cycles
7. Scan while connected to device

#### Connection Tests
1. Connect to discovered peripheral
2. Connect timeout (invalid device ID)
3. Connect to already connected device
4. Concurrent connections to multiple devices
5. Disconnect while operations in progress
6. Unexpected peripheral disconnection
7. Reconnect after disconnection

#### Service Discovery Tests
1. Discover all services and characteristics
2. Discovery on disconnected device
3. Cache validation after discovery
4. Services with large characteristic counts
5. Duplicate discovery calls

#### Read Tests
1. Read readable characteristic
2. Read non-existent characteristic
3. Read non-readable characteristic
4. Read with empty value (0 bytes)
5. Read with maximum value (512 bytes)
6. Concurrent reads to different characteristics
7. Read timeout handling
8. Read on disconnected device

#### Write Tests
1. Write with response (small value)
2. Write with response (large value)
3. Write without response
4. Write to non-writable characteristic
5. Write to non-existent characteristic
6. Write timeout handling
7. Write on disconnected device
8. Rapid sequential writes

#### Monitor Tests
1. Enable notifications
2. Disable notifications
3. Multiple notification callbacks
4. Monitor while reading same characteristic
5. Monitor on non-notifiable characteristic
6. Monitor cleanup on disconnection
7. High-frequency notifications (>10 Hz)

#### RSSI Tests
1. Read RSSI for connected device
2. Read RSSI for disconnected device
3. RSSI timeout handling
4. Repeated RSSI reads

#### State Management Tests
1. Manager state transitions
2. State callback on initialization
3. Operations when powered off
4. State recovery after reset

#### Error Handling Tests
1. Server not running
2. WebSocket disconnection during scan
3. HTTP timeout
4. Malformed protobuf responses
5. Invalid UUIDs
6. Error code mapping correctness
7. Error message clarity

### Test Automation Script

Create `/Users/ericfrank/ble_bridge/test-app/src/utils/TestRunner.ts`:

```typescript
import { bleManager } from '../../App';
import { Logger } from './Logger';

export class TestRunner {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('TestRunner');
  }

  async runAllTests(testDeviceId?: string): Promise<TestResult[]> {
    const results: TestResult[] = [];

    results.push(await this.testManagerState());
    results.push(await this.testScan());

    if (testDeviceId) {
      results.push(await this.testConnection(testDeviceId));
      results.push(await this.testDiscovery(testDeviceId));
      results.push(await this.testRead(testDeviceId));
      results.push(await this.testWrite(testDeviceId));
      results.push(await this.testMonitor(testDeviceId));
      results.push(await this.testRSSI(testDeviceId));
    }

    return results;
  }

  private async testManagerState(): Promise<TestResult> {
    this.logger.log('Testing manager state...');
    try {
      const state = await bleManager.state();
      if (state === 'PoweredOn') {
        return { name: 'Manager State', passed: true };
      } else {
        return { name: 'Manager State', passed: false, error: `State is ${state}` };
      }
    } catch (error) {
      return { name: 'Manager State', passed: false, error: String(error) };
    }
  }

  private async testScan(): Promise<TestResult> {
    this.logger.log('Testing scan...');
    return new Promise((resolve) => {
      let deviceCount = 0;
      const timeout = setTimeout(() => {
        bleManager.stopDeviceScan();
        if (deviceCount > 0) {
          resolve({ name: 'Scan', passed: true, details: `Found ${deviceCount} devices` });
        } else {
          resolve({ name: 'Scan', passed: false, error: 'No devices found' });
        }
      }, 5000);

      bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          clearTimeout(timeout);
          bleManager.stopDeviceScan();
          resolve({ name: 'Scan', passed: false, error: String(error) });
          return;
        }
        if (device) {
          deviceCount++;
        }
      });
    });
  }

  private async testConnection(deviceId: string): Promise<TestResult> {
    this.logger.log('Testing connection...');
    try {
      await bleManager.connectToDevice(deviceId);
      const isConnected = await bleManager.isDeviceConnected(deviceId);
      if (isConnected) {
        return { name: 'Connection', passed: true };
      } else {
        return { name: 'Connection', passed: false, error: 'Device not connected' };
      }
    } catch (error) {
      return { name: 'Connection', passed: false, error: String(error) };
    }
  }

  private async testDiscovery(deviceId: string): Promise<TestResult> {
    this.logger.log('Testing discovery...');
    try {
      await bleManager.discoverAllServicesAndCharacteristicsForDevice(deviceId);
      const services = await bleManager.servicesForDevice(deviceId);
      if (services && services.length > 0) {
        return { name: 'Discovery', passed: true, details: `${services.length} services` };
      } else {
        return { name: 'Discovery', passed: false, error: 'No services found' };
      }
    } catch (error) {
      return { name: 'Discovery', passed: false, error: String(error) };
    }
  }

  private async testRead(deviceId: string): Promise<TestResult> {
    this.logger.log('Testing read...');
    try {
      // Assumes a known readable characteristic
      // TODO: Find first readable characteristic dynamically
      const char = await bleManager.readCharacteristicForDevice(
        deviceId,
        'SERVICE_UUID',
        'CHAR_UUID'
      );
      if (char && char.value !== null) {
        return { name: 'Read', passed: true };
      } else {
        return { name: 'Read', passed: false, error: 'No value returned' };
      }
    } catch (error) {
      return { name: 'Read', passed: false, error: String(error) };
    }
  }

  private async testWrite(deviceId: string): Promise<TestResult> {
    this.logger.log('Testing write...');
    try {
      // Assumes a known writable characteristic
      const valueBase64 = Buffer.from([0x01, 0x02, 0x03]).toString('base64');
      await bleManager.writeCharacteristicWithResponseForDevice(
        deviceId,
        'SERVICE_UUID',
        'CHAR_UUID',
        valueBase64
      );
      return { name: 'Write', passed: true };
    } catch (error) {
      return { name: 'Write', passed: false, error: String(error) };
    }
  }

  private async testMonitor(deviceId: string): Promise<TestResult> {
    this.logger.log('Testing monitor...');
    return new Promise((resolve) => {
      let notificationCount = 0;

      const subscription = bleManager.monitorCharacteristicForDevice(
        deviceId,
        'SERVICE_UUID',
        'CHAR_UUID',
        (error, char) => {
          if (error) {
            subscription.remove();
            resolve({ name: 'Monitor', passed: false, error: String(error) });
            return;
          }
          notificationCount++;
        }
      );

      setTimeout(() => {
        subscription.remove();
        if (notificationCount > 0) {
          resolve({ name: 'Monitor', passed: true, details: `${notificationCount} notifications` });
        } else {
          resolve({ name: 'Monitor', passed: false, error: 'No notifications received' });
        }
      }, 5000);
    });
  }

  private async testRSSI(deviceId: string): Promise<TestResult> {
    this.logger.log('Testing RSSI...');
    try {
      const device = await bleManager.readRSSIForDevice(deviceId);
      if (device.rssi && device.rssi < 0) {
        return { name: 'RSSI', passed: true, details: `${device.rssi} dBm` };
      } else {
        return { name: 'RSSI', passed: false, error: 'Invalid RSSI value' };
      }
    } catch (error) {
      return { name: 'RSSI', passed: false, error: String(error) };
    }
  }
}

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  details?: string;
}
```

### Known Issues Checklist

Create `/Users/ericfrank/ble_bridge/KNOWN_ISSUES.md`:

```markdown
# Known Issues and Fixes

## Server Issues
- [ ] WebSocket reconnection not implemented
- [ ] No request size limits
- [ ] Missing graceful shutdown on port conflict
- [ ] Timeout tasks not cancelled on success
- [ ] Peripheral references may leak if not cleaned up

## Client Issues
- [ ] Buffer polyfill needed for React Native
- [ ] WebSocket binary type support varies
- [ ] Service/characteristic caching incomplete
- [ ] Monitor subscriptions not cleaned up on disconnect
- [ ] Error messages not user-friendly

## Protocol Issues
- [ ] Large characteristic values (>512 bytes) untested
- [ ] Concurrent operation handling unclear
- [ ] WebSocket backpressure not handled
- [ ] Event ordering not guaranteed

## Testing Gaps
- [ ] No automated tests for Swift server
- [ ] No unit tests for React Native wrapper
- [ ] Integration tests require manual setup
- [ ] Performance testing not done
```

## Acceptance Criteria
- [ ] All test matrix items pass
- [ ] Known issues are documented
- [ ] Critical bugs are fixed
- [ ] Performance is acceptable (<100ms for operations)
- [ ] No memory leaks detected
- [ ] Error handling is comprehensive
- [ ] Logs are clear and helpful
- [ ] Server survives client disconnection
- [ ] Client survives server restart
- [ ] Tested with at least 2 different BLE peripherals

## Testing Instructions
```bash
# Start server with verbose logging
cd /Users/ericfrank/ble_bridge/server
swift run BLEProxyServer --verbose

# In another terminal, run test app
cd /Users/ericfrank/ble_bridge/BleProxyTestApp
npm run ios

# Run automated tests
# (In app, navigate to test runner screen)

# Monitor server logs for errors
tail -f /tmp/ble_proxy_server.log

# Test error conditions
# 1. Stop server during scan
# 2. Disconnect peripheral during read
# 3. Send invalid protobuf
# 4. Exceed timeout limits

# Memory leak detection (Xcode Instruments)
# 1. Profile server with Leaks instrument
# 2. Run full test cycle
# 3. Verify no leaks reported

# Performance testing
# 1. Measure scan latency
# 2. Measure connection time
# 3. Measure read/write latency
# 4. Test notification throughput
```

## Dependencies
- Step 13: Test harness app
- All previous steps complete
- Physical BLE peripheral(s)
- Xcode Instruments (for profiling)
- Network debugging tools

## Risks/Blockers
- Some bugs may require protocol changes
- Performance issues may require architectural changes
- Memory leaks may be difficult to reproduce
- Edge cases with specific peripherals
- Platform-specific bugs (iOS vs Android)
- React Native Metro bundler issues
- WebSocket library compatibility

## Recommended Agent
qa-integration-specialist

## Estimated Time
4-6 hours
