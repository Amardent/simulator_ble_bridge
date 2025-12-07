type EventHandler = (data: any) => void;
export declare class ProxyClient {
    private ws;
    private eventHandlers;
    private reconnectAttempts;
    private maxReconnectAttempts;
    private baseUrl;
    private wsUrl;
    constructor(baseUrl: string, wsUrl: string);
    connect(): Promise<void>;
    disconnect(): void;
    request<TRequest, TResponse>(endpoint: string, RequestType: any, ResponseType: any, data: TRequest): Promise<TResponse>;
    on(eventType: string, handler: EventHandler): void;
    off(eventType: string, handler: EventHandler): void;
    private handleWebSocketMessage;
    private emit;
    private handleDisconnect;
    private convertProtoError;
}
export {};
