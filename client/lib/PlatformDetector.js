"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformDetector = void 0;
// Lazy load Platform to avoid errors when react-native is not available
let Platform = null;
try {
    Platform = require('react-native').Platform;
}
catch (e) {
    // Not in React Native environment - will default to proxy mode
}
class PlatformDetector {
    /**
     * Detects if the app is running in a simulator/emulator
     * Returns true for iOS Simulator or Android Emulator
     * Returns true if not in React Native environment (e.g., Node.js testing)
     */
    static isSimulator() {
        // If Platform is not available, we're not in React Native (e.g., Node.js testing)
        // Default to simulator mode (use proxy)
        if (!Platform) {
            return true;
        }
        if (Platform.OS === 'ios') {
            // iOS Simulator detection
            // Check if running in development mode and has simulator characteristics
            // Real devices won't have 'Simulator' in the model name
            const constants = Platform.constants;
            return (__DEV__ &&
                (constants.interfaceIdiom === 'pad' || constants.interfaceIdiom === 'phone'));
        }
        else if (Platform.OS === 'android') {
            // Android Emulator detection
            // Check for known emulator characteristics
            const constants = Platform.constants;
            const { Brand, Manufacturer, Model, Fingerprint } = constants;
            return (Brand === 'google' ||
                Manufacturer === 'Google' ||
                Model?.includes('sdk') ||
                Model?.includes('Emulator') ||
                Model?.includes('Android SDK') ||
                Fingerprint?.includes('generic') ||
                Fingerprint?.includes('emulator'));
        }
        return false;
    }
    /**
     * Gets the proxy server URL
     * Default: http://localhost:5050
     */
    static getProxyUrl() {
        // Allow override via environment variable
        return process.env.BLE_PROXY_URL || 'http://localhost:5050';
    }
    /**
     * Gets the WebSocket URL for events
     * Default: ws://localhost:5050/v1/events
     */
    static getWebSocketUrl() {
        const baseUrl = this.getProxyUrl();
        const wsUrl = baseUrl.replace('http://', 'ws://').replace('https://', 'wss://');
        return `${wsUrl}/v1/events`;
    }
    /**
     * Determines if proxy should be used
     * Can be overridden for testing on real devices
     */
    static shouldUseProxy() {
        // Check for explicit override
        if (process.env.BLE_FORCE_PROXY === 'true') {
            return true;
        }
        if (process.env.BLE_FORCE_PROXY === 'false') {
            return false;
        }
        return this.isSimulator();
    }
}
exports.PlatformDetector = PlatformDetector;
