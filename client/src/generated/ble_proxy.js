/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.bleproxy = (function() {

    /**
     * Namespace bleproxy.
     * @exports bleproxy
     * @namespace
     */
    var bleproxy = {};

    bleproxy.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof bleproxy
         * @namespace
         */
        var v1 = {};

        /**
         * ManagerState enum.
         * @name bleproxy.v1.ManagerState
         * @enum {number}
         * @property {number} MANAGER_STATE_UNKNOWN=0 MANAGER_STATE_UNKNOWN value
         * @property {number} MANAGER_STATE_RESETTING=1 MANAGER_STATE_RESETTING value
         * @property {number} MANAGER_STATE_UNSUPPORTED=2 MANAGER_STATE_UNSUPPORTED value
         * @property {number} MANAGER_STATE_UNAUTHORIZED=3 MANAGER_STATE_UNAUTHORIZED value
         * @property {number} MANAGER_STATE_POWERED_OFF=4 MANAGER_STATE_POWERED_OFF value
         * @property {number} MANAGER_STATE_POWERED_ON=5 MANAGER_STATE_POWERED_ON value
         */
        v1.ManagerState = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "MANAGER_STATE_UNKNOWN"] = 0;
            values[valuesById[1] = "MANAGER_STATE_RESETTING"] = 1;
            values[valuesById[2] = "MANAGER_STATE_UNSUPPORTED"] = 2;
            values[valuesById[3] = "MANAGER_STATE_UNAUTHORIZED"] = 3;
            values[valuesById[4] = "MANAGER_STATE_POWERED_OFF"] = 4;
            values[valuesById[5] = "MANAGER_STATE_POWERED_ON"] = 5;
            return values;
        })();

        /**
         * BleErrorCode enum.
         * @name bleproxy.v1.BleErrorCode
         * @enum {number}
         * @property {number} ERROR_UNKNOWN=0 ERROR_UNKNOWN value
         * @property {number} ERROR_BLUETOOTH_MANAGER_DESTROYED=1 ERROR_BLUETOOTH_MANAGER_DESTROYED value
         * @property {number} ERROR_OPERATION_CANCELLED=2 ERROR_OPERATION_CANCELLED value
         * @property {number} ERROR_OPERATION_TIMED_OUT=3 ERROR_OPERATION_TIMED_OUT value
         * @property {number} ERROR_OPERATION_START_FAILED=4 ERROR_OPERATION_START_FAILED value
         * @property {number} ERROR_INVALID_IDENTIFIERS=5 ERROR_INVALID_IDENTIFIERS value
         * @property {number} ERROR_BLUETOOTH_UNSUPPORTED=100 ERROR_BLUETOOTH_UNSUPPORTED value
         * @property {number} ERROR_BLUETOOTH_UNAUTHORIZED=101 ERROR_BLUETOOTH_UNAUTHORIZED value
         * @property {number} ERROR_BLUETOOTH_POWERED_OFF=102 ERROR_BLUETOOTH_POWERED_OFF value
         * @property {number} ERROR_BLUETOOTH_IN_UNKNOWN_STATE=103 ERROR_BLUETOOTH_IN_UNKNOWN_STATE value
         * @property {number} ERROR_BLUETOOTH_RESETTING=104 ERROR_BLUETOOTH_RESETTING value
         * @property {number} ERROR_BLUETOOTH_STATE_CHANGE_FAILED=105 ERROR_BLUETOOTH_STATE_CHANGE_FAILED value
         * @property {number} ERROR_DEVICE_CONNECTION_FAILED=200 ERROR_DEVICE_CONNECTION_FAILED value
         * @property {number} ERROR_DEVICE_DISCONNECTED=201 ERROR_DEVICE_DISCONNECTED value
         * @property {number} ERROR_DEVICE_RSSI_READ_FAILED=202 ERROR_DEVICE_RSSI_READ_FAILED value
         * @property {number} ERROR_DEVICE_ALREADY_CONNECTED=203 ERROR_DEVICE_ALREADY_CONNECTED value
         * @property {number} ERROR_DEVICE_NOT_FOUND=204 ERROR_DEVICE_NOT_FOUND value
         * @property {number} ERROR_DEVICE_NOT_CONNECTED=205 ERROR_DEVICE_NOT_CONNECTED value
         * @property {number} ERROR_DEVICE_MTU_CHANGE_FAILED=206 ERROR_DEVICE_MTU_CHANGE_FAILED value
         * @property {number} ERROR_SERVICES_DISCOVERY_FAILED=300 ERROR_SERVICES_DISCOVERY_FAILED value
         * @property {number} ERROR_INCLUDED_SERVICES_DISCOVERY_FAILED=301 ERROR_INCLUDED_SERVICES_DISCOVERY_FAILED value
         * @property {number} ERROR_SERVICE_NOT_FOUND=302 ERROR_SERVICE_NOT_FOUND value
         * @property {number} ERROR_SERVICES_NOT_DISCOVERED=303 ERROR_SERVICES_NOT_DISCOVERED value
         * @property {number} ERROR_CHARACTERISTICS_DISCOVERY_FAILED=400 ERROR_CHARACTERISTICS_DISCOVERY_FAILED value
         * @property {number} ERROR_CHARACTERISTIC_WRITE_FAILED=401 ERROR_CHARACTERISTIC_WRITE_FAILED value
         * @property {number} ERROR_CHARACTERISTIC_READ_FAILED=402 ERROR_CHARACTERISTIC_READ_FAILED value
         * @property {number} ERROR_CHARACTERISTIC_NOTIFY_CHANGE_FAILED=403 ERROR_CHARACTERISTIC_NOTIFY_CHANGE_FAILED value
         * @property {number} ERROR_CHARACTERISTIC_NOT_FOUND=404 ERROR_CHARACTERISTIC_NOT_FOUND value
         * @property {number} ERROR_CHARACTERISTICS_NOT_DISCOVERED=405 ERROR_CHARACTERISTICS_NOT_DISCOVERED value
         * @property {number} ERROR_CHARACTERISTIC_INVALID_DATA_FORMAT=406 ERROR_CHARACTERISTIC_INVALID_DATA_FORMAT value
         * @property {number} ERROR_DESCRIPTORS_DISCOVERY_FAILED=500 ERROR_DESCRIPTORS_DISCOVERY_FAILED value
         * @property {number} ERROR_DESCRIPTOR_WRITE_FAILED=501 ERROR_DESCRIPTOR_WRITE_FAILED value
         * @property {number} ERROR_DESCRIPTOR_READ_FAILED=502 ERROR_DESCRIPTOR_READ_FAILED value
         * @property {number} ERROR_DESCRIPTOR_NOT_FOUND=503 ERROR_DESCRIPTOR_NOT_FOUND value
         * @property {number} ERROR_DESCRIPTORS_NOT_DISCOVERED=504 ERROR_DESCRIPTORS_NOT_DISCOVERED value
         * @property {number} ERROR_DESCRIPTOR_INVALID_DATA_FORMAT=505 ERROR_DESCRIPTOR_INVALID_DATA_FORMAT value
         * @property {number} ERROR_DESCRIPTOR_WRITE_NOT_ALLOWED=506 ERROR_DESCRIPTOR_WRITE_NOT_ALLOWED value
         * @property {number} ERROR_SCAN_START_FAILED=600 ERROR_SCAN_START_FAILED value
         * @property {number} ERROR_LOCATION_SERVICES_DISABLED=601 ERROR_LOCATION_SERVICES_DISABLED value
         * @property {number} ERROR_SERVER_ERROR=1000 ERROR_SERVER_ERROR value
         * @property {number} ERROR_SERVER_TIMEOUT=1001 ERROR_SERVER_TIMEOUT value
         * @property {number} ERROR_SERVER_UNAVAILABLE=1002 ERROR_SERVER_UNAVAILABLE value
         * @property {number} ERROR_PROTOCOL_ERROR=1003 ERROR_PROTOCOL_ERROR value
         */
        v1.BleErrorCode = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "ERROR_UNKNOWN"] = 0;
            values[valuesById[1] = "ERROR_BLUETOOTH_MANAGER_DESTROYED"] = 1;
            values[valuesById[2] = "ERROR_OPERATION_CANCELLED"] = 2;
            values[valuesById[3] = "ERROR_OPERATION_TIMED_OUT"] = 3;
            values[valuesById[4] = "ERROR_OPERATION_START_FAILED"] = 4;
            values[valuesById[5] = "ERROR_INVALID_IDENTIFIERS"] = 5;
            values[valuesById[100] = "ERROR_BLUETOOTH_UNSUPPORTED"] = 100;
            values[valuesById[101] = "ERROR_BLUETOOTH_UNAUTHORIZED"] = 101;
            values[valuesById[102] = "ERROR_BLUETOOTH_POWERED_OFF"] = 102;
            values[valuesById[103] = "ERROR_BLUETOOTH_IN_UNKNOWN_STATE"] = 103;
            values[valuesById[104] = "ERROR_BLUETOOTH_RESETTING"] = 104;
            values[valuesById[105] = "ERROR_BLUETOOTH_STATE_CHANGE_FAILED"] = 105;
            values[valuesById[200] = "ERROR_DEVICE_CONNECTION_FAILED"] = 200;
            values[valuesById[201] = "ERROR_DEVICE_DISCONNECTED"] = 201;
            values[valuesById[202] = "ERROR_DEVICE_RSSI_READ_FAILED"] = 202;
            values[valuesById[203] = "ERROR_DEVICE_ALREADY_CONNECTED"] = 203;
            values[valuesById[204] = "ERROR_DEVICE_NOT_FOUND"] = 204;
            values[valuesById[205] = "ERROR_DEVICE_NOT_CONNECTED"] = 205;
            values[valuesById[206] = "ERROR_DEVICE_MTU_CHANGE_FAILED"] = 206;
            values[valuesById[300] = "ERROR_SERVICES_DISCOVERY_FAILED"] = 300;
            values[valuesById[301] = "ERROR_INCLUDED_SERVICES_DISCOVERY_FAILED"] = 301;
            values[valuesById[302] = "ERROR_SERVICE_NOT_FOUND"] = 302;
            values[valuesById[303] = "ERROR_SERVICES_NOT_DISCOVERED"] = 303;
            values[valuesById[400] = "ERROR_CHARACTERISTICS_DISCOVERY_FAILED"] = 400;
            values[valuesById[401] = "ERROR_CHARACTERISTIC_WRITE_FAILED"] = 401;
            values[valuesById[402] = "ERROR_CHARACTERISTIC_READ_FAILED"] = 402;
            values[valuesById[403] = "ERROR_CHARACTERISTIC_NOTIFY_CHANGE_FAILED"] = 403;
            values[valuesById[404] = "ERROR_CHARACTERISTIC_NOT_FOUND"] = 404;
            values[valuesById[405] = "ERROR_CHARACTERISTICS_NOT_DISCOVERED"] = 405;
            values[valuesById[406] = "ERROR_CHARACTERISTIC_INVALID_DATA_FORMAT"] = 406;
            values[valuesById[500] = "ERROR_DESCRIPTORS_DISCOVERY_FAILED"] = 500;
            values[valuesById[501] = "ERROR_DESCRIPTOR_WRITE_FAILED"] = 501;
            values[valuesById[502] = "ERROR_DESCRIPTOR_READ_FAILED"] = 502;
            values[valuesById[503] = "ERROR_DESCRIPTOR_NOT_FOUND"] = 503;
            values[valuesById[504] = "ERROR_DESCRIPTORS_NOT_DISCOVERED"] = 504;
            values[valuesById[505] = "ERROR_DESCRIPTOR_INVALID_DATA_FORMAT"] = 505;
            values[valuesById[506] = "ERROR_DESCRIPTOR_WRITE_NOT_ALLOWED"] = 506;
            values[valuesById[600] = "ERROR_SCAN_START_FAILED"] = 600;
            values[valuesById[601] = "ERROR_LOCATION_SERVICES_DISABLED"] = 601;
            values[valuesById[1000] = "ERROR_SERVER_ERROR"] = 1000;
            values[valuesById[1001] = "ERROR_SERVER_TIMEOUT"] = 1001;
            values[valuesById[1002] = "ERROR_SERVER_UNAVAILABLE"] = 1002;
            values[valuesById[1003] = "ERROR_PROTOCOL_ERROR"] = 1003;
            return values;
        })();

        v1.Error = (function() {

            /**
             * Properties of an Error.
             * @memberof bleproxy.v1
             * @interface IError
             * @property {number|null} [code] Error code
             * @property {string|null} [message] Error message
             * @property {number|null} [attErrorCode] Error attErrorCode
             * @property {string|null} [platformError] Error platformError
             */

            /**
             * Constructs a new Error.
             * @memberof bleproxy.v1
             * @classdesc Represents an Error.
             * @implements IError
             * @constructor
             * @param {bleproxy.v1.IError=} [properties] Properties to set
             */
            function Error(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Error code.
             * @member {number} code
             * @memberof bleproxy.v1.Error
             * @instance
             */
            Error.prototype.code = 0;

            /**
             * Error message.
             * @member {string} message
             * @memberof bleproxy.v1.Error
             * @instance
             */
            Error.prototype.message = "";

            /**
             * Error attErrorCode.
             * @member {number|null|undefined} attErrorCode
             * @memberof bleproxy.v1.Error
             * @instance
             */
            Error.prototype.attErrorCode = null;

            /**
             * Error platformError.
             * @member {string|null|undefined} platformError
             * @memberof bleproxy.v1.Error
             * @instance
             */
            Error.prototype.platformError = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Error _attErrorCode.
             * @member {"attErrorCode"|undefined} _attErrorCode
             * @memberof bleproxy.v1.Error
             * @instance
             */
            Object.defineProperty(Error.prototype, "_attErrorCode", {
                get: $util.oneOfGetter($oneOfFields = ["attErrorCode"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Error _platformError.
             * @member {"platformError"|undefined} _platformError
             * @memberof bleproxy.v1.Error
             * @instance
             */
            Object.defineProperty(Error.prototype, "_platformError", {
                get: $util.oneOfGetter($oneOfFields = ["platformError"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Error instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.Error
             * @static
             * @param {bleproxy.v1.IError=} [properties] Properties to set
             * @returns {bleproxy.v1.Error} Error instance
             */
            Error.create = function create(properties) {
                return new Error(properties);
            };

            /**
             * Encodes the specified Error message. Does not implicitly {@link bleproxy.v1.Error.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.Error
             * @static
             * @param {bleproxy.v1.IError} message Error message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Error.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                if (message.attErrorCode != null && Object.hasOwnProperty.call(message, "attErrorCode"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.attErrorCode);
                if (message.platformError != null && Object.hasOwnProperty.call(message, "platformError"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.platformError);
                return writer;
            };

            /**
             * Encodes the specified Error message, length delimited. Does not implicitly {@link bleproxy.v1.Error.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.Error
             * @static
             * @param {bleproxy.v1.IError} message Error message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Error.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Error message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.Error
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.Error} Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Error.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.Error();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.code = reader.int32();
                            break;
                        }
                    case 2: {
                            message.message = reader.string();
                            break;
                        }
                    case 3: {
                            message.attErrorCode = reader.int32();
                            break;
                        }
                    case 4: {
                            message.platformError = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Error message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.Error
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.Error} Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Error.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Error message.
             * @function verify
             * @memberof bleproxy.v1.Error
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Error.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.code != null && message.hasOwnProperty("code"))
                    if (!$util.isInteger(message.code))
                        return "code: integer expected";
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                if (message.attErrorCode != null && message.hasOwnProperty("attErrorCode")) {
                    properties._attErrorCode = 1;
                    if (!$util.isInteger(message.attErrorCode))
                        return "attErrorCode: integer expected";
                }
                if (message.platformError != null && message.hasOwnProperty("platformError")) {
                    properties._platformError = 1;
                    if (!$util.isString(message.platformError))
                        return "platformError: string expected";
                }
                return null;
            };

            /**
             * Creates an Error message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.Error
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.Error} Error
             */
            Error.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.Error)
                    return object;
                var message = new $root.bleproxy.v1.Error();
                if (object.code != null)
                    message.code = object.code | 0;
                if (object.message != null)
                    message.message = String(object.message);
                if (object.attErrorCode != null)
                    message.attErrorCode = object.attErrorCode | 0;
                if (object.platformError != null)
                    message.platformError = String(object.platformError);
                return message;
            };

            /**
             * Creates a plain object from an Error message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.Error
             * @static
             * @param {bleproxy.v1.Error} message Error
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Error.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.code = 0;
                    object.message = "";
                }
                if (message.code != null && message.hasOwnProperty("code"))
                    object.code = message.code;
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                if (message.attErrorCode != null && message.hasOwnProperty("attErrorCode")) {
                    object.attErrorCode = message.attErrorCode;
                    if (options.oneofs)
                        object._attErrorCode = "attErrorCode";
                }
                if (message.platformError != null && message.hasOwnProperty("platformError")) {
                    object.platformError = message.platformError;
                    if (options.oneofs)
                        object._platformError = "platformError";
                }
                return object;
            };

            /**
             * Converts this Error to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.Error
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Error.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Error
             * @function getTypeUrl
             * @memberof bleproxy.v1.Error
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Error.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.Error";
            };

            return Error;
        })();

        v1.Descriptor = (function() {

            /**
             * Properties of a Descriptor.
             * @memberof bleproxy.v1
             * @interface IDescriptor
             * @property {string|null} [uuid] Descriptor uuid
             * @property {Uint8Array|null} [value] Descriptor value
             */

            /**
             * Constructs a new Descriptor.
             * @memberof bleproxy.v1
             * @classdesc Represents a Descriptor.
             * @implements IDescriptor
             * @constructor
             * @param {bleproxy.v1.IDescriptor=} [properties] Properties to set
             */
            function Descriptor(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Descriptor uuid.
             * @member {string} uuid
             * @memberof bleproxy.v1.Descriptor
             * @instance
             */
            Descriptor.prototype.uuid = "";

            /**
             * Descriptor value.
             * @member {Uint8Array|null|undefined} value
             * @memberof bleproxy.v1.Descriptor
             * @instance
             */
            Descriptor.prototype.value = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Descriptor _value.
             * @member {"value"|undefined} _value
             * @memberof bleproxy.v1.Descriptor
             * @instance
             */
            Object.defineProperty(Descriptor.prototype, "_value", {
                get: $util.oneOfGetter($oneOfFields = ["value"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Descriptor instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.Descriptor
             * @static
             * @param {bleproxy.v1.IDescriptor=} [properties] Properties to set
             * @returns {bleproxy.v1.Descriptor} Descriptor instance
             */
            Descriptor.create = function create(properties) {
                return new Descriptor(properties);
            };

            /**
             * Encodes the specified Descriptor message. Does not implicitly {@link bleproxy.v1.Descriptor.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.Descriptor
             * @static
             * @param {bleproxy.v1.IDescriptor} message Descriptor message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Descriptor.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Descriptor message, length delimited. Does not implicitly {@link bleproxy.v1.Descriptor.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.Descriptor
             * @static
             * @param {bleproxy.v1.IDescriptor} message Descriptor message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Descriptor.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Descriptor message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.Descriptor
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.Descriptor} Descriptor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Descriptor.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.Descriptor();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.uuid = reader.string();
                            break;
                        }
                    case 2: {
                            message.value = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Descriptor message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.Descriptor
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.Descriptor} Descriptor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Descriptor.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Descriptor message.
             * @function verify
             * @memberof bleproxy.v1.Descriptor
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Descriptor.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    if (!$util.isString(message.uuid))
                        return "uuid: string expected";
                if (message.value != null && message.hasOwnProperty("value")) {
                    properties._value = 1;
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                }
                return null;
            };

            /**
             * Creates a Descriptor message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.Descriptor
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.Descriptor} Descriptor
             */
            Descriptor.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.Descriptor)
                    return object;
                var message = new $root.bleproxy.v1.Descriptor();
                if (object.uuid != null)
                    message.uuid = String(object.uuid);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length >= 0)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from a Descriptor message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.Descriptor
             * @static
             * @param {bleproxy.v1.Descriptor} message Descriptor
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Descriptor.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.uuid = "";
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    object.uuid = message.uuid;
                if (message.value != null && message.hasOwnProperty("value")) {
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                    if (options.oneofs)
                        object._value = "value";
                }
                return object;
            };

            /**
             * Converts this Descriptor to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.Descriptor
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Descriptor.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Descriptor
             * @function getTypeUrl
             * @memberof bleproxy.v1.Descriptor
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Descriptor.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.Descriptor";
            };

            return Descriptor;
        })();

        v1.Characteristic = (function() {

            /**
             * Properties of a Characteristic.
             * @memberof bleproxy.v1
             * @interface ICharacteristic
             * @property {string|null} [uuid] Characteristic uuid
             * @property {Array.<string>|null} [properties] Characteristic properties
             * @property {Array.<bleproxy.v1.IDescriptor>|null} [descriptors] Characteristic descriptors
             * @property {Uint8Array|null} [value] Characteristic value
             */

            /**
             * Constructs a new Characteristic.
             * @memberof bleproxy.v1
             * @classdesc Represents a Characteristic.
             * @implements ICharacteristic
             * @constructor
             * @param {bleproxy.v1.ICharacteristic=} [properties] Properties to set
             */
            function Characteristic(properties) {
                this.properties = [];
                this.descriptors = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Characteristic uuid.
             * @member {string} uuid
             * @memberof bleproxy.v1.Characteristic
             * @instance
             */
            Characteristic.prototype.uuid = "";

            /**
             * Characteristic properties.
             * @member {Array.<string>} properties
             * @memberof bleproxy.v1.Characteristic
             * @instance
             */
            Characteristic.prototype.properties = $util.emptyArray;

            /**
             * Characteristic descriptors.
             * @member {Array.<bleproxy.v1.IDescriptor>} descriptors
             * @memberof bleproxy.v1.Characteristic
             * @instance
             */
            Characteristic.prototype.descriptors = $util.emptyArray;

            /**
             * Characteristic value.
             * @member {Uint8Array|null|undefined} value
             * @memberof bleproxy.v1.Characteristic
             * @instance
             */
            Characteristic.prototype.value = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Characteristic _value.
             * @member {"value"|undefined} _value
             * @memberof bleproxy.v1.Characteristic
             * @instance
             */
            Object.defineProperty(Characteristic.prototype, "_value", {
                get: $util.oneOfGetter($oneOfFields = ["value"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Characteristic instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.Characteristic
             * @static
             * @param {bleproxy.v1.ICharacteristic=} [properties] Properties to set
             * @returns {bleproxy.v1.Characteristic} Characteristic instance
             */
            Characteristic.create = function create(properties) {
                return new Characteristic(properties);
            };

            /**
             * Encodes the specified Characteristic message. Does not implicitly {@link bleproxy.v1.Characteristic.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.Characteristic
             * @static
             * @param {bleproxy.v1.ICharacteristic} message Characteristic message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Characteristic.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
                if (message.properties != null && message.properties.length)
                    for (var i = 0; i < message.properties.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.properties[i]);
                if (message.descriptors != null && message.descriptors.length)
                    for (var i = 0; i < message.descriptors.length; ++i)
                        $root.bleproxy.v1.Descriptor.encode(message.descriptors[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Characteristic message, length delimited. Does not implicitly {@link bleproxy.v1.Characteristic.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.Characteristic
             * @static
             * @param {bleproxy.v1.ICharacteristic} message Characteristic message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Characteristic.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Characteristic message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.Characteristic
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.Characteristic} Characteristic
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Characteristic.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.Characteristic();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.uuid = reader.string();
                            break;
                        }
                    case 2: {
                            if (!(message.properties && message.properties.length))
                                message.properties = [];
                            message.properties.push(reader.string());
                            break;
                        }
                    case 3: {
                            if (!(message.descriptors && message.descriptors.length))
                                message.descriptors = [];
                            message.descriptors.push($root.bleproxy.v1.Descriptor.decode(reader, reader.uint32()));
                            break;
                        }
                    case 4: {
                            message.value = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Characteristic message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.Characteristic
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.Characteristic} Characteristic
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Characteristic.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Characteristic message.
             * @function verify
             * @memberof bleproxy.v1.Characteristic
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Characteristic.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    if (!$util.isString(message.uuid))
                        return "uuid: string expected";
                if (message.properties != null && message.hasOwnProperty("properties")) {
                    if (!Array.isArray(message.properties))
                        return "properties: array expected";
                    for (var i = 0; i < message.properties.length; ++i)
                        if (!$util.isString(message.properties[i]))
                            return "properties: string[] expected";
                }
                if (message.descriptors != null && message.hasOwnProperty("descriptors")) {
                    if (!Array.isArray(message.descriptors))
                        return "descriptors: array expected";
                    for (var i = 0; i < message.descriptors.length; ++i) {
                        var error = $root.bleproxy.v1.Descriptor.verify(message.descriptors[i]);
                        if (error)
                            return "descriptors." + error;
                    }
                }
                if (message.value != null && message.hasOwnProperty("value")) {
                    properties._value = 1;
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                }
                return null;
            };

            /**
             * Creates a Characteristic message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.Characteristic
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.Characteristic} Characteristic
             */
            Characteristic.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.Characteristic)
                    return object;
                var message = new $root.bleproxy.v1.Characteristic();
                if (object.uuid != null)
                    message.uuid = String(object.uuid);
                if (object.properties) {
                    if (!Array.isArray(object.properties))
                        throw TypeError(".bleproxy.v1.Characteristic.properties: array expected");
                    message.properties = [];
                    for (var i = 0; i < object.properties.length; ++i)
                        message.properties[i] = String(object.properties[i]);
                }
                if (object.descriptors) {
                    if (!Array.isArray(object.descriptors))
                        throw TypeError(".bleproxy.v1.Characteristic.descriptors: array expected");
                    message.descriptors = [];
                    for (var i = 0; i < object.descriptors.length; ++i) {
                        if (typeof object.descriptors[i] !== "object")
                            throw TypeError(".bleproxy.v1.Characteristic.descriptors: object expected");
                        message.descriptors[i] = $root.bleproxy.v1.Descriptor.fromObject(object.descriptors[i]);
                    }
                }
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length >= 0)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from a Characteristic message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.Characteristic
             * @static
             * @param {bleproxy.v1.Characteristic} message Characteristic
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Characteristic.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.properties = [];
                    object.descriptors = [];
                }
                if (options.defaults)
                    object.uuid = "";
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    object.uuid = message.uuid;
                if (message.properties && message.properties.length) {
                    object.properties = [];
                    for (var j = 0; j < message.properties.length; ++j)
                        object.properties[j] = message.properties[j];
                }
                if (message.descriptors && message.descriptors.length) {
                    object.descriptors = [];
                    for (var j = 0; j < message.descriptors.length; ++j)
                        object.descriptors[j] = $root.bleproxy.v1.Descriptor.toObject(message.descriptors[j], options);
                }
                if (message.value != null && message.hasOwnProperty("value")) {
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                    if (options.oneofs)
                        object._value = "value";
                }
                return object;
            };

            /**
             * Converts this Characteristic to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.Characteristic
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Characteristic.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Characteristic
             * @function getTypeUrl
             * @memberof bleproxy.v1.Characteristic
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Characteristic.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.Characteristic";
            };

            return Characteristic;
        })();

        v1.Service = (function() {

            /**
             * Properties of a Service.
             * @memberof bleproxy.v1
             * @interface IService
             * @property {string|null} [uuid] Service uuid
             * @property {Array.<bleproxy.v1.ICharacteristic>|null} [characteristics] Service characteristics
             * @property {boolean|null} [isPrimary] Service isPrimary
             */

            /**
             * Constructs a new Service.
             * @memberof bleproxy.v1
             * @classdesc Represents a Service.
             * @implements IService
             * @constructor
             * @param {bleproxy.v1.IService=} [properties] Properties to set
             */
            function Service(properties) {
                this.characteristics = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Service uuid.
             * @member {string} uuid
             * @memberof bleproxy.v1.Service
             * @instance
             */
            Service.prototype.uuid = "";

            /**
             * Service characteristics.
             * @member {Array.<bleproxy.v1.ICharacteristic>} characteristics
             * @memberof bleproxy.v1.Service
             * @instance
             */
            Service.prototype.characteristics = $util.emptyArray;

            /**
             * Service isPrimary.
             * @member {boolean|null|undefined} isPrimary
             * @memberof bleproxy.v1.Service
             * @instance
             */
            Service.prototype.isPrimary = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Service _isPrimary.
             * @member {"isPrimary"|undefined} _isPrimary
             * @memberof bleproxy.v1.Service
             * @instance
             */
            Object.defineProperty(Service.prototype, "_isPrimary", {
                get: $util.oneOfGetter($oneOfFields = ["isPrimary"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Service instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.Service
             * @static
             * @param {bleproxy.v1.IService=} [properties] Properties to set
             * @returns {bleproxy.v1.Service} Service instance
             */
            Service.create = function create(properties) {
                return new Service(properties);
            };

            /**
             * Encodes the specified Service message. Does not implicitly {@link bleproxy.v1.Service.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.Service
             * @static
             * @param {bleproxy.v1.IService} message Service message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Service.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
                if (message.characteristics != null && message.characteristics.length)
                    for (var i = 0; i < message.characteristics.length; ++i)
                        $root.bleproxy.v1.Characteristic.encode(message.characteristics[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.isPrimary != null && Object.hasOwnProperty.call(message, "isPrimary"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isPrimary);
                return writer;
            };

            /**
             * Encodes the specified Service message, length delimited. Does not implicitly {@link bleproxy.v1.Service.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.Service
             * @static
             * @param {bleproxy.v1.IService} message Service message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Service.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Service message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.Service
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.Service} Service
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Service.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.Service();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.uuid = reader.string();
                            break;
                        }
                    case 2: {
                            if (!(message.characteristics && message.characteristics.length))
                                message.characteristics = [];
                            message.characteristics.push($root.bleproxy.v1.Characteristic.decode(reader, reader.uint32()));
                            break;
                        }
                    case 3: {
                            message.isPrimary = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Service message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.Service
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.Service} Service
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Service.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Service message.
             * @function verify
             * @memberof bleproxy.v1.Service
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Service.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    if (!$util.isString(message.uuid))
                        return "uuid: string expected";
                if (message.characteristics != null && message.hasOwnProperty("characteristics")) {
                    if (!Array.isArray(message.characteristics))
                        return "characteristics: array expected";
                    for (var i = 0; i < message.characteristics.length; ++i) {
                        var error = $root.bleproxy.v1.Characteristic.verify(message.characteristics[i]);
                        if (error)
                            return "characteristics." + error;
                    }
                }
                if (message.isPrimary != null && message.hasOwnProperty("isPrimary")) {
                    properties._isPrimary = 1;
                    if (typeof message.isPrimary !== "boolean")
                        return "isPrimary: boolean expected";
                }
                return null;
            };

            /**
             * Creates a Service message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.Service
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.Service} Service
             */
            Service.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.Service)
                    return object;
                var message = new $root.bleproxy.v1.Service();
                if (object.uuid != null)
                    message.uuid = String(object.uuid);
                if (object.characteristics) {
                    if (!Array.isArray(object.characteristics))
                        throw TypeError(".bleproxy.v1.Service.characteristics: array expected");
                    message.characteristics = [];
                    for (var i = 0; i < object.characteristics.length; ++i) {
                        if (typeof object.characteristics[i] !== "object")
                            throw TypeError(".bleproxy.v1.Service.characteristics: object expected");
                        message.characteristics[i] = $root.bleproxy.v1.Characteristic.fromObject(object.characteristics[i]);
                    }
                }
                if (object.isPrimary != null)
                    message.isPrimary = Boolean(object.isPrimary);
                return message;
            };

            /**
             * Creates a plain object from a Service message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.Service
             * @static
             * @param {bleproxy.v1.Service} message Service
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Service.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.characteristics = [];
                if (options.defaults)
                    object.uuid = "";
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    object.uuid = message.uuid;
                if (message.characteristics && message.characteristics.length) {
                    object.characteristics = [];
                    for (var j = 0; j < message.characteristics.length; ++j)
                        object.characteristics[j] = $root.bleproxy.v1.Characteristic.toObject(message.characteristics[j], options);
                }
                if (message.isPrimary != null && message.hasOwnProperty("isPrimary")) {
                    object.isPrimary = message.isPrimary;
                    if (options.oneofs)
                        object._isPrimary = "isPrimary";
                }
                return object;
            };

            /**
             * Converts this Service to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.Service
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Service.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Service
             * @function getTypeUrl
             * @memberof bleproxy.v1.Service
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Service.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.Service";
            };

            return Service;
        })();

        v1.Device = (function() {

            /**
             * Properties of a Device.
             * @memberof bleproxy.v1
             * @interface IDevice
             * @property {string|null} [id] Device id
             * @property {string|null} [name] Device name
             * @property {number|null} [rssi] Device rssi
             * @property {number|null} [mtu] Device mtu
             * @property {Uint8Array|null} [manufacturerData] Device manufacturerData
             * @property {Array.<string>|null} [serviceUuids] Device serviceUuids
             * @property {Object.<string,Uint8Array>|null} [serviceData] Device serviceData
             * @property {number|null} [txPowerLevel] Device txPowerLevel
             * @property {boolean|null} [isConnectable] Device isConnectable
             * @property {Array.<string>|null} [solicitedServiceUuids] Device solicitedServiceUuids
             * @property {Array.<string>|null} [overflowServiceUuids] Device overflowServiceUuids
             */

            /**
             * Constructs a new Device.
             * @memberof bleproxy.v1
             * @classdesc Represents a Device.
             * @implements IDevice
             * @constructor
             * @param {bleproxy.v1.IDevice=} [properties] Properties to set
             */
            function Device(properties) {
                this.serviceUuids = [];
                this.serviceData = {};
                this.solicitedServiceUuids = [];
                this.overflowServiceUuids = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Device id.
             * @member {string} id
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Device.prototype.id = "";

            /**
             * Device name.
             * @member {string|null|undefined} name
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Device.prototype.name = null;

            /**
             * Device rssi.
             * @member {number|null|undefined} rssi
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Device.prototype.rssi = null;

            /**
             * Device mtu.
             * @member {number|null|undefined} mtu
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Device.prototype.mtu = null;

            /**
             * Device manufacturerData.
             * @member {Uint8Array|null|undefined} manufacturerData
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Device.prototype.manufacturerData = null;

            /**
             * Device serviceUuids.
             * @member {Array.<string>} serviceUuids
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Device.prototype.serviceUuids = $util.emptyArray;

            /**
             * Device serviceData.
             * @member {Object.<string,Uint8Array>} serviceData
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Device.prototype.serviceData = $util.emptyObject;

            /**
             * Device txPowerLevel.
             * @member {number|null|undefined} txPowerLevel
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Device.prototype.txPowerLevel = null;

            /**
             * Device isConnectable.
             * @member {boolean|null|undefined} isConnectable
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Device.prototype.isConnectable = null;

            /**
             * Device solicitedServiceUuids.
             * @member {Array.<string>} solicitedServiceUuids
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Device.prototype.solicitedServiceUuids = $util.emptyArray;

            /**
             * Device overflowServiceUuids.
             * @member {Array.<string>} overflowServiceUuids
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Device.prototype.overflowServiceUuids = $util.emptyArray;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Device _name.
             * @member {"name"|undefined} _name
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Object.defineProperty(Device.prototype, "_name", {
                get: $util.oneOfGetter($oneOfFields = ["name"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Device _rssi.
             * @member {"rssi"|undefined} _rssi
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Object.defineProperty(Device.prototype, "_rssi", {
                get: $util.oneOfGetter($oneOfFields = ["rssi"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Device _mtu.
             * @member {"mtu"|undefined} _mtu
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Object.defineProperty(Device.prototype, "_mtu", {
                get: $util.oneOfGetter($oneOfFields = ["mtu"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Device _manufacturerData.
             * @member {"manufacturerData"|undefined} _manufacturerData
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Object.defineProperty(Device.prototype, "_manufacturerData", {
                get: $util.oneOfGetter($oneOfFields = ["manufacturerData"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Device _txPowerLevel.
             * @member {"txPowerLevel"|undefined} _txPowerLevel
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Object.defineProperty(Device.prototype, "_txPowerLevel", {
                get: $util.oneOfGetter($oneOfFields = ["txPowerLevel"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Device _isConnectable.
             * @member {"isConnectable"|undefined} _isConnectable
             * @memberof bleproxy.v1.Device
             * @instance
             */
            Object.defineProperty(Device.prototype, "_isConnectable", {
                get: $util.oneOfGetter($oneOfFields = ["isConnectable"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Device instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.Device
             * @static
             * @param {bleproxy.v1.IDevice=} [properties] Properties to set
             * @returns {bleproxy.v1.Device} Device instance
             */
            Device.create = function create(properties) {
                return new Device(properties);
            };

            /**
             * Encodes the specified Device message. Does not implicitly {@link bleproxy.v1.Device.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.Device
             * @static
             * @param {bleproxy.v1.IDevice} message Device message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Device.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.rssi != null && Object.hasOwnProperty.call(message, "rssi"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.rssi);
                if (message.mtu != null && Object.hasOwnProperty.call(message, "mtu"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.mtu);
                if (message.manufacturerData != null && Object.hasOwnProperty.call(message, "manufacturerData"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.manufacturerData);
                if (message.serviceUuids != null && message.serviceUuids.length)
                    for (var i = 0; i < message.serviceUuids.length; ++i)
                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.serviceUuids[i]);
                if (message.serviceData != null && Object.hasOwnProperty.call(message, "serviceData"))
                    for (var keys = Object.keys(message.serviceData), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 7, wireType 2 =*/58).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).bytes(message.serviceData[keys[i]]).ldelim();
                if (message.txPowerLevel != null && Object.hasOwnProperty.call(message, "txPowerLevel"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int32(message.txPowerLevel);
                if (message.isConnectable != null && Object.hasOwnProperty.call(message, "isConnectable"))
                    writer.uint32(/* id 9, wireType 0 =*/72).bool(message.isConnectable);
                if (message.solicitedServiceUuids != null && message.solicitedServiceUuids.length)
                    for (var i = 0; i < message.solicitedServiceUuids.length; ++i)
                        writer.uint32(/* id 10, wireType 2 =*/82).string(message.solicitedServiceUuids[i]);
                if (message.overflowServiceUuids != null && message.overflowServiceUuids.length)
                    for (var i = 0; i < message.overflowServiceUuids.length; ++i)
                        writer.uint32(/* id 11, wireType 2 =*/90).string(message.overflowServiceUuids[i]);
                return writer;
            };

            /**
             * Encodes the specified Device message, length delimited. Does not implicitly {@link bleproxy.v1.Device.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.Device
             * @static
             * @param {bleproxy.v1.IDevice} message Device message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Device.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Device message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.Device
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.Device} Device
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Device.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.Device(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.rssi = reader.int32();
                            break;
                        }
                    case 4: {
                            message.mtu = reader.int32();
                            break;
                        }
                    case 5: {
                            message.manufacturerData = reader.bytes();
                            break;
                        }
                    case 6: {
                            if (!(message.serviceUuids && message.serviceUuids.length))
                                message.serviceUuids = [];
                            message.serviceUuids.push(reader.string());
                            break;
                        }
                    case 7: {
                            if (message.serviceData === $util.emptyObject)
                                message.serviceData = {};
                            var end2 = reader.uint32() + reader.pos;
                            key = "";
                            value = [];
                            while (reader.pos < end2) {
                                var tag2 = reader.uint32();
                                switch (tag2 >>> 3) {
                                case 1:
                                    key = reader.string();
                                    break;
                                case 2:
                                    value = reader.bytes();
                                    break;
                                default:
                                    reader.skipType(tag2 & 7);
                                    break;
                                }
                            }
                            message.serviceData[key] = value;
                            break;
                        }
                    case 8: {
                            message.txPowerLevel = reader.int32();
                            break;
                        }
                    case 9: {
                            message.isConnectable = reader.bool();
                            break;
                        }
                    case 10: {
                            if (!(message.solicitedServiceUuids && message.solicitedServiceUuids.length))
                                message.solicitedServiceUuids = [];
                            message.solicitedServiceUuids.push(reader.string());
                            break;
                        }
                    case 11: {
                            if (!(message.overflowServiceUuids && message.overflowServiceUuids.length))
                                message.overflowServiceUuids = [];
                            message.overflowServiceUuids.push(reader.string());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Device message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.Device
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.Device} Device
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Device.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Device message.
             * @function verify
             * @memberof bleproxy.v1.Device
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Device.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.name != null && message.hasOwnProperty("name")) {
                    properties._name = 1;
                    if (!$util.isString(message.name))
                        return "name: string expected";
                }
                if (message.rssi != null && message.hasOwnProperty("rssi")) {
                    properties._rssi = 1;
                    if (!$util.isInteger(message.rssi))
                        return "rssi: integer expected";
                }
                if (message.mtu != null && message.hasOwnProperty("mtu")) {
                    properties._mtu = 1;
                    if (!$util.isInteger(message.mtu))
                        return "mtu: integer expected";
                }
                if (message.manufacturerData != null && message.hasOwnProperty("manufacturerData")) {
                    properties._manufacturerData = 1;
                    if (!(message.manufacturerData && typeof message.manufacturerData.length === "number" || $util.isString(message.manufacturerData)))
                        return "manufacturerData: buffer expected";
                }
                if (message.serviceUuids != null && message.hasOwnProperty("serviceUuids")) {
                    if (!Array.isArray(message.serviceUuids))
                        return "serviceUuids: array expected";
                    for (var i = 0; i < message.serviceUuids.length; ++i)
                        if (!$util.isString(message.serviceUuids[i]))
                            return "serviceUuids: string[] expected";
                }
                if (message.serviceData != null && message.hasOwnProperty("serviceData")) {
                    if (!$util.isObject(message.serviceData))
                        return "serviceData: object expected";
                    var key = Object.keys(message.serviceData);
                    for (var i = 0; i < key.length; ++i)
                        if (!(message.serviceData[key[i]] && typeof message.serviceData[key[i]].length === "number" || $util.isString(message.serviceData[key[i]])))
                            return "serviceData: buffer{k:string} expected";
                }
                if (message.txPowerLevel != null && message.hasOwnProperty("txPowerLevel")) {
                    properties._txPowerLevel = 1;
                    if (!$util.isInteger(message.txPowerLevel))
                        return "txPowerLevel: integer expected";
                }
                if (message.isConnectable != null && message.hasOwnProperty("isConnectable")) {
                    properties._isConnectable = 1;
                    if (typeof message.isConnectable !== "boolean")
                        return "isConnectable: boolean expected";
                }
                if (message.solicitedServiceUuids != null && message.hasOwnProperty("solicitedServiceUuids")) {
                    if (!Array.isArray(message.solicitedServiceUuids))
                        return "solicitedServiceUuids: array expected";
                    for (var i = 0; i < message.solicitedServiceUuids.length; ++i)
                        if (!$util.isString(message.solicitedServiceUuids[i]))
                            return "solicitedServiceUuids: string[] expected";
                }
                if (message.overflowServiceUuids != null && message.hasOwnProperty("overflowServiceUuids")) {
                    if (!Array.isArray(message.overflowServiceUuids))
                        return "overflowServiceUuids: array expected";
                    for (var i = 0; i < message.overflowServiceUuids.length; ++i)
                        if (!$util.isString(message.overflowServiceUuids[i]))
                            return "overflowServiceUuids: string[] expected";
                }
                return null;
            };

            /**
             * Creates a Device message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.Device
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.Device} Device
             */
            Device.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.Device)
                    return object;
                var message = new $root.bleproxy.v1.Device();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.rssi != null)
                    message.rssi = object.rssi | 0;
                if (object.mtu != null)
                    message.mtu = object.mtu | 0;
                if (object.manufacturerData != null)
                    if (typeof object.manufacturerData === "string")
                        $util.base64.decode(object.manufacturerData, message.manufacturerData = $util.newBuffer($util.base64.length(object.manufacturerData)), 0);
                    else if (object.manufacturerData.length >= 0)
                        message.manufacturerData = object.manufacturerData;
                if (object.serviceUuids) {
                    if (!Array.isArray(object.serviceUuids))
                        throw TypeError(".bleproxy.v1.Device.serviceUuids: array expected");
                    message.serviceUuids = [];
                    for (var i = 0; i < object.serviceUuids.length; ++i)
                        message.serviceUuids[i] = String(object.serviceUuids[i]);
                }
                if (object.serviceData) {
                    if (typeof object.serviceData !== "object")
                        throw TypeError(".bleproxy.v1.Device.serviceData: object expected");
                    message.serviceData = {};
                    for (var keys = Object.keys(object.serviceData), i = 0; i < keys.length; ++i)
                        if (typeof object.serviceData[keys[i]] === "string")
                            $util.base64.decode(object.serviceData[keys[i]], message.serviceData[keys[i]] = $util.newBuffer($util.base64.length(object.serviceData[keys[i]])), 0);
                        else if (object.serviceData[keys[i]].length >= 0)
                            message.serviceData[keys[i]] = object.serviceData[keys[i]];
                }
                if (object.txPowerLevel != null)
                    message.txPowerLevel = object.txPowerLevel | 0;
                if (object.isConnectable != null)
                    message.isConnectable = Boolean(object.isConnectable);
                if (object.solicitedServiceUuids) {
                    if (!Array.isArray(object.solicitedServiceUuids))
                        throw TypeError(".bleproxy.v1.Device.solicitedServiceUuids: array expected");
                    message.solicitedServiceUuids = [];
                    for (var i = 0; i < object.solicitedServiceUuids.length; ++i)
                        message.solicitedServiceUuids[i] = String(object.solicitedServiceUuids[i]);
                }
                if (object.overflowServiceUuids) {
                    if (!Array.isArray(object.overflowServiceUuids))
                        throw TypeError(".bleproxy.v1.Device.overflowServiceUuids: array expected");
                    message.overflowServiceUuids = [];
                    for (var i = 0; i < object.overflowServiceUuids.length; ++i)
                        message.overflowServiceUuids[i] = String(object.overflowServiceUuids[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Device message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.Device
             * @static
             * @param {bleproxy.v1.Device} message Device
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Device.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.serviceUuids = [];
                    object.solicitedServiceUuids = [];
                    object.overflowServiceUuids = [];
                }
                if (options.objects || options.defaults)
                    object.serviceData = {};
                if (options.defaults)
                    object.id = "";
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.name != null && message.hasOwnProperty("name")) {
                    object.name = message.name;
                    if (options.oneofs)
                        object._name = "name";
                }
                if (message.rssi != null && message.hasOwnProperty("rssi")) {
                    object.rssi = message.rssi;
                    if (options.oneofs)
                        object._rssi = "rssi";
                }
                if (message.mtu != null && message.hasOwnProperty("mtu")) {
                    object.mtu = message.mtu;
                    if (options.oneofs)
                        object._mtu = "mtu";
                }
                if (message.manufacturerData != null && message.hasOwnProperty("manufacturerData")) {
                    object.manufacturerData = options.bytes === String ? $util.base64.encode(message.manufacturerData, 0, message.manufacturerData.length) : options.bytes === Array ? Array.prototype.slice.call(message.manufacturerData) : message.manufacturerData;
                    if (options.oneofs)
                        object._manufacturerData = "manufacturerData";
                }
                if (message.serviceUuids && message.serviceUuids.length) {
                    object.serviceUuids = [];
                    for (var j = 0; j < message.serviceUuids.length; ++j)
                        object.serviceUuids[j] = message.serviceUuids[j];
                }
                var keys2;
                if (message.serviceData && (keys2 = Object.keys(message.serviceData)).length) {
                    object.serviceData = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.serviceData[keys2[j]] = options.bytes === String ? $util.base64.encode(message.serviceData[keys2[j]], 0, message.serviceData[keys2[j]].length) : options.bytes === Array ? Array.prototype.slice.call(message.serviceData[keys2[j]]) : message.serviceData[keys2[j]];
                }
                if (message.txPowerLevel != null && message.hasOwnProperty("txPowerLevel")) {
                    object.txPowerLevel = message.txPowerLevel;
                    if (options.oneofs)
                        object._txPowerLevel = "txPowerLevel";
                }
                if (message.isConnectable != null && message.hasOwnProperty("isConnectable")) {
                    object.isConnectable = message.isConnectable;
                    if (options.oneofs)
                        object._isConnectable = "isConnectable";
                }
                if (message.solicitedServiceUuids && message.solicitedServiceUuids.length) {
                    object.solicitedServiceUuids = [];
                    for (var j = 0; j < message.solicitedServiceUuids.length; ++j)
                        object.solicitedServiceUuids[j] = message.solicitedServiceUuids[j];
                }
                if (message.overflowServiceUuids && message.overflowServiceUuids.length) {
                    object.overflowServiceUuids = [];
                    for (var j = 0; j < message.overflowServiceUuids.length; ++j)
                        object.overflowServiceUuids[j] = message.overflowServiceUuids[j];
                }
                return object;
            };

            /**
             * Converts this Device to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.Device
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Device.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Device
             * @function getTypeUrl
             * @memberof bleproxy.v1.Device
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Device.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.Device";
            };

            return Device;
        })();

        v1.HealthRequest = (function() {

            /**
             * Properties of a HealthRequest.
             * @memberof bleproxy.v1
             * @interface IHealthRequest
             */

            /**
             * Constructs a new HealthRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents a HealthRequest.
             * @implements IHealthRequest
             * @constructor
             * @param {bleproxy.v1.IHealthRequest=} [properties] Properties to set
             */
            function HealthRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new HealthRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.HealthRequest
             * @static
             * @param {bleproxy.v1.IHealthRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.HealthRequest} HealthRequest instance
             */
            HealthRequest.create = function create(properties) {
                return new HealthRequest(properties);
            };

            /**
             * Encodes the specified HealthRequest message. Does not implicitly {@link bleproxy.v1.HealthRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.HealthRequest
             * @static
             * @param {bleproxy.v1.IHealthRequest} message HealthRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HealthRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified HealthRequest message, length delimited. Does not implicitly {@link bleproxy.v1.HealthRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.HealthRequest
             * @static
             * @param {bleproxy.v1.IHealthRequest} message HealthRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HealthRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a HealthRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.HealthRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.HealthRequest} HealthRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HealthRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.HealthRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a HealthRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.HealthRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.HealthRequest} HealthRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HealthRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a HealthRequest message.
             * @function verify
             * @memberof bleproxy.v1.HealthRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            HealthRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a HealthRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.HealthRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.HealthRequest} HealthRequest
             */
            HealthRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.HealthRequest)
                    return object;
                return new $root.bleproxy.v1.HealthRequest();
            };

            /**
             * Creates a plain object from a HealthRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.HealthRequest
             * @static
             * @param {bleproxy.v1.HealthRequest} message HealthRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            HealthRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this HealthRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.HealthRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            HealthRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for HealthRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.HealthRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            HealthRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.HealthRequest";
            };

            return HealthRequest;
        })();

        v1.HealthResponse = (function() {

            /**
             * Properties of a HealthResponse.
             * @memberof bleproxy.v1
             * @interface IHealthResponse
             * @property {boolean|null} [ready] HealthResponse ready
             * @property {string|null} [serverVersion] HealthResponse serverVersion
             * @property {string|null} [protocolVersion] HealthResponse protocolVersion
             * @property {bleproxy.v1.ManagerState|null} [bluetoothState] HealthResponse bluetoothState
             */

            /**
             * Constructs a new HealthResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents a HealthResponse.
             * @implements IHealthResponse
             * @constructor
             * @param {bleproxy.v1.IHealthResponse=} [properties] Properties to set
             */
            function HealthResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * HealthResponse ready.
             * @member {boolean} ready
             * @memberof bleproxy.v1.HealthResponse
             * @instance
             */
            HealthResponse.prototype.ready = false;

            /**
             * HealthResponse serverVersion.
             * @member {string} serverVersion
             * @memberof bleproxy.v1.HealthResponse
             * @instance
             */
            HealthResponse.prototype.serverVersion = "";

            /**
             * HealthResponse protocolVersion.
             * @member {string} protocolVersion
             * @memberof bleproxy.v1.HealthResponse
             * @instance
             */
            HealthResponse.prototype.protocolVersion = "";

            /**
             * HealthResponse bluetoothState.
             * @member {bleproxy.v1.ManagerState} bluetoothState
             * @memberof bleproxy.v1.HealthResponse
             * @instance
             */
            HealthResponse.prototype.bluetoothState = 0;

            /**
             * Creates a new HealthResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.HealthResponse
             * @static
             * @param {bleproxy.v1.IHealthResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.HealthResponse} HealthResponse instance
             */
            HealthResponse.create = function create(properties) {
                return new HealthResponse(properties);
            };

            /**
             * Encodes the specified HealthResponse message. Does not implicitly {@link bleproxy.v1.HealthResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.HealthResponse
             * @static
             * @param {bleproxy.v1.IHealthResponse} message HealthResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HealthResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.ready != null && Object.hasOwnProperty.call(message, "ready"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.ready);
                if (message.serverVersion != null && Object.hasOwnProperty.call(message, "serverVersion"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.serverVersion);
                if (message.protocolVersion != null && Object.hasOwnProperty.call(message, "protocolVersion"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.protocolVersion);
                if (message.bluetoothState != null && Object.hasOwnProperty.call(message, "bluetoothState"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.bluetoothState);
                return writer;
            };

            /**
             * Encodes the specified HealthResponse message, length delimited. Does not implicitly {@link bleproxy.v1.HealthResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.HealthResponse
             * @static
             * @param {bleproxy.v1.IHealthResponse} message HealthResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HealthResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a HealthResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.HealthResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.HealthResponse} HealthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HealthResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.HealthResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.ready = reader.bool();
                            break;
                        }
                    case 2: {
                            message.serverVersion = reader.string();
                            break;
                        }
                    case 3: {
                            message.protocolVersion = reader.string();
                            break;
                        }
                    case 4: {
                            message.bluetoothState = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a HealthResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.HealthResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.HealthResponse} HealthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HealthResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a HealthResponse message.
             * @function verify
             * @memberof bleproxy.v1.HealthResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            HealthResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ready != null && message.hasOwnProperty("ready"))
                    if (typeof message.ready !== "boolean")
                        return "ready: boolean expected";
                if (message.serverVersion != null && message.hasOwnProperty("serverVersion"))
                    if (!$util.isString(message.serverVersion))
                        return "serverVersion: string expected";
                if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
                    if (!$util.isString(message.protocolVersion))
                        return "protocolVersion: string expected";
                if (message.bluetoothState != null && message.hasOwnProperty("bluetoothState"))
                    switch (message.bluetoothState) {
                    default:
                        return "bluetoothState: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    }
                return null;
            };

            /**
             * Creates a HealthResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.HealthResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.HealthResponse} HealthResponse
             */
            HealthResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.HealthResponse)
                    return object;
                var message = new $root.bleproxy.v1.HealthResponse();
                if (object.ready != null)
                    message.ready = Boolean(object.ready);
                if (object.serverVersion != null)
                    message.serverVersion = String(object.serverVersion);
                if (object.protocolVersion != null)
                    message.protocolVersion = String(object.protocolVersion);
                switch (object.bluetoothState) {
                default:
                    if (typeof object.bluetoothState === "number") {
                        message.bluetoothState = object.bluetoothState;
                        break;
                    }
                    break;
                case "MANAGER_STATE_UNKNOWN":
                case 0:
                    message.bluetoothState = 0;
                    break;
                case "MANAGER_STATE_RESETTING":
                case 1:
                    message.bluetoothState = 1;
                    break;
                case "MANAGER_STATE_UNSUPPORTED":
                case 2:
                    message.bluetoothState = 2;
                    break;
                case "MANAGER_STATE_UNAUTHORIZED":
                case 3:
                    message.bluetoothState = 3;
                    break;
                case "MANAGER_STATE_POWERED_OFF":
                case 4:
                    message.bluetoothState = 4;
                    break;
                case "MANAGER_STATE_POWERED_ON":
                case 5:
                    message.bluetoothState = 5;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a HealthResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.HealthResponse
             * @static
             * @param {bleproxy.v1.HealthResponse} message HealthResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            HealthResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.ready = false;
                    object.serverVersion = "";
                    object.protocolVersion = "";
                    object.bluetoothState = options.enums === String ? "MANAGER_STATE_UNKNOWN" : 0;
                }
                if (message.ready != null && message.hasOwnProperty("ready"))
                    object.ready = message.ready;
                if (message.serverVersion != null && message.hasOwnProperty("serverVersion"))
                    object.serverVersion = message.serverVersion;
                if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
                    object.protocolVersion = message.protocolVersion;
                if (message.bluetoothState != null && message.hasOwnProperty("bluetoothState"))
                    object.bluetoothState = options.enums === String ? $root.bleproxy.v1.ManagerState[message.bluetoothState] === undefined ? message.bluetoothState : $root.bleproxy.v1.ManagerState[message.bluetoothState] : message.bluetoothState;
                return object;
            };

            /**
             * Converts this HealthResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.HealthResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            HealthResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for HealthResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.HealthResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            HealthResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.HealthResponse";
            };

            return HealthResponse;
        })();

        v1.StateRequest = (function() {

            /**
             * Properties of a StateRequest.
             * @memberof bleproxy.v1
             * @interface IStateRequest
             */

            /**
             * Constructs a new StateRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents a StateRequest.
             * @implements IStateRequest
             * @constructor
             * @param {bleproxy.v1.IStateRequest=} [properties] Properties to set
             */
            function StateRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new StateRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.StateRequest
             * @static
             * @param {bleproxy.v1.IStateRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.StateRequest} StateRequest instance
             */
            StateRequest.create = function create(properties) {
                return new StateRequest(properties);
            };

            /**
             * Encodes the specified StateRequest message. Does not implicitly {@link bleproxy.v1.StateRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.StateRequest
             * @static
             * @param {bleproxy.v1.IStateRequest} message StateRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StateRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified StateRequest message, length delimited. Does not implicitly {@link bleproxy.v1.StateRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.StateRequest
             * @static
             * @param {bleproxy.v1.IStateRequest} message StateRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StateRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StateRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.StateRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.StateRequest} StateRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StateRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.StateRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a StateRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.StateRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.StateRequest} StateRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StateRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StateRequest message.
             * @function verify
             * @memberof bleproxy.v1.StateRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StateRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a StateRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.StateRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.StateRequest} StateRequest
             */
            StateRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.StateRequest)
                    return object;
                return new $root.bleproxy.v1.StateRequest();
            };

            /**
             * Creates a plain object from a StateRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.StateRequest
             * @static
             * @param {bleproxy.v1.StateRequest} message StateRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StateRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this StateRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.StateRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StateRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for StateRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.StateRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            StateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.StateRequest";
            };

            return StateRequest;
        })();

        v1.StateResponse = (function() {

            /**
             * Properties of a StateResponse.
             * @memberof bleproxy.v1
             * @interface IStateResponse
             * @property {bleproxy.v1.ManagerState|null} [state] StateResponse state
             * @property {bleproxy.v1.IError|null} [error] StateResponse error
             */

            /**
             * Constructs a new StateResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents a StateResponse.
             * @implements IStateResponse
             * @constructor
             * @param {bleproxy.v1.IStateResponse=} [properties] Properties to set
             */
            function StateResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * StateResponse state.
             * @member {bleproxy.v1.ManagerState} state
             * @memberof bleproxy.v1.StateResponse
             * @instance
             */
            StateResponse.prototype.state = 0;

            /**
             * StateResponse error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.StateResponse
             * @instance
             */
            StateResponse.prototype.error = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * StateResponse _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.StateResponse
             * @instance
             */
            Object.defineProperty(StateResponse.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new StateResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.StateResponse
             * @static
             * @param {bleproxy.v1.IStateResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.StateResponse} StateResponse instance
             */
            StateResponse.create = function create(properties) {
                return new StateResponse(properties);
            };

            /**
             * Encodes the specified StateResponse message. Does not implicitly {@link bleproxy.v1.StateResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.StateResponse
             * @static
             * @param {bleproxy.v1.IStateResponse} message StateResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StateResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified StateResponse message, length delimited. Does not implicitly {@link bleproxy.v1.StateResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.StateResponse
             * @static
             * @param {bleproxy.v1.IStateResponse} message StateResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StateResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StateResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.StateResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.StateResponse} StateResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StateResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.StateResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.state = reader.int32();
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a StateResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.StateResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.StateResponse} StateResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StateResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StateResponse message.
             * @function verify
             * @memberof bleproxy.v1.StateResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StateResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.state != null && message.hasOwnProperty("state"))
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    }
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a StateResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.StateResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.StateResponse} StateResponse
             */
            StateResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.StateResponse)
                    return object;
                var message = new $root.bleproxy.v1.StateResponse();
                switch (object.state) {
                default:
                    if (typeof object.state === "number") {
                        message.state = object.state;
                        break;
                    }
                    break;
                case "MANAGER_STATE_UNKNOWN":
                case 0:
                    message.state = 0;
                    break;
                case "MANAGER_STATE_RESETTING":
                case 1:
                    message.state = 1;
                    break;
                case "MANAGER_STATE_UNSUPPORTED":
                case 2:
                    message.state = 2;
                    break;
                case "MANAGER_STATE_UNAUTHORIZED":
                case 3:
                    message.state = 3;
                    break;
                case "MANAGER_STATE_POWERED_OFF":
                case 4:
                    message.state = 4;
                    break;
                case "MANAGER_STATE_POWERED_ON":
                case 5:
                    message.state = 5;
                    break;
                }
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.StateResponse.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                return message;
            };

            /**
             * Creates a plain object from a StateResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.StateResponse
             * @static
             * @param {bleproxy.v1.StateResponse} message StateResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StateResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.state = options.enums === String ? "MANAGER_STATE_UNKNOWN" : 0;
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = options.enums === String ? $root.bleproxy.v1.ManagerState[message.state] === undefined ? message.state : $root.bleproxy.v1.ManagerState[message.state] : message.state;
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                return object;
            };

            /**
             * Converts this StateResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.StateResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StateResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for StateResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.StateResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            StateResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.StateResponse";
            };

            return StateResponse;
        })();

        v1.StartScanRequest = (function() {

            /**
             * Properties of a StartScanRequest.
             * @memberof bleproxy.v1
             * @interface IStartScanRequest
             * @property {Array.<string>|null} [serviceUuids] StartScanRequest serviceUuids
             * @property {Object.<string,string>|null} [options] StartScanRequest options
             */

            /**
             * Constructs a new StartScanRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents a StartScanRequest.
             * @implements IStartScanRequest
             * @constructor
             * @param {bleproxy.v1.IStartScanRequest=} [properties] Properties to set
             */
            function StartScanRequest(properties) {
                this.serviceUuids = [];
                this.options = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * StartScanRequest serviceUuids.
             * @member {Array.<string>} serviceUuids
             * @memberof bleproxy.v1.StartScanRequest
             * @instance
             */
            StartScanRequest.prototype.serviceUuids = $util.emptyArray;

            /**
             * StartScanRequest options.
             * @member {Object.<string,string>} options
             * @memberof bleproxy.v1.StartScanRequest
             * @instance
             */
            StartScanRequest.prototype.options = $util.emptyObject;

            /**
             * Creates a new StartScanRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.StartScanRequest
             * @static
             * @param {bleproxy.v1.IStartScanRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.StartScanRequest} StartScanRequest instance
             */
            StartScanRequest.create = function create(properties) {
                return new StartScanRequest(properties);
            };

            /**
             * Encodes the specified StartScanRequest message. Does not implicitly {@link bleproxy.v1.StartScanRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.StartScanRequest
             * @static
             * @param {bleproxy.v1.IStartScanRequest} message StartScanRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StartScanRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.serviceUuids != null && message.serviceUuids.length)
                    for (var i = 0; i < message.serviceUuids.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.serviceUuids[i]);
                if (message.options != null && Object.hasOwnProperty.call(message, "options"))
                    for (var keys = Object.keys(message.options), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.options[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified StartScanRequest message, length delimited. Does not implicitly {@link bleproxy.v1.StartScanRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.StartScanRequest
             * @static
             * @param {bleproxy.v1.IStartScanRequest} message StartScanRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StartScanRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StartScanRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.StartScanRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.StartScanRequest} StartScanRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StartScanRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.StartScanRequest(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.serviceUuids && message.serviceUuids.length))
                                message.serviceUuids = [];
                            message.serviceUuids.push(reader.string());
                            break;
                        }
                    case 2: {
                            if (message.options === $util.emptyObject)
                                message.options = {};
                            var end2 = reader.uint32() + reader.pos;
                            key = "";
                            value = "";
                            while (reader.pos < end2) {
                                var tag2 = reader.uint32();
                                switch (tag2 >>> 3) {
                                case 1:
                                    key = reader.string();
                                    break;
                                case 2:
                                    value = reader.string();
                                    break;
                                default:
                                    reader.skipType(tag2 & 7);
                                    break;
                                }
                            }
                            message.options[key] = value;
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a StartScanRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.StartScanRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.StartScanRequest} StartScanRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StartScanRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StartScanRequest message.
             * @function verify
             * @memberof bleproxy.v1.StartScanRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StartScanRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.serviceUuids != null && message.hasOwnProperty("serviceUuids")) {
                    if (!Array.isArray(message.serviceUuids))
                        return "serviceUuids: array expected";
                    for (var i = 0; i < message.serviceUuids.length; ++i)
                        if (!$util.isString(message.serviceUuids[i]))
                            return "serviceUuids: string[] expected";
                }
                if (message.options != null && message.hasOwnProperty("options")) {
                    if (!$util.isObject(message.options))
                        return "options: object expected";
                    var key = Object.keys(message.options);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.options[key[i]]))
                            return "options: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a StartScanRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.StartScanRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.StartScanRequest} StartScanRequest
             */
            StartScanRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.StartScanRequest)
                    return object;
                var message = new $root.bleproxy.v1.StartScanRequest();
                if (object.serviceUuids) {
                    if (!Array.isArray(object.serviceUuids))
                        throw TypeError(".bleproxy.v1.StartScanRequest.serviceUuids: array expected");
                    message.serviceUuids = [];
                    for (var i = 0; i < object.serviceUuids.length; ++i)
                        message.serviceUuids[i] = String(object.serviceUuids[i]);
                }
                if (object.options) {
                    if (typeof object.options !== "object")
                        throw TypeError(".bleproxy.v1.StartScanRequest.options: object expected");
                    message.options = {};
                    for (var keys = Object.keys(object.options), i = 0; i < keys.length; ++i)
                        message.options[keys[i]] = String(object.options[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a StartScanRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.StartScanRequest
             * @static
             * @param {bleproxy.v1.StartScanRequest} message StartScanRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StartScanRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.serviceUuids = [];
                if (options.objects || options.defaults)
                    object.options = {};
                if (message.serviceUuids && message.serviceUuids.length) {
                    object.serviceUuids = [];
                    for (var j = 0; j < message.serviceUuids.length; ++j)
                        object.serviceUuids[j] = message.serviceUuids[j];
                }
                var keys2;
                if (message.options && (keys2 = Object.keys(message.options)).length) {
                    object.options = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.options[keys2[j]] = message.options[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this StartScanRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.StartScanRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StartScanRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for StartScanRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.StartScanRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            StartScanRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.StartScanRequest";
            };

            return StartScanRequest;
        })();

        v1.StartScanResponse = (function() {

            /**
             * Properties of a StartScanResponse.
             * @memberof bleproxy.v1
             * @interface IStartScanResponse
             * @property {boolean|null} [success] StartScanResponse success
             * @property {bleproxy.v1.IError|null} [error] StartScanResponse error
             */

            /**
             * Constructs a new StartScanResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents a StartScanResponse.
             * @implements IStartScanResponse
             * @constructor
             * @param {bleproxy.v1.IStartScanResponse=} [properties] Properties to set
             */
            function StartScanResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * StartScanResponse success.
             * @member {boolean} success
             * @memberof bleproxy.v1.StartScanResponse
             * @instance
             */
            StartScanResponse.prototype.success = false;

            /**
             * StartScanResponse error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.StartScanResponse
             * @instance
             */
            StartScanResponse.prototype.error = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * StartScanResponse _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.StartScanResponse
             * @instance
             */
            Object.defineProperty(StartScanResponse.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new StartScanResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.StartScanResponse
             * @static
             * @param {bleproxy.v1.IStartScanResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.StartScanResponse} StartScanResponse instance
             */
            StartScanResponse.create = function create(properties) {
                return new StartScanResponse(properties);
            };

            /**
             * Encodes the specified StartScanResponse message. Does not implicitly {@link bleproxy.v1.StartScanResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.StartScanResponse
             * @static
             * @param {bleproxy.v1.IStartScanResponse} message StartScanResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StartScanResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified StartScanResponse message, length delimited. Does not implicitly {@link bleproxy.v1.StartScanResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.StartScanResponse
             * @static
             * @param {bleproxy.v1.IStartScanResponse} message StartScanResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StartScanResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StartScanResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.StartScanResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.StartScanResponse} StartScanResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StartScanResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.StartScanResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.success = reader.bool();
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a StartScanResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.StartScanResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.StartScanResponse} StartScanResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StartScanResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StartScanResponse message.
             * @function verify
             * @memberof bleproxy.v1.StartScanResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StartScanResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.success != null && message.hasOwnProperty("success"))
                    if (typeof message.success !== "boolean")
                        return "success: boolean expected";
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a StartScanResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.StartScanResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.StartScanResponse} StartScanResponse
             */
            StartScanResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.StartScanResponse)
                    return object;
                var message = new $root.bleproxy.v1.StartScanResponse();
                if (object.success != null)
                    message.success = Boolean(object.success);
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.StartScanResponse.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                return message;
            };

            /**
             * Creates a plain object from a StartScanResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.StartScanResponse
             * @static
             * @param {bleproxy.v1.StartScanResponse} message StartScanResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StartScanResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.success = false;
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                return object;
            };

            /**
             * Converts this StartScanResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.StartScanResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StartScanResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for StartScanResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.StartScanResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            StartScanResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.StartScanResponse";
            };

            return StartScanResponse;
        })();

        v1.StopScanRequest = (function() {

            /**
             * Properties of a StopScanRequest.
             * @memberof bleproxy.v1
             * @interface IStopScanRequest
             */

            /**
             * Constructs a new StopScanRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents a StopScanRequest.
             * @implements IStopScanRequest
             * @constructor
             * @param {bleproxy.v1.IStopScanRequest=} [properties] Properties to set
             */
            function StopScanRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new StopScanRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.StopScanRequest
             * @static
             * @param {bleproxy.v1.IStopScanRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.StopScanRequest} StopScanRequest instance
             */
            StopScanRequest.create = function create(properties) {
                return new StopScanRequest(properties);
            };

            /**
             * Encodes the specified StopScanRequest message. Does not implicitly {@link bleproxy.v1.StopScanRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.StopScanRequest
             * @static
             * @param {bleproxy.v1.IStopScanRequest} message StopScanRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StopScanRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified StopScanRequest message, length delimited. Does not implicitly {@link bleproxy.v1.StopScanRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.StopScanRequest
             * @static
             * @param {bleproxy.v1.IStopScanRequest} message StopScanRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StopScanRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StopScanRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.StopScanRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.StopScanRequest} StopScanRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StopScanRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.StopScanRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a StopScanRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.StopScanRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.StopScanRequest} StopScanRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StopScanRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StopScanRequest message.
             * @function verify
             * @memberof bleproxy.v1.StopScanRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StopScanRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a StopScanRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.StopScanRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.StopScanRequest} StopScanRequest
             */
            StopScanRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.StopScanRequest)
                    return object;
                return new $root.bleproxy.v1.StopScanRequest();
            };

            /**
             * Creates a plain object from a StopScanRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.StopScanRequest
             * @static
             * @param {bleproxy.v1.StopScanRequest} message StopScanRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StopScanRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this StopScanRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.StopScanRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StopScanRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for StopScanRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.StopScanRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            StopScanRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.StopScanRequest";
            };

            return StopScanRequest;
        })();

        v1.StopScanResponse = (function() {

            /**
             * Properties of a StopScanResponse.
             * @memberof bleproxy.v1
             * @interface IStopScanResponse
             * @property {boolean|null} [success] StopScanResponse success
             * @property {bleproxy.v1.IError|null} [error] StopScanResponse error
             */

            /**
             * Constructs a new StopScanResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents a StopScanResponse.
             * @implements IStopScanResponse
             * @constructor
             * @param {bleproxy.v1.IStopScanResponse=} [properties] Properties to set
             */
            function StopScanResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * StopScanResponse success.
             * @member {boolean} success
             * @memberof bleproxy.v1.StopScanResponse
             * @instance
             */
            StopScanResponse.prototype.success = false;

            /**
             * StopScanResponse error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.StopScanResponse
             * @instance
             */
            StopScanResponse.prototype.error = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * StopScanResponse _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.StopScanResponse
             * @instance
             */
            Object.defineProperty(StopScanResponse.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new StopScanResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.StopScanResponse
             * @static
             * @param {bleproxy.v1.IStopScanResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.StopScanResponse} StopScanResponse instance
             */
            StopScanResponse.create = function create(properties) {
                return new StopScanResponse(properties);
            };

            /**
             * Encodes the specified StopScanResponse message. Does not implicitly {@link bleproxy.v1.StopScanResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.StopScanResponse
             * @static
             * @param {bleproxy.v1.IStopScanResponse} message StopScanResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StopScanResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified StopScanResponse message, length delimited. Does not implicitly {@link bleproxy.v1.StopScanResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.StopScanResponse
             * @static
             * @param {bleproxy.v1.IStopScanResponse} message StopScanResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StopScanResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StopScanResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.StopScanResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.StopScanResponse} StopScanResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StopScanResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.StopScanResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.success = reader.bool();
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a StopScanResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.StopScanResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.StopScanResponse} StopScanResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StopScanResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StopScanResponse message.
             * @function verify
             * @memberof bleproxy.v1.StopScanResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StopScanResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.success != null && message.hasOwnProperty("success"))
                    if (typeof message.success !== "boolean")
                        return "success: boolean expected";
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a StopScanResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.StopScanResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.StopScanResponse} StopScanResponse
             */
            StopScanResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.StopScanResponse)
                    return object;
                var message = new $root.bleproxy.v1.StopScanResponse();
                if (object.success != null)
                    message.success = Boolean(object.success);
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.StopScanResponse.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                return message;
            };

            /**
             * Creates a plain object from a StopScanResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.StopScanResponse
             * @static
             * @param {bleproxy.v1.StopScanResponse} message StopScanResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StopScanResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.success = false;
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                return object;
            };

            /**
             * Converts this StopScanResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.StopScanResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StopScanResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for StopScanResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.StopScanResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            StopScanResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.StopScanResponse";
            };

            return StopScanResponse;
        })();

        v1.ConnectRequest = (function() {

            /**
             * Properties of a ConnectRequest.
             * @memberof bleproxy.v1
             * @interface IConnectRequest
             * @property {string|null} [deviceId] ConnectRequest deviceId
             * @property {Object.<string,string>|null} [options] ConnectRequest options
             */

            /**
             * Constructs a new ConnectRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents a ConnectRequest.
             * @implements IConnectRequest
             * @constructor
             * @param {bleproxy.v1.IConnectRequest=} [properties] Properties to set
             */
            function ConnectRequest(properties) {
                this.options = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConnectRequest deviceId.
             * @member {string} deviceId
             * @memberof bleproxy.v1.ConnectRequest
             * @instance
             */
            ConnectRequest.prototype.deviceId = "";

            /**
             * ConnectRequest options.
             * @member {Object.<string,string>} options
             * @memberof bleproxy.v1.ConnectRequest
             * @instance
             */
            ConnectRequest.prototype.options = $util.emptyObject;

            /**
             * Creates a new ConnectRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.ConnectRequest
             * @static
             * @param {bleproxy.v1.IConnectRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.ConnectRequest} ConnectRequest instance
             */
            ConnectRequest.create = function create(properties) {
                return new ConnectRequest(properties);
            };

            /**
             * Encodes the specified ConnectRequest message. Does not implicitly {@link bleproxy.v1.ConnectRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.ConnectRequest
             * @static
             * @param {bleproxy.v1.IConnectRequest} message ConnectRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
                if (message.options != null && Object.hasOwnProperty.call(message, "options"))
                    for (var keys = Object.keys(message.options), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.options[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConnectRequest message, length delimited. Does not implicitly {@link bleproxy.v1.ConnectRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.ConnectRequest
             * @static
             * @param {bleproxy.v1.IConnectRequest} message ConnectRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConnectRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.ConnectRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.ConnectRequest} ConnectRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.ConnectRequest(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.deviceId = reader.string();
                            break;
                        }
                    case 2: {
                            if (message.options === $util.emptyObject)
                                message.options = {};
                            var end2 = reader.uint32() + reader.pos;
                            key = "";
                            value = "";
                            while (reader.pos < end2) {
                                var tag2 = reader.uint32();
                                switch (tag2 >>> 3) {
                                case 1:
                                    key = reader.string();
                                    break;
                                case 2:
                                    value = reader.string();
                                    break;
                                default:
                                    reader.skipType(tag2 & 7);
                                    break;
                                }
                            }
                            message.options[key] = value;
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConnectRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.ConnectRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.ConnectRequest} ConnectRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConnectRequest message.
             * @function verify
             * @memberof bleproxy.v1.ConnectRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConnectRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                if (message.options != null && message.hasOwnProperty("options")) {
                    if (!$util.isObject(message.options))
                        return "options: object expected";
                    var key = Object.keys(message.options);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.options[key[i]]))
                            return "options: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a ConnectRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.ConnectRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.ConnectRequest} ConnectRequest
             */
            ConnectRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.ConnectRequest)
                    return object;
                var message = new $root.bleproxy.v1.ConnectRequest();
                if (object.deviceId != null)
                    message.deviceId = String(object.deviceId);
                if (object.options) {
                    if (typeof object.options !== "object")
                        throw TypeError(".bleproxy.v1.ConnectRequest.options: object expected");
                    message.options = {};
                    for (var keys = Object.keys(object.options), i = 0; i < keys.length; ++i)
                        message.options[keys[i]] = String(object.options[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConnectRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.ConnectRequest
             * @static
             * @param {bleproxy.v1.ConnectRequest} message ConnectRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConnectRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.options = {};
                if (options.defaults)
                    object.deviceId = "";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                var keys2;
                if (message.options && (keys2 = Object.keys(message.options)).length) {
                    object.options = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.options[keys2[j]] = message.options[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this ConnectRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.ConnectRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConnectRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ConnectRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.ConnectRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ConnectRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.ConnectRequest";
            };

            return ConnectRequest;
        })();

        v1.ConnectResponse = (function() {

            /**
             * Properties of a ConnectResponse.
             * @memberof bleproxy.v1
             * @interface IConnectResponse
             * @property {boolean|null} [success] ConnectResponse success
             * @property {bleproxy.v1.IError|null} [error] ConnectResponse error
             * @property {bleproxy.v1.IDevice|null} [device] ConnectResponse device
             */

            /**
             * Constructs a new ConnectResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents a ConnectResponse.
             * @implements IConnectResponse
             * @constructor
             * @param {bleproxy.v1.IConnectResponse=} [properties] Properties to set
             */
            function ConnectResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConnectResponse success.
             * @member {boolean} success
             * @memberof bleproxy.v1.ConnectResponse
             * @instance
             */
            ConnectResponse.prototype.success = false;

            /**
             * ConnectResponse error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.ConnectResponse
             * @instance
             */
            ConnectResponse.prototype.error = null;

            /**
             * ConnectResponse device.
             * @member {bleproxy.v1.IDevice|null|undefined} device
             * @memberof bleproxy.v1.ConnectResponse
             * @instance
             */
            ConnectResponse.prototype.device = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * ConnectResponse _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.ConnectResponse
             * @instance
             */
            Object.defineProperty(ConnectResponse.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * ConnectResponse _device.
             * @member {"device"|undefined} _device
             * @memberof bleproxy.v1.ConnectResponse
             * @instance
             */
            Object.defineProperty(ConnectResponse.prototype, "_device", {
                get: $util.oneOfGetter($oneOfFields = ["device"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ConnectResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.ConnectResponse
             * @static
             * @param {bleproxy.v1.IConnectResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.ConnectResponse} ConnectResponse instance
             */
            ConnectResponse.create = function create(properties) {
                return new ConnectResponse(properties);
            };

            /**
             * Encodes the specified ConnectResponse message. Does not implicitly {@link bleproxy.v1.ConnectResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.ConnectResponse
             * @static
             * @param {bleproxy.v1.IConnectResponse} message ConnectResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.device != null && Object.hasOwnProperty.call(message, "device"))
                    $root.bleproxy.v1.Device.encode(message.device, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ConnectResponse message, length delimited. Does not implicitly {@link bleproxy.v1.ConnectResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.ConnectResponse
             * @static
             * @param {bleproxy.v1.IConnectResponse} message ConnectResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConnectResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.ConnectResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.ConnectResponse} ConnectResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.ConnectResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.success = reader.bool();
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.device = $root.bleproxy.v1.Device.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConnectResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.ConnectResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.ConnectResponse} ConnectResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConnectResponse message.
             * @function verify
             * @memberof bleproxy.v1.ConnectResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConnectResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.success != null && message.hasOwnProperty("success"))
                    if (typeof message.success !== "boolean")
                        return "success: boolean expected";
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                if (message.device != null && message.hasOwnProperty("device")) {
                    properties._device = 1;
                    {
                        var error = $root.bleproxy.v1.Device.verify(message.device);
                        if (error)
                            return "device." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ConnectResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.ConnectResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.ConnectResponse} ConnectResponse
             */
            ConnectResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.ConnectResponse)
                    return object;
                var message = new $root.bleproxy.v1.ConnectResponse();
                if (object.success != null)
                    message.success = Boolean(object.success);
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.ConnectResponse.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                if (object.device != null) {
                    if (typeof object.device !== "object")
                        throw TypeError(".bleproxy.v1.ConnectResponse.device: object expected");
                    message.device = $root.bleproxy.v1.Device.fromObject(object.device);
                }
                return message;
            };

            /**
             * Creates a plain object from a ConnectResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.ConnectResponse
             * @static
             * @param {bleproxy.v1.ConnectResponse} message ConnectResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConnectResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.success = false;
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                if (message.device != null && message.hasOwnProperty("device")) {
                    object.device = $root.bleproxy.v1.Device.toObject(message.device, options);
                    if (options.oneofs)
                        object._device = "device";
                }
                return object;
            };

            /**
             * Converts this ConnectResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.ConnectResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConnectResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ConnectResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.ConnectResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ConnectResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.ConnectResponse";
            };

            return ConnectResponse;
        })();

        v1.DisconnectRequest = (function() {

            /**
             * Properties of a DisconnectRequest.
             * @memberof bleproxy.v1
             * @interface IDisconnectRequest
             * @property {string|null} [deviceId] DisconnectRequest deviceId
             */

            /**
             * Constructs a new DisconnectRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents a DisconnectRequest.
             * @implements IDisconnectRequest
             * @constructor
             * @param {bleproxy.v1.IDisconnectRequest=} [properties] Properties to set
             */
            function DisconnectRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DisconnectRequest deviceId.
             * @member {string} deviceId
             * @memberof bleproxy.v1.DisconnectRequest
             * @instance
             */
            DisconnectRequest.prototype.deviceId = "";

            /**
             * Creates a new DisconnectRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.DisconnectRequest
             * @static
             * @param {bleproxy.v1.IDisconnectRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.DisconnectRequest} DisconnectRequest instance
             */
            DisconnectRequest.create = function create(properties) {
                return new DisconnectRequest(properties);
            };

            /**
             * Encodes the specified DisconnectRequest message. Does not implicitly {@link bleproxy.v1.DisconnectRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.DisconnectRequest
             * @static
             * @param {bleproxy.v1.IDisconnectRequest} message DisconnectRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DisconnectRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
                return writer;
            };

            /**
             * Encodes the specified DisconnectRequest message, length delimited. Does not implicitly {@link bleproxy.v1.DisconnectRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.DisconnectRequest
             * @static
             * @param {bleproxy.v1.IDisconnectRequest} message DisconnectRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DisconnectRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DisconnectRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.DisconnectRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.DisconnectRequest} DisconnectRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DisconnectRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.DisconnectRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.deviceId = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DisconnectRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.DisconnectRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.DisconnectRequest} DisconnectRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DisconnectRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DisconnectRequest message.
             * @function verify
             * @memberof bleproxy.v1.DisconnectRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DisconnectRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                return null;
            };

            /**
             * Creates a DisconnectRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.DisconnectRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.DisconnectRequest} DisconnectRequest
             */
            DisconnectRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.DisconnectRequest)
                    return object;
                var message = new $root.bleproxy.v1.DisconnectRequest();
                if (object.deviceId != null)
                    message.deviceId = String(object.deviceId);
                return message;
            };

            /**
             * Creates a plain object from a DisconnectRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.DisconnectRequest
             * @static
             * @param {bleproxy.v1.DisconnectRequest} message DisconnectRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DisconnectRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.deviceId = "";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                return object;
            };

            /**
             * Converts this DisconnectRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.DisconnectRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DisconnectRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for DisconnectRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.DisconnectRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            DisconnectRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.DisconnectRequest";
            };

            return DisconnectRequest;
        })();

        v1.DisconnectResponse = (function() {

            /**
             * Properties of a DisconnectResponse.
             * @memberof bleproxy.v1
             * @interface IDisconnectResponse
             * @property {boolean|null} [success] DisconnectResponse success
             * @property {bleproxy.v1.IError|null} [error] DisconnectResponse error
             */

            /**
             * Constructs a new DisconnectResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents a DisconnectResponse.
             * @implements IDisconnectResponse
             * @constructor
             * @param {bleproxy.v1.IDisconnectResponse=} [properties] Properties to set
             */
            function DisconnectResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DisconnectResponse success.
             * @member {boolean} success
             * @memberof bleproxy.v1.DisconnectResponse
             * @instance
             */
            DisconnectResponse.prototype.success = false;

            /**
             * DisconnectResponse error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.DisconnectResponse
             * @instance
             */
            DisconnectResponse.prototype.error = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * DisconnectResponse _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.DisconnectResponse
             * @instance
             */
            Object.defineProperty(DisconnectResponse.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new DisconnectResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.DisconnectResponse
             * @static
             * @param {bleproxy.v1.IDisconnectResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.DisconnectResponse} DisconnectResponse instance
             */
            DisconnectResponse.create = function create(properties) {
                return new DisconnectResponse(properties);
            };

            /**
             * Encodes the specified DisconnectResponse message. Does not implicitly {@link bleproxy.v1.DisconnectResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.DisconnectResponse
             * @static
             * @param {bleproxy.v1.IDisconnectResponse} message DisconnectResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DisconnectResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified DisconnectResponse message, length delimited. Does not implicitly {@link bleproxy.v1.DisconnectResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.DisconnectResponse
             * @static
             * @param {bleproxy.v1.IDisconnectResponse} message DisconnectResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DisconnectResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DisconnectResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.DisconnectResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.DisconnectResponse} DisconnectResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DisconnectResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.DisconnectResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.success = reader.bool();
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DisconnectResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.DisconnectResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.DisconnectResponse} DisconnectResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DisconnectResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DisconnectResponse message.
             * @function verify
             * @memberof bleproxy.v1.DisconnectResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DisconnectResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.success != null && message.hasOwnProperty("success"))
                    if (typeof message.success !== "boolean")
                        return "success: boolean expected";
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a DisconnectResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.DisconnectResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.DisconnectResponse} DisconnectResponse
             */
            DisconnectResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.DisconnectResponse)
                    return object;
                var message = new $root.bleproxy.v1.DisconnectResponse();
                if (object.success != null)
                    message.success = Boolean(object.success);
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.DisconnectResponse.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                return message;
            };

            /**
             * Creates a plain object from a DisconnectResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.DisconnectResponse
             * @static
             * @param {bleproxy.v1.DisconnectResponse} message DisconnectResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DisconnectResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.success = false;
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                return object;
            };

            /**
             * Converts this DisconnectResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.DisconnectResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DisconnectResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for DisconnectResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.DisconnectResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            DisconnectResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.DisconnectResponse";
            };

            return DisconnectResponse;
        })();

        v1.IsConnectedRequest = (function() {

            /**
             * Properties of an IsConnectedRequest.
             * @memberof bleproxy.v1
             * @interface IIsConnectedRequest
             * @property {string|null} [deviceId] IsConnectedRequest deviceId
             */

            /**
             * Constructs a new IsConnectedRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents an IsConnectedRequest.
             * @implements IIsConnectedRequest
             * @constructor
             * @param {bleproxy.v1.IIsConnectedRequest=} [properties] Properties to set
             */
            function IsConnectedRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * IsConnectedRequest deviceId.
             * @member {string} deviceId
             * @memberof bleproxy.v1.IsConnectedRequest
             * @instance
             */
            IsConnectedRequest.prototype.deviceId = "";

            /**
             * Creates a new IsConnectedRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.IsConnectedRequest
             * @static
             * @param {bleproxy.v1.IIsConnectedRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.IsConnectedRequest} IsConnectedRequest instance
             */
            IsConnectedRequest.create = function create(properties) {
                return new IsConnectedRequest(properties);
            };

            /**
             * Encodes the specified IsConnectedRequest message. Does not implicitly {@link bleproxy.v1.IsConnectedRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.IsConnectedRequest
             * @static
             * @param {bleproxy.v1.IIsConnectedRequest} message IsConnectedRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IsConnectedRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
                return writer;
            };

            /**
             * Encodes the specified IsConnectedRequest message, length delimited. Does not implicitly {@link bleproxy.v1.IsConnectedRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.IsConnectedRequest
             * @static
             * @param {bleproxy.v1.IIsConnectedRequest} message IsConnectedRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IsConnectedRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an IsConnectedRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.IsConnectedRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.IsConnectedRequest} IsConnectedRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            IsConnectedRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.IsConnectedRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.deviceId = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an IsConnectedRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.IsConnectedRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.IsConnectedRequest} IsConnectedRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            IsConnectedRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an IsConnectedRequest message.
             * @function verify
             * @memberof bleproxy.v1.IsConnectedRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            IsConnectedRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                return null;
            };

            /**
             * Creates an IsConnectedRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.IsConnectedRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.IsConnectedRequest} IsConnectedRequest
             */
            IsConnectedRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.IsConnectedRequest)
                    return object;
                var message = new $root.bleproxy.v1.IsConnectedRequest();
                if (object.deviceId != null)
                    message.deviceId = String(object.deviceId);
                return message;
            };

            /**
             * Creates a plain object from an IsConnectedRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.IsConnectedRequest
             * @static
             * @param {bleproxy.v1.IsConnectedRequest} message IsConnectedRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            IsConnectedRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.deviceId = "";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                return object;
            };

            /**
             * Converts this IsConnectedRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.IsConnectedRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            IsConnectedRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for IsConnectedRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.IsConnectedRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            IsConnectedRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.IsConnectedRequest";
            };

            return IsConnectedRequest;
        })();

        v1.IsConnectedResponse = (function() {

            /**
             * Properties of an IsConnectedResponse.
             * @memberof bleproxy.v1
             * @interface IIsConnectedResponse
             * @property {boolean|null} [isConnected] IsConnectedResponse isConnected
             * @property {bleproxy.v1.IError|null} [error] IsConnectedResponse error
             */

            /**
             * Constructs a new IsConnectedResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents an IsConnectedResponse.
             * @implements IIsConnectedResponse
             * @constructor
             * @param {bleproxy.v1.IIsConnectedResponse=} [properties] Properties to set
             */
            function IsConnectedResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * IsConnectedResponse isConnected.
             * @member {boolean} isConnected
             * @memberof bleproxy.v1.IsConnectedResponse
             * @instance
             */
            IsConnectedResponse.prototype.isConnected = false;

            /**
             * IsConnectedResponse error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.IsConnectedResponse
             * @instance
             */
            IsConnectedResponse.prototype.error = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * IsConnectedResponse _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.IsConnectedResponse
             * @instance
             */
            Object.defineProperty(IsConnectedResponse.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new IsConnectedResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.IsConnectedResponse
             * @static
             * @param {bleproxy.v1.IIsConnectedResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.IsConnectedResponse} IsConnectedResponse instance
             */
            IsConnectedResponse.create = function create(properties) {
                return new IsConnectedResponse(properties);
            };

            /**
             * Encodes the specified IsConnectedResponse message. Does not implicitly {@link bleproxy.v1.IsConnectedResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.IsConnectedResponse
             * @static
             * @param {bleproxy.v1.IIsConnectedResponse} message IsConnectedResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IsConnectedResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.isConnected != null && Object.hasOwnProperty.call(message, "isConnected"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isConnected);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified IsConnectedResponse message, length delimited. Does not implicitly {@link bleproxy.v1.IsConnectedResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.IsConnectedResponse
             * @static
             * @param {bleproxy.v1.IIsConnectedResponse} message IsConnectedResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IsConnectedResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an IsConnectedResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.IsConnectedResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.IsConnectedResponse} IsConnectedResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            IsConnectedResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.IsConnectedResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.isConnected = reader.bool();
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an IsConnectedResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.IsConnectedResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.IsConnectedResponse} IsConnectedResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            IsConnectedResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an IsConnectedResponse message.
             * @function verify
             * @memberof bleproxy.v1.IsConnectedResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            IsConnectedResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.isConnected != null && message.hasOwnProperty("isConnected"))
                    if (typeof message.isConnected !== "boolean")
                        return "isConnected: boolean expected";
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an IsConnectedResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.IsConnectedResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.IsConnectedResponse} IsConnectedResponse
             */
            IsConnectedResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.IsConnectedResponse)
                    return object;
                var message = new $root.bleproxy.v1.IsConnectedResponse();
                if (object.isConnected != null)
                    message.isConnected = Boolean(object.isConnected);
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.IsConnectedResponse.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                return message;
            };

            /**
             * Creates a plain object from an IsConnectedResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.IsConnectedResponse
             * @static
             * @param {bleproxy.v1.IsConnectedResponse} message IsConnectedResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            IsConnectedResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.isConnected = false;
                if (message.isConnected != null && message.hasOwnProperty("isConnected"))
                    object.isConnected = message.isConnected;
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                return object;
            };

            /**
             * Converts this IsConnectedResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.IsConnectedResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            IsConnectedResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for IsConnectedResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.IsConnectedResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            IsConnectedResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.IsConnectedResponse";
            };

            return IsConnectedResponse;
        })();

        v1.DiscoverRequest = (function() {

            /**
             * Properties of a DiscoverRequest.
             * @memberof bleproxy.v1
             * @interface IDiscoverRequest
             * @property {string|null} [deviceId] DiscoverRequest deviceId
             */

            /**
             * Constructs a new DiscoverRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents a DiscoverRequest.
             * @implements IDiscoverRequest
             * @constructor
             * @param {bleproxy.v1.IDiscoverRequest=} [properties] Properties to set
             */
            function DiscoverRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DiscoverRequest deviceId.
             * @member {string} deviceId
             * @memberof bleproxy.v1.DiscoverRequest
             * @instance
             */
            DiscoverRequest.prototype.deviceId = "";

            /**
             * Creates a new DiscoverRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.DiscoverRequest
             * @static
             * @param {bleproxy.v1.IDiscoverRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.DiscoverRequest} DiscoverRequest instance
             */
            DiscoverRequest.create = function create(properties) {
                return new DiscoverRequest(properties);
            };

            /**
             * Encodes the specified DiscoverRequest message. Does not implicitly {@link bleproxy.v1.DiscoverRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.DiscoverRequest
             * @static
             * @param {bleproxy.v1.IDiscoverRequest} message DiscoverRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DiscoverRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
                return writer;
            };

            /**
             * Encodes the specified DiscoverRequest message, length delimited. Does not implicitly {@link bleproxy.v1.DiscoverRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.DiscoverRequest
             * @static
             * @param {bleproxy.v1.IDiscoverRequest} message DiscoverRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DiscoverRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DiscoverRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.DiscoverRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.DiscoverRequest} DiscoverRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DiscoverRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.DiscoverRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.deviceId = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DiscoverRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.DiscoverRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.DiscoverRequest} DiscoverRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DiscoverRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DiscoverRequest message.
             * @function verify
             * @memberof bleproxy.v1.DiscoverRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DiscoverRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                return null;
            };

            /**
             * Creates a DiscoverRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.DiscoverRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.DiscoverRequest} DiscoverRequest
             */
            DiscoverRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.DiscoverRequest)
                    return object;
                var message = new $root.bleproxy.v1.DiscoverRequest();
                if (object.deviceId != null)
                    message.deviceId = String(object.deviceId);
                return message;
            };

            /**
             * Creates a plain object from a DiscoverRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.DiscoverRequest
             * @static
             * @param {bleproxy.v1.DiscoverRequest} message DiscoverRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DiscoverRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.deviceId = "";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                return object;
            };

            /**
             * Converts this DiscoverRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.DiscoverRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DiscoverRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for DiscoverRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.DiscoverRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            DiscoverRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.DiscoverRequest";
            };

            return DiscoverRequest;
        })();

        v1.DiscoverResponse = (function() {

            /**
             * Properties of a DiscoverResponse.
             * @memberof bleproxy.v1
             * @interface IDiscoverResponse
             * @property {Array.<bleproxy.v1.IService>|null} [services] DiscoverResponse services
             * @property {bleproxy.v1.IError|null} [error] DiscoverResponse error
             */

            /**
             * Constructs a new DiscoverResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents a DiscoverResponse.
             * @implements IDiscoverResponse
             * @constructor
             * @param {bleproxy.v1.IDiscoverResponse=} [properties] Properties to set
             */
            function DiscoverResponse(properties) {
                this.services = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DiscoverResponse services.
             * @member {Array.<bleproxy.v1.IService>} services
             * @memberof bleproxy.v1.DiscoverResponse
             * @instance
             */
            DiscoverResponse.prototype.services = $util.emptyArray;

            /**
             * DiscoverResponse error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.DiscoverResponse
             * @instance
             */
            DiscoverResponse.prototype.error = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * DiscoverResponse _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.DiscoverResponse
             * @instance
             */
            Object.defineProperty(DiscoverResponse.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new DiscoverResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.DiscoverResponse
             * @static
             * @param {bleproxy.v1.IDiscoverResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.DiscoverResponse} DiscoverResponse instance
             */
            DiscoverResponse.create = function create(properties) {
                return new DiscoverResponse(properties);
            };

            /**
             * Encodes the specified DiscoverResponse message. Does not implicitly {@link bleproxy.v1.DiscoverResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.DiscoverResponse
             * @static
             * @param {bleproxy.v1.IDiscoverResponse} message DiscoverResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DiscoverResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.services != null && message.services.length)
                    for (var i = 0; i < message.services.length; ++i)
                        $root.bleproxy.v1.Service.encode(message.services[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified DiscoverResponse message, length delimited. Does not implicitly {@link bleproxy.v1.DiscoverResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.DiscoverResponse
             * @static
             * @param {bleproxy.v1.IDiscoverResponse} message DiscoverResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DiscoverResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DiscoverResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.DiscoverResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.DiscoverResponse} DiscoverResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DiscoverResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.DiscoverResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.services && message.services.length))
                                message.services = [];
                            message.services.push($root.bleproxy.v1.Service.decode(reader, reader.uint32()));
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DiscoverResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.DiscoverResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.DiscoverResponse} DiscoverResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DiscoverResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DiscoverResponse message.
             * @function verify
             * @memberof bleproxy.v1.DiscoverResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DiscoverResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.services != null && message.hasOwnProperty("services")) {
                    if (!Array.isArray(message.services))
                        return "services: array expected";
                    for (var i = 0; i < message.services.length; ++i) {
                        var error = $root.bleproxy.v1.Service.verify(message.services[i]);
                        if (error)
                            return "services." + error;
                    }
                }
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a DiscoverResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.DiscoverResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.DiscoverResponse} DiscoverResponse
             */
            DiscoverResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.DiscoverResponse)
                    return object;
                var message = new $root.bleproxy.v1.DiscoverResponse();
                if (object.services) {
                    if (!Array.isArray(object.services))
                        throw TypeError(".bleproxy.v1.DiscoverResponse.services: array expected");
                    message.services = [];
                    for (var i = 0; i < object.services.length; ++i) {
                        if (typeof object.services[i] !== "object")
                            throw TypeError(".bleproxy.v1.DiscoverResponse.services: object expected");
                        message.services[i] = $root.bleproxy.v1.Service.fromObject(object.services[i]);
                    }
                }
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.DiscoverResponse.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                return message;
            };

            /**
             * Creates a plain object from a DiscoverResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.DiscoverResponse
             * @static
             * @param {bleproxy.v1.DiscoverResponse} message DiscoverResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DiscoverResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.services = [];
                if (message.services && message.services.length) {
                    object.services = [];
                    for (var j = 0; j < message.services.length; ++j)
                        object.services[j] = $root.bleproxy.v1.Service.toObject(message.services[j], options);
                }
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                return object;
            };

            /**
             * Converts this DiscoverResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.DiscoverResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DiscoverResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for DiscoverResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.DiscoverResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            DiscoverResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.DiscoverResponse";
            };

            return DiscoverResponse;
        })();

        v1.ServicesRequest = (function() {

            /**
             * Properties of a ServicesRequest.
             * @memberof bleproxy.v1
             * @interface IServicesRequest
             * @property {string|null} [deviceId] ServicesRequest deviceId
             */

            /**
             * Constructs a new ServicesRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents a ServicesRequest.
             * @implements IServicesRequest
             * @constructor
             * @param {bleproxy.v1.IServicesRequest=} [properties] Properties to set
             */
            function ServicesRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServicesRequest deviceId.
             * @member {string} deviceId
             * @memberof bleproxy.v1.ServicesRequest
             * @instance
             */
            ServicesRequest.prototype.deviceId = "";

            /**
             * Creates a new ServicesRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.ServicesRequest
             * @static
             * @param {bleproxy.v1.IServicesRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.ServicesRequest} ServicesRequest instance
             */
            ServicesRequest.create = function create(properties) {
                return new ServicesRequest(properties);
            };

            /**
             * Encodes the specified ServicesRequest message. Does not implicitly {@link bleproxy.v1.ServicesRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.ServicesRequest
             * @static
             * @param {bleproxy.v1.IServicesRequest} message ServicesRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServicesRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
                return writer;
            };

            /**
             * Encodes the specified ServicesRequest message, length delimited. Does not implicitly {@link bleproxy.v1.ServicesRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.ServicesRequest
             * @static
             * @param {bleproxy.v1.IServicesRequest} message ServicesRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServicesRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServicesRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.ServicesRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.ServicesRequest} ServicesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServicesRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.ServicesRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.deviceId = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ServicesRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.ServicesRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.ServicesRequest} ServicesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServicesRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ServicesRequest message.
             * @function verify
             * @memberof bleproxy.v1.ServicesRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ServicesRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                return null;
            };

            /**
             * Creates a ServicesRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.ServicesRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.ServicesRequest} ServicesRequest
             */
            ServicesRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.ServicesRequest)
                    return object;
                var message = new $root.bleproxy.v1.ServicesRequest();
                if (object.deviceId != null)
                    message.deviceId = String(object.deviceId);
                return message;
            };

            /**
             * Creates a plain object from a ServicesRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.ServicesRequest
             * @static
             * @param {bleproxy.v1.ServicesRequest} message ServicesRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServicesRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.deviceId = "";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                return object;
            };

            /**
             * Converts this ServicesRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.ServicesRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServicesRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ServicesRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.ServicesRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ServicesRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.ServicesRequest";
            };

            return ServicesRequest;
        })();

        v1.ServicesResponse = (function() {

            /**
             * Properties of a ServicesResponse.
             * @memberof bleproxy.v1
             * @interface IServicesResponse
             * @property {Array.<bleproxy.v1.IService>|null} [services] ServicesResponse services
             * @property {bleproxy.v1.IError|null} [error] ServicesResponse error
             */

            /**
             * Constructs a new ServicesResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents a ServicesResponse.
             * @implements IServicesResponse
             * @constructor
             * @param {bleproxy.v1.IServicesResponse=} [properties] Properties to set
             */
            function ServicesResponse(properties) {
                this.services = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServicesResponse services.
             * @member {Array.<bleproxy.v1.IService>} services
             * @memberof bleproxy.v1.ServicesResponse
             * @instance
             */
            ServicesResponse.prototype.services = $util.emptyArray;

            /**
             * ServicesResponse error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.ServicesResponse
             * @instance
             */
            ServicesResponse.prototype.error = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * ServicesResponse _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.ServicesResponse
             * @instance
             */
            Object.defineProperty(ServicesResponse.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ServicesResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.ServicesResponse
             * @static
             * @param {bleproxy.v1.IServicesResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.ServicesResponse} ServicesResponse instance
             */
            ServicesResponse.create = function create(properties) {
                return new ServicesResponse(properties);
            };

            /**
             * Encodes the specified ServicesResponse message. Does not implicitly {@link bleproxy.v1.ServicesResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.ServicesResponse
             * @static
             * @param {bleproxy.v1.IServicesResponse} message ServicesResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServicesResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.services != null && message.services.length)
                    for (var i = 0; i < message.services.length; ++i)
                        $root.bleproxy.v1.Service.encode(message.services[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ServicesResponse message, length delimited. Does not implicitly {@link bleproxy.v1.ServicesResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.ServicesResponse
             * @static
             * @param {bleproxy.v1.IServicesResponse} message ServicesResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServicesResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServicesResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.ServicesResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.ServicesResponse} ServicesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServicesResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.ServicesResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.services && message.services.length))
                                message.services = [];
                            message.services.push($root.bleproxy.v1.Service.decode(reader, reader.uint32()));
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ServicesResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.ServicesResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.ServicesResponse} ServicesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServicesResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ServicesResponse message.
             * @function verify
             * @memberof bleproxy.v1.ServicesResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ServicesResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.services != null && message.hasOwnProperty("services")) {
                    if (!Array.isArray(message.services))
                        return "services: array expected";
                    for (var i = 0; i < message.services.length; ++i) {
                        var error = $root.bleproxy.v1.Service.verify(message.services[i]);
                        if (error)
                            return "services." + error;
                    }
                }
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ServicesResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.ServicesResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.ServicesResponse} ServicesResponse
             */
            ServicesResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.ServicesResponse)
                    return object;
                var message = new $root.bleproxy.v1.ServicesResponse();
                if (object.services) {
                    if (!Array.isArray(object.services))
                        throw TypeError(".bleproxy.v1.ServicesResponse.services: array expected");
                    message.services = [];
                    for (var i = 0; i < object.services.length; ++i) {
                        if (typeof object.services[i] !== "object")
                            throw TypeError(".bleproxy.v1.ServicesResponse.services: object expected");
                        message.services[i] = $root.bleproxy.v1.Service.fromObject(object.services[i]);
                    }
                }
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.ServicesResponse.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                return message;
            };

            /**
             * Creates a plain object from a ServicesResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.ServicesResponse
             * @static
             * @param {bleproxy.v1.ServicesResponse} message ServicesResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServicesResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.services = [];
                if (message.services && message.services.length) {
                    object.services = [];
                    for (var j = 0; j < message.services.length; ++j)
                        object.services[j] = $root.bleproxy.v1.Service.toObject(message.services[j], options);
                }
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                return object;
            };

            /**
             * Converts this ServicesResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.ServicesResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServicesResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ServicesResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.ServicesResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ServicesResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.ServicesResponse";
            };

            return ServicesResponse;
        })();

        v1.CharacteristicsRequest = (function() {

            /**
             * Properties of a CharacteristicsRequest.
             * @memberof bleproxy.v1
             * @interface ICharacteristicsRequest
             * @property {string|null} [deviceId] CharacteristicsRequest deviceId
             * @property {string|null} [serviceUuid] CharacteristicsRequest serviceUuid
             */

            /**
             * Constructs a new CharacteristicsRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents a CharacteristicsRequest.
             * @implements ICharacteristicsRequest
             * @constructor
             * @param {bleproxy.v1.ICharacteristicsRequest=} [properties] Properties to set
             */
            function CharacteristicsRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CharacteristicsRequest deviceId.
             * @member {string} deviceId
             * @memberof bleproxy.v1.CharacteristicsRequest
             * @instance
             */
            CharacteristicsRequest.prototype.deviceId = "";

            /**
             * CharacteristicsRequest serviceUuid.
             * @member {string} serviceUuid
             * @memberof bleproxy.v1.CharacteristicsRequest
             * @instance
             */
            CharacteristicsRequest.prototype.serviceUuid = "";

            /**
             * Creates a new CharacteristicsRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.CharacteristicsRequest
             * @static
             * @param {bleproxy.v1.ICharacteristicsRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.CharacteristicsRequest} CharacteristicsRequest instance
             */
            CharacteristicsRequest.create = function create(properties) {
                return new CharacteristicsRequest(properties);
            };

            /**
             * Encodes the specified CharacteristicsRequest message. Does not implicitly {@link bleproxy.v1.CharacteristicsRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.CharacteristicsRequest
             * @static
             * @param {bleproxy.v1.ICharacteristicsRequest} message CharacteristicsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CharacteristicsRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
                if (message.serviceUuid != null && Object.hasOwnProperty.call(message, "serviceUuid"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.serviceUuid);
                return writer;
            };

            /**
             * Encodes the specified CharacteristicsRequest message, length delimited. Does not implicitly {@link bleproxy.v1.CharacteristicsRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.CharacteristicsRequest
             * @static
             * @param {bleproxy.v1.ICharacteristicsRequest} message CharacteristicsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CharacteristicsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CharacteristicsRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.CharacteristicsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.CharacteristicsRequest} CharacteristicsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CharacteristicsRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.CharacteristicsRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.deviceId = reader.string();
                            break;
                        }
                    case 2: {
                            message.serviceUuid = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CharacteristicsRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.CharacteristicsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.CharacteristicsRequest} CharacteristicsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CharacteristicsRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CharacteristicsRequest message.
             * @function verify
             * @memberof bleproxy.v1.CharacteristicsRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CharacteristicsRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                if (message.serviceUuid != null && message.hasOwnProperty("serviceUuid"))
                    if (!$util.isString(message.serviceUuid))
                        return "serviceUuid: string expected";
                return null;
            };

            /**
             * Creates a CharacteristicsRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.CharacteristicsRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.CharacteristicsRequest} CharacteristicsRequest
             */
            CharacteristicsRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.CharacteristicsRequest)
                    return object;
                var message = new $root.bleproxy.v1.CharacteristicsRequest();
                if (object.deviceId != null)
                    message.deviceId = String(object.deviceId);
                if (object.serviceUuid != null)
                    message.serviceUuid = String(object.serviceUuid);
                return message;
            };

            /**
             * Creates a plain object from a CharacteristicsRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.CharacteristicsRequest
             * @static
             * @param {bleproxy.v1.CharacteristicsRequest} message CharacteristicsRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CharacteristicsRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.deviceId = "";
                    object.serviceUuid = "";
                }
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                if (message.serviceUuid != null && message.hasOwnProperty("serviceUuid"))
                    object.serviceUuid = message.serviceUuid;
                return object;
            };

            /**
             * Converts this CharacteristicsRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.CharacteristicsRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CharacteristicsRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for CharacteristicsRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.CharacteristicsRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            CharacteristicsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.CharacteristicsRequest";
            };

            return CharacteristicsRequest;
        })();

        v1.CharacteristicsResponse = (function() {

            /**
             * Properties of a CharacteristicsResponse.
             * @memberof bleproxy.v1
             * @interface ICharacteristicsResponse
             * @property {Array.<bleproxy.v1.ICharacteristic>|null} [characteristics] CharacteristicsResponse characteristics
             * @property {bleproxy.v1.IError|null} [error] CharacteristicsResponse error
             */

            /**
             * Constructs a new CharacteristicsResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents a CharacteristicsResponse.
             * @implements ICharacteristicsResponse
             * @constructor
             * @param {bleproxy.v1.ICharacteristicsResponse=} [properties] Properties to set
             */
            function CharacteristicsResponse(properties) {
                this.characteristics = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CharacteristicsResponse characteristics.
             * @member {Array.<bleproxy.v1.ICharacteristic>} characteristics
             * @memberof bleproxy.v1.CharacteristicsResponse
             * @instance
             */
            CharacteristicsResponse.prototype.characteristics = $util.emptyArray;

            /**
             * CharacteristicsResponse error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.CharacteristicsResponse
             * @instance
             */
            CharacteristicsResponse.prototype.error = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * CharacteristicsResponse _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.CharacteristicsResponse
             * @instance
             */
            Object.defineProperty(CharacteristicsResponse.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new CharacteristicsResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.CharacteristicsResponse
             * @static
             * @param {bleproxy.v1.ICharacteristicsResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.CharacteristicsResponse} CharacteristicsResponse instance
             */
            CharacteristicsResponse.create = function create(properties) {
                return new CharacteristicsResponse(properties);
            };

            /**
             * Encodes the specified CharacteristicsResponse message. Does not implicitly {@link bleproxy.v1.CharacteristicsResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.CharacteristicsResponse
             * @static
             * @param {bleproxy.v1.ICharacteristicsResponse} message CharacteristicsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CharacteristicsResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.characteristics != null && message.characteristics.length)
                    for (var i = 0; i < message.characteristics.length; ++i)
                        $root.bleproxy.v1.Characteristic.encode(message.characteristics[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified CharacteristicsResponse message, length delimited. Does not implicitly {@link bleproxy.v1.CharacteristicsResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.CharacteristicsResponse
             * @static
             * @param {bleproxy.v1.ICharacteristicsResponse} message CharacteristicsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CharacteristicsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CharacteristicsResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.CharacteristicsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.CharacteristicsResponse} CharacteristicsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CharacteristicsResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.CharacteristicsResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.characteristics && message.characteristics.length))
                                message.characteristics = [];
                            message.characteristics.push($root.bleproxy.v1.Characteristic.decode(reader, reader.uint32()));
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CharacteristicsResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.CharacteristicsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.CharacteristicsResponse} CharacteristicsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CharacteristicsResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CharacteristicsResponse message.
             * @function verify
             * @memberof bleproxy.v1.CharacteristicsResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CharacteristicsResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.characteristics != null && message.hasOwnProperty("characteristics")) {
                    if (!Array.isArray(message.characteristics))
                        return "characteristics: array expected";
                    for (var i = 0; i < message.characteristics.length; ++i) {
                        var error = $root.bleproxy.v1.Characteristic.verify(message.characteristics[i]);
                        if (error)
                            return "characteristics." + error;
                    }
                }
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a CharacteristicsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.CharacteristicsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.CharacteristicsResponse} CharacteristicsResponse
             */
            CharacteristicsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.CharacteristicsResponse)
                    return object;
                var message = new $root.bleproxy.v1.CharacteristicsResponse();
                if (object.characteristics) {
                    if (!Array.isArray(object.characteristics))
                        throw TypeError(".bleproxy.v1.CharacteristicsResponse.characteristics: array expected");
                    message.characteristics = [];
                    for (var i = 0; i < object.characteristics.length; ++i) {
                        if (typeof object.characteristics[i] !== "object")
                            throw TypeError(".bleproxy.v1.CharacteristicsResponse.characteristics: object expected");
                        message.characteristics[i] = $root.bleproxy.v1.Characteristic.fromObject(object.characteristics[i]);
                    }
                }
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.CharacteristicsResponse.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                return message;
            };

            /**
             * Creates a plain object from a CharacteristicsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.CharacteristicsResponse
             * @static
             * @param {bleproxy.v1.CharacteristicsResponse} message CharacteristicsResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CharacteristicsResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.characteristics = [];
                if (message.characteristics && message.characteristics.length) {
                    object.characteristics = [];
                    for (var j = 0; j < message.characteristics.length; ++j)
                        object.characteristics[j] = $root.bleproxy.v1.Characteristic.toObject(message.characteristics[j], options);
                }
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                return object;
            };

            /**
             * Converts this CharacteristicsResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.CharacteristicsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CharacteristicsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for CharacteristicsResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.CharacteristicsResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            CharacteristicsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.CharacteristicsResponse";
            };

            return CharacteristicsResponse;
        })();

        v1.ReadRequest = (function() {

            /**
             * Properties of a ReadRequest.
             * @memberof bleproxy.v1
             * @interface IReadRequest
             * @property {string|null} [deviceId] ReadRequest deviceId
             * @property {string|null} [serviceUuid] ReadRequest serviceUuid
             * @property {string|null} [characteristicUuid] ReadRequest characteristicUuid
             */

            /**
             * Constructs a new ReadRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents a ReadRequest.
             * @implements IReadRequest
             * @constructor
             * @param {bleproxy.v1.IReadRequest=} [properties] Properties to set
             */
            function ReadRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ReadRequest deviceId.
             * @member {string} deviceId
             * @memberof bleproxy.v1.ReadRequest
             * @instance
             */
            ReadRequest.prototype.deviceId = "";

            /**
             * ReadRequest serviceUuid.
             * @member {string} serviceUuid
             * @memberof bleproxy.v1.ReadRequest
             * @instance
             */
            ReadRequest.prototype.serviceUuid = "";

            /**
             * ReadRequest characteristicUuid.
             * @member {string} characteristicUuid
             * @memberof bleproxy.v1.ReadRequest
             * @instance
             */
            ReadRequest.prototype.characteristicUuid = "";

            /**
             * Creates a new ReadRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.ReadRequest
             * @static
             * @param {bleproxy.v1.IReadRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.ReadRequest} ReadRequest instance
             */
            ReadRequest.create = function create(properties) {
                return new ReadRequest(properties);
            };

            /**
             * Encodes the specified ReadRequest message. Does not implicitly {@link bleproxy.v1.ReadRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.ReadRequest
             * @static
             * @param {bleproxy.v1.IReadRequest} message ReadRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReadRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
                if (message.serviceUuid != null && Object.hasOwnProperty.call(message, "serviceUuid"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.serviceUuid);
                if (message.characteristicUuid != null && Object.hasOwnProperty.call(message, "characteristicUuid"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.characteristicUuid);
                return writer;
            };

            /**
             * Encodes the specified ReadRequest message, length delimited. Does not implicitly {@link bleproxy.v1.ReadRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.ReadRequest
             * @static
             * @param {bleproxy.v1.IReadRequest} message ReadRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReadRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ReadRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.ReadRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.ReadRequest} ReadRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReadRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.ReadRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.deviceId = reader.string();
                            break;
                        }
                    case 2: {
                            message.serviceUuid = reader.string();
                            break;
                        }
                    case 3: {
                            message.characteristicUuid = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ReadRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.ReadRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.ReadRequest} ReadRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReadRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ReadRequest message.
             * @function verify
             * @memberof bleproxy.v1.ReadRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReadRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                if (message.serviceUuid != null && message.hasOwnProperty("serviceUuid"))
                    if (!$util.isString(message.serviceUuid))
                        return "serviceUuid: string expected";
                if (message.characteristicUuid != null && message.hasOwnProperty("characteristicUuid"))
                    if (!$util.isString(message.characteristicUuid))
                        return "characteristicUuid: string expected";
                return null;
            };

            /**
             * Creates a ReadRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.ReadRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.ReadRequest} ReadRequest
             */
            ReadRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.ReadRequest)
                    return object;
                var message = new $root.bleproxy.v1.ReadRequest();
                if (object.deviceId != null)
                    message.deviceId = String(object.deviceId);
                if (object.serviceUuid != null)
                    message.serviceUuid = String(object.serviceUuid);
                if (object.characteristicUuid != null)
                    message.characteristicUuid = String(object.characteristicUuid);
                return message;
            };

            /**
             * Creates a plain object from a ReadRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.ReadRequest
             * @static
             * @param {bleproxy.v1.ReadRequest} message ReadRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReadRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.deviceId = "";
                    object.serviceUuid = "";
                    object.characteristicUuid = "";
                }
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                if (message.serviceUuid != null && message.hasOwnProperty("serviceUuid"))
                    object.serviceUuid = message.serviceUuid;
                if (message.characteristicUuid != null && message.hasOwnProperty("characteristicUuid"))
                    object.characteristicUuid = message.characteristicUuid;
                return object;
            };

            /**
             * Converts this ReadRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.ReadRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReadRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ReadRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.ReadRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReadRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.ReadRequest";
            };

            return ReadRequest;
        })();

        v1.ReadResponse = (function() {

            /**
             * Properties of a ReadResponse.
             * @memberof bleproxy.v1
             * @interface IReadResponse
             * @property {Uint8Array|null} [value] ReadResponse value
             * @property {bleproxy.v1.IError|null} [error] ReadResponse error
             */

            /**
             * Constructs a new ReadResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents a ReadResponse.
             * @implements IReadResponse
             * @constructor
             * @param {bleproxy.v1.IReadResponse=} [properties] Properties to set
             */
            function ReadResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ReadResponse value.
             * @member {Uint8Array} value
             * @memberof bleproxy.v1.ReadResponse
             * @instance
             */
            ReadResponse.prototype.value = $util.newBuffer([]);

            /**
             * ReadResponse error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.ReadResponse
             * @instance
             */
            ReadResponse.prototype.error = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * ReadResponse _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.ReadResponse
             * @instance
             */
            Object.defineProperty(ReadResponse.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ReadResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.ReadResponse
             * @static
             * @param {bleproxy.v1.IReadResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.ReadResponse} ReadResponse instance
             */
            ReadResponse.create = function create(properties) {
                return new ReadResponse(properties);
            };

            /**
             * Encodes the specified ReadResponse message. Does not implicitly {@link bleproxy.v1.ReadResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.ReadResponse
             * @static
             * @param {bleproxy.v1.IReadResponse} message ReadResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReadResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.value);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ReadResponse message, length delimited. Does not implicitly {@link bleproxy.v1.ReadResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.ReadResponse
             * @static
             * @param {bleproxy.v1.IReadResponse} message ReadResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReadResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ReadResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.ReadResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.ReadResponse} ReadResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReadResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.ReadResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.value = reader.bytes();
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ReadResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.ReadResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.ReadResponse} ReadResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReadResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ReadResponse message.
             * @function verify
             * @memberof bleproxy.v1.ReadResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReadResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ReadResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.ReadResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.ReadResponse} ReadResponse
             */
            ReadResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.ReadResponse)
                    return object;
                var message = new $root.bleproxy.v1.ReadResponse();
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length >= 0)
                        message.value = object.value;
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.ReadResponse.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                return message;
            };

            /**
             * Creates a plain object from a ReadResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.ReadResponse
             * @static
             * @param {bleproxy.v1.ReadResponse} message ReadResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReadResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                return object;
            };

            /**
             * Converts this ReadResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.ReadResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReadResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ReadResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.ReadResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReadResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.ReadResponse";
            };

            return ReadResponse;
        })();

        v1.WriteRequest = (function() {

            /**
             * Properties of a WriteRequest.
             * @memberof bleproxy.v1
             * @interface IWriteRequest
             * @property {string|null} [deviceId] WriteRequest deviceId
             * @property {string|null} [serviceUuid] WriteRequest serviceUuid
             * @property {string|null} [characteristicUuid] WriteRequest characteristicUuid
             * @property {Uint8Array|null} [value] WriteRequest value
             * @property {boolean|null} [withResponse] WriteRequest withResponse
             */

            /**
             * Constructs a new WriteRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents a WriteRequest.
             * @implements IWriteRequest
             * @constructor
             * @param {bleproxy.v1.IWriteRequest=} [properties] Properties to set
             */
            function WriteRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * WriteRequest deviceId.
             * @member {string} deviceId
             * @memberof bleproxy.v1.WriteRequest
             * @instance
             */
            WriteRequest.prototype.deviceId = "";

            /**
             * WriteRequest serviceUuid.
             * @member {string} serviceUuid
             * @memberof bleproxy.v1.WriteRequest
             * @instance
             */
            WriteRequest.prototype.serviceUuid = "";

            /**
             * WriteRequest characteristicUuid.
             * @member {string} characteristicUuid
             * @memberof bleproxy.v1.WriteRequest
             * @instance
             */
            WriteRequest.prototype.characteristicUuid = "";

            /**
             * WriteRequest value.
             * @member {Uint8Array} value
             * @memberof bleproxy.v1.WriteRequest
             * @instance
             */
            WriteRequest.prototype.value = $util.newBuffer([]);

            /**
             * WriteRequest withResponse.
             * @member {boolean} withResponse
             * @memberof bleproxy.v1.WriteRequest
             * @instance
             */
            WriteRequest.prototype.withResponse = false;

            /**
             * Creates a new WriteRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.WriteRequest
             * @static
             * @param {bleproxy.v1.IWriteRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.WriteRequest} WriteRequest instance
             */
            WriteRequest.create = function create(properties) {
                return new WriteRequest(properties);
            };

            /**
             * Encodes the specified WriteRequest message. Does not implicitly {@link bleproxy.v1.WriteRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.WriteRequest
             * @static
             * @param {bleproxy.v1.IWriteRequest} message WriteRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WriteRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
                if (message.serviceUuid != null && Object.hasOwnProperty.call(message, "serviceUuid"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.serviceUuid);
                if (message.characteristicUuid != null && Object.hasOwnProperty.call(message, "characteristicUuid"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.characteristicUuid);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.value);
                if (message.withResponse != null && Object.hasOwnProperty.call(message, "withResponse"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.withResponse);
                return writer;
            };

            /**
             * Encodes the specified WriteRequest message, length delimited. Does not implicitly {@link bleproxy.v1.WriteRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.WriteRequest
             * @static
             * @param {bleproxy.v1.IWriteRequest} message WriteRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WriteRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a WriteRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.WriteRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.WriteRequest} WriteRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WriteRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.WriteRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.deviceId = reader.string();
                            break;
                        }
                    case 2: {
                            message.serviceUuid = reader.string();
                            break;
                        }
                    case 3: {
                            message.characteristicUuid = reader.string();
                            break;
                        }
                    case 4: {
                            message.value = reader.bytes();
                            break;
                        }
                    case 5: {
                            message.withResponse = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a WriteRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.WriteRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.WriteRequest} WriteRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WriteRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a WriteRequest message.
             * @function verify
             * @memberof bleproxy.v1.WriteRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WriteRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                if (message.serviceUuid != null && message.hasOwnProperty("serviceUuid"))
                    if (!$util.isString(message.serviceUuid))
                        return "serviceUuid: string expected";
                if (message.characteristicUuid != null && message.hasOwnProperty("characteristicUuid"))
                    if (!$util.isString(message.characteristicUuid))
                        return "characteristicUuid: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                if (message.withResponse != null && message.hasOwnProperty("withResponse"))
                    if (typeof message.withResponse !== "boolean")
                        return "withResponse: boolean expected";
                return null;
            };

            /**
             * Creates a WriteRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.WriteRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.WriteRequest} WriteRequest
             */
            WriteRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.WriteRequest)
                    return object;
                var message = new $root.bleproxy.v1.WriteRequest();
                if (object.deviceId != null)
                    message.deviceId = String(object.deviceId);
                if (object.serviceUuid != null)
                    message.serviceUuid = String(object.serviceUuid);
                if (object.characteristicUuid != null)
                    message.characteristicUuid = String(object.characteristicUuid);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length >= 0)
                        message.value = object.value;
                if (object.withResponse != null)
                    message.withResponse = Boolean(object.withResponse);
                return message;
            };

            /**
             * Creates a plain object from a WriteRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.WriteRequest
             * @static
             * @param {bleproxy.v1.WriteRequest} message WriteRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WriteRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.deviceId = "";
                    object.serviceUuid = "";
                    object.characteristicUuid = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                    object.withResponse = false;
                }
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                if (message.serviceUuid != null && message.hasOwnProperty("serviceUuid"))
                    object.serviceUuid = message.serviceUuid;
                if (message.characteristicUuid != null && message.hasOwnProperty("characteristicUuid"))
                    object.characteristicUuid = message.characteristicUuid;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                if (message.withResponse != null && message.hasOwnProperty("withResponse"))
                    object.withResponse = message.withResponse;
                return object;
            };

            /**
             * Converts this WriteRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.WriteRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WriteRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for WriteRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.WriteRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            WriteRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.WriteRequest";
            };

            return WriteRequest;
        })();

        v1.WriteResponse = (function() {

            /**
             * Properties of a WriteResponse.
             * @memberof bleproxy.v1
             * @interface IWriteResponse
             * @property {boolean|null} [success] WriteResponse success
             * @property {bleproxy.v1.IError|null} [error] WriteResponse error
             */

            /**
             * Constructs a new WriteResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents a WriteResponse.
             * @implements IWriteResponse
             * @constructor
             * @param {bleproxy.v1.IWriteResponse=} [properties] Properties to set
             */
            function WriteResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * WriteResponse success.
             * @member {boolean} success
             * @memberof bleproxy.v1.WriteResponse
             * @instance
             */
            WriteResponse.prototype.success = false;

            /**
             * WriteResponse error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.WriteResponse
             * @instance
             */
            WriteResponse.prototype.error = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * WriteResponse _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.WriteResponse
             * @instance
             */
            Object.defineProperty(WriteResponse.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new WriteResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.WriteResponse
             * @static
             * @param {bleproxy.v1.IWriteResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.WriteResponse} WriteResponse instance
             */
            WriteResponse.create = function create(properties) {
                return new WriteResponse(properties);
            };

            /**
             * Encodes the specified WriteResponse message. Does not implicitly {@link bleproxy.v1.WriteResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.WriteResponse
             * @static
             * @param {bleproxy.v1.IWriteResponse} message WriteResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WriteResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified WriteResponse message, length delimited. Does not implicitly {@link bleproxy.v1.WriteResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.WriteResponse
             * @static
             * @param {bleproxy.v1.IWriteResponse} message WriteResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WriteResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a WriteResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.WriteResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.WriteResponse} WriteResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WriteResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.WriteResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.success = reader.bool();
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a WriteResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.WriteResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.WriteResponse} WriteResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WriteResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a WriteResponse message.
             * @function verify
             * @memberof bleproxy.v1.WriteResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WriteResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.success != null && message.hasOwnProperty("success"))
                    if (typeof message.success !== "boolean")
                        return "success: boolean expected";
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a WriteResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.WriteResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.WriteResponse} WriteResponse
             */
            WriteResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.WriteResponse)
                    return object;
                var message = new $root.bleproxy.v1.WriteResponse();
                if (object.success != null)
                    message.success = Boolean(object.success);
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.WriteResponse.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                return message;
            };

            /**
             * Creates a plain object from a WriteResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.WriteResponse
             * @static
             * @param {bleproxy.v1.WriteResponse} message WriteResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WriteResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.success = false;
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                return object;
            };

            /**
             * Converts this WriteResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.WriteResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WriteResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for WriteResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.WriteResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            WriteResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.WriteResponse";
            };

            return WriteResponse;
        })();

        v1.MonitorRequest = (function() {

            /**
             * Properties of a MonitorRequest.
             * @memberof bleproxy.v1
             * @interface IMonitorRequest
             * @property {string|null} [deviceId] MonitorRequest deviceId
             * @property {string|null} [serviceUuid] MonitorRequest serviceUuid
             * @property {string|null} [characteristicUuid] MonitorRequest characteristicUuid
             * @property {boolean|null} [enable] MonitorRequest enable
             */

            /**
             * Constructs a new MonitorRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents a MonitorRequest.
             * @implements IMonitorRequest
             * @constructor
             * @param {bleproxy.v1.IMonitorRequest=} [properties] Properties to set
             */
            function MonitorRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MonitorRequest deviceId.
             * @member {string} deviceId
             * @memberof bleproxy.v1.MonitorRequest
             * @instance
             */
            MonitorRequest.prototype.deviceId = "";

            /**
             * MonitorRequest serviceUuid.
             * @member {string} serviceUuid
             * @memberof bleproxy.v1.MonitorRequest
             * @instance
             */
            MonitorRequest.prototype.serviceUuid = "";

            /**
             * MonitorRequest characteristicUuid.
             * @member {string} characteristicUuid
             * @memberof bleproxy.v1.MonitorRequest
             * @instance
             */
            MonitorRequest.prototype.characteristicUuid = "";

            /**
             * MonitorRequest enable.
             * @member {boolean} enable
             * @memberof bleproxy.v1.MonitorRequest
             * @instance
             */
            MonitorRequest.prototype.enable = false;

            /**
             * Creates a new MonitorRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.MonitorRequest
             * @static
             * @param {bleproxy.v1.IMonitorRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.MonitorRequest} MonitorRequest instance
             */
            MonitorRequest.create = function create(properties) {
                return new MonitorRequest(properties);
            };

            /**
             * Encodes the specified MonitorRequest message. Does not implicitly {@link bleproxy.v1.MonitorRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.MonitorRequest
             * @static
             * @param {bleproxy.v1.IMonitorRequest} message MonitorRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MonitorRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
                if (message.serviceUuid != null && Object.hasOwnProperty.call(message, "serviceUuid"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.serviceUuid);
                if (message.characteristicUuid != null && Object.hasOwnProperty.call(message, "characteristicUuid"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.characteristicUuid);
                if (message.enable != null && Object.hasOwnProperty.call(message, "enable"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.enable);
                return writer;
            };

            /**
             * Encodes the specified MonitorRequest message, length delimited. Does not implicitly {@link bleproxy.v1.MonitorRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.MonitorRequest
             * @static
             * @param {bleproxy.v1.IMonitorRequest} message MonitorRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MonitorRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MonitorRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.MonitorRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.MonitorRequest} MonitorRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MonitorRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.MonitorRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.deviceId = reader.string();
                            break;
                        }
                    case 2: {
                            message.serviceUuid = reader.string();
                            break;
                        }
                    case 3: {
                            message.characteristicUuid = reader.string();
                            break;
                        }
                    case 4: {
                            message.enable = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MonitorRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.MonitorRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.MonitorRequest} MonitorRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MonitorRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MonitorRequest message.
             * @function verify
             * @memberof bleproxy.v1.MonitorRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MonitorRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                if (message.serviceUuid != null && message.hasOwnProperty("serviceUuid"))
                    if (!$util.isString(message.serviceUuid))
                        return "serviceUuid: string expected";
                if (message.characteristicUuid != null && message.hasOwnProperty("characteristicUuid"))
                    if (!$util.isString(message.characteristicUuid))
                        return "characteristicUuid: string expected";
                if (message.enable != null && message.hasOwnProperty("enable"))
                    if (typeof message.enable !== "boolean")
                        return "enable: boolean expected";
                return null;
            };

            /**
             * Creates a MonitorRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.MonitorRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.MonitorRequest} MonitorRequest
             */
            MonitorRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.MonitorRequest)
                    return object;
                var message = new $root.bleproxy.v1.MonitorRequest();
                if (object.deviceId != null)
                    message.deviceId = String(object.deviceId);
                if (object.serviceUuid != null)
                    message.serviceUuid = String(object.serviceUuid);
                if (object.characteristicUuid != null)
                    message.characteristicUuid = String(object.characteristicUuid);
                if (object.enable != null)
                    message.enable = Boolean(object.enable);
                return message;
            };

            /**
             * Creates a plain object from a MonitorRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.MonitorRequest
             * @static
             * @param {bleproxy.v1.MonitorRequest} message MonitorRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MonitorRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.deviceId = "";
                    object.serviceUuid = "";
                    object.characteristicUuid = "";
                    object.enable = false;
                }
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                if (message.serviceUuid != null && message.hasOwnProperty("serviceUuid"))
                    object.serviceUuid = message.serviceUuid;
                if (message.characteristicUuid != null && message.hasOwnProperty("characteristicUuid"))
                    object.characteristicUuid = message.characteristicUuid;
                if (message.enable != null && message.hasOwnProperty("enable"))
                    object.enable = message.enable;
                return object;
            };

            /**
             * Converts this MonitorRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.MonitorRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MonitorRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for MonitorRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.MonitorRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            MonitorRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.MonitorRequest";
            };

            return MonitorRequest;
        })();

        v1.MonitorResponse = (function() {

            /**
             * Properties of a MonitorResponse.
             * @memberof bleproxy.v1
             * @interface IMonitorResponse
             * @property {boolean|null} [success] MonitorResponse success
             * @property {bleproxy.v1.IError|null} [error] MonitorResponse error
             */

            /**
             * Constructs a new MonitorResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents a MonitorResponse.
             * @implements IMonitorResponse
             * @constructor
             * @param {bleproxy.v1.IMonitorResponse=} [properties] Properties to set
             */
            function MonitorResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MonitorResponse success.
             * @member {boolean} success
             * @memberof bleproxy.v1.MonitorResponse
             * @instance
             */
            MonitorResponse.prototype.success = false;

            /**
             * MonitorResponse error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.MonitorResponse
             * @instance
             */
            MonitorResponse.prototype.error = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * MonitorResponse _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.MonitorResponse
             * @instance
             */
            Object.defineProperty(MonitorResponse.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new MonitorResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.MonitorResponse
             * @static
             * @param {bleproxy.v1.IMonitorResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.MonitorResponse} MonitorResponse instance
             */
            MonitorResponse.create = function create(properties) {
                return new MonitorResponse(properties);
            };

            /**
             * Encodes the specified MonitorResponse message. Does not implicitly {@link bleproxy.v1.MonitorResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.MonitorResponse
             * @static
             * @param {bleproxy.v1.IMonitorResponse} message MonitorResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MonitorResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified MonitorResponse message, length delimited. Does not implicitly {@link bleproxy.v1.MonitorResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.MonitorResponse
             * @static
             * @param {bleproxy.v1.IMonitorResponse} message MonitorResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MonitorResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MonitorResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.MonitorResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.MonitorResponse} MonitorResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MonitorResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.MonitorResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.success = reader.bool();
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MonitorResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.MonitorResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.MonitorResponse} MonitorResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MonitorResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MonitorResponse message.
             * @function verify
             * @memberof bleproxy.v1.MonitorResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MonitorResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.success != null && message.hasOwnProperty("success"))
                    if (typeof message.success !== "boolean")
                        return "success: boolean expected";
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a MonitorResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.MonitorResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.MonitorResponse} MonitorResponse
             */
            MonitorResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.MonitorResponse)
                    return object;
                var message = new $root.bleproxy.v1.MonitorResponse();
                if (object.success != null)
                    message.success = Boolean(object.success);
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.MonitorResponse.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                return message;
            };

            /**
             * Creates a plain object from a MonitorResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.MonitorResponse
             * @static
             * @param {bleproxy.v1.MonitorResponse} message MonitorResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MonitorResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.success = false;
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                return object;
            };

            /**
             * Converts this MonitorResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.MonitorResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MonitorResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for MonitorResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.MonitorResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            MonitorResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.MonitorResponse";
            };

            return MonitorResponse;
        })();

        v1.RSSIRequest = (function() {

            /**
             * Properties of a RSSIRequest.
             * @memberof bleproxy.v1
             * @interface IRSSIRequest
             * @property {string|null} [deviceId] RSSIRequest deviceId
             */

            /**
             * Constructs a new RSSIRequest.
             * @memberof bleproxy.v1
             * @classdesc Represents a RSSIRequest.
             * @implements IRSSIRequest
             * @constructor
             * @param {bleproxy.v1.IRSSIRequest=} [properties] Properties to set
             */
            function RSSIRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RSSIRequest deviceId.
             * @member {string} deviceId
             * @memberof bleproxy.v1.RSSIRequest
             * @instance
             */
            RSSIRequest.prototype.deviceId = "";

            /**
             * Creates a new RSSIRequest instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.RSSIRequest
             * @static
             * @param {bleproxy.v1.IRSSIRequest=} [properties] Properties to set
             * @returns {bleproxy.v1.RSSIRequest} RSSIRequest instance
             */
            RSSIRequest.create = function create(properties) {
                return new RSSIRequest(properties);
            };

            /**
             * Encodes the specified RSSIRequest message. Does not implicitly {@link bleproxy.v1.RSSIRequest.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.RSSIRequest
             * @static
             * @param {bleproxy.v1.IRSSIRequest} message RSSIRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RSSIRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
                return writer;
            };

            /**
             * Encodes the specified RSSIRequest message, length delimited. Does not implicitly {@link bleproxy.v1.RSSIRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.RSSIRequest
             * @static
             * @param {bleproxy.v1.IRSSIRequest} message RSSIRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RSSIRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RSSIRequest message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.RSSIRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.RSSIRequest} RSSIRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RSSIRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.RSSIRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.deviceId = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RSSIRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.RSSIRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.RSSIRequest} RSSIRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RSSIRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RSSIRequest message.
             * @function verify
             * @memberof bleproxy.v1.RSSIRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RSSIRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                return null;
            };

            /**
             * Creates a RSSIRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.RSSIRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.RSSIRequest} RSSIRequest
             */
            RSSIRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.RSSIRequest)
                    return object;
                var message = new $root.bleproxy.v1.RSSIRequest();
                if (object.deviceId != null)
                    message.deviceId = String(object.deviceId);
                return message;
            };

            /**
             * Creates a plain object from a RSSIRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.RSSIRequest
             * @static
             * @param {bleproxy.v1.RSSIRequest} message RSSIRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RSSIRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.deviceId = "";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                return object;
            };

            /**
             * Converts this RSSIRequest to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.RSSIRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RSSIRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for RSSIRequest
             * @function getTypeUrl
             * @memberof bleproxy.v1.RSSIRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            RSSIRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.RSSIRequest";
            };

            return RSSIRequest;
        })();

        v1.RSSIResponse = (function() {

            /**
             * Properties of a RSSIResponse.
             * @memberof bleproxy.v1
             * @interface IRSSIResponse
             * @property {number|null} [rssi] RSSIResponse rssi
             * @property {bleproxy.v1.IError|null} [error] RSSIResponse error
             */

            /**
             * Constructs a new RSSIResponse.
             * @memberof bleproxy.v1
             * @classdesc Represents a RSSIResponse.
             * @implements IRSSIResponse
             * @constructor
             * @param {bleproxy.v1.IRSSIResponse=} [properties] Properties to set
             */
            function RSSIResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RSSIResponse rssi.
             * @member {number} rssi
             * @memberof bleproxy.v1.RSSIResponse
             * @instance
             */
            RSSIResponse.prototype.rssi = 0;

            /**
             * RSSIResponse error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.RSSIResponse
             * @instance
             */
            RSSIResponse.prototype.error = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * RSSIResponse _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.RSSIResponse
             * @instance
             */
            Object.defineProperty(RSSIResponse.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new RSSIResponse instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.RSSIResponse
             * @static
             * @param {bleproxy.v1.IRSSIResponse=} [properties] Properties to set
             * @returns {bleproxy.v1.RSSIResponse} RSSIResponse instance
             */
            RSSIResponse.create = function create(properties) {
                return new RSSIResponse(properties);
            };

            /**
             * Encodes the specified RSSIResponse message. Does not implicitly {@link bleproxy.v1.RSSIResponse.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.RSSIResponse
             * @static
             * @param {bleproxy.v1.IRSSIResponse} message RSSIResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RSSIResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.rssi != null && Object.hasOwnProperty.call(message, "rssi"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.rssi);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified RSSIResponse message, length delimited. Does not implicitly {@link bleproxy.v1.RSSIResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.RSSIResponse
             * @static
             * @param {bleproxy.v1.IRSSIResponse} message RSSIResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RSSIResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RSSIResponse message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.RSSIResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.RSSIResponse} RSSIResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RSSIResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.RSSIResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.rssi = reader.int32();
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RSSIResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.RSSIResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.RSSIResponse} RSSIResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RSSIResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RSSIResponse message.
             * @function verify
             * @memberof bleproxy.v1.RSSIResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RSSIResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.rssi != null && message.hasOwnProperty("rssi"))
                    if (!$util.isInteger(message.rssi))
                        return "rssi: integer expected";
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a RSSIResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.RSSIResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.RSSIResponse} RSSIResponse
             */
            RSSIResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.RSSIResponse)
                    return object;
                var message = new $root.bleproxy.v1.RSSIResponse();
                if (object.rssi != null)
                    message.rssi = object.rssi | 0;
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.RSSIResponse.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                return message;
            };

            /**
             * Creates a plain object from a RSSIResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.RSSIResponse
             * @static
             * @param {bleproxy.v1.RSSIResponse} message RSSIResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RSSIResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.rssi = 0;
                if (message.rssi != null && message.hasOwnProperty("rssi"))
                    object.rssi = message.rssi;
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                return object;
            };

            /**
             * Converts this RSSIResponse to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.RSSIResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RSSIResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for RSSIResponse
             * @function getTypeUrl
             * @memberof bleproxy.v1.RSSIResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            RSSIResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.RSSIResponse";
            };

            return RSSIResponse;
        })();

        v1.ManagerStateEvent = (function() {

            /**
             * Properties of a ManagerStateEvent.
             * @memberof bleproxy.v1
             * @interface IManagerStateEvent
             * @property {bleproxy.v1.ManagerState|null} [state] ManagerStateEvent state
             * @property {number|Long|null} [timestamp] ManagerStateEvent timestamp
             */

            /**
             * Constructs a new ManagerStateEvent.
             * @memberof bleproxy.v1
             * @classdesc Represents a ManagerStateEvent.
             * @implements IManagerStateEvent
             * @constructor
             * @param {bleproxy.v1.IManagerStateEvent=} [properties] Properties to set
             */
            function ManagerStateEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ManagerStateEvent state.
             * @member {bleproxy.v1.ManagerState} state
             * @memberof bleproxy.v1.ManagerStateEvent
             * @instance
             */
            ManagerStateEvent.prototype.state = 0;

            /**
             * ManagerStateEvent timestamp.
             * @member {number|Long} timestamp
             * @memberof bleproxy.v1.ManagerStateEvent
             * @instance
             */
            ManagerStateEvent.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new ManagerStateEvent instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.ManagerStateEvent
             * @static
             * @param {bleproxy.v1.IManagerStateEvent=} [properties] Properties to set
             * @returns {bleproxy.v1.ManagerStateEvent} ManagerStateEvent instance
             */
            ManagerStateEvent.create = function create(properties) {
                return new ManagerStateEvent(properties);
            };

            /**
             * Encodes the specified ManagerStateEvent message. Does not implicitly {@link bleproxy.v1.ManagerStateEvent.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.ManagerStateEvent
             * @static
             * @param {bleproxy.v1.IManagerStateEvent} message ManagerStateEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ManagerStateEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.timestamp);
                return writer;
            };

            /**
             * Encodes the specified ManagerStateEvent message, length delimited. Does not implicitly {@link bleproxy.v1.ManagerStateEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.ManagerStateEvent
             * @static
             * @param {bleproxy.v1.IManagerStateEvent} message ManagerStateEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ManagerStateEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ManagerStateEvent message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.ManagerStateEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.ManagerStateEvent} ManagerStateEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ManagerStateEvent.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.ManagerStateEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.state = reader.int32();
                            break;
                        }
                    case 2: {
                            message.timestamp = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ManagerStateEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.ManagerStateEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.ManagerStateEvent} ManagerStateEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ManagerStateEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ManagerStateEvent message.
             * @function verify
             * @memberof bleproxy.v1.ManagerStateEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ManagerStateEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.state != null && message.hasOwnProperty("state"))
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    }
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                return null;
            };

            /**
             * Creates a ManagerStateEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.ManagerStateEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.ManagerStateEvent} ManagerStateEvent
             */
            ManagerStateEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.ManagerStateEvent)
                    return object;
                var message = new $root.bleproxy.v1.ManagerStateEvent();
                switch (object.state) {
                default:
                    if (typeof object.state === "number") {
                        message.state = object.state;
                        break;
                    }
                    break;
                case "MANAGER_STATE_UNKNOWN":
                case 0:
                    message.state = 0;
                    break;
                case "MANAGER_STATE_RESETTING":
                case 1:
                    message.state = 1;
                    break;
                case "MANAGER_STATE_UNSUPPORTED":
                case 2:
                    message.state = 2;
                    break;
                case "MANAGER_STATE_UNAUTHORIZED":
                case 3:
                    message.state = 3;
                    break;
                case "MANAGER_STATE_POWERED_OFF":
                case 4:
                    message.state = 4;
                    break;
                case "MANAGER_STATE_POWERED_ON":
                case 5:
                    message.state = 5;
                    break;
                }
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a ManagerStateEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.ManagerStateEvent
             * @static
             * @param {bleproxy.v1.ManagerStateEvent} message ManagerStateEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ManagerStateEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.state = options.enums === String ? "MANAGER_STATE_UNKNOWN" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                }
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = options.enums === String ? $root.bleproxy.v1.ManagerState[message.state] === undefined ? message.state : $root.bleproxy.v1.ManagerState[message.state] : message.state;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                return object;
            };

            /**
             * Converts this ManagerStateEvent to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.ManagerStateEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ManagerStateEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ManagerStateEvent
             * @function getTypeUrl
             * @memberof bleproxy.v1.ManagerStateEvent
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ManagerStateEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.ManagerStateEvent";
            };

            return ManagerStateEvent;
        })();

        v1.ScanResultEvent = (function() {

            /**
             * Properties of a ScanResultEvent.
             * @memberof bleproxy.v1
             * @interface IScanResultEvent
             * @property {bleproxy.v1.IDevice|null} [device] ScanResultEvent device
             * @property {number|Long|null} [timestamp] ScanResultEvent timestamp
             */

            /**
             * Constructs a new ScanResultEvent.
             * @memberof bleproxy.v1
             * @classdesc Represents a ScanResultEvent.
             * @implements IScanResultEvent
             * @constructor
             * @param {bleproxy.v1.IScanResultEvent=} [properties] Properties to set
             */
            function ScanResultEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ScanResultEvent device.
             * @member {bleproxy.v1.IDevice|null|undefined} device
             * @memberof bleproxy.v1.ScanResultEvent
             * @instance
             */
            ScanResultEvent.prototype.device = null;

            /**
             * ScanResultEvent timestamp.
             * @member {number|Long} timestamp
             * @memberof bleproxy.v1.ScanResultEvent
             * @instance
             */
            ScanResultEvent.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new ScanResultEvent instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.ScanResultEvent
             * @static
             * @param {bleproxy.v1.IScanResultEvent=} [properties] Properties to set
             * @returns {bleproxy.v1.ScanResultEvent} ScanResultEvent instance
             */
            ScanResultEvent.create = function create(properties) {
                return new ScanResultEvent(properties);
            };

            /**
             * Encodes the specified ScanResultEvent message. Does not implicitly {@link bleproxy.v1.ScanResultEvent.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.ScanResultEvent
             * @static
             * @param {bleproxy.v1.IScanResultEvent} message ScanResultEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ScanResultEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.device != null && Object.hasOwnProperty.call(message, "device"))
                    $root.bleproxy.v1.Device.encode(message.device, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.timestamp);
                return writer;
            };

            /**
             * Encodes the specified ScanResultEvent message, length delimited. Does not implicitly {@link bleproxy.v1.ScanResultEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.ScanResultEvent
             * @static
             * @param {bleproxy.v1.IScanResultEvent} message ScanResultEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ScanResultEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ScanResultEvent message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.ScanResultEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.ScanResultEvent} ScanResultEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ScanResultEvent.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.ScanResultEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.device = $root.bleproxy.v1.Device.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.timestamp = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ScanResultEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.ScanResultEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.ScanResultEvent} ScanResultEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ScanResultEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ScanResultEvent message.
             * @function verify
             * @memberof bleproxy.v1.ScanResultEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ScanResultEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.device != null && message.hasOwnProperty("device")) {
                    var error = $root.bleproxy.v1.Device.verify(message.device);
                    if (error)
                        return "device." + error;
                }
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                return null;
            };

            /**
             * Creates a ScanResultEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.ScanResultEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.ScanResultEvent} ScanResultEvent
             */
            ScanResultEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.ScanResultEvent)
                    return object;
                var message = new $root.bleproxy.v1.ScanResultEvent();
                if (object.device != null) {
                    if (typeof object.device !== "object")
                        throw TypeError(".bleproxy.v1.ScanResultEvent.device: object expected");
                    message.device = $root.bleproxy.v1.Device.fromObject(object.device);
                }
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a ScanResultEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.ScanResultEvent
             * @static
             * @param {bleproxy.v1.ScanResultEvent} message ScanResultEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ScanResultEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.device = null;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                }
                if (message.device != null && message.hasOwnProperty("device"))
                    object.device = $root.bleproxy.v1.Device.toObject(message.device, options);
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                return object;
            };

            /**
             * Converts this ScanResultEvent to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.ScanResultEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ScanResultEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ScanResultEvent
             * @function getTypeUrl
             * @memberof bleproxy.v1.ScanResultEvent
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ScanResultEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.ScanResultEvent";
            };

            return ScanResultEvent;
        })();

        v1.PeripheralConnectedEvent = (function() {

            /**
             * Properties of a PeripheralConnectedEvent.
             * @memberof bleproxy.v1
             * @interface IPeripheralConnectedEvent
             * @property {string|null} [deviceId] PeripheralConnectedEvent deviceId
             * @property {number|Long|null} [timestamp] PeripheralConnectedEvent timestamp
             */

            /**
             * Constructs a new PeripheralConnectedEvent.
             * @memberof bleproxy.v1
             * @classdesc Represents a PeripheralConnectedEvent.
             * @implements IPeripheralConnectedEvent
             * @constructor
             * @param {bleproxy.v1.IPeripheralConnectedEvent=} [properties] Properties to set
             */
            function PeripheralConnectedEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PeripheralConnectedEvent deviceId.
             * @member {string} deviceId
             * @memberof bleproxy.v1.PeripheralConnectedEvent
             * @instance
             */
            PeripheralConnectedEvent.prototype.deviceId = "";

            /**
             * PeripheralConnectedEvent timestamp.
             * @member {number|Long} timestamp
             * @memberof bleproxy.v1.PeripheralConnectedEvent
             * @instance
             */
            PeripheralConnectedEvent.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new PeripheralConnectedEvent instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.PeripheralConnectedEvent
             * @static
             * @param {bleproxy.v1.IPeripheralConnectedEvent=} [properties] Properties to set
             * @returns {bleproxy.v1.PeripheralConnectedEvent} PeripheralConnectedEvent instance
             */
            PeripheralConnectedEvent.create = function create(properties) {
                return new PeripheralConnectedEvent(properties);
            };

            /**
             * Encodes the specified PeripheralConnectedEvent message. Does not implicitly {@link bleproxy.v1.PeripheralConnectedEvent.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.PeripheralConnectedEvent
             * @static
             * @param {bleproxy.v1.IPeripheralConnectedEvent} message PeripheralConnectedEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PeripheralConnectedEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.timestamp);
                return writer;
            };

            /**
             * Encodes the specified PeripheralConnectedEvent message, length delimited. Does not implicitly {@link bleproxy.v1.PeripheralConnectedEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.PeripheralConnectedEvent
             * @static
             * @param {bleproxy.v1.IPeripheralConnectedEvent} message PeripheralConnectedEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PeripheralConnectedEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PeripheralConnectedEvent message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.PeripheralConnectedEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.PeripheralConnectedEvent} PeripheralConnectedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PeripheralConnectedEvent.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.PeripheralConnectedEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.deviceId = reader.string();
                            break;
                        }
                    case 2: {
                            message.timestamp = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PeripheralConnectedEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.PeripheralConnectedEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.PeripheralConnectedEvent} PeripheralConnectedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PeripheralConnectedEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PeripheralConnectedEvent message.
             * @function verify
             * @memberof bleproxy.v1.PeripheralConnectedEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PeripheralConnectedEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                return null;
            };

            /**
             * Creates a PeripheralConnectedEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.PeripheralConnectedEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.PeripheralConnectedEvent} PeripheralConnectedEvent
             */
            PeripheralConnectedEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.PeripheralConnectedEvent)
                    return object;
                var message = new $root.bleproxy.v1.PeripheralConnectedEvent();
                if (object.deviceId != null)
                    message.deviceId = String(object.deviceId);
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a PeripheralConnectedEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.PeripheralConnectedEvent
             * @static
             * @param {bleproxy.v1.PeripheralConnectedEvent} message PeripheralConnectedEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PeripheralConnectedEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.deviceId = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                }
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                return object;
            };

            /**
             * Converts this PeripheralConnectedEvent to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.PeripheralConnectedEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PeripheralConnectedEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for PeripheralConnectedEvent
             * @function getTypeUrl
             * @memberof bleproxy.v1.PeripheralConnectedEvent
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            PeripheralConnectedEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.PeripheralConnectedEvent";
            };

            return PeripheralConnectedEvent;
        })();

        v1.PeripheralDisconnectedEvent = (function() {

            /**
             * Properties of a PeripheralDisconnectedEvent.
             * @memberof bleproxy.v1
             * @interface IPeripheralDisconnectedEvent
             * @property {string|null} [deviceId] PeripheralDisconnectedEvent deviceId
             * @property {bleproxy.v1.IError|null} [error] PeripheralDisconnectedEvent error
             * @property {number|Long|null} [timestamp] PeripheralDisconnectedEvent timestamp
             */

            /**
             * Constructs a new PeripheralDisconnectedEvent.
             * @memberof bleproxy.v1
             * @classdesc Represents a PeripheralDisconnectedEvent.
             * @implements IPeripheralDisconnectedEvent
             * @constructor
             * @param {bleproxy.v1.IPeripheralDisconnectedEvent=} [properties] Properties to set
             */
            function PeripheralDisconnectedEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PeripheralDisconnectedEvent deviceId.
             * @member {string} deviceId
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @instance
             */
            PeripheralDisconnectedEvent.prototype.deviceId = "";

            /**
             * PeripheralDisconnectedEvent error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @instance
             */
            PeripheralDisconnectedEvent.prototype.error = null;

            /**
             * PeripheralDisconnectedEvent timestamp.
             * @member {number|Long} timestamp
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @instance
             */
            PeripheralDisconnectedEvent.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * PeripheralDisconnectedEvent _error.
             * @member {"error"|undefined} _error
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @instance
             */
            Object.defineProperty(PeripheralDisconnectedEvent.prototype, "_error", {
                get: $util.oneOfGetter($oneOfFields = ["error"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new PeripheralDisconnectedEvent instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @static
             * @param {bleproxy.v1.IPeripheralDisconnectedEvent=} [properties] Properties to set
             * @returns {bleproxy.v1.PeripheralDisconnectedEvent} PeripheralDisconnectedEvent instance
             */
            PeripheralDisconnectedEvent.create = function create(properties) {
                return new PeripheralDisconnectedEvent(properties);
            };

            /**
             * Encodes the specified PeripheralDisconnectedEvent message. Does not implicitly {@link bleproxy.v1.PeripheralDisconnectedEvent.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @static
             * @param {bleproxy.v1.IPeripheralDisconnectedEvent} message PeripheralDisconnectedEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PeripheralDisconnectedEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timestamp);
                return writer;
            };

            /**
             * Encodes the specified PeripheralDisconnectedEvent message, length delimited. Does not implicitly {@link bleproxy.v1.PeripheralDisconnectedEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @static
             * @param {bleproxy.v1.IPeripheralDisconnectedEvent} message PeripheralDisconnectedEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PeripheralDisconnectedEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PeripheralDisconnectedEvent message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.PeripheralDisconnectedEvent} PeripheralDisconnectedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PeripheralDisconnectedEvent.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.PeripheralDisconnectedEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.deviceId = reader.string();
                            break;
                        }
                    case 2: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.timestamp = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PeripheralDisconnectedEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.PeripheralDisconnectedEvent} PeripheralDisconnectedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PeripheralDisconnectedEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PeripheralDisconnectedEvent message.
             * @function verify
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PeripheralDisconnectedEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties._error = 1;
                    {
                        var error = $root.bleproxy.v1.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                return null;
            };

            /**
             * Creates a PeripheralDisconnectedEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.PeripheralDisconnectedEvent} PeripheralDisconnectedEvent
             */
            PeripheralDisconnectedEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.PeripheralDisconnectedEvent)
                    return object;
                var message = new $root.bleproxy.v1.PeripheralDisconnectedEvent();
                if (object.deviceId != null)
                    message.deviceId = String(object.deviceId);
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.PeripheralDisconnectedEvent.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a PeripheralDisconnectedEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @static
             * @param {bleproxy.v1.PeripheralDisconnectedEvent} message PeripheralDisconnectedEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PeripheralDisconnectedEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.deviceId = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                }
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object._error = "error";
                }
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                return object;
            };

            /**
             * Converts this PeripheralDisconnectedEvent to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PeripheralDisconnectedEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for PeripheralDisconnectedEvent
             * @function getTypeUrl
             * @memberof bleproxy.v1.PeripheralDisconnectedEvent
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            PeripheralDisconnectedEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.PeripheralDisconnectedEvent";
            };

            return PeripheralDisconnectedEvent;
        })();

        v1.CharacteristicValueUpdatedEvent = (function() {

            /**
             * Properties of a CharacteristicValueUpdatedEvent.
             * @memberof bleproxy.v1
             * @interface ICharacteristicValueUpdatedEvent
             * @property {string|null} [deviceId] CharacteristicValueUpdatedEvent deviceId
             * @property {string|null} [serviceUuid] CharacteristicValueUpdatedEvent serviceUuid
             * @property {string|null} [characteristicUuid] CharacteristicValueUpdatedEvent characteristicUuid
             * @property {Uint8Array|null} [value] CharacteristicValueUpdatedEvent value
             * @property {number|Long|null} [timestamp] CharacteristicValueUpdatedEvent timestamp
             */

            /**
             * Constructs a new CharacteristicValueUpdatedEvent.
             * @memberof bleproxy.v1
             * @classdesc Represents a CharacteristicValueUpdatedEvent.
             * @implements ICharacteristicValueUpdatedEvent
             * @constructor
             * @param {bleproxy.v1.ICharacteristicValueUpdatedEvent=} [properties] Properties to set
             */
            function CharacteristicValueUpdatedEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CharacteristicValueUpdatedEvent deviceId.
             * @member {string} deviceId
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @instance
             */
            CharacteristicValueUpdatedEvent.prototype.deviceId = "";

            /**
             * CharacteristicValueUpdatedEvent serviceUuid.
             * @member {string} serviceUuid
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @instance
             */
            CharacteristicValueUpdatedEvent.prototype.serviceUuid = "";

            /**
             * CharacteristicValueUpdatedEvent characteristicUuid.
             * @member {string} characteristicUuid
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @instance
             */
            CharacteristicValueUpdatedEvent.prototype.characteristicUuid = "";

            /**
             * CharacteristicValueUpdatedEvent value.
             * @member {Uint8Array} value
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @instance
             */
            CharacteristicValueUpdatedEvent.prototype.value = $util.newBuffer([]);

            /**
             * CharacteristicValueUpdatedEvent timestamp.
             * @member {number|Long} timestamp
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @instance
             */
            CharacteristicValueUpdatedEvent.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new CharacteristicValueUpdatedEvent instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @static
             * @param {bleproxy.v1.ICharacteristicValueUpdatedEvent=} [properties] Properties to set
             * @returns {bleproxy.v1.CharacteristicValueUpdatedEvent} CharacteristicValueUpdatedEvent instance
             */
            CharacteristicValueUpdatedEvent.create = function create(properties) {
                return new CharacteristicValueUpdatedEvent(properties);
            };

            /**
             * Encodes the specified CharacteristicValueUpdatedEvent message. Does not implicitly {@link bleproxy.v1.CharacteristicValueUpdatedEvent.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @static
             * @param {bleproxy.v1.ICharacteristicValueUpdatedEvent} message CharacteristicValueUpdatedEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CharacteristicValueUpdatedEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
                if (message.serviceUuid != null && Object.hasOwnProperty.call(message, "serviceUuid"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.serviceUuid);
                if (message.characteristicUuid != null && Object.hasOwnProperty.call(message, "characteristicUuid"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.characteristicUuid);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.value);
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int64(message.timestamp);
                return writer;
            };

            /**
             * Encodes the specified CharacteristicValueUpdatedEvent message, length delimited. Does not implicitly {@link bleproxy.v1.CharacteristicValueUpdatedEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @static
             * @param {bleproxy.v1.ICharacteristicValueUpdatedEvent} message CharacteristicValueUpdatedEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CharacteristicValueUpdatedEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CharacteristicValueUpdatedEvent message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.CharacteristicValueUpdatedEvent} CharacteristicValueUpdatedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CharacteristicValueUpdatedEvent.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.CharacteristicValueUpdatedEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.deviceId = reader.string();
                            break;
                        }
                    case 2: {
                            message.serviceUuid = reader.string();
                            break;
                        }
                    case 3: {
                            message.characteristicUuid = reader.string();
                            break;
                        }
                    case 4: {
                            message.value = reader.bytes();
                            break;
                        }
                    case 5: {
                            message.timestamp = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CharacteristicValueUpdatedEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.CharacteristicValueUpdatedEvent} CharacteristicValueUpdatedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CharacteristicValueUpdatedEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CharacteristicValueUpdatedEvent message.
             * @function verify
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CharacteristicValueUpdatedEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                if (message.serviceUuid != null && message.hasOwnProperty("serviceUuid"))
                    if (!$util.isString(message.serviceUuid))
                        return "serviceUuid: string expected";
                if (message.characteristicUuid != null && message.hasOwnProperty("characteristicUuid"))
                    if (!$util.isString(message.characteristicUuid))
                        return "characteristicUuid: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                return null;
            };

            /**
             * Creates a CharacteristicValueUpdatedEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.CharacteristicValueUpdatedEvent} CharacteristicValueUpdatedEvent
             */
            CharacteristicValueUpdatedEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.CharacteristicValueUpdatedEvent)
                    return object;
                var message = new $root.bleproxy.v1.CharacteristicValueUpdatedEvent();
                if (object.deviceId != null)
                    message.deviceId = String(object.deviceId);
                if (object.serviceUuid != null)
                    message.serviceUuid = String(object.serviceUuid);
                if (object.characteristicUuid != null)
                    message.characteristicUuid = String(object.characteristicUuid);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length >= 0)
                        message.value = object.value;
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a CharacteristicValueUpdatedEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @static
             * @param {bleproxy.v1.CharacteristicValueUpdatedEvent} message CharacteristicValueUpdatedEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CharacteristicValueUpdatedEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.deviceId = "";
                    object.serviceUuid = "";
                    object.characteristicUuid = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                }
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                if (message.serviceUuid != null && message.hasOwnProperty("serviceUuid"))
                    object.serviceUuid = message.serviceUuid;
                if (message.characteristicUuid != null && message.hasOwnProperty("characteristicUuid"))
                    object.characteristicUuid = message.characteristicUuid;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                return object;
            };

            /**
             * Converts this CharacteristicValueUpdatedEvent to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CharacteristicValueUpdatedEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for CharacteristicValueUpdatedEvent
             * @function getTypeUrl
             * @memberof bleproxy.v1.CharacteristicValueUpdatedEvent
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            CharacteristicValueUpdatedEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.CharacteristicValueUpdatedEvent";
            };

            return CharacteristicValueUpdatedEvent;
        })();

        v1.ServerErrorEvent = (function() {

            /**
             * Properties of a ServerErrorEvent.
             * @memberof bleproxy.v1
             * @interface IServerErrorEvent
             * @property {bleproxy.v1.IError|null} [error] ServerErrorEvent error
             * @property {number|Long|null} [timestamp] ServerErrorEvent timestamp
             * @property {string|null} [context] ServerErrorEvent context
             */

            /**
             * Constructs a new ServerErrorEvent.
             * @memberof bleproxy.v1
             * @classdesc Represents a ServerErrorEvent.
             * @implements IServerErrorEvent
             * @constructor
             * @param {bleproxy.v1.IServerErrorEvent=} [properties] Properties to set
             */
            function ServerErrorEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServerErrorEvent error.
             * @member {bleproxy.v1.IError|null|undefined} error
             * @memberof bleproxy.v1.ServerErrorEvent
             * @instance
             */
            ServerErrorEvent.prototype.error = null;

            /**
             * ServerErrorEvent timestamp.
             * @member {number|Long} timestamp
             * @memberof bleproxy.v1.ServerErrorEvent
             * @instance
             */
            ServerErrorEvent.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ServerErrorEvent context.
             * @member {string|null|undefined} context
             * @memberof bleproxy.v1.ServerErrorEvent
             * @instance
             */
            ServerErrorEvent.prototype.context = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * ServerErrorEvent _context.
             * @member {"context"|undefined} _context
             * @memberof bleproxy.v1.ServerErrorEvent
             * @instance
             */
            Object.defineProperty(ServerErrorEvent.prototype, "_context", {
                get: $util.oneOfGetter($oneOfFields = ["context"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ServerErrorEvent instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.ServerErrorEvent
             * @static
             * @param {bleproxy.v1.IServerErrorEvent=} [properties] Properties to set
             * @returns {bleproxy.v1.ServerErrorEvent} ServerErrorEvent instance
             */
            ServerErrorEvent.create = function create(properties) {
                return new ServerErrorEvent(properties);
            };

            /**
             * Encodes the specified ServerErrorEvent message. Does not implicitly {@link bleproxy.v1.ServerErrorEvent.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.ServerErrorEvent
             * @static
             * @param {bleproxy.v1.IServerErrorEvent} message ServerErrorEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerErrorEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.bleproxy.v1.Error.encode(message.error, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.timestamp);
                if (message.context != null && Object.hasOwnProperty.call(message, "context"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.context);
                return writer;
            };

            /**
             * Encodes the specified ServerErrorEvent message, length delimited. Does not implicitly {@link bleproxy.v1.ServerErrorEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.ServerErrorEvent
             * @static
             * @param {bleproxy.v1.IServerErrorEvent} message ServerErrorEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerErrorEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServerErrorEvent message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.ServerErrorEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.ServerErrorEvent} ServerErrorEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerErrorEvent.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.ServerErrorEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.error = $root.bleproxy.v1.Error.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.timestamp = reader.int64();
                            break;
                        }
                    case 3: {
                            message.context = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ServerErrorEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.ServerErrorEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.ServerErrorEvent} ServerErrorEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerErrorEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ServerErrorEvent message.
             * @function verify
             * @memberof bleproxy.v1.ServerErrorEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ServerErrorEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.error != null && message.hasOwnProperty("error")) {
                    var error = $root.bleproxy.v1.Error.verify(message.error);
                    if (error)
                        return "error." + error;
                }
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                if (message.context != null && message.hasOwnProperty("context")) {
                    properties._context = 1;
                    if (!$util.isString(message.context))
                        return "context: string expected";
                }
                return null;
            };

            /**
             * Creates a ServerErrorEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.ServerErrorEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.ServerErrorEvent} ServerErrorEvent
             */
            ServerErrorEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.ServerErrorEvent)
                    return object;
                var message = new $root.bleproxy.v1.ServerErrorEvent();
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".bleproxy.v1.ServerErrorEvent.error: object expected");
                    message.error = $root.bleproxy.v1.Error.fromObject(object.error);
                }
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                if (object.context != null)
                    message.context = String(object.context);
                return message;
            };

            /**
             * Creates a plain object from a ServerErrorEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.ServerErrorEvent
             * @static
             * @param {bleproxy.v1.ServerErrorEvent} message ServerErrorEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServerErrorEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.error = null;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                }
                if (message.error != null && message.hasOwnProperty("error"))
                    object.error = $root.bleproxy.v1.Error.toObject(message.error, options);
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                if (message.context != null && message.hasOwnProperty("context")) {
                    object.context = message.context;
                    if (options.oneofs)
                        object._context = "context";
                }
                return object;
            };

            /**
             * Converts this ServerErrorEvent to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.ServerErrorEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServerErrorEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ServerErrorEvent
             * @function getTypeUrl
             * @memberof bleproxy.v1.ServerErrorEvent
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ServerErrorEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.ServerErrorEvent";
            };

            return ServerErrorEvent;
        })();

        v1.WsEvent = (function() {

            /**
             * Properties of a WsEvent.
             * @memberof bleproxy.v1
             * @interface IWsEvent
             * @property {bleproxy.v1.IManagerStateEvent|null} [managerStateEvent] WsEvent managerStateEvent
             * @property {bleproxy.v1.IScanResultEvent|null} [scanResultEvent] WsEvent scanResultEvent
             * @property {bleproxy.v1.IPeripheralConnectedEvent|null} [peripheralConnectedEvent] WsEvent peripheralConnectedEvent
             * @property {bleproxy.v1.IPeripheralDisconnectedEvent|null} [peripheralDisconnectedEvent] WsEvent peripheralDisconnectedEvent
             * @property {bleproxy.v1.ICharacteristicValueUpdatedEvent|null} [characteristicValueUpdatedEvent] WsEvent characteristicValueUpdatedEvent
             * @property {bleproxy.v1.IServerErrorEvent|null} [serverErrorEvent] WsEvent serverErrorEvent
             */

            /**
             * Constructs a new WsEvent.
             * @memberof bleproxy.v1
             * @classdesc Represents a WsEvent.
             * @implements IWsEvent
             * @constructor
             * @param {bleproxy.v1.IWsEvent=} [properties] Properties to set
             */
            function WsEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * WsEvent managerStateEvent.
             * @member {bleproxy.v1.IManagerStateEvent|null|undefined} managerStateEvent
             * @memberof bleproxy.v1.WsEvent
             * @instance
             */
            WsEvent.prototype.managerStateEvent = null;

            /**
             * WsEvent scanResultEvent.
             * @member {bleproxy.v1.IScanResultEvent|null|undefined} scanResultEvent
             * @memberof bleproxy.v1.WsEvent
             * @instance
             */
            WsEvent.prototype.scanResultEvent = null;

            /**
             * WsEvent peripheralConnectedEvent.
             * @member {bleproxy.v1.IPeripheralConnectedEvent|null|undefined} peripheralConnectedEvent
             * @memberof bleproxy.v1.WsEvent
             * @instance
             */
            WsEvent.prototype.peripheralConnectedEvent = null;

            /**
             * WsEvent peripheralDisconnectedEvent.
             * @member {bleproxy.v1.IPeripheralDisconnectedEvent|null|undefined} peripheralDisconnectedEvent
             * @memberof bleproxy.v1.WsEvent
             * @instance
             */
            WsEvent.prototype.peripheralDisconnectedEvent = null;

            /**
             * WsEvent characteristicValueUpdatedEvent.
             * @member {bleproxy.v1.ICharacteristicValueUpdatedEvent|null|undefined} characteristicValueUpdatedEvent
             * @memberof bleproxy.v1.WsEvent
             * @instance
             */
            WsEvent.prototype.characteristicValueUpdatedEvent = null;

            /**
             * WsEvent serverErrorEvent.
             * @member {bleproxy.v1.IServerErrorEvent|null|undefined} serverErrorEvent
             * @memberof bleproxy.v1.WsEvent
             * @instance
             */
            WsEvent.prototype.serverErrorEvent = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * WsEvent event.
             * @member {"managerStateEvent"|"scanResultEvent"|"peripheralConnectedEvent"|"peripheralDisconnectedEvent"|"characteristicValueUpdatedEvent"|"serverErrorEvent"|undefined} event
             * @memberof bleproxy.v1.WsEvent
             * @instance
             */
            Object.defineProperty(WsEvent.prototype, "event", {
                get: $util.oneOfGetter($oneOfFields = ["managerStateEvent", "scanResultEvent", "peripheralConnectedEvent", "peripheralDisconnectedEvent", "characteristicValueUpdatedEvent", "serverErrorEvent"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new WsEvent instance using the specified properties.
             * @function create
             * @memberof bleproxy.v1.WsEvent
             * @static
             * @param {bleproxy.v1.IWsEvent=} [properties] Properties to set
             * @returns {bleproxy.v1.WsEvent} WsEvent instance
             */
            WsEvent.create = function create(properties) {
                return new WsEvent(properties);
            };

            /**
             * Encodes the specified WsEvent message. Does not implicitly {@link bleproxy.v1.WsEvent.verify|verify} messages.
             * @function encode
             * @memberof bleproxy.v1.WsEvent
             * @static
             * @param {bleproxy.v1.IWsEvent} message WsEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WsEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.managerStateEvent != null && Object.hasOwnProperty.call(message, "managerStateEvent"))
                    $root.bleproxy.v1.ManagerStateEvent.encode(message.managerStateEvent, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.scanResultEvent != null && Object.hasOwnProperty.call(message, "scanResultEvent"))
                    $root.bleproxy.v1.ScanResultEvent.encode(message.scanResultEvent, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.peripheralConnectedEvent != null && Object.hasOwnProperty.call(message, "peripheralConnectedEvent"))
                    $root.bleproxy.v1.PeripheralConnectedEvent.encode(message.peripheralConnectedEvent, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.peripheralDisconnectedEvent != null && Object.hasOwnProperty.call(message, "peripheralDisconnectedEvent"))
                    $root.bleproxy.v1.PeripheralDisconnectedEvent.encode(message.peripheralDisconnectedEvent, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.characteristicValueUpdatedEvent != null && Object.hasOwnProperty.call(message, "characteristicValueUpdatedEvent"))
                    $root.bleproxy.v1.CharacteristicValueUpdatedEvent.encode(message.characteristicValueUpdatedEvent, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.serverErrorEvent != null && Object.hasOwnProperty.call(message, "serverErrorEvent"))
                    $root.bleproxy.v1.ServerErrorEvent.encode(message.serverErrorEvent, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified WsEvent message, length delimited. Does not implicitly {@link bleproxy.v1.WsEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof bleproxy.v1.WsEvent
             * @static
             * @param {bleproxy.v1.IWsEvent} message WsEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WsEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a WsEvent message from the specified reader or buffer.
             * @function decode
             * @memberof bleproxy.v1.WsEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {bleproxy.v1.WsEvent} WsEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WsEvent.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bleproxy.v1.WsEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.managerStateEvent = $root.bleproxy.v1.ManagerStateEvent.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.scanResultEvent = $root.bleproxy.v1.ScanResultEvent.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.peripheralConnectedEvent = $root.bleproxy.v1.PeripheralConnectedEvent.decode(reader, reader.uint32());
                            break;
                        }
                    case 4: {
                            message.peripheralDisconnectedEvent = $root.bleproxy.v1.PeripheralDisconnectedEvent.decode(reader, reader.uint32());
                            break;
                        }
                    case 5: {
                            message.characteristicValueUpdatedEvent = $root.bleproxy.v1.CharacteristicValueUpdatedEvent.decode(reader, reader.uint32());
                            break;
                        }
                    case 6: {
                            message.serverErrorEvent = $root.bleproxy.v1.ServerErrorEvent.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a WsEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof bleproxy.v1.WsEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {bleproxy.v1.WsEvent} WsEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WsEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a WsEvent message.
             * @function verify
             * @memberof bleproxy.v1.WsEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WsEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.managerStateEvent != null && message.hasOwnProperty("managerStateEvent")) {
                    properties.event = 1;
                    {
                        var error = $root.bleproxy.v1.ManagerStateEvent.verify(message.managerStateEvent);
                        if (error)
                            return "managerStateEvent." + error;
                    }
                }
                if (message.scanResultEvent != null && message.hasOwnProperty("scanResultEvent")) {
                    if (properties.event === 1)
                        return "event: multiple values";
                    properties.event = 1;
                    {
                        var error = $root.bleproxy.v1.ScanResultEvent.verify(message.scanResultEvent);
                        if (error)
                            return "scanResultEvent." + error;
                    }
                }
                if (message.peripheralConnectedEvent != null && message.hasOwnProperty("peripheralConnectedEvent")) {
                    if (properties.event === 1)
                        return "event: multiple values";
                    properties.event = 1;
                    {
                        var error = $root.bleproxy.v1.PeripheralConnectedEvent.verify(message.peripheralConnectedEvent);
                        if (error)
                            return "peripheralConnectedEvent." + error;
                    }
                }
                if (message.peripheralDisconnectedEvent != null && message.hasOwnProperty("peripheralDisconnectedEvent")) {
                    if (properties.event === 1)
                        return "event: multiple values";
                    properties.event = 1;
                    {
                        var error = $root.bleproxy.v1.PeripheralDisconnectedEvent.verify(message.peripheralDisconnectedEvent);
                        if (error)
                            return "peripheralDisconnectedEvent." + error;
                    }
                }
                if (message.characteristicValueUpdatedEvent != null && message.hasOwnProperty("characteristicValueUpdatedEvent")) {
                    if (properties.event === 1)
                        return "event: multiple values";
                    properties.event = 1;
                    {
                        var error = $root.bleproxy.v1.CharacteristicValueUpdatedEvent.verify(message.characteristicValueUpdatedEvent);
                        if (error)
                            return "characteristicValueUpdatedEvent." + error;
                    }
                }
                if (message.serverErrorEvent != null && message.hasOwnProperty("serverErrorEvent")) {
                    if (properties.event === 1)
                        return "event: multiple values";
                    properties.event = 1;
                    {
                        var error = $root.bleproxy.v1.ServerErrorEvent.verify(message.serverErrorEvent);
                        if (error)
                            return "serverErrorEvent." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a WsEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof bleproxy.v1.WsEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {bleproxy.v1.WsEvent} WsEvent
             */
            WsEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.bleproxy.v1.WsEvent)
                    return object;
                var message = new $root.bleproxy.v1.WsEvent();
                if (object.managerStateEvent != null) {
                    if (typeof object.managerStateEvent !== "object")
                        throw TypeError(".bleproxy.v1.WsEvent.managerStateEvent: object expected");
                    message.managerStateEvent = $root.bleproxy.v1.ManagerStateEvent.fromObject(object.managerStateEvent);
                }
                if (object.scanResultEvent != null) {
                    if (typeof object.scanResultEvent !== "object")
                        throw TypeError(".bleproxy.v1.WsEvent.scanResultEvent: object expected");
                    message.scanResultEvent = $root.bleproxy.v1.ScanResultEvent.fromObject(object.scanResultEvent);
                }
                if (object.peripheralConnectedEvent != null) {
                    if (typeof object.peripheralConnectedEvent !== "object")
                        throw TypeError(".bleproxy.v1.WsEvent.peripheralConnectedEvent: object expected");
                    message.peripheralConnectedEvent = $root.bleproxy.v1.PeripheralConnectedEvent.fromObject(object.peripheralConnectedEvent);
                }
                if (object.peripheralDisconnectedEvent != null) {
                    if (typeof object.peripheralDisconnectedEvent !== "object")
                        throw TypeError(".bleproxy.v1.WsEvent.peripheralDisconnectedEvent: object expected");
                    message.peripheralDisconnectedEvent = $root.bleproxy.v1.PeripheralDisconnectedEvent.fromObject(object.peripheralDisconnectedEvent);
                }
                if (object.characteristicValueUpdatedEvent != null) {
                    if (typeof object.characteristicValueUpdatedEvent !== "object")
                        throw TypeError(".bleproxy.v1.WsEvent.characteristicValueUpdatedEvent: object expected");
                    message.characteristicValueUpdatedEvent = $root.bleproxy.v1.CharacteristicValueUpdatedEvent.fromObject(object.characteristicValueUpdatedEvent);
                }
                if (object.serverErrorEvent != null) {
                    if (typeof object.serverErrorEvent !== "object")
                        throw TypeError(".bleproxy.v1.WsEvent.serverErrorEvent: object expected");
                    message.serverErrorEvent = $root.bleproxy.v1.ServerErrorEvent.fromObject(object.serverErrorEvent);
                }
                return message;
            };

            /**
             * Creates a plain object from a WsEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof bleproxy.v1.WsEvent
             * @static
             * @param {bleproxy.v1.WsEvent} message WsEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WsEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.managerStateEvent != null && message.hasOwnProperty("managerStateEvent")) {
                    object.managerStateEvent = $root.bleproxy.v1.ManagerStateEvent.toObject(message.managerStateEvent, options);
                    if (options.oneofs)
                        object.event = "managerStateEvent";
                }
                if (message.scanResultEvent != null && message.hasOwnProperty("scanResultEvent")) {
                    object.scanResultEvent = $root.bleproxy.v1.ScanResultEvent.toObject(message.scanResultEvent, options);
                    if (options.oneofs)
                        object.event = "scanResultEvent";
                }
                if (message.peripheralConnectedEvent != null && message.hasOwnProperty("peripheralConnectedEvent")) {
                    object.peripheralConnectedEvent = $root.bleproxy.v1.PeripheralConnectedEvent.toObject(message.peripheralConnectedEvent, options);
                    if (options.oneofs)
                        object.event = "peripheralConnectedEvent";
                }
                if (message.peripheralDisconnectedEvent != null && message.hasOwnProperty("peripheralDisconnectedEvent")) {
                    object.peripheralDisconnectedEvent = $root.bleproxy.v1.PeripheralDisconnectedEvent.toObject(message.peripheralDisconnectedEvent, options);
                    if (options.oneofs)
                        object.event = "peripheralDisconnectedEvent";
                }
                if (message.characteristicValueUpdatedEvent != null && message.hasOwnProperty("characteristicValueUpdatedEvent")) {
                    object.characteristicValueUpdatedEvent = $root.bleproxy.v1.CharacteristicValueUpdatedEvent.toObject(message.characteristicValueUpdatedEvent, options);
                    if (options.oneofs)
                        object.event = "characteristicValueUpdatedEvent";
                }
                if (message.serverErrorEvent != null && message.hasOwnProperty("serverErrorEvent")) {
                    object.serverErrorEvent = $root.bleproxy.v1.ServerErrorEvent.toObject(message.serverErrorEvent, options);
                    if (options.oneofs)
                        object.event = "serverErrorEvent";
                }
                return object;
            };

            /**
             * Converts this WsEvent to JSON.
             * @function toJSON
             * @memberof bleproxy.v1.WsEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WsEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for WsEvent
             * @function getTypeUrl
             * @memberof bleproxy.v1.WsEvent
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            WsEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/bleproxy.v1.WsEvent";
            };

            return WsEvent;
        })();

        return v1;
    })();

    return bleproxy;
})();

module.exports = $root;
