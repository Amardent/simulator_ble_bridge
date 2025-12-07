export declare class PlatformDetector {
    /**
     * Detects if the app is running in a simulator/emulator
     * Returns true for iOS Simulator or Android Emulator
     * Returns true if not in React Native environment (e.g., Node.js testing)
     */
    static isSimulator(): boolean;
    /**
     * Gets the proxy server URL
     * Default: http://localhost:5050
     */
    static getProxyUrl(): string;
    /**
     * Gets the WebSocket URL for events
     * Default: ws://localhost:5050/v1/events
     */
    static getWebSocketUrl(): string;
    /**
     * Determines if proxy should be used
     * Can be overridden for testing on real devices
     */
    static shouldUseProxy(): boolean;
}
