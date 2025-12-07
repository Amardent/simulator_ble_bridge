/**
 * Re-export types from react-native-ble-plx for convenience
 * Types are imported conditionally to support Node.js testing
 */
export type BleManagerInterface = any;
export type Device = any;
export type Service = any;
export type Characteristic = any;
export type Descriptor = any;
export type ScanOptions = any;
export type ConnectionOptions = any;
export type Subscription = any;

/**
 * Bluetooth manager state enum
 * Matches react-native-ble-plx State enum
 */
export enum State {
  Unknown = 'Unknown',
  Resetting = 'Resetting',
  Unsupported = 'Unsupported',
  Unauthorized = 'Unauthorized',
  PoweredOff = 'PoweredOff',
  PoweredOn = 'PoweredOn',
}

/**
 * Error codes matching react-native-ble-plx
 * Complete list from react-native-ble-plx v3.3.0+
 */
export enum BleErrorCode {
  // Implementation-Specific Errors (0-5)
  UnknownError = 0,
  BluetoothManagerDestroyed = 1,
  OperationCancelled = 2,
  OperationTimedOut = 3,
  OperationStartFailed = 4,
  InvalidIdentifiers = 5,

  // Bluetooth State Errors (100-106)
  BluetoothUnsupported = 100,
  BluetoothUnauthorized = 101,
  BluetoothPoweredOff = 102,
  BluetoothInUnknownState = 103,
  BluetoothResetting = 104,
  BluetoothStateChangeFailed = 105,

  // Device Connection Errors (200-208)
  DeviceConnectionFailed = 200,
  DeviceDisconnected = 201,
  DeviceRSSIReadFailed = 202,
  DeviceAlreadyConnected = 203,
  DeviceNotFound = 204,
  DeviceNotConnected = 205,
  DeviceMTUChangeFailed = 206,

  // Service Discovery Errors (300-303)
  ServicesDiscoveryFailed = 300,
  IncludedServicesDiscoveryFailed = 301,
  ServiceNotFound = 302,
  ServicesNotDiscovered = 303,

  // Characteristic Errors (400-409)
  CharacteristicsDiscoveryFailed = 400,
  CharacteristicWriteFailed = 401,
  CharacteristicReadFailed = 402,
  CharacteristicNotifyChangeFailed = 403,
  CharacteristicNotFound = 404,
  CharacteristicsNotDiscovered = 405,
  CharacteristicInvalidDataFormat = 406,

  // Descriptor Errors (500-506)
  DescriptorsDiscoveryFailed = 500,
  DescriptorWriteFailed = 501,
  DescriptorReadFailed = 502,
  DescriptorNotFound = 503,
  DescriptorsNotDiscovered = 504,
  DescriptorInvalidDataFormat = 505,
  DescriptorWriteNotAllowed = 506,

  // Scanning Errors (600-601)
  ScanStartFailed = 600,
  LocationServicesDisabled = 601,

  // Additional error for proxy (1000+)
  ServerError = 1000,
}

/**
 * BLE Error class matching react-native-ble-plx error structure
 */
export class BleError extends Error {
  constructor(
    public errorCode: BleErrorCode,
    message: string,
    public reason?: string
  ) {
    super(message);
    this.name = 'BleError';
  }
}
