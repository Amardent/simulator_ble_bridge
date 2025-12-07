"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BleManager = exports.PlatformDetector = void 0;
exports.createBleManager = createBleManager;
const PlatformDetector_1 = require("./PlatformDetector");
const BleProxyManager_1 = require("./BleProxyManager");
__exportStar(require("./types"), exports);
var PlatformDetector_2 = require("./PlatformDetector");
Object.defineProperty(exports, "PlatformDetector", { enumerable: true, get: function () { return PlatformDetector_2.PlatformDetector; } });
// Conditional import of BleManager to avoid loading react-native in Node.js
let BleManager = null;
exports.BleManager = BleManager;
if (!PlatformDetector_1.PlatformDetector.shouldUseProxy()) {
    try {
        exports.BleManager = BleManager = require('react-native-ble-plx').BleManager;
    }
    catch (e) {
        console.error('[BLE Proxy] Failed to load react-native-ble-plx:', e);
    }
}
/**
 * Creates a BLE manager instance
 * Automatically detects simulator/emulator and uses proxy if needed
 */
function createBleManager() {
    if (PlatformDetector_1.PlatformDetector.shouldUseProxy()) {
        console.log('[BLE Proxy] Using proxy server at', PlatformDetector_1.PlatformDetector.getProxyUrl());
        return new BleProxyManager_1.BleProxyManager();
    }
    else {
        console.log('[BLE Proxy] Using native BLE');
        if (!BleManager) {
            throw new Error('react-native-ble-plx not available');
        }
        return new BleManager();
    }
}
