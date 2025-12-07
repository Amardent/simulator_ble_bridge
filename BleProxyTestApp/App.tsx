import React, { useState, useEffect, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { createBleManager } from 'react-native-ble-proxy';
import type { Device, Service, Characteristic } from 'react-native-ble-plx';

const bleManager = createBleManager();

const App = () => {
  const [bleState, setBleState] = useState('Unknown');
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [expandedDevice, setExpandedDevice] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);
  const [writeValue, setWriteValue] = useState('');
  const [monitoringChar, setMonitoringChar] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState('');
  const [useAMDTFilter, setUseAMDTFilter] = useState(false);

  useEffect(() => {
    const subscription = bleManager.onStateChange((state) => {
      setBleState(state);
    }, true);

    return () => subscription.remove();
  }, []);

  const startScan = () => {
    setDevices([]);
    setIsScanning(true);

    // AMDT service UUID for filtering
    const amdtServiceUUID = '4C3F067B-0000-4E8B-80AF-F4AA7553E25E';
    const serviceUUIDs = useAMDTFilter ? [amdtServiceUUID] : null;

    bleManager.startDeviceScan(serviceUUIDs, null, (error, device) => {
      if (error) {
        Alert.alert('Scan Error', error.message);
        setIsScanning(false);
        return;
      }

      if (device) {
        setDevices((prev) => {
          const existing = prev.find((d) => d.id === device.id);
          if (existing) {
            return prev.map((d) => (d.id === device.id ? device : d));
          }
          return [...prev, device];
        });
      }
    });

    setTimeout(() => {
      bleManager.stopDeviceScan();
      setIsScanning(false);
    }, 10000);
  };

  // Filter and sort devices for display
  const filteredDevices = useMemo(() => {
    let filtered = devices;

    // Apply name filter
    if (nameFilter) {
      filtered = filtered.filter((device) => {
        const name = device.name || '';
        return name.toLowerCase().includes(nameFilter.toLowerCase());
      });
    }

    // Sort by RSSI (strongest signal first)
    filtered = [...filtered].sort((a, b) => {
      const rssiA = a.rssi || -100;
      const rssiB = b.rssi || -100;
      return rssiB - rssiA; // Higher RSSI first
    });

    return filtered;
  }, [devices, nameFilter]);

  const stopScan = () => {
    bleManager.stopDeviceScan();
    setIsScanning(false);
  };

  const connectToDevice = async (device: Device) => {
    try {
      stopScan();
      const connected = await bleManager.connectToDevice(device.id);
      const discoveredServices = await connected.discoverAllServicesAndCharacteristics();
      const svcs = await discoveredServices.services();
      setServices(svcs);
      setExpandedDevice(device.id);
      Alert.alert('Connected', `Connected to ${device.name || device.id}`);
    } catch (error: any) {
      Alert.alert('Connection Error', error.message);
    }
  };

  const disconnectDevice = async (deviceId: string) => {
    try {
      await bleManager.cancelDeviceConnection(deviceId);
      setExpandedDevice(null);
      setServices([]);
      setCharacteristics([]);
      Alert.alert('Disconnected', 'Device disconnected');
    } catch (error: any) {
      Alert.alert('Disconnect Error', error.message);
    }
  };

  const loadCharacteristics = async (service: Service) => {
    try {
      const chars = await service.characteristics();
      setCharacteristics(chars);
      setExpandedService(service.uuid);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const readCharacteristic = async (char: Characteristic) => {
    try {
      const result = await char.read();
      const value = result.value ? Buffer.from(result.value, 'base64').toString('hex') : 'null';
      Alert.alert('Read Value', value);
    } catch (error: any) {
      Alert.alert('Read Error', error.message);
    }
  };

  const writeCharacteristic = async (char: Characteristic) => {
    try {
      const base64Value = Buffer.from(writeValue, 'hex').toString('base64');
      await char.writeWithResponse(base64Value);
      Alert.alert('Success', 'Write completed');
    } catch (error: any) {
      Alert.alert('Write Error', error.message);
    }
  };

  const monitorCharacteristic = (char: Characteristic) => {
    setMonitoringChar(char.uuid);
    char.monitor((error, updated) => {
      if (error) {
        Alert.alert('Monitor Error', error.message);
        setMonitoringChar(null);
        return;
      }
      if (updated?.value) {
        const hex = Buffer.from(updated.value, 'base64').toString('hex');
        Alert.alert('Notification', `Value: ${hex}`);
      }
    });

    setTimeout(() => {
      setMonitoringChar(null);
    }, 30000);
  };

  const readRSSI = async (deviceId: string) => {
    try {
      const device = await bleManager.readRSSIForDevice(deviceId);
      Alert.alert('RSSI', `${device.rssi} dBm`);
    } catch (error: any) {
      Alert.alert('RSSI Error', error.message);
    }
  };

  const getStateColor = () => {
    switch (bleState) {
      case 'PoweredOn': return '#4CAF50';
      case 'PoweredOff': return '#F44336';
      case 'Unauthorized': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const hexToBase64 = (hex: string): string => {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return btoa(String.fromCharCode(...bytes));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.stateBar, { backgroundColor: getStateColor() }]}>
        <Text style={styles.stateText}>BLE State: {bleState}</Text>
      </View>

      <View style={styles.filters}>
        <TextInput
          style={styles.filterInput}
          placeholder="Filter by name..."
          value={nameFilter}
          onChangeText={setNameFilter}
        />
        <TouchableOpacity
          style={[styles.filterButton, useAMDTFilter && styles.filterButtonActive]}
          onPress={() => setUseAMDTFilter(!useAMDTFilter)}
        >
          <Text style={styles.filterButtonText}>
            {useAMDTFilter ? '✓ AMDT Filter' : 'AMDT Filter'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, isScanning && styles.buttonDisabled]}
          onPress={startScan}
          disabled={isScanning}
        >
          <Text style={styles.buttonText}>Start Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isScanning && styles.buttonDisabled]}
          onPress={stopScan}
          disabled={!isScanning}
        >
          <Text style={styles.buttonText}>Stop Scan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {filteredDevices.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {isScanning ? 'Scanning...' : 'No devices found'}
            </Text>
            {nameFilter && !isScanning && (
              <Text style={styles.emptyStateHint}>
                Try adjusting the name filter
              </Text>
            )}
          </View>
        )}
        {filteredDevices.map((device) => (
          <View key={device.id} style={styles.deviceCard}>
            <TouchableOpacity
              onPress={() => {
                if (expandedDevice === device.id) {
                  disconnectDevice(device.id);
                } else {
                  connectToDevice(device);
                }
              }}
            >
              <Text style={styles.deviceName}>{device.name || 'Unknown'}</Text>
              <Text style={styles.deviceId}>{device.id}</Text>
              <Text style={styles.deviceRssi}>RSSI: {device.rssi} dBm</Text>
            </TouchableOpacity>

            {expandedDevice === device.id && (
              <View style={styles.deviceDetails}>
                <TouchableOpacity
                  style={styles.smallButton}
                  onPress={() => readRSSI(device.id)}
                >
                  <Text style={styles.buttonText}>Read RSSI</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Services:</Text>
                {services.map((service) => (
                  <View key={service.uuid} style={styles.serviceCard}>
                    <TouchableOpacity
                      onPress={() => loadCharacteristics(service)}
                    >
                      <Text style={styles.uuid}>{service.uuid}</Text>
                    </TouchableOpacity>

                    {expandedService === service.uuid && (
                      <View style={styles.characteristicsList}>
                        <Text style={styles.sectionTitle}>Characteristics:</Text>
                        {characteristics.map((char) => (
                          <View key={char.uuid} style={styles.charCard}>
                            <Text style={styles.uuid}>{char.uuid}</Text>
                            <Text style={styles.properties}>
                              {char.isReadable && 'R '}{char.isWritableWithResponse && 'W '}{char.isNotifiable && 'N'}
                            </Text>

                            <View style={styles.charButtons}>
                              {char.isReadable && (
                                <TouchableOpacity
                                  style={styles.tinyButton}
                                  onPress={() => readCharacteristic(char)}
                                >
                                  <Text style={styles.tinyButtonText}>Read</Text>
                                </TouchableOpacity>
                              )}

                              {char.isWritableWithResponse && (
                                <TouchableOpacity
                                  style={styles.tinyButton}
                                  onPress={() => writeCharacteristic(char)}
                                >
                                  <Text style={styles.tinyButtonText}>Write</Text>
                                </TouchableOpacity>
                              )}

                              {char.isNotifiable && (
                                <TouchableOpacity
                                  style={[
                                    styles.tinyButton,
                                    monitoringChar === char.uuid && styles.monitoring
                                  ]}
                                  onPress={() => monitorCharacteristic(char)}
                                  disabled={monitoringChar === char.uuid}
                                >
                                  <Text style={styles.tinyButtonText}>
                                    {monitoringChar === char.uuid ? 'Monitoring...' : 'Monitor'}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                        ))}

                        <TextInput
                          style={styles.input}
                          placeholder="Hex value (e.g., 01ff)"
                          value={writeValue}
                          onChangeText={setWriteValue}
                        />
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  stateBar: {
    padding: 10,
    alignItems: 'center',
  },
  stateText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filters: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 0,
    gap: 10,
  },
  filterInput: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: '#9E9E9E',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    minWidth: 100,
  },
  filterButtonActive: {
    backgroundColor: '#4CAF50',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10,
  },
  emptyStateHint: {
    fontSize: 14,
    color: '#bbb',
  },
  deviceCard: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deviceName: {
    fontSize: 18,
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
  deviceDetails: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  serviceCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  uuid: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
  },
  characteristicsList: {
    marginTop: 10,
  },
  charCard: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  properties: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  charButtons: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 5,
  },
  smallButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  tinyButton: {
    backgroundColor: '#2196F3',
    padding: 6,
    borderRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  tinyButtonText: {
    color: 'white',
    fontSize: 12,
  },
  monitoring: {
    backgroundColor: '#FF9800',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },
});

export default App;
