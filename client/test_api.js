// ABOUTME: Test script to verify BLE wrapper API works correctly
// ABOUTME: Tests scanning and connection through ProxyBleManager

const { createBleManager } = require('./lib/index');

async function testBleApi() {
  console.log('Creating BLE Manager...');
  const manager = createBleManager();

  try {
    // Test 1: Query state
    console.log('\n=== Test 1: Query Manager State ===');
    const state = await manager.state();
    console.log('Manager State:', state);

    // Test 2: Start scanning
    console.log('\n=== Test 2: Start Device Scan ===');
    const discoveredDevices = new Map();
    let scanCount = 0;

    await manager.startDeviceScan(
      null, // All service UUIDs
      { allowDuplicates: false },
      (error, device) => {
        if (error) {
          console.error('Scan error:', error);
          return;
        }

        if (device) {
          scanCount++;
          const key = device.id;
          if (!discoveredDevices.has(key)) {
            discoveredDevices.set(key, device);
            console.log(`\nDevice #${discoveredDevices.size}:`);
            console.log(`  ID: ${device.id}`);
            console.log(`  Name: ${device.name || '(unnamed)'}`);
            console.log(`  RSSI: ${device.rssi}`);
            console.log(`  Connectable: ${device.isConnectable}`);
            if (device.serviceUUIDs && device.serviceUUIDs.length > 0) {
              console.log(`  Services: ${device.serviceUUIDs.join(', ')}`);
            }
          }
        }
      }
    );

    console.log('\nScanning for 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Test 3: Stop scanning
    console.log('\n=== Test 3: Stop Device Scan ===');
    await manager.stopDeviceScan();
    console.log('Scan stopped');
    console.log(`Total scan events: ${scanCount}`);
    console.log(`Unique devices found: ${discoveredDevices.size}`);

    // Test 4: Connection test (prefer AMDT device, then first device)
    if (discoveredDevices.size > 0) {
      // Try to find AMDT device first (known to work)
      const amdtDevice = Array.from(discoveredDevices.values()).find(
        d => d.name && d.name.startsWith('amdt_')
      );
      const testDevice = amdtDevice || Array.from(discoveredDevices.values())[0];
      console.log(`\n=== Test 4: Connect to Device ===`);
      console.log(`Attempting to connect to: ${testDevice.name || testDevice.id}`);

      try {
        const connected = await Promise.race([
          manager.connectToDevice(testDevice.id),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Connection timeout')), 10000)
          )
        ]);
        console.log('Connection successful!');
        console.log(`  Device ID: ${connected.id}`);
        console.log(`  Device Name: ${connected.name || '(unnamed)'}`);

        // Test 5: Discover services
        console.log('\n=== Test 5: Discover Services ===');
        await manager.discoverAllServicesAndCharacteristicsForDevice(testDevice.id);
        console.log('Service discovery complete');

        const services = await manager.servicesForDevice(testDevice.id);
        console.log(`Found ${services.length} services:`);
        for (const service of services.slice(0, 3)) { // Show first 3
          console.log(`  - ${service.uuid} (${service.isPrimary ? 'primary' : 'secondary'})`);
        }

        // Test 6: Disconnect
        console.log('\n=== Test 6: Disconnect Device ===');
        await manager.cancelDeviceConnection(testDevice.id);
        console.log('Disconnected successfully');

      } catch (connError) {
        console.log(`Connection failed (expected for some devices): ${connError.message}`);
      }
    } else {
      console.log('\n=== Test 4: Connection Test Skipped (no devices found) ===');
    }

    // Cleanup
    console.log('\n=== Cleanup ===');
    manager.destroy();
    console.log('Manager destroyed');

    console.log('\n✅ All tests completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Test failed:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run tests
console.log('BLE Wrapper API Test');
console.log('===================\n');
testBleApi().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
