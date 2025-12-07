// ABOUTME: BLE Manager implementation that proxies calls to server via HTTP/WebSocket
// ABOUTME: Provides react-native-ble-plx API compatibility for simulator environments

import { Buffer } from 'buffer';
import { ProxyClient } from './ProxyClient';
import { PlatformDetector } from './PlatformDetector';
import { bleproxy } from './generated/ble_proxy';
import {
  BleError,
  BleErrorCode,
  State,
  Device,
  Service,
  Characteristic,
  ScanOptions,
  ConnectionOptions,
  Subscription,
} from './types';

type DeviceListener = (error: Error | null, device: Device | null) => void;
type CharacteristicListener = (
  error: Error | null,
  characteristic: Characteristic | null
) => void;

type StateChangeListener = (state: State) => void;

export class BleProxyManager {
  private client: ProxyClient;
  private initialized = false;
  private scanListener: DeviceListener | null = null;
  private scanEventHandler: ((event: bleproxy.v1.IScanResultEvent) => void) | null = null;
  private monitorListeners: Map<string, Set<CharacteristicListener>> = new Map();
  private connectedDevices: Set<string> = new Set();
  private deviceCache: Map<string, Device> = new Map();
  private stateListeners: Set<StateChangeListener> = new Set();
  private currentState: State = State.Unknown;

  constructor() {
    this.client = new ProxyClient(
      PlatformDetector.getProxyUrl(),
      PlatformDetector.getWebSocketUrl()
    );
  }

  async state(): Promise<State> {
    await this.ensureInitialized();

    const response = await this.client.request<
      bleproxy.v1.IStateRequest,
      bleproxy.v1.StateResponse
    >(
      '/v1/state',
      bleproxy.v1.StateRequest,
      bleproxy.v1.StateResponse,
      {}
    );

    return this.convertManagerState(response.state!);
  }

  onStateChange(listener: StateChangeListener, emitCurrentState?: boolean): Subscription {
    this.stateListeners.add(listener);

    // Listen for state change events from server
    this.client.on('managerState', (event: bleproxy.v1.IManagerStateEvent) => {
      const newState = this.convertManagerState(event.state!);
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

  startDeviceScan(
    UUIDs: string[] | null,
    options: ScanOptions | null,
    listener: DeviceListener
  ): void {
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
        this.scanEventHandler = (event: bleproxy.v1.IScanResultEvent) => {
          console.log('[BLE Proxy] Received scan result event:', event.device?.id);
          if (this.scanListener && event.device) {
            const device = this.convertDevice(event.device);
            this.deviceCache.set(device.id, device);
            this.scanListener(null, device);
          }
        };

        this.client.on('scanResult', this.scanEventHandler);
        console.log('[BLE Proxy] Added new scan event handler');

        await this.client.request<
          bleproxy.v1.IStartScanRequest,
          bleproxy.v1.StartScanResponse
        >(
          '/v1/scan/start',
          bleproxy.v1.StartScanRequest,
          bleproxy.v1.StartScanResponse,
          {
            serviceUuids: UUIDs || [],
            options: options ? this.convertOptionsToStrings(options) : {},
          }
        );
        console.log('[BLE Proxy] Start scan HTTP request completed');
      })
      .catch((error) => {
        console.error('[BLE Proxy] Start scan error:', error);
        if (listener) {
          listener(error, null);
        }
      });
  }

  stopDeviceScan(): void {
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
        .request<bleproxy.v1.IStopScanRequest, bleproxy.v1.StopScanResponse>(
          '/v1/scan/stop',
          bleproxy.v1.StopScanRequest,
          bleproxy.v1.StopScanResponse,
          {}
        )
        .then(() => {
          console.log('[BLE Proxy] Stop scan HTTP request completed');
        })
        .catch((error) => {
          console.error('[BLE Proxy] Failed to stop scan:', error);
        });
    }
  }

  async connectToDevice(
    deviceId: string,
    options?: ConnectionOptions
  ): Promise<Device> {
    await this.ensureInitialized();

    this.client.on(
      'peripheralConnected',
      (event: bleproxy.v1.IPeripheralConnectedEvent) => {
        if (event.deviceId === deviceId) {
          this.connectedDevices.add(deviceId);
        }
      }
    );

    this.client.on(
      'peripheralDisconnected',
      (event: bleproxy.v1.IPeripheralDisconnectedEvent) => {
        if (event.deviceId === deviceId) {
          this.connectedDevices.delete(deviceId);
        }
      }
    );

    const response = await this.client.request<
      bleproxy.v1.IConnectRequest,
      bleproxy.v1.ConnectResponse
    >(
      '/v1/device/connect',
      bleproxy.v1.ConnectRequest,
      bleproxy.v1.ConnectResponse,
      {
        deviceId,
        options: options ? this.convertOptionsToStrings(options) : {},
      }
    );

    this.connectedDevices.add(deviceId);

    // If server returned device info, use it; otherwise use cached device from scan
    let device: Device;
    if (response.device) {
      device = this.convertDevice(response.device);
      this.deviceCache.set(deviceId, device);
    } else {
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

  async cancelDeviceConnection(deviceId: string): Promise<Device> {
    await this.ensureInitialized();

    await this.client.request<
      bleproxy.v1.IDisconnectRequest,
      bleproxy.v1.DisconnectResponse
    >(
      '/v1/device/disconnect',
      bleproxy.v1.DisconnectRequest,
      bleproxy.v1.DisconnectResponse,
      {
        deviceId,
      }
    );

    this.connectedDevices.delete(deviceId);

    const cached = this.deviceCache.get(deviceId);
    if (!cached) {
      throw new BleError(
        BleErrorCode.DeviceNotFound,
        `Device ${deviceId} not found in cache`
      );
    }
    return cached;
  }

  async isDeviceConnected(deviceId: string): Promise<boolean> {
    return this.connectedDevices.has(deviceId);
  }

  async discoverAllServicesAndCharacteristicsForDevice(
    deviceId: string
  ): Promise<Device> {
    await this.ensureInitialized();

    await this.client.request<
      bleproxy.v1.IDiscoverRequest,
      bleproxy.v1.DiscoverResponse
    >(
      '/v1/device/discover',
      bleproxy.v1.DiscoverRequest,
      bleproxy.v1.DiscoverResponse,
      {
        deviceId,
      }
    );

    const cached = this.deviceCache.get(deviceId);
    if (!cached) {
      throw new BleError(
        BleErrorCode.DeviceNotFound,
        `Device ${deviceId} not found in cache`
      );
    }
    return cached;
  }

  async servicesForDevice(deviceId: string): Promise<Service[]> {
    await this.ensureInitialized();

    const response = await this.client.request<
      bleproxy.v1.IServicesRequest,
      bleproxy.v1.ServicesResponse
    >(
      '/v1/device/services',
      bleproxy.v1.ServicesRequest,
      bleproxy.v1.ServicesResponse,
      {
        deviceId,
      }
    );

    return response.services!.map((s: bleproxy.v1.IService) =>
      this.convertService(deviceId, s)
    );
  }

  async characteristicsForDevice(
    deviceId: string,
    serviceUUID: string
  ): Promise<Characteristic[]> {
    await this.ensureInitialized();

    const response = await this.client.request<
      bleproxy.v1.ICharacteristicsRequest,
      bleproxy.v1.CharacteristicsResponse
    >(
      '/v1/device/characteristics',
      bleproxy.v1.CharacteristicsRequest,
      bleproxy.v1.CharacteristicsResponse,
      {
        deviceId,
        serviceUuid: serviceUUID,
      }
    );

    return response.characteristics!.map((c: bleproxy.v1.ICharacteristic) =>
      this.convertCharacteristic(deviceId, serviceUUID, c)
    );
  }

  async readCharacteristicForDevice(
    deviceId: string,
    serviceUUID: string,
    characteristicUUID: string
  ): Promise<Characteristic> {
    await this.ensureInitialized();

    const response = await this.client.request<
      bleproxy.v1.IReadRequest,
      bleproxy.v1.ReadResponse
    >(
      '/v1/device/read',
      bleproxy.v1.ReadRequest,
      bleproxy.v1.ReadResponse,
      {
        deviceId,
        serviceUuid: serviceUUID,
        characteristicUuid: characteristicUUID,
      }
    );

    const characteristic: any = {
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
      value: response.value ? Buffer.from(response.value).toString('base64') : null,
    };

    return characteristic as Characteristic;
  }

  async writeCharacteristicWithResponseForDevice(
    deviceId: string,
    serviceUUID: string,
    characteristicUUID: string,
    valueBase64: string
  ): Promise<Characteristic> {
    return this.writeCharacteristic(
      deviceId,
      serviceUUID,
      characteristicUUID,
      valueBase64,
      true
    );
  }

  async writeCharacteristicWithoutResponseForDevice(
    deviceId: string,
    serviceUUID: string,
    characteristicUUID: string,
    valueBase64: string
  ): Promise<Characteristic> {
    return this.writeCharacteristic(
      deviceId,
      serviceUUID,
      characteristicUUID,
      valueBase64,
      false
    );
  }

  monitorCharacteristicForDevice(
    deviceId: string,
    serviceUUID: string,
    characteristicUUID: string,
    listener: CharacteristicListener
  ): Subscription {
    const monitorKey = `${deviceId}-${serviceUUID}-${characteristicUUID}`;

    if (!this.monitorListeners.has(monitorKey)) {
      this.monitorListeners.set(monitorKey, new Set());

      this.client.on(
        'characteristicValueUpdated',
        (event: bleproxy.v1.ICharacteristicValueUpdatedEvent) => {
          if (
            event.deviceId === deviceId &&
            event.serviceUuid === serviceUUID &&
            event.characteristicUuid === characteristicUUID
          ) {
            const listeners = this.monitorListeners.get(monitorKey);
            if (listeners && event.value) {
              const characteristic: any = {
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
                value: Buffer.from(event.value).toString('base64'),
              };
              listeners.forEach((l) => l(null, characteristic as Characteristic));
            }
          }
        }
      );

      this.ensureInitialized()
        .then(() =>
          this.client.request<
            bleproxy.v1.IMonitorRequest,
            bleproxy.v1.MonitorResponse
          >(
            '/v1/device/monitor',
            bleproxy.v1.MonitorRequest,
            bleproxy.v1.MonitorResponse,
            {
              deviceId,
              serviceUuid: serviceUUID,
              characteristicUuid: characteristicUUID,
              enable: true,
            }
          )
        )
        .catch((error) => {
          listener(error, null);
        });
    }

    this.monitorListeners.get(monitorKey)!.add(listener);

    return {
      remove: () => {
        const listeners = this.monitorListeners.get(monitorKey);
        if (listeners) {
          listeners.delete(listener);
          if (listeners.size === 0) {
            this.monitorListeners.delete(monitorKey);

            if (this.initialized) {
              this.client
                .request<bleproxy.v1.IMonitorRequest, bleproxy.v1.MonitorResponse>(
                  '/v1/device/monitor',
                  bleproxy.v1.MonitorRequest,
                  bleproxy.v1.MonitorResponse,
                  {
                    deviceId,
                    serviceUuid: serviceUUID,
                    characteristicUuid: characteristicUUID,
                    enable: false,
                  }
                )
                .catch((error) => {
                  console.error('[BLE Proxy] Failed to disable monitoring:', error);
                });
            }
          }
        }
      },
    };
  }

  async readRSSIForDevice(deviceId: string): Promise<Device> {
    await this.ensureInitialized();

    const response = await this.client.request<
      bleproxy.v1.IRSSIRequest,
      bleproxy.v1.RSSIResponse
    >(
      '/v1/device/rssi',
      bleproxy.v1.RSSIRequest,
      bleproxy.v1.RSSIResponse,
      {
        deviceId,
      }
    );

    const cached = this.deviceCache.get(deviceId);
    if (!cached) {
      throw new BleError(
        BleErrorCode.DeviceNotFound,
        `Device ${deviceId} not found in cache`
      );
    }

    const updatedDevice = { ...cached, rssi: response.rssi !== undefined ? response.rssi : null };
    this.deviceCache.set(deviceId, updatedDevice as Device);
    return updatedDevice as Device;
  }

  destroy(): void {
    this.stopDeviceScan();
    this.monitorListeners.clear();
    this.connectedDevices.clear();
    this.client.disconnect();
    this.initialized = false;
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.client.connect();
      this.initialized = true;
    }
  }

  private async writeCharacteristic(
    deviceId: string,
    serviceUUID: string,
    characteristicUUID: string,
    valueBase64: string,
    withResponse: boolean
  ): Promise<Characteristic> {
    await this.ensureInitialized();

    const value = Buffer.from(valueBase64, 'base64');

    await this.client.request<
      bleproxy.v1.IWriteRequest,
      bleproxy.v1.WriteResponse
    >(
      '/v1/device/write',
      bleproxy.v1.WriteRequest,
      bleproxy.v1.WriteResponse,
      {
        deviceId,
        serviceUuid: serviceUUID,
        characteristicUuid: characteristicUUID,
        value: new Uint8Array(value),
        withResponse,
      }
    );

    const characteristic: any = {
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

    return characteristic as Characteristic;
  }

  private convertManagerState(state: bleproxy.v1.ManagerState): State {
    switch (state) {
      case bleproxy.v1.ManagerState.MANAGER_STATE_UNKNOWN:
        return State.Unknown;
      case bleproxy.v1.ManagerState.MANAGER_STATE_RESETTING:
        return State.Resetting;
      case bleproxy.v1.ManagerState.MANAGER_STATE_UNSUPPORTED:
        return State.Unsupported;
      case bleproxy.v1.ManagerState.MANAGER_STATE_UNAUTHORIZED:
        return State.Unauthorized;
      case bleproxy.v1.ManagerState.MANAGER_STATE_POWERED_OFF:
        return State.PoweredOff;
      case bleproxy.v1.ManagerState.MANAGER_STATE_POWERED_ON:
        return State.PoweredOn;
      default:
        return State.Unknown;
    }
  }

  private convertDevice(protoDevice: bleproxy.v1.IDevice): Device {
    const device: any = {
      id: protoDevice.id!,
      name: protoDevice.name || null,
      rssi: protoDevice.rssi !== undefined ? protoDevice.rssi : null,
      mtu: protoDevice.mtu !== undefined ? protoDevice.mtu : 23,
      manufacturerData: protoDevice.manufacturerData
        ? Buffer.from(protoDevice.manufacturerData).toString('base64')
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

    return device as Device;
  }

  private convertServiceData(protoServiceData: {
    [k: string]: Uint8Array;
  }): { [uuid: string]: string } {
    const result: { [uuid: string]: string } = {};
    for (const [uuid, data] of Object.entries(protoServiceData)) {
      result[uuid] = Buffer.from(data).toString('base64');
    }
    return result;
  }

  private convertService(
    deviceId: string,
    protoService: bleproxy.v1.IService
  ): Service {
    const service: any = {
      id: 0,
      uuid: protoService.uuid!,
      deviceID: deviceId,
      isPrimary: protoService.isPrimary !== undefined ? protoService.isPrimary : true,
    };

    return service as Service;
  }

  private convertCharacteristic(
    deviceId: string,
    serviceUUID: string,
    protoChar: bleproxy.v1.ICharacteristic
  ): Characteristic {
    const characteristic: any = {
      id: 0,
      uuid: protoChar.uuid!,
      serviceID: 0,
      serviceUUID: serviceUUID,
      deviceID: deviceId,
      isReadable: protoChar.properties?.includes('read') || false,
      isWritableWithResponse: protoChar.properties?.includes('write') || false,
      isWritableWithoutResponse: protoChar.properties?.includes('writeWithoutResponse') || false,
      isNotifiable: protoChar.properties?.includes('notify') || false,
      isNotifying: false,
      isIndicatable: protoChar.properties?.includes('indicate') || false,
      value: protoChar.value ? Buffer.from(protoChar.value).toString('base64') : null,
    };

    return characteristic as Characteristic;
  }

  private convertOptionsToStrings(options: any): { [k: string]: string } {
    const result: { [k: string]: string } = {};
    for (const [key, value] of Object.entries(options)) {
      if (value !== undefined && value !== null) {
        result[key] = String(value);
      }
    }
    return result;
  }
}
