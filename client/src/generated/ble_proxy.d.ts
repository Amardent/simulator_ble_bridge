import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace bleproxy. */
export namespace bleproxy {

    /** Namespace v1. */
    namespace v1 {

        /** ManagerState enum. */
        enum ManagerState {
            MANAGER_STATE_UNKNOWN = 0,
            MANAGER_STATE_RESETTING = 1,
            MANAGER_STATE_UNSUPPORTED = 2,
            MANAGER_STATE_UNAUTHORIZED = 3,
            MANAGER_STATE_POWERED_OFF = 4,
            MANAGER_STATE_POWERED_ON = 5
        }

        /** BleErrorCode enum. */
        enum BleErrorCode {
            ERROR_UNKNOWN = 0,
            ERROR_BLUETOOTH_MANAGER_DESTROYED = 1,
            ERROR_OPERATION_CANCELLED = 2,
            ERROR_OPERATION_TIMED_OUT = 3,
            ERROR_OPERATION_START_FAILED = 4,
            ERROR_INVALID_IDENTIFIERS = 5,
            ERROR_BLUETOOTH_UNSUPPORTED = 100,
            ERROR_BLUETOOTH_UNAUTHORIZED = 101,
            ERROR_BLUETOOTH_POWERED_OFF = 102,
            ERROR_BLUETOOTH_IN_UNKNOWN_STATE = 103,
            ERROR_BLUETOOTH_RESETTING = 104,
            ERROR_BLUETOOTH_STATE_CHANGE_FAILED = 105,
            ERROR_DEVICE_CONNECTION_FAILED = 200,
            ERROR_DEVICE_DISCONNECTED = 201,
            ERROR_DEVICE_RSSI_READ_FAILED = 202,
            ERROR_DEVICE_ALREADY_CONNECTED = 203,
            ERROR_DEVICE_NOT_FOUND = 204,
            ERROR_DEVICE_NOT_CONNECTED = 205,
            ERROR_DEVICE_MTU_CHANGE_FAILED = 206,
            ERROR_SERVICES_DISCOVERY_FAILED = 300,
            ERROR_INCLUDED_SERVICES_DISCOVERY_FAILED = 301,
            ERROR_SERVICE_NOT_FOUND = 302,
            ERROR_SERVICES_NOT_DISCOVERED = 303,
            ERROR_CHARACTERISTICS_DISCOVERY_FAILED = 400,
            ERROR_CHARACTERISTIC_WRITE_FAILED = 401,
            ERROR_CHARACTERISTIC_READ_FAILED = 402,
            ERROR_CHARACTERISTIC_NOTIFY_CHANGE_FAILED = 403,
            ERROR_CHARACTERISTIC_NOT_FOUND = 404,
            ERROR_CHARACTERISTICS_NOT_DISCOVERED = 405,
            ERROR_CHARACTERISTIC_INVALID_DATA_FORMAT = 406,
            ERROR_DESCRIPTORS_DISCOVERY_FAILED = 500,
            ERROR_DESCRIPTOR_WRITE_FAILED = 501,
            ERROR_DESCRIPTOR_READ_FAILED = 502,
            ERROR_DESCRIPTOR_NOT_FOUND = 503,
            ERROR_DESCRIPTORS_NOT_DISCOVERED = 504,
            ERROR_DESCRIPTOR_INVALID_DATA_FORMAT = 505,
            ERROR_DESCRIPTOR_WRITE_NOT_ALLOWED = 506,
            ERROR_SCAN_START_FAILED = 600,
            ERROR_LOCATION_SERVICES_DISABLED = 601,
            ERROR_SERVER_ERROR = 1000,
            ERROR_SERVER_TIMEOUT = 1001,
            ERROR_SERVER_UNAVAILABLE = 1002,
            ERROR_PROTOCOL_ERROR = 1003
        }

        /** Properties of an Error. */
        interface IError {

            /** Error code */
            code?: (number|null);

            /** Error message */
            message?: (string|null);

            /** Error attErrorCode */
            attErrorCode?: (number|null);

            /** Error platformError */
            platformError?: (string|null);
        }

        /** Represents an Error. */
        class Error implements IError {

            /**
             * Constructs a new Error.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IError);

            /** Error code. */
            public code: number;

            /** Error message. */
            public message: string;

            /** Error attErrorCode. */
            public attErrorCode?: (number|null);

            /** Error platformError. */
            public platformError?: (string|null);

            /** Error _attErrorCode. */
            public _attErrorCode?: "attErrorCode";

            /** Error _platformError. */
            public _platformError?: "platformError";

            /**
             * Creates a new Error instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Error instance
             */
            public static create(properties?: bleproxy.v1.IError): bleproxy.v1.Error;

            /**
             * Encodes the specified Error message. Does not implicitly {@link bleproxy.v1.Error.verify|verify} messages.
             * @param message Error message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IError, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Error message, length delimited. Does not implicitly {@link bleproxy.v1.Error.verify|verify} messages.
             * @param message Error message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IError, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Error message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.Error;

            /**
             * Decodes an Error message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.Error;

            /**
             * Verifies an Error message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Error message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Error
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.Error;

            /**
             * Creates a plain object from an Error message. Also converts values to other types if specified.
             * @param message Error
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.Error, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Error to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Error
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Descriptor. */
        interface IDescriptor {

            /** Descriptor uuid */
            uuid?: (string|null);

            /** Descriptor value */
            value?: (Uint8Array|null);
        }

        /** Represents a Descriptor. */
        class Descriptor implements IDescriptor {

            /**
             * Constructs a new Descriptor.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IDescriptor);

            /** Descriptor uuid. */
            public uuid: string;

            /** Descriptor value. */
            public value?: (Uint8Array|null);

            /** Descriptor _value. */
            public _value?: "value";

            /**
             * Creates a new Descriptor instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Descriptor instance
             */
            public static create(properties?: bleproxy.v1.IDescriptor): bleproxy.v1.Descriptor;

            /**
             * Encodes the specified Descriptor message. Does not implicitly {@link bleproxy.v1.Descriptor.verify|verify} messages.
             * @param message Descriptor message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IDescriptor, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Descriptor message, length delimited. Does not implicitly {@link bleproxy.v1.Descriptor.verify|verify} messages.
             * @param message Descriptor message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IDescriptor, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Descriptor message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Descriptor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.Descriptor;

            /**
             * Decodes a Descriptor message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Descriptor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.Descriptor;

            /**
             * Verifies a Descriptor message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Descriptor message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Descriptor
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.Descriptor;

            /**
             * Creates a plain object from a Descriptor message. Also converts values to other types if specified.
             * @param message Descriptor
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.Descriptor, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Descriptor to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Descriptor
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Characteristic. */
        interface ICharacteristic {

            /** Characteristic uuid */
            uuid?: (string|null);

            /** Characteristic properties */
            properties?: (string[]|null);

            /** Characteristic descriptors */
            descriptors?: (bleproxy.v1.IDescriptor[]|null);

            /** Characteristic value */
            value?: (Uint8Array|null);
        }

        /** Represents a Characteristic. */
        class Characteristic implements ICharacteristic {

            /**
             * Constructs a new Characteristic.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.ICharacteristic);

            /** Characteristic uuid. */
            public uuid: string;

            /** Characteristic properties. */
            public properties: string[];

            /** Characteristic descriptors. */
            public descriptors: bleproxy.v1.IDescriptor[];

            /** Characteristic value. */
            public value?: (Uint8Array|null);

            /** Characteristic _value. */
            public _value?: "value";

            /**
             * Creates a new Characteristic instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Characteristic instance
             */
            public static create(properties?: bleproxy.v1.ICharacteristic): bleproxy.v1.Characteristic;

            /**
             * Encodes the specified Characteristic message. Does not implicitly {@link bleproxy.v1.Characteristic.verify|verify} messages.
             * @param message Characteristic message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.ICharacteristic, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Characteristic message, length delimited. Does not implicitly {@link bleproxy.v1.Characteristic.verify|verify} messages.
             * @param message Characteristic message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.ICharacteristic, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Characteristic message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Characteristic
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.Characteristic;

            /**
             * Decodes a Characteristic message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Characteristic
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.Characteristic;

            /**
             * Verifies a Characteristic message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Characteristic message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Characteristic
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.Characteristic;

            /**
             * Creates a plain object from a Characteristic message. Also converts values to other types if specified.
             * @param message Characteristic
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.Characteristic, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Characteristic to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Characteristic
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Service. */
        interface IService {

            /** Service uuid */
            uuid?: (string|null);

            /** Service characteristics */
            characteristics?: (bleproxy.v1.ICharacteristic[]|null);

            /** Service isPrimary */
            isPrimary?: (boolean|null);
        }

        /** Represents a Service. */
        class Service implements IService {

            /**
             * Constructs a new Service.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IService);

            /** Service uuid. */
            public uuid: string;

            /** Service characteristics. */
            public characteristics: bleproxy.v1.ICharacteristic[];

            /** Service isPrimary. */
            public isPrimary?: (boolean|null);

            /** Service _isPrimary. */
            public _isPrimary?: "isPrimary";

            /**
             * Creates a new Service instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Service instance
             */
            public static create(properties?: bleproxy.v1.IService): bleproxy.v1.Service;

            /**
             * Encodes the specified Service message. Does not implicitly {@link bleproxy.v1.Service.verify|verify} messages.
             * @param message Service message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IService, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Service message, length delimited. Does not implicitly {@link bleproxy.v1.Service.verify|verify} messages.
             * @param message Service message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IService, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Service message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Service
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.Service;

            /**
             * Decodes a Service message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Service
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.Service;

            /**
             * Verifies a Service message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Service message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Service
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.Service;

            /**
             * Creates a plain object from a Service message. Also converts values to other types if specified.
             * @param message Service
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.Service, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Service to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Service
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Device. */
        interface IDevice {

            /** Device id */
            id?: (string|null);

            /** Device name */
            name?: (string|null);

            /** Device rssi */
            rssi?: (number|null);

            /** Device mtu */
            mtu?: (number|null);

            /** Device manufacturerData */
            manufacturerData?: (Uint8Array|null);

            /** Device serviceUuids */
            serviceUuids?: (string[]|null);

            /** Device serviceData */
            serviceData?: ({ [k: string]: Uint8Array }|null);

            /** Device txPowerLevel */
            txPowerLevel?: (number|null);

            /** Device isConnectable */
            isConnectable?: (boolean|null);

            /** Device solicitedServiceUuids */
            solicitedServiceUuids?: (string[]|null);

            /** Device overflowServiceUuids */
            overflowServiceUuids?: (string[]|null);
        }

        /** Represents a Device. */
        class Device implements IDevice {

            /**
             * Constructs a new Device.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IDevice);

            /** Device id. */
            public id: string;

            /** Device name. */
            public name?: (string|null);

            /** Device rssi. */
            public rssi?: (number|null);

            /** Device mtu. */
            public mtu?: (number|null);

            /** Device manufacturerData. */
            public manufacturerData?: (Uint8Array|null);

            /** Device serviceUuids. */
            public serviceUuids: string[];

            /** Device serviceData. */
            public serviceData: { [k: string]: Uint8Array };

            /** Device txPowerLevel. */
            public txPowerLevel?: (number|null);

            /** Device isConnectable. */
            public isConnectable?: (boolean|null);

            /** Device solicitedServiceUuids. */
            public solicitedServiceUuids: string[];

            /** Device overflowServiceUuids. */
            public overflowServiceUuids: string[];

            /** Device _name. */
            public _name?: "name";

            /** Device _rssi. */
            public _rssi?: "rssi";

            /** Device _mtu. */
            public _mtu?: "mtu";

            /** Device _manufacturerData. */
            public _manufacturerData?: "manufacturerData";

            /** Device _txPowerLevel. */
            public _txPowerLevel?: "txPowerLevel";

            /** Device _isConnectable. */
            public _isConnectable?: "isConnectable";

            /**
             * Creates a new Device instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Device instance
             */
            public static create(properties?: bleproxy.v1.IDevice): bleproxy.v1.Device;

            /**
             * Encodes the specified Device message. Does not implicitly {@link bleproxy.v1.Device.verify|verify} messages.
             * @param message Device message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IDevice, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Device message, length delimited. Does not implicitly {@link bleproxy.v1.Device.verify|verify} messages.
             * @param message Device message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IDevice, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Device message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Device
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.Device;

            /**
             * Decodes a Device message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Device
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.Device;

            /**
             * Verifies a Device message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Device message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Device
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.Device;

            /**
             * Creates a plain object from a Device message. Also converts values to other types if specified.
             * @param message Device
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.Device, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Device to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Device
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a HealthRequest. */
        interface IHealthRequest {
        }

        /** Represents a HealthRequest. */
        class HealthRequest implements IHealthRequest {

            /**
             * Constructs a new HealthRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IHealthRequest);

            /**
             * Creates a new HealthRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns HealthRequest instance
             */
            public static create(properties?: bleproxy.v1.IHealthRequest): bleproxy.v1.HealthRequest;

            /**
             * Encodes the specified HealthRequest message. Does not implicitly {@link bleproxy.v1.HealthRequest.verify|verify} messages.
             * @param message HealthRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IHealthRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HealthRequest message, length delimited. Does not implicitly {@link bleproxy.v1.HealthRequest.verify|verify} messages.
             * @param message HealthRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IHealthRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HealthRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HealthRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.HealthRequest;

            /**
             * Decodes a HealthRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HealthRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.HealthRequest;

            /**
             * Verifies a HealthRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HealthRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HealthRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.HealthRequest;

            /**
             * Creates a plain object from a HealthRequest message. Also converts values to other types if specified.
             * @param message HealthRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.HealthRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HealthRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for HealthRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a HealthResponse. */
        interface IHealthResponse {

            /** HealthResponse ready */
            ready?: (boolean|null);

            /** HealthResponse serverVersion */
            serverVersion?: (string|null);

            /** HealthResponse protocolVersion */
            protocolVersion?: (string|null);

            /** HealthResponse bluetoothState */
            bluetoothState?: (bleproxy.v1.ManagerState|null);
        }

        /** Represents a HealthResponse. */
        class HealthResponse implements IHealthResponse {

            /**
             * Constructs a new HealthResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IHealthResponse);

            /** HealthResponse ready. */
            public ready: boolean;

            /** HealthResponse serverVersion. */
            public serverVersion: string;

            /** HealthResponse protocolVersion. */
            public protocolVersion: string;

            /** HealthResponse bluetoothState. */
            public bluetoothState: bleproxy.v1.ManagerState;

            /**
             * Creates a new HealthResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns HealthResponse instance
             */
            public static create(properties?: bleproxy.v1.IHealthResponse): bleproxy.v1.HealthResponse;

            /**
             * Encodes the specified HealthResponse message. Does not implicitly {@link bleproxy.v1.HealthResponse.verify|verify} messages.
             * @param message HealthResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IHealthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HealthResponse message, length delimited. Does not implicitly {@link bleproxy.v1.HealthResponse.verify|verify} messages.
             * @param message HealthResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IHealthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HealthResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HealthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.HealthResponse;

            /**
             * Decodes a HealthResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HealthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.HealthResponse;

            /**
             * Verifies a HealthResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HealthResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HealthResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.HealthResponse;

            /**
             * Creates a plain object from a HealthResponse message. Also converts values to other types if specified.
             * @param message HealthResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.HealthResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HealthResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for HealthResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a StateRequest. */
        interface IStateRequest {
        }

        /** Represents a StateRequest. */
        class StateRequest implements IStateRequest {

            /**
             * Constructs a new StateRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IStateRequest);

            /**
             * Creates a new StateRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StateRequest instance
             */
            public static create(properties?: bleproxy.v1.IStateRequest): bleproxy.v1.StateRequest;

            /**
             * Encodes the specified StateRequest message. Does not implicitly {@link bleproxy.v1.StateRequest.verify|verify} messages.
             * @param message StateRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IStateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StateRequest message, length delimited. Does not implicitly {@link bleproxy.v1.StateRequest.verify|verify} messages.
             * @param message StateRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IStateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StateRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StateRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.StateRequest;

            /**
             * Decodes a StateRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StateRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.StateRequest;

            /**
             * Verifies a StateRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StateRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StateRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.StateRequest;

            /**
             * Creates a plain object from a StateRequest message. Also converts values to other types if specified.
             * @param message StateRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.StateRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StateRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StateRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a StateResponse. */
        interface IStateResponse {

            /** StateResponse state */
            state?: (bleproxy.v1.ManagerState|null);

            /** StateResponse error */
            error?: (bleproxy.v1.IError|null);
        }

        /** Represents a StateResponse. */
        class StateResponse implements IStateResponse {

            /**
             * Constructs a new StateResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IStateResponse);

            /** StateResponse state. */
            public state: bleproxy.v1.ManagerState;

            /** StateResponse error. */
            public error?: (bleproxy.v1.IError|null);

            /** StateResponse _error. */
            public _error?: "error";

            /**
             * Creates a new StateResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StateResponse instance
             */
            public static create(properties?: bleproxy.v1.IStateResponse): bleproxy.v1.StateResponse;

            /**
             * Encodes the specified StateResponse message. Does not implicitly {@link bleproxy.v1.StateResponse.verify|verify} messages.
             * @param message StateResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IStateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StateResponse message, length delimited. Does not implicitly {@link bleproxy.v1.StateResponse.verify|verify} messages.
             * @param message StateResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IStateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StateResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StateResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.StateResponse;

            /**
             * Decodes a StateResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StateResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.StateResponse;

            /**
             * Verifies a StateResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StateResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StateResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.StateResponse;

            /**
             * Creates a plain object from a StateResponse message. Also converts values to other types if specified.
             * @param message StateResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.StateResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StateResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StateResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a StartScanRequest. */
        interface IStartScanRequest {

            /** StartScanRequest serviceUuids */
            serviceUuids?: (string[]|null);

            /** StartScanRequest options */
            options?: ({ [k: string]: string }|null);
        }

        /** Represents a StartScanRequest. */
        class StartScanRequest implements IStartScanRequest {

            /**
             * Constructs a new StartScanRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IStartScanRequest);

            /** StartScanRequest serviceUuids. */
            public serviceUuids: string[];

            /** StartScanRequest options. */
            public options: { [k: string]: string };

            /**
             * Creates a new StartScanRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StartScanRequest instance
             */
            public static create(properties?: bleproxy.v1.IStartScanRequest): bleproxy.v1.StartScanRequest;

            /**
             * Encodes the specified StartScanRequest message. Does not implicitly {@link bleproxy.v1.StartScanRequest.verify|verify} messages.
             * @param message StartScanRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IStartScanRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StartScanRequest message, length delimited. Does not implicitly {@link bleproxy.v1.StartScanRequest.verify|verify} messages.
             * @param message StartScanRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IStartScanRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StartScanRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StartScanRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.StartScanRequest;

            /**
             * Decodes a StartScanRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StartScanRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.StartScanRequest;

            /**
             * Verifies a StartScanRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StartScanRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StartScanRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.StartScanRequest;

            /**
             * Creates a plain object from a StartScanRequest message. Also converts values to other types if specified.
             * @param message StartScanRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.StartScanRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StartScanRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StartScanRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a StartScanResponse. */
        interface IStartScanResponse {

            /** StartScanResponse success */
            success?: (boolean|null);

            /** StartScanResponse error */
            error?: (bleproxy.v1.IError|null);
        }

        /** Represents a StartScanResponse. */
        class StartScanResponse implements IStartScanResponse {

            /**
             * Constructs a new StartScanResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IStartScanResponse);

            /** StartScanResponse success. */
            public success: boolean;

            /** StartScanResponse error. */
            public error?: (bleproxy.v1.IError|null);

            /** StartScanResponse _error. */
            public _error?: "error";

            /**
             * Creates a new StartScanResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StartScanResponse instance
             */
            public static create(properties?: bleproxy.v1.IStartScanResponse): bleproxy.v1.StartScanResponse;

            /**
             * Encodes the specified StartScanResponse message. Does not implicitly {@link bleproxy.v1.StartScanResponse.verify|verify} messages.
             * @param message StartScanResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IStartScanResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StartScanResponse message, length delimited. Does not implicitly {@link bleproxy.v1.StartScanResponse.verify|verify} messages.
             * @param message StartScanResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IStartScanResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StartScanResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StartScanResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.StartScanResponse;

            /**
             * Decodes a StartScanResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StartScanResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.StartScanResponse;

            /**
             * Verifies a StartScanResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StartScanResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StartScanResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.StartScanResponse;

            /**
             * Creates a plain object from a StartScanResponse message. Also converts values to other types if specified.
             * @param message StartScanResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.StartScanResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StartScanResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StartScanResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a StopScanRequest. */
        interface IStopScanRequest {
        }

        /** Represents a StopScanRequest. */
        class StopScanRequest implements IStopScanRequest {

            /**
             * Constructs a new StopScanRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IStopScanRequest);

            /**
             * Creates a new StopScanRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StopScanRequest instance
             */
            public static create(properties?: bleproxy.v1.IStopScanRequest): bleproxy.v1.StopScanRequest;

            /**
             * Encodes the specified StopScanRequest message. Does not implicitly {@link bleproxy.v1.StopScanRequest.verify|verify} messages.
             * @param message StopScanRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IStopScanRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StopScanRequest message, length delimited. Does not implicitly {@link bleproxy.v1.StopScanRequest.verify|verify} messages.
             * @param message StopScanRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IStopScanRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StopScanRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StopScanRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.StopScanRequest;

            /**
             * Decodes a StopScanRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StopScanRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.StopScanRequest;

            /**
             * Verifies a StopScanRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StopScanRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StopScanRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.StopScanRequest;

            /**
             * Creates a plain object from a StopScanRequest message. Also converts values to other types if specified.
             * @param message StopScanRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.StopScanRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StopScanRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StopScanRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a StopScanResponse. */
        interface IStopScanResponse {

            /** StopScanResponse success */
            success?: (boolean|null);

            /** StopScanResponse error */
            error?: (bleproxy.v1.IError|null);
        }

        /** Represents a StopScanResponse. */
        class StopScanResponse implements IStopScanResponse {

            /**
             * Constructs a new StopScanResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IStopScanResponse);

            /** StopScanResponse success. */
            public success: boolean;

            /** StopScanResponse error. */
            public error?: (bleproxy.v1.IError|null);

            /** StopScanResponse _error. */
            public _error?: "error";

            /**
             * Creates a new StopScanResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StopScanResponse instance
             */
            public static create(properties?: bleproxy.v1.IStopScanResponse): bleproxy.v1.StopScanResponse;

            /**
             * Encodes the specified StopScanResponse message. Does not implicitly {@link bleproxy.v1.StopScanResponse.verify|verify} messages.
             * @param message StopScanResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IStopScanResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StopScanResponse message, length delimited. Does not implicitly {@link bleproxy.v1.StopScanResponse.verify|verify} messages.
             * @param message StopScanResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IStopScanResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StopScanResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StopScanResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.StopScanResponse;

            /**
             * Decodes a StopScanResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StopScanResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.StopScanResponse;

            /**
             * Verifies a StopScanResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StopScanResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StopScanResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.StopScanResponse;

            /**
             * Creates a plain object from a StopScanResponse message. Also converts values to other types if specified.
             * @param message StopScanResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.StopScanResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StopScanResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StopScanResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ConnectRequest. */
        interface IConnectRequest {

            /** ConnectRequest deviceId */
            deviceId?: (string|null);

            /** ConnectRequest options */
            options?: ({ [k: string]: string }|null);
        }

        /** Represents a ConnectRequest. */
        class ConnectRequest implements IConnectRequest {

            /**
             * Constructs a new ConnectRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IConnectRequest);

            /** ConnectRequest deviceId. */
            public deviceId: string;

            /** ConnectRequest options. */
            public options: { [k: string]: string };

            /**
             * Creates a new ConnectRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConnectRequest instance
             */
            public static create(properties?: bleproxy.v1.IConnectRequest): bleproxy.v1.ConnectRequest;

            /**
             * Encodes the specified ConnectRequest message. Does not implicitly {@link bleproxy.v1.ConnectRequest.verify|verify} messages.
             * @param message ConnectRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IConnectRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConnectRequest message, length delimited. Does not implicitly {@link bleproxy.v1.ConnectRequest.verify|verify} messages.
             * @param message ConnectRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IConnectRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConnectRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConnectRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.ConnectRequest;

            /**
             * Decodes a ConnectRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConnectRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.ConnectRequest;

            /**
             * Verifies a ConnectRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConnectRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConnectRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.ConnectRequest;

            /**
             * Creates a plain object from a ConnectRequest message. Also converts values to other types if specified.
             * @param message ConnectRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.ConnectRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConnectRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ConnectRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ConnectResponse. */
        interface IConnectResponse {

            /** ConnectResponse success */
            success?: (boolean|null);

            /** ConnectResponse error */
            error?: (bleproxy.v1.IError|null);

            /** ConnectResponse device */
            device?: (bleproxy.v1.IDevice|null);
        }

        /** Represents a ConnectResponse. */
        class ConnectResponse implements IConnectResponse {

            /**
             * Constructs a new ConnectResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IConnectResponse);

            /** ConnectResponse success. */
            public success: boolean;

            /** ConnectResponse error. */
            public error?: (bleproxy.v1.IError|null);

            /** ConnectResponse device. */
            public device?: (bleproxy.v1.IDevice|null);

            /** ConnectResponse _error. */
            public _error?: "error";

            /** ConnectResponse _device. */
            public _device?: "device";

            /**
             * Creates a new ConnectResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConnectResponse instance
             */
            public static create(properties?: bleproxy.v1.IConnectResponse): bleproxy.v1.ConnectResponse;

            /**
             * Encodes the specified ConnectResponse message. Does not implicitly {@link bleproxy.v1.ConnectResponse.verify|verify} messages.
             * @param message ConnectResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IConnectResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConnectResponse message, length delimited. Does not implicitly {@link bleproxy.v1.ConnectResponse.verify|verify} messages.
             * @param message ConnectResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IConnectResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConnectResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConnectResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.ConnectResponse;

            /**
             * Decodes a ConnectResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConnectResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.ConnectResponse;

            /**
             * Verifies a ConnectResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConnectResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConnectResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.ConnectResponse;

            /**
             * Creates a plain object from a ConnectResponse message. Also converts values to other types if specified.
             * @param message ConnectResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.ConnectResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConnectResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ConnectResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DisconnectRequest. */
        interface IDisconnectRequest {

            /** DisconnectRequest deviceId */
            deviceId?: (string|null);
        }

        /** Represents a DisconnectRequest. */
        class DisconnectRequest implements IDisconnectRequest {

            /**
             * Constructs a new DisconnectRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IDisconnectRequest);

            /** DisconnectRequest deviceId. */
            public deviceId: string;

            /**
             * Creates a new DisconnectRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DisconnectRequest instance
             */
            public static create(properties?: bleproxy.v1.IDisconnectRequest): bleproxy.v1.DisconnectRequest;

            /**
             * Encodes the specified DisconnectRequest message. Does not implicitly {@link bleproxy.v1.DisconnectRequest.verify|verify} messages.
             * @param message DisconnectRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IDisconnectRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DisconnectRequest message, length delimited. Does not implicitly {@link bleproxy.v1.DisconnectRequest.verify|verify} messages.
             * @param message DisconnectRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IDisconnectRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DisconnectRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DisconnectRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.DisconnectRequest;

            /**
             * Decodes a DisconnectRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DisconnectRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.DisconnectRequest;

            /**
             * Verifies a DisconnectRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DisconnectRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DisconnectRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.DisconnectRequest;

            /**
             * Creates a plain object from a DisconnectRequest message. Also converts values to other types if specified.
             * @param message DisconnectRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.DisconnectRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DisconnectRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DisconnectRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DisconnectResponse. */
        interface IDisconnectResponse {

            /** DisconnectResponse success */
            success?: (boolean|null);

            /** DisconnectResponse error */
            error?: (bleproxy.v1.IError|null);
        }

        /** Represents a DisconnectResponse. */
        class DisconnectResponse implements IDisconnectResponse {

            /**
             * Constructs a new DisconnectResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IDisconnectResponse);

            /** DisconnectResponse success. */
            public success: boolean;

            /** DisconnectResponse error. */
            public error?: (bleproxy.v1.IError|null);

            /** DisconnectResponse _error. */
            public _error?: "error";

            /**
             * Creates a new DisconnectResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DisconnectResponse instance
             */
            public static create(properties?: bleproxy.v1.IDisconnectResponse): bleproxy.v1.DisconnectResponse;

            /**
             * Encodes the specified DisconnectResponse message. Does not implicitly {@link bleproxy.v1.DisconnectResponse.verify|verify} messages.
             * @param message DisconnectResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IDisconnectResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DisconnectResponse message, length delimited. Does not implicitly {@link bleproxy.v1.DisconnectResponse.verify|verify} messages.
             * @param message DisconnectResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IDisconnectResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DisconnectResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DisconnectResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.DisconnectResponse;

            /**
             * Decodes a DisconnectResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DisconnectResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.DisconnectResponse;

            /**
             * Verifies a DisconnectResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DisconnectResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DisconnectResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.DisconnectResponse;

            /**
             * Creates a plain object from a DisconnectResponse message. Also converts values to other types if specified.
             * @param message DisconnectResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.DisconnectResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DisconnectResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DisconnectResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an IsConnectedRequest. */
        interface IIsConnectedRequest {

            /** IsConnectedRequest deviceId */
            deviceId?: (string|null);
        }

        /** Represents an IsConnectedRequest. */
        class IsConnectedRequest implements IIsConnectedRequest {

            /**
             * Constructs a new IsConnectedRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IIsConnectedRequest);

            /** IsConnectedRequest deviceId. */
            public deviceId: string;

            /**
             * Creates a new IsConnectedRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns IsConnectedRequest instance
             */
            public static create(properties?: bleproxy.v1.IIsConnectedRequest): bleproxy.v1.IsConnectedRequest;

            /**
             * Encodes the specified IsConnectedRequest message. Does not implicitly {@link bleproxy.v1.IsConnectedRequest.verify|verify} messages.
             * @param message IsConnectedRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IIsConnectedRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified IsConnectedRequest message, length delimited. Does not implicitly {@link bleproxy.v1.IsConnectedRequest.verify|verify} messages.
             * @param message IsConnectedRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IIsConnectedRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an IsConnectedRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns IsConnectedRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.IsConnectedRequest;

            /**
             * Decodes an IsConnectedRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns IsConnectedRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.IsConnectedRequest;

            /**
             * Verifies an IsConnectedRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an IsConnectedRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns IsConnectedRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.IsConnectedRequest;

            /**
             * Creates a plain object from an IsConnectedRequest message. Also converts values to other types if specified.
             * @param message IsConnectedRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.IsConnectedRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this IsConnectedRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for IsConnectedRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an IsConnectedResponse. */
        interface IIsConnectedResponse {

            /** IsConnectedResponse isConnected */
            isConnected?: (boolean|null);

            /** IsConnectedResponse error */
            error?: (bleproxy.v1.IError|null);
        }

        /** Represents an IsConnectedResponse. */
        class IsConnectedResponse implements IIsConnectedResponse {

            /**
             * Constructs a new IsConnectedResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IIsConnectedResponse);

            /** IsConnectedResponse isConnected. */
            public isConnected: boolean;

            /** IsConnectedResponse error. */
            public error?: (bleproxy.v1.IError|null);

            /** IsConnectedResponse _error. */
            public _error?: "error";

            /**
             * Creates a new IsConnectedResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns IsConnectedResponse instance
             */
            public static create(properties?: bleproxy.v1.IIsConnectedResponse): bleproxy.v1.IsConnectedResponse;

            /**
             * Encodes the specified IsConnectedResponse message. Does not implicitly {@link bleproxy.v1.IsConnectedResponse.verify|verify} messages.
             * @param message IsConnectedResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IIsConnectedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified IsConnectedResponse message, length delimited. Does not implicitly {@link bleproxy.v1.IsConnectedResponse.verify|verify} messages.
             * @param message IsConnectedResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IIsConnectedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an IsConnectedResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns IsConnectedResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.IsConnectedResponse;

            /**
             * Decodes an IsConnectedResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns IsConnectedResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.IsConnectedResponse;

            /**
             * Verifies an IsConnectedResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an IsConnectedResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns IsConnectedResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.IsConnectedResponse;

            /**
             * Creates a plain object from an IsConnectedResponse message. Also converts values to other types if specified.
             * @param message IsConnectedResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.IsConnectedResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this IsConnectedResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for IsConnectedResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DiscoverRequest. */
        interface IDiscoverRequest {

            /** DiscoverRequest deviceId */
            deviceId?: (string|null);
        }

        /** Represents a DiscoverRequest. */
        class DiscoverRequest implements IDiscoverRequest {

            /**
             * Constructs a new DiscoverRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IDiscoverRequest);

            /** DiscoverRequest deviceId. */
            public deviceId: string;

            /**
             * Creates a new DiscoverRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DiscoverRequest instance
             */
            public static create(properties?: bleproxy.v1.IDiscoverRequest): bleproxy.v1.DiscoverRequest;

            /**
             * Encodes the specified DiscoverRequest message. Does not implicitly {@link bleproxy.v1.DiscoverRequest.verify|verify} messages.
             * @param message DiscoverRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IDiscoverRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DiscoverRequest message, length delimited. Does not implicitly {@link bleproxy.v1.DiscoverRequest.verify|verify} messages.
             * @param message DiscoverRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IDiscoverRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DiscoverRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DiscoverRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.DiscoverRequest;

            /**
             * Decodes a DiscoverRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DiscoverRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.DiscoverRequest;

            /**
             * Verifies a DiscoverRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DiscoverRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DiscoverRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.DiscoverRequest;

            /**
             * Creates a plain object from a DiscoverRequest message. Also converts values to other types if specified.
             * @param message DiscoverRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.DiscoverRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DiscoverRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DiscoverRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DiscoverResponse. */
        interface IDiscoverResponse {

            /** DiscoverResponse services */
            services?: (bleproxy.v1.IService[]|null);

            /** DiscoverResponse error */
            error?: (bleproxy.v1.IError|null);
        }

        /** Represents a DiscoverResponse. */
        class DiscoverResponse implements IDiscoverResponse {

            /**
             * Constructs a new DiscoverResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IDiscoverResponse);

            /** DiscoverResponse services. */
            public services: bleproxy.v1.IService[];

            /** DiscoverResponse error. */
            public error?: (bleproxy.v1.IError|null);

            /** DiscoverResponse _error. */
            public _error?: "error";

            /**
             * Creates a new DiscoverResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DiscoverResponse instance
             */
            public static create(properties?: bleproxy.v1.IDiscoverResponse): bleproxy.v1.DiscoverResponse;

            /**
             * Encodes the specified DiscoverResponse message. Does not implicitly {@link bleproxy.v1.DiscoverResponse.verify|verify} messages.
             * @param message DiscoverResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IDiscoverResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DiscoverResponse message, length delimited. Does not implicitly {@link bleproxy.v1.DiscoverResponse.verify|verify} messages.
             * @param message DiscoverResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IDiscoverResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DiscoverResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DiscoverResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.DiscoverResponse;

            /**
             * Decodes a DiscoverResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DiscoverResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.DiscoverResponse;

            /**
             * Verifies a DiscoverResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DiscoverResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DiscoverResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.DiscoverResponse;

            /**
             * Creates a plain object from a DiscoverResponse message. Also converts values to other types if specified.
             * @param message DiscoverResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.DiscoverResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DiscoverResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DiscoverResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ServicesRequest. */
        interface IServicesRequest {

            /** ServicesRequest deviceId */
            deviceId?: (string|null);
        }

        /** Represents a ServicesRequest. */
        class ServicesRequest implements IServicesRequest {

            /**
             * Constructs a new ServicesRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IServicesRequest);

            /** ServicesRequest deviceId. */
            public deviceId: string;

            /**
             * Creates a new ServicesRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServicesRequest instance
             */
            public static create(properties?: bleproxy.v1.IServicesRequest): bleproxy.v1.ServicesRequest;

            /**
             * Encodes the specified ServicesRequest message. Does not implicitly {@link bleproxy.v1.ServicesRequest.verify|verify} messages.
             * @param message ServicesRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IServicesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServicesRequest message, length delimited. Does not implicitly {@link bleproxy.v1.ServicesRequest.verify|verify} messages.
             * @param message ServicesRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IServicesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServicesRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServicesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.ServicesRequest;

            /**
             * Decodes a ServicesRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServicesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.ServicesRequest;

            /**
             * Verifies a ServicesRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServicesRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServicesRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.ServicesRequest;

            /**
             * Creates a plain object from a ServicesRequest message. Also converts values to other types if specified.
             * @param message ServicesRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.ServicesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServicesRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ServicesRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ServicesResponse. */
        interface IServicesResponse {

            /** ServicesResponse services */
            services?: (bleproxy.v1.IService[]|null);

            /** ServicesResponse error */
            error?: (bleproxy.v1.IError|null);
        }

        /** Represents a ServicesResponse. */
        class ServicesResponse implements IServicesResponse {

            /**
             * Constructs a new ServicesResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IServicesResponse);

            /** ServicesResponse services. */
            public services: bleproxy.v1.IService[];

            /** ServicesResponse error. */
            public error?: (bleproxy.v1.IError|null);

            /** ServicesResponse _error. */
            public _error?: "error";

            /**
             * Creates a new ServicesResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServicesResponse instance
             */
            public static create(properties?: bleproxy.v1.IServicesResponse): bleproxy.v1.ServicesResponse;

            /**
             * Encodes the specified ServicesResponse message. Does not implicitly {@link bleproxy.v1.ServicesResponse.verify|verify} messages.
             * @param message ServicesResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IServicesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServicesResponse message, length delimited. Does not implicitly {@link bleproxy.v1.ServicesResponse.verify|verify} messages.
             * @param message ServicesResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IServicesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServicesResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServicesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.ServicesResponse;

            /**
             * Decodes a ServicesResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServicesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.ServicesResponse;

            /**
             * Verifies a ServicesResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServicesResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServicesResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.ServicesResponse;

            /**
             * Creates a plain object from a ServicesResponse message. Also converts values to other types if specified.
             * @param message ServicesResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.ServicesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServicesResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ServicesResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CharacteristicsRequest. */
        interface ICharacteristicsRequest {

            /** CharacteristicsRequest deviceId */
            deviceId?: (string|null);

            /** CharacteristicsRequest serviceUuid */
            serviceUuid?: (string|null);
        }

        /** Represents a CharacteristicsRequest. */
        class CharacteristicsRequest implements ICharacteristicsRequest {

            /**
             * Constructs a new CharacteristicsRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.ICharacteristicsRequest);

            /** CharacteristicsRequest deviceId. */
            public deviceId: string;

            /** CharacteristicsRequest serviceUuid. */
            public serviceUuid: string;

            /**
             * Creates a new CharacteristicsRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CharacteristicsRequest instance
             */
            public static create(properties?: bleproxy.v1.ICharacteristicsRequest): bleproxy.v1.CharacteristicsRequest;

            /**
             * Encodes the specified CharacteristicsRequest message. Does not implicitly {@link bleproxy.v1.CharacteristicsRequest.verify|verify} messages.
             * @param message CharacteristicsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.ICharacteristicsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CharacteristicsRequest message, length delimited. Does not implicitly {@link bleproxy.v1.CharacteristicsRequest.verify|verify} messages.
             * @param message CharacteristicsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.ICharacteristicsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CharacteristicsRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CharacteristicsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.CharacteristicsRequest;

            /**
             * Decodes a CharacteristicsRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CharacteristicsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.CharacteristicsRequest;

            /**
             * Verifies a CharacteristicsRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CharacteristicsRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CharacteristicsRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.CharacteristicsRequest;

            /**
             * Creates a plain object from a CharacteristicsRequest message. Also converts values to other types if specified.
             * @param message CharacteristicsRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.CharacteristicsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CharacteristicsRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CharacteristicsRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CharacteristicsResponse. */
        interface ICharacteristicsResponse {

            /** CharacteristicsResponse characteristics */
            characteristics?: (bleproxy.v1.ICharacteristic[]|null);

            /** CharacteristicsResponse error */
            error?: (bleproxy.v1.IError|null);
        }

        /** Represents a CharacteristicsResponse. */
        class CharacteristicsResponse implements ICharacteristicsResponse {

            /**
             * Constructs a new CharacteristicsResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.ICharacteristicsResponse);

            /** CharacteristicsResponse characteristics. */
            public characteristics: bleproxy.v1.ICharacteristic[];

            /** CharacteristicsResponse error. */
            public error?: (bleproxy.v1.IError|null);

            /** CharacteristicsResponse _error. */
            public _error?: "error";

            /**
             * Creates a new CharacteristicsResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CharacteristicsResponse instance
             */
            public static create(properties?: bleproxy.v1.ICharacteristicsResponse): bleproxy.v1.CharacteristicsResponse;

            /**
             * Encodes the specified CharacteristicsResponse message. Does not implicitly {@link bleproxy.v1.CharacteristicsResponse.verify|verify} messages.
             * @param message CharacteristicsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.ICharacteristicsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CharacteristicsResponse message, length delimited. Does not implicitly {@link bleproxy.v1.CharacteristicsResponse.verify|verify} messages.
             * @param message CharacteristicsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.ICharacteristicsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CharacteristicsResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CharacteristicsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.CharacteristicsResponse;

            /**
             * Decodes a CharacteristicsResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CharacteristicsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.CharacteristicsResponse;

            /**
             * Verifies a CharacteristicsResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CharacteristicsResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CharacteristicsResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.CharacteristicsResponse;

            /**
             * Creates a plain object from a CharacteristicsResponse message. Also converts values to other types if specified.
             * @param message CharacteristicsResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.CharacteristicsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CharacteristicsResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CharacteristicsResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ReadRequest. */
        interface IReadRequest {

            /** ReadRequest deviceId */
            deviceId?: (string|null);

            /** ReadRequest serviceUuid */
            serviceUuid?: (string|null);

            /** ReadRequest characteristicUuid */
            characteristicUuid?: (string|null);
        }

        /** Represents a ReadRequest. */
        class ReadRequest implements IReadRequest {

            /**
             * Constructs a new ReadRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IReadRequest);

            /** ReadRequest deviceId. */
            public deviceId: string;

            /** ReadRequest serviceUuid. */
            public serviceUuid: string;

            /** ReadRequest characteristicUuid. */
            public characteristicUuid: string;

            /**
             * Creates a new ReadRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ReadRequest instance
             */
            public static create(properties?: bleproxy.v1.IReadRequest): bleproxy.v1.ReadRequest;

            /**
             * Encodes the specified ReadRequest message. Does not implicitly {@link bleproxy.v1.ReadRequest.verify|verify} messages.
             * @param message ReadRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IReadRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ReadRequest message, length delimited. Does not implicitly {@link bleproxy.v1.ReadRequest.verify|verify} messages.
             * @param message ReadRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IReadRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ReadRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ReadRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.ReadRequest;

            /**
             * Decodes a ReadRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ReadRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.ReadRequest;

            /**
             * Verifies a ReadRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ReadRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ReadRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.ReadRequest;

            /**
             * Creates a plain object from a ReadRequest message. Also converts values to other types if specified.
             * @param message ReadRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.ReadRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ReadRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ReadRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ReadResponse. */
        interface IReadResponse {

            /** ReadResponse value */
            value?: (Uint8Array|null);

            /** ReadResponse error */
            error?: (bleproxy.v1.IError|null);
        }

        /** Represents a ReadResponse. */
        class ReadResponse implements IReadResponse {

            /**
             * Constructs a new ReadResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IReadResponse);

            /** ReadResponse value. */
            public value: Uint8Array;

            /** ReadResponse error. */
            public error?: (bleproxy.v1.IError|null);

            /** ReadResponse _error. */
            public _error?: "error";

            /**
             * Creates a new ReadResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ReadResponse instance
             */
            public static create(properties?: bleproxy.v1.IReadResponse): bleproxy.v1.ReadResponse;

            /**
             * Encodes the specified ReadResponse message. Does not implicitly {@link bleproxy.v1.ReadResponse.verify|verify} messages.
             * @param message ReadResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IReadResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ReadResponse message, length delimited. Does not implicitly {@link bleproxy.v1.ReadResponse.verify|verify} messages.
             * @param message ReadResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IReadResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ReadResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ReadResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.ReadResponse;

            /**
             * Decodes a ReadResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ReadResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.ReadResponse;

            /**
             * Verifies a ReadResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ReadResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ReadResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.ReadResponse;

            /**
             * Creates a plain object from a ReadResponse message. Also converts values to other types if specified.
             * @param message ReadResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.ReadResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ReadResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ReadResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a WriteRequest. */
        interface IWriteRequest {

            /** WriteRequest deviceId */
            deviceId?: (string|null);

            /** WriteRequest serviceUuid */
            serviceUuid?: (string|null);

            /** WriteRequest characteristicUuid */
            characteristicUuid?: (string|null);

            /** WriteRequest value */
            value?: (Uint8Array|null);

            /** WriteRequest withResponse */
            withResponse?: (boolean|null);
        }

        /** Represents a WriteRequest. */
        class WriteRequest implements IWriteRequest {

            /**
             * Constructs a new WriteRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IWriteRequest);

            /** WriteRequest deviceId. */
            public deviceId: string;

            /** WriteRequest serviceUuid. */
            public serviceUuid: string;

            /** WriteRequest characteristicUuid. */
            public characteristicUuid: string;

            /** WriteRequest value. */
            public value: Uint8Array;

            /** WriteRequest withResponse. */
            public withResponse: boolean;

            /**
             * Creates a new WriteRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WriteRequest instance
             */
            public static create(properties?: bleproxy.v1.IWriteRequest): bleproxy.v1.WriteRequest;

            /**
             * Encodes the specified WriteRequest message. Does not implicitly {@link bleproxy.v1.WriteRequest.verify|verify} messages.
             * @param message WriteRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IWriteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified WriteRequest message, length delimited. Does not implicitly {@link bleproxy.v1.WriteRequest.verify|verify} messages.
             * @param message WriteRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IWriteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a WriteRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns WriteRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.WriteRequest;

            /**
             * Decodes a WriteRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns WriteRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.WriteRequest;

            /**
             * Verifies a WriteRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a WriteRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WriteRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.WriteRequest;

            /**
             * Creates a plain object from a WriteRequest message. Also converts values to other types if specified.
             * @param message WriteRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.WriteRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this WriteRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for WriteRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a WriteResponse. */
        interface IWriteResponse {

            /** WriteResponse success */
            success?: (boolean|null);

            /** WriteResponse error */
            error?: (bleproxy.v1.IError|null);
        }

        /** Represents a WriteResponse. */
        class WriteResponse implements IWriteResponse {

            /**
             * Constructs a new WriteResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IWriteResponse);

            /** WriteResponse success. */
            public success: boolean;

            /** WriteResponse error. */
            public error?: (bleproxy.v1.IError|null);

            /** WriteResponse _error. */
            public _error?: "error";

            /**
             * Creates a new WriteResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WriteResponse instance
             */
            public static create(properties?: bleproxy.v1.IWriteResponse): bleproxy.v1.WriteResponse;

            /**
             * Encodes the specified WriteResponse message. Does not implicitly {@link bleproxy.v1.WriteResponse.verify|verify} messages.
             * @param message WriteResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IWriteResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified WriteResponse message, length delimited. Does not implicitly {@link bleproxy.v1.WriteResponse.verify|verify} messages.
             * @param message WriteResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IWriteResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a WriteResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns WriteResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.WriteResponse;

            /**
             * Decodes a WriteResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns WriteResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.WriteResponse;

            /**
             * Verifies a WriteResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a WriteResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WriteResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.WriteResponse;

            /**
             * Creates a plain object from a WriteResponse message. Also converts values to other types if specified.
             * @param message WriteResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.WriteResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this WriteResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for WriteResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MonitorRequest. */
        interface IMonitorRequest {

            /** MonitorRequest deviceId */
            deviceId?: (string|null);

            /** MonitorRequest serviceUuid */
            serviceUuid?: (string|null);

            /** MonitorRequest characteristicUuid */
            characteristicUuid?: (string|null);

            /** MonitorRequest enable */
            enable?: (boolean|null);
        }

        /** Represents a MonitorRequest. */
        class MonitorRequest implements IMonitorRequest {

            /**
             * Constructs a new MonitorRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IMonitorRequest);

            /** MonitorRequest deviceId. */
            public deviceId: string;

            /** MonitorRequest serviceUuid. */
            public serviceUuid: string;

            /** MonitorRequest characteristicUuid. */
            public characteristicUuid: string;

            /** MonitorRequest enable. */
            public enable: boolean;

            /**
             * Creates a new MonitorRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MonitorRequest instance
             */
            public static create(properties?: bleproxy.v1.IMonitorRequest): bleproxy.v1.MonitorRequest;

            /**
             * Encodes the specified MonitorRequest message. Does not implicitly {@link bleproxy.v1.MonitorRequest.verify|verify} messages.
             * @param message MonitorRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IMonitorRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MonitorRequest message, length delimited. Does not implicitly {@link bleproxy.v1.MonitorRequest.verify|verify} messages.
             * @param message MonitorRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IMonitorRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MonitorRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MonitorRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.MonitorRequest;

            /**
             * Decodes a MonitorRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MonitorRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.MonitorRequest;

            /**
             * Verifies a MonitorRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MonitorRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MonitorRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.MonitorRequest;

            /**
             * Creates a plain object from a MonitorRequest message. Also converts values to other types if specified.
             * @param message MonitorRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.MonitorRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MonitorRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MonitorRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MonitorResponse. */
        interface IMonitorResponse {

            /** MonitorResponse success */
            success?: (boolean|null);

            /** MonitorResponse error */
            error?: (bleproxy.v1.IError|null);
        }

        /** Represents a MonitorResponse. */
        class MonitorResponse implements IMonitorResponse {

            /**
             * Constructs a new MonitorResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IMonitorResponse);

            /** MonitorResponse success. */
            public success: boolean;

            /** MonitorResponse error. */
            public error?: (bleproxy.v1.IError|null);

            /** MonitorResponse _error. */
            public _error?: "error";

            /**
             * Creates a new MonitorResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MonitorResponse instance
             */
            public static create(properties?: bleproxy.v1.IMonitorResponse): bleproxy.v1.MonitorResponse;

            /**
             * Encodes the specified MonitorResponse message. Does not implicitly {@link bleproxy.v1.MonitorResponse.verify|verify} messages.
             * @param message MonitorResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IMonitorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MonitorResponse message, length delimited. Does not implicitly {@link bleproxy.v1.MonitorResponse.verify|verify} messages.
             * @param message MonitorResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IMonitorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MonitorResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MonitorResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.MonitorResponse;

            /**
             * Decodes a MonitorResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MonitorResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.MonitorResponse;

            /**
             * Verifies a MonitorResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MonitorResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MonitorResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.MonitorResponse;

            /**
             * Creates a plain object from a MonitorResponse message. Also converts values to other types if specified.
             * @param message MonitorResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.MonitorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MonitorResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MonitorResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a RSSIRequest. */
        interface IRSSIRequest {

            /** RSSIRequest deviceId */
            deviceId?: (string|null);
        }

        /** Represents a RSSIRequest. */
        class RSSIRequest implements IRSSIRequest {

            /**
             * Constructs a new RSSIRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IRSSIRequest);

            /** RSSIRequest deviceId. */
            public deviceId: string;

            /**
             * Creates a new RSSIRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RSSIRequest instance
             */
            public static create(properties?: bleproxy.v1.IRSSIRequest): bleproxy.v1.RSSIRequest;

            /**
             * Encodes the specified RSSIRequest message. Does not implicitly {@link bleproxy.v1.RSSIRequest.verify|verify} messages.
             * @param message RSSIRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IRSSIRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RSSIRequest message, length delimited. Does not implicitly {@link bleproxy.v1.RSSIRequest.verify|verify} messages.
             * @param message RSSIRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IRSSIRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RSSIRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RSSIRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.RSSIRequest;

            /**
             * Decodes a RSSIRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RSSIRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.RSSIRequest;

            /**
             * Verifies a RSSIRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RSSIRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RSSIRequest
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.RSSIRequest;

            /**
             * Creates a plain object from a RSSIRequest message. Also converts values to other types if specified.
             * @param message RSSIRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.RSSIRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RSSIRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RSSIRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a RSSIResponse. */
        interface IRSSIResponse {

            /** RSSIResponse rssi */
            rssi?: (number|null);

            /** RSSIResponse error */
            error?: (bleproxy.v1.IError|null);
        }

        /** Represents a RSSIResponse. */
        class RSSIResponse implements IRSSIResponse {

            /**
             * Constructs a new RSSIResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IRSSIResponse);

            /** RSSIResponse rssi. */
            public rssi: number;

            /** RSSIResponse error. */
            public error?: (bleproxy.v1.IError|null);

            /** RSSIResponse _error. */
            public _error?: "error";

            /**
             * Creates a new RSSIResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RSSIResponse instance
             */
            public static create(properties?: bleproxy.v1.IRSSIResponse): bleproxy.v1.RSSIResponse;

            /**
             * Encodes the specified RSSIResponse message. Does not implicitly {@link bleproxy.v1.RSSIResponse.verify|verify} messages.
             * @param message RSSIResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IRSSIResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RSSIResponse message, length delimited. Does not implicitly {@link bleproxy.v1.RSSIResponse.verify|verify} messages.
             * @param message RSSIResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IRSSIResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RSSIResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RSSIResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.RSSIResponse;

            /**
             * Decodes a RSSIResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RSSIResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.RSSIResponse;

            /**
             * Verifies a RSSIResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RSSIResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RSSIResponse
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.RSSIResponse;

            /**
             * Creates a plain object from a RSSIResponse message. Also converts values to other types if specified.
             * @param message RSSIResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.RSSIResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RSSIResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RSSIResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ManagerStateEvent. */
        interface IManagerStateEvent {

            /** ManagerStateEvent state */
            state?: (bleproxy.v1.ManagerState|null);

            /** ManagerStateEvent timestamp */
            timestamp?: (number|Long|null);
        }

        /** Represents a ManagerStateEvent. */
        class ManagerStateEvent implements IManagerStateEvent {

            /**
             * Constructs a new ManagerStateEvent.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IManagerStateEvent);

            /** ManagerStateEvent state. */
            public state: bleproxy.v1.ManagerState;

            /** ManagerStateEvent timestamp. */
            public timestamp: (number|Long);

            /**
             * Creates a new ManagerStateEvent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ManagerStateEvent instance
             */
            public static create(properties?: bleproxy.v1.IManagerStateEvent): bleproxy.v1.ManagerStateEvent;

            /**
             * Encodes the specified ManagerStateEvent message. Does not implicitly {@link bleproxy.v1.ManagerStateEvent.verify|verify} messages.
             * @param message ManagerStateEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IManagerStateEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ManagerStateEvent message, length delimited. Does not implicitly {@link bleproxy.v1.ManagerStateEvent.verify|verify} messages.
             * @param message ManagerStateEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IManagerStateEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ManagerStateEvent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ManagerStateEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.ManagerStateEvent;

            /**
             * Decodes a ManagerStateEvent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ManagerStateEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.ManagerStateEvent;

            /**
             * Verifies a ManagerStateEvent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ManagerStateEvent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ManagerStateEvent
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.ManagerStateEvent;

            /**
             * Creates a plain object from a ManagerStateEvent message. Also converts values to other types if specified.
             * @param message ManagerStateEvent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.ManagerStateEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ManagerStateEvent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ManagerStateEvent
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ScanResultEvent. */
        interface IScanResultEvent {

            /** ScanResultEvent device */
            device?: (bleproxy.v1.IDevice|null);

            /** ScanResultEvent timestamp */
            timestamp?: (number|Long|null);
        }

        /** Represents a ScanResultEvent. */
        class ScanResultEvent implements IScanResultEvent {

            /**
             * Constructs a new ScanResultEvent.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IScanResultEvent);

            /** ScanResultEvent device. */
            public device?: (bleproxy.v1.IDevice|null);

            /** ScanResultEvent timestamp. */
            public timestamp: (number|Long);

            /**
             * Creates a new ScanResultEvent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ScanResultEvent instance
             */
            public static create(properties?: bleproxy.v1.IScanResultEvent): bleproxy.v1.ScanResultEvent;

            /**
             * Encodes the specified ScanResultEvent message. Does not implicitly {@link bleproxy.v1.ScanResultEvent.verify|verify} messages.
             * @param message ScanResultEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IScanResultEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ScanResultEvent message, length delimited. Does not implicitly {@link bleproxy.v1.ScanResultEvent.verify|verify} messages.
             * @param message ScanResultEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IScanResultEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ScanResultEvent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ScanResultEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.ScanResultEvent;

            /**
             * Decodes a ScanResultEvent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ScanResultEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.ScanResultEvent;

            /**
             * Verifies a ScanResultEvent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ScanResultEvent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ScanResultEvent
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.ScanResultEvent;

            /**
             * Creates a plain object from a ScanResultEvent message. Also converts values to other types if specified.
             * @param message ScanResultEvent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.ScanResultEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ScanResultEvent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ScanResultEvent
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PeripheralConnectedEvent. */
        interface IPeripheralConnectedEvent {

            /** PeripheralConnectedEvent deviceId */
            deviceId?: (string|null);

            /** PeripheralConnectedEvent timestamp */
            timestamp?: (number|Long|null);
        }

        /** Represents a PeripheralConnectedEvent. */
        class PeripheralConnectedEvent implements IPeripheralConnectedEvent {

            /**
             * Constructs a new PeripheralConnectedEvent.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IPeripheralConnectedEvent);

            /** PeripheralConnectedEvent deviceId. */
            public deviceId: string;

            /** PeripheralConnectedEvent timestamp. */
            public timestamp: (number|Long);

            /**
             * Creates a new PeripheralConnectedEvent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PeripheralConnectedEvent instance
             */
            public static create(properties?: bleproxy.v1.IPeripheralConnectedEvent): bleproxy.v1.PeripheralConnectedEvent;

            /**
             * Encodes the specified PeripheralConnectedEvent message. Does not implicitly {@link bleproxy.v1.PeripheralConnectedEvent.verify|verify} messages.
             * @param message PeripheralConnectedEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IPeripheralConnectedEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PeripheralConnectedEvent message, length delimited. Does not implicitly {@link bleproxy.v1.PeripheralConnectedEvent.verify|verify} messages.
             * @param message PeripheralConnectedEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IPeripheralConnectedEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PeripheralConnectedEvent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PeripheralConnectedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.PeripheralConnectedEvent;

            /**
             * Decodes a PeripheralConnectedEvent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PeripheralConnectedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.PeripheralConnectedEvent;

            /**
             * Verifies a PeripheralConnectedEvent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PeripheralConnectedEvent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PeripheralConnectedEvent
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.PeripheralConnectedEvent;

            /**
             * Creates a plain object from a PeripheralConnectedEvent message. Also converts values to other types if specified.
             * @param message PeripheralConnectedEvent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.PeripheralConnectedEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PeripheralConnectedEvent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PeripheralConnectedEvent
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PeripheralDisconnectedEvent. */
        interface IPeripheralDisconnectedEvent {

            /** PeripheralDisconnectedEvent deviceId */
            deviceId?: (string|null);

            /** PeripheralDisconnectedEvent error */
            error?: (bleproxy.v1.IError|null);

            /** PeripheralDisconnectedEvent timestamp */
            timestamp?: (number|Long|null);
        }

        /** Represents a PeripheralDisconnectedEvent. */
        class PeripheralDisconnectedEvent implements IPeripheralDisconnectedEvent {

            /**
             * Constructs a new PeripheralDisconnectedEvent.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IPeripheralDisconnectedEvent);

            /** PeripheralDisconnectedEvent deviceId. */
            public deviceId: string;

            /** PeripheralDisconnectedEvent error. */
            public error?: (bleproxy.v1.IError|null);

            /** PeripheralDisconnectedEvent timestamp. */
            public timestamp: (number|Long);

            /** PeripheralDisconnectedEvent _error. */
            public _error?: "error";

            /**
             * Creates a new PeripheralDisconnectedEvent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PeripheralDisconnectedEvent instance
             */
            public static create(properties?: bleproxy.v1.IPeripheralDisconnectedEvent): bleproxy.v1.PeripheralDisconnectedEvent;

            /**
             * Encodes the specified PeripheralDisconnectedEvent message. Does not implicitly {@link bleproxy.v1.PeripheralDisconnectedEvent.verify|verify} messages.
             * @param message PeripheralDisconnectedEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IPeripheralDisconnectedEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PeripheralDisconnectedEvent message, length delimited. Does not implicitly {@link bleproxy.v1.PeripheralDisconnectedEvent.verify|verify} messages.
             * @param message PeripheralDisconnectedEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IPeripheralDisconnectedEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PeripheralDisconnectedEvent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PeripheralDisconnectedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.PeripheralDisconnectedEvent;

            /**
             * Decodes a PeripheralDisconnectedEvent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PeripheralDisconnectedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.PeripheralDisconnectedEvent;

            /**
             * Verifies a PeripheralDisconnectedEvent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PeripheralDisconnectedEvent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PeripheralDisconnectedEvent
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.PeripheralDisconnectedEvent;

            /**
             * Creates a plain object from a PeripheralDisconnectedEvent message. Also converts values to other types if specified.
             * @param message PeripheralDisconnectedEvent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.PeripheralDisconnectedEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PeripheralDisconnectedEvent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PeripheralDisconnectedEvent
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CharacteristicValueUpdatedEvent. */
        interface ICharacteristicValueUpdatedEvent {

            /** CharacteristicValueUpdatedEvent deviceId */
            deviceId?: (string|null);

            /** CharacteristicValueUpdatedEvent serviceUuid */
            serviceUuid?: (string|null);

            /** CharacteristicValueUpdatedEvent characteristicUuid */
            characteristicUuid?: (string|null);

            /** CharacteristicValueUpdatedEvent value */
            value?: (Uint8Array|null);

            /** CharacteristicValueUpdatedEvent timestamp */
            timestamp?: (number|Long|null);
        }

        /** Represents a CharacteristicValueUpdatedEvent. */
        class CharacteristicValueUpdatedEvent implements ICharacteristicValueUpdatedEvent {

            /**
             * Constructs a new CharacteristicValueUpdatedEvent.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.ICharacteristicValueUpdatedEvent);

            /** CharacteristicValueUpdatedEvent deviceId. */
            public deviceId: string;

            /** CharacteristicValueUpdatedEvent serviceUuid. */
            public serviceUuid: string;

            /** CharacteristicValueUpdatedEvent characteristicUuid. */
            public characteristicUuid: string;

            /** CharacteristicValueUpdatedEvent value. */
            public value: Uint8Array;

            /** CharacteristicValueUpdatedEvent timestamp. */
            public timestamp: (number|Long);

            /**
             * Creates a new CharacteristicValueUpdatedEvent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CharacteristicValueUpdatedEvent instance
             */
            public static create(properties?: bleproxy.v1.ICharacteristicValueUpdatedEvent): bleproxy.v1.CharacteristicValueUpdatedEvent;

            /**
             * Encodes the specified CharacteristicValueUpdatedEvent message. Does not implicitly {@link bleproxy.v1.CharacteristicValueUpdatedEvent.verify|verify} messages.
             * @param message CharacteristicValueUpdatedEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.ICharacteristicValueUpdatedEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CharacteristicValueUpdatedEvent message, length delimited. Does not implicitly {@link bleproxy.v1.CharacteristicValueUpdatedEvent.verify|verify} messages.
             * @param message CharacteristicValueUpdatedEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.ICharacteristicValueUpdatedEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CharacteristicValueUpdatedEvent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CharacteristicValueUpdatedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.CharacteristicValueUpdatedEvent;

            /**
             * Decodes a CharacteristicValueUpdatedEvent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CharacteristicValueUpdatedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.CharacteristicValueUpdatedEvent;

            /**
             * Verifies a CharacteristicValueUpdatedEvent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CharacteristicValueUpdatedEvent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CharacteristicValueUpdatedEvent
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.CharacteristicValueUpdatedEvent;

            /**
             * Creates a plain object from a CharacteristicValueUpdatedEvent message. Also converts values to other types if specified.
             * @param message CharacteristicValueUpdatedEvent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.CharacteristicValueUpdatedEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CharacteristicValueUpdatedEvent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CharacteristicValueUpdatedEvent
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ServerErrorEvent. */
        interface IServerErrorEvent {

            /** ServerErrorEvent error */
            error?: (bleproxy.v1.IError|null);

            /** ServerErrorEvent timestamp */
            timestamp?: (number|Long|null);

            /** ServerErrorEvent context */
            context?: (string|null);
        }

        /** Represents a ServerErrorEvent. */
        class ServerErrorEvent implements IServerErrorEvent {

            /**
             * Constructs a new ServerErrorEvent.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IServerErrorEvent);

            /** ServerErrorEvent error. */
            public error?: (bleproxy.v1.IError|null);

            /** ServerErrorEvent timestamp. */
            public timestamp: (number|Long);

            /** ServerErrorEvent context. */
            public context?: (string|null);

            /** ServerErrorEvent _context. */
            public _context?: "context";

            /**
             * Creates a new ServerErrorEvent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServerErrorEvent instance
             */
            public static create(properties?: bleproxy.v1.IServerErrorEvent): bleproxy.v1.ServerErrorEvent;

            /**
             * Encodes the specified ServerErrorEvent message. Does not implicitly {@link bleproxy.v1.ServerErrorEvent.verify|verify} messages.
             * @param message ServerErrorEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IServerErrorEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServerErrorEvent message, length delimited. Does not implicitly {@link bleproxy.v1.ServerErrorEvent.verify|verify} messages.
             * @param message ServerErrorEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IServerErrorEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServerErrorEvent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServerErrorEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.ServerErrorEvent;

            /**
             * Decodes a ServerErrorEvent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServerErrorEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.ServerErrorEvent;

            /**
             * Verifies a ServerErrorEvent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServerErrorEvent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServerErrorEvent
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.ServerErrorEvent;

            /**
             * Creates a plain object from a ServerErrorEvent message. Also converts values to other types if specified.
             * @param message ServerErrorEvent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.ServerErrorEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServerErrorEvent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ServerErrorEvent
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a WsEvent. */
        interface IWsEvent {

            /** WsEvent managerStateEvent */
            managerStateEvent?: (bleproxy.v1.IManagerStateEvent|null);

            /** WsEvent scanResultEvent */
            scanResultEvent?: (bleproxy.v1.IScanResultEvent|null);

            /** WsEvent peripheralConnectedEvent */
            peripheralConnectedEvent?: (bleproxy.v1.IPeripheralConnectedEvent|null);

            /** WsEvent peripheralDisconnectedEvent */
            peripheralDisconnectedEvent?: (bleproxy.v1.IPeripheralDisconnectedEvent|null);

            /** WsEvent characteristicValueUpdatedEvent */
            characteristicValueUpdatedEvent?: (bleproxy.v1.ICharacteristicValueUpdatedEvent|null);

            /** WsEvent serverErrorEvent */
            serverErrorEvent?: (bleproxy.v1.IServerErrorEvent|null);
        }

        /** Represents a WsEvent. */
        class WsEvent implements IWsEvent {

            /**
             * Constructs a new WsEvent.
             * @param [properties] Properties to set
             */
            constructor(properties?: bleproxy.v1.IWsEvent);

            /** WsEvent managerStateEvent. */
            public managerStateEvent?: (bleproxy.v1.IManagerStateEvent|null);

            /** WsEvent scanResultEvent. */
            public scanResultEvent?: (bleproxy.v1.IScanResultEvent|null);

            /** WsEvent peripheralConnectedEvent. */
            public peripheralConnectedEvent?: (bleproxy.v1.IPeripheralConnectedEvent|null);

            /** WsEvent peripheralDisconnectedEvent. */
            public peripheralDisconnectedEvent?: (bleproxy.v1.IPeripheralDisconnectedEvent|null);

            /** WsEvent characteristicValueUpdatedEvent. */
            public characteristicValueUpdatedEvent?: (bleproxy.v1.ICharacteristicValueUpdatedEvent|null);

            /** WsEvent serverErrorEvent. */
            public serverErrorEvent?: (bleproxy.v1.IServerErrorEvent|null);

            /** WsEvent event. */
            public event?: ("managerStateEvent"|"scanResultEvent"|"peripheralConnectedEvent"|"peripheralDisconnectedEvent"|"characteristicValueUpdatedEvent"|"serverErrorEvent");

            /**
             * Creates a new WsEvent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WsEvent instance
             */
            public static create(properties?: bleproxy.v1.IWsEvent): bleproxy.v1.WsEvent;

            /**
             * Encodes the specified WsEvent message. Does not implicitly {@link bleproxy.v1.WsEvent.verify|verify} messages.
             * @param message WsEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: bleproxy.v1.IWsEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified WsEvent message, length delimited. Does not implicitly {@link bleproxy.v1.WsEvent.verify|verify} messages.
             * @param message WsEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: bleproxy.v1.IWsEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a WsEvent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns WsEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bleproxy.v1.WsEvent;

            /**
             * Decodes a WsEvent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns WsEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bleproxy.v1.WsEvent;

            /**
             * Verifies a WsEvent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a WsEvent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WsEvent
             */
            public static fromObject(object: { [k: string]: any }): bleproxy.v1.WsEvent;

            /**
             * Creates a plain object from a WsEvent message. Also converts values to other types if specified.
             * @param message WsEvent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: bleproxy.v1.WsEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this WsEvent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for WsEvent
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
