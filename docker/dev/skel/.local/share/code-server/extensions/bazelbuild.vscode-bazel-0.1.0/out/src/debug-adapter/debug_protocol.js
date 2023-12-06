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
    $root.skylark_debugging = (function () {
        /**
         * Namespace skylark_debugging.
         * @exports skylark_debugging
         * @namespace
         */
        var skylark_debugging = {};
        skylark_debugging.DebugRequest = (function () {
            /**
             * Properties of a DebugRequest.
             * @memberof skylark_debugging
             * @interface IDebugRequest
             * @property {number|Long|null} [sequenceNumber] DebugRequest sequenceNumber
             * @property {skylark_debugging.ISetBreakpointsRequest|null} [setBreakpoints] DebugRequest setBreakpoints
             * @property {skylark_debugging.IContinueExecutionRequest|null} [continueExecution] DebugRequest continueExecution
             * @property {skylark_debugging.IEvaluateRequest|null} [evaluate] DebugRequest evaluate
             * @property {skylark_debugging.IListFramesRequest|null} [listFrames] DebugRequest listFrames
             * @property {skylark_debugging.IStartDebuggingRequest|null} [startDebugging] DebugRequest startDebugging
             * @property {skylark_debugging.IPauseThreadRequest|null} [pauseThread] DebugRequest pauseThread
             * @property {skylark_debugging.IGetChildrenRequest|null} [getChildren] DebugRequest getChildren
             */
            /**
             * Constructs a new DebugRequest.
             * @memberof skylark_debugging
             * @classdesc Represents a DebugRequest.
             * @implements IDebugRequest
             * @constructor
             * @param {skylark_debugging.IDebugRequest=} [properties] Properties to set
             */
            function DebugRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * DebugRequest sequenceNumber.
             * @member {number|Long} sequenceNumber
             * @memberof skylark_debugging.DebugRequest
             * @instance
             */
            DebugRequest.prototype.sequenceNumber = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * DebugRequest setBreakpoints.
             * @member {skylark_debugging.ISetBreakpointsRequest|null|undefined} setBreakpoints
             * @memberof skylark_debugging.DebugRequest
             * @instance
             */
            DebugRequest.prototype.setBreakpoints = null;
            /**
             * DebugRequest continueExecution.
             * @member {skylark_debugging.IContinueExecutionRequest|null|undefined} continueExecution
             * @memberof skylark_debugging.DebugRequest
             * @instance
             */
            DebugRequest.prototype.continueExecution = null;
            /**
             * DebugRequest evaluate.
             * @member {skylark_debugging.IEvaluateRequest|null|undefined} evaluate
             * @memberof skylark_debugging.DebugRequest
             * @instance
             */
            DebugRequest.prototype.evaluate = null;
            /**
             * DebugRequest listFrames.
             * @member {skylark_debugging.IListFramesRequest|null|undefined} listFrames
             * @memberof skylark_debugging.DebugRequest
             * @instance
             */
            DebugRequest.prototype.listFrames = null;
            /**
             * DebugRequest startDebugging.
             * @member {skylark_debugging.IStartDebuggingRequest|null|undefined} startDebugging
             * @memberof skylark_debugging.DebugRequest
             * @instance
             */
            DebugRequest.prototype.startDebugging = null;
            /**
             * DebugRequest pauseThread.
             * @member {skylark_debugging.IPauseThreadRequest|null|undefined} pauseThread
             * @memberof skylark_debugging.DebugRequest
             * @instance
             */
            DebugRequest.prototype.pauseThread = null;
            /**
             * DebugRequest getChildren.
             * @member {skylark_debugging.IGetChildrenRequest|null|undefined} getChildren
             * @memberof skylark_debugging.DebugRequest
             * @instance
             */
            DebugRequest.prototype.getChildren = null;
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
            /**
             * DebugRequest payload.
             * @member {"setBreakpoints"|"continueExecution"|"evaluate"|"listFrames"|"startDebugging"|"pauseThread"|"getChildren"|undefined} payload
             * @memberof skylark_debugging.DebugRequest
             * @instance
             */
            Object.defineProperty(DebugRequest.prototype, "payload", {
                get: $util.oneOfGetter($oneOfFields = ["setBreakpoints", "continueExecution", "evaluate", "listFrames", "startDebugging", "pauseThread", "getChildren"]),
                set: $util.oneOfSetter($oneOfFields)
            });
            /**
             * Creates a new DebugRequest instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.DebugRequest
             * @static
             * @param {skylark_debugging.IDebugRequest=} [properties] Properties to set
             * @returns {skylark_debugging.DebugRequest} DebugRequest instance
             */
            DebugRequest.create = function create(properties) {
                return new DebugRequest(properties);
            };
            /**
             * Encodes the specified DebugRequest message. Does not implicitly {@link skylark_debugging.DebugRequest.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.DebugRequest
             * @static
             * @param {skylark_debugging.IDebugRequest} message DebugRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DebugRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.sequenceNumber != null && message.hasOwnProperty("sequenceNumber"))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.sequenceNumber);
                if (message.setBreakpoints != null && message.hasOwnProperty("setBreakpoints"))
                    $root.skylark_debugging.SetBreakpointsRequest.encode(message.setBreakpoints, writer.uint32(/* id 101, wireType 2 =*/ 810).fork()).ldelim();
                if (message.continueExecution != null && message.hasOwnProperty("continueExecution"))
                    $root.skylark_debugging.ContinueExecutionRequest.encode(message.continueExecution, writer.uint32(/* id 102, wireType 2 =*/ 818).fork()).ldelim();
                if (message.evaluate != null && message.hasOwnProperty("evaluate"))
                    $root.skylark_debugging.EvaluateRequest.encode(message.evaluate, writer.uint32(/* id 103, wireType 2 =*/ 826).fork()).ldelim();
                if (message.listFrames != null && message.hasOwnProperty("listFrames"))
                    $root.skylark_debugging.ListFramesRequest.encode(message.listFrames, writer.uint32(/* id 104, wireType 2 =*/ 834).fork()).ldelim();
                if (message.startDebugging != null && message.hasOwnProperty("startDebugging"))
                    $root.skylark_debugging.StartDebuggingRequest.encode(message.startDebugging, writer.uint32(/* id 105, wireType 2 =*/ 842).fork()).ldelim();
                if (message.pauseThread != null && message.hasOwnProperty("pauseThread"))
                    $root.skylark_debugging.PauseThreadRequest.encode(message.pauseThread, writer.uint32(/* id 106, wireType 2 =*/ 850).fork()).ldelim();
                if (message.getChildren != null && message.hasOwnProperty("getChildren"))
                    $root.skylark_debugging.GetChildrenRequest.encode(message.getChildren, writer.uint32(/* id 107, wireType 2 =*/ 858).fork()).ldelim();
                return writer;
            };
            /**
             * Encodes the specified DebugRequest message, length delimited. Does not implicitly {@link skylark_debugging.DebugRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.DebugRequest
             * @static
             * @param {skylark_debugging.IDebugRequest} message DebugRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DebugRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a DebugRequest message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.DebugRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.DebugRequest} DebugRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DebugRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.DebugRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.sequenceNumber = reader.int64();
                            break;
                        case 101:
                            message.setBreakpoints = $root.skylark_debugging.SetBreakpointsRequest.decode(reader, reader.uint32());
                            break;
                        case 102:
                            message.continueExecution = $root.skylark_debugging.ContinueExecutionRequest.decode(reader, reader.uint32());
                            break;
                        case 103:
                            message.evaluate = $root.skylark_debugging.EvaluateRequest.decode(reader, reader.uint32());
                            break;
                        case 104:
                            message.listFrames = $root.skylark_debugging.ListFramesRequest.decode(reader, reader.uint32());
                            break;
                        case 105:
                            message.startDebugging = $root.skylark_debugging.StartDebuggingRequest.decode(reader, reader.uint32());
                            break;
                        case 106:
                            message.pauseThread = $root.skylark_debugging.PauseThreadRequest.decode(reader, reader.uint32());
                            break;
                        case 107:
                            message.getChildren = $root.skylark_debugging.GetChildrenRequest.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a DebugRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.DebugRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.DebugRequest} DebugRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DebugRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a DebugRequest message.
             * @function verify
             * @memberof skylark_debugging.DebugRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DebugRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.sequenceNumber != null && message.hasOwnProperty("sequenceNumber"))
                    if (!$util.isInteger(message.sequenceNumber) && !(message.sequenceNumber && $util.isInteger(message.sequenceNumber.low) && $util.isInteger(message.sequenceNumber.high)))
                        return "sequenceNumber: integer|Long expected";
                if (message.setBreakpoints != null && message.hasOwnProperty("setBreakpoints")) {
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.SetBreakpointsRequest.verify(message.setBreakpoints);
                        if (error)
                            return "setBreakpoints." + error;
                    }
                }
                if (message.continueExecution != null && message.hasOwnProperty("continueExecution")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.ContinueExecutionRequest.verify(message.continueExecution);
                        if (error)
                            return "continueExecution." + error;
                    }
                }
                if (message.evaluate != null && message.hasOwnProperty("evaluate")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.EvaluateRequest.verify(message.evaluate);
                        if (error)
                            return "evaluate." + error;
                    }
                }
                if (message.listFrames != null && message.hasOwnProperty("listFrames")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.ListFramesRequest.verify(message.listFrames);
                        if (error)
                            return "listFrames." + error;
                    }
                }
                if (message.startDebugging != null && message.hasOwnProperty("startDebugging")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.StartDebuggingRequest.verify(message.startDebugging);
                        if (error)
                            return "startDebugging." + error;
                    }
                }
                if (message.pauseThread != null && message.hasOwnProperty("pauseThread")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.PauseThreadRequest.verify(message.pauseThread);
                        if (error)
                            return "pauseThread." + error;
                    }
                }
                if (message.getChildren != null && message.hasOwnProperty("getChildren")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.GetChildrenRequest.verify(message.getChildren);
                        if (error)
                            return "getChildren." + error;
                    }
                }
                return null;
            };
            /**
             * Creates a DebugRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.DebugRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.DebugRequest} DebugRequest
             */
            DebugRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.DebugRequest)
                    return object;
                var message = new $root.skylark_debugging.DebugRequest();
                if (object.sequenceNumber != null)
                    if ($util.Long)
                        (message.sequenceNumber = $util.Long.fromValue(object.sequenceNumber)).unsigned = false;
                    else if (typeof object.sequenceNumber === "string")
                        message.sequenceNumber = parseInt(object.sequenceNumber, 10);
                    else if (typeof object.sequenceNumber === "number")
                        message.sequenceNumber = object.sequenceNumber;
                    else if (typeof object.sequenceNumber === "object")
                        message.sequenceNumber = new $util.LongBits(object.sequenceNumber.low >>> 0, object.sequenceNumber.high >>> 0).toNumber();
                if (object.setBreakpoints != null) {
                    if (typeof object.setBreakpoints !== "object")
                        throw TypeError(".skylark_debugging.DebugRequest.setBreakpoints: object expected");
                    message.setBreakpoints = $root.skylark_debugging.SetBreakpointsRequest.fromObject(object.setBreakpoints);
                }
                if (object.continueExecution != null) {
                    if (typeof object.continueExecution !== "object")
                        throw TypeError(".skylark_debugging.DebugRequest.continueExecution: object expected");
                    message.continueExecution = $root.skylark_debugging.ContinueExecutionRequest.fromObject(object.continueExecution);
                }
                if (object.evaluate != null) {
                    if (typeof object.evaluate !== "object")
                        throw TypeError(".skylark_debugging.DebugRequest.evaluate: object expected");
                    message.evaluate = $root.skylark_debugging.EvaluateRequest.fromObject(object.evaluate);
                }
                if (object.listFrames != null) {
                    if (typeof object.listFrames !== "object")
                        throw TypeError(".skylark_debugging.DebugRequest.listFrames: object expected");
                    message.listFrames = $root.skylark_debugging.ListFramesRequest.fromObject(object.listFrames);
                }
                if (object.startDebugging != null) {
                    if (typeof object.startDebugging !== "object")
                        throw TypeError(".skylark_debugging.DebugRequest.startDebugging: object expected");
                    message.startDebugging = $root.skylark_debugging.StartDebuggingRequest.fromObject(object.startDebugging);
                }
                if (object.pauseThread != null) {
                    if (typeof object.pauseThread !== "object")
                        throw TypeError(".skylark_debugging.DebugRequest.pauseThread: object expected");
                    message.pauseThread = $root.skylark_debugging.PauseThreadRequest.fromObject(object.pauseThread);
                }
                if (object.getChildren != null) {
                    if (typeof object.getChildren !== "object")
                        throw TypeError(".skylark_debugging.DebugRequest.getChildren: object expected");
                    message.getChildren = $root.skylark_debugging.GetChildrenRequest.fromObject(object.getChildren);
                }
                return message;
            };
            /**
             * Creates a plain object from a DebugRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.DebugRequest
             * @static
             * @param {skylark_debugging.DebugRequest} message DebugRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DebugRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.sequenceNumber = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.sequenceNumber = options.longs === String ? "0" : 0;
                if (message.sequenceNumber != null && message.hasOwnProperty("sequenceNumber"))
                    if (typeof message.sequenceNumber === "number")
                        object.sequenceNumber = options.longs === String ? String(message.sequenceNumber) : message.sequenceNumber;
                    else
                        object.sequenceNumber = options.longs === String ? $util.Long.prototype.toString.call(message.sequenceNumber) : options.longs === Number ? new $util.LongBits(message.sequenceNumber.low >>> 0, message.sequenceNumber.high >>> 0).toNumber() : message.sequenceNumber;
                if (message.setBreakpoints != null && message.hasOwnProperty("setBreakpoints")) {
                    object.setBreakpoints = $root.skylark_debugging.SetBreakpointsRequest.toObject(message.setBreakpoints, options);
                    if (options.oneofs)
                        object.payload = "setBreakpoints";
                }
                if (message.continueExecution != null && message.hasOwnProperty("continueExecution")) {
                    object.continueExecution = $root.skylark_debugging.ContinueExecutionRequest.toObject(message.continueExecution, options);
                    if (options.oneofs)
                        object.payload = "continueExecution";
                }
                if (message.evaluate != null && message.hasOwnProperty("evaluate")) {
                    object.evaluate = $root.skylark_debugging.EvaluateRequest.toObject(message.evaluate, options);
                    if (options.oneofs)
                        object.payload = "evaluate";
                }
                if (message.listFrames != null && message.hasOwnProperty("listFrames")) {
                    object.listFrames = $root.skylark_debugging.ListFramesRequest.toObject(message.listFrames, options);
                    if (options.oneofs)
                        object.payload = "listFrames";
                }
                if (message.startDebugging != null && message.hasOwnProperty("startDebugging")) {
                    object.startDebugging = $root.skylark_debugging.StartDebuggingRequest.toObject(message.startDebugging, options);
                    if (options.oneofs)
                        object.payload = "startDebugging";
                }
                if (message.pauseThread != null && message.hasOwnProperty("pauseThread")) {
                    object.pauseThread = $root.skylark_debugging.PauseThreadRequest.toObject(message.pauseThread, options);
                    if (options.oneofs)
                        object.payload = "pauseThread";
                }
                if (message.getChildren != null && message.hasOwnProperty("getChildren")) {
                    object.getChildren = $root.skylark_debugging.GetChildrenRequest.toObject(message.getChildren, options);
                    if (options.oneofs)
                        object.payload = "getChildren";
                }
                return object;
            };
            /**
             * Converts this DebugRequest to JSON.
             * @function toJSON
             * @memberof skylark_debugging.DebugRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DebugRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return DebugRequest;
        })();
        skylark_debugging.SetBreakpointsRequest = (function () {
            /**
             * Properties of a SetBreakpointsRequest.
             * @memberof skylark_debugging
             * @interface ISetBreakpointsRequest
             * @property {Array.<skylark_debugging.IBreakpoint>|null} [breakpoint] SetBreakpointsRequest breakpoint
             */
            /**
             * Constructs a new SetBreakpointsRequest.
             * @memberof skylark_debugging
             * @classdesc Represents a SetBreakpointsRequest.
             * @implements ISetBreakpointsRequest
             * @constructor
             * @param {skylark_debugging.ISetBreakpointsRequest=} [properties] Properties to set
             */
            function SetBreakpointsRequest(properties) {
                this.breakpoint = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * SetBreakpointsRequest breakpoint.
             * @member {Array.<skylark_debugging.IBreakpoint>} breakpoint
             * @memberof skylark_debugging.SetBreakpointsRequest
             * @instance
             */
            SetBreakpointsRequest.prototype.breakpoint = $util.emptyArray;
            /**
             * Creates a new SetBreakpointsRequest instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.SetBreakpointsRequest
             * @static
             * @param {skylark_debugging.ISetBreakpointsRequest=} [properties] Properties to set
             * @returns {skylark_debugging.SetBreakpointsRequest} SetBreakpointsRequest instance
             */
            SetBreakpointsRequest.create = function create(properties) {
                return new SetBreakpointsRequest(properties);
            };
            /**
             * Encodes the specified SetBreakpointsRequest message. Does not implicitly {@link skylark_debugging.SetBreakpointsRequest.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.SetBreakpointsRequest
             * @static
             * @param {skylark_debugging.ISetBreakpointsRequest} message SetBreakpointsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SetBreakpointsRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.breakpoint != null && message.breakpoint.length)
                    for (var i = 0; i < message.breakpoint.length; ++i)
                        $root.skylark_debugging.Breakpoint.encode(message.breakpoint[i], writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
                return writer;
            };
            /**
             * Encodes the specified SetBreakpointsRequest message, length delimited. Does not implicitly {@link skylark_debugging.SetBreakpointsRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.SetBreakpointsRequest
             * @static
             * @param {skylark_debugging.ISetBreakpointsRequest} message SetBreakpointsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SetBreakpointsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a SetBreakpointsRequest message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.SetBreakpointsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.SetBreakpointsRequest} SetBreakpointsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SetBreakpointsRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.SetBreakpointsRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            if (!(message.breakpoint && message.breakpoint.length))
                                message.breakpoint = [];
                            message.breakpoint.push($root.skylark_debugging.Breakpoint.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a SetBreakpointsRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.SetBreakpointsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.SetBreakpointsRequest} SetBreakpointsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SetBreakpointsRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a SetBreakpointsRequest message.
             * @function verify
             * @memberof skylark_debugging.SetBreakpointsRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SetBreakpointsRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.breakpoint != null && message.hasOwnProperty("breakpoint")) {
                    if (!Array.isArray(message.breakpoint))
                        return "breakpoint: array expected";
                    for (var i = 0; i < message.breakpoint.length; ++i) {
                        var error = $root.skylark_debugging.Breakpoint.verify(message.breakpoint[i]);
                        if (error)
                            return "breakpoint." + error;
                    }
                }
                return null;
            };
            /**
             * Creates a SetBreakpointsRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.SetBreakpointsRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.SetBreakpointsRequest} SetBreakpointsRequest
             */
            SetBreakpointsRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.SetBreakpointsRequest)
                    return object;
                var message = new $root.skylark_debugging.SetBreakpointsRequest();
                if (object.breakpoint) {
                    if (!Array.isArray(object.breakpoint))
                        throw TypeError(".skylark_debugging.SetBreakpointsRequest.breakpoint: array expected");
                    message.breakpoint = [];
                    for (var i = 0; i < object.breakpoint.length; ++i) {
                        if (typeof object.breakpoint[i] !== "object")
                            throw TypeError(".skylark_debugging.SetBreakpointsRequest.breakpoint: object expected");
                        message.breakpoint[i] = $root.skylark_debugging.Breakpoint.fromObject(object.breakpoint[i]);
                    }
                }
                return message;
            };
            /**
             * Creates a plain object from a SetBreakpointsRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.SetBreakpointsRequest
             * @static
             * @param {skylark_debugging.SetBreakpointsRequest} message SetBreakpointsRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SetBreakpointsRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.breakpoint = [];
                if (message.breakpoint && message.breakpoint.length) {
                    object.breakpoint = [];
                    for (var j = 0; j < message.breakpoint.length; ++j)
                        object.breakpoint[j] = $root.skylark_debugging.Breakpoint.toObject(message.breakpoint[j], options);
                }
                return object;
            };
            /**
             * Converts this SetBreakpointsRequest to JSON.
             * @function toJSON
             * @memberof skylark_debugging.SetBreakpointsRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SetBreakpointsRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return SetBreakpointsRequest;
        })();
        skylark_debugging.ContinueExecutionRequest = (function () {
            /**
             * Properties of a ContinueExecutionRequest.
             * @memberof skylark_debugging
             * @interface IContinueExecutionRequest
             * @property {number|Long|null} [threadId] ContinueExecutionRequest threadId
             * @property {skylark_debugging.Stepping|null} [stepping] ContinueExecutionRequest stepping
             */
            /**
             * Constructs a new ContinueExecutionRequest.
             * @memberof skylark_debugging
             * @classdesc Represents a ContinueExecutionRequest.
             * @implements IContinueExecutionRequest
             * @constructor
             * @param {skylark_debugging.IContinueExecutionRequest=} [properties] Properties to set
             */
            function ContinueExecutionRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * ContinueExecutionRequest threadId.
             * @member {number|Long} threadId
             * @memberof skylark_debugging.ContinueExecutionRequest
             * @instance
             */
            ContinueExecutionRequest.prototype.threadId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * ContinueExecutionRequest stepping.
             * @member {skylark_debugging.Stepping} stepping
             * @memberof skylark_debugging.ContinueExecutionRequest
             * @instance
             */
            ContinueExecutionRequest.prototype.stepping = 0;
            /**
             * Creates a new ContinueExecutionRequest instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.ContinueExecutionRequest
             * @static
             * @param {skylark_debugging.IContinueExecutionRequest=} [properties] Properties to set
             * @returns {skylark_debugging.ContinueExecutionRequest} ContinueExecutionRequest instance
             */
            ContinueExecutionRequest.create = function create(properties) {
                return new ContinueExecutionRequest(properties);
            };
            /**
             * Encodes the specified ContinueExecutionRequest message. Does not implicitly {@link skylark_debugging.ContinueExecutionRequest.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.ContinueExecutionRequest
             * @static
             * @param {skylark_debugging.IContinueExecutionRequest} message ContinueExecutionRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContinueExecutionRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.threadId);
                if (message.stepping != null && message.hasOwnProperty("stepping"))
                    writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.stepping);
                return writer;
            };
            /**
             * Encodes the specified ContinueExecutionRequest message, length delimited. Does not implicitly {@link skylark_debugging.ContinueExecutionRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.ContinueExecutionRequest
             * @static
             * @param {skylark_debugging.IContinueExecutionRequest} message ContinueExecutionRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContinueExecutionRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a ContinueExecutionRequest message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.ContinueExecutionRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.ContinueExecutionRequest} ContinueExecutionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContinueExecutionRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.ContinueExecutionRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.threadId = reader.int64();
                            break;
                        case 2:
                            message.stepping = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a ContinueExecutionRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.ContinueExecutionRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.ContinueExecutionRequest} ContinueExecutionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContinueExecutionRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a ContinueExecutionRequest message.
             * @function verify
             * @memberof skylark_debugging.ContinueExecutionRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ContinueExecutionRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    if (!$util.isInteger(message.threadId) && !(message.threadId && $util.isInteger(message.threadId.low) && $util.isInteger(message.threadId.high)))
                        return "threadId: integer|Long expected";
                if (message.stepping != null && message.hasOwnProperty("stepping"))
                    switch (message.stepping) {
                        default:
                            return "stepping: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                    }
                return null;
            };
            /**
             * Creates a ContinueExecutionRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.ContinueExecutionRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.ContinueExecutionRequest} ContinueExecutionRequest
             */
            ContinueExecutionRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.ContinueExecutionRequest)
                    return object;
                var message = new $root.skylark_debugging.ContinueExecutionRequest();
                if (object.threadId != null)
                    if ($util.Long)
                        (message.threadId = $util.Long.fromValue(object.threadId)).unsigned = false;
                    else if (typeof object.threadId === "string")
                        message.threadId = parseInt(object.threadId, 10);
                    else if (typeof object.threadId === "number")
                        message.threadId = object.threadId;
                    else if (typeof object.threadId === "object")
                        message.threadId = new $util.LongBits(object.threadId.low >>> 0, object.threadId.high >>> 0).toNumber();
                switch (object.stepping) {
                    case "NONE":
                    case 0:
                        message.stepping = 0;
                        break;
                    case "INTO":
                    case 1:
                        message.stepping = 1;
                        break;
                    case "OVER":
                    case 2:
                        message.stepping = 2;
                        break;
                    case "OUT":
                    case 3:
                        message.stepping = 3;
                        break;
                }
                return message;
            };
            /**
             * Creates a plain object from a ContinueExecutionRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.ContinueExecutionRequest
             * @static
             * @param {skylark_debugging.ContinueExecutionRequest} message ContinueExecutionRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ContinueExecutionRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.threadId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.threadId = options.longs === String ? "0" : 0;
                    object.stepping = options.enums === String ? "NONE" : 0;
                }
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    if (typeof message.threadId === "number")
                        object.threadId = options.longs === String ? String(message.threadId) : message.threadId;
                    else
                        object.threadId = options.longs === String ? $util.Long.prototype.toString.call(message.threadId) : options.longs === Number ? new $util.LongBits(message.threadId.low >>> 0, message.threadId.high >>> 0).toNumber() : message.threadId;
                if (message.stepping != null && message.hasOwnProperty("stepping"))
                    object.stepping = options.enums === String ? $root.skylark_debugging.Stepping[message.stepping] : message.stepping;
                return object;
            };
            /**
             * Converts this ContinueExecutionRequest to JSON.
             * @function toJSON
             * @memberof skylark_debugging.ContinueExecutionRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ContinueExecutionRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return ContinueExecutionRequest;
        })();
        skylark_debugging.EvaluateRequest = (function () {
            /**
             * Properties of an EvaluateRequest.
             * @memberof skylark_debugging
             * @interface IEvaluateRequest
             * @property {number|Long|null} [threadId] EvaluateRequest threadId
             * @property {string|null} [statement] EvaluateRequest statement
             */
            /**
             * Constructs a new EvaluateRequest.
             * @memberof skylark_debugging
             * @classdesc Represents an EvaluateRequest.
             * @implements IEvaluateRequest
             * @constructor
             * @param {skylark_debugging.IEvaluateRequest=} [properties] Properties to set
             */
            function EvaluateRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * EvaluateRequest threadId.
             * @member {number|Long} threadId
             * @memberof skylark_debugging.EvaluateRequest
             * @instance
             */
            EvaluateRequest.prototype.threadId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * EvaluateRequest statement.
             * @member {string} statement
             * @memberof skylark_debugging.EvaluateRequest
             * @instance
             */
            EvaluateRequest.prototype.statement = "";
            /**
             * Creates a new EvaluateRequest instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.EvaluateRequest
             * @static
             * @param {skylark_debugging.IEvaluateRequest=} [properties] Properties to set
             * @returns {skylark_debugging.EvaluateRequest} EvaluateRequest instance
             */
            EvaluateRequest.create = function create(properties) {
                return new EvaluateRequest(properties);
            };
            /**
             * Encodes the specified EvaluateRequest message. Does not implicitly {@link skylark_debugging.EvaluateRequest.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.EvaluateRequest
             * @static
             * @param {skylark_debugging.IEvaluateRequest} message EvaluateRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EvaluateRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.threadId);
                if (message.statement != null && message.hasOwnProperty("statement"))
                    writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.statement);
                return writer;
            };
            /**
             * Encodes the specified EvaluateRequest message, length delimited. Does not implicitly {@link skylark_debugging.EvaluateRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.EvaluateRequest
             * @static
             * @param {skylark_debugging.IEvaluateRequest} message EvaluateRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EvaluateRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes an EvaluateRequest message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.EvaluateRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.EvaluateRequest} EvaluateRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EvaluateRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.EvaluateRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.threadId = reader.int64();
                            break;
                        case 2:
                            message.statement = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes an EvaluateRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.EvaluateRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.EvaluateRequest} EvaluateRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EvaluateRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies an EvaluateRequest message.
             * @function verify
             * @memberof skylark_debugging.EvaluateRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            EvaluateRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    if (!$util.isInteger(message.threadId) && !(message.threadId && $util.isInteger(message.threadId.low) && $util.isInteger(message.threadId.high)))
                        return "threadId: integer|Long expected";
                if (message.statement != null && message.hasOwnProperty("statement"))
                    if (!$util.isString(message.statement))
                        return "statement: string expected";
                return null;
            };
            /**
             * Creates an EvaluateRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.EvaluateRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.EvaluateRequest} EvaluateRequest
             */
            EvaluateRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.EvaluateRequest)
                    return object;
                var message = new $root.skylark_debugging.EvaluateRequest();
                if (object.threadId != null)
                    if ($util.Long)
                        (message.threadId = $util.Long.fromValue(object.threadId)).unsigned = false;
                    else if (typeof object.threadId === "string")
                        message.threadId = parseInt(object.threadId, 10);
                    else if (typeof object.threadId === "number")
                        message.threadId = object.threadId;
                    else if (typeof object.threadId === "object")
                        message.threadId = new $util.LongBits(object.threadId.low >>> 0, object.threadId.high >>> 0).toNumber();
                if (object.statement != null)
                    message.statement = String(object.statement);
                return message;
            };
            /**
             * Creates a plain object from an EvaluateRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.EvaluateRequest
             * @static
             * @param {skylark_debugging.EvaluateRequest} message EvaluateRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            EvaluateRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.threadId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.threadId = options.longs === String ? "0" : 0;
                    object.statement = "";
                }
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    if (typeof message.threadId === "number")
                        object.threadId = options.longs === String ? String(message.threadId) : message.threadId;
                    else
                        object.threadId = options.longs === String ? $util.Long.prototype.toString.call(message.threadId) : options.longs === Number ? new $util.LongBits(message.threadId.low >>> 0, message.threadId.high >>> 0).toNumber() : message.threadId;
                if (message.statement != null && message.hasOwnProperty("statement"))
                    object.statement = message.statement;
                return object;
            };
            /**
             * Converts this EvaluateRequest to JSON.
             * @function toJSON
             * @memberof skylark_debugging.EvaluateRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EvaluateRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return EvaluateRequest;
        })();
        skylark_debugging.ListFramesRequest = (function () {
            /**
             * Properties of a ListFramesRequest.
             * @memberof skylark_debugging
             * @interface IListFramesRequest
             * @property {number|Long|null} [threadId] ListFramesRequest threadId
             */
            /**
             * Constructs a new ListFramesRequest.
             * @memberof skylark_debugging
             * @classdesc Represents a ListFramesRequest.
             * @implements IListFramesRequest
             * @constructor
             * @param {skylark_debugging.IListFramesRequest=} [properties] Properties to set
             */
            function ListFramesRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * ListFramesRequest threadId.
             * @member {number|Long} threadId
             * @memberof skylark_debugging.ListFramesRequest
             * @instance
             */
            ListFramesRequest.prototype.threadId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * Creates a new ListFramesRequest instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.ListFramesRequest
             * @static
             * @param {skylark_debugging.IListFramesRequest=} [properties] Properties to set
             * @returns {skylark_debugging.ListFramesRequest} ListFramesRequest instance
             */
            ListFramesRequest.create = function create(properties) {
                return new ListFramesRequest(properties);
            };
            /**
             * Encodes the specified ListFramesRequest message. Does not implicitly {@link skylark_debugging.ListFramesRequest.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.ListFramesRequest
             * @static
             * @param {skylark_debugging.IListFramesRequest} message ListFramesRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ListFramesRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.threadId);
                return writer;
            };
            /**
             * Encodes the specified ListFramesRequest message, length delimited. Does not implicitly {@link skylark_debugging.ListFramesRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.ListFramesRequest
             * @static
             * @param {skylark_debugging.IListFramesRequest} message ListFramesRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ListFramesRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a ListFramesRequest message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.ListFramesRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.ListFramesRequest} ListFramesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ListFramesRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.ListFramesRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.threadId = reader.int64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a ListFramesRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.ListFramesRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.ListFramesRequest} ListFramesRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ListFramesRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a ListFramesRequest message.
             * @function verify
             * @memberof skylark_debugging.ListFramesRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ListFramesRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    if (!$util.isInteger(message.threadId) && !(message.threadId && $util.isInteger(message.threadId.low) && $util.isInteger(message.threadId.high)))
                        return "threadId: integer|Long expected";
                return null;
            };
            /**
             * Creates a ListFramesRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.ListFramesRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.ListFramesRequest} ListFramesRequest
             */
            ListFramesRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.ListFramesRequest)
                    return object;
                var message = new $root.skylark_debugging.ListFramesRequest();
                if (object.threadId != null)
                    if ($util.Long)
                        (message.threadId = $util.Long.fromValue(object.threadId)).unsigned = false;
                    else if (typeof object.threadId === "string")
                        message.threadId = parseInt(object.threadId, 10);
                    else if (typeof object.threadId === "number")
                        message.threadId = object.threadId;
                    else if (typeof object.threadId === "object")
                        message.threadId = new $util.LongBits(object.threadId.low >>> 0, object.threadId.high >>> 0).toNumber();
                return message;
            };
            /**
             * Creates a plain object from a ListFramesRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.ListFramesRequest
             * @static
             * @param {skylark_debugging.ListFramesRequest} message ListFramesRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ListFramesRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.threadId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.threadId = options.longs === String ? "0" : 0;
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    if (typeof message.threadId === "number")
                        object.threadId = options.longs === String ? String(message.threadId) : message.threadId;
                    else
                        object.threadId = options.longs === String ? $util.Long.prototype.toString.call(message.threadId) : options.longs === Number ? new $util.LongBits(message.threadId.low >>> 0, message.threadId.high >>> 0).toNumber() : message.threadId;
                return object;
            };
            /**
             * Converts this ListFramesRequest to JSON.
             * @function toJSON
             * @memberof skylark_debugging.ListFramesRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ListFramesRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return ListFramesRequest;
        })();
        skylark_debugging.StartDebuggingRequest = (function () {
            /**
             * Properties of a StartDebuggingRequest.
             * @memberof skylark_debugging
             * @interface IStartDebuggingRequest
             */
            /**
             * Constructs a new StartDebuggingRequest.
             * @memberof skylark_debugging
             * @classdesc Represents a StartDebuggingRequest.
             * @implements IStartDebuggingRequest
             * @constructor
             * @param {skylark_debugging.IStartDebuggingRequest=} [properties] Properties to set
             */
            function StartDebuggingRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * Creates a new StartDebuggingRequest instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.StartDebuggingRequest
             * @static
             * @param {skylark_debugging.IStartDebuggingRequest=} [properties] Properties to set
             * @returns {skylark_debugging.StartDebuggingRequest} StartDebuggingRequest instance
             */
            StartDebuggingRequest.create = function create(properties) {
                return new StartDebuggingRequest(properties);
            };
            /**
             * Encodes the specified StartDebuggingRequest message. Does not implicitly {@link skylark_debugging.StartDebuggingRequest.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.StartDebuggingRequest
             * @static
             * @param {skylark_debugging.IStartDebuggingRequest} message StartDebuggingRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StartDebuggingRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
            /**
             * Encodes the specified StartDebuggingRequest message, length delimited. Does not implicitly {@link skylark_debugging.StartDebuggingRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.StartDebuggingRequest
             * @static
             * @param {skylark_debugging.IStartDebuggingRequest} message StartDebuggingRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StartDebuggingRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a StartDebuggingRequest message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.StartDebuggingRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.StartDebuggingRequest} StartDebuggingRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StartDebuggingRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.StartDebuggingRequest();
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
             * Decodes a StartDebuggingRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.StartDebuggingRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.StartDebuggingRequest} StartDebuggingRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StartDebuggingRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a StartDebuggingRequest message.
             * @function verify
             * @memberof skylark_debugging.StartDebuggingRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StartDebuggingRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
            /**
             * Creates a StartDebuggingRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.StartDebuggingRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.StartDebuggingRequest} StartDebuggingRequest
             */
            StartDebuggingRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.StartDebuggingRequest)
                    return object;
                return new $root.skylark_debugging.StartDebuggingRequest();
            };
            /**
             * Creates a plain object from a StartDebuggingRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.StartDebuggingRequest
             * @static
             * @param {skylark_debugging.StartDebuggingRequest} message StartDebuggingRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StartDebuggingRequest.toObject = function toObject() {
                return {};
            };
            /**
             * Converts this StartDebuggingRequest to JSON.
             * @function toJSON
             * @memberof skylark_debugging.StartDebuggingRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StartDebuggingRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return StartDebuggingRequest;
        })();
        skylark_debugging.PauseThreadRequest = (function () {
            /**
             * Properties of a PauseThreadRequest.
             * @memberof skylark_debugging
             * @interface IPauseThreadRequest
             * @property {number|Long|null} [threadId] PauseThreadRequest threadId
             */
            /**
             * Constructs a new PauseThreadRequest.
             * @memberof skylark_debugging
             * @classdesc Represents a PauseThreadRequest.
             * @implements IPauseThreadRequest
             * @constructor
             * @param {skylark_debugging.IPauseThreadRequest=} [properties] Properties to set
             */
            function PauseThreadRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * PauseThreadRequest threadId.
             * @member {number|Long} threadId
             * @memberof skylark_debugging.PauseThreadRequest
             * @instance
             */
            PauseThreadRequest.prototype.threadId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * Creates a new PauseThreadRequest instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.PauseThreadRequest
             * @static
             * @param {skylark_debugging.IPauseThreadRequest=} [properties] Properties to set
             * @returns {skylark_debugging.PauseThreadRequest} PauseThreadRequest instance
             */
            PauseThreadRequest.create = function create(properties) {
                return new PauseThreadRequest(properties);
            };
            /**
             * Encodes the specified PauseThreadRequest message. Does not implicitly {@link skylark_debugging.PauseThreadRequest.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.PauseThreadRequest
             * @static
             * @param {skylark_debugging.IPauseThreadRequest} message PauseThreadRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PauseThreadRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.threadId);
                return writer;
            };
            /**
             * Encodes the specified PauseThreadRequest message, length delimited. Does not implicitly {@link skylark_debugging.PauseThreadRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.PauseThreadRequest
             * @static
             * @param {skylark_debugging.IPauseThreadRequest} message PauseThreadRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PauseThreadRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a PauseThreadRequest message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.PauseThreadRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.PauseThreadRequest} PauseThreadRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PauseThreadRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.PauseThreadRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.threadId = reader.int64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a PauseThreadRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.PauseThreadRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.PauseThreadRequest} PauseThreadRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PauseThreadRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a PauseThreadRequest message.
             * @function verify
             * @memberof skylark_debugging.PauseThreadRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PauseThreadRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    if (!$util.isInteger(message.threadId) && !(message.threadId && $util.isInteger(message.threadId.low) && $util.isInteger(message.threadId.high)))
                        return "threadId: integer|Long expected";
                return null;
            };
            /**
             * Creates a PauseThreadRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.PauseThreadRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.PauseThreadRequest} PauseThreadRequest
             */
            PauseThreadRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.PauseThreadRequest)
                    return object;
                var message = new $root.skylark_debugging.PauseThreadRequest();
                if (object.threadId != null)
                    if ($util.Long)
                        (message.threadId = $util.Long.fromValue(object.threadId)).unsigned = false;
                    else if (typeof object.threadId === "string")
                        message.threadId = parseInt(object.threadId, 10);
                    else if (typeof object.threadId === "number")
                        message.threadId = object.threadId;
                    else if (typeof object.threadId === "object")
                        message.threadId = new $util.LongBits(object.threadId.low >>> 0, object.threadId.high >>> 0).toNumber();
                return message;
            };
            /**
             * Creates a plain object from a PauseThreadRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.PauseThreadRequest
             * @static
             * @param {skylark_debugging.PauseThreadRequest} message PauseThreadRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PauseThreadRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.threadId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.threadId = options.longs === String ? "0" : 0;
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    if (typeof message.threadId === "number")
                        object.threadId = options.longs === String ? String(message.threadId) : message.threadId;
                    else
                        object.threadId = options.longs === String ? $util.Long.prototype.toString.call(message.threadId) : options.longs === Number ? new $util.LongBits(message.threadId.low >>> 0, message.threadId.high >>> 0).toNumber() : message.threadId;
                return object;
            };
            /**
             * Converts this PauseThreadRequest to JSON.
             * @function toJSON
             * @memberof skylark_debugging.PauseThreadRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PauseThreadRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return PauseThreadRequest;
        })();
        skylark_debugging.GetChildrenRequest = (function () {
            /**
             * Properties of a GetChildrenRequest.
             * @memberof skylark_debugging
             * @interface IGetChildrenRequest
             * @property {number|Long|null} [threadId] GetChildrenRequest threadId
             * @property {number|Long|null} [valueId] GetChildrenRequest valueId
             */
            /**
             * Constructs a new GetChildrenRequest.
             * @memberof skylark_debugging
             * @classdesc Represents a GetChildrenRequest.
             * @implements IGetChildrenRequest
             * @constructor
             * @param {skylark_debugging.IGetChildrenRequest=} [properties] Properties to set
             */
            function GetChildrenRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * GetChildrenRequest threadId.
             * @member {number|Long} threadId
             * @memberof skylark_debugging.GetChildrenRequest
             * @instance
             */
            GetChildrenRequest.prototype.threadId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * GetChildrenRequest valueId.
             * @member {number|Long} valueId
             * @memberof skylark_debugging.GetChildrenRequest
             * @instance
             */
            GetChildrenRequest.prototype.valueId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * Creates a new GetChildrenRequest instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.GetChildrenRequest
             * @static
             * @param {skylark_debugging.IGetChildrenRequest=} [properties] Properties to set
             * @returns {skylark_debugging.GetChildrenRequest} GetChildrenRequest instance
             */
            GetChildrenRequest.create = function create(properties) {
                return new GetChildrenRequest(properties);
            };
            /**
             * Encodes the specified GetChildrenRequest message. Does not implicitly {@link skylark_debugging.GetChildrenRequest.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.GetChildrenRequest
             * @static
             * @param {skylark_debugging.IGetChildrenRequest} message GetChildrenRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChildrenRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.threadId);
                if (message.valueId != null && message.hasOwnProperty("valueId"))
                    writer.uint32(/* id 2, wireType 0 =*/ 16).int64(message.valueId);
                return writer;
            };
            /**
             * Encodes the specified GetChildrenRequest message, length delimited. Does not implicitly {@link skylark_debugging.GetChildrenRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.GetChildrenRequest
             * @static
             * @param {skylark_debugging.IGetChildrenRequest} message GetChildrenRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChildrenRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a GetChildrenRequest message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.GetChildrenRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.GetChildrenRequest} GetChildrenRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChildrenRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.GetChildrenRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.threadId = reader.int64();
                            break;
                        case 2:
                            message.valueId = reader.int64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a GetChildrenRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.GetChildrenRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.GetChildrenRequest} GetChildrenRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChildrenRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a GetChildrenRequest message.
             * @function verify
             * @memberof skylark_debugging.GetChildrenRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetChildrenRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    if (!$util.isInteger(message.threadId) && !(message.threadId && $util.isInteger(message.threadId.low) && $util.isInteger(message.threadId.high)))
                        return "threadId: integer|Long expected";
                if (message.valueId != null && message.hasOwnProperty("valueId"))
                    if (!$util.isInteger(message.valueId) && !(message.valueId && $util.isInteger(message.valueId.low) && $util.isInteger(message.valueId.high)))
                        return "valueId: integer|Long expected";
                return null;
            };
            /**
             * Creates a GetChildrenRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.GetChildrenRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.GetChildrenRequest} GetChildrenRequest
             */
            GetChildrenRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.GetChildrenRequest)
                    return object;
                var message = new $root.skylark_debugging.GetChildrenRequest();
                if (object.threadId != null)
                    if ($util.Long)
                        (message.threadId = $util.Long.fromValue(object.threadId)).unsigned = false;
                    else if (typeof object.threadId === "string")
                        message.threadId = parseInt(object.threadId, 10);
                    else if (typeof object.threadId === "number")
                        message.threadId = object.threadId;
                    else if (typeof object.threadId === "object")
                        message.threadId = new $util.LongBits(object.threadId.low >>> 0, object.threadId.high >>> 0).toNumber();
                if (object.valueId != null)
                    if ($util.Long)
                        (message.valueId = $util.Long.fromValue(object.valueId)).unsigned = false;
                    else if (typeof object.valueId === "string")
                        message.valueId = parseInt(object.valueId, 10);
                    else if (typeof object.valueId === "number")
                        message.valueId = object.valueId;
                    else if (typeof object.valueId === "object")
                        message.valueId = new $util.LongBits(object.valueId.low >>> 0, object.valueId.high >>> 0).toNumber();
                return message;
            };
            /**
             * Creates a plain object from a GetChildrenRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.GetChildrenRequest
             * @static
             * @param {skylark_debugging.GetChildrenRequest} message GetChildrenRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetChildrenRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.threadId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.threadId = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.valueId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.valueId = options.longs === String ? "0" : 0;
                }
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    if (typeof message.threadId === "number")
                        object.threadId = options.longs === String ? String(message.threadId) : message.threadId;
                    else
                        object.threadId = options.longs === String ? $util.Long.prototype.toString.call(message.threadId) : options.longs === Number ? new $util.LongBits(message.threadId.low >>> 0, message.threadId.high >>> 0).toNumber() : message.threadId;
                if (message.valueId != null && message.hasOwnProperty("valueId"))
                    if (typeof message.valueId === "number")
                        object.valueId = options.longs === String ? String(message.valueId) : message.valueId;
                    else
                        object.valueId = options.longs === String ? $util.Long.prototype.toString.call(message.valueId) : options.longs === Number ? new $util.LongBits(message.valueId.low >>> 0, message.valueId.high >>> 0).toNumber() : message.valueId;
                return object;
            };
            /**
             * Converts this GetChildrenRequest to JSON.
             * @function toJSON
             * @memberof skylark_debugging.GetChildrenRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetChildrenRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return GetChildrenRequest;
        })();
        skylark_debugging.DebugEvent = (function () {
            /**
             * Properties of a DebugEvent.
             * @memberof skylark_debugging
             * @interface IDebugEvent
             * @property {number|Long|null} [sequenceNumber] DebugEvent sequenceNumber
             * @property {skylark_debugging.IError|null} [error] DebugEvent error
             * @property {skylark_debugging.ISetBreakpointsResponse|null} [setBreakpoints] DebugEvent setBreakpoints
             * @property {skylark_debugging.IContinueExecutionResponse|null} [continueExecution] DebugEvent continueExecution
             * @property {skylark_debugging.IEvaluateResponse|null} [evaluate] DebugEvent evaluate
             * @property {skylark_debugging.IListFramesResponse|null} [listFrames] DebugEvent listFrames
             * @property {skylark_debugging.IStartDebuggingResponse|null} [startDebugging] DebugEvent startDebugging
             * @property {skylark_debugging.IPauseThreadResponse|null} [pauseThread] DebugEvent pauseThread
             * @property {skylark_debugging.IGetChildrenResponse|null} [getChildren] DebugEvent getChildren
             * @property {skylark_debugging.IThreadPausedEvent|null} [threadPaused] DebugEvent threadPaused
             * @property {skylark_debugging.IThreadContinuedEvent|null} [threadContinued] DebugEvent threadContinued
             */
            /**
             * Constructs a new DebugEvent.
             * @memberof skylark_debugging
             * @classdesc Represents a DebugEvent.
             * @implements IDebugEvent
             * @constructor
             * @param {skylark_debugging.IDebugEvent=} [properties] Properties to set
             */
            function DebugEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * DebugEvent sequenceNumber.
             * @member {number|Long} sequenceNumber
             * @memberof skylark_debugging.DebugEvent
             * @instance
             */
            DebugEvent.prototype.sequenceNumber = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * DebugEvent error.
             * @member {skylark_debugging.IError|null|undefined} error
             * @memberof skylark_debugging.DebugEvent
             * @instance
             */
            DebugEvent.prototype.error = null;
            /**
             * DebugEvent setBreakpoints.
             * @member {skylark_debugging.ISetBreakpointsResponse|null|undefined} setBreakpoints
             * @memberof skylark_debugging.DebugEvent
             * @instance
             */
            DebugEvent.prototype.setBreakpoints = null;
            /**
             * DebugEvent continueExecution.
             * @member {skylark_debugging.IContinueExecutionResponse|null|undefined} continueExecution
             * @memberof skylark_debugging.DebugEvent
             * @instance
             */
            DebugEvent.prototype.continueExecution = null;
            /**
             * DebugEvent evaluate.
             * @member {skylark_debugging.IEvaluateResponse|null|undefined} evaluate
             * @memberof skylark_debugging.DebugEvent
             * @instance
             */
            DebugEvent.prototype.evaluate = null;
            /**
             * DebugEvent listFrames.
             * @member {skylark_debugging.IListFramesResponse|null|undefined} listFrames
             * @memberof skylark_debugging.DebugEvent
             * @instance
             */
            DebugEvent.prototype.listFrames = null;
            /**
             * DebugEvent startDebugging.
             * @member {skylark_debugging.IStartDebuggingResponse|null|undefined} startDebugging
             * @memberof skylark_debugging.DebugEvent
             * @instance
             */
            DebugEvent.prototype.startDebugging = null;
            /**
             * DebugEvent pauseThread.
             * @member {skylark_debugging.IPauseThreadResponse|null|undefined} pauseThread
             * @memberof skylark_debugging.DebugEvent
             * @instance
             */
            DebugEvent.prototype.pauseThread = null;
            /**
             * DebugEvent getChildren.
             * @member {skylark_debugging.IGetChildrenResponse|null|undefined} getChildren
             * @memberof skylark_debugging.DebugEvent
             * @instance
             */
            DebugEvent.prototype.getChildren = null;
            /**
             * DebugEvent threadPaused.
             * @member {skylark_debugging.IThreadPausedEvent|null|undefined} threadPaused
             * @memberof skylark_debugging.DebugEvent
             * @instance
             */
            DebugEvent.prototype.threadPaused = null;
            /**
             * DebugEvent threadContinued.
             * @member {skylark_debugging.IThreadContinuedEvent|null|undefined} threadContinued
             * @memberof skylark_debugging.DebugEvent
             * @instance
             */
            DebugEvent.prototype.threadContinued = null;
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
            /**
             * DebugEvent payload.
             * @member {"error"|"setBreakpoints"|"continueExecution"|"evaluate"|"listFrames"|"startDebugging"|"pauseThread"|"getChildren"|"threadPaused"|"threadContinued"|undefined} payload
             * @memberof skylark_debugging.DebugEvent
             * @instance
             */
            Object.defineProperty(DebugEvent.prototype, "payload", {
                get: $util.oneOfGetter($oneOfFields = ["error", "setBreakpoints", "continueExecution", "evaluate", "listFrames", "startDebugging", "pauseThread", "getChildren", "threadPaused", "threadContinued"]),
                set: $util.oneOfSetter($oneOfFields)
            });
            /**
             * Creates a new DebugEvent instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.DebugEvent
             * @static
             * @param {skylark_debugging.IDebugEvent=} [properties] Properties to set
             * @returns {skylark_debugging.DebugEvent} DebugEvent instance
             */
            DebugEvent.create = function create(properties) {
                return new DebugEvent(properties);
            };
            /**
             * Encodes the specified DebugEvent message. Does not implicitly {@link skylark_debugging.DebugEvent.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.DebugEvent
             * @static
             * @param {skylark_debugging.IDebugEvent} message DebugEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DebugEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.sequenceNumber != null && message.hasOwnProperty("sequenceNumber"))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.sequenceNumber);
                if (message.error != null && message.hasOwnProperty("error"))
                    $root.skylark_debugging.Error.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/ 794).fork()).ldelim();
                if (message.setBreakpoints != null && message.hasOwnProperty("setBreakpoints"))
                    $root.skylark_debugging.SetBreakpointsResponse.encode(message.setBreakpoints, writer.uint32(/* id 101, wireType 2 =*/ 810).fork()).ldelim();
                if (message.continueExecution != null && message.hasOwnProperty("continueExecution"))
                    $root.skylark_debugging.ContinueExecutionResponse.encode(message.continueExecution, writer.uint32(/* id 102, wireType 2 =*/ 818).fork()).ldelim();
                if (message.evaluate != null && message.hasOwnProperty("evaluate"))
                    $root.skylark_debugging.EvaluateResponse.encode(message.evaluate, writer.uint32(/* id 103, wireType 2 =*/ 826).fork()).ldelim();
                if (message.listFrames != null && message.hasOwnProperty("listFrames"))
                    $root.skylark_debugging.ListFramesResponse.encode(message.listFrames, writer.uint32(/* id 104, wireType 2 =*/ 834).fork()).ldelim();
                if (message.startDebugging != null && message.hasOwnProperty("startDebugging"))
                    $root.skylark_debugging.StartDebuggingResponse.encode(message.startDebugging, writer.uint32(/* id 105, wireType 2 =*/ 842).fork()).ldelim();
                if (message.pauseThread != null && message.hasOwnProperty("pauseThread"))
                    $root.skylark_debugging.PauseThreadResponse.encode(message.pauseThread, writer.uint32(/* id 106, wireType 2 =*/ 850).fork()).ldelim();
                if (message.getChildren != null && message.hasOwnProperty("getChildren"))
                    $root.skylark_debugging.GetChildrenResponse.encode(message.getChildren, writer.uint32(/* id 107, wireType 2 =*/ 858).fork()).ldelim();
                if (message.threadPaused != null && message.hasOwnProperty("threadPaused"))
                    $root.skylark_debugging.ThreadPausedEvent.encode(message.threadPaused, writer.uint32(/* id 1001, wireType 2 =*/ 8010).fork()).ldelim();
                if (message.threadContinued != null && message.hasOwnProperty("threadContinued"))
                    $root.skylark_debugging.ThreadContinuedEvent.encode(message.threadContinued, writer.uint32(/* id 1002, wireType 2 =*/ 8018).fork()).ldelim();
                return writer;
            };
            /**
             * Encodes the specified DebugEvent message, length delimited. Does not implicitly {@link skylark_debugging.DebugEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.DebugEvent
             * @static
             * @param {skylark_debugging.IDebugEvent} message DebugEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DebugEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a DebugEvent message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.DebugEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.DebugEvent} DebugEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DebugEvent.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.DebugEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.sequenceNumber = reader.int64();
                            break;
                        case 99:
                            message.error = $root.skylark_debugging.Error.decode(reader, reader.uint32());
                            break;
                        case 101:
                            message.setBreakpoints = $root.skylark_debugging.SetBreakpointsResponse.decode(reader, reader.uint32());
                            break;
                        case 102:
                            message.continueExecution = $root.skylark_debugging.ContinueExecutionResponse.decode(reader, reader.uint32());
                            break;
                        case 103:
                            message.evaluate = $root.skylark_debugging.EvaluateResponse.decode(reader, reader.uint32());
                            break;
                        case 104:
                            message.listFrames = $root.skylark_debugging.ListFramesResponse.decode(reader, reader.uint32());
                            break;
                        case 105:
                            message.startDebugging = $root.skylark_debugging.StartDebuggingResponse.decode(reader, reader.uint32());
                            break;
                        case 106:
                            message.pauseThread = $root.skylark_debugging.PauseThreadResponse.decode(reader, reader.uint32());
                            break;
                        case 107:
                            message.getChildren = $root.skylark_debugging.GetChildrenResponse.decode(reader, reader.uint32());
                            break;
                        case 1001:
                            message.threadPaused = $root.skylark_debugging.ThreadPausedEvent.decode(reader, reader.uint32());
                            break;
                        case 1002:
                            message.threadContinued = $root.skylark_debugging.ThreadContinuedEvent.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a DebugEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.DebugEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.DebugEvent} DebugEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DebugEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a DebugEvent message.
             * @function verify
             * @memberof skylark_debugging.DebugEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DebugEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.sequenceNumber != null && message.hasOwnProperty("sequenceNumber"))
                    if (!$util.isInteger(message.sequenceNumber) && !(message.sequenceNumber && $util.isInteger(message.sequenceNumber.low) && $util.isInteger(message.sequenceNumber.high)))
                        return "sequenceNumber: integer|Long expected";
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                if (message.setBreakpoints != null && message.hasOwnProperty("setBreakpoints")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.SetBreakpointsResponse.verify(message.setBreakpoints);
                        if (error)
                            return "setBreakpoints." + error;
                    }
                }
                if (message.continueExecution != null && message.hasOwnProperty("continueExecution")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.ContinueExecutionResponse.verify(message.continueExecution);
                        if (error)
                            return "continueExecution." + error;
                    }
                }
                if (message.evaluate != null && message.hasOwnProperty("evaluate")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.EvaluateResponse.verify(message.evaluate);
                        if (error)
                            return "evaluate." + error;
                    }
                }
                if (message.listFrames != null && message.hasOwnProperty("listFrames")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.ListFramesResponse.verify(message.listFrames);
                        if (error)
                            return "listFrames." + error;
                    }
                }
                if (message.startDebugging != null && message.hasOwnProperty("startDebugging")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.StartDebuggingResponse.verify(message.startDebugging);
                        if (error)
                            return "startDebugging." + error;
                    }
                }
                if (message.pauseThread != null && message.hasOwnProperty("pauseThread")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.PauseThreadResponse.verify(message.pauseThread);
                        if (error)
                            return "pauseThread." + error;
                    }
                }
                if (message.getChildren != null && message.hasOwnProperty("getChildren")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.GetChildrenResponse.verify(message.getChildren);
                        if (error)
                            return "getChildren." + error;
                    }
                }
                if (message.threadPaused != null && message.hasOwnProperty("threadPaused")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.ThreadPausedEvent.verify(message.threadPaused);
                        if (error)
                            return "threadPaused." + error;
                    }
                }
                if (message.threadContinued != null && message.hasOwnProperty("threadContinued")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        var error = $root.skylark_debugging.ThreadContinuedEvent.verify(message.threadContinued);
                        if (error)
                            return "threadContinued." + error;
                    }
                }
                return null;
            };
            /**
             * Creates a DebugEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.DebugEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.DebugEvent} DebugEvent
             */
            DebugEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.DebugEvent)
                    return object;
                var message = new $root.skylark_debugging.DebugEvent();
                if (object.sequenceNumber != null)
                    if ($util.Long)
                        (message.sequenceNumber = $util.Long.fromValue(object.sequenceNumber)).unsigned = false;
                    else if (typeof object.sequenceNumber === "string")
                        message.sequenceNumber = parseInt(object.sequenceNumber, 10);
                    else if (typeof object.sequenceNumber === "number")
                        message.sequenceNumber = object.sequenceNumber;
                    else if (typeof object.sequenceNumber === "object")
                        message.sequenceNumber = new $util.LongBits(object.sequenceNumber.low >>> 0, object.sequenceNumber.high >>> 0).toNumber();
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".skylark_debugging.DebugEvent.error: object expected");
                    message.error = $root.skylark_debugging.Error.fromObject(object.error);
                }
                if (object.setBreakpoints != null) {
                    if (typeof object.setBreakpoints !== "object")
                        throw TypeError(".skylark_debugging.DebugEvent.setBreakpoints: object expected");
                    message.setBreakpoints = $root.skylark_debugging.SetBreakpointsResponse.fromObject(object.setBreakpoints);
                }
                if (object.continueExecution != null) {
                    if (typeof object.continueExecution !== "object")
                        throw TypeError(".skylark_debugging.DebugEvent.continueExecution: object expected");
                    message.continueExecution = $root.skylark_debugging.ContinueExecutionResponse.fromObject(object.continueExecution);
                }
                if (object.evaluate != null) {
                    if (typeof object.evaluate !== "object")
                        throw TypeError(".skylark_debugging.DebugEvent.evaluate: object expected");
                    message.evaluate = $root.skylark_debugging.EvaluateResponse.fromObject(object.evaluate);
                }
                if (object.listFrames != null) {
                    if (typeof object.listFrames !== "object")
                        throw TypeError(".skylark_debugging.DebugEvent.listFrames: object expected");
                    message.listFrames = $root.skylark_debugging.ListFramesResponse.fromObject(object.listFrames);
                }
                if (object.startDebugging != null) {
                    if (typeof object.startDebugging !== "object")
                        throw TypeError(".skylark_debugging.DebugEvent.startDebugging: object expected");
                    message.startDebugging = $root.skylark_debugging.StartDebuggingResponse.fromObject(object.startDebugging);
                }
                if (object.pauseThread != null) {
                    if (typeof object.pauseThread !== "object")
                        throw TypeError(".skylark_debugging.DebugEvent.pauseThread: object expected");
                    message.pauseThread = $root.skylark_debugging.PauseThreadResponse.fromObject(object.pauseThread);
                }
                if (object.getChildren != null) {
                    if (typeof object.getChildren !== "object")
                        throw TypeError(".skylark_debugging.DebugEvent.getChildren: object expected");
                    message.getChildren = $root.skylark_debugging.GetChildrenResponse.fromObject(object.getChildren);
                }
                if (object.threadPaused != null) {
                    if (typeof object.threadPaused !== "object")
                        throw TypeError(".skylark_debugging.DebugEvent.threadPaused: object expected");
                    message.threadPaused = $root.skylark_debugging.ThreadPausedEvent.fromObject(object.threadPaused);
                }
                if (object.threadContinued != null) {
                    if (typeof object.threadContinued !== "object")
                        throw TypeError(".skylark_debugging.DebugEvent.threadContinued: object expected");
                    message.threadContinued = $root.skylark_debugging.ThreadContinuedEvent.fromObject(object.threadContinued);
                }
                return message;
            };
            /**
             * Creates a plain object from a DebugEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.DebugEvent
             * @static
             * @param {skylark_debugging.DebugEvent} message DebugEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DebugEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.sequenceNumber = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.sequenceNumber = options.longs === String ? "0" : 0;
                if (message.sequenceNumber != null && message.hasOwnProperty("sequenceNumber"))
                    if (typeof message.sequenceNumber === "number")
                        object.sequenceNumber = options.longs === String ? String(message.sequenceNumber) : message.sequenceNumber;
                    else
                        object.sequenceNumber = options.longs === String ? $util.Long.prototype.toString.call(message.sequenceNumber) : options.longs === Number ? new $util.LongBits(message.sequenceNumber.low >>> 0, message.sequenceNumber.high >>> 0).toNumber() : message.sequenceNumber;
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.skylark_debugging.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object.payload = "error";
                }
                if (message.setBreakpoints != null && message.hasOwnProperty("setBreakpoints")) {
                    object.setBreakpoints = $root.skylark_debugging.SetBreakpointsResponse.toObject(message.setBreakpoints, options);
                    if (options.oneofs)
                        object.payload = "setBreakpoints";
                }
                if (message.continueExecution != null && message.hasOwnProperty("continueExecution")) {
                    object.continueExecution = $root.skylark_debugging.ContinueExecutionResponse.toObject(message.continueExecution, options);
                    if (options.oneofs)
                        object.payload = "continueExecution";
                }
                if (message.evaluate != null && message.hasOwnProperty("evaluate")) {
                    object.evaluate = $root.skylark_debugging.EvaluateResponse.toObject(message.evaluate, options);
                    if (options.oneofs)
                        object.payload = "evaluate";
                }
                if (message.listFrames != null && message.hasOwnProperty("listFrames")) {
                    object.listFrames = $root.skylark_debugging.ListFramesResponse.toObject(message.listFrames, options);
                    if (options.oneofs)
                        object.payload = "listFrames";
                }
                if (message.startDebugging != null && message.hasOwnProperty("startDebugging")) {
                    object.startDebugging = $root.skylark_debugging.StartDebuggingResponse.toObject(message.startDebugging, options);
                    if (options.oneofs)
                        object.payload = "startDebugging";
                }
                if (message.pauseThread != null && message.hasOwnProperty("pauseThread")) {
                    object.pauseThread = $root.skylark_debugging.PauseThreadResponse.toObject(message.pauseThread, options);
                    if (options.oneofs)
                        object.payload = "pauseThread";
                }
                if (message.getChildren != null && message.hasOwnProperty("getChildren")) {
                    object.getChildren = $root.skylark_debugging.GetChildrenResponse.toObject(message.getChildren, options);
                    if (options.oneofs)
                        object.payload = "getChildren";
                }
                if (message.threadPaused != null && message.hasOwnProperty("threadPaused")) {
                    object.threadPaused = $root.skylark_debugging.ThreadPausedEvent.toObject(message.threadPaused, options);
                    if (options.oneofs)
                        object.payload = "threadPaused";
                }
                if (message.threadContinued != null && message.hasOwnProperty("threadContinued")) {
                    object.threadContinued = $root.skylark_debugging.ThreadContinuedEvent.toObject(message.threadContinued, options);
                    if (options.oneofs)
                        object.payload = "threadContinued";
                }
                return object;
            };
            /**
             * Converts this DebugEvent to JSON.
             * @function toJSON
             * @memberof skylark_debugging.DebugEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DebugEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return DebugEvent;
        })();
        skylark_debugging.Error = (function () {
            /**
             * Properties of an Error.
             * @memberof skylark_debugging
             * @interface IError
             * @property {string|null} [message] Error message
             */
            /**
             * Constructs a new Error.
             * @memberof skylark_debugging
             * @classdesc Represents an Error.
             * @implements IError
             * @constructor
             * @param {skylark_debugging.IError=} [properties] Properties to set
             */
            function Error(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * Error message.
             * @member {string} message
             * @memberof skylark_debugging.Error
             * @instance
             */
            Error.prototype.message = "";
            /**
             * Creates a new Error instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.Error
             * @static
             * @param {skylark_debugging.IError=} [properties] Properties to set
             * @returns {skylark_debugging.Error} Error instance
             */
            Error.create = function create(properties) {
                return new Error(properties);
            };
            /**
             * Encodes the specified Error message. Does not implicitly {@link skylark_debugging.Error.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.Error
             * @static
             * @param {skylark_debugging.IError} message Error message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Error.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.message != null && message.hasOwnProperty("message"))
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.message);
                return writer;
            };
            /**
             * Encodes the specified Error message, length delimited. Does not implicitly {@link skylark_debugging.Error.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.Error
             * @static
             * @param {skylark_debugging.IError} message Error message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Error.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes an Error message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.Error
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.Error} Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Error.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.Error();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.message = reader.string();
                            break;
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
             * @memberof skylark_debugging.Error
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.Error} Error
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
             * @memberof skylark_debugging.Error
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Error.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                return null;
            };
            /**
             * Creates an Error message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.Error
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.Error} Error
             */
            Error.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.Error)
                    return object;
                var message = new $root.skylark_debugging.Error();
                if (object.message != null)
                    message.message = String(object.message);
                return message;
            };
            /**
             * Creates a plain object from an Error message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.Error
             * @static
             * @param {skylark_debugging.Error} message Error
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Error.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.message = "";
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                return object;
            };
            /**
             * Converts this Error to JSON.
             * @function toJSON
             * @memberof skylark_debugging.Error
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Error.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return Error;
        })();
        skylark_debugging.SetBreakpointsResponse = (function () {
            /**
             * Properties of a SetBreakpointsResponse.
             * @memberof skylark_debugging
             * @interface ISetBreakpointsResponse
             */
            /**
             * Constructs a new SetBreakpointsResponse.
             * @memberof skylark_debugging
             * @classdesc Represents a SetBreakpointsResponse.
             * @implements ISetBreakpointsResponse
             * @constructor
             * @param {skylark_debugging.ISetBreakpointsResponse=} [properties] Properties to set
             */
            function SetBreakpointsResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * Creates a new SetBreakpointsResponse instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.SetBreakpointsResponse
             * @static
             * @param {skylark_debugging.ISetBreakpointsResponse=} [properties] Properties to set
             * @returns {skylark_debugging.SetBreakpointsResponse} SetBreakpointsResponse instance
             */
            SetBreakpointsResponse.create = function create(properties) {
                return new SetBreakpointsResponse(properties);
            };
            /**
             * Encodes the specified SetBreakpointsResponse message. Does not implicitly {@link skylark_debugging.SetBreakpointsResponse.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.SetBreakpointsResponse
             * @static
             * @param {skylark_debugging.ISetBreakpointsResponse} message SetBreakpointsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SetBreakpointsResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
            /**
             * Encodes the specified SetBreakpointsResponse message, length delimited. Does not implicitly {@link skylark_debugging.SetBreakpointsResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.SetBreakpointsResponse
             * @static
             * @param {skylark_debugging.ISetBreakpointsResponse} message SetBreakpointsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SetBreakpointsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a SetBreakpointsResponse message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.SetBreakpointsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.SetBreakpointsResponse} SetBreakpointsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SetBreakpointsResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.SetBreakpointsResponse();
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
             * Decodes a SetBreakpointsResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.SetBreakpointsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.SetBreakpointsResponse} SetBreakpointsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SetBreakpointsResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a SetBreakpointsResponse message.
             * @function verify
             * @memberof skylark_debugging.SetBreakpointsResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SetBreakpointsResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
            /**
             * Creates a SetBreakpointsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.SetBreakpointsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.SetBreakpointsResponse} SetBreakpointsResponse
             */
            SetBreakpointsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.SetBreakpointsResponse)
                    return object;
                return new $root.skylark_debugging.SetBreakpointsResponse();
            };
            /**
             * Creates a plain object from a SetBreakpointsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.SetBreakpointsResponse
             * @static
             * @param {skylark_debugging.SetBreakpointsResponse} message SetBreakpointsResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SetBreakpointsResponse.toObject = function toObject() {
                return {};
            };
            /**
             * Converts this SetBreakpointsResponse to JSON.
             * @function toJSON
             * @memberof skylark_debugging.SetBreakpointsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SetBreakpointsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return SetBreakpointsResponse;
        })();
        skylark_debugging.ContinueExecutionResponse = (function () {
            /**
             * Properties of a ContinueExecutionResponse.
             * @memberof skylark_debugging
             * @interface IContinueExecutionResponse
             */
            /**
             * Constructs a new ContinueExecutionResponse.
             * @memberof skylark_debugging
             * @classdesc Represents a ContinueExecutionResponse.
             * @implements IContinueExecutionResponse
             * @constructor
             * @param {skylark_debugging.IContinueExecutionResponse=} [properties] Properties to set
             */
            function ContinueExecutionResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * Creates a new ContinueExecutionResponse instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.ContinueExecutionResponse
             * @static
             * @param {skylark_debugging.IContinueExecutionResponse=} [properties] Properties to set
             * @returns {skylark_debugging.ContinueExecutionResponse} ContinueExecutionResponse instance
             */
            ContinueExecutionResponse.create = function create(properties) {
                return new ContinueExecutionResponse(properties);
            };
            /**
             * Encodes the specified ContinueExecutionResponse message. Does not implicitly {@link skylark_debugging.ContinueExecutionResponse.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.ContinueExecutionResponse
             * @static
             * @param {skylark_debugging.IContinueExecutionResponse} message ContinueExecutionResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContinueExecutionResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
            /**
             * Encodes the specified ContinueExecutionResponse message, length delimited. Does not implicitly {@link skylark_debugging.ContinueExecutionResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.ContinueExecutionResponse
             * @static
             * @param {skylark_debugging.IContinueExecutionResponse} message ContinueExecutionResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContinueExecutionResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a ContinueExecutionResponse message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.ContinueExecutionResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.ContinueExecutionResponse} ContinueExecutionResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContinueExecutionResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.ContinueExecutionResponse();
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
             * Decodes a ContinueExecutionResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.ContinueExecutionResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.ContinueExecutionResponse} ContinueExecutionResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContinueExecutionResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a ContinueExecutionResponse message.
             * @function verify
             * @memberof skylark_debugging.ContinueExecutionResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ContinueExecutionResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
            /**
             * Creates a ContinueExecutionResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.ContinueExecutionResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.ContinueExecutionResponse} ContinueExecutionResponse
             */
            ContinueExecutionResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.ContinueExecutionResponse)
                    return object;
                return new $root.skylark_debugging.ContinueExecutionResponse();
            };
            /**
             * Creates a plain object from a ContinueExecutionResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.ContinueExecutionResponse
             * @static
             * @param {skylark_debugging.ContinueExecutionResponse} message ContinueExecutionResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ContinueExecutionResponse.toObject = function toObject() {
                return {};
            };
            /**
             * Converts this ContinueExecutionResponse to JSON.
             * @function toJSON
             * @memberof skylark_debugging.ContinueExecutionResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ContinueExecutionResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return ContinueExecutionResponse;
        })();
        skylark_debugging.EvaluateResponse = (function () {
            /**
             * Properties of an EvaluateResponse.
             * @memberof skylark_debugging
             * @interface IEvaluateResponse
             * @property {skylark_debugging.IValue|null} [result] EvaluateResponse result
             */
            /**
             * Constructs a new EvaluateResponse.
             * @memberof skylark_debugging
             * @classdesc Represents an EvaluateResponse.
             * @implements IEvaluateResponse
             * @constructor
             * @param {skylark_debugging.IEvaluateResponse=} [properties] Properties to set
             */
            function EvaluateResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * EvaluateResponse result.
             * @member {skylark_debugging.IValue|null|undefined} result
             * @memberof skylark_debugging.EvaluateResponse
             * @instance
             */
            EvaluateResponse.prototype.result = null;
            /**
             * Creates a new EvaluateResponse instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.EvaluateResponse
             * @static
             * @param {skylark_debugging.IEvaluateResponse=} [properties] Properties to set
             * @returns {skylark_debugging.EvaluateResponse} EvaluateResponse instance
             */
            EvaluateResponse.create = function create(properties) {
                return new EvaluateResponse(properties);
            };
            /**
             * Encodes the specified EvaluateResponse message. Does not implicitly {@link skylark_debugging.EvaluateResponse.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.EvaluateResponse
             * @static
             * @param {skylark_debugging.IEvaluateResponse} message EvaluateResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EvaluateResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.result != null && message.hasOwnProperty("result"))
                    $root.skylark_debugging.Value.encode(message.result, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
                return writer;
            };
            /**
             * Encodes the specified EvaluateResponse message, length delimited. Does not implicitly {@link skylark_debugging.EvaluateResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.EvaluateResponse
             * @static
             * @param {skylark_debugging.IEvaluateResponse} message EvaluateResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EvaluateResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes an EvaluateResponse message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.EvaluateResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.EvaluateResponse} EvaluateResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EvaluateResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.EvaluateResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.result = $root.skylark_debugging.Value.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes an EvaluateResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.EvaluateResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.EvaluateResponse} EvaluateResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EvaluateResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies an EvaluateResponse message.
             * @function verify
             * @memberof skylark_debugging.EvaluateResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            EvaluateResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.result != null && message.hasOwnProperty("result")) {
                    var error = $root.skylark_debugging.Value.verify(message.result);
                    if (error)
                        return "result." + error;
                }
                return null;
            };
            /**
             * Creates an EvaluateResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.EvaluateResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.EvaluateResponse} EvaluateResponse
             */
            EvaluateResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.EvaluateResponse)
                    return object;
                var message = new $root.skylark_debugging.EvaluateResponse();
                if (object.result != null) {
                    if (typeof object.result !== "object")
                        throw TypeError(".skylark_debugging.EvaluateResponse.result: object expected");
                    message.result = $root.skylark_debugging.Value.fromObject(object.result);
                }
                return message;
            };
            /**
             * Creates a plain object from an EvaluateResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.EvaluateResponse
             * @static
             * @param {skylark_debugging.EvaluateResponse} message EvaluateResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            EvaluateResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.result = null;
                if (message.result != null && message.hasOwnProperty("result"))
                    object.result = $root.skylark_debugging.Value.toObject(message.result, options);
                return object;
            };
            /**
             * Converts this EvaluateResponse to JSON.
             * @function toJSON
             * @memberof skylark_debugging.EvaluateResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EvaluateResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return EvaluateResponse;
        })();
        skylark_debugging.ListFramesResponse = (function () {
            /**
             * Properties of a ListFramesResponse.
             * @memberof skylark_debugging
             * @interface IListFramesResponse
             * @property {Array.<skylark_debugging.IFrame>|null} [frame] ListFramesResponse frame
             */
            /**
             * Constructs a new ListFramesResponse.
             * @memberof skylark_debugging
             * @classdesc Represents a ListFramesResponse.
             * @implements IListFramesResponse
             * @constructor
             * @param {skylark_debugging.IListFramesResponse=} [properties] Properties to set
             */
            function ListFramesResponse(properties) {
                this.frame = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * ListFramesResponse frame.
             * @member {Array.<skylark_debugging.IFrame>} frame
             * @memberof skylark_debugging.ListFramesResponse
             * @instance
             */
            ListFramesResponse.prototype.frame = $util.emptyArray;
            /**
             * Creates a new ListFramesResponse instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.ListFramesResponse
             * @static
             * @param {skylark_debugging.IListFramesResponse=} [properties] Properties to set
             * @returns {skylark_debugging.ListFramesResponse} ListFramesResponse instance
             */
            ListFramesResponse.create = function create(properties) {
                return new ListFramesResponse(properties);
            };
            /**
             * Encodes the specified ListFramesResponse message. Does not implicitly {@link skylark_debugging.ListFramesResponse.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.ListFramesResponse
             * @static
             * @param {skylark_debugging.IListFramesResponse} message ListFramesResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ListFramesResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.frame != null && message.frame.length)
                    for (var i = 0; i < message.frame.length; ++i)
                        $root.skylark_debugging.Frame.encode(message.frame[i], writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
                return writer;
            };
            /**
             * Encodes the specified ListFramesResponse message, length delimited. Does not implicitly {@link skylark_debugging.ListFramesResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.ListFramesResponse
             * @static
             * @param {skylark_debugging.IListFramesResponse} message ListFramesResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ListFramesResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a ListFramesResponse message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.ListFramesResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.ListFramesResponse} ListFramesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ListFramesResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.ListFramesResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            if (!(message.frame && message.frame.length))
                                message.frame = [];
                            message.frame.push($root.skylark_debugging.Frame.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a ListFramesResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.ListFramesResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.ListFramesResponse} ListFramesResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ListFramesResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a ListFramesResponse message.
             * @function verify
             * @memberof skylark_debugging.ListFramesResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ListFramesResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.frame != null && message.hasOwnProperty("frame")) {
                    if (!Array.isArray(message.frame))
                        return "frame: array expected";
                    for (var i = 0; i < message.frame.length; ++i) {
                        var error = $root.skylark_debugging.Frame.verify(message.frame[i]);
                        if (error)
                            return "frame." + error;
                    }
                }
                return null;
            };
            /**
             * Creates a ListFramesResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.ListFramesResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.ListFramesResponse} ListFramesResponse
             */
            ListFramesResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.ListFramesResponse)
                    return object;
                var message = new $root.skylark_debugging.ListFramesResponse();
                if (object.frame) {
                    if (!Array.isArray(object.frame))
                        throw TypeError(".skylark_debugging.ListFramesResponse.frame: array expected");
                    message.frame = [];
                    for (var i = 0; i < object.frame.length; ++i) {
                        if (typeof object.frame[i] !== "object")
                            throw TypeError(".skylark_debugging.ListFramesResponse.frame: object expected");
                        message.frame[i] = $root.skylark_debugging.Frame.fromObject(object.frame[i]);
                    }
                }
                return message;
            };
            /**
             * Creates a plain object from a ListFramesResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.ListFramesResponse
             * @static
             * @param {skylark_debugging.ListFramesResponse} message ListFramesResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ListFramesResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.frame = [];
                if (message.frame && message.frame.length) {
                    object.frame = [];
                    for (var j = 0; j < message.frame.length; ++j)
                        object.frame[j] = $root.skylark_debugging.Frame.toObject(message.frame[j], options);
                }
                return object;
            };
            /**
             * Converts this ListFramesResponse to JSON.
             * @function toJSON
             * @memberof skylark_debugging.ListFramesResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ListFramesResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return ListFramesResponse;
        })();
        skylark_debugging.StartDebuggingResponse = (function () {
            /**
             * Properties of a StartDebuggingResponse.
             * @memberof skylark_debugging
             * @interface IStartDebuggingResponse
             */
            /**
             * Constructs a new StartDebuggingResponse.
             * @memberof skylark_debugging
             * @classdesc Represents a StartDebuggingResponse.
             * @implements IStartDebuggingResponse
             * @constructor
             * @param {skylark_debugging.IStartDebuggingResponse=} [properties] Properties to set
             */
            function StartDebuggingResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * Creates a new StartDebuggingResponse instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.StartDebuggingResponse
             * @static
             * @param {skylark_debugging.IStartDebuggingResponse=} [properties] Properties to set
             * @returns {skylark_debugging.StartDebuggingResponse} StartDebuggingResponse instance
             */
            StartDebuggingResponse.create = function create(properties) {
                return new StartDebuggingResponse(properties);
            };
            /**
             * Encodes the specified StartDebuggingResponse message. Does not implicitly {@link skylark_debugging.StartDebuggingResponse.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.StartDebuggingResponse
             * @static
             * @param {skylark_debugging.IStartDebuggingResponse} message StartDebuggingResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StartDebuggingResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
            /**
             * Encodes the specified StartDebuggingResponse message, length delimited. Does not implicitly {@link skylark_debugging.StartDebuggingResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.StartDebuggingResponse
             * @static
             * @param {skylark_debugging.IStartDebuggingResponse} message StartDebuggingResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StartDebuggingResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a StartDebuggingResponse message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.StartDebuggingResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.StartDebuggingResponse} StartDebuggingResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StartDebuggingResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.StartDebuggingResponse();
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
             * Decodes a StartDebuggingResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.StartDebuggingResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.StartDebuggingResponse} StartDebuggingResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StartDebuggingResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a StartDebuggingResponse message.
             * @function verify
             * @memberof skylark_debugging.StartDebuggingResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StartDebuggingResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
            /**
             * Creates a StartDebuggingResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.StartDebuggingResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.StartDebuggingResponse} StartDebuggingResponse
             */
            StartDebuggingResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.StartDebuggingResponse)
                    return object;
                return new $root.skylark_debugging.StartDebuggingResponse();
            };
            /**
             * Creates a plain object from a StartDebuggingResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.StartDebuggingResponse
             * @static
             * @param {skylark_debugging.StartDebuggingResponse} message StartDebuggingResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StartDebuggingResponse.toObject = function toObject() {
                return {};
            };
            /**
             * Converts this StartDebuggingResponse to JSON.
             * @function toJSON
             * @memberof skylark_debugging.StartDebuggingResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StartDebuggingResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return StartDebuggingResponse;
        })();
        skylark_debugging.PauseThreadResponse = (function () {
            /**
             * Properties of a PauseThreadResponse.
             * @memberof skylark_debugging
             * @interface IPauseThreadResponse
             */
            /**
             * Constructs a new PauseThreadResponse.
             * @memberof skylark_debugging
             * @classdesc Represents a PauseThreadResponse.
             * @implements IPauseThreadResponse
             * @constructor
             * @param {skylark_debugging.IPauseThreadResponse=} [properties] Properties to set
             */
            function PauseThreadResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * Creates a new PauseThreadResponse instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.PauseThreadResponse
             * @static
             * @param {skylark_debugging.IPauseThreadResponse=} [properties] Properties to set
             * @returns {skylark_debugging.PauseThreadResponse} PauseThreadResponse instance
             */
            PauseThreadResponse.create = function create(properties) {
                return new PauseThreadResponse(properties);
            };
            /**
             * Encodes the specified PauseThreadResponse message. Does not implicitly {@link skylark_debugging.PauseThreadResponse.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.PauseThreadResponse
             * @static
             * @param {skylark_debugging.IPauseThreadResponse} message PauseThreadResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PauseThreadResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
            /**
             * Encodes the specified PauseThreadResponse message, length delimited. Does not implicitly {@link skylark_debugging.PauseThreadResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.PauseThreadResponse
             * @static
             * @param {skylark_debugging.IPauseThreadResponse} message PauseThreadResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PauseThreadResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a PauseThreadResponse message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.PauseThreadResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.PauseThreadResponse} PauseThreadResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PauseThreadResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.PauseThreadResponse();
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
             * Decodes a PauseThreadResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.PauseThreadResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.PauseThreadResponse} PauseThreadResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PauseThreadResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a PauseThreadResponse message.
             * @function verify
             * @memberof skylark_debugging.PauseThreadResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PauseThreadResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
            /**
             * Creates a PauseThreadResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.PauseThreadResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.PauseThreadResponse} PauseThreadResponse
             */
            PauseThreadResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.PauseThreadResponse)
                    return object;
                return new $root.skylark_debugging.PauseThreadResponse();
            };
            /**
             * Creates a plain object from a PauseThreadResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.PauseThreadResponse
             * @static
             * @param {skylark_debugging.PauseThreadResponse} message PauseThreadResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PauseThreadResponse.toObject = function toObject() {
                return {};
            };
            /**
             * Converts this PauseThreadResponse to JSON.
             * @function toJSON
             * @memberof skylark_debugging.PauseThreadResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PauseThreadResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return PauseThreadResponse;
        })();
        skylark_debugging.GetChildrenResponse = (function () {
            /**
             * Properties of a GetChildrenResponse.
             * @memberof skylark_debugging
             * @interface IGetChildrenResponse
             * @property {Array.<skylark_debugging.IValue>|null} [children] GetChildrenResponse children
             */
            /**
             * Constructs a new GetChildrenResponse.
             * @memberof skylark_debugging
             * @classdesc Represents a GetChildrenResponse.
             * @implements IGetChildrenResponse
             * @constructor
             * @param {skylark_debugging.IGetChildrenResponse=} [properties] Properties to set
             */
            function GetChildrenResponse(properties) {
                this.children = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * GetChildrenResponse children.
             * @member {Array.<skylark_debugging.IValue>} children
             * @memberof skylark_debugging.GetChildrenResponse
             * @instance
             */
            GetChildrenResponse.prototype.children = $util.emptyArray;
            /**
             * Creates a new GetChildrenResponse instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.GetChildrenResponse
             * @static
             * @param {skylark_debugging.IGetChildrenResponse=} [properties] Properties to set
             * @returns {skylark_debugging.GetChildrenResponse} GetChildrenResponse instance
             */
            GetChildrenResponse.create = function create(properties) {
                return new GetChildrenResponse(properties);
            };
            /**
             * Encodes the specified GetChildrenResponse message. Does not implicitly {@link skylark_debugging.GetChildrenResponse.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.GetChildrenResponse
             * @static
             * @param {skylark_debugging.IGetChildrenResponse} message GetChildrenResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChildrenResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.children != null && message.children.length)
                    for (var i = 0; i < message.children.length; ++i)
                        $root.skylark_debugging.Value.encode(message.children[i], writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
                return writer;
            };
            /**
             * Encodes the specified GetChildrenResponse message, length delimited. Does not implicitly {@link skylark_debugging.GetChildrenResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.GetChildrenResponse
             * @static
             * @param {skylark_debugging.IGetChildrenResponse} message GetChildrenResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChildrenResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a GetChildrenResponse message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.GetChildrenResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.GetChildrenResponse} GetChildrenResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChildrenResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.GetChildrenResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            if (!(message.children && message.children.length))
                                message.children = [];
                            message.children.push($root.skylark_debugging.Value.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a GetChildrenResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.GetChildrenResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.GetChildrenResponse} GetChildrenResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChildrenResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a GetChildrenResponse message.
             * @function verify
             * @memberof skylark_debugging.GetChildrenResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetChildrenResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.children != null && message.hasOwnProperty("children")) {
                    if (!Array.isArray(message.children))
                        return "children: array expected";
                    for (var i = 0; i < message.children.length; ++i) {
                        var error = $root.skylark_debugging.Value.verify(message.children[i]);
                        if (error)
                            return "children." + error;
                    }
                }
                return null;
            };
            /**
             * Creates a GetChildrenResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.GetChildrenResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.GetChildrenResponse} GetChildrenResponse
             */
            GetChildrenResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.GetChildrenResponse)
                    return object;
                var message = new $root.skylark_debugging.GetChildrenResponse();
                if (object.children) {
                    if (!Array.isArray(object.children))
                        throw TypeError(".skylark_debugging.GetChildrenResponse.children: array expected");
                    message.children = [];
                    for (var i = 0; i < object.children.length; ++i) {
                        if (typeof object.children[i] !== "object")
                            throw TypeError(".skylark_debugging.GetChildrenResponse.children: object expected");
                        message.children[i] = $root.skylark_debugging.Value.fromObject(object.children[i]);
                    }
                }
                return message;
            };
            /**
             * Creates a plain object from a GetChildrenResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.GetChildrenResponse
             * @static
             * @param {skylark_debugging.GetChildrenResponse} message GetChildrenResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetChildrenResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.children = [];
                if (message.children && message.children.length) {
                    object.children = [];
                    for (var j = 0; j < message.children.length; ++j)
                        object.children[j] = $root.skylark_debugging.Value.toObject(message.children[j], options);
                }
                return object;
            };
            /**
             * Converts this GetChildrenResponse to JSON.
             * @function toJSON
             * @memberof skylark_debugging.GetChildrenResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetChildrenResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return GetChildrenResponse;
        })();
        skylark_debugging.ThreadPausedEvent = (function () {
            /**
             * Properties of a ThreadPausedEvent.
             * @memberof skylark_debugging
             * @interface IThreadPausedEvent
             * @property {skylark_debugging.IPausedThread|null} [thread] ThreadPausedEvent thread
             */
            /**
             * Constructs a new ThreadPausedEvent.
             * @memberof skylark_debugging
             * @classdesc Represents a ThreadPausedEvent.
             * @implements IThreadPausedEvent
             * @constructor
             * @param {skylark_debugging.IThreadPausedEvent=} [properties] Properties to set
             */
            function ThreadPausedEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * ThreadPausedEvent thread.
             * @member {skylark_debugging.IPausedThread|null|undefined} thread
             * @memberof skylark_debugging.ThreadPausedEvent
             * @instance
             */
            ThreadPausedEvent.prototype.thread = null;
            /**
             * Creates a new ThreadPausedEvent instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.ThreadPausedEvent
             * @static
             * @param {skylark_debugging.IThreadPausedEvent=} [properties] Properties to set
             * @returns {skylark_debugging.ThreadPausedEvent} ThreadPausedEvent instance
             */
            ThreadPausedEvent.create = function create(properties) {
                return new ThreadPausedEvent(properties);
            };
            /**
             * Encodes the specified ThreadPausedEvent message. Does not implicitly {@link skylark_debugging.ThreadPausedEvent.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.ThreadPausedEvent
             * @static
             * @param {skylark_debugging.IThreadPausedEvent} message ThreadPausedEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ThreadPausedEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.thread != null && message.hasOwnProperty("thread"))
                    $root.skylark_debugging.PausedThread.encode(message.thread, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
                return writer;
            };
            /**
             * Encodes the specified ThreadPausedEvent message, length delimited. Does not implicitly {@link skylark_debugging.ThreadPausedEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.ThreadPausedEvent
             * @static
             * @param {skylark_debugging.IThreadPausedEvent} message ThreadPausedEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ThreadPausedEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a ThreadPausedEvent message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.ThreadPausedEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.ThreadPausedEvent} ThreadPausedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ThreadPausedEvent.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.ThreadPausedEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.thread = $root.skylark_debugging.PausedThread.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a ThreadPausedEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.ThreadPausedEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.ThreadPausedEvent} ThreadPausedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ThreadPausedEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a ThreadPausedEvent message.
             * @function verify
             * @memberof skylark_debugging.ThreadPausedEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ThreadPausedEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.thread != null && message.hasOwnProperty("thread")) {
                    var error = $root.skylark_debugging.PausedThread.verify(message.thread);
                    if (error)
                        return "thread." + error;
                }
                return null;
            };
            /**
             * Creates a ThreadPausedEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.ThreadPausedEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.ThreadPausedEvent} ThreadPausedEvent
             */
            ThreadPausedEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.ThreadPausedEvent)
                    return object;
                var message = new $root.skylark_debugging.ThreadPausedEvent();
                if (object.thread != null) {
                    if (typeof object.thread !== "object")
                        throw TypeError(".skylark_debugging.ThreadPausedEvent.thread: object expected");
                    message.thread = $root.skylark_debugging.PausedThread.fromObject(object.thread);
                }
                return message;
            };
            /**
             * Creates a plain object from a ThreadPausedEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.ThreadPausedEvent
             * @static
             * @param {skylark_debugging.ThreadPausedEvent} message ThreadPausedEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ThreadPausedEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.thread = null;
                if (message.thread != null && message.hasOwnProperty("thread"))
                    object.thread = $root.skylark_debugging.PausedThread.toObject(message.thread, options);
                return object;
            };
            /**
             * Converts this ThreadPausedEvent to JSON.
             * @function toJSON
             * @memberof skylark_debugging.ThreadPausedEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ThreadPausedEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return ThreadPausedEvent;
        })();
        skylark_debugging.ThreadContinuedEvent = (function () {
            /**
             * Properties of a ThreadContinuedEvent.
             * @memberof skylark_debugging
             * @interface IThreadContinuedEvent
             * @property {number|Long|null} [threadId] ThreadContinuedEvent threadId
             */
            /**
             * Constructs a new ThreadContinuedEvent.
             * @memberof skylark_debugging
             * @classdesc Represents a ThreadContinuedEvent.
             * @implements IThreadContinuedEvent
             * @constructor
             * @param {skylark_debugging.IThreadContinuedEvent=} [properties] Properties to set
             */
            function ThreadContinuedEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * ThreadContinuedEvent threadId.
             * @member {number|Long} threadId
             * @memberof skylark_debugging.ThreadContinuedEvent
             * @instance
             */
            ThreadContinuedEvent.prototype.threadId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * Creates a new ThreadContinuedEvent instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.ThreadContinuedEvent
             * @static
             * @param {skylark_debugging.IThreadContinuedEvent=} [properties] Properties to set
             * @returns {skylark_debugging.ThreadContinuedEvent} ThreadContinuedEvent instance
             */
            ThreadContinuedEvent.create = function create(properties) {
                return new ThreadContinuedEvent(properties);
            };
            /**
             * Encodes the specified ThreadContinuedEvent message. Does not implicitly {@link skylark_debugging.ThreadContinuedEvent.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.ThreadContinuedEvent
             * @static
             * @param {skylark_debugging.IThreadContinuedEvent} message ThreadContinuedEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ThreadContinuedEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.threadId);
                return writer;
            };
            /**
             * Encodes the specified ThreadContinuedEvent message, length delimited. Does not implicitly {@link skylark_debugging.ThreadContinuedEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.ThreadContinuedEvent
             * @static
             * @param {skylark_debugging.IThreadContinuedEvent} message ThreadContinuedEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ThreadContinuedEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a ThreadContinuedEvent message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.ThreadContinuedEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.ThreadContinuedEvent} ThreadContinuedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ThreadContinuedEvent.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.ThreadContinuedEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.threadId = reader.int64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a ThreadContinuedEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.ThreadContinuedEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.ThreadContinuedEvent} ThreadContinuedEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ThreadContinuedEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a ThreadContinuedEvent message.
             * @function verify
             * @memberof skylark_debugging.ThreadContinuedEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ThreadContinuedEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    if (!$util.isInteger(message.threadId) && !(message.threadId && $util.isInteger(message.threadId.low) && $util.isInteger(message.threadId.high)))
                        return "threadId: integer|Long expected";
                return null;
            };
            /**
             * Creates a ThreadContinuedEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.ThreadContinuedEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.ThreadContinuedEvent} ThreadContinuedEvent
             */
            ThreadContinuedEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.ThreadContinuedEvent)
                    return object;
                var message = new $root.skylark_debugging.ThreadContinuedEvent();
                if (object.threadId != null)
                    if ($util.Long)
                        (message.threadId = $util.Long.fromValue(object.threadId)).unsigned = false;
                    else if (typeof object.threadId === "string")
                        message.threadId = parseInt(object.threadId, 10);
                    else if (typeof object.threadId === "number")
                        message.threadId = object.threadId;
                    else if (typeof object.threadId === "object")
                        message.threadId = new $util.LongBits(object.threadId.low >>> 0, object.threadId.high >>> 0).toNumber();
                return message;
            };
            /**
             * Creates a plain object from a ThreadContinuedEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.ThreadContinuedEvent
             * @static
             * @param {skylark_debugging.ThreadContinuedEvent} message ThreadContinuedEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ThreadContinuedEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.threadId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.threadId = options.longs === String ? "0" : 0;
                if (message.threadId != null && message.hasOwnProperty("threadId"))
                    if (typeof message.threadId === "number")
                        object.threadId = options.longs === String ? String(message.threadId) : message.threadId;
                    else
                        object.threadId = options.longs === String ? $util.Long.prototype.toString.call(message.threadId) : options.longs === Number ? new $util.LongBits(message.threadId.low >>> 0, message.threadId.high >>> 0).toNumber() : message.threadId;
                return object;
            };
            /**
             * Converts this ThreadContinuedEvent to JSON.
             * @function toJSON
             * @memberof skylark_debugging.ThreadContinuedEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ThreadContinuedEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return ThreadContinuedEvent;
        })();
        skylark_debugging.Breakpoint = (function () {
            /**
             * Properties of a Breakpoint.
             * @memberof skylark_debugging
             * @interface IBreakpoint
             * @property {skylark_debugging.ILocation|null} [location] Breakpoint location
             * @property {string|null} [expression] Breakpoint expression
             */
            /**
             * Constructs a new Breakpoint.
             * @memberof skylark_debugging
             * @classdesc Represents a Breakpoint.
             * @implements IBreakpoint
             * @constructor
             * @param {skylark_debugging.IBreakpoint=} [properties] Properties to set
             */
            function Breakpoint(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * Breakpoint location.
             * @member {skylark_debugging.ILocation|null|undefined} location
             * @memberof skylark_debugging.Breakpoint
             * @instance
             */
            Breakpoint.prototype.location = null;
            /**
             * Breakpoint expression.
             * @member {string} expression
             * @memberof skylark_debugging.Breakpoint
             * @instance
             */
            Breakpoint.prototype.expression = "";
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
            /**
             * Breakpoint condition.
             * @member {"location"|undefined} condition
             * @memberof skylark_debugging.Breakpoint
             * @instance
             */
            Object.defineProperty(Breakpoint.prototype, "condition", {
                get: $util.oneOfGetter($oneOfFields = ["location"]),
                set: $util.oneOfSetter($oneOfFields)
            });
            /**
             * Creates a new Breakpoint instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.Breakpoint
             * @static
             * @param {skylark_debugging.IBreakpoint=} [properties] Properties to set
             * @returns {skylark_debugging.Breakpoint} Breakpoint instance
             */
            Breakpoint.create = function create(properties) {
                return new Breakpoint(properties);
            };
            /**
             * Encodes the specified Breakpoint message. Does not implicitly {@link skylark_debugging.Breakpoint.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.Breakpoint
             * @static
             * @param {skylark_debugging.IBreakpoint} message Breakpoint message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Breakpoint.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.skylark_debugging.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
                if (message.expression != null && message.hasOwnProperty("expression"))
                    writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.expression);
                return writer;
            };
            /**
             * Encodes the specified Breakpoint message, length delimited. Does not implicitly {@link skylark_debugging.Breakpoint.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.Breakpoint
             * @static
             * @param {skylark_debugging.IBreakpoint} message Breakpoint message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Breakpoint.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a Breakpoint message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.Breakpoint
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.Breakpoint} Breakpoint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Breakpoint.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.Breakpoint();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.location = $root.skylark_debugging.Location.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.expression = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a Breakpoint message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.Breakpoint
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.Breakpoint} Breakpoint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Breakpoint.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a Breakpoint message.
             * @function verify
             * @memberof skylark_debugging.Breakpoint
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Breakpoint.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.location != null && message.hasOwnProperty("location")) {
                    properties.condition = 1;
                    {
                        var error = $root.skylark_debugging.Location.verify(message.location);
                        if (error)
                            return "location." + error;
                    }
                }
                if (message.expression != null && message.hasOwnProperty("expression"))
                    if (!$util.isString(message.expression))
                        return "expression: string expected";
                return null;
            };
            /**
             * Creates a Breakpoint message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.Breakpoint
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.Breakpoint} Breakpoint
             */
            Breakpoint.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.Breakpoint)
                    return object;
                var message = new $root.skylark_debugging.Breakpoint();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".skylark_debugging.Breakpoint.location: object expected");
                    message.location = $root.skylark_debugging.Location.fromObject(object.location);
                }
                if (object.expression != null)
                    message.expression = String(object.expression);
                return message;
            };
            /**
             * Creates a plain object from a Breakpoint message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.Breakpoint
             * @static
             * @param {skylark_debugging.Breakpoint} message Breakpoint
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Breakpoint.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.expression = "";
                if (message.location != null && message.hasOwnProperty("location")) {
                    object.location = $root.skylark_debugging.Location.toObject(message.location, options);
                    if (options.oneofs)
                        object.condition = "location";
                }
                if (message.expression != null && message.hasOwnProperty("expression"))
                    object.expression = message.expression;
                return object;
            };
            /**
             * Converts this Breakpoint to JSON.
             * @function toJSON
             * @memberof skylark_debugging.Breakpoint
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Breakpoint.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return Breakpoint;
        })();
        skylark_debugging.Frame = (function () {
            /**
             * Properties of a Frame.
             * @memberof skylark_debugging
             * @interface IFrame
             * @property {string|null} [functionName] Frame functionName
             * @property {Array.<skylark_debugging.IScope>|null} [scope] Frame scope
             * @property {skylark_debugging.ILocation|null} [location] Frame location
             */
            /**
             * Constructs a new Frame.
             * @memberof skylark_debugging
             * @classdesc Represents a Frame.
             * @implements IFrame
             * @constructor
             * @param {skylark_debugging.IFrame=} [properties] Properties to set
             */
            function Frame(properties) {
                this.scope = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * Frame functionName.
             * @member {string} functionName
             * @memberof skylark_debugging.Frame
             * @instance
             */
            Frame.prototype.functionName = "";
            /**
             * Frame scope.
             * @member {Array.<skylark_debugging.IScope>} scope
             * @memberof skylark_debugging.Frame
             * @instance
             */
            Frame.prototype.scope = $util.emptyArray;
            /**
             * Frame location.
             * @member {skylark_debugging.ILocation|null|undefined} location
             * @memberof skylark_debugging.Frame
             * @instance
             */
            Frame.prototype.location = null;
            /**
             * Creates a new Frame instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.Frame
             * @static
             * @param {skylark_debugging.IFrame=} [properties] Properties to set
             * @returns {skylark_debugging.Frame} Frame instance
             */
            Frame.create = function create(properties) {
                return new Frame(properties);
            };
            /**
             * Encodes the specified Frame message. Does not implicitly {@link skylark_debugging.Frame.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.Frame
             * @static
             * @param {skylark_debugging.IFrame} message Frame message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Frame.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.functionName != null && message.hasOwnProperty("functionName"))
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.functionName);
                if (message.scope != null && message.scope.length)
                    for (var i = 0; i < message.scope.length; ++i)
                        $root.skylark_debugging.Scope.encode(message.scope[i], writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim();
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.skylark_debugging.Location.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/ 26).fork()).ldelim();
                return writer;
            };
            /**
             * Encodes the specified Frame message, length delimited. Does not implicitly {@link skylark_debugging.Frame.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.Frame
             * @static
             * @param {skylark_debugging.IFrame} message Frame message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Frame.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a Frame message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.Frame
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.Frame} Frame
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Frame.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.Frame();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.functionName = reader.string();
                            break;
                        case 2:
                            if (!(message.scope && message.scope.length))
                                message.scope = [];
                            message.scope.push($root.skylark_debugging.Scope.decode(reader, reader.uint32()));
                            break;
                        case 3:
                            message.location = $root.skylark_debugging.Location.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a Frame message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.Frame
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.Frame} Frame
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Frame.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a Frame message.
             * @function verify
             * @memberof skylark_debugging.Frame
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Frame.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.functionName != null && message.hasOwnProperty("functionName"))
                    if (!$util.isString(message.functionName))
                        return "functionName: string expected";
                if (message.scope != null && message.hasOwnProperty("scope")) {
                    if (!Array.isArray(message.scope))
                        return "scope: array expected";
                    for (var i = 0; i < message.scope.length; ++i) {
                        var error = $root.skylark_debugging.Scope.verify(message.scope[i]);
                        if (error)
                            return "scope." + error;
                    }
                }
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.skylark_debugging.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                return null;
            };
            /**
             * Creates a Frame message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.Frame
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.Frame} Frame
             */
            Frame.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.Frame)
                    return object;
                var message = new $root.skylark_debugging.Frame();
                if (object.functionName != null)
                    message.functionName = String(object.functionName);
                if (object.scope) {
                    if (!Array.isArray(object.scope))
                        throw TypeError(".skylark_debugging.Frame.scope: array expected");
                    message.scope = [];
                    for (var i = 0; i < object.scope.length; ++i) {
                        if (typeof object.scope[i] !== "object")
                            throw TypeError(".skylark_debugging.Frame.scope: object expected");
                        message.scope[i] = $root.skylark_debugging.Scope.fromObject(object.scope[i]);
                    }
                }
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".skylark_debugging.Frame.location: object expected");
                    message.location = $root.skylark_debugging.Location.fromObject(object.location);
                }
                return message;
            };
            /**
             * Creates a plain object from a Frame message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.Frame
             * @static
             * @param {skylark_debugging.Frame} message Frame
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Frame.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.scope = [];
                if (options.defaults) {
                    object.functionName = "";
                    object.location = null;
                }
                if (message.functionName != null && message.hasOwnProperty("functionName"))
                    object.functionName = message.functionName;
                if (message.scope && message.scope.length) {
                    object.scope = [];
                    for (var j = 0; j < message.scope.length; ++j)
                        object.scope[j] = $root.skylark_debugging.Scope.toObject(message.scope[j], options);
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.skylark_debugging.Location.toObject(message.location, options);
                return object;
            };
            /**
             * Converts this Frame to JSON.
             * @function toJSON
             * @memberof skylark_debugging.Frame
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Frame.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return Frame;
        })();
        skylark_debugging.Location = (function () {
            /**
             * Properties of a Location.
             * @memberof skylark_debugging
             * @interface ILocation
             * @property {string|null} [path] Location path
             * @property {number|null} [lineNumber] Location lineNumber
             * @property {number|null} [columnNumber] Location columnNumber
             */
            /**
             * Constructs a new Location.
             * @memberof skylark_debugging
             * @classdesc Represents a Location.
             * @implements ILocation
             * @constructor
             * @param {skylark_debugging.ILocation=} [properties] Properties to set
             */
            function Location(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * Location path.
             * @member {string} path
             * @memberof skylark_debugging.Location
             * @instance
             */
            Location.prototype.path = "";
            /**
             * Location lineNumber.
             * @member {number} lineNumber
             * @memberof skylark_debugging.Location
             * @instance
             */
            Location.prototype.lineNumber = 0;
            /**
             * Location columnNumber.
             * @member {number} columnNumber
             * @memberof skylark_debugging.Location
             * @instance
             */
            Location.prototype.columnNumber = 0;
            /**
             * Creates a new Location instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.Location
             * @static
             * @param {skylark_debugging.ILocation=} [properties] Properties to set
             * @returns {skylark_debugging.Location} Location instance
             */
            Location.create = function create(properties) {
                return new Location(properties);
            };
            /**
             * Encodes the specified Location message. Does not implicitly {@link skylark_debugging.Location.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.Location
             * @static
             * @param {skylark_debugging.ILocation} message Location message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Location.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.path != null && message.hasOwnProperty("path"))
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.path);
                if (message.lineNumber != null && message.hasOwnProperty("lineNumber"))
                    writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.lineNumber);
                if (message.columnNumber != null && message.hasOwnProperty("columnNumber"))
                    writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.columnNumber);
                return writer;
            };
            /**
             * Encodes the specified Location message, length delimited. Does not implicitly {@link skylark_debugging.Location.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.Location
             * @static
             * @param {skylark_debugging.ILocation} message Location message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Location.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a Location message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.Location
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.Location} Location
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Location.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.Location();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.path = reader.string();
                            break;
                        case 2:
                            message.lineNumber = reader.uint32();
                            break;
                        case 3:
                            message.columnNumber = reader.uint32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a Location message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.Location
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.Location} Location
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Location.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a Location message.
             * @function verify
             * @memberof skylark_debugging.Location
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Location.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.path != null && message.hasOwnProperty("path"))
                    if (!$util.isString(message.path))
                        return "path: string expected";
                if (message.lineNumber != null && message.hasOwnProperty("lineNumber"))
                    if (!$util.isInteger(message.lineNumber))
                        return "lineNumber: integer expected";
                if (message.columnNumber != null && message.hasOwnProperty("columnNumber"))
                    if (!$util.isInteger(message.columnNumber))
                        return "columnNumber: integer expected";
                return null;
            };
            /**
             * Creates a Location message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.Location
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.Location} Location
             */
            Location.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.Location)
                    return object;
                var message = new $root.skylark_debugging.Location();
                if (object.path != null)
                    message.path = String(object.path);
                if (object.lineNumber != null)
                    message.lineNumber = object.lineNumber >>> 0;
                if (object.columnNumber != null)
                    message.columnNumber = object.columnNumber >>> 0;
                return message;
            };
            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.Location
             * @static
             * @param {skylark_debugging.Location} message Location
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Location.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.path = "";
                    object.lineNumber = 0;
                    object.columnNumber = 0;
                }
                if (message.path != null && message.hasOwnProperty("path"))
                    object.path = message.path;
                if (message.lineNumber != null && message.hasOwnProperty("lineNumber"))
                    object.lineNumber = message.lineNumber;
                if (message.columnNumber != null && message.hasOwnProperty("columnNumber"))
                    object.columnNumber = message.columnNumber;
                return object;
            };
            /**
             * Converts this Location to JSON.
             * @function toJSON
             * @memberof skylark_debugging.Location
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Location.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return Location;
        })();
        skylark_debugging.Scope = (function () {
            /**
             * Properties of a Scope.
             * @memberof skylark_debugging
             * @interface IScope
             * @property {string|null} [name] Scope name
             * @property {Array.<skylark_debugging.IValue>|null} [binding] Scope binding
             */
            /**
             * Constructs a new Scope.
             * @memberof skylark_debugging
             * @classdesc Represents a Scope.
             * @implements IScope
             * @constructor
             * @param {skylark_debugging.IScope=} [properties] Properties to set
             */
            function Scope(properties) {
                this.binding = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * Scope name.
             * @member {string} name
             * @memberof skylark_debugging.Scope
             * @instance
             */
            Scope.prototype.name = "";
            /**
             * Scope binding.
             * @member {Array.<skylark_debugging.IValue>} binding
             * @memberof skylark_debugging.Scope
             * @instance
             */
            Scope.prototype.binding = $util.emptyArray;
            /**
             * Creates a new Scope instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.Scope
             * @static
             * @param {skylark_debugging.IScope=} [properties] Properties to set
             * @returns {skylark_debugging.Scope} Scope instance
             */
            Scope.create = function create(properties) {
                return new Scope(properties);
            };
            /**
             * Encodes the specified Scope message. Does not implicitly {@link skylark_debugging.Scope.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.Scope
             * @static
             * @param {skylark_debugging.IScope} message Scope message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Scope.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name);
                if (message.binding != null && message.binding.length)
                    for (var i = 0; i < message.binding.length; ++i)
                        $root.skylark_debugging.Value.encode(message.binding[i], writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim();
                return writer;
            };
            /**
             * Encodes the specified Scope message, length delimited. Does not implicitly {@link skylark_debugging.Scope.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.Scope
             * @static
             * @param {skylark_debugging.IScope} message Scope message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Scope.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a Scope message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.Scope
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.Scope} Scope
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Scope.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.Scope();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string();
                            break;
                        case 2:
                            if (!(message.binding && message.binding.length))
                                message.binding = [];
                            message.binding.push($root.skylark_debugging.Value.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a Scope message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.Scope
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.Scope} Scope
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Scope.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a Scope message.
             * @function verify
             * @memberof skylark_debugging.Scope
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Scope.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.binding != null && message.hasOwnProperty("binding")) {
                    if (!Array.isArray(message.binding))
                        return "binding: array expected";
                    for (var i = 0; i < message.binding.length; ++i) {
                        var error = $root.skylark_debugging.Value.verify(message.binding[i]);
                        if (error)
                            return "binding." + error;
                    }
                }
                return null;
            };
            /**
             * Creates a Scope message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.Scope
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.Scope} Scope
             */
            Scope.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.Scope)
                    return object;
                var message = new $root.skylark_debugging.Scope();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.binding) {
                    if (!Array.isArray(object.binding))
                        throw TypeError(".skylark_debugging.Scope.binding: array expected");
                    message.binding = [];
                    for (var i = 0; i < object.binding.length; ++i) {
                        if (typeof object.binding[i] !== "object")
                            throw TypeError(".skylark_debugging.Scope.binding: object expected");
                        message.binding[i] = $root.skylark_debugging.Value.fromObject(object.binding[i]);
                    }
                }
                return message;
            };
            /**
             * Creates a plain object from a Scope message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.Scope
             * @static
             * @param {skylark_debugging.Scope} message Scope
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Scope.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.binding = [];
                if (options.defaults)
                    object.name = "";
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.binding && message.binding.length) {
                    object.binding = [];
                    for (var j = 0; j < message.binding.length; ++j)
                        object.binding[j] = $root.skylark_debugging.Value.toObject(message.binding[j], options);
                }
                return object;
            };
            /**
             * Converts this Scope to JSON.
             * @function toJSON
             * @memberof skylark_debugging.Scope
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Scope.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return Scope;
        })();
        /**
         * Stepping enum.
         * @name skylark_debugging.Stepping
         * @enum {string}
         * @property {number} NONE=0 NONE value
         * @property {number} INTO=1 INTO value
         * @property {number} OVER=2 OVER value
         * @property {number} OUT=3 OUT value
         */
        skylark_debugging.Stepping = (function () {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "NONE"] = 0;
            values[valuesById[1] = "INTO"] = 1;
            values[valuesById[2] = "OVER"] = 2;
            values[valuesById[3] = "OUT"] = 3;
            return values;
        })();
        skylark_debugging.PausedThread = (function () {
            /**
             * Properties of a PausedThread.
             * @memberof skylark_debugging
             * @interface IPausedThread
             * @property {number|Long|null} [id] PausedThread id
             * @property {string|null} [name] PausedThread name
             * @property {skylark_debugging.PauseReason|null} [pauseReason] PausedThread pauseReason
             * @property {skylark_debugging.ILocation|null} [location] PausedThread location
             * @property {skylark_debugging.IError|null} [conditionalBreakpointError] PausedThread conditionalBreakpointError
             */
            /**
             * Constructs a new PausedThread.
             * @memberof skylark_debugging
             * @classdesc Represents a PausedThread.
             * @implements IPausedThread
             * @constructor
             * @param {skylark_debugging.IPausedThread=} [properties] Properties to set
             */
            function PausedThread(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * PausedThread id.
             * @member {number|Long} id
             * @memberof skylark_debugging.PausedThread
             * @instance
             */
            PausedThread.prototype.id = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * PausedThread name.
             * @member {string} name
             * @memberof skylark_debugging.PausedThread
             * @instance
             */
            PausedThread.prototype.name = "";
            /**
             * PausedThread pauseReason.
             * @member {skylark_debugging.PauseReason} pauseReason
             * @memberof skylark_debugging.PausedThread
             * @instance
             */
            PausedThread.prototype.pauseReason = 0;
            /**
             * PausedThread location.
             * @member {skylark_debugging.ILocation|null|undefined} location
             * @memberof skylark_debugging.PausedThread
             * @instance
             */
            PausedThread.prototype.location = null;
            /**
             * PausedThread conditionalBreakpointError.
             * @member {skylark_debugging.IError|null|undefined} conditionalBreakpointError
             * @memberof skylark_debugging.PausedThread
             * @instance
             */
            PausedThread.prototype.conditionalBreakpointError = null;
            /**
             * Creates a new PausedThread instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.PausedThread
             * @static
             * @param {skylark_debugging.IPausedThread=} [properties] Properties to set
             * @returns {skylark_debugging.PausedThread} PausedThread instance
             */
            PausedThread.create = function create(properties) {
                return new PausedThread(properties);
            };
            /**
             * Encodes the specified PausedThread message. Does not implicitly {@link skylark_debugging.PausedThread.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.PausedThread
             * @static
             * @param {skylark_debugging.IPausedThread} message PausedThread message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PausedThread.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.id);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.name);
                if (message.pauseReason != null && message.hasOwnProperty("pauseReason"))
                    writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.pauseReason);
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.skylark_debugging.Location.encode(message.location, writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim();
                if (message.conditionalBreakpointError != null && message.hasOwnProperty("conditionalBreakpointError"))
                    $root.skylark_debugging.Error.encode(message.conditionalBreakpointError, writer.uint32(/* id 5, wireType 2 =*/ 42).fork()).ldelim();
                return writer;
            };
            /**
             * Encodes the specified PausedThread message, length delimited. Does not implicitly {@link skylark_debugging.PausedThread.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.PausedThread
             * @static
             * @param {skylark_debugging.IPausedThread} message PausedThread message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PausedThread.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a PausedThread message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.PausedThread
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.PausedThread} PausedThread
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PausedThread.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.PausedThread();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.id = reader.int64();
                            break;
                        case 2:
                            message.name = reader.string();
                            break;
                        case 3:
                            message.pauseReason = reader.int32();
                            break;
                        case 4:
                            message.location = $root.skylark_debugging.Location.decode(reader, reader.uint32());
                            break;
                        case 5:
                            message.conditionalBreakpointError = $root.skylark_debugging.Error.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a PausedThread message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.PausedThread
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.PausedThread} PausedThread
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PausedThread.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a PausedThread message.
             * @function verify
             * @memberof skylark_debugging.PausedThread
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PausedThread.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.pauseReason != null && message.hasOwnProperty("pauseReason"))
                    switch (message.pauseReason) {
                        default:
                            return "pauseReason: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            break;
                    }
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.skylark_debugging.Location.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                if (message.conditionalBreakpointError != null && message.hasOwnProperty("conditionalBreakpointError")) {
                    var error = $root.skylark_debugging.Error.verify(message.conditionalBreakpointError);
                    if (error)
                        return "conditionalBreakpointError." + error;
                }
                return null;
            };
            /**
             * Creates a PausedThread message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.PausedThread
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.PausedThread} PausedThread
             */
            PausedThread.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.PausedThread)
                    return object;
                var message = new $root.skylark_debugging.PausedThread();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                if (object.name != null)
                    message.name = String(object.name);
                switch (object.pauseReason) {
                    case "UNSET":
                    case 0:
                        message.pauseReason = 0;
                        break;
                    case "STEPPING":
                    case 1:
                        message.pauseReason = 1;
                        break;
                    case "ALL_THREADS_PAUSED":
                    case 2:
                        message.pauseReason = 2;
                        break;
                    case "PAUSE_THREAD_REQUEST":
                    case 3:
                        message.pauseReason = 3;
                        break;
                    case "HIT_BREAKPOINT":
                    case 4:
                        message.pauseReason = 4;
                        break;
                    case "CONDITIONAL_BREAKPOINT_ERROR":
                    case 5:
                        message.pauseReason = 5;
                        break;
                    case "INITIALIZING":
                    case 6:
                        message.pauseReason = 6;
                        break;
                }
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".skylark_debugging.PausedThread.location: object expected");
                    message.location = $root.skylark_debugging.Location.fromObject(object.location);
                }
                if (object.conditionalBreakpointError != null) {
                    if (typeof object.conditionalBreakpointError !== "object")
                        throw TypeError(".skylark_debugging.PausedThread.conditionalBreakpointError: object expected");
                    message.conditionalBreakpointError = $root.skylark_debugging.Error.fromObject(object.conditionalBreakpointError);
                }
                return message;
            };
            /**
             * Creates a plain object from a PausedThread message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.PausedThread
             * @static
             * @param {skylark_debugging.PausedThread} message PausedThread
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PausedThread.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.id = options.longs === String ? "0" : 0;
                    object.name = "";
                    object.pauseReason = options.enums === String ? "UNSET" : 0;
                    object.location = null;
                    object.conditionalBreakpointError = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.pauseReason != null && message.hasOwnProperty("pauseReason"))
                    object.pauseReason = options.enums === String ? $root.skylark_debugging.PauseReason[message.pauseReason] : message.pauseReason;
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.skylark_debugging.Location.toObject(message.location, options);
                if (message.conditionalBreakpointError != null && message.hasOwnProperty("conditionalBreakpointError"))
                    object.conditionalBreakpointError = $root.skylark_debugging.Error.toObject(message.conditionalBreakpointError, options);
                return object;
            };
            /**
             * Converts this PausedThread to JSON.
             * @function toJSON
             * @memberof skylark_debugging.PausedThread
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PausedThread.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return PausedThread;
        })();
        /**
         * PauseReason enum.
         * @name skylark_debugging.PauseReason
         * @enum {string}
         * @property {number} UNSET=0 UNSET value
         * @property {number} STEPPING=1 STEPPING value
         * @property {number} ALL_THREADS_PAUSED=2 ALL_THREADS_PAUSED value
         * @property {number} PAUSE_THREAD_REQUEST=3 PAUSE_THREAD_REQUEST value
         * @property {number} HIT_BREAKPOINT=4 HIT_BREAKPOINT value
         * @property {number} CONDITIONAL_BREAKPOINT_ERROR=5 CONDITIONAL_BREAKPOINT_ERROR value
         * @property {number} INITIALIZING=6 INITIALIZING value
         */
        skylark_debugging.PauseReason = (function () {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNSET"] = 0;
            values[valuesById[1] = "STEPPING"] = 1;
            values[valuesById[2] = "ALL_THREADS_PAUSED"] = 2;
            values[valuesById[3] = "PAUSE_THREAD_REQUEST"] = 3;
            values[valuesById[4] = "HIT_BREAKPOINT"] = 4;
            values[valuesById[5] = "CONDITIONAL_BREAKPOINT_ERROR"] = 5;
            values[valuesById[6] = "INITIALIZING"] = 6;
            return values;
        })();
        skylark_debugging.Value = (function () {
            /**
             * Properties of a Value.
             * @memberof skylark_debugging
             * @interface IValue
             * @property {string|null} [label] Value label
             * @property {string|null} [description] Value description
             * @property {string|null} [type] Value type
             * @property {boolean|null} [hasChildren] Value hasChildren
             * @property {number|Long|null} [id] Value id
             */
            /**
             * Constructs a new Value.
             * @memberof skylark_debugging
             * @classdesc Represents a Value.
             * @implements IValue
             * @constructor
             * @param {skylark_debugging.IValue=} [properties] Properties to set
             */
            function Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * Value label.
             * @member {string} label
             * @memberof skylark_debugging.Value
             * @instance
             */
            Value.prototype.label = "";
            /**
             * Value description.
             * @member {string} description
             * @memberof skylark_debugging.Value
             * @instance
             */
            Value.prototype.description = "";
            /**
             * Value type.
             * @member {string} type
             * @memberof skylark_debugging.Value
             * @instance
             */
            Value.prototype.type = "";
            /**
             * Value hasChildren.
             * @member {boolean} hasChildren
             * @memberof skylark_debugging.Value
             * @instance
             */
            Value.prototype.hasChildren = false;
            /**
             * Value id.
             * @member {number|Long} id
             * @memberof skylark_debugging.Value
             * @instance
             */
            Value.prototype.id = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * Creates a new Value instance using the specified properties.
             * @function create
             * @memberof skylark_debugging.Value
             * @static
             * @param {skylark_debugging.IValue=} [properties] Properties to set
             * @returns {skylark_debugging.Value} Value instance
             */
            Value.create = function create(properties) {
                return new Value(properties);
            };
            /**
             * Encodes the specified Value message. Does not implicitly {@link skylark_debugging.Value.verify|verify} messages.
             * @function encode
             * @memberof skylark_debugging.Value
             * @static
             * @param {skylark_debugging.IValue} message Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.label != null && message.hasOwnProperty("label"))
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.label);
                if (message.description != null && message.hasOwnProperty("description"))
                    writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.description);
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.type);
                if (message.hasChildren != null && message.hasOwnProperty("hasChildren"))
                    writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.hasChildren);
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 5, wireType 0 =*/ 40).int64(message.id);
                return writer;
            };
            /**
             * Encodes the specified Value message, length delimited. Does not implicitly {@link skylark_debugging.Value.verify|verify} messages.
             * @function encodeDelimited
             * @memberof skylark_debugging.Value
             * @static
             * @param {skylark_debugging.IValue} message Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a Value message from the specified reader or buffer.
             * @function decode
             * @memberof skylark_debugging.Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {skylark_debugging.Value} Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.skylark_debugging.Value();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.label = reader.string();
                            break;
                        case 2:
                            message.description = reader.string();
                            break;
                        case 3:
                            message.type = reader.string();
                            break;
                        case 4:
                            message.hasChildren = reader.bool();
                            break;
                        case 5:
                            message.id = reader.int64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a Value message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof skylark_debugging.Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {skylark_debugging.Value} Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a Value message.
             * @function verify
             * @memberof skylark_debugging.Value
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Value.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.label != null && message.hasOwnProperty("label"))
                    if (!$util.isString(message.label))
                        return "label: string expected";
                if (message.description != null && message.hasOwnProperty("description"))
                    if (!$util.isString(message.description))
                        return "description: string expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    if (!$util.isString(message.type))
                        return "type: string expected";
                if (message.hasChildren != null && message.hasOwnProperty("hasChildren"))
                    if (typeof message.hasChildren !== "boolean")
                        return "hasChildren: boolean expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                return null;
            };
            /**
             * Creates a Value message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof skylark_debugging.Value
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {skylark_debugging.Value} Value
             */
            Value.fromObject = function fromObject(object) {
                if (object instanceof $root.skylark_debugging.Value)
                    return object;
                var message = new $root.skylark_debugging.Value();
                if (object.label != null)
                    message.label = String(object.label);
                if (object.description != null)
                    message.description = String(object.description);
                if (object.type != null)
                    message.type = String(object.type);
                if (object.hasChildren != null)
                    message.hasChildren = Boolean(object.hasChildren);
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                return message;
            };
            /**
             * Creates a plain object from a Value message. Also converts values to other types if specified.
             * @function toObject
             * @memberof skylark_debugging.Value
             * @static
             * @param {skylark_debugging.Value} message Value
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.label = "";
                    object.description = "";
                    object.type = "";
                    object.hasChildren = false;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.id = options.longs === String ? "0" : 0;
                }
                if (message.label != null && message.hasOwnProperty("label"))
                    object.label = message.label;
                if (message.description != null && message.hasOwnProperty("description"))
                    object.description = message.description;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.hasChildren != null && message.hasOwnProperty("hasChildren"))
                    object.hasChildren = message.hasChildren;
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                return object;
            };
            /**
             * Converts this Value to JSON.
             * @function toJSON
             * @memberof skylark_debugging.Value
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return Value;
        })();
        return skylark_debugging;
    })();
    return $root;
});
//# sourceMappingURL=debug_protocol.js.map