"use strict";
/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function (global, factory) {
    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);
    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));
})(this, function ($protobuf) {
    "use strict";
    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    $root.blaze = (function () {
        /**
         * Namespace blaze.
         * @exports blaze
         * @namespace
         */
        var blaze = {};
        blaze.invocation_policy = (function () {
            /**
             * Namespace invocation_policy.
             * @memberof blaze
             * @namespace
             */
            var invocation_policy = {};
            invocation_policy.InvocationPolicy = (function () {
                /**
                 * Properties of an InvocationPolicy.
                 * @memberof blaze.invocation_policy
                 * @interface IInvocationPolicy
                 * @property {Array.<blaze.invocation_policy.IFlagPolicy>|null} [flagPolicies] InvocationPolicy flagPolicies
                 */
                /**
                 * Constructs a new InvocationPolicy.
                 * @memberof blaze.invocation_policy
                 * @classdesc Represents an InvocationPolicy.
                 * @implements IInvocationPolicy
                 * @constructor
                 * @param {blaze.invocation_policy.IInvocationPolicy=} [properties] Properties to set
                 */
                function InvocationPolicy(properties) {
                    this.flagPolicies = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
                /**
                 * InvocationPolicy flagPolicies.
                 * @member {Array.<blaze.invocation_policy.IFlagPolicy>} flagPolicies
                 * @memberof blaze.invocation_policy.InvocationPolicy
                 * @instance
                 */
                InvocationPolicy.prototype.flagPolicies = $util.emptyArray;
                /**
                 * Creates a new InvocationPolicy instance using the specified properties.
                 * @function create
                 * @memberof blaze.invocation_policy.InvocationPolicy
                 * @static
                 * @param {blaze.invocation_policy.IInvocationPolicy=} [properties] Properties to set
                 * @returns {blaze.invocation_policy.InvocationPolicy} InvocationPolicy instance
                 */
                InvocationPolicy.create = function create(properties) {
                    return new InvocationPolicy(properties);
                };
                /**
                 * Encodes the specified InvocationPolicy message. Does not implicitly {@link blaze.invocation_policy.InvocationPolicy.verify|verify} messages.
                 * @function encode
                 * @memberof blaze.invocation_policy.InvocationPolicy
                 * @static
                 * @param {blaze.invocation_policy.IInvocationPolicy} message InvocationPolicy message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InvocationPolicy.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.flagPolicies != null && message.flagPolicies.length)
                        for (var i = 0; i < message.flagPolicies.length; ++i)
                            $root.blaze.invocation_policy.FlagPolicy.encode(message.flagPolicies[i], writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
                    return writer;
                };
                /**
                 * Encodes the specified InvocationPolicy message, length delimited. Does not implicitly {@link blaze.invocation_policy.InvocationPolicy.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof blaze.invocation_policy.InvocationPolicy
                 * @static
                 * @param {blaze.invocation_policy.IInvocationPolicy} message InvocationPolicy message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InvocationPolicy.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
                /**
                 * Decodes an InvocationPolicy message from the specified reader or buffer.
                 * @function decode
                 * @memberof blaze.invocation_policy.InvocationPolicy
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {blaze.invocation_policy.InvocationPolicy} InvocationPolicy
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InvocationPolicy.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blaze.invocation_policy.InvocationPolicy();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                            case 1:
                                if (!(message.flagPolicies && message.flagPolicies.length))
                                    message.flagPolicies = [];
                                message.flagPolicies.push($root.blaze.invocation_policy.FlagPolicy.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };
                /**
                 * Decodes an InvocationPolicy message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof blaze.invocation_policy.InvocationPolicy
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {blaze.invocation_policy.InvocationPolicy} InvocationPolicy
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InvocationPolicy.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                /**
                 * Verifies an InvocationPolicy message.
                 * @function verify
                 * @memberof blaze.invocation_policy.InvocationPolicy
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InvocationPolicy.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.flagPolicies != null && message.hasOwnProperty("flagPolicies")) {
                        if (!Array.isArray(message.flagPolicies))
                            return "flagPolicies: array expected";
                        for (var i = 0; i < message.flagPolicies.length; ++i) {
                            var error = $root.blaze.invocation_policy.FlagPolicy.verify(message.flagPolicies[i]);
                            if (error)
                                return "flagPolicies." + error;
                        }
                    }
                    return null;
                };
                /**
                 * Creates an InvocationPolicy message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof blaze.invocation_policy.InvocationPolicy
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {blaze.invocation_policy.InvocationPolicy} InvocationPolicy
                 */
                InvocationPolicy.fromObject = function fromObject(object) {
                    if (object instanceof $root.blaze.invocation_policy.InvocationPolicy)
                        return object;
                    var message = new $root.blaze.invocation_policy.InvocationPolicy();
                    if (object.flagPolicies) {
                        if (!Array.isArray(object.flagPolicies))
                            throw TypeError(".blaze.invocation_policy.InvocationPolicy.flagPolicies: array expected");
                        message.flagPolicies = [];
                        for (var i = 0; i < object.flagPolicies.length; ++i) {
                            if (typeof object.flagPolicies[i] !== "object")
                                throw TypeError(".blaze.invocation_policy.InvocationPolicy.flagPolicies: object expected");
                            message.flagPolicies[i] = $root.blaze.invocation_policy.FlagPolicy.fromObject(object.flagPolicies[i]);
                        }
                    }
                    return message;
                };
                /**
                 * Creates a plain object from an InvocationPolicy message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof blaze.invocation_policy.InvocationPolicy
                 * @static
                 * @param {blaze.invocation_policy.InvocationPolicy} message InvocationPolicy
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InvocationPolicy.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.flagPolicies = [];
                    if (message.flagPolicies && message.flagPolicies.length) {
                        object.flagPolicies = [];
                        for (var j = 0; j < message.flagPolicies.length; ++j)
                            object.flagPolicies[j] = $root.blaze.invocation_policy.FlagPolicy.toObject(message.flagPolicies[j], options);
                    }
                    return object;
                };
                /**
                 * Converts this InvocationPolicy to JSON.
                 * @function toJSON
                 * @memberof blaze.invocation_policy.InvocationPolicy
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InvocationPolicy.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                return InvocationPolicy;
            })();
            invocation_policy.FlagPolicy = (function () {
                /**
                 * Properties of a FlagPolicy.
                 * @memberof blaze.invocation_policy
                 * @interface IFlagPolicy
                 * @property {string|null} [flagName] FlagPolicy flagName
                 * @property {Array.<string>|null} [commands] FlagPolicy commands
                 * @property {blaze.invocation_policy.ISetValue|null} [setValue] FlagPolicy setValue
                 * @property {blaze.invocation_policy.IUseDefault|null} [useDefault] FlagPolicy useDefault
                 * @property {blaze.invocation_policy.IDisallowValues|null} [disallowValues] FlagPolicy disallowValues
                 * @property {blaze.invocation_policy.IAllowValues|null} [allowValues] FlagPolicy allowValues
                 */
                /**
                 * Constructs a new FlagPolicy.
                 * @memberof blaze.invocation_policy
                 * @classdesc Represents a FlagPolicy.
                 * @implements IFlagPolicy
                 * @constructor
                 * @param {blaze.invocation_policy.IFlagPolicy=} [properties] Properties to set
                 */
                function FlagPolicy(properties) {
                    this.commands = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
                /**
                 * FlagPolicy flagName.
                 * @member {string} flagName
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @instance
                 */
                FlagPolicy.prototype.flagName = "";
                /**
                 * FlagPolicy commands.
                 * @member {Array.<string>} commands
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @instance
                 */
                FlagPolicy.prototype.commands = $util.emptyArray;
                /**
                 * FlagPolicy setValue.
                 * @member {blaze.invocation_policy.ISetValue|null|undefined} setValue
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @instance
                 */
                FlagPolicy.prototype.setValue = null;
                /**
                 * FlagPolicy useDefault.
                 * @member {blaze.invocation_policy.IUseDefault|null|undefined} useDefault
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @instance
                 */
                FlagPolicy.prototype.useDefault = null;
                /**
                 * FlagPolicy disallowValues.
                 * @member {blaze.invocation_policy.IDisallowValues|null|undefined} disallowValues
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @instance
                 */
                FlagPolicy.prototype.disallowValues = null;
                /**
                 * FlagPolicy allowValues.
                 * @member {blaze.invocation_policy.IAllowValues|null|undefined} allowValues
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @instance
                 */
                FlagPolicy.prototype.allowValues = null;
                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;
                /**
                 * FlagPolicy operation.
                 * @member {"setValue"|"useDefault"|"disallowValues"|"allowValues"|undefined} operation
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @instance
                 */
                Object.defineProperty(FlagPolicy.prototype, "operation", {
                    get: $util.oneOfGetter($oneOfFields = ["setValue", "useDefault", "disallowValues", "allowValues"]),
                    set: $util.oneOfSetter($oneOfFields)
                });
                /**
                 * Creates a new FlagPolicy instance using the specified properties.
                 * @function create
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @static
                 * @param {blaze.invocation_policy.IFlagPolicy=} [properties] Properties to set
                 * @returns {blaze.invocation_policy.FlagPolicy} FlagPolicy instance
                 */
                FlagPolicy.create = function create(properties) {
                    return new FlagPolicy(properties);
                };
                /**
                 * Encodes the specified FlagPolicy message. Does not implicitly {@link blaze.invocation_policy.FlagPolicy.verify|verify} messages.
                 * @function encode
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @static
                 * @param {blaze.invocation_policy.IFlagPolicy} message FlagPolicy message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FlagPolicy.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.flagName != null && message.hasOwnProperty("flagName"))
                        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.flagName);
                    if (message.commands != null && message.commands.length)
                        for (var i = 0; i < message.commands.length; ++i)
                            writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.commands[i]);
                    if (message.setValue != null && message.hasOwnProperty("setValue"))
                        $root.blaze.invocation_policy.SetValue.encode(message.setValue, writer.uint32(/* id 3, wireType 2 =*/ 26).fork()).ldelim();
                    if (message.useDefault != null && message.hasOwnProperty("useDefault"))
                        $root.blaze.invocation_policy.UseDefault.encode(message.useDefault, writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim();
                    if (message.disallowValues != null && message.hasOwnProperty("disallowValues"))
                        $root.blaze.invocation_policy.DisallowValues.encode(message.disallowValues, writer.uint32(/* id 5, wireType 2 =*/ 42).fork()).ldelim();
                    if (message.allowValues != null && message.hasOwnProperty("allowValues"))
                        $root.blaze.invocation_policy.AllowValues.encode(message.allowValues, writer.uint32(/* id 6, wireType 2 =*/ 50).fork()).ldelim();
                    return writer;
                };
                /**
                 * Encodes the specified FlagPolicy message, length delimited. Does not implicitly {@link blaze.invocation_policy.FlagPolicy.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @static
                 * @param {blaze.invocation_policy.IFlagPolicy} message FlagPolicy message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FlagPolicy.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
                /**
                 * Decodes a FlagPolicy message from the specified reader or buffer.
                 * @function decode
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {blaze.invocation_policy.FlagPolicy} FlagPolicy
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FlagPolicy.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blaze.invocation_policy.FlagPolicy();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                            case 1:
                                message.flagName = reader.string();
                                break;
                            case 2:
                                if (!(message.commands && message.commands.length))
                                    message.commands = [];
                                message.commands.push(reader.string());
                                break;
                            case 3:
                                message.setValue = $root.blaze.invocation_policy.SetValue.decode(reader, reader.uint32());
                                break;
                            case 4:
                                message.useDefault = $root.blaze.invocation_policy.UseDefault.decode(reader, reader.uint32());
                                break;
                            case 5:
                                message.disallowValues = $root.blaze.invocation_policy.DisallowValues.decode(reader, reader.uint32());
                                break;
                            case 6:
                                message.allowValues = $root.blaze.invocation_policy.AllowValues.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };
                /**
                 * Decodes a FlagPolicy message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {blaze.invocation_policy.FlagPolicy} FlagPolicy
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FlagPolicy.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                /**
                 * Verifies a FlagPolicy message.
                 * @function verify
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                FlagPolicy.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.flagName != null && message.hasOwnProperty("flagName"))
                        if (!$util.isString(message.flagName))
                            return "flagName: string expected";
                    if (message.commands != null && message.hasOwnProperty("commands")) {
                        if (!Array.isArray(message.commands))
                            return "commands: array expected";
                        for (var i = 0; i < message.commands.length; ++i)
                            if (!$util.isString(message.commands[i]))
                                return "commands: string[] expected";
                    }
                    if (message.setValue != null && message.hasOwnProperty("setValue")) {
                        properties.operation = 1;
                        {
                            var error = $root.blaze.invocation_policy.SetValue.verify(message.setValue);
                            if (error)
                                return "setValue." + error;
                        }
                    }
                    if (message.useDefault != null && message.hasOwnProperty("useDefault")) {
                        if (properties.operation === 1)
                            return "operation: multiple values";
                        properties.operation = 1;
                        {
                            var error = $root.blaze.invocation_policy.UseDefault.verify(message.useDefault);
                            if (error)
                                return "useDefault." + error;
                        }
                    }
                    if (message.disallowValues != null && message.hasOwnProperty("disallowValues")) {
                        if (properties.operation === 1)
                            return "operation: multiple values";
                        properties.operation = 1;
                        {
                            var error = $root.blaze.invocation_policy.DisallowValues.verify(message.disallowValues);
                            if (error)
                                return "disallowValues." + error;
                        }
                    }
                    if (message.allowValues != null && message.hasOwnProperty("allowValues")) {
                        if (properties.operation === 1)
                            return "operation: multiple values";
                        properties.operation = 1;
                        {
                            var error = $root.blaze.invocation_policy.AllowValues.verify(message.allowValues);
                            if (error)
                                return "allowValues." + error;
                        }
                    }
                    return null;
                };
                /**
                 * Creates a FlagPolicy message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {blaze.invocation_policy.FlagPolicy} FlagPolicy
                 */
                FlagPolicy.fromObject = function fromObject(object) {
                    if (object instanceof $root.blaze.invocation_policy.FlagPolicy)
                        return object;
                    var message = new $root.blaze.invocation_policy.FlagPolicy();
                    if (object.flagName != null)
                        message.flagName = String(object.flagName);
                    if (object.commands) {
                        if (!Array.isArray(object.commands))
                            throw TypeError(".blaze.invocation_policy.FlagPolicy.commands: array expected");
                        message.commands = [];
                        for (var i = 0; i < object.commands.length; ++i)
                            message.commands[i] = String(object.commands[i]);
                    }
                    if (object.setValue != null) {
                        if (typeof object.setValue !== "object")
                            throw TypeError(".blaze.invocation_policy.FlagPolicy.setValue: object expected");
                        message.setValue = $root.blaze.invocation_policy.SetValue.fromObject(object.setValue);
                    }
                    if (object.useDefault != null) {
                        if (typeof object.useDefault !== "object")
                            throw TypeError(".blaze.invocation_policy.FlagPolicy.useDefault: object expected");
                        message.useDefault = $root.blaze.invocation_policy.UseDefault.fromObject(object.useDefault);
                    }
                    if (object.disallowValues != null) {
                        if (typeof object.disallowValues !== "object")
                            throw TypeError(".blaze.invocation_policy.FlagPolicy.disallowValues: object expected");
                        message.disallowValues = $root.blaze.invocation_policy.DisallowValues.fromObject(object.disallowValues);
                    }
                    if (object.allowValues != null) {
                        if (typeof object.allowValues !== "object")
                            throw TypeError(".blaze.invocation_policy.FlagPolicy.allowValues: object expected");
                        message.allowValues = $root.blaze.invocation_policy.AllowValues.fromObject(object.allowValues);
                    }
                    return message;
                };
                /**
                 * Creates a plain object from a FlagPolicy message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @static
                 * @param {blaze.invocation_policy.FlagPolicy} message FlagPolicy
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                FlagPolicy.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.commands = [];
                    if (options.defaults)
                        object.flagName = "";
                    if (message.flagName != null && message.hasOwnProperty("flagName"))
                        object.flagName = message.flagName;
                    if (message.commands && message.commands.length) {
                        object.commands = [];
                        for (var j = 0; j < message.commands.length; ++j)
                            object.commands[j] = message.commands[j];
                    }
                    if (message.setValue != null && message.hasOwnProperty("setValue")) {
                        object.setValue = $root.blaze.invocation_policy.SetValue.toObject(message.setValue, options);
                        if (options.oneofs)
                            object.operation = "setValue";
                    }
                    if (message.useDefault != null && message.hasOwnProperty("useDefault")) {
                        object.useDefault = $root.blaze.invocation_policy.UseDefault.toObject(message.useDefault, options);
                        if (options.oneofs)
                            object.operation = "useDefault";
                    }
                    if (message.disallowValues != null && message.hasOwnProperty("disallowValues")) {
                        object.disallowValues = $root.blaze.invocation_policy.DisallowValues.toObject(message.disallowValues, options);
                        if (options.oneofs)
                            object.operation = "disallowValues";
                    }
                    if (message.allowValues != null && message.hasOwnProperty("allowValues")) {
                        object.allowValues = $root.blaze.invocation_policy.AllowValues.toObject(message.allowValues, options);
                        if (options.oneofs)
                            object.operation = "allowValues";
                    }
                    return object;
                };
                /**
                 * Converts this FlagPolicy to JSON.
                 * @function toJSON
                 * @memberof blaze.invocation_policy.FlagPolicy
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                FlagPolicy.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                return FlagPolicy;
            })();
            invocation_policy.SetValue = (function () {
                /**
                 * Properties of a SetValue.
                 * @memberof blaze.invocation_policy
                 * @interface ISetValue
                 * @property {Array.<string>|null} [flagValue] SetValue flagValue
                 * @property {boolean|null} [overridable] SetValue overridable
                 * @property {boolean|null} [append] SetValue append
                 */
                /**
                 * Constructs a new SetValue.
                 * @memberof blaze.invocation_policy
                 * @classdesc Represents a SetValue.
                 * @implements ISetValue
                 * @constructor
                 * @param {blaze.invocation_policy.ISetValue=} [properties] Properties to set
                 */
                function SetValue(properties) {
                    this.flagValue = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
                /**
                 * SetValue flagValue.
                 * @member {Array.<string>} flagValue
                 * @memberof blaze.invocation_policy.SetValue
                 * @instance
                 */
                SetValue.prototype.flagValue = $util.emptyArray;
                /**
                 * SetValue overridable.
                 * @member {boolean} overridable
                 * @memberof blaze.invocation_policy.SetValue
                 * @instance
                 */
                SetValue.prototype.overridable = false;
                /**
                 * SetValue append.
                 * @member {boolean} append
                 * @memberof blaze.invocation_policy.SetValue
                 * @instance
                 */
                SetValue.prototype.append = false;
                /**
                 * Creates a new SetValue instance using the specified properties.
                 * @function create
                 * @memberof blaze.invocation_policy.SetValue
                 * @static
                 * @param {blaze.invocation_policy.ISetValue=} [properties] Properties to set
                 * @returns {blaze.invocation_policy.SetValue} SetValue instance
                 */
                SetValue.create = function create(properties) {
                    return new SetValue(properties);
                };
                /**
                 * Encodes the specified SetValue message. Does not implicitly {@link blaze.invocation_policy.SetValue.verify|verify} messages.
                 * @function encode
                 * @memberof blaze.invocation_policy.SetValue
                 * @static
                 * @param {blaze.invocation_policy.ISetValue} message SetValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetValue.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.flagValue != null && message.flagValue.length)
                        for (var i = 0; i < message.flagValue.length; ++i)
                            writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.flagValue[i]);
                    if (message.overridable != null && message.hasOwnProperty("overridable"))
                        writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.overridable);
                    if (message.append != null && message.hasOwnProperty("append"))
                        writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.append);
                    return writer;
                };
                /**
                 * Encodes the specified SetValue message, length delimited. Does not implicitly {@link blaze.invocation_policy.SetValue.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof blaze.invocation_policy.SetValue
                 * @static
                 * @param {blaze.invocation_policy.ISetValue} message SetValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetValue.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
                /**
                 * Decodes a SetValue message from the specified reader or buffer.
                 * @function decode
                 * @memberof blaze.invocation_policy.SetValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {blaze.invocation_policy.SetValue} SetValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetValue.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blaze.invocation_policy.SetValue();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                            case 1:
                                if (!(message.flagValue && message.flagValue.length))
                                    message.flagValue = [];
                                message.flagValue.push(reader.string());
                                break;
                            case 2:
                                message.overridable = reader.bool();
                                break;
                            case 3:
                                message.append = reader.bool();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };
                /**
                 * Decodes a SetValue message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof blaze.invocation_policy.SetValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {blaze.invocation_policy.SetValue} SetValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetValue.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                /**
                 * Verifies a SetValue message.
                 * @function verify
                 * @memberof blaze.invocation_policy.SetValue
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SetValue.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.flagValue != null && message.hasOwnProperty("flagValue")) {
                        if (!Array.isArray(message.flagValue))
                            return "flagValue: array expected";
                        for (var i = 0; i < message.flagValue.length; ++i)
                            if (!$util.isString(message.flagValue[i]))
                                return "flagValue: string[] expected";
                    }
                    if (message.overridable != null && message.hasOwnProperty("overridable"))
                        if (typeof message.overridable !== "boolean")
                            return "overridable: boolean expected";
                    if (message.append != null && message.hasOwnProperty("append"))
                        if (typeof message.append !== "boolean")
                            return "append: boolean expected";
                    return null;
                };
                /**
                 * Creates a SetValue message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof blaze.invocation_policy.SetValue
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {blaze.invocation_policy.SetValue} SetValue
                 */
                SetValue.fromObject = function fromObject(object) {
                    if (object instanceof $root.blaze.invocation_policy.SetValue)
                        return object;
                    var message = new $root.blaze.invocation_policy.SetValue();
                    if (object.flagValue) {
                        if (!Array.isArray(object.flagValue))
                            throw TypeError(".blaze.invocation_policy.SetValue.flagValue: array expected");
                        message.flagValue = [];
                        for (var i = 0; i < object.flagValue.length; ++i)
                            message.flagValue[i] = String(object.flagValue[i]);
                    }
                    if (object.overridable != null)
                        message.overridable = Boolean(object.overridable);
                    if (object.append != null)
                        message.append = Boolean(object.append);
                    return message;
                };
                /**
                 * Creates a plain object from a SetValue message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof blaze.invocation_policy.SetValue
                 * @static
                 * @param {blaze.invocation_policy.SetValue} message SetValue
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SetValue.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.flagValue = [];
                    if (options.defaults) {
                        object.overridable = false;
                        object.append = false;
                    }
                    if (message.flagValue && message.flagValue.length) {
                        object.flagValue = [];
                        for (var j = 0; j < message.flagValue.length; ++j)
                            object.flagValue[j] = message.flagValue[j];
                    }
                    if (message.overridable != null && message.hasOwnProperty("overridable"))
                        object.overridable = message.overridable;
                    if (message.append != null && message.hasOwnProperty("append"))
                        object.append = message.append;
                    return object;
                };
                /**
                 * Converts this SetValue to JSON.
                 * @function toJSON
                 * @memberof blaze.invocation_policy.SetValue
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SetValue.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                return SetValue;
            })();
            invocation_policy.UseDefault = (function () {
                /**
                 * Properties of a UseDefault.
                 * @memberof blaze.invocation_policy
                 * @interface IUseDefault
                 */
                /**
                 * Constructs a new UseDefault.
                 * @memberof blaze.invocation_policy
                 * @classdesc Represents a UseDefault.
                 * @implements IUseDefault
                 * @constructor
                 * @param {blaze.invocation_policy.IUseDefault=} [properties] Properties to set
                 */
                function UseDefault(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
                /**
                 * Creates a new UseDefault instance using the specified properties.
                 * @function create
                 * @memberof blaze.invocation_policy.UseDefault
                 * @static
                 * @param {blaze.invocation_policy.IUseDefault=} [properties] Properties to set
                 * @returns {blaze.invocation_policy.UseDefault} UseDefault instance
                 */
                UseDefault.create = function create(properties) {
                    return new UseDefault(properties);
                };
                /**
                 * Encodes the specified UseDefault message. Does not implicitly {@link blaze.invocation_policy.UseDefault.verify|verify} messages.
                 * @function encode
                 * @memberof blaze.invocation_policy.UseDefault
                 * @static
                 * @param {blaze.invocation_policy.IUseDefault} message UseDefault message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UseDefault.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };
                /**
                 * Encodes the specified UseDefault message, length delimited. Does not implicitly {@link blaze.invocation_policy.UseDefault.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof blaze.invocation_policy.UseDefault
                 * @static
                 * @param {blaze.invocation_policy.IUseDefault} message UseDefault message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UseDefault.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
                /**
                 * Decodes a UseDefault message from the specified reader or buffer.
                 * @function decode
                 * @memberof blaze.invocation_policy.UseDefault
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {blaze.invocation_policy.UseDefault} UseDefault
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UseDefault.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blaze.invocation_policy.UseDefault();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };
                /**
                 * Decodes a UseDefault message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof blaze.invocation_policy.UseDefault
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {blaze.invocation_policy.UseDefault} UseDefault
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UseDefault.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                /**
                 * Verifies a UseDefault message.
                 * @function verify
                 * @memberof blaze.invocation_policy.UseDefault
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                UseDefault.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };
                /**
                 * Creates a UseDefault message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof blaze.invocation_policy.UseDefault
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {blaze.invocation_policy.UseDefault} UseDefault
                 */
                UseDefault.fromObject = function fromObject(object) {
                    if (object instanceof $root.blaze.invocation_policy.UseDefault)
                        return object;
                    return new $root.blaze.invocation_policy.UseDefault();
                };
                /**
                 * Creates a plain object from a UseDefault message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof blaze.invocation_policy.UseDefault
                 * @static
                 * @param {blaze.invocation_policy.UseDefault} message UseDefault
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                UseDefault.toObject = function toObject() {
                    return {};
                };
                /**
                 * Converts this UseDefault to JSON.
                 * @function toJSON
                 * @memberof blaze.invocation_policy.UseDefault
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                UseDefault.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                return UseDefault;
            })();
            invocation_policy.DisallowValues = (function () {
                /**
                 * Properties of a DisallowValues.
                 * @memberof blaze.invocation_policy
                 * @interface IDisallowValues
                 * @property {Array.<string>|null} [disallowedValues] DisallowValues disallowedValues
                 * @property {string|null} [newValue] DisallowValues newValue
                 * @property {blaze.invocation_policy.IUseDefault|null} [useDefault] DisallowValues useDefault
                 */
                /**
                 * Constructs a new DisallowValues.
                 * @memberof blaze.invocation_policy
                 * @classdesc Represents a DisallowValues.
                 * @implements IDisallowValues
                 * @constructor
                 * @param {blaze.invocation_policy.IDisallowValues=} [properties] Properties to set
                 */
                function DisallowValues(properties) {
                    this.disallowedValues = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
                /**
                 * DisallowValues disallowedValues.
                 * @member {Array.<string>} disallowedValues
                 * @memberof blaze.invocation_policy.DisallowValues
                 * @instance
                 */
                DisallowValues.prototype.disallowedValues = $util.emptyArray;
                /**
                 * DisallowValues newValue.
                 * @member {string} newValue
                 * @memberof blaze.invocation_policy.DisallowValues
                 * @instance
                 */
                DisallowValues.prototype.newValue = "";
                /**
                 * DisallowValues useDefault.
                 * @member {blaze.invocation_policy.IUseDefault|null|undefined} useDefault
                 * @memberof blaze.invocation_policy.DisallowValues
                 * @instance
                 */
                DisallowValues.prototype.useDefault = null;
                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;
                /**
                 * DisallowValues replacementValue.
                 * @member {"newValue"|"useDefault"|undefined} replacementValue
                 * @memberof blaze.invocation_policy.DisallowValues
                 * @instance
                 */
                Object.defineProperty(DisallowValues.prototype, "replacementValue", {
                    get: $util.oneOfGetter($oneOfFields = ["newValue", "useDefault"]),
                    set: $util.oneOfSetter($oneOfFields)
                });
                /**
                 * Creates a new DisallowValues instance using the specified properties.
                 * @function create
                 * @memberof blaze.invocation_policy.DisallowValues
                 * @static
                 * @param {blaze.invocation_policy.IDisallowValues=} [properties] Properties to set
                 * @returns {blaze.invocation_policy.DisallowValues} DisallowValues instance
                 */
                DisallowValues.create = function create(properties) {
                    return new DisallowValues(properties);
                };
                /**
                 * Encodes the specified DisallowValues message. Does not implicitly {@link blaze.invocation_policy.DisallowValues.verify|verify} messages.
                 * @function encode
                 * @memberof blaze.invocation_policy.DisallowValues
                 * @static
                 * @param {blaze.invocation_policy.IDisallowValues} message DisallowValues message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DisallowValues.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.disallowedValues != null && message.disallowedValues.length)
                        for (var i = 0; i < message.disallowedValues.length; ++i)
                            writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.disallowedValues[i]);
                    if (message.newValue != null && message.hasOwnProperty("newValue"))
                        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.newValue);
                    if (message.useDefault != null && message.hasOwnProperty("useDefault"))
                        $root.blaze.invocation_policy.UseDefault.encode(message.useDefault, writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim();
                    return writer;
                };
                /**
                 * Encodes the specified DisallowValues message, length delimited. Does not implicitly {@link blaze.invocation_policy.DisallowValues.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof blaze.invocation_policy.DisallowValues
                 * @static
                 * @param {blaze.invocation_policy.IDisallowValues} message DisallowValues message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DisallowValues.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
                /**
                 * Decodes a DisallowValues message from the specified reader or buffer.
                 * @function decode
                 * @memberof blaze.invocation_policy.DisallowValues
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {blaze.invocation_policy.DisallowValues} DisallowValues
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DisallowValues.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blaze.invocation_policy.DisallowValues();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                            case 1:
                                if (!(message.disallowedValues && message.disallowedValues.length))
                                    message.disallowedValues = [];
                                message.disallowedValues.push(reader.string());
                                break;
                            case 3:
                                message.newValue = reader.string();
                                break;
                            case 4:
                                message.useDefault = $root.blaze.invocation_policy.UseDefault.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };
                /**
                 * Decodes a DisallowValues message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof blaze.invocation_policy.DisallowValues
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {blaze.invocation_policy.DisallowValues} DisallowValues
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DisallowValues.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                /**
                 * Verifies a DisallowValues message.
                 * @function verify
                 * @memberof blaze.invocation_policy.DisallowValues
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DisallowValues.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.disallowedValues != null && message.hasOwnProperty("disallowedValues")) {
                        if (!Array.isArray(message.disallowedValues))
                            return "disallowedValues: array expected";
                        for (var i = 0; i < message.disallowedValues.length; ++i)
                            if (!$util.isString(message.disallowedValues[i]))
                                return "disallowedValues: string[] expected";
                    }
                    if (message.newValue != null && message.hasOwnProperty("newValue")) {
                        properties.replacementValue = 1;
                        if (!$util.isString(message.newValue))
                            return "newValue: string expected";
                    }
                    if (message.useDefault != null && message.hasOwnProperty("useDefault")) {
                        if (properties.replacementValue === 1)
                            return "replacementValue: multiple values";
                        properties.replacementValue = 1;
                        {
                            var error = $root.blaze.invocation_policy.UseDefault.verify(message.useDefault);
                            if (error)
                                return "useDefault." + error;
                        }
                    }
                    return null;
                };
                /**
                 * Creates a DisallowValues message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof blaze.invocation_policy.DisallowValues
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {blaze.invocation_policy.DisallowValues} DisallowValues
                 */
                DisallowValues.fromObject = function fromObject(object) {
                    if (object instanceof $root.blaze.invocation_policy.DisallowValues)
                        return object;
                    var message = new $root.blaze.invocation_policy.DisallowValues();
                    if (object.disallowedValues) {
                        if (!Array.isArray(object.disallowedValues))
                            throw TypeError(".blaze.invocation_policy.DisallowValues.disallowedValues: array expected");
                        message.disallowedValues = [];
                        for (var i = 0; i < object.disallowedValues.length; ++i)
                            message.disallowedValues[i] = String(object.disallowedValues[i]);
                    }
                    if (object.newValue != null)
                        message.newValue = String(object.newValue);
                    if (object.useDefault != null) {
                        if (typeof object.useDefault !== "object")
                            throw TypeError(".blaze.invocation_policy.DisallowValues.useDefault: object expected");
                        message.useDefault = $root.blaze.invocation_policy.UseDefault.fromObject(object.useDefault);
                    }
                    return message;
                };
                /**
                 * Creates a plain object from a DisallowValues message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof blaze.invocation_policy.DisallowValues
                 * @static
                 * @param {blaze.invocation_policy.DisallowValues} message DisallowValues
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DisallowValues.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.disallowedValues = [];
                    if (message.disallowedValues && message.disallowedValues.length) {
                        object.disallowedValues = [];
                        for (var j = 0; j < message.disallowedValues.length; ++j)
                            object.disallowedValues[j] = message.disallowedValues[j];
                    }
                    if (message.newValue != null && message.hasOwnProperty("newValue")) {
                        object.newValue = message.newValue;
                        if (options.oneofs)
                            object.replacementValue = "newValue";
                    }
                    if (message.useDefault != null && message.hasOwnProperty("useDefault")) {
                        object.useDefault = $root.blaze.invocation_policy.UseDefault.toObject(message.useDefault, options);
                        if (options.oneofs)
                            object.replacementValue = "useDefault";
                    }
                    return object;
                };
                /**
                 * Converts this DisallowValues to JSON.
                 * @function toJSON
                 * @memberof blaze.invocation_policy.DisallowValues
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DisallowValues.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                return DisallowValues;
            })();
            invocation_policy.AllowValues = (function () {
                /**
                 * Properties of an AllowValues.
                 * @memberof blaze.invocation_policy
                 * @interface IAllowValues
                 * @property {Array.<string>|null} [allowedValues] AllowValues allowedValues
                 * @property {string|null} [newValue] AllowValues newValue
                 * @property {blaze.invocation_policy.IUseDefault|null} [useDefault] AllowValues useDefault
                 */
                /**
                 * Constructs a new AllowValues.
                 * @memberof blaze.invocation_policy
                 * @classdesc Represents an AllowValues.
                 * @implements IAllowValues
                 * @constructor
                 * @param {blaze.invocation_policy.IAllowValues=} [properties] Properties to set
                 */
                function AllowValues(properties) {
                    this.allowedValues = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
                /**
                 * AllowValues allowedValues.
                 * @member {Array.<string>} allowedValues
                 * @memberof blaze.invocation_policy.AllowValues
                 * @instance
                 */
                AllowValues.prototype.allowedValues = $util.emptyArray;
                /**
                 * AllowValues newValue.
                 * @member {string} newValue
                 * @memberof blaze.invocation_policy.AllowValues
                 * @instance
                 */
                AllowValues.prototype.newValue = "";
                /**
                 * AllowValues useDefault.
                 * @member {blaze.invocation_policy.IUseDefault|null|undefined} useDefault
                 * @memberof blaze.invocation_policy.AllowValues
                 * @instance
                 */
                AllowValues.prototype.useDefault = null;
                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;
                /**
                 * AllowValues replacementValue.
                 * @member {"newValue"|"useDefault"|undefined} replacementValue
                 * @memberof blaze.invocation_policy.AllowValues
                 * @instance
                 */
                Object.defineProperty(AllowValues.prototype, "replacementValue", {
                    get: $util.oneOfGetter($oneOfFields = ["newValue", "useDefault"]),
                    set: $util.oneOfSetter($oneOfFields)
                });
                /**
                 * Creates a new AllowValues instance using the specified properties.
                 * @function create
                 * @memberof blaze.invocation_policy.AllowValues
                 * @static
                 * @param {blaze.invocation_policy.IAllowValues=} [properties] Properties to set
                 * @returns {blaze.invocation_policy.AllowValues} AllowValues instance
                 */
                AllowValues.create = function create(properties) {
                    return new AllowValues(properties);
                };
                /**
                 * Encodes the specified AllowValues message. Does not implicitly {@link blaze.invocation_policy.AllowValues.verify|verify} messages.
                 * @function encode
                 * @memberof blaze.invocation_policy.AllowValues
                 * @static
                 * @param {blaze.invocation_policy.IAllowValues} message AllowValues message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AllowValues.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.allowedValues != null && message.allowedValues.length)
                        for (var i = 0; i < message.allowedValues.length; ++i)
                            writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.allowedValues[i]);
                    if (message.newValue != null && message.hasOwnProperty("newValue"))
                        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.newValue);
                    if (message.useDefault != null && message.hasOwnProperty("useDefault"))
                        $root.blaze.invocation_policy.UseDefault.encode(message.useDefault, writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim();
                    return writer;
                };
                /**
                 * Encodes the specified AllowValues message, length delimited. Does not implicitly {@link blaze.invocation_policy.AllowValues.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof blaze.invocation_policy.AllowValues
                 * @static
                 * @param {blaze.invocation_policy.IAllowValues} message AllowValues message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AllowValues.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
                /**
                 * Decodes an AllowValues message from the specified reader or buffer.
                 * @function decode
                 * @memberof blaze.invocation_policy.AllowValues
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {blaze.invocation_policy.AllowValues} AllowValues
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AllowValues.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.blaze.invocation_policy.AllowValues();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                            case 1:
                                if (!(message.allowedValues && message.allowedValues.length))
                                    message.allowedValues = [];
                                message.allowedValues.push(reader.string());
                                break;
                            case 3:
                                message.newValue = reader.string();
                                break;
                            case 4:
                                message.useDefault = $root.blaze.invocation_policy.UseDefault.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };
                /**
                 * Decodes an AllowValues message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof blaze.invocation_policy.AllowValues
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {blaze.invocation_policy.AllowValues} AllowValues
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AllowValues.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                /**
                 * Verifies an AllowValues message.
                 * @function verify
                 * @memberof blaze.invocation_policy.AllowValues
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AllowValues.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.allowedValues != null && message.hasOwnProperty("allowedValues")) {
                        if (!Array.isArray(message.allowedValues))
                            return "allowedValues: array expected";
                        for (var i = 0; i < message.allowedValues.length; ++i)
                            if (!$util.isString(message.allowedValues[i]))
                                return "allowedValues: string[] expected";
                    }
                    if (message.newValue != null && message.hasOwnProperty("newValue")) {
                        properties.replacementValue = 1;
                        if (!$util.isString(message.newValue))
                            return "newValue: string expected";
                    }
                    if (message.useDefault != null && message.hasOwnProperty("useDefault")) {
                        if (properties.replacementValue === 1)
                            return "replacementValue: multiple values";
                        properties.replacementValue = 1;
                        {
                            var error = $root.blaze.invocation_policy.UseDefault.verify(message.useDefault);
                            if (error)
                                return "useDefault." + error;
                        }
                    }
                    return null;
                };
                /**
                 * Creates an AllowValues message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof blaze.invocation_policy.AllowValues
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {blaze.invocation_policy.AllowValues} AllowValues
                 */
                AllowValues.fromObject = function fromObject(object) {
                    if (object instanceof $root.blaze.invocation_policy.AllowValues)
                        return object;
                    var message = new $root.blaze.invocation_policy.AllowValues();
                    if (object.allowedValues) {
                        if (!Array.isArray(object.allowedValues))
                            throw TypeError(".blaze.invocation_policy.AllowValues.allowedValues: array expected");
                        message.allowedValues = [];
                        for (var i = 0; i < object.allowedValues.length; ++i)
                            message.allowedValues[i] = String(object.allowedValues[i]);
                    }
                    if (object.newValue != null)
                        message.newValue = String(object.newValue);
                    if (object.useDefault != null) {
                        if (typeof object.useDefault !== "object")
                            throw TypeError(".blaze.invocation_policy.AllowValues.useDefault: object expected");
                        message.useDefault = $root.blaze.invocation_policy.UseDefault.fromObject(object.useDefault);
                    }
                    return message;
                };
                /**
                 * Creates a plain object from an AllowValues message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof blaze.invocation_policy.AllowValues
                 * @static
                 * @param {blaze.invocation_policy.AllowValues} message AllowValues
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AllowValues.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.allowedValues = [];
                    if (message.allowedValues && message.allowedValues.length) {
                        object.allowedValues = [];
                        for (var j = 0; j < message.allowedValues.length; ++j)
                            object.allowedValues[j] = message.allowedValues[j];
                    }
                    if (message.newValue != null && message.hasOwnProperty("newValue")) {
                        object.newValue = message.newValue;
                        if (options.oneofs)
                            object.replacementValue = "newValue";
                    }
                    if (message.useDefault != null && message.hasOwnProperty("useDefault")) {
                        object.useDefault = $root.blaze.invocation_policy.UseDefault.toObject(message.useDefault, options);
                        if (options.oneofs)
                            object.replacementValue = "useDefault";
                    }
                    return object;
                };
                /**
                 * Converts this AllowValues to JSON.
                 * @function toJSON
                 * @memberof blaze.invocation_policy.AllowValues
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AllowValues.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                return AllowValues;
            })();
            return invocation_policy;
        })();
        return blaze;
    })();
    return $root;
});
//# sourceMappingURL=invocation_policy.js.map