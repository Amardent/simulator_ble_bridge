# Step 13: Integration Harness - Test Application Setup

## Objective
Create a comprehensive React Native test application that validates all BLE operations through the proxy system with a physical peripheral.

## Prerequisites
- Step 12: ProxyBleManager implementation complete
- Step 10: WebSocket server working
- Physical BLE peripheral for testing (e.g., heart rate monitor, Nordic UART device)
- Swift server running

## Technical Details

### Test App Structure
```
/Users/ericfrank/ble_bridge/test-app/
├── package.json
├── App.tsx
├── src/
│   ├── components/
│   │   ├── StateMonitor.tsx
│   │   ├── ScanScreen.tsx
│   │   ├── DeviceScreen.tsx
│   │   ├── CharacteristicTest.tsx
│   │   └── LogView.tsx
│   └── utils/
│       ├── Logger.ts
│       └── TestRunner.ts
```

### App.tsx
```typescript
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createBleManager } from 'react-native-ble-proxy';

import StateMonitor from './src/components/StateMonitor';
import ScanScreen from './src/components/ScanScreen';
import DeviceScreen from './src/components/DeviceScreen';

const Stack = createStackNavigator();

// Create global BLE manager instance
export const bleManager = createBleManager();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StateMonitor manager={bleManager} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Scan" component={ScanScreen} />
          <Stack.Screen name="Device" component={DeviceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
```

### StateMonitor.tsx
```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { State } from 'react-native-ble-plx';

interface Props {
  manager: any;
}

const StateMonitor: React.FC<Props> = ({ manager }) => {
  const [state, setState] = useState<State>(State.Unknown);

  useEffect(() => {
    manager.state().then(setState);

    const subscription = manager.onStateChange((newState: State) => {
      setState(newState);
    }, true);

    return () => subscription.remove();
  }, [manager]);

  const getStateColor = () => {
    switch (state) {
      case State.PoweredOn:
        return '#4CAF50';
      case State.PoweredOff:
        return '#F44336';
      case State.Unauthorized:
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getStateColor() }]}>
      <Text style={styles.text}>BLE State: {state}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StateMonitor;
```

### ScanScreen.tsx
```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Device } from 'react-native-ble-plx';
import { bleManager } from '../../App';

const ScanScreen = ({ navigation }: any) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [scanning, setScanning] = useState(false);

  const startScan = () => {
    setDevices([]);
    setScanning(true);

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Scan error:', error);
        setScanning(false);
        return;
      }

      if (device) {
        setDevices(prevDevices => {
          const existingIndex = prevDevices.findIndex(d => d.id === device.id);
          if (existingIndex >= 0) {
            // Update existing device
            const updated = [...prevDevices];
            updated[existingIndex] = device;
            return updated;
          } else {
            // Add new device
            return [...prevDevices, device];
          }
        });
      }
    });

    // Auto-stop after 10 seconds
    setTimeout(() => {
      if (scanning) {
        stopScan();
      }
    }, 10000);
  };

  const stopScan = () => {
    bleManager.stopDeviceScan();
    setScanning(false);
  };

  const connectToDevice = async (device: Device) => {
    try {
      stopScan();
      console.log('Connecting to', device.id);
      await bleManager.connectToDevice(device.id);
      console.log('Connected, discovering services...');
      await bleManager.discoverAllServicesAndCharacteristicsForDevice(device.id);
      console.log('Discovery complete');
      navigation.navigate('Device', { device });
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title={scanning ? 'Stop Scan' : 'Start Scan'}
          onPress={scanning ? stopScan : startScan}
        />
        <Text style={styles.count}>Found {devices.length} devices</Text>
      </View>

      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.deviceItem}
            onPress={() => connectToDevice(item)}
          >
            <Text style={styles.deviceName}>{item.name || 'Unknown'}</Text>
            <Text style={styles.deviceId}>{item.id}</Text>
            <Text style={styles.deviceRssi}>RSSI: {item.rssi}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  count: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  deviceItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceId: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  deviceRssi: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});

export default ScanScreen;
```

### DeviceScreen.tsx
```typescript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { Device } from 'react-native-ble-plx';
import { bleManager } from '../../App';

interface Props {
  route: {
    params: {
      device: Device;
    };
  };
}

const DeviceScreen: React.FC<Props> = ({ route }) => {
  const { device } = route.params;
  const [services, setServices] = useState<any[]>([]);
  const [rssi, setRssi] = useState<number | null>(null);
  const [writeValue, setWriteValue] = useState('00');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const servicesData = await bleManager.servicesForDevice(device.id);
      setServices(servicesData);
    } catch (error) {
      console.error('Failed to load services:', error);
    }
  };

  const readRSSI = async () => {
    try {
      const updatedDevice = await bleManager.readRSSIForDevice(device.id);
      setRssi(updatedDevice.rssi);
      Alert.alert('RSSI', `${updatedDevice.rssi} dBm`);
    } catch (error) {
      console.error('RSSI read failed:', error);
    }
  };

  const readCharacteristic = async (serviceUUID: string, charUUID: string) => {
    try {
      const char = await bleManager.readCharacteristicForDevice(
        device.id,
        serviceUUID,
        charUUID
      );
      Alert.alert('Read', `Value: ${char.value}`);
    } catch (error) {
      console.error('Read failed:', error);
      Alert.alert('Error', 'Read failed');
    }
  };

  const writeCharacteristic = async (serviceUUID: string, charUUID: string) => {
    try {
      const valueBase64 = Buffer.from(writeValue, 'hex').toString('base64');
      await bleManager.writeCharacteristicWithResponseForDevice(
        device.id,
        serviceUUID,
        charUUID,
        valueBase64
      );
      Alert.alert('Success', 'Write completed');
    } catch (error) {
      console.error('Write failed:', error);
      Alert.alert('Error', 'Write failed');
    }
  };

  const monitorCharacteristic = async (serviceUUID: string, charUUID: string) => {
    const subscription = bleManager.monitorCharacteristicForDevice(
      device.id,
      serviceUUID,
      charUUID,
      (error, char) => {
        if (error) {
          console.error('Monitor error:', error);
          return;
        }
        console.log('Notification:', char?.value);
        Alert.alert('Notification', `Value: ${char?.value}`);
      }
    );

    // Auto-unsubscribe after 30 seconds
    setTimeout(() => subscription.remove(), 30000);
  };

  const disconnect = async () => {
    try {
      await bleManager.cancelDeviceConnection(device.id);
      Alert.alert('Disconnected', 'Device disconnected');
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.deviceName}>{device.name || 'Unknown'}</Text>
        <Text style={styles.deviceId}>{device.id}</Text>
        {rssi && <Text style={styles.rssi}>RSSI: {rssi} dBm</Text>}
      </View>

      <View style={styles.actions}>
        <Button title="Read RSSI" onPress={readRSSI} />
        <Button title="Disconnect" onPress={disconnect} color="#F44336" />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Write value (hex)"
        value={writeValue}
        onChangeText={setWriteValue}
      />

      <FlatList
        data={services}
        keyExtractor={item => item.uuid}
        renderItem={({ item: service }) => (
          <View style={styles.serviceItem}>
            <Text style={styles.serviceUuid}>Service: {service.uuid}</Text>
            {service.characteristics?.map((char: any) => (
              <View key={char.uuid} style={styles.charItem}>
                <Text style={styles.charUuid}>{char.uuid}</Text>
                <View style={styles.charActions}>
                  {char.isReadable && (
                    <Button
                      title="Read"
                      onPress={() => readCharacteristic(service.uuid, char.uuid)}
                    />
                  )}
                  {char.isWritableWithResponse && (
                    <Button
                      title="Write"
                      onPress={() => writeCharacteristic(service.uuid, char.uuid)}
                    />
                  )}
                  {char.isNotifiable && (
                    <Button
                      title="Monitor"
                      onPress={() => monitorCharacteristic(service.uuid, char.uuid)}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deviceName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deviceId: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  rssi: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  serviceItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  serviceUuid: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  charItem: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  charUuid: {
    fontSize: 12,
    marginBottom: 4,
  },
  charActions: {
    flexDirection: 'row',
    gap: 4,
  },
});

export default DeviceScreen;
```

## Acceptance Criteria
- [ ] App builds and runs in iOS Simulator
- [ ] App builds and runs in Android Emulator
- [ ] State monitor shows current BLE state
- [ ] Scan discovers nearby peripherals
- [ ] Scan results update in real-time
- [ ] Can connect to discovered device
- [ ] Can discover services and characteristics
- [ ] Can read characteristics
- [ ] Can write characteristics with response
- [ ] Can monitor notifications
- [ ] Can read RSSI
- [ ] Can disconnect from device
- [ ] Error handling shows user-friendly messages
- [ ] All operations work through proxy

## Testing Instructions
```bash
# Create test app
cd /Users/ericfrank/ble_bridge
npx react-native init BleProxyTestApp --template react-native-template-typescript
cd BleProxyTestApp

# Install dependencies
npm install ../client
npm install react-native-ble-plx
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

# Copy test components
cp -r ../test-app/src ./

# Start Swift server
cd /Users/ericfrank/ble_bridge/server
swift run BLEProxyServer &

# Run app in simulator
cd /Users/ericfrank/ble_bridge/BleProxyTestApp
npm run ios

# Test workflow:
# 1. Verify state shows "PoweredOn"
# 2. Tap "Start Scan"
# 3. Verify devices appear in list
# 4. Tap a device to connect
# 5. Verify services/characteristics appear
# 6. Test read/write/monitor operations
# 7. Verify RSSI reading
# 8. Test disconnection
```

## Dependencies
- Step 12: ProxyBleManager complete
- Step 10: WebSocket server
- React Navigation
- Physical BLE peripheral (heart rate monitor, Nordic UART, etc.)
- Swift server running on localhost:5050

## Risks/Blockers
- iOS Simulator may not show permission dialogs (expected)
- Need real BLE peripheral nearby
- Server must be running before app launch
- Network connectivity issues between simulator and localhost
- React Native version compatibility
- Metro bundler configuration for protobuf files
- Error messages may not be user-friendly
- Need to handle app backgrounding/foregrounding

## Recommended Agent
react-native-app-developer

## Estimated Time
3 hours
