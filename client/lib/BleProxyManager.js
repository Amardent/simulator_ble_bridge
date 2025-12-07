"use strict";
// ABOUTME: BLE Manager implementation that proxies calls to server via HTTP/WebSocket
// ABOUTME: Provides react-native-ble-plx API compatibility for simulator environments
Object.defineProperty(exports, "__esModule", { value: true });
exports.BleProxyManager = void 0;
const buffer_1 = require("buffer");
const ProxyClient_1 = require("./ProxyClient");
const PlatformDetector_1 = require("./PlatformDetector");
const ble_proxy_1 = require("./generated/ble_proxy");
const types_1 = require("./types");
class BleProxyManager {
    constructor() {
        this.initialized = false;
        this.scanListener = null;
        this.scanEventHandler = null;
        this.monitorListeners = new Map();
        this.connectedDevices = new Set();
        this.deviceCache = new Map();
        this.stateListeners = new Set();
        this.currentState = types_1.State.Unknown;
        this.client = new ProxyClient_1.ProxyClient(PlatformDetector_1.PlatformDetector.getProxyUrl(), PlatformDetector_1.PlatformDetector.getWebSocketUrl());
    }
    async state() {
        await this.ensureInitialized();
        const response = await this.client.request('/v1/state', ble_proxy_1.bleproxy.v1.StateRequest, ble_proxy_1.bleproxy.v1.StateResponse, {});
        return this.convertManagerState(response.state);
    }
    onStateChange(listener, emitCurrentState) {
        this.stateListeners.add(listener);
        // Listen for state change events from server
        this.client.on('managerState', (event) => {
            const newState = this.convertManagerState(event.state);
            this.currentState = newState;
            this.stateListeners.forEach((l) => l(newState));
        });
        // Emit current state if requested
        if (emitCurrentState) {
            this.state()
                .then((state) => {
                this.currentState = state;
                listener(state);
            })
                .catch((error) => {
                console.error('[BLE Proxy] Failed to get initial state:', error);
            });
        }
        return {
            remove: () => {
                this.stateListeners.delete(listener);
            },
        };
    }
    startDeviceScan(UUIDs, options, listener) {
        console.log('[BLE Proxy] startDeviceScan called');
        this.ensureInitialized()
            .then(async () => {
            // Remove old listener if it exists
            if (this.scanEventHandler) {
                console.log('[BLE Proxy] Removing old scan event handler');
                this.client.off('scanResult', this.scanEventHandler);
            }
            this.scanListener = listener;
            // Store the handler so we can remove it later
            this.scanEventHandler = (event) => {
                console.log('[BLE Proxy] Received scan result event:', event.device?.id);
                if (this.scanListener && event.device) {
                    const device = this.convertDevice(event.device);
                    this.deviceCache.set(device.id, device);
                    this.scanListener(null, device);
                }
            };
            this.client.on('scanResult', this.scanEventHandler);
            console.log('[BLE Proxy] Added new scan event handler');
            await this.client.request('/v1/scan/start', ble_proxy_1.bleproxy.v1.StartScanRequest, ble_proxy_1.bleproxy.v1.StartScanResponse, {
                serviceUuids: UUIDs || [],
                options: options ? this.convertOptionsToStrings(options) : {},
            });
            console.log('[BLE Proxy] Start scan HTTP request completed');
        })
            .catch((error) => {
            console.error('[BLE Proxy] Start scan error:', error);
            if (listener) {
                listener(error, null);
            }
        });
    }
    stopDeviceScan() {
        console.log('[BLE Proxy] stopDeviceScan called');
        // Remove the stored event handler
        if (this.scanEventHandler) {
            console.log('[BLE Proxy] Removing scan event handler');
            this.client.off('scanResult', this.scanEventHandler);
            this.scanEventHandler = null;
        }
        this.scanListener = null;
        if (this.initialized) {
            this.client
                .request('/v1/scan/stop', ble_proxy_1.bleproxy.v1.StopScanRequest, ble_proxy_1.bleproxy.v1.StopScanResponse, {})
                .then(() => {
                console.log('[BLE Proxy] Stop scan HTTP request completed');
            })
                .catch((error) => {
                console.error('[BLE Proxy] Failed to stop scan:', error);
            });
        }
    }
    async connectToDevice(deviceId, options) {
        await this.ensureInitialized();
        this.client.on('peripheralConnected', (event) => {
            if (event.deviceId === deviceId) {
                this.connectedDevices.add(deviceId);
            }
        });
        this.client.on('peripheralDisconnected', (event) => {
            if (event.deviceId === deviceId) {
                this.connectedDevices.delete(deviceId);
            }
        });
        const response = await this.client.request('/v1/device/connect', ble_proxy_1.bleproxy.v1.ConnectRequest, ble_proxy_1.bleproxy.v1.ConnectResponse, {
            deviceId,
            options: options ? this.convertOptionsToStrings(options) : {},
        });
        this.connectedDevices.add(deviceId);
        // If server returned device info, use it; otherwise use cached device from scan
        let device;
        if (response.device) {
            device = this.convertDevice(response.device);
            this.deviceCache.set(deviceId, device);
        }
        else {
            // Fallback to cached device or create minimal device object
            device = this.deviceCache.get(deviceId) || {
                id: deviceId,
                name: null,
                rssi: null,
                mtu: null,
                manufacturerData: null,
                serviceData: null,
                serviceUUIDs: null,
                localName: null,
                txPowerLevel: null,
                solicitedServiceUUIDs: null,
                isConnectable: null,
                overflowServiceUUIDs: null,
            };
        }
        return device;
    }
    async cancelDeviceConnection(deviceId) {
        await this.ensureInitialized();
        await this.client.request('/v1/device/disconnect', ble_proxy_1.bleproxy.v1.DisconnectRequest, ble_proxy_1.bleproxy.v1.DisconnectResponse, {
            deviceId,
        });
        this.connectedDevices.delete(deviceId);
        const cached = this.deviceCache.get(deviceId);
        if (!cached) {
            throw new types_1.BleError(types_1.BleErrorCode.DeviceNotFound, `Device ${deviceId} not found in cache`);
        }
        return cached;
    }
    async isDeviceConnected(deviceId) {
        return this.connectedDevices.has(deviceId);
    }
    async discoverAllServicesAndCharacteristicsForDevice(deviceId) {
        await this.ensureInitialized();
        await this.client.request('/v1/device/discover', ble_proxy_1.bleproxy.v1.DiscoverRequest, ble_proxy_1.bleproxy.v1.DiscoverResponse, {
            deviceId,
        });
        const cached = this.deviceCache.get(deviceId);
        if (!cached) {
            throw new types_1.BleError(types_1.BleErrorCode.DeviceNotFound, `Device ${deviceId} not found in cache`);
        }
        return cached;
    }
    async servicesForDevice(deviceId) {
        await this.ensureInitialized();
        const response = await this.client.request('/v1/device/services', ble_proxy_1.bleproxy.v1.ServicesRequest, ble_proxy_1.bleproxy.v1.ServicesResponse, {
            deviceId,
        });
        return response.services.map((s) => this.convertService(deviceId, s));
    }
    async characteristicsForDevice(deviceId, serviceUUID) {
        await this.ensureInitialized();
        const response = await this.client.request('/v1/device/characteristics', ble_proxy_1.bleproxy.v1.CharacteristicsRequest, ble_proxy_1.bleproxy.v1.CharacteristicsResponse, {
            deviceId,
            serviceUuid: serviceUUID,
        });
        return response.characteristics.map((c) => this.convertCharacteristic(deviceId, serviceUUID, c));
    }
    async readCharacteristicForDevice(deviceId, serviceUUID, characteristicUUID) {
        await this.ensureInitialized();
        const response = await this.client.request('/v1/device/read', ble_proxy_1.bleproxy.v1.ReadRequest, ble_proxy_1.bleproxy.v1.ReadResponse, {
            deviceId,
            serviceUuid: serviceUUID,
            characteristicUuid: characteristicUUID,
        });
        const characteristic = {
            id: 0,
            uuid: characteristicUUID,
            serviceID: 0,
            serviceUUID: serviceUUID,
            deviceID: deviceId,
            isReadable: true,
            isWritableWithResponse: false,
            isWritableWithoutResponse: false,
            isNotifiable: false,
            isNotifying: false,
            isIndicatable: false,
            value: response.value ? buffer_1.Buffer.from(response.value).toString('base64') : null,
        };
        return characteristic;
    }
    async writeCharacteristicWithResponseForDevice(deviceId, serviceUUID, characteristicUUID, valueBase64) {
        return this.writeCharacteristic(deviceId, serviceUUID, characteristicUUID, valueBase64, true);
    }
    async writeCharacteristicWithoutResponseForDevice(deviceId, serviceUUID, characteristicUUID, valueBase64) {
        return this.writeCharacteristic(deviceId, serviceUUID, characteristicUUID, valueBase64, false);
    }
    monitorCharacteristicForDevice(deviceId, serviceUUID, characteristicUUID, listener) {
        const monitorKey = `${deviceId}-${serviceUUID}-${characteristicUUID}`;
        if (!this.monitorListeners.has(monitorKey)) {
            this.monitorListeners.set(monitorKey, new Set());
            this.client.on('characteristicValueUpdated', (event) => {
                if (event.deviceId === deviceId &&
                    event.serviceUuid === serviceUUID &&
                    event.characteristicUuid === characteristicUUID) {
                    const listeners = this.monitorListeners.get(monitorKey);
                    if (listeners && event.value) {
                        const characteristic = {
                            id: 0,
                            uuid: characteristicUUID,
                            serviceID: 0,
                            serviceUUID: serviceUUID,
                            deviceID: deviceId,
                            isReadable: false,
                            isWritableWithResponse: false,
                            isWritableWithoutResponse: false,
                            isNotifiable: true,
                            isNotifying: true,
                            isIndicatable: false,
                            value: buffer_1.Buffer.from(event.value).toString('base64'),
                        };
                        listeners.forEach((l) => l(null, characteristic));
                    }
                }
            });
            this.ensureInitialized()
                .then(() => this.client.request('/v1/device/monitor', ble_proxy_1.bleproxy.v1.MonitorRequest, ble_proxy_1.bleproxy.v1.MonitorResponse, {
                deviceId,
                serviceUuid: serviceUUID,
                characteristicUuid: characteristicUUID,
                enable: true,
            }))
                .catch((error) => {
                listener(error, null);
            });
        }
        this.monitorListeners.get(monitorKey).add(listener);
        return {
            remove: () => {
                const listeners = this.monitorListeners.get(monitorKey);
                if (listeners) {
                    listeners.delete(listener);
                    if (listeners.size === 0) {
                        this.monitorListeners.delete(monitorKey);
                        if (this.initialized) {
                            this.client
                                .request('/v1/device/monitor', ble_proxy_1.bleproxy.v1.MonitorRequest, ble_proxy_1.bleproxy.v1.MonitorResponse, {
                                deviceId,
                                serviceUuid: serviceUUID,
                                characteristicUuid: characteristicUUID,
                                enable: false,
                            })
                                .catch((error) => {
                                console.error('[BLE Proxy] Failed to disable monitoring:', error);
                            });
                        }
                    }
                }
            },
        };
    }
    async readRSSIForDevice(deviceId) {
        await this.ensureInitialized();
        const response = await this.client.request('/v1/device/rssi', ble_proxy_1.bleproxy.v1.RSSIRequest, ble_proxy_1.bleproxy.v1.RSSIResponse, {
            deviceId,
        });
        const cached = this.deviceCache.get(deviceId);
        if (!cached) {
            throw new types_1.BleError(types_1.BleErrorCode.DeviceNotFound, `Device ${deviceId} not found in cache`);
        }
        const updatedDevice = { ...cached, rssi: response.rssi !== undefined ? response.rssi : null };
        this.deviceCache.set(deviceId, updatedDevice);
        return updatedDevice;
    }
    destroy() {
        this.stopDeviceScan();
        this.monitorListeners.clear();
        this.connectedDevices.clear();
        this.client.disconnect();
        this.initialized = false;
    }
    async ensureInitialized() {
        if (!this.initialized) {
            await this.client.connect();
            this.initialized = true;
        }
    }
    async writeCharacteristic(deviceId, serviceUUID, characteristicUUID, valueBase64, withResponse) {
        await this.ensureInitialized();
        const value = buffer_1.Buffer.from(valueBase64, 'base64');
        await this.client.request('/v1/device/write', ble_proxy_1.bleproxy.v1.WriteRequest, ble_proxy_1.bleproxy.v1.WriteResponse, {
            deviceId,
            serviceUuid: serviceUUID,
            characteristicUuid: characteristicUUID,
            value: new Uint8Array(value),
            withResponse,
        });
        const characteristic = {
            id: 0,
            uuid: characteristicUUID,
            serviceID: 0,
            serviceUUID: serviceUUID,
            deviceID: deviceId,
            isReadable: false,
            isWritableWithResponse: withResponse,
            isWritableWithoutResponse: !withResponse,
            isNotifiable: false,
            isNotifying: false,
            isIndicatable: false,
            value: valueBase64,
        };
        return characteristic;
    }
    convertManagerState(state) {
        switch (state) {
            case ble_proxy_1.bleproxy.v1.ManagerState.MANAGER_STATE_UNKNOWN:
                return types_1.State.Unknown;
            case ble_proxy_1.bleproxy.v1.ManagerState.MANAGER_STATE_RESETTING:
                return types_1.State.Resetting;
            case ble_proxy_1.bleproxy.v1.ManagerState.MANAGER_STATE_UNSUPPORTED:
                return types_1.State.Unsupported;
            case ble_proxy_1.bleproxy.v1.ManagerState.MANAGER_STATE_UNAUTHORIZED:
                return types_1.State.Unauthorized;
            case ble_proxy_1.bleproxy.v1.ManagerState.MANAGER_STATE_POWERED_OFF:
                return types_1.State.PoweredOff;
            case ble_proxy_1.bleproxy.v1.ManagerState.MANAGER_STATE_POWERED_ON:
                return types_1.State.PoweredOn;
            default:
                return types_1.State.Unknown;
        }
    }
    convertDevice(protoDevice) {
        const device = {
            id: protoDevice.id,
            name: protoDevice.name || null,
            rssi: protoDevice.rssi !== undefined ? protoDevice.rssi : null,
            mtu: protoDevice.mtu !== undefined ? protoDevice.mtu : 23,
            manufacturerData: protoDevice.manufacturerData
                ? buffer_1.Buffer.from(protoDevice.manufacturerData).toString('base64')
                : null,
            serviceUUIDs: protoDevice.serviceUuids || null,
            serviceData: protoDevice.serviceData
                ? this.convertServiceData(protoDevice.serviceData)
                : null,
            txPowerLevel: protoDevice.txPowerLevel !== undefined ? protoDevice.txPowerLevel : null,
            isConnectable: protoDevice.isConnectable !== undefined ? protoDevice.isConnectable : false,
            solicitedServiceUUIDs: protoDevice.solicitedServiceUuids || null,
            overflowServiceUUIDs: protoDevice.overflowServiceUuids || null,
            localName: protoDevice.name || null,
        };
        return device;
    }
    convertServiceData(protoServiceData) {
        const result = {};
        for (const [uuid, data] of Object.entries(protoServiceData)) {
            result[uuid] = buffer_1.Buffer.from(data).toString('base64');
        }
        return result;
    }
    convertService(deviceId, protoService) {
        const service = {
            id: 0,
            uuid: protoService.uuid,
            deviceID: deviceId,
            isPrimary: protoService.isPrimary !== undefined ? protoService.isPrimary : true,
        };
        return service;
    }
    convertCharacteristic(deviceId, serviceUUID, protoChar) {
        const characteristic = {
            id: 0,
            uuid: protoChar.uuid,
            serviceID: 0,
            serviceUUID: serviceUUID,
            deviceID: deviceId,
            isReadable: protoChar.properties?.includes('read') || false,
            isWritableWithResponse: protoChar.properties?.includes('write') || false,
            isWritableWithoutResponse: protoChar.properties?.includes('writeWithoutResponse') || false,
            isNotifiable: protoChar.properties?.includes('notify') || false,
            isNotifying: false,
            isIndicatable: protoChar.properties?.includes('indicate') || false,
            value: protoChar.value ? buffer_1.Buffer.from(protoChar.value).toString('base64') : null,
        };
        return characteristic;
    }
    convertOptionsToStrings(options) {
        const result = {};
        for (const [key, value] of Object.entries(options)) {
            if (value !== undefined && value !== null) {
                result[key] = String(value);
            }
        }
        return result;
    }
}
exports.BleProxyManager = BleProxyManager;
