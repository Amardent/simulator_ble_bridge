"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BleError = exports.BleErrorCode = exports.State = void 0;
/**
 * Bluetooth manager state enum
 * Matches react-native-ble-plx State enum
 */
var State;
(function (State) {
    State["Unknown"] = "Unknown";
    State["Resetting"] = "Resetting";
    State["Unsupported"] = "Unsupported";
    State["Unauthorized"] = "Unauthorized";
    State["PoweredOff"] = "PoweredOff";
    State["PoweredOn"] = "PoweredOn";
})(State || (exports.State = State = {}));
/**
 * Error codes matching react-native-ble-plx
 * Complete list from react-native-ble-plx v3.3.0+
 */
var BleErrorCode;
(function (BleErrorCode) {
    // Implementation-Specific Errors (0-5)
    BleErrorCode[BleErrorCode["UnknownError"] = 0] = "UnknownError";
    BleErrorCode[BleErrorCode["BluetoothManagerDestroyed"] = 1] = "BluetoothManagerDestroyed";
    BleErrorCode[BleErrorCode["OperationCancelled"] = 2] = "OperationCancelled";
    BleErrorCode[BleErrorCode["OperationTimedOut"] = 3] = "OperationTimedOut";
    BleErrorCode[BleErrorCode["OperationStartFailed"] = 4] = "OperationStartFailed";
    BleErrorCode[BleErrorCode["InvalidIdentifiers"] = 5] = "InvalidIdentifiers";
    // Bluetooth State Errors (100-106)
    BleErrorCode[BleErrorCode["BluetoothUnsupported"] = 100] = "BluetoothUnsupported";
    BleErrorCode[BleErrorCode["BluetoothUnauthorized"] = 101] = "BluetoothUnauthorized";
    BleErrorCode[BleErrorCode["BluetoothPoweredOff"] = 102] = "BluetoothPoweredOff";
    BleErrorCode[BleErrorCode["BluetoothInUnknownState"] = 103] = "BluetoothInUnknownState";
    BleErrorCode[BleErrorCode["BluetoothResetting"] = 104] = "BluetoothResetting";
    BleErrorCode[BleErrorCode["BluetoothStateChangeFailed"] = 105] = "BluetoothStateChangeFailed";
    // Device Connection Errors (200-208)
    BleErrorCode[BleErrorCode["DeviceConnectionFailed"] = 200] = "DeviceConnectionFailed";
    BleErrorCode[BleErrorCode["DeviceDisconnected"] = 201] = "DeviceDisconnected";
    BleErrorCode[BleErrorCode["DeviceRSSIReadFailed"] = 202] = "DeviceRSSIReadFailed";
    BleErrorCode[BleErrorCode["DeviceAlreadyConnected"] = 203] = "DeviceAlreadyConnected";
    BleErrorCode[BleErrorCode["DeviceNotFound"] = 204] = "DeviceNotFound";
    BleErrorCode[BleErrorCode["DeviceNotConnected"] = 205] = "DeviceNotConnected";
    BleErrorCode[BleErrorCode["DeviceMTUChangeFailed"] = 206] = "DeviceMTUChangeFailed";
    // Service Discovery Errors (300-303)
    BleErrorCode[BleErrorCode["ServicesDiscoveryFailed"] = 300] = "ServicesDiscoveryFailed";
    BleErrorCode[BleErrorCode["IncludedServicesDiscoveryFailed"] = 301] = "IncludedServicesDiscoveryFailed";
    BleErrorCode[BleErrorCode["ServiceNotFound"] = 302] = "ServiceNotFound";
    BleErrorCode[BleErrorCode["ServicesNotDiscovered"] = 303] = "ServicesNotDiscovered";
    // Characteristic Errors (400-409)
    BleErrorCode[BleErrorCode["CharacteristicsDiscoveryFailed"] = 400] = "CharacteristicsDiscoveryFailed";
    BleErrorCode[BleErrorCode["CharacteristicWriteFailed"] = 401] = "CharacteristicWriteFailed";
    BleErrorCode[BleErrorCode["CharacteristicReadFailed"] = 402] = "CharacteristicReadFailed";
    BleErrorCode[BleErrorCode["CharacteristicNotifyChangeFailed"] = 403] = "CharacteristicNotifyChangeFailed";
    BleErrorCode[BleErrorCode["CharacteristicNotFound"] = 404] = "CharacteristicNotFound";
    BleErrorCode[BleErrorCode["CharacteristicsNotDiscovered"] = 405] = "CharacteristicsNotDiscovered";
    BleErrorCode[BleErrorCode["CharacteristicInvalidDataFormat"] = 406] = "CharacteristicInvalidDataFormat";
    // Descriptor Errors (500-506)
    BleErrorCode[BleErrorCode["DescriptorsDiscoveryFailed"] = 500] = "DescriptorsDiscoveryFailed";
    BleErrorCode[BleErrorCode["DescriptorWriteFailed"] = 501] = "DescriptorWriteFailed";
    BleErrorCode[BleErrorCode["DescriptorReadFailed"] = 502] = "DescriptorReadFailed";
    BleErrorCode[BleErrorCode["DescriptorNotFound"] = 503] = "DescriptorNotFound";
    BleErrorCode[BleErrorCode["DescriptorsNotDiscovered"] = 504] = "DescriptorsNotDiscovered";
    BleErrorCode[BleErrorCode["DescriptorInvalidDataFormat"] = 505] = "DescriptorInvalidDataFormat";
    BleErrorCode[BleErrorCode["DescriptorWriteNotAllowed"] = 506] = "DescriptorWriteNotAllowed";
    // Scanning Errors (600-601)
    BleErrorCode[BleErrorCode["ScanStartFailed"] = 600] = "ScanStartFailed";
    BleErrorCode[BleErrorCode["LocationServicesDisabled"] = 601] = "LocationServicesDisabled";
    // Additional error for proxy (1000+)
    BleErrorCode[BleErrorCode["ServerError"] = 1000] = "ServerError";
})(BleErrorCode || (exports.BleErrorCode = BleErrorCode = {}));
/**
 * BLE Error class matching react-native-ble-plx error structure
 */
class BleError extends Error {
    constructor(errorCode, message, reason) {
        super(message);
        this.errorCode = errorCode;
        this.reason = reason;
        this.name = 'BleError';
    }
}
exports.BleError = BleError;
