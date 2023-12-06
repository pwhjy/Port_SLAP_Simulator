"use strict";
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();
var src_main_protobuf_invocation_policy_pb = require('../../../../../../../../../../src/main/protobuf/invocation_policy_pb.js');
var src_main_protobuf_command_line_pb = require('../../../../../../../../../../src/main/protobuf/command_line_pb.js');
goog.exportSymbol('proto.build_event_stream.Aborted', null, global);
goog.exportSymbol('proto.build_event_stream.Aborted.AbortReason', null, global);
goog.exportSymbol('proto.build_event_stream.ActionExecuted', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEvent', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.ActionCompletedId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.BuildFinishedId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.BuildMetricsId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.BuildStartedId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.BuildToolLogsId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.ConfigurationId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.ConfiguredLabelId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.FetchId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.NamedSetOfFilesId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.OptionsParsedId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.PatternExpandedId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.ProgressId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.StructuredCommandLineId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.TargetCompletedId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.TargetConfiguredId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.TestResultId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.TestSummaryId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.UnconfiguredLabelId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.UnknownBuildEventId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.UnstructuredCommandLineId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildEventId.WorkspaceStatusId', null, global);
goog.exportSymbol('proto.build_event_stream.BuildFinished', null, global);
goog.exportSymbol('proto.build_event_stream.BuildFinished.ExitCode', null, global);
goog.exportSymbol('proto.build_event_stream.BuildMetrics', null, global);
goog.exportSymbol('proto.build_event_stream.BuildMetrics.ActionSummary', null, global);
goog.exportSymbol('proto.build_event_stream.BuildMetrics.MemoryMetrics', null, global);
goog.exportSymbol('proto.build_event_stream.BuildMetrics.PackageMetrics', null, global);
goog.exportSymbol('proto.build_event_stream.BuildMetrics.TargetMetrics', null, global);
goog.exportSymbol('proto.build_event_stream.BuildStarted', null, global);
goog.exportSymbol('proto.build_event_stream.BuildToolLogs', null, global);
goog.exportSymbol('proto.build_event_stream.Configuration', null, global);
goog.exportSymbol('proto.build_event_stream.Fetch', null, global);
goog.exportSymbol('proto.build_event_stream.File', null, global);
goog.exportSymbol('proto.build_event_stream.NamedSetOfFiles', null, global);
goog.exportSymbol('proto.build_event_stream.OptionsParsed', null, global);
goog.exportSymbol('proto.build_event_stream.OutputGroup', null, global);
goog.exportSymbol('proto.build_event_stream.PatternExpanded', null, global);
goog.exportSymbol('proto.build_event_stream.Progress', null, global);
goog.exportSymbol('proto.build_event_stream.TargetComplete', null, global);
goog.exportSymbol('proto.build_event_stream.TargetConfigured', null, global);
goog.exportSymbol('proto.build_event_stream.TestResult', null, global);
goog.exportSymbol('proto.build_event_stream.TestResult.ExecutionInfo', null, global);
goog.exportSymbol('proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage', null, global);
goog.exportSymbol('proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown', null, global);
goog.exportSymbol('proto.build_event_stream.TestSize', null, global);
goog.exportSymbol('proto.build_event_stream.TestStatus', null, global);
goog.exportSymbol('proto.build_event_stream.TestSummary', null, global);
goog.exportSymbol('proto.build_event_stream.UnstructuredCommandLine', null, global);
goog.exportSymbol('proto.build_event_stream.WorkspaceStatus', null, global);
goog.exportSymbol('proto.build_event_stream.WorkspaceStatus.Item', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, proto.build_event_stream.BuildEventId.oneofGroups_);
};
goog.inherits(proto.build_event_stream.BuildEventId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.displayName = 'proto.build_event_stream.BuildEventId';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.build_event_stream.BuildEventId.oneofGroups_ = [[1, 2, 3, 11, 18, 14, 12, 17, 15, 16, 4, 10, 13, 5, 6, 19, 21, 8, 7, 9, 20, 22]];
/**
 * @enum {number}
 */
proto.build_event_stream.BuildEventId.IdCase = {
    ID_NOT_SET: 0,
    UNKNOWN: 1,
    PROGRESS: 2,
    STARTED: 3,
    UNSTRUCTURED_COMMAND_LINE: 11,
    STRUCTURED_COMMAND_LINE: 18,
    WORKSPACE_STATUS: 14,
    OPTIONS_PARSED: 12,
    FETCH: 17,
    CONFIGURATION: 15,
    TARGET_CONFIGURED: 16,
    PATTERN: 4,
    PATTERN_SKIPPED: 10,
    NAMED_SET: 13,
    TARGET_COMPLETED: 5,
    ACTION_COMPLETED: 6,
    UNCONFIGURED_LABEL: 19,
    CONFIGURED_LABEL: 21,
    TEST_RESULT: 8,
    TEST_SUMMARY: 7,
    BUILD_FINISHED: 9,
    BUILD_TOOL_LOGS: 20,
    BUILD_METRICS: 22
};
/**
 * @return {proto.build_event_stream.BuildEventId.IdCase}
 */
proto.build_event_stream.BuildEventId.prototype.getIdCase = function () {
    return /** @type {proto.build_event_stream.BuildEventId.IdCase} */ (jspb.Message.computeOneofCase(this, proto.build_event_stream.BuildEventId.oneofGroups_[0]));
};
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.toObject = function (includeInstance, msg) {
        var f, obj = {
            unknown: (f = msg.getUnknown()) && proto.build_event_stream.BuildEventId.UnknownBuildEventId.toObject(includeInstance, f),
            progress: (f = msg.getProgress()) && proto.build_event_stream.BuildEventId.ProgressId.toObject(includeInstance, f),
            started: (f = msg.getStarted()) && proto.build_event_stream.BuildEventId.BuildStartedId.toObject(includeInstance, f),
            unstructuredCommandLine: (f = msg.getUnstructuredCommandLine()) && proto.build_event_stream.BuildEventId.UnstructuredCommandLineId.toObject(includeInstance, f),
            structuredCommandLine: (f = msg.getStructuredCommandLine()) && proto.build_event_stream.BuildEventId.StructuredCommandLineId.toObject(includeInstance, f),
            workspaceStatus: (f = msg.getWorkspaceStatus()) && proto.build_event_stream.BuildEventId.WorkspaceStatusId.toObject(includeInstance, f),
            optionsParsed: (f = msg.getOptionsParsed()) && proto.build_event_stream.BuildEventId.OptionsParsedId.toObject(includeInstance, f),
            fetch: (f = msg.getFetch()) && proto.build_event_stream.BuildEventId.FetchId.toObject(includeInstance, f),
            configuration: (f = msg.getConfiguration()) && proto.build_event_stream.BuildEventId.ConfigurationId.toObject(includeInstance, f),
            targetConfigured: (f = msg.getTargetConfigured()) && proto.build_event_stream.BuildEventId.TargetConfiguredId.toObject(includeInstance, f),
            pattern: (f = msg.getPattern()) && proto.build_event_stream.BuildEventId.PatternExpandedId.toObject(includeInstance, f),
            patternSkipped: (f = msg.getPatternSkipped()) && proto.build_event_stream.BuildEventId.PatternExpandedId.toObject(includeInstance, f),
            namedSet: (f = msg.getNamedSet()) && proto.build_event_stream.BuildEventId.NamedSetOfFilesId.toObject(includeInstance, f),
            targetCompleted: (f = msg.getTargetCompleted()) && proto.build_event_stream.BuildEventId.TargetCompletedId.toObject(includeInstance, f),
            actionCompleted: (f = msg.getActionCompleted()) && proto.build_event_stream.BuildEventId.ActionCompletedId.toObject(includeInstance, f),
            unconfiguredLabel: (f = msg.getUnconfiguredLabel()) && proto.build_event_stream.BuildEventId.UnconfiguredLabelId.toObject(includeInstance, f),
            configuredLabel: (f = msg.getConfiguredLabel()) && proto.build_event_stream.BuildEventId.ConfiguredLabelId.toObject(includeInstance, f),
            testResult: (f = msg.getTestResult()) && proto.build_event_stream.BuildEventId.TestResultId.toObject(includeInstance, f),
            testSummary: (f = msg.getTestSummary()) && proto.build_event_stream.BuildEventId.TestSummaryId.toObject(includeInstance, f),
            buildFinished: (f = msg.getBuildFinished()) && proto.build_event_stream.BuildEventId.BuildFinishedId.toObject(includeInstance, f),
            buildToolLogs: (f = msg.getBuildToolLogs()) && proto.build_event_stream.BuildEventId.BuildToolLogsId.toObject(includeInstance, f),
            buildMetrics: (f = msg.getBuildMetrics()) && proto.build_event_stream.BuildEventId.BuildMetricsId.toObject(includeInstance, f)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId}
 */
proto.build_event_stream.BuildEventId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId;
    return proto.build_event_stream.BuildEventId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId}
 */
proto.build_event_stream.BuildEventId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new proto.build_event_stream.BuildEventId.UnknownBuildEventId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.UnknownBuildEventId.deserializeBinaryFromReader);
                msg.setUnknown(value);
                break;
            case 2:
                var value = new proto.build_event_stream.BuildEventId.ProgressId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.ProgressId.deserializeBinaryFromReader);
                msg.setProgress(value);
                break;
            case 3:
                var value = new proto.build_event_stream.BuildEventId.BuildStartedId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.BuildStartedId.deserializeBinaryFromReader);
                msg.setStarted(value);
                break;
            case 11:
                var value = new proto.build_event_stream.BuildEventId.UnstructuredCommandLineId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.UnstructuredCommandLineId.deserializeBinaryFromReader);
                msg.setUnstructuredCommandLine(value);
                break;
            case 18:
                var value = new proto.build_event_stream.BuildEventId.StructuredCommandLineId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.StructuredCommandLineId.deserializeBinaryFromReader);
                msg.setStructuredCommandLine(value);
                break;
            case 14:
                var value = new proto.build_event_stream.BuildEventId.WorkspaceStatusId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.WorkspaceStatusId.deserializeBinaryFromReader);
                msg.setWorkspaceStatus(value);
                break;
            case 12:
                var value = new proto.build_event_stream.BuildEventId.OptionsParsedId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.OptionsParsedId.deserializeBinaryFromReader);
                msg.setOptionsParsed(value);
                break;
            case 17:
                var value = new proto.build_event_stream.BuildEventId.FetchId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.FetchId.deserializeBinaryFromReader);
                msg.setFetch(value);
                break;
            case 15:
                var value = new proto.build_event_stream.BuildEventId.ConfigurationId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.ConfigurationId.deserializeBinaryFromReader);
                msg.setConfiguration(value);
                break;
            case 16:
                var value = new proto.build_event_stream.BuildEventId.TargetConfiguredId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.TargetConfiguredId.deserializeBinaryFromReader);
                msg.setTargetConfigured(value);
                break;
            case 4:
                var value = new proto.build_event_stream.BuildEventId.PatternExpandedId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.PatternExpandedId.deserializeBinaryFromReader);
                msg.setPattern(value);
                break;
            case 10:
                var value = new proto.build_event_stream.BuildEventId.PatternExpandedId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.PatternExpandedId.deserializeBinaryFromReader);
                msg.setPatternSkipped(value);
                break;
            case 13:
                var value = new proto.build_event_stream.BuildEventId.NamedSetOfFilesId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.NamedSetOfFilesId.deserializeBinaryFromReader);
                msg.setNamedSet(value);
                break;
            case 5:
                var value = new proto.build_event_stream.BuildEventId.TargetCompletedId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.TargetCompletedId.deserializeBinaryFromReader);
                msg.setTargetCompleted(value);
                break;
            case 6:
                var value = new proto.build_event_stream.BuildEventId.ActionCompletedId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.ActionCompletedId.deserializeBinaryFromReader);
                msg.setActionCompleted(value);
                break;
            case 19:
                var value = new proto.build_event_stream.BuildEventId.UnconfiguredLabelId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.UnconfiguredLabelId.deserializeBinaryFromReader);
                msg.setUnconfiguredLabel(value);
                break;
            case 21:
                var value = new proto.build_event_stream.BuildEventId.ConfiguredLabelId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.ConfiguredLabelId.deserializeBinaryFromReader);
                msg.setConfiguredLabel(value);
                break;
            case 8:
                var value = new proto.build_event_stream.BuildEventId.TestResultId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.TestResultId.deserializeBinaryFromReader);
                msg.setTestResult(value);
                break;
            case 7:
                var value = new proto.build_event_stream.BuildEventId.TestSummaryId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.TestSummaryId.deserializeBinaryFromReader);
                msg.setTestSummary(value);
                break;
            case 9:
                var value = new proto.build_event_stream.BuildEventId.BuildFinishedId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.BuildFinishedId.deserializeBinaryFromReader);
                msg.setBuildFinished(value);
                break;
            case 20:
                var value = new proto.build_event_stream.BuildEventId.BuildToolLogsId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.BuildToolLogsId.deserializeBinaryFromReader);
                msg.setBuildToolLogs(value);
                break;
            case 22:
                var value = new proto.build_event_stream.BuildEventId.BuildMetricsId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.BuildMetricsId.deserializeBinaryFromReader);
                msg.setBuildMetrics(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getUnknown();
    if (f != null) {
        writer.writeMessage(1, f, proto.build_event_stream.BuildEventId.UnknownBuildEventId.serializeBinaryToWriter);
    }
    f = message.getProgress();
    if (f != null) {
        writer.writeMessage(2, f, proto.build_event_stream.BuildEventId.ProgressId.serializeBinaryToWriter);
    }
    f = message.getStarted();
    if (f != null) {
        writer.writeMessage(3, f, proto.build_event_stream.BuildEventId.BuildStartedId.serializeBinaryToWriter);
    }
    f = message.getUnstructuredCommandLine();
    if (f != null) {
        writer.writeMessage(11, f, proto.build_event_stream.BuildEventId.UnstructuredCommandLineId.serializeBinaryToWriter);
    }
    f = message.getStructuredCommandLine();
    if (f != null) {
        writer.writeMessage(18, f, proto.build_event_stream.BuildEventId.StructuredCommandLineId.serializeBinaryToWriter);
    }
    f = message.getWorkspaceStatus();
    if (f != null) {
        writer.writeMessage(14, f, proto.build_event_stream.BuildEventId.WorkspaceStatusId.serializeBinaryToWriter);
    }
    f = message.getOptionsParsed();
    if (f != null) {
        writer.writeMessage(12, f, proto.build_event_stream.BuildEventId.OptionsParsedId.serializeBinaryToWriter);
    }
    f = message.getFetch();
    if (f != null) {
        writer.writeMessage(17, f, proto.build_event_stream.BuildEventId.FetchId.serializeBinaryToWriter);
    }
    f = message.getConfiguration();
    if (f != null) {
        writer.writeMessage(15, f, proto.build_event_stream.BuildEventId.ConfigurationId.serializeBinaryToWriter);
    }
    f = message.getTargetConfigured();
    if (f != null) {
        writer.writeMessage(16, f, proto.build_event_stream.BuildEventId.TargetConfiguredId.serializeBinaryToWriter);
    }
    f = message.getPattern();
    if (f != null) {
        writer.writeMessage(4, f, proto.build_event_stream.BuildEventId.PatternExpandedId.serializeBinaryToWriter);
    }
    f = message.getPatternSkipped();
    if (f != null) {
        writer.writeMessage(10, f, proto.build_event_stream.BuildEventId.PatternExpandedId.serializeBinaryToWriter);
    }
    f = message.getNamedSet();
    if (f != null) {
        writer.writeMessage(13, f, proto.build_event_stream.BuildEventId.NamedSetOfFilesId.serializeBinaryToWriter);
    }
    f = message.getTargetCompleted();
    if (f != null) {
        writer.writeMessage(5, f, proto.build_event_stream.BuildEventId.TargetCompletedId.serializeBinaryToWriter);
    }
    f = message.getActionCompleted();
    if (f != null) {
        writer.writeMessage(6, f, proto.build_event_stream.BuildEventId.ActionCompletedId.serializeBinaryToWriter);
    }
    f = message.getUnconfiguredLabel();
    if (f != null) {
        writer.writeMessage(19, f, proto.build_event_stream.BuildEventId.UnconfiguredLabelId.serializeBinaryToWriter);
    }
    f = message.getConfiguredLabel();
    if (f != null) {
        writer.writeMessage(21, f, proto.build_event_stream.BuildEventId.ConfiguredLabelId.serializeBinaryToWriter);
    }
    f = message.getTestResult();
    if (f != null) {
        writer.writeMessage(8, f, proto.build_event_stream.BuildEventId.TestResultId.serializeBinaryToWriter);
    }
    f = message.getTestSummary();
    if (f != null) {
        writer.writeMessage(7, f, proto.build_event_stream.BuildEventId.TestSummaryId.serializeBinaryToWriter);
    }
    f = message.getBuildFinished();
    if (f != null) {
        writer.writeMessage(9, f, proto.build_event_stream.BuildEventId.BuildFinishedId.serializeBinaryToWriter);
    }
    f = message.getBuildToolLogs();
    if (f != null) {
        writer.writeMessage(20, f, proto.build_event_stream.BuildEventId.BuildToolLogsId.serializeBinaryToWriter);
    }
    f = message.getBuildMetrics();
    if (f != null) {
        writer.writeMessage(22, f, proto.build_event_stream.BuildEventId.BuildMetricsId.serializeBinaryToWriter);
    }
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.UnknownBuildEventId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.UnknownBuildEventId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.UnknownBuildEventId.displayName = 'proto.build_event_stream.BuildEventId.UnknownBuildEventId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.UnknownBuildEventId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.UnknownBuildEventId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.UnknownBuildEventId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.UnknownBuildEventId.toObject = function (includeInstance, msg) {
        var f, obj = {
            details: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.UnknownBuildEventId}
 */
proto.build_event_stream.BuildEventId.UnknownBuildEventId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.UnknownBuildEventId;
    return proto.build_event_stream.BuildEventId.UnknownBuildEventId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.UnknownBuildEventId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.UnknownBuildEventId}
 */
proto.build_event_stream.BuildEventId.UnknownBuildEventId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setDetails(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.UnknownBuildEventId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.UnknownBuildEventId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.UnknownBuildEventId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.UnknownBuildEventId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getDetails();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
};
/**
 * optional string details = 1;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.UnknownBuildEventId.prototype.getDetails = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.UnknownBuildEventId.prototype.setDetails = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.ProgressId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.ProgressId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.ProgressId.displayName = 'proto.build_event_stream.BuildEventId.ProgressId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.ProgressId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.ProgressId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.ProgressId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.ProgressId.toObject = function (includeInstance, msg) {
        var f, obj = {
            opaqueCount: jspb.Message.getFieldWithDefault(msg, 1, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.ProgressId}
 */
proto.build_event_stream.BuildEventId.ProgressId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.ProgressId;
    return proto.build_event_stream.BuildEventId.ProgressId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.ProgressId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.ProgressId}
 */
proto.build_event_stream.BuildEventId.ProgressId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {number} */ (reader.readInt32());
                msg.setOpaqueCount(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.ProgressId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.ProgressId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.ProgressId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.ProgressId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getOpaqueCount();
    if (f !== 0) {
        writer.writeInt32(1, f);
    }
};
/**
 * optional int32 opaque_count = 1;
 * @return {number}
 */
proto.build_event_stream.BuildEventId.ProgressId.prototype.getOpaqueCount = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildEventId.ProgressId.prototype.setOpaqueCount = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.BuildStartedId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.BuildStartedId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.BuildStartedId.displayName = 'proto.build_event_stream.BuildEventId.BuildStartedId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.BuildStartedId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.BuildStartedId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.BuildStartedId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.BuildStartedId.toObject = function (includeInstance, msg) {
        var f, obj = {};
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.BuildStartedId}
 */
proto.build_event_stream.BuildEventId.BuildStartedId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.BuildStartedId;
    return proto.build_event_stream.BuildEventId.BuildStartedId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.BuildStartedId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.BuildStartedId}
 */
proto.build_event_stream.BuildEventId.BuildStartedId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.BuildStartedId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.BuildStartedId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.BuildStartedId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.BuildStartedId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.UnstructuredCommandLineId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.UnstructuredCommandLineId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.UnstructuredCommandLineId.displayName = 'proto.build_event_stream.BuildEventId.UnstructuredCommandLineId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.UnstructuredCommandLineId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.UnstructuredCommandLineId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.UnstructuredCommandLineId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.UnstructuredCommandLineId.toObject = function (includeInstance, msg) {
        var f, obj = {};
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.UnstructuredCommandLineId}
 */
proto.build_event_stream.BuildEventId.UnstructuredCommandLineId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.UnstructuredCommandLineId;
    return proto.build_event_stream.BuildEventId.UnstructuredCommandLineId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.UnstructuredCommandLineId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.UnstructuredCommandLineId}
 */
proto.build_event_stream.BuildEventId.UnstructuredCommandLineId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.UnstructuredCommandLineId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.UnstructuredCommandLineId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.UnstructuredCommandLineId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.UnstructuredCommandLineId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.StructuredCommandLineId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.StructuredCommandLineId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.StructuredCommandLineId.displayName = 'proto.build_event_stream.BuildEventId.StructuredCommandLineId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.StructuredCommandLineId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.StructuredCommandLineId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.StructuredCommandLineId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.StructuredCommandLineId.toObject = function (includeInstance, msg) {
        var f, obj = {
            commandLineLabel: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.StructuredCommandLineId}
 */
proto.build_event_stream.BuildEventId.StructuredCommandLineId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.StructuredCommandLineId;
    return proto.build_event_stream.BuildEventId.StructuredCommandLineId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.StructuredCommandLineId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.StructuredCommandLineId}
 */
proto.build_event_stream.BuildEventId.StructuredCommandLineId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setCommandLineLabel(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.StructuredCommandLineId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.StructuredCommandLineId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.StructuredCommandLineId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.StructuredCommandLineId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getCommandLineLabel();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
};
/**
 * optional string command_line_label = 1;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.StructuredCommandLineId.prototype.getCommandLineLabel = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.StructuredCommandLineId.prototype.setCommandLineLabel = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.WorkspaceStatusId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.WorkspaceStatusId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.WorkspaceStatusId.displayName = 'proto.build_event_stream.BuildEventId.WorkspaceStatusId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.WorkspaceStatusId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.WorkspaceStatusId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.WorkspaceStatusId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.WorkspaceStatusId.toObject = function (includeInstance, msg) {
        var f, obj = {};
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.WorkspaceStatusId}
 */
proto.build_event_stream.BuildEventId.WorkspaceStatusId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.WorkspaceStatusId;
    return proto.build_event_stream.BuildEventId.WorkspaceStatusId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.WorkspaceStatusId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.WorkspaceStatusId}
 */
proto.build_event_stream.BuildEventId.WorkspaceStatusId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.WorkspaceStatusId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.WorkspaceStatusId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.WorkspaceStatusId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.WorkspaceStatusId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.OptionsParsedId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.OptionsParsedId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.OptionsParsedId.displayName = 'proto.build_event_stream.BuildEventId.OptionsParsedId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.OptionsParsedId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.OptionsParsedId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.OptionsParsedId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.OptionsParsedId.toObject = function (includeInstance, msg) {
        var f, obj = {};
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.OptionsParsedId}
 */
proto.build_event_stream.BuildEventId.OptionsParsedId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.OptionsParsedId;
    return proto.build_event_stream.BuildEventId.OptionsParsedId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.OptionsParsedId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.OptionsParsedId}
 */
proto.build_event_stream.BuildEventId.OptionsParsedId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.OptionsParsedId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.OptionsParsedId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.OptionsParsedId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.OptionsParsedId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.FetchId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.FetchId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.FetchId.displayName = 'proto.build_event_stream.BuildEventId.FetchId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.FetchId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.FetchId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.FetchId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.FetchId.toObject = function (includeInstance, msg) {
        var f, obj = {
            url: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.FetchId}
 */
proto.build_event_stream.BuildEventId.FetchId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.FetchId;
    return proto.build_event_stream.BuildEventId.FetchId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.FetchId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.FetchId}
 */
proto.build_event_stream.BuildEventId.FetchId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setUrl(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.FetchId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.FetchId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.FetchId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.FetchId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getUrl();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
};
/**
 * optional string url = 1;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.FetchId.prototype.getUrl = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.FetchId.prototype.setUrl = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.PatternExpandedId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.BuildEventId.PatternExpandedId.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.PatternExpandedId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.PatternExpandedId.displayName = 'proto.build_event_stream.BuildEventId.PatternExpandedId';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.BuildEventId.PatternExpandedId.repeatedFields_ = [1];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.PatternExpandedId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.PatternExpandedId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.PatternExpandedId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.PatternExpandedId.toObject = function (includeInstance, msg) {
        var f, obj = {
            patternList: jspb.Message.getRepeatedField(msg, 1)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.PatternExpandedId}
 */
proto.build_event_stream.BuildEventId.PatternExpandedId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.PatternExpandedId;
    return proto.build_event_stream.BuildEventId.PatternExpandedId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.PatternExpandedId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.PatternExpandedId}
 */
proto.build_event_stream.BuildEventId.PatternExpandedId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.addPattern(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.PatternExpandedId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.PatternExpandedId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.PatternExpandedId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.PatternExpandedId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getPatternList();
    if (f.length > 0) {
        writer.writeRepeatedString(1, f);
    }
};
/**
 * repeated string pattern = 1;
 * @return {!Array.<string>}
 */
proto.build_event_stream.BuildEventId.PatternExpandedId.prototype.getPatternList = function () {
    return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 1));
};
/** @param {!Array.<string>} value */
proto.build_event_stream.BuildEventId.PatternExpandedId.prototype.setPatternList = function (value) {
    jspb.Message.setField(this, 1, value || []);
};
/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.build_event_stream.BuildEventId.PatternExpandedId.prototype.addPattern = function (value, opt_index) {
    jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};
proto.build_event_stream.BuildEventId.PatternExpandedId.prototype.clearPatternList = function () {
    this.setPatternList([]);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.TargetConfiguredId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.TargetConfiguredId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.TargetConfiguredId.displayName = 'proto.build_event_stream.BuildEventId.TargetConfiguredId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.TargetConfiguredId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.TargetConfiguredId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.TargetConfiguredId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.TargetConfiguredId.toObject = function (includeInstance, msg) {
        var f, obj = {
            label: jspb.Message.getFieldWithDefault(msg, 1, ""),
            aspect: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.TargetConfiguredId}
 */
proto.build_event_stream.BuildEventId.TargetConfiguredId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.TargetConfiguredId;
    return proto.build_event_stream.BuildEventId.TargetConfiguredId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.TargetConfiguredId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.TargetConfiguredId}
 */
proto.build_event_stream.BuildEventId.TargetConfiguredId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setLabel(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setAspect(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.TargetConfiguredId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.TargetConfiguredId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.TargetConfiguredId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.TargetConfiguredId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getLabel();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getAspect();
    if (f.length > 0) {
        writer.writeString(2, f);
    }
};
/**
 * optional string label = 1;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.TargetConfiguredId.prototype.getLabel = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.TargetConfiguredId.prototype.setLabel = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional string aspect = 2;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.TargetConfiguredId.prototype.getAspect = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.TargetConfiguredId.prototype.setAspect = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.NamedSetOfFilesId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.NamedSetOfFilesId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.NamedSetOfFilesId.displayName = 'proto.build_event_stream.BuildEventId.NamedSetOfFilesId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.NamedSetOfFilesId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.NamedSetOfFilesId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.NamedSetOfFilesId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.NamedSetOfFilesId.toObject = function (includeInstance, msg) {
        var f, obj = {
            id: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.NamedSetOfFilesId}
 */
proto.build_event_stream.BuildEventId.NamedSetOfFilesId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.NamedSetOfFilesId;
    return proto.build_event_stream.BuildEventId.NamedSetOfFilesId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.NamedSetOfFilesId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.NamedSetOfFilesId}
 */
proto.build_event_stream.BuildEventId.NamedSetOfFilesId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setId(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.NamedSetOfFilesId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.NamedSetOfFilesId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.NamedSetOfFilesId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.NamedSetOfFilesId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getId();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
};
/**
 * optional string id = 1;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.NamedSetOfFilesId.prototype.getId = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.NamedSetOfFilesId.prototype.setId = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.ConfigurationId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.ConfigurationId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.ConfigurationId.displayName = 'proto.build_event_stream.BuildEventId.ConfigurationId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.ConfigurationId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.ConfigurationId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.ConfigurationId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.ConfigurationId.toObject = function (includeInstance, msg) {
        var f, obj = {
            id: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.ConfigurationId}
 */
proto.build_event_stream.BuildEventId.ConfigurationId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.ConfigurationId;
    return proto.build_event_stream.BuildEventId.ConfigurationId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.ConfigurationId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.ConfigurationId}
 */
proto.build_event_stream.BuildEventId.ConfigurationId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setId(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.ConfigurationId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.ConfigurationId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.ConfigurationId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.ConfigurationId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getId();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
};
/**
 * optional string id = 1;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.ConfigurationId.prototype.getId = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.ConfigurationId.prototype.setId = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.TargetCompletedId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.TargetCompletedId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.TargetCompletedId.displayName = 'proto.build_event_stream.BuildEventId.TargetCompletedId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.TargetCompletedId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.TargetCompletedId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.TargetCompletedId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.TargetCompletedId.toObject = function (includeInstance, msg) {
        var f, obj = {
            label: jspb.Message.getFieldWithDefault(msg, 1, ""),
            configuration: (f = msg.getConfiguration()) && proto.build_event_stream.BuildEventId.ConfigurationId.toObject(includeInstance, f),
            aspect: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.TargetCompletedId}
 */
proto.build_event_stream.BuildEventId.TargetCompletedId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.TargetCompletedId;
    return proto.build_event_stream.BuildEventId.TargetCompletedId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.TargetCompletedId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.TargetCompletedId}
 */
proto.build_event_stream.BuildEventId.TargetCompletedId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setLabel(value);
                break;
            case 3:
                var value = new proto.build_event_stream.BuildEventId.ConfigurationId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.ConfigurationId.deserializeBinaryFromReader);
                msg.setConfiguration(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setAspect(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.TargetCompletedId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.TargetCompletedId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.TargetCompletedId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.TargetCompletedId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getLabel();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getConfiguration();
    if (f != null) {
        writer.writeMessage(3, f, proto.build_event_stream.BuildEventId.ConfigurationId.serializeBinaryToWriter);
    }
    f = message.getAspect();
    if (f.length > 0) {
        writer.writeString(2, f);
    }
};
/**
 * optional string label = 1;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.TargetCompletedId.prototype.getLabel = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.TargetCompletedId.prototype.setLabel = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional ConfigurationId configuration = 3;
 * @return {?proto.build_event_stream.BuildEventId.ConfigurationId}
 */
proto.build_event_stream.BuildEventId.TargetCompletedId.prototype.getConfiguration = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.ConfigurationId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.ConfigurationId, 3));
};
/** @param {?proto.build_event_stream.BuildEventId.ConfigurationId|undefined} value */
proto.build_event_stream.BuildEventId.TargetCompletedId.prototype.setConfiguration = function (value) {
    jspb.Message.setWrapperField(this, 3, value);
};
proto.build_event_stream.BuildEventId.TargetCompletedId.prototype.clearConfiguration = function () {
    this.setConfiguration(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.TargetCompletedId.prototype.hasConfiguration = function () {
    return jspb.Message.getField(this, 3) != null;
};
/**
 * optional string aspect = 2;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.TargetCompletedId.prototype.getAspect = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.TargetCompletedId.prototype.setAspect = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.ActionCompletedId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.ActionCompletedId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.ActionCompletedId.displayName = 'proto.build_event_stream.BuildEventId.ActionCompletedId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.ActionCompletedId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.ActionCompletedId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.ActionCompletedId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.ActionCompletedId.toObject = function (includeInstance, msg) {
        var f, obj = {
            primaryOutput: jspb.Message.getFieldWithDefault(msg, 1, ""),
            label: jspb.Message.getFieldWithDefault(msg, 2, ""),
            configuration: (f = msg.getConfiguration()) && proto.build_event_stream.BuildEventId.ConfigurationId.toObject(includeInstance, f)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.ActionCompletedId}
 */
proto.build_event_stream.BuildEventId.ActionCompletedId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.ActionCompletedId;
    return proto.build_event_stream.BuildEventId.ActionCompletedId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.ActionCompletedId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.ActionCompletedId}
 */
proto.build_event_stream.BuildEventId.ActionCompletedId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setPrimaryOutput(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setLabel(value);
                break;
            case 3:
                var value = new proto.build_event_stream.BuildEventId.ConfigurationId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.ConfigurationId.deserializeBinaryFromReader);
                msg.setConfiguration(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.ActionCompletedId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.ActionCompletedId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.ActionCompletedId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.ActionCompletedId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getPrimaryOutput();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getLabel();
    if (f.length > 0) {
        writer.writeString(2, f);
    }
    f = message.getConfiguration();
    if (f != null) {
        writer.writeMessage(3, f, proto.build_event_stream.BuildEventId.ConfigurationId.serializeBinaryToWriter);
    }
};
/**
 * optional string primary_output = 1;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.ActionCompletedId.prototype.getPrimaryOutput = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.ActionCompletedId.prototype.setPrimaryOutput = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional string label = 2;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.ActionCompletedId.prototype.getLabel = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.ActionCompletedId.prototype.setLabel = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * optional ConfigurationId configuration = 3;
 * @return {?proto.build_event_stream.BuildEventId.ConfigurationId}
 */
proto.build_event_stream.BuildEventId.ActionCompletedId.prototype.getConfiguration = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.ConfigurationId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.ConfigurationId, 3));
};
/** @param {?proto.build_event_stream.BuildEventId.ConfigurationId|undefined} value */
proto.build_event_stream.BuildEventId.ActionCompletedId.prototype.setConfiguration = function (value) {
    jspb.Message.setWrapperField(this, 3, value);
};
proto.build_event_stream.BuildEventId.ActionCompletedId.prototype.clearConfiguration = function () {
    this.setConfiguration(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.ActionCompletedId.prototype.hasConfiguration = function () {
    return jspb.Message.getField(this, 3) != null;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.UnconfiguredLabelId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.UnconfiguredLabelId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.UnconfiguredLabelId.displayName = 'proto.build_event_stream.BuildEventId.UnconfiguredLabelId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.UnconfiguredLabelId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.UnconfiguredLabelId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.UnconfiguredLabelId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.UnconfiguredLabelId.toObject = function (includeInstance, msg) {
        var f, obj = {
            label: jspb.Message.getFieldWithDefault(msg, 1, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.UnconfiguredLabelId}
 */
proto.build_event_stream.BuildEventId.UnconfiguredLabelId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.UnconfiguredLabelId;
    return proto.build_event_stream.BuildEventId.UnconfiguredLabelId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.UnconfiguredLabelId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.UnconfiguredLabelId}
 */
proto.build_event_stream.BuildEventId.UnconfiguredLabelId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setLabel(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.UnconfiguredLabelId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.UnconfiguredLabelId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.UnconfiguredLabelId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.UnconfiguredLabelId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getLabel();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
};
/**
 * optional string label = 1;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.UnconfiguredLabelId.prototype.getLabel = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.UnconfiguredLabelId.prototype.setLabel = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.ConfiguredLabelId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.ConfiguredLabelId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.ConfiguredLabelId.displayName = 'proto.build_event_stream.BuildEventId.ConfiguredLabelId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.ConfiguredLabelId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.ConfiguredLabelId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.ConfiguredLabelId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.ConfiguredLabelId.toObject = function (includeInstance, msg) {
        var f, obj = {
            label: jspb.Message.getFieldWithDefault(msg, 1, ""),
            configuration: (f = msg.getConfiguration()) && proto.build_event_stream.BuildEventId.ConfigurationId.toObject(includeInstance, f)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.ConfiguredLabelId}
 */
proto.build_event_stream.BuildEventId.ConfiguredLabelId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.ConfiguredLabelId;
    return proto.build_event_stream.BuildEventId.ConfiguredLabelId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.ConfiguredLabelId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.ConfiguredLabelId}
 */
proto.build_event_stream.BuildEventId.ConfiguredLabelId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setLabel(value);
                break;
            case 2:
                var value = new proto.build_event_stream.BuildEventId.ConfigurationId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.ConfigurationId.deserializeBinaryFromReader);
                msg.setConfiguration(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.ConfiguredLabelId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.ConfiguredLabelId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.ConfiguredLabelId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.ConfiguredLabelId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getLabel();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getConfiguration();
    if (f != null) {
        writer.writeMessage(2, f, proto.build_event_stream.BuildEventId.ConfigurationId.serializeBinaryToWriter);
    }
};
/**
 * optional string label = 1;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.ConfiguredLabelId.prototype.getLabel = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.ConfiguredLabelId.prototype.setLabel = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional ConfigurationId configuration = 2;
 * @return {?proto.build_event_stream.BuildEventId.ConfigurationId}
 */
proto.build_event_stream.BuildEventId.ConfiguredLabelId.prototype.getConfiguration = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.ConfigurationId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.ConfigurationId, 2));
};
/** @param {?proto.build_event_stream.BuildEventId.ConfigurationId|undefined} value */
proto.build_event_stream.BuildEventId.ConfiguredLabelId.prototype.setConfiguration = function (value) {
    jspb.Message.setWrapperField(this, 2, value);
};
proto.build_event_stream.BuildEventId.ConfiguredLabelId.prototype.clearConfiguration = function () {
    this.setConfiguration(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.ConfiguredLabelId.prototype.hasConfiguration = function () {
    return jspb.Message.getField(this, 2) != null;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.TestResultId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.TestResultId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.TestResultId.displayName = 'proto.build_event_stream.BuildEventId.TestResultId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.TestResultId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.TestResultId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.TestResultId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.TestResultId.toObject = function (includeInstance, msg) {
        var f, obj = {
            label: jspb.Message.getFieldWithDefault(msg, 1, ""),
            configuration: (f = msg.getConfiguration()) && proto.build_event_stream.BuildEventId.ConfigurationId.toObject(includeInstance, f),
            run: jspb.Message.getFieldWithDefault(msg, 2, 0),
            shard: jspb.Message.getFieldWithDefault(msg, 3, 0),
            attempt: jspb.Message.getFieldWithDefault(msg, 4, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.TestResultId}
 */
proto.build_event_stream.BuildEventId.TestResultId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.TestResultId;
    return proto.build_event_stream.BuildEventId.TestResultId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.TestResultId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.TestResultId}
 */
proto.build_event_stream.BuildEventId.TestResultId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setLabel(value);
                break;
            case 5:
                var value = new proto.build_event_stream.BuildEventId.ConfigurationId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.ConfigurationId.deserializeBinaryFromReader);
                msg.setConfiguration(value);
                break;
            case 2:
                var value = /** @type {number} */ (reader.readInt32());
                msg.setRun(value);
                break;
            case 3:
                var value = /** @type {number} */ (reader.readInt32());
                msg.setShard(value);
                break;
            case 4:
                var value = /** @type {number} */ (reader.readInt32());
                msg.setAttempt(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.TestResultId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.TestResultId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.TestResultId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.TestResultId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getLabel();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getConfiguration();
    if (f != null) {
        writer.writeMessage(5, f, proto.build_event_stream.BuildEventId.ConfigurationId.serializeBinaryToWriter);
    }
    f = message.getRun();
    if (f !== 0) {
        writer.writeInt32(2, f);
    }
    f = message.getShard();
    if (f !== 0) {
        writer.writeInt32(3, f);
    }
    f = message.getAttempt();
    if (f !== 0) {
        writer.writeInt32(4, f);
    }
};
/**
 * optional string label = 1;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.TestResultId.prototype.getLabel = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.TestResultId.prototype.setLabel = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional ConfigurationId configuration = 5;
 * @return {?proto.build_event_stream.BuildEventId.ConfigurationId}
 */
proto.build_event_stream.BuildEventId.TestResultId.prototype.getConfiguration = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.ConfigurationId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.ConfigurationId, 5));
};
/** @param {?proto.build_event_stream.BuildEventId.ConfigurationId|undefined} value */
proto.build_event_stream.BuildEventId.TestResultId.prototype.setConfiguration = function (value) {
    jspb.Message.setWrapperField(this, 5, value);
};
proto.build_event_stream.BuildEventId.TestResultId.prototype.clearConfiguration = function () {
    this.setConfiguration(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.TestResultId.prototype.hasConfiguration = function () {
    return jspb.Message.getField(this, 5) != null;
};
/**
 * optional int32 run = 2;
 * @return {number}
 */
proto.build_event_stream.BuildEventId.TestResultId.prototype.getRun = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildEventId.TestResultId.prototype.setRun = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * optional int32 shard = 3;
 * @return {number}
 */
proto.build_event_stream.BuildEventId.TestResultId.prototype.getShard = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildEventId.TestResultId.prototype.setShard = function (value) {
    jspb.Message.setField(this, 3, value);
};
/**
 * optional int32 attempt = 4;
 * @return {number}
 */
proto.build_event_stream.BuildEventId.TestResultId.prototype.getAttempt = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildEventId.TestResultId.prototype.setAttempt = function (value) {
    jspb.Message.setField(this, 4, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.TestSummaryId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.TestSummaryId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.TestSummaryId.displayName = 'proto.build_event_stream.BuildEventId.TestSummaryId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.TestSummaryId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.TestSummaryId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.TestSummaryId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.TestSummaryId.toObject = function (includeInstance, msg) {
        var f, obj = {
            label: jspb.Message.getFieldWithDefault(msg, 1, ""),
            configuration: (f = msg.getConfiguration()) && proto.build_event_stream.BuildEventId.ConfigurationId.toObject(includeInstance, f)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.TestSummaryId}
 */
proto.build_event_stream.BuildEventId.TestSummaryId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.TestSummaryId;
    return proto.build_event_stream.BuildEventId.TestSummaryId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.TestSummaryId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.TestSummaryId}
 */
proto.build_event_stream.BuildEventId.TestSummaryId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setLabel(value);
                break;
            case 2:
                var value = new proto.build_event_stream.BuildEventId.ConfigurationId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.ConfigurationId.deserializeBinaryFromReader);
                msg.setConfiguration(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.TestSummaryId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.TestSummaryId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.TestSummaryId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.TestSummaryId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getLabel();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getConfiguration();
    if (f != null) {
        writer.writeMessage(2, f, proto.build_event_stream.BuildEventId.ConfigurationId.serializeBinaryToWriter);
    }
};
/**
 * optional string label = 1;
 * @return {string}
 */
proto.build_event_stream.BuildEventId.TestSummaryId.prototype.getLabel = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildEventId.TestSummaryId.prototype.setLabel = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional ConfigurationId configuration = 2;
 * @return {?proto.build_event_stream.BuildEventId.ConfigurationId}
 */
proto.build_event_stream.BuildEventId.TestSummaryId.prototype.getConfiguration = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.ConfigurationId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.ConfigurationId, 2));
};
/** @param {?proto.build_event_stream.BuildEventId.ConfigurationId|undefined} value */
proto.build_event_stream.BuildEventId.TestSummaryId.prototype.setConfiguration = function (value) {
    jspb.Message.setWrapperField(this, 2, value);
};
proto.build_event_stream.BuildEventId.TestSummaryId.prototype.clearConfiguration = function () {
    this.setConfiguration(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.TestSummaryId.prototype.hasConfiguration = function () {
    return jspb.Message.getField(this, 2) != null;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.BuildFinishedId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.BuildFinishedId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.BuildFinishedId.displayName = 'proto.build_event_stream.BuildEventId.BuildFinishedId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.BuildFinishedId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.BuildFinishedId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.BuildFinishedId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.BuildFinishedId.toObject = function (includeInstance, msg) {
        var f, obj = {};
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.BuildFinishedId}
 */
proto.build_event_stream.BuildEventId.BuildFinishedId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.BuildFinishedId;
    return proto.build_event_stream.BuildEventId.BuildFinishedId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.BuildFinishedId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.BuildFinishedId}
 */
proto.build_event_stream.BuildEventId.BuildFinishedId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.BuildFinishedId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.BuildFinishedId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.BuildFinishedId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.BuildFinishedId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.BuildToolLogsId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.BuildToolLogsId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.BuildToolLogsId.displayName = 'proto.build_event_stream.BuildEventId.BuildToolLogsId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.BuildToolLogsId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.BuildToolLogsId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.BuildToolLogsId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.BuildToolLogsId.toObject = function (includeInstance, msg) {
        var f, obj = {};
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.BuildToolLogsId}
 */
proto.build_event_stream.BuildEventId.BuildToolLogsId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.BuildToolLogsId;
    return proto.build_event_stream.BuildEventId.BuildToolLogsId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.BuildToolLogsId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.BuildToolLogsId}
 */
proto.build_event_stream.BuildEventId.BuildToolLogsId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.BuildToolLogsId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.BuildToolLogsId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.BuildToolLogsId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.BuildToolLogsId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEventId.BuildMetricsId = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildEventId.BuildMetricsId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEventId.BuildMetricsId.displayName = 'proto.build_event_stream.BuildEventId.BuildMetricsId';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEventId.BuildMetricsId.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEventId.BuildMetricsId.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEventId.BuildMetricsId} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEventId.BuildMetricsId.toObject = function (includeInstance, msg) {
        var f, obj = {};
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEventId.BuildMetricsId}
 */
proto.build_event_stream.BuildEventId.BuildMetricsId.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEventId.BuildMetricsId;
    return proto.build_event_stream.BuildEventId.BuildMetricsId.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEventId.BuildMetricsId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEventId.BuildMetricsId}
 */
proto.build_event_stream.BuildEventId.BuildMetricsId.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEventId.BuildMetricsId.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEventId.BuildMetricsId.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEventId.BuildMetricsId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEventId.BuildMetricsId.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
};
/**
 * optional UnknownBuildEventId unknown = 1;
 * @return {?proto.build_event_stream.BuildEventId.UnknownBuildEventId}
 */
proto.build_event_stream.BuildEventId.prototype.getUnknown = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.UnknownBuildEventId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.UnknownBuildEventId, 1));
};
/** @param {?proto.build_event_stream.BuildEventId.UnknownBuildEventId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setUnknown = function (value) {
    jspb.Message.setOneofWrapperField(this, 1, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearUnknown = function () {
    this.setUnknown(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasUnknown = function () {
    return jspb.Message.getField(this, 1) != null;
};
/**
 * optional ProgressId progress = 2;
 * @return {?proto.build_event_stream.BuildEventId.ProgressId}
 */
proto.build_event_stream.BuildEventId.prototype.getProgress = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.ProgressId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.ProgressId, 2));
};
/** @param {?proto.build_event_stream.BuildEventId.ProgressId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setProgress = function (value) {
    jspb.Message.setOneofWrapperField(this, 2, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearProgress = function () {
    this.setProgress(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasProgress = function () {
    return jspb.Message.getField(this, 2) != null;
};
/**
 * optional BuildStartedId started = 3;
 * @return {?proto.build_event_stream.BuildEventId.BuildStartedId}
 */
proto.build_event_stream.BuildEventId.prototype.getStarted = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.BuildStartedId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.BuildStartedId, 3));
};
/** @param {?proto.build_event_stream.BuildEventId.BuildStartedId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setStarted = function (value) {
    jspb.Message.setOneofWrapperField(this, 3, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearStarted = function () {
    this.setStarted(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasStarted = function () {
    return jspb.Message.getField(this, 3) != null;
};
/**
 * optional UnstructuredCommandLineId unstructured_command_line = 11;
 * @return {?proto.build_event_stream.BuildEventId.UnstructuredCommandLineId}
 */
proto.build_event_stream.BuildEventId.prototype.getUnstructuredCommandLine = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.UnstructuredCommandLineId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.UnstructuredCommandLineId, 11));
};
/** @param {?proto.build_event_stream.BuildEventId.UnstructuredCommandLineId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setUnstructuredCommandLine = function (value) {
    jspb.Message.setOneofWrapperField(this, 11, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearUnstructuredCommandLine = function () {
    this.setUnstructuredCommandLine(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasUnstructuredCommandLine = function () {
    return jspb.Message.getField(this, 11) != null;
};
/**
 * optional StructuredCommandLineId structured_command_line = 18;
 * @return {?proto.build_event_stream.BuildEventId.StructuredCommandLineId}
 */
proto.build_event_stream.BuildEventId.prototype.getStructuredCommandLine = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.StructuredCommandLineId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.StructuredCommandLineId, 18));
};
/** @param {?proto.build_event_stream.BuildEventId.StructuredCommandLineId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setStructuredCommandLine = function (value) {
    jspb.Message.setOneofWrapperField(this, 18, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearStructuredCommandLine = function () {
    this.setStructuredCommandLine(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasStructuredCommandLine = function () {
    return jspb.Message.getField(this, 18) != null;
};
/**
 * optional WorkspaceStatusId workspace_status = 14;
 * @return {?proto.build_event_stream.BuildEventId.WorkspaceStatusId}
 */
proto.build_event_stream.BuildEventId.prototype.getWorkspaceStatus = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.WorkspaceStatusId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.WorkspaceStatusId, 14));
};
/** @param {?proto.build_event_stream.BuildEventId.WorkspaceStatusId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setWorkspaceStatus = function (value) {
    jspb.Message.setOneofWrapperField(this, 14, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearWorkspaceStatus = function () {
    this.setWorkspaceStatus(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasWorkspaceStatus = function () {
    return jspb.Message.getField(this, 14) != null;
};
/**
 * optional OptionsParsedId options_parsed = 12;
 * @return {?proto.build_event_stream.BuildEventId.OptionsParsedId}
 */
proto.build_event_stream.BuildEventId.prototype.getOptionsParsed = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.OptionsParsedId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.OptionsParsedId, 12));
};
/** @param {?proto.build_event_stream.BuildEventId.OptionsParsedId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setOptionsParsed = function (value) {
    jspb.Message.setOneofWrapperField(this, 12, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearOptionsParsed = function () {
    this.setOptionsParsed(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasOptionsParsed = function () {
    return jspb.Message.getField(this, 12) != null;
};
/**
 * optional FetchId fetch = 17;
 * @return {?proto.build_event_stream.BuildEventId.FetchId}
 */
proto.build_event_stream.BuildEventId.prototype.getFetch = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.FetchId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.FetchId, 17));
};
/** @param {?proto.build_event_stream.BuildEventId.FetchId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setFetch = function (value) {
    jspb.Message.setOneofWrapperField(this, 17, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearFetch = function () {
    this.setFetch(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasFetch = function () {
    return jspb.Message.getField(this, 17) != null;
};
/**
 * optional ConfigurationId configuration = 15;
 * @return {?proto.build_event_stream.BuildEventId.ConfigurationId}
 */
proto.build_event_stream.BuildEventId.prototype.getConfiguration = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.ConfigurationId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.ConfigurationId, 15));
};
/** @param {?proto.build_event_stream.BuildEventId.ConfigurationId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setConfiguration = function (value) {
    jspb.Message.setOneofWrapperField(this, 15, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearConfiguration = function () {
    this.setConfiguration(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasConfiguration = function () {
    return jspb.Message.getField(this, 15) != null;
};
/**
 * optional TargetConfiguredId target_configured = 16;
 * @return {?proto.build_event_stream.BuildEventId.TargetConfiguredId}
 */
proto.build_event_stream.BuildEventId.prototype.getTargetConfigured = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.TargetConfiguredId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.TargetConfiguredId, 16));
};
/** @param {?proto.build_event_stream.BuildEventId.TargetConfiguredId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setTargetConfigured = function (value) {
    jspb.Message.setOneofWrapperField(this, 16, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearTargetConfigured = function () {
    this.setTargetConfigured(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasTargetConfigured = function () {
    return jspb.Message.getField(this, 16) != null;
};
/**
 * optional PatternExpandedId pattern = 4;
 * @return {?proto.build_event_stream.BuildEventId.PatternExpandedId}
 */
proto.build_event_stream.BuildEventId.prototype.getPattern = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.PatternExpandedId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.PatternExpandedId, 4));
};
/** @param {?proto.build_event_stream.BuildEventId.PatternExpandedId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setPattern = function (value) {
    jspb.Message.setOneofWrapperField(this, 4, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearPattern = function () {
    this.setPattern(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasPattern = function () {
    return jspb.Message.getField(this, 4) != null;
};
/**
 * optional PatternExpandedId pattern_skipped = 10;
 * @return {?proto.build_event_stream.BuildEventId.PatternExpandedId}
 */
proto.build_event_stream.BuildEventId.prototype.getPatternSkipped = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.PatternExpandedId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.PatternExpandedId, 10));
};
/** @param {?proto.build_event_stream.BuildEventId.PatternExpandedId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setPatternSkipped = function (value) {
    jspb.Message.setOneofWrapperField(this, 10, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearPatternSkipped = function () {
    this.setPatternSkipped(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasPatternSkipped = function () {
    return jspb.Message.getField(this, 10) != null;
};
/**
 * optional NamedSetOfFilesId named_set = 13;
 * @return {?proto.build_event_stream.BuildEventId.NamedSetOfFilesId}
 */
proto.build_event_stream.BuildEventId.prototype.getNamedSet = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.NamedSetOfFilesId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.NamedSetOfFilesId, 13));
};
/** @param {?proto.build_event_stream.BuildEventId.NamedSetOfFilesId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setNamedSet = function (value) {
    jspb.Message.setOneofWrapperField(this, 13, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearNamedSet = function () {
    this.setNamedSet(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasNamedSet = function () {
    return jspb.Message.getField(this, 13) != null;
};
/**
 * optional TargetCompletedId target_completed = 5;
 * @return {?proto.build_event_stream.BuildEventId.TargetCompletedId}
 */
proto.build_event_stream.BuildEventId.prototype.getTargetCompleted = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.TargetCompletedId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.TargetCompletedId, 5));
};
/** @param {?proto.build_event_stream.BuildEventId.TargetCompletedId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setTargetCompleted = function (value) {
    jspb.Message.setOneofWrapperField(this, 5, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearTargetCompleted = function () {
    this.setTargetCompleted(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasTargetCompleted = function () {
    return jspb.Message.getField(this, 5) != null;
};
/**
 * optional ActionCompletedId action_completed = 6;
 * @return {?proto.build_event_stream.BuildEventId.ActionCompletedId}
 */
proto.build_event_stream.BuildEventId.prototype.getActionCompleted = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.ActionCompletedId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.ActionCompletedId, 6));
};
/** @param {?proto.build_event_stream.BuildEventId.ActionCompletedId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setActionCompleted = function (value) {
    jspb.Message.setOneofWrapperField(this, 6, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearActionCompleted = function () {
    this.setActionCompleted(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasActionCompleted = function () {
    return jspb.Message.getField(this, 6) != null;
};
/**
 * optional UnconfiguredLabelId unconfigured_label = 19;
 * @return {?proto.build_event_stream.BuildEventId.UnconfiguredLabelId}
 */
proto.build_event_stream.BuildEventId.prototype.getUnconfiguredLabel = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.UnconfiguredLabelId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.UnconfiguredLabelId, 19));
};
/** @param {?proto.build_event_stream.BuildEventId.UnconfiguredLabelId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setUnconfiguredLabel = function (value) {
    jspb.Message.setOneofWrapperField(this, 19, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearUnconfiguredLabel = function () {
    this.setUnconfiguredLabel(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasUnconfiguredLabel = function () {
    return jspb.Message.getField(this, 19) != null;
};
/**
 * optional ConfiguredLabelId configured_label = 21;
 * @return {?proto.build_event_stream.BuildEventId.ConfiguredLabelId}
 */
proto.build_event_stream.BuildEventId.prototype.getConfiguredLabel = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.ConfiguredLabelId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.ConfiguredLabelId, 21));
};
/** @param {?proto.build_event_stream.BuildEventId.ConfiguredLabelId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setConfiguredLabel = function (value) {
    jspb.Message.setOneofWrapperField(this, 21, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearConfiguredLabel = function () {
    this.setConfiguredLabel(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasConfiguredLabel = function () {
    return jspb.Message.getField(this, 21) != null;
};
/**
 * optional TestResultId test_result = 8;
 * @return {?proto.build_event_stream.BuildEventId.TestResultId}
 */
proto.build_event_stream.BuildEventId.prototype.getTestResult = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.TestResultId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.TestResultId, 8));
};
/** @param {?proto.build_event_stream.BuildEventId.TestResultId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setTestResult = function (value) {
    jspb.Message.setOneofWrapperField(this, 8, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearTestResult = function () {
    this.setTestResult(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasTestResult = function () {
    return jspb.Message.getField(this, 8) != null;
};
/**
 * optional TestSummaryId test_summary = 7;
 * @return {?proto.build_event_stream.BuildEventId.TestSummaryId}
 */
proto.build_event_stream.BuildEventId.prototype.getTestSummary = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.TestSummaryId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.TestSummaryId, 7));
};
/** @param {?proto.build_event_stream.BuildEventId.TestSummaryId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setTestSummary = function (value) {
    jspb.Message.setOneofWrapperField(this, 7, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearTestSummary = function () {
    this.setTestSummary(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasTestSummary = function () {
    return jspb.Message.getField(this, 7) != null;
};
/**
 * optional BuildFinishedId build_finished = 9;
 * @return {?proto.build_event_stream.BuildEventId.BuildFinishedId}
 */
proto.build_event_stream.BuildEventId.prototype.getBuildFinished = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.BuildFinishedId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.BuildFinishedId, 9));
};
/** @param {?proto.build_event_stream.BuildEventId.BuildFinishedId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setBuildFinished = function (value) {
    jspb.Message.setOneofWrapperField(this, 9, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearBuildFinished = function () {
    this.setBuildFinished(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasBuildFinished = function () {
    return jspb.Message.getField(this, 9) != null;
};
/**
 * optional BuildToolLogsId build_tool_logs = 20;
 * @return {?proto.build_event_stream.BuildEventId.BuildToolLogsId}
 */
proto.build_event_stream.BuildEventId.prototype.getBuildToolLogs = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.BuildToolLogsId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.BuildToolLogsId, 20));
};
/** @param {?proto.build_event_stream.BuildEventId.BuildToolLogsId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setBuildToolLogs = function (value) {
    jspb.Message.setOneofWrapperField(this, 20, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearBuildToolLogs = function () {
    this.setBuildToolLogs(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasBuildToolLogs = function () {
    return jspb.Message.getField(this, 20) != null;
};
/**
 * optional BuildMetricsId build_metrics = 22;
 * @return {?proto.build_event_stream.BuildEventId.BuildMetricsId}
 */
proto.build_event_stream.BuildEventId.prototype.getBuildMetrics = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.BuildMetricsId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.BuildMetricsId, 22));
};
/** @param {?proto.build_event_stream.BuildEventId.BuildMetricsId|undefined} value */
proto.build_event_stream.BuildEventId.prototype.setBuildMetrics = function (value) {
    jspb.Message.setOneofWrapperField(this, 22, proto.build_event_stream.BuildEventId.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEventId.prototype.clearBuildMetrics = function () {
    this.setBuildMetrics(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEventId.prototype.hasBuildMetrics = function () {
    return jspb.Message.getField(this, 22) != null;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.Progress = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.Progress, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.Progress.displayName = 'proto.build_event_stream.Progress';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.Progress.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.Progress.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.Progress} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.Progress.toObject = function (includeInstance, msg) {
        var f, obj = {
            stdout: jspb.Message.getFieldWithDefault(msg, 1, ""),
            stderr: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.Progress}
 */
proto.build_event_stream.Progress.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.Progress;
    return proto.build_event_stream.Progress.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.Progress} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.Progress}
 */
proto.build_event_stream.Progress.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setStdout(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setStderr(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.Progress.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.Progress.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.Progress} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.Progress.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getStdout();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getStderr();
    if (f.length > 0) {
        writer.writeString(2, f);
    }
};
/**
 * optional string stdout = 1;
 * @return {string}
 */
proto.build_event_stream.Progress.prototype.getStdout = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.Progress.prototype.setStdout = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional string stderr = 2;
 * @return {string}
 */
proto.build_event_stream.Progress.prototype.getStderr = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};
/** @param {string} value */
proto.build_event_stream.Progress.prototype.setStderr = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.Aborted = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.Aborted, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.Aborted.displayName = 'proto.build_event_stream.Aborted';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.Aborted.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.Aborted.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.Aborted} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.Aborted.toObject = function (includeInstance, msg) {
        var f, obj = {
            reason: jspb.Message.getFieldWithDefault(msg, 1, 0),
            description: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.Aborted}
 */
proto.build_event_stream.Aborted.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.Aborted;
    return proto.build_event_stream.Aborted.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.Aborted} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.Aborted}
 */
proto.build_event_stream.Aborted.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {!proto.build_event_stream.Aborted.AbortReason} */ (reader.readEnum());
                msg.setReason(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setDescription(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.Aborted.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.Aborted.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.Aborted} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.Aborted.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getReason();
    if (f !== 0.0) {
        writer.writeEnum(1, f);
    }
    f = message.getDescription();
    if (f.length > 0) {
        writer.writeString(2, f);
    }
};
/**
 * @enum {number}
 */
proto.build_event_stream.Aborted.AbortReason = {
    UNKNOWN: 0,
    USER_INTERRUPTED: 1,
    NO_ANALYZE: 8,
    NO_BUILD: 9,
    TIME_OUT: 2,
    REMOTE_ENVIRONMENT_FAILURE: 3,
    INTERNAL: 4,
    LOADING_FAILURE: 5,
    ANALYSIS_FAILURE: 6,
    SKIPPED: 7
};
/**
 * optional AbortReason reason = 1;
 * @return {!proto.build_event_stream.Aborted.AbortReason}
 */
proto.build_event_stream.Aborted.prototype.getReason = function () {
    return /** @type {!proto.build_event_stream.Aborted.AbortReason} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};
/** @param {!proto.build_event_stream.Aborted.AbortReason} value */
proto.build_event_stream.Aborted.prototype.setReason = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional string description = 2;
 * @return {string}
 */
proto.build_event_stream.Aborted.prototype.getDescription = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};
/** @param {string} value */
proto.build_event_stream.Aborted.prototype.setDescription = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildStarted = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildStarted, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildStarted.displayName = 'proto.build_event_stream.BuildStarted';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildStarted.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildStarted.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildStarted} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildStarted.toObject = function (includeInstance, msg) {
        var f, obj = {
            uuid: jspb.Message.getFieldWithDefault(msg, 1, ""),
            startTimeMillis: jspb.Message.getFieldWithDefault(msg, 2, 0),
            buildToolVersion: jspb.Message.getFieldWithDefault(msg, 3, ""),
            optionsDescription: jspb.Message.getFieldWithDefault(msg, 4, ""),
            command: jspb.Message.getFieldWithDefault(msg, 5, ""),
            workingDirectory: jspb.Message.getFieldWithDefault(msg, 6, ""),
            workspaceDirectory: jspb.Message.getFieldWithDefault(msg, 7, ""),
            serverPid: jspb.Message.getFieldWithDefault(msg, 8, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildStarted}
 */
proto.build_event_stream.BuildStarted.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildStarted;
    return proto.build_event_stream.BuildStarted.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildStarted} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildStarted}
 */
proto.build_event_stream.BuildStarted.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setUuid(value);
                break;
            case 2:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setStartTimeMillis(value);
                break;
            case 3:
                var value = /** @type {string} */ (reader.readString());
                msg.setBuildToolVersion(value);
                break;
            case 4:
                var value = /** @type {string} */ (reader.readString());
                msg.setOptionsDescription(value);
                break;
            case 5:
                var value = /** @type {string} */ (reader.readString());
                msg.setCommand(value);
                break;
            case 6:
                var value = /** @type {string} */ (reader.readString());
                msg.setWorkingDirectory(value);
                break;
            case 7:
                var value = /** @type {string} */ (reader.readString());
                msg.setWorkspaceDirectory(value);
                break;
            case 8:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setServerPid(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildStarted.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildStarted.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildStarted} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildStarted.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getUuid();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getStartTimeMillis();
    if (f !== 0) {
        writer.writeInt64(2, f);
    }
    f = message.getBuildToolVersion();
    if (f.length > 0) {
        writer.writeString(3, f);
    }
    f = message.getOptionsDescription();
    if (f.length > 0) {
        writer.writeString(4, f);
    }
    f = message.getCommand();
    if (f.length > 0) {
        writer.writeString(5, f);
    }
    f = message.getWorkingDirectory();
    if (f.length > 0) {
        writer.writeString(6, f);
    }
    f = message.getWorkspaceDirectory();
    if (f.length > 0) {
        writer.writeString(7, f);
    }
    f = message.getServerPid();
    if (f !== 0) {
        writer.writeInt64(8, f);
    }
};
/**
 * optional string uuid = 1;
 * @return {string}
 */
proto.build_event_stream.BuildStarted.prototype.getUuid = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildStarted.prototype.setUuid = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional int64 start_time_millis = 2;
 * @return {number}
 */
proto.build_event_stream.BuildStarted.prototype.getStartTimeMillis = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildStarted.prototype.setStartTimeMillis = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * optional string build_tool_version = 3;
 * @return {string}
 */
proto.build_event_stream.BuildStarted.prototype.getBuildToolVersion = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildStarted.prototype.setBuildToolVersion = function (value) {
    jspb.Message.setField(this, 3, value);
};
/**
 * optional string options_description = 4;
 * @return {string}
 */
proto.build_event_stream.BuildStarted.prototype.getOptionsDescription = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildStarted.prototype.setOptionsDescription = function (value) {
    jspb.Message.setField(this, 4, value);
};
/**
 * optional string command = 5;
 * @return {string}
 */
proto.build_event_stream.BuildStarted.prototype.getCommand = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildStarted.prototype.setCommand = function (value) {
    jspb.Message.setField(this, 5, value);
};
/**
 * optional string working_directory = 6;
 * @return {string}
 */
proto.build_event_stream.BuildStarted.prototype.getWorkingDirectory = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildStarted.prototype.setWorkingDirectory = function (value) {
    jspb.Message.setField(this, 6, value);
};
/**
 * optional string workspace_directory = 7;
 * @return {string}
 */
proto.build_event_stream.BuildStarted.prototype.getWorkspaceDirectory = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildStarted.prototype.setWorkspaceDirectory = function (value) {
    jspb.Message.setField(this, 7, value);
};
/**
 * optional int64 server_pid = 8;
 * @return {number}
 */
proto.build_event_stream.BuildStarted.prototype.getServerPid = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildStarted.prototype.setServerPid = function (value) {
    jspb.Message.setField(this, 8, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.UnstructuredCommandLine = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.UnstructuredCommandLine.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.UnstructuredCommandLine, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.UnstructuredCommandLine.displayName = 'proto.build_event_stream.UnstructuredCommandLine';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.UnstructuredCommandLine.repeatedFields_ = [1];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.UnstructuredCommandLine.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.UnstructuredCommandLine.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.UnstructuredCommandLine} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.UnstructuredCommandLine.toObject = function (includeInstance, msg) {
        var f, obj = {
            argsList: jspb.Message.getRepeatedField(msg, 1)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.UnstructuredCommandLine}
 */
proto.build_event_stream.UnstructuredCommandLine.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.UnstructuredCommandLine;
    return proto.build_event_stream.UnstructuredCommandLine.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.UnstructuredCommandLine} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.UnstructuredCommandLine}
 */
proto.build_event_stream.UnstructuredCommandLine.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.addArgs(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.UnstructuredCommandLine.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.UnstructuredCommandLine.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.UnstructuredCommandLine} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.UnstructuredCommandLine.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getArgsList();
    if (f.length > 0) {
        writer.writeRepeatedString(1, f);
    }
};
/**
 * repeated string args = 1;
 * @return {!Array.<string>}
 */
proto.build_event_stream.UnstructuredCommandLine.prototype.getArgsList = function () {
    return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 1));
};
/** @param {!Array.<string>} value */
proto.build_event_stream.UnstructuredCommandLine.prototype.setArgsList = function (value) {
    jspb.Message.setField(this, 1, value || []);
};
/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.build_event_stream.UnstructuredCommandLine.prototype.addArgs = function (value, opt_index) {
    jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};
proto.build_event_stream.UnstructuredCommandLine.prototype.clearArgsList = function () {
    this.setArgsList([]);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.OptionsParsed = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.OptionsParsed.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.OptionsParsed, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.OptionsParsed.displayName = 'proto.build_event_stream.OptionsParsed';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.OptionsParsed.repeatedFields_ = [1, 2, 3, 4];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.OptionsParsed.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.OptionsParsed.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.OptionsParsed} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.OptionsParsed.toObject = function (includeInstance, msg) {
        var f, obj = {
            startupOptionsList: jspb.Message.getRepeatedField(msg, 1),
            explicitStartupOptionsList: jspb.Message.getRepeatedField(msg, 2),
            cmdLineList: jspb.Message.getRepeatedField(msg, 3),
            explicitCmdLineList: jspb.Message.getRepeatedField(msg, 4),
            invocationPolicy: (f = msg.getInvocationPolicy()) && src_main_protobuf_invocation_policy_pb.InvocationPolicy.toObject(includeInstance, f),
            toolTag: jspb.Message.getFieldWithDefault(msg, 6, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.OptionsParsed}
 */
proto.build_event_stream.OptionsParsed.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.OptionsParsed;
    return proto.build_event_stream.OptionsParsed.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.OptionsParsed} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.OptionsParsed}
 */
proto.build_event_stream.OptionsParsed.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.addStartupOptions(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.addExplicitStartupOptions(value);
                break;
            case 3:
                var value = /** @type {string} */ (reader.readString());
                msg.addCmdLine(value);
                break;
            case 4:
                var value = /** @type {string} */ (reader.readString());
                msg.addExplicitCmdLine(value);
                break;
            case 5:
                var value = new src_main_protobuf_invocation_policy_pb.InvocationPolicy;
                reader.readMessage(value, src_main_protobuf_invocation_policy_pb.InvocationPolicy.deserializeBinaryFromReader);
                msg.setInvocationPolicy(value);
                break;
            case 6:
                var value = /** @type {string} */ (reader.readString());
                msg.setToolTag(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.OptionsParsed.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.OptionsParsed.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.OptionsParsed} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.OptionsParsed.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getStartupOptionsList();
    if (f.length > 0) {
        writer.writeRepeatedString(1, f);
    }
    f = message.getExplicitStartupOptionsList();
    if (f.length > 0) {
        writer.writeRepeatedString(2, f);
    }
    f = message.getCmdLineList();
    if (f.length > 0) {
        writer.writeRepeatedString(3, f);
    }
    f = message.getExplicitCmdLineList();
    if (f.length > 0) {
        writer.writeRepeatedString(4, f);
    }
    f = message.getInvocationPolicy();
    if (f != null) {
        writer.writeMessage(5, f, src_main_protobuf_invocation_policy_pb.InvocationPolicy.serializeBinaryToWriter);
    }
    f = message.getToolTag();
    if (f.length > 0) {
        writer.writeString(6, f);
    }
};
/**
 * repeated string startup_options = 1;
 * @return {!Array.<string>}
 */
proto.build_event_stream.OptionsParsed.prototype.getStartupOptionsList = function () {
    return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 1));
};
/** @param {!Array.<string>} value */
proto.build_event_stream.OptionsParsed.prototype.setStartupOptionsList = function (value) {
    jspb.Message.setField(this, 1, value || []);
};
/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.build_event_stream.OptionsParsed.prototype.addStartupOptions = function (value, opt_index) {
    jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};
proto.build_event_stream.OptionsParsed.prototype.clearStartupOptionsList = function () {
    this.setStartupOptionsList([]);
};
/**
 * repeated string explicit_startup_options = 2;
 * @return {!Array.<string>}
 */
proto.build_event_stream.OptionsParsed.prototype.getExplicitStartupOptionsList = function () {
    return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 2));
};
/** @param {!Array.<string>} value */
proto.build_event_stream.OptionsParsed.prototype.setExplicitStartupOptionsList = function (value) {
    jspb.Message.setField(this, 2, value || []);
};
/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.build_event_stream.OptionsParsed.prototype.addExplicitStartupOptions = function (value, opt_index) {
    jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};
proto.build_event_stream.OptionsParsed.prototype.clearExplicitStartupOptionsList = function () {
    this.setExplicitStartupOptionsList([]);
};
/**
 * repeated string cmd_line = 3;
 * @return {!Array.<string>}
 */
proto.build_event_stream.OptionsParsed.prototype.getCmdLineList = function () {
    return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 3));
};
/** @param {!Array.<string>} value */
proto.build_event_stream.OptionsParsed.prototype.setCmdLineList = function (value) {
    jspb.Message.setField(this, 3, value || []);
};
/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.build_event_stream.OptionsParsed.prototype.addCmdLine = function (value, opt_index) {
    jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};
proto.build_event_stream.OptionsParsed.prototype.clearCmdLineList = function () {
    this.setCmdLineList([]);
};
/**
 * repeated string explicit_cmd_line = 4;
 * @return {!Array.<string>}
 */
proto.build_event_stream.OptionsParsed.prototype.getExplicitCmdLineList = function () {
    return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 4));
};
/** @param {!Array.<string>} value */
proto.build_event_stream.OptionsParsed.prototype.setExplicitCmdLineList = function (value) {
    jspb.Message.setField(this, 4, value || []);
};
/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.build_event_stream.OptionsParsed.prototype.addExplicitCmdLine = function (value, opt_index) {
    jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};
proto.build_event_stream.OptionsParsed.prototype.clearExplicitCmdLineList = function () {
    this.setExplicitCmdLineList([]);
};
/**
 * optional blaze.invocation_policy.InvocationPolicy invocation_policy = 5;
 * @return {?proto.blaze.invocation_policy.InvocationPolicy}
 */
proto.build_event_stream.OptionsParsed.prototype.getInvocationPolicy = function () {
    return /** @type{?proto.blaze.invocation_policy.InvocationPolicy} */ (jspb.Message.getWrapperField(this, src_main_protobuf_invocation_policy_pb.InvocationPolicy, 5));
};
/** @param {?proto.blaze.invocation_policy.InvocationPolicy|undefined} value */
proto.build_event_stream.OptionsParsed.prototype.setInvocationPolicy = function (value) {
    jspb.Message.setWrapperField(this, 5, value);
};
proto.build_event_stream.OptionsParsed.prototype.clearInvocationPolicy = function () {
    this.setInvocationPolicy(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.OptionsParsed.prototype.hasInvocationPolicy = function () {
    return jspb.Message.getField(this, 5) != null;
};
/**
 * optional string tool_tag = 6;
 * @return {string}
 */
proto.build_event_stream.OptionsParsed.prototype.getToolTag = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};
/** @param {string} value */
proto.build_event_stream.OptionsParsed.prototype.setToolTag = function (value) {
    jspb.Message.setField(this, 6, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.Fetch = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.Fetch, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.Fetch.displayName = 'proto.build_event_stream.Fetch';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.Fetch.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.Fetch.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.Fetch} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.Fetch.toObject = function (includeInstance, msg) {
        var f, obj = {
            success: jspb.Message.getFieldWithDefault(msg, 1, false)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.Fetch}
 */
proto.build_event_stream.Fetch.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.Fetch;
    return proto.build_event_stream.Fetch.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.Fetch} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.Fetch}
 */
proto.build_event_stream.Fetch.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {boolean} */ (reader.readBool());
                msg.setSuccess(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.Fetch.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.Fetch.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.Fetch} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.Fetch.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getSuccess();
    if (f) {
        writer.writeBool(1, f);
    }
};
/**
 * optional bool success = 1;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.build_event_stream.Fetch.prototype.getSuccess = function () {
    return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 1, false));
};
/** @param {boolean} value */
proto.build_event_stream.Fetch.prototype.setSuccess = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.WorkspaceStatus = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.WorkspaceStatus.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.WorkspaceStatus, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.WorkspaceStatus.displayName = 'proto.build_event_stream.WorkspaceStatus';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.WorkspaceStatus.repeatedFields_ = [1];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.WorkspaceStatus.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.WorkspaceStatus.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.WorkspaceStatus} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.WorkspaceStatus.toObject = function (includeInstance, msg) {
        var f, obj = {
            itemList: jspb.Message.toObjectList(msg.getItemList(), proto.build_event_stream.WorkspaceStatus.Item.toObject, includeInstance)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.WorkspaceStatus}
 */
proto.build_event_stream.WorkspaceStatus.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.WorkspaceStatus;
    return proto.build_event_stream.WorkspaceStatus.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.WorkspaceStatus} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.WorkspaceStatus}
 */
proto.build_event_stream.WorkspaceStatus.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new proto.build_event_stream.WorkspaceStatus.Item;
                reader.readMessage(value, proto.build_event_stream.WorkspaceStatus.Item.deserializeBinaryFromReader);
                msg.addItem(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.WorkspaceStatus.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.WorkspaceStatus.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.WorkspaceStatus} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.WorkspaceStatus.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getItemList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(1, f, proto.build_event_stream.WorkspaceStatus.Item.serializeBinaryToWriter);
    }
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.WorkspaceStatus.Item = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.WorkspaceStatus.Item, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.WorkspaceStatus.Item.displayName = 'proto.build_event_stream.WorkspaceStatus.Item';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.WorkspaceStatus.Item.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.WorkspaceStatus.Item.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.WorkspaceStatus.Item} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.WorkspaceStatus.Item.toObject = function (includeInstance, msg) {
        var f, obj = {
            key: jspb.Message.getFieldWithDefault(msg, 1, ""),
            value: jspb.Message.getFieldWithDefault(msg, 2, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.WorkspaceStatus.Item}
 */
proto.build_event_stream.WorkspaceStatus.Item.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.WorkspaceStatus.Item;
    return proto.build_event_stream.WorkspaceStatus.Item.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.WorkspaceStatus.Item} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.WorkspaceStatus.Item}
 */
proto.build_event_stream.WorkspaceStatus.Item.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setKey(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setValue(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.WorkspaceStatus.Item.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.WorkspaceStatus.Item.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.WorkspaceStatus.Item} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.WorkspaceStatus.Item.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getKey();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getValue();
    if (f.length > 0) {
        writer.writeString(2, f);
    }
};
/**
 * optional string key = 1;
 * @return {string}
 */
proto.build_event_stream.WorkspaceStatus.Item.prototype.getKey = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.WorkspaceStatus.Item.prototype.setKey = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional string value = 2;
 * @return {string}
 */
proto.build_event_stream.WorkspaceStatus.Item.prototype.getValue = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};
/** @param {string} value */
proto.build_event_stream.WorkspaceStatus.Item.prototype.setValue = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * repeated Item item = 1;
 * @return {!Array.<!proto.build_event_stream.WorkspaceStatus.Item>}
 */
proto.build_event_stream.WorkspaceStatus.prototype.getItemList = function () {
    return /** @type{!Array.<!proto.build_event_stream.WorkspaceStatus.Item>} */ (jspb.Message.getRepeatedWrapperField(this, proto.build_event_stream.WorkspaceStatus.Item, 1));
};
/** @param {!Array.<!proto.build_event_stream.WorkspaceStatus.Item>} value */
proto.build_event_stream.WorkspaceStatus.prototype.setItemList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 1, value);
};
/**
 * @param {!proto.build_event_stream.WorkspaceStatus.Item=} opt_value
 * @param {number=} opt_index
 * @return {!proto.build_event_stream.WorkspaceStatus.Item}
 */
proto.build_event_stream.WorkspaceStatus.prototype.addItem = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.build_event_stream.WorkspaceStatus.Item, opt_index);
};
proto.build_event_stream.WorkspaceStatus.prototype.clearItemList = function () {
    this.setItemList([]);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.Configuration = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.Configuration, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.Configuration.displayName = 'proto.build_event_stream.Configuration';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.Configuration.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.Configuration.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.Configuration} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.Configuration.toObject = function (includeInstance, msg) {
        var f, obj = {
            mnemonic: jspb.Message.getFieldWithDefault(msg, 1, ""),
            platformName: jspb.Message.getFieldWithDefault(msg, 2, ""),
            cpu: jspb.Message.getFieldWithDefault(msg, 3, ""),
            makeVariableMap: (f = msg.getMakeVariableMap()) ? f.toObject(includeInstance, undefined) : []
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.Configuration}
 */
proto.build_event_stream.Configuration.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.Configuration;
    return proto.build_event_stream.Configuration.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.Configuration} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.Configuration}
 */
proto.build_event_stream.Configuration.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setMnemonic(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setPlatformName(value);
                break;
            case 3:
                var value = /** @type {string} */ (reader.readString());
                msg.setCpu(value);
                break;
            case 4:
                var value = msg.getMakeVariableMap();
                reader.readMessage(value, function (message, reader) {
                    jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString);
                });
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.Configuration.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.Configuration.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.Configuration} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.Configuration.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getMnemonic();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getPlatformName();
    if (f.length > 0) {
        writer.writeString(2, f);
    }
    f = message.getCpu();
    if (f.length > 0) {
        writer.writeString(3, f);
    }
    f = message.getMakeVariableMap(true);
    if (f && f.getLength() > 0) {
        f.serializeBinary(4, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
    }
};
/**
 * optional string mnemonic = 1;
 * @return {string}
 */
proto.build_event_stream.Configuration.prototype.getMnemonic = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.Configuration.prototype.setMnemonic = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional string platform_name = 2;
 * @return {string}
 */
proto.build_event_stream.Configuration.prototype.getPlatformName = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};
/** @param {string} value */
proto.build_event_stream.Configuration.prototype.setPlatformName = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * optional string cpu = 3;
 * @return {string}
 */
proto.build_event_stream.Configuration.prototype.getCpu = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};
/** @param {string} value */
proto.build_event_stream.Configuration.prototype.setCpu = function (value) {
    jspb.Message.setField(this, 3, value);
};
/**
 * map<string, string> make_variable = 4;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.build_event_stream.Configuration.prototype.getMakeVariableMap = function (opt_noLazyCreate) {
    return /** @type {!jspb.Map<string,string>} */ (jspb.Message.getMapField(this, 4, opt_noLazyCreate, null));
};
proto.build_event_stream.Configuration.prototype.clearMakeVariableMap = function () {
    this.getMakeVariableMap().clear();
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.PatternExpanded = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.PatternExpanded, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.PatternExpanded.displayName = 'proto.build_event_stream.PatternExpanded';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.PatternExpanded.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.PatternExpanded.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.PatternExpanded} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.PatternExpanded.toObject = function (includeInstance, msg) {
        var f, obj = {};
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.PatternExpanded}
 */
proto.build_event_stream.PatternExpanded.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.PatternExpanded;
    return proto.build_event_stream.PatternExpanded.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.PatternExpanded} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.PatternExpanded}
 */
proto.build_event_stream.PatternExpanded.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.PatternExpanded.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.PatternExpanded.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.PatternExpanded} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.PatternExpanded.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.TargetConfigured = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.TargetConfigured.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.TargetConfigured, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.TargetConfigured.displayName = 'proto.build_event_stream.TargetConfigured';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.TargetConfigured.repeatedFields_ = [3];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.TargetConfigured.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.TargetConfigured.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.TargetConfigured} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.TargetConfigured.toObject = function (includeInstance, msg) {
        var f, obj = {
            targetKind: jspb.Message.getFieldWithDefault(msg, 1, ""),
            testSize: jspb.Message.getFieldWithDefault(msg, 2, 0),
            tagList: jspb.Message.getRepeatedField(msg, 3)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.TargetConfigured}
 */
proto.build_event_stream.TargetConfigured.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.TargetConfigured;
    return proto.build_event_stream.TargetConfigured.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.TargetConfigured} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.TargetConfigured}
 */
proto.build_event_stream.TargetConfigured.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setTargetKind(value);
                break;
            case 2:
                var value = /** @type {!proto.build_event_stream.TestSize} */ (reader.readEnum());
                msg.setTestSize(value);
                break;
            case 3:
                var value = /** @type {string} */ (reader.readString());
                msg.addTag(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.TargetConfigured.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.TargetConfigured.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.TargetConfigured} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.TargetConfigured.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getTargetKind();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getTestSize();
    if (f !== 0.0) {
        writer.writeEnum(2, f);
    }
    f = message.getTagList();
    if (f.length > 0) {
        writer.writeRepeatedString(3, f);
    }
};
/**
 * optional string target_kind = 1;
 * @return {string}
 */
proto.build_event_stream.TargetConfigured.prototype.getTargetKind = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.TargetConfigured.prototype.setTargetKind = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional TestSize test_size = 2;
 * @return {!proto.build_event_stream.TestSize}
 */
proto.build_event_stream.TargetConfigured.prototype.getTestSize = function () {
    return /** @type {!proto.build_event_stream.TestSize} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};
/** @param {!proto.build_event_stream.TestSize} value */
proto.build_event_stream.TargetConfigured.prototype.setTestSize = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * repeated string tag = 3;
 * @return {!Array.<string>}
 */
proto.build_event_stream.TargetConfigured.prototype.getTagList = function () {
    return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 3));
};
/** @param {!Array.<string>} value */
proto.build_event_stream.TargetConfigured.prototype.setTagList = function (value) {
    jspb.Message.setField(this, 3, value || []);
};
/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.build_event_stream.TargetConfigured.prototype.addTag = function (value, opt_index) {
    jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};
proto.build_event_stream.TargetConfigured.prototype.clearTagList = function () {
    this.setTagList([]);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.File = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, proto.build_event_stream.File.oneofGroups_);
};
goog.inherits(proto.build_event_stream.File, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.File.displayName = 'proto.build_event_stream.File';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.build_event_stream.File.oneofGroups_ = [[2, 3]];
/**
 * @enum {number}
 */
proto.build_event_stream.File.FileCase = {
    FILE_NOT_SET: 0,
    URI: 2,
    CONTENTS: 3
};
/**
 * @return {proto.build_event_stream.File.FileCase}
 */
proto.build_event_stream.File.prototype.getFileCase = function () {
    return /** @type {proto.build_event_stream.File.FileCase} */ (jspb.Message.computeOneofCase(this, proto.build_event_stream.File.oneofGroups_[0]));
};
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.File.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.File.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.File} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.File.toObject = function (includeInstance, msg) {
        var f, obj = {
            name: jspb.Message.getFieldWithDefault(msg, 1, ""),
            uri: jspb.Message.getFieldWithDefault(msg, 2, ""),
            contents: msg.getContents_asB64()
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.File}
 */
proto.build_event_stream.File.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.File;
    return proto.build_event_stream.File.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.File} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.File}
 */
proto.build_event_stream.File.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setName(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setUri(value);
                break;
            case 3:
                var value = /** @type {!Uint8Array} */ (reader.readBytes());
                msg.setContents(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.File.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.File.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.File} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.File.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getName();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = /** @type {string} */ (jspb.Message.getField(message, 2));
    if (f != null) {
        writer.writeString(2, f);
    }
    f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 3));
    if (f != null) {
        writer.writeBytes(3, f);
    }
};
/**
 * optional string name = 1;
 * @return {string}
 */
proto.build_event_stream.File.prototype.getName = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.File.prototype.setName = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional string uri = 2;
 * @return {string}
 */
proto.build_event_stream.File.prototype.getUri = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};
/** @param {string} value */
proto.build_event_stream.File.prototype.setUri = function (value) {
    jspb.Message.setOneofField(this, 2, proto.build_event_stream.File.oneofGroups_[0], value);
};
proto.build_event_stream.File.prototype.clearUri = function () {
    jspb.Message.setOneofField(this, 2, proto.build_event_stream.File.oneofGroups_[0], undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.File.prototype.hasUri = function () {
    return jspb.Message.getField(this, 2) != null;
};
/**
 * optional bytes contents = 3;
 * @return {!(string|Uint8Array)}
 */
proto.build_event_stream.File.prototype.getContents = function () {
    return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};
/**
 * optional bytes contents = 3;
 * This is a type-conversion wrapper around `getContents()`
 * @return {string}
 */
proto.build_event_stream.File.prototype.getContents_asB64 = function () {
    return /** @type {string} */ (jspb.Message.bytesAsB64(this.getContents()));
};
/**
 * optional bytes contents = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getContents()`
 * @return {!Uint8Array}
 */
proto.build_event_stream.File.prototype.getContents_asU8 = function () {
    return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(this.getContents()));
};
/** @param {!(string|Uint8Array)} value */
proto.build_event_stream.File.prototype.setContents = function (value) {
    jspb.Message.setOneofField(this, 3, proto.build_event_stream.File.oneofGroups_[0], value);
};
proto.build_event_stream.File.prototype.clearContents = function () {
    jspb.Message.setOneofField(this, 3, proto.build_event_stream.File.oneofGroups_[0], undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.File.prototype.hasContents = function () {
    return jspb.Message.getField(this, 3) != null;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.NamedSetOfFiles = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.NamedSetOfFiles.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.NamedSetOfFiles, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.NamedSetOfFiles.displayName = 'proto.build_event_stream.NamedSetOfFiles';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.NamedSetOfFiles.repeatedFields_ = [1, 2];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.NamedSetOfFiles.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.NamedSetOfFiles.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.NamedSetOfFiles} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.NamedSetOfFiles.toObject = function (includeInstance, msg) {
        var f, obj = {
            filesList: jspb.Message.toObjectList(msg.getFilesList(), proto.build_event_stream.File.toObject, includeInstance),
            fileSetsList: jspb.Message.toObjectList(msg.getFileSetsList(), proto.build_event_stream.BuildEventId.NamedSetOfFilesId.toObject, includeInstance)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.NamedSetOfFiles}
 */
proto.build_event_stream.NamedSetOfFiles.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.NamedSetOfFiles;
    return proto.build_event_stream.NamedSetOfFiles.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.NamedSetOfFiles} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.NamedSetOfFiles}
 */
proto.build_event_stream.NamedSetOfFiles.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new proto.build_event_stream.File;
                reader.readMessage(value, proto.build_event_stream.File.deserializeBinaryFromReader);
                msg.addFiles(value);
                break;
            case 2:
                var value = new proto.build_event_stream.BuildEventId.NamedSetOfFilesId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.NamedSetOfFilesId.deserializeBinaryFromReader);
                msg.addFileSets(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.NamedSetOfFiles.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.NamedSetOfFiles.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.NamedSetOfFiles} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.NamedSetOfFiles.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getFilesList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(1, f, proto.build_event_stream.File.serializeBinaryToWriter);
    }
    f = message.getFileSetsList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(2, f, proto.build_event_stream.BuildEventId.NamedSetOfFilesId.serializeBinaryToWriter);
    }
};
/**
 * repeated File files = 1;
 * @return {!Array.<!proto.build_event_stream.File>}
 */
proto.build_event_stream.NamedSetOfFiles.prototype.getFilesList = function () {
    return /** @type{!Array.<!proto.build_event_stream.File>} */ (jspb.Message.getRepeatedWrapperField(this, proto.build_event_stream.File, 1));
};
/** @param {!Array.<!proto.build_event_stream.File>} value */
proto.build_event_stream.NamedSetOfFiles.prototype.setFilesList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 1, value);
};
/**
 * @param {!proto.build_event_stream.File=} opt_value
 * @param {number=} opt_index
 * @return {!proto.build_event_stream.File}
 */
proto.build_event_stream.NamedSetOfFiles.prototype.addFiles = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.build_event_stream.File, opt_index);
};
proto.build_event_stream.NamedSetOfFiles.prototype.clearFilesList = function () {
    this.setFilesList([]);
};
/**
 * repeated BuildEventId.NamedSetOfFilesId file_sets = 2;
 * @return {!Array.<!proto.build_event_stream.BuildEventId.NamedSetOfFilesId>}
 */
proto.build_event_stream.NamedSetOfFiles.prototype.getFileSetsList = function () {
    return /** @type{!Array.<!proto.build_event_stream.BuildEventId.NamedSetOfFilesId>} */ (jspb.Message.getRepeatedWrapperField(this, proto.build_event_stream.BuildEventId.NamedSetOfFilesId, 2));
};
/** @param {!Array.<!proto.build_event_stream.BuildEventId.NamedSetOfFilesId>} value */
proto.build_event_stream.NamedSetOfFiles.prototype.setFileSetsList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 2, value);
};
/**
 * @param {!proto.build_event_stream.BuildEventId.NamedSetOfFilesId=} opt_value
 * @param {number=} opt_index
 * @return {!proto.build_event_stream.BuildEventId.NamedSetOfFilesId}
 */
proto.build_event_stream.NamedSetOfFiles.prototype.addFileSets = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.build_event_stream.BuildEventId.NamedSetOfFilesId, opt_index);
};
proto.build_event_stream.NamedSetOfFiles.prototype.clearFileSetsList = function () {
    this.setFileSetsList([]);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.ActionExecuted = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.ActionExecuted.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.ActionExecuted, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.ActionExecuted.displayName = 'proto.build_event_stream.ActionExecuted';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.ActionExecuted.repeatedFields_ = [9];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.ActionExecuted.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.ActionExecuted.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.ActionExecuted} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.ActionExecuted.toObject = function (includeInstance, msg) {
        var f, obj = {
            success: jspb.Message.getFieldWithDefault(msg, 1, false),
            type: jspb.Message.getFieldWithDefault(msg, 8, ""),
            exitCode: jspb.Message.getFieldWithDefault(msg, 2, 0),
            stdout: (f = msg.getStdout()) && proto.build_event_stream.File.toObject(includeInstance, f),
            stderr: (f = msg.getStderr()) && proto.build_event_stream.File.toObject(includeInstance, f),
            label: jspb.Message.getFieldWithDefault(msg, 5, ""),
            configuration: (f = msg.getConfiguration()) && proto.build_event_stream.BuildEventId.ConfigurationId.toObject(includeInstance, f),
            primaryOutput: (f = msg.getPrimaryOutput()) && proto.build_event_stream.File.toObject(includeInstance, f),
            commandLineList: jspb.Message.getRepeatedField(msg, 9)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.ActionExecuted}
 */
proto.build_event_stream.ActionExecuted.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.ActionExecuted;
    return proto.build_event_stream.ActionExecuted.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.ActionExecuted} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.ActionExecuted}
 */
proto.build_event_stream.ActionExecuted.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {boolean} */ (reader.readBool());
                msg.setSuccess(value);
                break;
            case 8:
                var value = /** @type {string} */ (reader.readString());
                msg.setType(value);
                break;
            case 2:
                var value = /** @type {number} */ (reader.readInt32());
                msg.setExitCode(value);
                break;
            case 3:
                var value = new proto.build_event_stream.File;
                reader.readMessage(value, proto.build_event_stream.File.deserializeBinaryFromReader);
                msg.setStdout(value);
                break;
            case 4:
                var value = new proto.build_event_stream.File;
                reader.readMessage(value, proto.build_event_stream.File.deserializeBinaryFromReader);
                msg.setStderr(value);
                break;
            case 5:
                var value = /** @type {string} */ (reader.readString());
                msg.setLabel(value);
                break;
            case 7:
                var value = new proto.build_event_stream.BuildEventId.ConfigurationId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.ConfigurationId.deserializeBinaryFromReader);
                msg.setConfiguration(value);
                break;
            case 6:
                var value = new proto.build_event_stream.File;
                reader.readMessage(value, proto.build_event_stream.File.deserializeBinaryFromReader);
                msg.setPrimaryOutput(value);
                break;
            case 9:
                var value = /** @type {string} */ (reader.readString());
                msg.addCommandLine(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.ActionExecuted.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.ActionExecuted.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.ActionExecuted} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.ActionExecuted.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getSuccess();
    if (f) {
        writer.writeBool(1, f);
    }
    f = message.getType();
    if (f.length > 0) {
        writer.writeString(8, f);
    }
    f = message.getExitCode();
    if (f !== 0) {
        writer.writeInt32(2, f);
    }
    f = message.getStdout();
    if (f != null) {
        writer.writeMessage(3, f, proto.build_event_stream.File.serializeBinaryToWriter);
    }
    f = message.getStderr();
    if (f != null) {
        writer.writeMessage(4, f, proto.build_event_stream.File.serializeBinaryToWriter);
    }
    f = message.getLabel();
    if (f.length > 0) {
        writer.writeString(5, f);
    }
    f = message.getConfiguration();
    if (f != null) {
        writer.writeMessage(7, f, proto.build_event_stream.BuildEventId.ConfigurationId.serializeBinaryToWriter);
    }
    f = message.getPrimaryOutput();
    if (f != null) {
        writer.writeMessage(6, f, proto.build_event_stream.File.serializeBinaryToWriter);
    }
    f = message.getCommandLineList();
    if (f.length > 0) {
        writer.writeRepeatedString(9, f);
    }
};
/**
 * optional bool success = 1;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.build_event_stream.ActionExecuted.prototype.getSuccess = function () {
    return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 1, false));
};
/** @param {boolean} value */
proto.build_event_stream.ActionExecuted.prototype.setSuccess = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional string type = 8;
 * @return {string}
 */
proto.build_event_stream.ActionExecuted.prototype.getType = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};
/** @param {string} value */
proto.build_event_stream.ActionExecuted.prototype.setType = function (value) {
    jspb.Message.setField(this, 8, value);
};
/**
 * optional int32 exit_code = 2;
 * @return {number}
 */
proto.build_event_stream.ActionExecuted.prototype.getExitCode = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};
/** @param {number} value */
proto.build_event_stream.ActionExecuted.prototype.setExitCode = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * optional File stdout = 3;
 * @return {?proto.build_event_stream.File}
 */
proto.build_event_stream.ActionExecuted.prototype.getStdout = function () {
    return /** @type{?proto.build_event_stream.File} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.File, 3));
};
/** @param {?proto.build_event_stream.File|undefined} value */
proto.build_event_stream.ActionExecuted.prototype.setStdout = function (value) {
    jspb.Message.setWrapperField(this, 3, value);
};
proto.build_event_stream.ActionExecuted.prototype.clearStdout = function () {
    this.setStdout(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.ActionExecuted.prototype.hasStdout = function () {
    return jspb.Message.getField(this, 3) != null;
};
/**
 * optional File stderr = 4;
 * @return {?proto.build_event_stream.File}
 */
proto.build_event_stream.ActionExecuted.prototype.getStderr = function () {
    return /** @type{?proto.build_event_stream.File} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.File, 4));
};
/** @param {?proto.build_event_stream.File|undefined} value */
proto.build_event_stream.ActionExecuted.prototype.setStderr = function (value) {
    jspb.Message.setWrapperField(this, 4, value);
};
proto.build_event_stream.ActionExecuted.prototype.clearStderr = function () {
    this.setStderr(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.ActionExecuted.prototype.hasStderr = function () {
    return jspb.Message.getField(this, 4) != null;
};
/**
 * optional string label = 5;
 * @return {string}
 */
proto.build_event_stream.ActionExecuted.prototype.getLabel = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};
/** @param {string} value */
proto.build_event_stream.ActionExecuted.prototype.setLabel = function (value) {
    jspb.Message.setField(this, 5, value);
};
/**
 * optional BuildEventId.ConfigurationId configuration = 7;
 * @return {?proto.build_event_stream.BuildEventId.ConfigurationId}
 */
proto.build_event_stream.ActionExecuted.prototype.getConfiguration = function () {
    return /** @type{?proto.build_event_stream.BuildEventId.ConfigurationId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId.ConfigurationId, 7));
};
/** @param {?proto.build_event_stream.BuildEventId.ConfigurationId|undefined} value */
proto.build_event_stream.ActionExecuted.prototype.setConfiguration = function (value) {
    jspb.Message.setWrapperField(this, 7, value);
};
proto.build_event_stream.ActionExecuted.prototype.clearConfiguration = function () {
    this.setConfiguration(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.ActionExecuted.prototype.hasConfiguration = function () {
    return jspb.Message.getField(this, 7) != null;
};
/**
 * optional File primary_output = 6;
 * @return {?proto.build_event_stream.File}
 */
proto.build_event_stream.ActionExecuted.prototype.getPrimaryOutput = function () {
    return /** @type{?proto.build_event_stream.File} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.File, 6));
};
/** @param {?proto.build_event_stream.File|undefined} value */
proto.build_event_stream.ActionExecuted.prototype.setPrimaryOutput = function (value) {
    jspb.Message.setWrapperField(this, 6, value);
};
proto.build_event_stream.ActionExecuted.prototype.clearPrimaryOutput = function () {
    this.setPrimaryOutput(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.ActionExecuted.prototype.hasPrimaryOutput = function () {
    return jspb.Message.getField(this, 6) != null;
};
/**
 * repeated string command_line = 9;
 * @return {!Array.<string>}
 */
proto.build_event_stream.ActionExecuted.prototype.getCommandLineList = function () {
    return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 9));
};
/** @param {!Array.<string>} value */
proto.build_event_stream.ActionExecuted.prototype.setCommandLineList = function (value) {
    jspb.Message.setField(this, 9, value || []);
};
/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.build_event_stream.ActionExecuted.prototype.addCommandLine = function (value, opt_index) {
    jspb.Message.addToRepeatedField(this, 9, value, opt_index);
};
proto.build_event_stream.ActionExecuted.prototype.clearCommandLineList = function () {
    this.setCommandLineList([]);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.OutputGroup = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.OutputGroup.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.OutputGroup, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.OutputGroup.displayName = 'proto.build_event_stream.OutputGroup';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.OutputGroup.repeatedFields_ = [3];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.OutputGroup.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.OutputGroup.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.OutputGroup} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.OutputGroup.toObject = function (includeInstance, msg) {
        var f, obj = {
            name: jspb.Message.getFieldWithDefault(msg, 1, ""),
            fileSetsList: jspb.Message.toObjectList(msg.getFileSetsList(), proto.build_event_stream.BuildEventId.NamedSetOfFilesId.toObject, includeInstance)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.OutputGroup}
 */
proto.build_event_stream.OutputGroup.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.OutputGroup;
    return proto.build_event_stream.OutputGroup.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.OutputGroup} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.OutputGroup}
 */
proto.build_event_stream.OutputGroup.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setName(value);
                break;
            case 3:
                var value = new proto.build_event_stream.BuildEventId.NamedSetOfFilesId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.NamedSetOfFilesId.deserializeBinaryFromReader);
                msg.addFileSets(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.OutputGroup.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.OutputGroup.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.OutputGroup} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.OutputGroup.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getName();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getFileSetsList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(3, f, proto.build_event_stream.BuildEventId.NamedSetOfFilesId.serializeBinaryToWriter);
    }
};
/**
 * optional string name = 1;
 * @return {string}
 */
proto.build_event_stream.OutputGroup.prototype.getName = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.OutputGroup.prototype.setName = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * repeated BuildEventId.NamedSetOfFilesId file_sets = 3;
 * @return {!Array.<!proto.build_event_stream.BuildEventId.NamedSetOfFilesId>}
 */
proto.build_event_stream.OutputGroup.prototype.getFileSetsList = function () {
    return /** @type{!Array.<!proto.build_event_stream.BuildEventId.NamedSetOfFilesId>} */ (jspb.Message.getRepeatedWrapperField(this, proto.build_event_stream.BuildEventId.NamedSetOfFilesId, 3));
};
/** @param {!Array.<!proto.build_event_stream.BuildEventId.NamedSetOfFilesId>} value */
proto.build_event_stream.OutputGroup.prototype.setFileSetsList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 3, value);
};
/**
 * @param {!proto.build_event_stream.BuildEventId.NamedSetOfFilesId=} opt_value
 * @param {number=} opt_index
 * @return {!proto.build_event_stream.BuildEventId.NamedSetOfFilesId}
 */
proto.build_event_stream.OutputGroup.prototype.addFileSets = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.build_event_stream.BuildEventId.NamedSetOfFilesId, opt_index);
};
proto.build_event_stream.OutputGroup.prototype.clearFileSetsList = function () {
    this.setFileSetsList([]);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.TargetComplete = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.TargetComplete.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.TargetComplete, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.TargetComplete.displayName = 'proto.build_event_stream.TargetComplete';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.TargetComplete.repeatedFields_ = [2, 4, 3];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.TargetComplete.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.TargetComplete.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.TargetComplete} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.TargetComplete.toObject = function (includeInstance, msg) {
        var f, obj = {
            success: jspb.Message.getFieldWithDefault(msg, 1, false),
            targetKind: jspb.Message.getFieldWithDefault(msg, 5, ""),
            testSize: jspb.Message.getFieldWithDefault(msg, 6, 0),
            outputGroupList: jspb.Message.toObjectList(msg.getOutputGroupList(), proto.build_event_stream.OutputGroup.toObject, includeInstance),
            importantOutputList: jspb.Message.toObjectList(msg.getImportantOutputList(), proto.build_event_stream.File.toObject, includeInstance),
            tagList: jspb.Message.getRepeatedField(msg, 3),
            testTimeoutSeconds: jspb.Message.getFieldWithDefault(msg, 7, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.TargetComplete}
 */
proto.build_event_stream.TargetComplete.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.TargetComplete;
    return proto.build_event_stream.TargetComplete.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.TargetComplete} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.TargetComplete}
 */
proto.build_event_stream.TargetComplete.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {boolean} */ (reader.readBool());
                msg.setSuccess(value);
                break;
            case 5:
                var value = /** @type {string} */ (reader.readString());
                msg.setTargetKind(value);
                break;
            case 6:
                var value = /** @type {!proto.build_event_stream.TestSize} */ (reader.readEnum());
                msg.setTestSize(value);
                break;
            case 2:
                var value = new proto.build_event_stream.OutputGroup;
                reader.readMessage(value, proto.build_event_stream.OutputGroup.deserializeBinaryFromReader);
                msg.addOutputGroup(value);
                break;
            case 4:
                var value = new proto.build_event_stream.File;
                reader.readMessage(value, proto.build_event_stream.File.deserializeBinaryFromReader);
                msg.addImportantOutput(value);
                break;
            case 3:
                var value = /** @type {string} */ (reader.readString());
                msg.addTag(value);
                break;
            case 7:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setTestTimeoutSeconds(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.TargetComplete.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.TargetComplete.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.TargetComplete} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.TargetComplete.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getSuccess();
    if (f) {
        writer.writeBool(1, f);
    }
    f = message.getTargetKind();
    if (f.length > 0) {
        writer.writeString(5, f);
    }
    f = message.getTestSize();
    if (f !== 0.0) {
        writer.writeEnum(6, f);
    }
    f = message.getOutputGroupList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(2, f, proto.build_event_stream.OutputGroup.serializeBinaryToWriter);
    }
    f = message.getImportantOutputList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(4, f, proto.build_event_stream.File.serializeBinaryToWriter);
    }
    f = message.getTagList();
    if (f.length > 0) {
        writer.writeRepeatedString(3, f);
    }
    f = message.getTestTimeoutSeconds();
    if (f !== 0) {
        writer.writeInt64(7, f);
    }
};
/**
 * optional bool success = 1;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.build_event_stream.TargetComplete.prototype.getSuccess = function () {
    return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 1, false));
};
/** @param {boolean} value */
proto.build_event_stream.TargetComplete.prototype.setSuccess = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional string target_kind = 5;
 * @return {string}
 */
proto.build_event_stream.TargetComplete.prototype.getTargetKind = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};
/** @param {string} value */
proto.build_event_stream.TargetComplete.prototype.setTargetKind = function (value) {
    jspb.Message.setField(this, 5, value);
};
/**
 * optional TestSize test_size = 6;
 * @return {!proto.build_event_stream.TestSize}
 */
proto.build_event_stream.TargetComplete.prototype.getTestSize = function () {
    return /** @type {!proto.build_event_stream.TestSize} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};
/** @param {!proto.build_event_stream.TestSize} value */
proto.build_event_stream.TargetComplete.prototype.setTestSize = function (value) {
    jspb.Message.setField(this, 6, value);
};
/**
 * repeated OutputGroup output_group = 2;
 * @return {!Array.<!proto.build_event_stream.OutputGroup>}
 */
proto.build_event_stream.TargetComplete.prototype.getOutputGroupList = function () {
    return /** @type{!Array.<!proto.build_event_stream.OutputGroup>} */ (jspb.Message.getRepeatedWrapperField(this, proto.build_event_stream.OutputGroup, 2));
};
/** @param {!Array.<!proto.build_event_stream.OutputGroup>} value */
proto.build_event_stream.TargetComplete.prototype.setOutputGroupList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 2, value);
};
/**
 * @param {!proto.build_event_stream.OutputGroup=} opt_value
 * @param {number=} opt_index
 * @return {!proto.build_event_stream.OutputGroup}
 */
proto.build_event_stream.TargetComplete.prototype.addOutputGroup = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.build_event_stream.OutputGroup, opt_index);
};
proto.build_event_stream.TargetComplete.prototype.clearOutputGroupList = function () {
    this.setOutputGroupList([]);
};
/**
 * repeated File important_output = 4;
 * @return {!Array.<!proto.build_event_stream.File>}
 */
proto.build_event_stream.TargetComplete.prototype.getImportantOutputList = function () {
    return /** @type{!Array.<!proto.build_event_stream.File>} */ (jspb.Message.getRepeatedWrapperField(this, proto.build_event_stream.File, 4));
};
/** @param {!Array.<!proto.build_event_stream.File>} value */
proto.build_event_stream.TargetComplete.prototype.setImportantOutputList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 4, value);
};
/**
 * @param {!proto.build_event_stream.File=} opt_value
 * @param {number=} opt_index
 * @return {!proto.build_event_stream.File}
 */
proto.build_event_stream.TargetComplete.prototype.addImportantOutput = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.build_event_stream.File, opt_index);
};
proto.build_event_stream.TargetComplete.prototype.clearImportantOutputList = function () {
    this.setImportantOutputList([]);
};
/**
 * repeated string tag = 3;
 * @return {!Array.<string>}
 */
proto.build_event_stream.TargetComplete.prototype.getTagList = function () {
    return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 3));
};
/** @param {!Array.<string>} value */
proto.build_event_stream.TargetComplete.prototype.setTagList = function (value) {
    jspb.Message.setField(this, 3, value || []);
};
/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.build_event_stream.TargetComplete.prototype.addTag = function (value, opt_index) {
    jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};
proto.build_event_stream.TargetComplete.prototype.clearTagList = function () {
    this.setTagList([]);
};
/**
 * optional int64 test_timeout_seconds = 7;
 * @return {number}
 */
proto.build_event_stream.TargetComplete.prototype.getTestTimeoutSeconds = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};
/** @param {number} value */
proto.build_event_stream.TargetComplete.prototype.setTestTimeoutSeconds = function (value) {
    jspb.Message.setField(this, 7, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.TestResult = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.TestResult.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.TestResult, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.TestResult.displayName = 'proto.build_event_stream.TestResult';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.TestResult.repeatedFields_ = [2, 7];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.TestResult.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.TestResult.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.TestResult} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.TestResult.toObject = function (includeInstance, msg) {
        var f, obj = {
            status: jspb.Message.getFieldWithDefault(msg, 5, 0),
            statusDetails: jspb.Message.getFieldWithDefault(msg, 9, ""),
            cachedLocally: jspb.Message.getFieldWithDefault(msg, 4, false),
            testAttemptStartMillisEpoch: jspb.Message.getFieldWithDefault(msg, 6, 0),
            testAttemptDurationMillis: jspb.Message.getFieldWithDefault(msg, 3, 0),
            testActionOutputList: jspb.Message.toObjectList(msg.getTestActionOutputList(), proto.build_event_stream.File.toObject, includeInstance),
            warningList: jspb.Message.getRepeatedField(msg, 7),
            executionInfo: (f = msg.getExecutionInfo()) && proto.build_event_stream.TestResult.ExecutionInfo.toObject(includeInstance, f)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.TestResult}
 */
proto.build_event_stream.TestResult.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.TestResult;
    return proto.build_event_stream.TestResult.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.TestResult} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.TestResult}
 */
proto.build_event_stream.TestResult.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 5:
                var value = /** @type {!proto.build_event_stream.TestStatus} */ (reader.readEnum());
                msg.setStatus(value);
                break;
            case 9:
                var value = /** @type {string} */ (reader.readString());
                msg.setStatusDetails(value);
                break;
            case 4:
                var value = /** @type {boolean} */ (reader.readBool());
                msg.setCachedLocally(value);
                break;
            case 6:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setTestAttemptStartMillisEpoch(value);
                break;
            case 3:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setTestAttemptDurationMillis(value);
                break;
            case 2:
                var value = new proto.build_event_stream.File;
                reader.readMessage(value, proto.build_event_stream.File.deserializeBinaryFromReader);
                msg.addTestActionOutput(value);
                break;
            case 7:
                var value = /** @type {string} */ (reader.readString());
                msg.addWarning(value);
                break;
            case 8:
                var value = new proto.build_event_stream.TestResult.ExecutionInfo;
                reader.readMessage(value, proto.build_event_stream.TestResult.ExecutionInfo.deserializeBinaryFromReader);
                msg.setExecutionInfo(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.TestResult.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.TestResult.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.TestResult} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.TestResult.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getStatus();
    if (f !== 0.0) {
        writer.writeEnum(5, f);
    }
    f = message.getStatusDetails();
    if (f.length > 0) {
        writer.writeString(9, f);
    }
    f = message.getCachedLocally();
    if (f) {
        writer.writeBool(4, f);
    }
    f = message.getTestAttemptStartMillisEpoch();
    if (f !== 0) {
        writer.writeInt64(6, f);
    }
    f = message.getTestAttemptDurationMillis();
    if (f !== 0) {
        writer.writeInt64(3, f);
    }
    f = message.getTestActionOutputList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(2, f, proto.build_event_stream.File.serializeBinaryToWriter);
    }
    f = message.getWarningList();
    if (f.length > 0) {
        writer.writeRepeatedString(7, f);
    }
    f = message.getExecutionInfo();
    if (f != null) {
        writer.writeMessage(8, f, proto.build_event_stream.TestResult.ExecutionInfo.serializeBinaryToWriter);
    }
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.TestResult.ExecutionInfo = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.TestResult.ExecutionInfo.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.TestResult.ExecutionInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.TestResult.ExecutionInfo.displayName = 'proto.build_event_stream.TestResult.ExecutionInfo';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.TestResult.ExecutionInfo.repeatedFields_ = [5];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.TestResult.ExecutionInfo.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.TestResult.ExecutionInfo.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.TestResult.ExecutionInfo} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.TestResult.ExecutionInfo.toObject = function (includeInstance, msg) {
        var f, obj = {
            timeoutSeconds: jspb.Message.getFieldWithDefault(msg, 1, 0),
            strategy: jspb.Message.getFieldWithDefault(msg, 2, ""),
            cachedRemotely: jspb.Message.getFieldWithDefault(msg, 6, false),
            exitCode: jspb.Message.getFieldWithDefault(msg, 7, 0),
            hostname: jspb.Message.getFieldWithDefault(msg, 3, ""),
            timingBreakdown: (f = msg.getTimingBreakdown()) && proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.toObject(includeInstance, f),
            resourceUsageList: jspb.Message.toObjectList(msg.getResourceUsageList(), proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.toObject, includeInstance)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.TestResult.ExecutionInfo}
 */
proto.build_event_stream.TestResult.ExecutionInfo.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.TestResult.ExecutionInfo;
    return proto.build_event_stream.TestResult.ExecutionInfo.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.TestResult.ExecutionInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.TestResult.ExecutionInfo}
 */
proto.build_event_stream.TestResult.ExecutionInfo.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {number} */ (reader.readInt32());
                msg.setTimeoutSeconds(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setStrategy(value);
                break;
            case 6:
                var value = /** @type {boolean} */ (reader.readBool());
                msg.setCachedRemotely(value);
                break;
            case 7:
                var value = /** @type {number} */ (reader.readInt32());
                msg.setExitCode(value);
                break;
            case 3:
                var value = /** @type {string} */ (reader.readString());
                msg.setHostname(value);
                break;
            case 4:
                var value = new proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown;
                reader.readMessage(value, proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.deserializeBinaryFromReader);
                msg.setTimingBreakdown(value);
                break;
            case 5:
                var value = new proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage;
                reader.readMessage(value, proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.deserializeBinaryFromReader);
                msg.addResourceUsage(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.TestResult.ExecutionInfo.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.TestResult.ExecutionInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.TestResult.ExecutionInfo.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getTimeoutSeconds();
    if (f !== 0) {
        writer.writeInt32(1, f);
    }
    f = message.getStrategy();
    if (f.length > 0) {
        writer.writeString(2, f);
    }
    f = message.getCachedRemotely();
    if (f) {
        writer.writeBool(6, f);
    }
    f = message.getExitCode();
    if (f !== 0) {
        writer.writeInt32(7, f);
    }
    f = message.getHostname();
    if (f.length > 0) {
        writer.writeString(3, f);
    }
    f = message.getTimingBreakdown();
    if (f != null) {
        writer.writeMessage(4, f, proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.serializeBinaryToWriter);
    }
    f = message.getResourceUsageList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(5, f, proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.serializeBinaryToWriter);
    }
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.displayName = 'proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.repeatedFields_ = [1];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.toObject = function (includeInstance, msg) {
        var f, obj = {
            childList: jspb.Message.toObjectList(msg.getChildList(), proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.toObject, includeInstance),
            name: jspb.Message.getFieldWithDefault(msg, 2, ""),
            timeMillis: jspb.Message.getFieldWithDefault(msg, 3, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown}
 */
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown;
    return proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown}
 */
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown;
                reader.readMessage(value, proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.deserializeBinaryFromReader);
                msg.addChild(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setName(value);
                break;
            case 3:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setTimeMillis(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getChildList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(1, f, proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.serializeBinaryToWriter);
    }
    f = message.getName();
    if (f.length > 0) {
        writer.writeString(2, f);
    }
    f = message.getTimeMillis();
    if (f !== 0) {
        writer.writeInt64(3, f);
    }
};
/**
 * repeated TimingBreakdown child = 1;
 * @return {!Array.<!proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown>}
 */
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.prototype.getChildList = function () {
    return /** @type{!Array.<!proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown>} */ (jspb.Message.getRepeatedWrapperField(this, proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown, 1));
};
/** @param {!Array.<!proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown>} value */
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.prototype.setChildList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 1, value);
};
/**
 * @param {!proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown=} opt_value
 * @param {number=} opt_index
 * @return {!proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown}
 */
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.prototype.addChild = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown, opt_index);
};
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.prototype.clearChildList = function () {
    this.setChildList([]);
};
/**
 * optional string name = 2;
 * @return {string}
 */
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.prototype.getName = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};
/** @param {string} value */
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.prototype.setName = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * optional int64 time_millis = 3;
 * @return {number}
 */
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.prototype.getTimeMillis = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};
/** @param {number} value */
proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown.prototype.setTimeMillis = function (value) {
    jspb.Message.setField(this, 3, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.displayName = 'proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.toObject = function (includeInstance, msg) {
        var f, obj = {
            name: jspb.Message.getFieldWithDefault(msg, 1, ""),
            value: jspb.Message.getFieldWithDefault(msg, 2, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage}
 */
proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage;
    return proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage}
 */
proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setName(value);
                break;
            case 2:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setValue(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getName();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getValue();
    if (f !== 0) {
        writer.writeInt64(2, f);
    }
};
/**
 * optional string name = 1;
 * @return {string}
 */
proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.prototype.getName = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.prototype.setName = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional int64 value = 2;
 * @return {number}
 */
proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.prototype.getValue = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};
/** @param {number} value */
proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage.prototype.setValue = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * optional int32 timeout_seconds = 1;
 * @return {number}
 */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.getTimeoutSeconds = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};
/** @param {number} value */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.setTimeoutSeconds = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional string strategy = 2;
 * @return {string}
 */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.getStrategy = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};
/** @param {string} value */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.setStrategy = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * optional bool cached_remotely = 6;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.getCachedRemotely = function () {
    return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 6, false));
};
/** @param {boolean} value */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.setCachedRemotely = function (value) {
    jspb.Message.setField(this, 6, value);
};
/**
 * optional int32 exit_code = 7;
 * @return {number}
 */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.getExitCode = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};
/** @param {number} value */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.setExitCode = function (value) {
    jspb.Message.setField(this, 7, value);
};
/**
 * optional string hostname = 3;
 * @return {string}
 */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.getHostname = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};
/** @param {string} value */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.setHostname = function (value) {
    jspb.Message.setField(this, 3, value);
};
/**
 * optional TimingBreakdown timing_breakdown = 4;
 * @return {?proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown}
 */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.getTimingBreakdown = function () {
    return /** @type{?proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown, 4));
};
/** @param {?proto.build_event_stream.TestResult.ExecutionInfo.TimingBreakdown|undefined} value */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.setTimingBreakdown = function (value) {
    jspb.Message.setWrapperField(this, 4, value);
};
proto.build_event_stream.TestResult.ExecutionInfo.prototype.clearTimingBreakdown = function () {
    this.setTimingBreakdown(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.hasTimingBreakdown = function () {
    return jspb.Message.getField(this, 4) != null;
};
/**
 * repeated ResourceUsage resource_usage = 5;
 * @return {!Array.<!proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage>}
 */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.getResourceUsageList = function () {
    return /** @type{!Array.<!proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage>} */ (jspb.Message.getRepeatedWrapperField(this, proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage, 5));
};
/** @param {!Array.<!proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage>} value */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.setResourceUsageList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 5, value);
};
/**
 * @param {!proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage=} opt_value
 * @param {number=} opt_index
 * @return {!proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage}
 */
proto.build_event_stream.TestResult.ExecutionInfo.prototype.addResourceUsage = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.build_event_stream.TestResult.ExecutionInfo.ResourceUsage, opt_index);
};
proto.build_event_stream.TestResult.ExecutionInfo.prototype.clearResourceUsageList = function () {
    this.setResourceUsageList([]);
};
/**
 * optional TestStatus status = 5;
 * @return {!proto.build_event_stream.TestStatus}
 */
proto.build_event_stream.TestResult.prototype.getStatus = function () {
    return /** @type {!proto.build_event_stream.TestStatus} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};
/** @param {!proto.build_event_stream.TestStatus} value */
proto.build_event_stream.TestResult.prototype.setStatus = function (value) {
    jspb.Message.setField(this, 5, value);
};
/**
 * optional string status_details = 9;
 * @return {string}
 */
proto.build_event_stream.TestResult.prototype.getStatusDetails = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};
/** @param {string} value */
proto.build_event_stream.TestResult.prototype.setStatusDetails = function (value) {
    jspb.Message.setField(this, 9, value);
};
/**
 * optional bool cached_locally = 4;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.build_event_stream.TestResult.prototype.getCachedLocally = function () {
    return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 4, false));
};
/** @param {boolean} value */
proto.build_event_stream.TestResult.prototype.setCachedLocally = function (value) {
    jspb.Message.setField(this, 4, value);
};
/**
 * optional int64 test_attempt_start_millis_epoch = 6;
 * @return {number}
 */
proto.build_event_stream.TestResult.prototype.getTestAttemptStartMillisEpoch = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};
/** @param {number} value */
proto.build_event_stream.TestResult.prototype.setTestAttemptStartMillisEpoch = function (value) {
    jspb.Message.setField(this, 6, value);
};
/**
 * optional int64 test_attempt_duration_millis = 3;
 * @return {number}
 */
proto.build_event_stream.TestResult.prototype.getTestAttemptDurationMillis = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};
/** @param {number} value */
proto.build_event_stream.TestResult.prototype.setTestAttemptDurationMillis = function (value) {
    jspb.Message.setField(this, 3, value);
};
/**
 * repeated File test_action_output = 2;
 * @return {!Array.<!proto.build_event_stream.File>}
 */
proto.build_event_stream.TestResult.prototype.getTestActionOutputList = function () {
    return /** @type{!Array.<!proto.build_event_stream.File>} */ (jspb.Message.getRepeatedWrapperField(this, proto.build_event_stream.File, 2));
};
/** @param {!Array.<!proto.build_event_stream.File>} value */
proto.build_event_stream.TestResult.prototype.setTestActionOutputList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 2, value);
};
/**
 * @param {!proto.build_event_stream.File=} opt_value
 * @param {number=} opt_index
 * @return {!proto.build_event_stream.File}
 */
proto.build_event_stream.TestResult.prototype.addTestActionOutput = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.build_event_stream.File, opt_index);
};
proto.build_event_stream.TestResult.prototype.clearTestActionOutputList = function () {
    this.setTestActionOutputList([]);
};
/**
 * repeated string warning = 7;
 * @return {!Array.<string>}
 */
proto.build_event_stream.TestResult.prototype.getWarningList = function () {
    return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 7));
};
/** @param {!Array.<string>} value */
proto.build_event_stream.TestResult.prototype.setWarningList = function (value) {
    jspb.Message.setField(this, 7, value || []);
};
/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.build_event_stream.TestResult.prototype.addWarning = function (value, opt_index) {
    jspb.Message.addToRepeatedField(this, 7, value, opt_index);
};
proto.build_event_stream.TestResult.prototype.clearWarningList = function () {
    this.setWarningList([]);
};
/**
 * optional ExecutionInfo execution_info = 8;
 * @return {?proto.build_event_stream.TestResult.ExecutionInfo}
 */
proto.build_event_stream.TestResult.prototype.getExecutionInfo = function () {
    return /** @type{?proto.build_event_stream.TestResult.ExecutionInfo} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.TestResult.ExecutionInfo, 8));
};
/** @param {?proto.build_event_stream.TestResult.ExecutionInfo|undefined} value */
proto.build_event_stream.TestResult.prototype.setExecutionInfo = function (value) {
    jspb.Message.setWrapperField(this, 8, value);
};
proto.build_event_stream.TestResult.prototype.clearExecutionInfo = function () {
    this.setExecutionInfo(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.TestResult.prototype.hasExecutionInfo = function () {
    return jspb.Message.getField(this, 8) != null;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.TestSummary = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.TestSummary.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.TestSummary, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.TestSummary.displayName = 'proto.build_event_stream.TestSummary';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.TestSummary.repeatedFields_ = [3, 4];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.TestSummary.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.TestSummary.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.TestSummary} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.TestSummary.toObject = function (includeInstance, msg) {
        var f, obj = {
            overallStatus: jspb.Message.getFieldWithDefault(msg, 5, 0),
            totalRunCount: jspb.Message.getFieldWithDefault(msg, 1, 0),
            passedList: jspb.Message.toObjectList(msg.getPassedList(), proto.build_event_stream.File.toObject, includeInstance),
            failedList: jspb.Message.toObjectList(msg.getFailedList(), proto.build_event_stream.File.toObject, includeInstance),
            totalNumCached: jspb.Message.getFieldWithDefault(msg, 6, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.TestSummary}
 */
proto.build_event_stream.TestSummary.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.TestSummary;
    return proto.build_event_stream.TestSummary.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.TestSummary} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.TestSummary}
 */
proto.build_event_stream.TestSummary.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 5:
                var value = /** @type {!proto.build_event_stream.TestStatus} */ (reader.readEnum());
                msg.setOverallStatus(value);
                break;
            case 1:
                var value = /** @type {number} */ (reader.readInt32());
                msg.setTotalRunCount(value);
                break;
            case 3:
                var value = new proto.build_event_stream.File;
                reader.readMessage(value, proto.build_event_stream.File.deserializeBinaryFromReader);
                msg.addPassed(value);
                break;
            case 4:
                var value = new proto.build_event_stream.File;
                reader.readMessage(value, proto.build_event_stream.File.deserializeBinaryFromReader);
                msg.addFailed(value);
                break;
            case 6:
                var value = /** @type {number} */ (reader.readInt32());
                msg.setTotalNumCached(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.TestSummary.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.TestSummary.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.TestSummary} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.TestSummary.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getOverallStatus();
    if (f !== 0.0) {
        writer.writeEnum(5, f);
    }
    f = message.getTotalRunCount();
    if (f !== 0) {
        writer.writeInt32(1, f);
    }
    f = message.getPassedList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(3, f, proto.build_event_stream.File.serializeBinaryToWriter);
    }
    f = message.getFailedList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(4, f, proto.build_event_stream.File.serializeBinaryToWriter);
    }
    f = message.getTotalNumCached();
    if (f !== 0) {
        writer.writeInt32(6, f);
    }
};
/**
 * optional TestStatus overall_status = 5;
 * @return {!proto.build_event_stream.TestStatus}
 */
proto.build_event_stream.TestSummary.prototype.getOverallStatus = function () {
    return /** @type {!proto.build_event_stream.TestStatus} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};
/** @param {!proto.build_event_stream.TestStatus} value */
proto.build_event_stream.TestSummary.prototype.setOverallStatus = function (value) {
    jspb.Message.setField(this, 5, value);
};
/**
 * optional int32 total_run_count = 1;
 * @return {number}
 */
proto.build_event_stream.TestSummary.prototype.getTotalRunCount = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};
/** @param {number} value */
proto.build_event_stream.TestSummary.prototype.setTotalRunCount = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * repeated File passed = 3;
 * @return {!Array.<!proto.build_event_stream.File>}
 */
proto.build_event_stream.TestSummary.prototype.getPassedList = function () {
    return /** @type{!Array.<!proto.build_event_stream.File>} */ (jspb.Message.getRepeatedWrapperField(this, proto.build_event_stream.File, 3));
};
/** @param {!Array.<!proto.build_event_stream.File>} value */
proto.build_event_stream.TestSummary.prototype.setPassedList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 3, value);
};
/**
 * @param {!proto.build_event_stream.File=} opt_value
 * @param {number=} opt_index
 * @return {!proto.build_event_stream.File}
 */
proto.build_event_stream.TestSummary.prototype.addPassed = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.build_event_stream.File, opt_index);
};
proto.build_event_stream.TestSummary.prototype.clearPassedList = function () {
    this.setPassedList([]);
};
/**
 * repeated File failed = 4;
 * @return {!Array.<!proto.build_event_stream.File>}
 */
proto.build_event_stream.TestSummary.prototype.getFailedList = function () {
    return /** @type{!Array.<!proto.build_event_stream.File>} */ (jspb.Message.getRepeatedWrapperField(this, proto.build_event_stream.File, 4));
};
/** @param {!Array.<!proto.build_event_stream.File>} value */
proto.build_event_stream.TestSummary.prototype.setFailedList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 4, value);
};
/**
 * @param {!proto.build_event_stream.File=} opt_value
 * @param {number=} opt_index
 * @return {!proto.build_event_stream.File}
 */
proto.build_event_stream.TestSummary.prototype.addFailed = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.build_event_stream.File, opt_index);
};
proto.build_event_stream.TestSummary.prototype.clearFailedList = function () {
    this.setFailedList([]);
};
/**
 * optional int32 total_num_cached = 6;
 * @return {number}
 */
proto.build_event_stream.TestSummary.prototype.getTotalNumCached = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};
/** @param {number} value */
proto.build_event_stream.TestSummary.prototype.setTotalNumCached = function (value) {
    jspb.Message.setField(this, 6, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildFinished = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildFinished, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildFinished.displayName = 'proto.build_event_stream.BuildFinished';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildFinished.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildFinished.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildFinished} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildFinished.toObject = function (includeInstance, msg) {
        var f, obj = {
            overallSuccess: jspb.Message.getFieldWithDefault(msg, 1, false),
            exitCode: (f = msg.getExitCode()) && proto.build_event_stream.BuildFinished.ExitCode.toObject(includeInstance, f),
            finishTimeMillis: jspb.Message.getFieldWithDefault(msg, 2, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildFinished}
 */
proto.build_event_stream.BuildFinished.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildFinished;
    return proto.build_event_stream.BuildFinished.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildFinished} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildFinished}
 */
proto.build_event_stream.BuildFinished.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {boolean} */ (reader.readBool());
                msg.setOverallSuccess(value);
                break;
            case 3:
                var value = new proto.build_event_stream.BuildFinished.ExitCode;
                reader.readMessage(value, proto.build_event_stream.BuildFinished.ExitCode.deserializeBinaryFromReader);
                msg.setExitCode(value);
                break;
            case 2:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setFinishTimeMillis(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildFinished.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildFinished.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildFinished} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildFinished.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getOverallSuccess();
    if (f) {
        writer.writeBool(1, f);
    }
    f = message.getExitCode();
    if (f != null) {
        writer.writeMessage(3, f, proto.build_event_stream.BuildFinished.ExitCode.serializeBinaryToWriter);
    }
    f = message.getFinishTimeMillis();
    if (f !== 0) {
        writer.writeInt64(2, f);
    }
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildFinished.ExitCode = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildFinished.ExitCode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildFinished.ExitCode.displayName = 'proto.build_event_stream.BuildFinished.ExitCode';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildFinished.ExitCode.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildFinished.ExitCode.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildFinished.ExitCode} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildFinished.ExitCode.toObject = function (includeInstance, msg) {
        var f, obj = {
            name: jspb.Message.getFieldWithDefault(msg, 1, ""),
            code: jspb.Message.getFieldWithDefault(msg, 2, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildFinished.ExitCode}
 */
proto.build_event_stream.BuildFinished.ExitCode.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildFinished.ExitCode;
    return proto.build_event_stream.BuildFinished.ExitCode.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildFinished.ExitCode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildFinished.ExitCode}
 */
proto.build_event_stream.BuildFinished.ExitCode.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setName(value);
                break;
            case 2:
                var value = /** @type {number} */ (reader.readInt32());
                msg.setCode(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildFinished.ExitCode.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildFinished.ExitCode.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildFinished.ExitCode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildFinished.ExitCode.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getName();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getCode();
    if (f !== 0) {
        writer.writeInt32(2, f);
    }
};
/**
 * optional string name = 1;
 * @return {string}
 */
proto.build_event_stream.BuildFinished.ExitCode.prototype.getName = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/** @param {string} value */
proto.build_event_stream.BuildFinished.ExitCode.prototype.setName = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional int32 code = 2;
 * @return {number}
 */
proto.build_event_stream.BuildFinished.ExitCode.prototype.getCode = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildFinished.ExitCode.prototype.setCode = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * optional bool overall_success = 1;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.build_event_stream.BuildFinished.prototype.getOverallSuccess = function () {
    return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 1, false));
};
/** @param {boolean} value */
proto.build_event_stream.BuildFinished.prototype.setOverallSuccess = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional ExitCode exit_code = 3;
 * @return {?proto.build_event_stream.BuildFinished.ExitCode}
 */
proto.build_event_stream.BuildFinished.prototype.getExitCode = function () {
    return /** @type{?proto.build_event_stream.BuildFinished.ExitCode} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildFinished.ExitCode, 3));
};
/** @param {?proto.build_event_stream.BuildFinished.ExitCode|undefined} value */
proto.build_event_stream.BuildFinished.prototype.setExitCode = function (value) {
    jspb.Message.setWrapperField(this, 3, value);
};
proto.build_event_stream.BuildFinished.prototype.clearExitCode = function () {
    this.setExitCode(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildFinished.prototype.hasExitCode = function () {
    return jspb.Message.getField(this, 3) != null;
};
/**
 * optional int64 finish_time_millis = 2;
 * @return {number}
 */
proto.build_event_stream.BuildFinished.prototype.getFinishTimeMillis = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildFinished.prototype.setFinishTimeMillis = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildMetrics = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildMetrics, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildMetrics.displayName = 'proto.build_event_stream.BuildMetrics';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildMetrics.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildMetrics.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildMetrics} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildMetrics.toObject = function (includeInstance, msg) {
        var f, obj = {
            actionSummary: (f = msg.getActionSummary()) && proto.build_event_stream.BuildMetrics.ActionSummary.toObject(includeInstance, f),
            memoryMetrics: (f = msg.getMemoryMetrics()) && proto.build_event_stream.BuildMetrics.MemoryMetrics.toObject(includeInstance, f),
            targetMetrics: (f = msg.getTargetMetrics()) && proto.build_event_stream.BuildMetrics.TargetMetrics.toObject(includeInstance, f),
            packageMetrics: (f = msg.getPackageMetrics()) && proto.build_event_stream.BuildMetrics.PackageMetrics.toObject(includeInstance, f)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildMetrics}
 */
proto.build_event_stream.BuildMetrics.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildMetrics;
    return proto.build_event_stream.BuildMetrics.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildMetrics} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildMetrics}
 */
proto.build_event_stream.BuildMetrics.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new proto.build_event_stream.BuildMetrics.ActionSummary;
                reader.readMessage(value, proto.build_event_stream.BuildMetrics.ActionSummary.deserializeBinaryFromReader);
                msg.setActionSummary(value);
                break;
            case 2:
                var value = new proto.build_event_stream.BuildMetrics.MemoryMetrics;
                reader.readMessage(value, proto.build_event_stream.BuildMetrics.MemoryMetrics.deserializeBinaryFromReader);
                msg.setMemoryMetrics(value);
                break;
            case 3:
                var value = new proto.build_event_stream.BuildMetrics.TargetMetrics;
                reader.readMessage(value, proto.build_event_stream.BuildMetrics.TargetMetrics.deserializeBinaryFromReader);
                msg.setTargetMetrics(value);
                break;
            case 4:
                var value = new proto.build_event_stream.BuildMetrics.PackageMetrics;
                reader.readMessage(value, proto.build_event_stream.BuildMetrics.PackageMetrics.deserializeBinaryFromReader);
                msg.setPackageMetrics(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildMetrics.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildMetrics.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildMetrics} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildMetrics.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getActionSummary();
    if (f != null) {
        writer.writeMessage(1, f, proto.build_event_stream.BuildMetrics.ActionSummary.serializeBinaryToWriter);
    }
    f = message.getMemoryMetrics();
    if (f != null) {
        writer.writeMessage(2, f, proto.build_event_stream.BuildMetrics.MemoryMetrics.serializeBinaryToWriter);
    }
    f = message.getTargetMetrics();
    if (f != null) {
        writer.writeMessage(3, f, proto.build_event_stream.BuildMetrics.TargetMetrics.serializeBinaryToWriter);
    }
    f = message.getPackageMetrics();
    if (f != null) {
        writer.writeMessage(4, f, proto.build_event_stream.BuildMetrics.PackageMetrics.serializeBinaryToWriter);
    }
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildMetrics.ActionSummary = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildMetrics.ActionSummary, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildMetrics.ActionSummary.displayName = 'proto.build_event_stream.BuildMetrics.ActionSummary';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildMetrics.ActionSummary.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildMetrics.ActionSummary.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildMetrics.ActionSummary} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildMetrics.ActionSummary.toObject = function (includeInstance, msg) {
        var f, obj = {
            actionsCreated: jspb.Message.getFieldWithDefault(msg, 1, 0),
            actionsExecuted: jspb.Message.getFieldWithDefault(msg, 2, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildMetrics.ActionSummary}
 */
proto.build_event_stream.BuildMetrics.ActionSummary.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildMetrics.ActionSummary;
    return proto.build_event_stream.BuildMetrics.ActionSummary.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildMetrics.ActionSummary} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildMetrics.ActionSummary}
 */
proto.build_event_stream.BuildMetrics.ActionSummary.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setActionsCreated(value);
                break;
            case 2:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setActionsExecuted(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildMetrics.ActionSummary.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildMetrics.ActionSummary.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildMetrics.ActionSummary} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildMetrics.ActionSummary.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getActionsCreated();
    if (f !== 0) {
        writer.writeInt64(1, f);
    }
    f = message.getActionsExecuted();
    if (f !== 0) {
        writer.writeInt64(2, f);
    }
};
/**
 * optional int64 actions_created = 1;
 * @return {number}
 */
proto.build_event_stream.BuildMetrics.ActionSummary.prototype.getActionsCreated = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildMetrics.ActionSummary.prototype.setActionsCreated = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional int64 actions_executed = 2;
 * @return {number}
 */
proto.build_event_stream.BuildMetrics.ActionSummary.prototype.getActionsExecuted = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildMetrics.ActionSummary.prototype.setActionsExecuted = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildMetrics.MemoryMetrics = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildMetrics.MemoryMetrics, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildMetrics.MemoryMetrics.displayName = 'proto.build_event_stream.BuildMetrics.MemoryMetrics';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildMetrics.MemoryMetrics.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildMetrics.MemoryMetrics.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildMetrics.MemoryMetrics} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildMetrics.MemoryMetrics.toObject = function (includeInstance, msg) {
        var f, obj = {
            usedHeapSizePostBuild: jspb.Message.getFieldWithDefault(msg, 1, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildMetrics.MemoryMetrics}
 */
proto.build_event_stream.BuildMetrics.MemoryMetrics.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildMetrics.MemoryMetrics;
    return proto.build_event_stream.BuildMetrics.MemoryMetrics.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildMetrics.MemoryMetrics} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildMetrics.MemoryMetrics}
 */
proto.build_event_stream.BuildMetrics.MemoryMetrics.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setUsedHeapSizePostBuild(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildMetrics.MemoryMetrics.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildMetrics.MemoryMetrics.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildMetrics.MemoryMetrics} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildMetrics.MemoryMetrics.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getUsedHeapSizePostBuild();
    if (f !== 0) {
        writer.writeInt64(1, f);
    }
};
/**
 * optional int64 used_heap_size_post_build = 1;
 * @return {number}
 */
proto.build_event_stream.BuildMetrics.MemoryMetrics.prototype.getUsedHeapSizePostBuild = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildMetrics.MemoryMetrics.prototype.setUsedHeapSizePostBuild = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildMetrics.TargetMetrics = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildMetrics.TargetMetrics, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildMetrics.TargetMetrics.displayName = 'proto.build_event_stream.BuildMetrics.TargetMetrics';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildMetrics.TargetMetrics.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildMetrics.TargetMetrics.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildMetrics.TargetMetrics} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildMetrics.TargetMetrics.toObject = function (includeInstance, msg) {
        var f, obj = {
            targetsLoaded: jspb.Message.getFieldWithDefault(msg, 1, 0),
            targetsConfigured: jspb.Message.getFieldWithDefault(msg, 2, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildMetrics.TargetMetrics}
 */
proto.build_event_stream.BuildMetrics.TargetMetrics.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildMetrics.TargetMetrics;
    return proto.build_event_stream.BuildMetrics.TargetMetrics.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildMetrics.TargetMetrics} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildMetrics.TargetMetrics}
 */
proto.build_event_stream.BuildMetrics.TargetMetrics.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setTargetsLoaded(value);
                break;
            case 2:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setTargetsConfigured(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildMetrics.TargetMetrics.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildMetrics.TargetMetrics.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildMetrics.TargetMetrics} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildMetrics.TargetMetrics.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getTargetsLoaded();
    if (f !== 0) {
        writer.writeInt64(1, f);
    }
    f = message.getTargetsConfigured();
    if (f !== 0) {
        writer.writeInt64(2, f);
    }
};
/**
 * optional int64 targets_loaded = 1;
 * @return {number}
 */
proto.build_event_stream.BuildMetrics.TargetMetrics.prototype.getTargetsLoaded = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildMetrics.TargetMetrics.prototype.setTargetsLoaded = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional int64 targets_configured = 2;
 * @return {number}
 */
proto.build_event_stream.BuildMetrics.TargetMetrics.prototype.getTargetsConfigured = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildMetrics.TargetMetrics.prototype.setTargetsConfigured = function (value) {
    jspb.Message.setField(this, 2, value);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildMetrics.PackageMetrics = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.build_event_stream.BuildMetrics.PackageMetrics, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildMetrics.PackageMetrics.displayName = 'proto.build_event_stream.BuildMetrics.PackageMetrics';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildMetrics.PackageMetrics.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildMetrics.PackageMetrics.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildMetrics.PackageMetrics} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildMetrics.PackageMetrics.toObject = function (includeInstance, msg) {
        var f, obj = {
            packagesLoaded: jspb.Message.getFieldWithDefault(msg, 1, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildMetrics.PackageMetrics}
 */
proto.build_event_stream.BuildMetrics.PackageMetrics.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildMetrics.PackageMetrics;
    return proto.build_event_stream.BuildMetrics.PackageMetrics.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildMetrics.PackageMetrics} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildMetrics.PackageMetrics}
 */
proto.build_event_stream.BuildMetrics.PackageMetrics.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {number} */ (reader.readInt64());
                msg.setPackagesLoaded(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildMetrics.PackageMetrics.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildMetrics.PackageMetrics.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildMetrics.PackageMetrics} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildMetrics.PackageMetrics.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getPackagesLoaded();
    if (f !== 0) {
        writer.writeInt64(1, f);
    }
};
/**
 * optional int64 packages_loaded = 1;
 * @return {number}
 */
proto.build_event_stream.BuildMetrics.PackageMetrics.prototype.getPackagesLoaded = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};
/** @param {number} value */
proto.build_event_stream.BuildMetrics.PackageMetrics.prototype.setPackagesLoaded = function (value) {
    jspb.Message.setField(this, 1, value);
};
/**
 * optional ActionSummary action_summary = 1;
 * @return {?proto.build_event_stream.BuildMetrics.ActionSummary}
 */
proto.build_event_stream.BuildMetrics.prototype.getActionSummary = function () {
    return /** @type{?proto.build_event_stream.BuildMetrics.ActionSummary} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildMetrics.ActionSummary, 1));
};
/** @param {?proto.build_event_stream.BuildMetrics.ActionSummary|undefined} value */
proto.build_event_stream.BuildMetrics.prototype.setActionSummary = function (value) {
    jspb.Message.setWrapperField(this, 1, value);
};
proto.build_event_stream.BuildMetrics.prototype.clearActionSummary = function () {
    this.setActionSummary(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildMetrics.prototype.hasActionSummary = function () {
    return jspb.Message.getField(this, 1) != null;
};
/**
 * optional MemoryMetrics memory_metrics = 2;
 * @return {?proto.build_event_stream.BuildMetrics.MemoryMetrics}
 */
proto.build_event_stream.BuildMetrics.prototype.getMemoryMetrics = function () {
    return /** @type{?proto.build_event_stream.BuildMetrics.MemoryMetrics} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildMetrics.MemoryMetrics, 2));
};
/** @param {?proto.build_event_stream.BuildMetrics.MemoryMetrics|undefined} value */
proto.build_event_stream.BuildMetrics.prototype.setMemoryMetrics = function (value) {
    jspb.Message.setWrapperField(this, 2, value);
};
proto.build_event_stream.BuildMetrics.prototype.clearMemoryMetrics = function () {
    this.setMemoryMetrics(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildMetrics.prototype.hasMemoryMetrics = function () {
    return jspb.Message.getField(this, 2) != null;
};
/**
 * optional TargetMetrics target_metrics = 3;
 * @return {?proto.build_event_stream.BuildMetrics.TargetMetrics}
 */
proto.build_event_stream.BuildMetrics.prototype.getTargetMetrics = function () {
    return /** @type{?proto.build_event_stream.BuildMetrics.TargetMetrics} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildMetrics.TargetMetrics, 3));
};
/** @param {?proto.build_event_stream.BuildMetrics.TargetMetrics|undefined} value */
proto.build_event_stream.BuildMetrics.prototype.setTargetMetrics = function (value) {
    jspb.Message.setWrapperField(this, 3, value);
};
proto.build_event_stream.BuildMetrics.prototype.clearTargetMetrics = function () {
    this.setTargetMetrics(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildMetrics.prototype.hasTargetMetrics = function () {
    return jspb.Message.getField(this, 3) != null;
};
/**
 * optional PackageMetrics package_metrics = 4;
 * @return {?proto.build_event_stream.BuildMetrics.PackageMetrics}
 */
proto.build_event_stream.BuildMetrics.prototype.getPackageMetrics = function () {
    return /** @type{?proto.build_event_stream.BuildMetrics.PackageMetrics} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildMetrics.PackageMetrics, 4));
};
/** @param {?proto.build_event_stream.BuildMetrics.PackageMetrics|undefined} value */
proto.build_event_stream.BuildMetrics.prototype.setPackageMetrics = function (value) {
    jspb.Message.setWrapperField(this, 4, value);
};
proto.build_event_stream.BuildMetrics.prototype.clearPackageMetrics = function () {
    this.setPackageMetrics(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildMetrics.prototype.hasPackageMetrics = function () {
    return jspb.Message.getField(this, 4) != null;
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildToolLogs = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.BuildToolLogs.repeatedFields_, null);
};
goog.inherits(proto.build_event_stream.BuildToolLogs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildToolLogs.displayName = 'proto.build_event_stream.BuildToolLogs';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.BuildToolLogs.repeatedFields_ = [1];
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildToolLogs.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildToolLogs.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildToolLogs} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildToolLogs.toObject = function (includeInstance, msg) {
        var f, obj = {
            logList: jspb.Message.toObjectList(msg.getLogList(), proto.build_event_stream.File.toObject, includeInstance)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildToolLogs}
 */
proto.build_event_stream.BuildToolLogs.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildToolLogs;
    return proto.build_event_stream.BuildToolLogs.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildToolLogs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildToolLogs}
 */
proto.build_event_stream.BuildToolLogs.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new proto.build_event_stream.File;
                reader.readMessage(value, proto.build_event_stream.File.deserializeBinaryFromReader);
                msg.addLog(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildToolLogs.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildToolLogs.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildToolLogs} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildToolLogs.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getLogList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(1, f, proto.build_event_stream.File.serializeBinaryToWriter);
    }
};
/**
 * repeated File log = 1;
 * @return {!Array.<!proto.build_event_stream.File>}
 */
proto.build_event_stream.BuildToolLogs.prototype.getLogList = function () {
    return /** @type{!Array.<!proto.build_event_stream.File>} */ (jspb.Message.getRepeatedWrapperField(this, proto.build_event_stream.File, 1));
};
/** @param {!Array.<!proto.build_event_stream.File>} value */
proto.build_event_stream.BuildToolLogs.prototype.setLogList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 1, value);
};
/**
 * @param {!proto.build_event_stream.File=} opt_value
 * @param {number=} opt_index
 * @return {!proto.build_event_stream.File}
 */
proto.build_event_stream.BuildToolLogs.prototype.addLog = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.build_event_stream.File, opt_index);
};
proto.build_event_stream.BuildToolLogs.prototype.clearLogList = function () {
    this.setLogList([]);
};
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.build_event_stream.BuildEvent = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.build_event_stream.BuildEvent.repeatedFields_, proto.build_event_stream.BuildEvent.oneofGroups_);
};
goog.inherits(proto.build_event_stream.BuildEvent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.build_event_stream.BuildEvent.displayName = 'proto.build_event_stream.BuildEvent';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.build_event_stream.BuildEvent.repeatedFields_ = [2];
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.build_event_stream.BuildEvent.oneofGroups_ = [[3, 4, 5, 12, 22, 13, 16, 21, 17, 6, 18, 7, 15, 8, 10, 9, 14, 23, 24]];
/**
 * @enum {number}
 */
proto.build_event_stream.BuildEvent.PayloadCase = {
    PAYLOAD_NOT_SET: 0,
    PROGRESS: 3,
    ABORTED: 4,
    STARTED: 5,
    UNSTRUCTURED_COMMAND_LINE: 12,
    STRUCTURED_COMMAND_LINE: 22,
    OPTIONS_PARSED: 13,
    WORKSPACE_STATUS: 16,
    FETCH: 21,
    CONFIGURATION: 17,
    EXPANDED: 6,
    CONFIGURED: 18,
    ACTION: 7,
    NAMED_SET_OF_FILES: 15,
    COMPLETED: 8,
    TEST_RESULT: 10,
    TEST_SUMMARY: 9,
    FINISHED: 14,
    BUILD_TOOL_LOGS: 23,
    BUILD_METRICS: 24
};
/**
 * @return {proto.build_event_stream.BuildEvent.PayloadCase}
 */
proto.build_event_stream.BuildEvent.prototype.getPayloadCase = function () {
    return /** @type {proto.build_event_stream.BuildEvent.PayloadCase} */ (jspb.Message.computeOneofCase(this, proto.build_event_stream.BuildEvent.oneofGroups_[0]));
};
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.build_event_stream.BuildEvent.prototype.toObject = function (opt_includeInstance) {
        return proto.build_event_stream.BuildEvent.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.build_event_stream.BuildEvent} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.build_event_stream.BuildEvent.toObject = function (includeInstance, msg) {
        var f, obj = {
            id: (f = msg.getId()) && proto.build_event_stream.BuildEventId.toObject(includeInstance, f),
            childrenList: jspb.Message.toObjectList(msg.getChildrenList(), proto.build_event_stream.BuildEventId.toObject, includeInstance),
            lastMessage: jspb.Message.getFieldWithDefault(msg, 20, false),
            progress: (f = msg.getProgress()) && proto.build_event_stream.Progress.toObject(includeInstance, f),
            aborted: (f = msg.getAborted()) && proto.build_event_stream.Aborted.toObject(includeInstance, f),
            started: (f = msg.getStarted()) && proto.build_event_stream.BuildStarted.toObject(includeInstance, f),
            unstructuredCommandLine: (f = msg.getUnstructuredCommandLine()) && proto.build_event_stream.UnstructuredCommandLine.toObject(includeInstance, f),
            structuredCommandLine: (f = msg.getStructuredCommandLine()) && src_main_protobuf_command_line_pb.CommandLine.toObject(includeInstance, f),
            optionsParsed: (f = msg.getOptionsParsed()) && proto.build_event_stream.OptionsParsed.toObject(includeInstance, f),
            workspaceStatus: (f = msg.getWorkspaceStatus()) && proto.build_event_stream.WorkspaceStatus.toObject(includeInstance, f),
            fetch: (f = msg.getFetch()) && proto.build_event_stream.Fetch.toObject(includeInstance, f),
            configuration: (f = msg.getConfiguration()) && proto.build_event_stream.Configuration.toObject(includeInstance, f),
            expanded: (f = msg.getExpanded()) && proto.build_event_stream.PatternExpanded.toObject(includeInstance, f),
            configured: (f = msg.getConfigured()) && proto.build_event_stream.TargetConfigured.toObject(includeInstance, f),
            action: (f = msg.getAction()) && proto.build_event_stream.ActionExecuted.toObject(includeInstance, f),
            namedSetOfFiles: (f = msg.getNamedSetOfFiles()) && proto.build_event_stream.NamedSetOfFiles.toObject(includeInstance, f),
            completed: (f = msg.getCompleted()) && proto.build_event_stream.TargetComplete.toObject(includeInstance, f),
            testResult: (f = msg.getTestResult()) && proto.build_event_stream.TestResult.toObject(includeInstance, f),
            testSummary: (f = msg.getTestSummary()) && proto.build_event_stream.TestSummary.toObject(includeInstance, f),
            finished: (f = msg.getFinished()) && proto.build_event_stream.BuildFinished.toObject(includeInstance, f),
            buildToolLogs: (f = msg.getBuildToolLogs()) && proto.build_event_stream.BuildToolLogs.toObject(includeInstance, f),
            buildMetrics: (f = msg.getBuildMetrics()) && proto.build_event_stream.BuildMetrics.toObject(includeInstance, f)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.build_event_stream.BuildEvent}
 */
proto.build_event_stream.BuildEvent.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.build_event_stream.BuildEvent;
    return proto.build_event_stream.BuildEvent.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.build_event_stream.BuildEvent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.build_event_stream.BuildEvent}
 */
proto.build_event_stream.BuildEvent.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new proto.build_event_stream.BuildEventId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.deserializeBinaryFromReader);
                msg.setId(value);
                break;
            case 2:
                var value = new proto.build_event_stream.BuildEventId;
                reader.readMessage(value, proto.build_event_stream.BuildEventId.deserializeBinaryFromReader);
                msg.addChildren(value);
                break;
            case 20:
                var value = /** @type {boolean} */ (reader.readBool());
                msg.setLastMessage(value);
                break;
            case 3:
                var value = new proto.build_event_stream.Progress;
                reader.readMessage(value, proto.build_event_stream.Progress.deserializeBinaryFromReader);
                msg.setProgress(value);
                break;
            case 4:
                var value = new proto.build_event_stream.Aborted;
                reader.readMessage(value, proto.build_event_stream.Aborted.deserializeBinaryFromReader);
                msg.setAborted(value);
                break;
            case 5:
                var value = new proto.build_event_stream.BuildStarted;
                reader.readMessage(value, proto.build_event_stream.BuildStarted.deserializeBinaryFromReader);
                msg.setStarted(value);
                break;
            case 12:
                var value = new proto.build_event_stream.UnstructuredCommandLine;
                reader.readMessage(value, proto.build_event_stream.UnstructuredCommandLine.deserializeBinaryFromReader);
                msg.setUnstructuredCommandLine(value);
                break;
            case 22:
                var value = new src_main_protobuf_command_line_pb.CommandLine;
                reader.readMessage(value, src_main_protobuf_command_line_pb.CommandLine.deserializeBinaryFromReader);
                msg.setStructuredCommandLine(value);
                break;
            case 13:
                var value = new proto.build_event_stream.OptionsParsed;
                reader.readMessage(value, proto.build_event_stream.OptionsParsed.deserializeBinaryFromReader);
                msg.setOptionsParsed(value);
                break;
            case 16:
                var value = new proto.build_event_stream.WorkspaceStatus;
                reader.readMessage(value, proto.build_event_stream.WorkspaceStatus.deserializeBinaryFromReader);
                msg.setWorkspaceStatus(value);
                break;
            case 21:
                var value = new proto.build_event_stream.Fetch;
                reader.readMessage(value, proto.build_event_stream.Fetch.deserializeBinaryFromReader);
                msg.setFetch(value);
                break;
            case 17:
                var value = new proto.build_event_stream.Configuration;
                reader.readMessage(value, proto.build_event_stream.Configuration.deserializeBinaryFromReader);
                msg.setConfiguration(value);
                break;
            case 6:
                var value = new proto.build_event_stream.PatternExpanded;
                reader.readMessage(value, proto.build_event_stream.PatternExpanded.deserializeBinaryFromReader);
                msg.setExpanded(value);
                break;
            case 18:
                var value = new proto.build_event_stream.TargetConfigured;
                reader.readMessage(value, proto.build_event_stream.TargetConfigured.deserializeBinaryFromReader);
                msg.setConfigured(value);
                break;
            case 7:
                var value = new proto.build_event_stream.ActionExecuted;
                reader.readMessage(value, proto.build_event_stream.ActionExecuted.deserializeBinaryFromReader);
                msg.setAction(value);
                break;
            case 15:
                var value = new proto.build_event_stream.NamedSetOfFiles;
                reader.readMessage(value, proto.build_event_stream.NamedSetOfFiles.deserializeBinaryFromReader);
                msg.setNamedSetOfFiles(value);
                break;
            case 8:
                var value = new proto.build_event_stream.TargetComplete;
                reader.readMessage(value, proto.build_event_stream.TargetComplete.deserializeBinaryFromReader);
                msg.setCompleted(value);
                break;
            case 10:
                var value = new proto.build_event_stream.TestResult;
                reader.readMessage(value, proto.build_event_stream.TestResult.deserializeBinaryFromReader);
                msg.setTestResult(value);
                break;
            case 9:
                var value = new proto.build_event_stream.TestSummary;
                reader.readMessage(value, proto.build_event_stream.TestSummary.deserializeBinaryFromReader);
                msg.setTestSummary(value);
                break;
            case 14:
                var value = new proto.build_event_stream.BuildFinished;
                reader.readMessage(value, proto.build_event_stream.BuildFinished.deserializeBinaryFromReader);
                msg.setFinished(value);
                break;
            case 23:
                var value = new proto.build_event_stream.BuildToolLogs;
                reader.readMessage(value, proto.build_event_stream.BuildToolLogs.deserializeBinaryFromReader);
                msg.setBuildToolLogs(value);
                break;
            case 24:
                var value = new proto.build_event_stream.BuildMetrics;
                reader.readMessage(value, proto.build_event_stream.BuildMetrics.deserializeBinaryFromReader);
                msg.setBuildMetrics(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.build_event_stream.BuildEvent.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.build_event_stream.BuildEvent.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.build_event_stream.BuildEvent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.build_event_stream.BuildEvent.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getId();
    if (f != null) {
        writer.writeMessage(1, f, proto.build_event_stream.BuildEventId.serializeBinaryToWriter);
    }
    f = message.getChildrenList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(2, f, proto.build_event_stream.BuildEventId.serializeBinaryToWriter);
    }
    f = message.getLastMessage();
    if (f) {
        writer.writeBool(20, f);
    }
    f = message.getProgress();
    if (f != null) {
        writer.writeMessage(3, f, proto.build_event_stream.Progress.serializeBinaryToWriter);
    }
    f = message.getAborted();
    if (f != null) {
        writer.writeMessage(4, f, proto.build_event_stream.Aborted.serializeBinaryToWriter);
    }
    f = message.getStarted();
    if (f != null) {
        writer.writeMessage(5, f, proto.build_event_stream.BuildStarted.serializeBinaryToWriter);
    }
    f = message.getUnstructuredCommandLine();
    if (f != null) {
        writer.writeMessage(12, f, proto.build_event_stream.UnstructuredCommandLine.serializeBinaryToWriter);
    }
    f = message.getStructuredCommandLine();
    if (f != null) {
        writer.writeMessage(22, f, src_main_protobuf_command_line_pb.CommandLine.serializeBinaryToWriter);
    }
    f = message.getOptionsParsed();
    if (f != null) {
        writer.writeMessage(13, f, proto.build_event_stream.OptionsParsed.serializeBinaryToWriter);
    }
    f = message.getWorkspaceStatus();
    if (f != null) {
        writer.writeMessage(16, f, proto.build_event_stream.WorkspaceStatus.serializeBinaryToWriter);
    }
    f = message.getFetch();
    if (f != null) {
        writer.writeMessage(21, f, proto.build_event_stream.Fetch.serializeBinaryToWriter);
    }
    f = message.getConfiguration();
    if (f != null) {
        writer.writeMessage(17, f, proto.build_event_stream.Configuration.serializeBinaryToWriter);
    }
    f = message.getExpanded();
    if (f != null) {
        writer.writeMessage(6, f, proto.build_event_stream.PatternExpanded.serializeBinaryToWriter);
    }
    f = message.getConfigured();
    if (f != null) {
        writer.writeMessage(18, f, proto.build_event_stream.TargetConfigured.serializeBinaryToWriter);
    }
    f = message.getAction();
    if (f != null) {
        writer.writeMessage(7, f, proto.build_event_stream.ActionExecuted.serializeBinaryToWriter);
    }
    f = message.getNamedSetOfFiles();
    if (f != null) {
        writer.writeMessage(15, f, proto.build_event_stream.NamedSetOfFiles.serializeBinaryToWriter);
    }
    f = message.getCompleted();
    if (f != null) {
        writer.writeMessage(8, f, proto.build_event_stream.TargetComplete.serializeBinaryToWriter);
    }
    f = message.getTestResult();
    if (f != null) {
        writer.writeMessage(10, f, proto.build_event_stream.TestResult.serializeBinaryToWriter);
    }
    f = message.getTestSummary();
    if (f != null) {
        writer.writeMessage(9, f, proto.build_event_stream.TestSummary.serializeBinaryToWriter);
    }
    f = message.getFinished();
    if (f != null) {
        writer.writeMessage(14, f, proto.build_event_stream.BuildFinished.serializeBinaryToWriter);
    }
    f = message.getBuildToolLogs();
    if (f != null) {
        writer.writeMessage(23, f, proto.build_event_stream.BuildToolLogs.serializeBinaryToWriter);
    }
    f = message.getBuildMetrics();
    if (f != null) {
        writer.writeMessage(24, f, proto.build_event_stream.BuildMetrics.serializeBinaryToWriter);
    }
};
/**
 * optional BuildEventId id = 1;
 * @return {?proto.build_event_stream.BuildEventId}
 */
proto.build_event_stream.BuildEvent.prototype.getId = function () {
    return /** @type{?proto.build_event_stream.BuildEventId} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildEventId, 1));
};
/** @param {?proto.build_event_stream.BuildEventId|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setId = function (value) {
    jspb.Message.setWrapperField(this, 1, value);
};
proto.build_event_stream.BuildEvent.prototype.clearId = function () {
    this.setId(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasId = function () {
    return jspb.Message.getField(this, 1) != null;
};
/**
 * repeated BuildEventId children = 2;
 * @return {!Array.<!proto.build_event_stream.BuildEventId>}
 */
proto.build_event_stream.BuildEvent.prototype.getChildrenList = function () {
    return /** @type{!Array.<!proto.build_event_stream.BuildEventId>} */ (jspb.Message.getRepeatedWrapperField(this, proto.build_event_stream.BuildEventId, 2));
};
/** @param {!Array.<!proto.build_event_stream.BuildEventId>} value */
proto.build_event_stream.BuildEvent.prototype.setChildrenList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 2, value);
};
/**
 * @param {!proto.build_event_stream.BuildEventId=} opt_value
 * @param {number=} opt_index
 * @return {!proto.build_event_stream.BuildEventId}
 */
proto.build_event_stream.BuildEvent.prototype.addChildren = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.build_event_stream.BuildEventId, opt_index);
};
proto.build_event_stream.BuildEvent.prototype.clearChildrenList = function () {
    this.setChildrenList([]);
};
/**
 * optional bool last_message = 20;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.build_event_stream.BuildEvent.prototype.getLastMessage = function () {
    return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 20, false));
};
/** @param {boolean} value */
proto.build_event_stream.BuildEvent.prototype.setLastMessage = function (value) {
    jspb.Message.setField(this, 20, value);
};
/**
 * optional Progress progress = 3;
 * @return {?proto.build_event_stream.Progress}
 */
proto.build_event_stream.BuildEvent.prototype.getProgress = function () {
    return /** @type{?proto.build_event_stream.Progress} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.Progress, 3));
};
/** @param {?proto.build_event_stream.Progress|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setProgress = function (value) {
    jspb.Message.setOneofWrapperField(this, 3, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearProgress = function () {
    this.setProgress(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasProgress = function () {
    return jspb.Message.getField(this, 3) != null;
};
/**
 * optional Aborted aborted = 4;
 * @return {?proto.build_event_stream.Aborted}
 */
proto.build_event_stream.BuildEvent.prototype.getAborted = function () {
    return /** @type{?proto.build_event_stream.Aborted} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.Aborted, 4));
};
/** @param {?proto.build_event_stream.Aborted|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setAborted = function (value) {
    jspb.Message.setOneofWrapperField(this, 4, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearAborted = function () {
    this.setAborted(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasAborted = function () {
    return jspb.Message.getField(this, 4) != null;
};
/**
 * optional BuildStarted started = 5;
 * @return {?proto.build_event_stream.BuildStarted}
 */
proto.build_event_stream.BuildEvent.prototype.getStarted = function () {
    return /** @type{?proto.build_event_stream.BuildStarted} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildStarted, 5));
};
/** @param {?proto.build_event_stream.BuildStarted|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setStarted = function (value) {
    jspb.Message.setOneofWrapperField(this, 5, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearStarted = function () {
    this.setStarted(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasStarted = function () {
    return jspb.Message.getField(this, 5) != null;
};
/**
 * optional UnstructuredCommandLine unstructured_command_line = 12;
 * @return {?proto.build_event_stream.UnstructuredCommandLine}
 */
proto.build_event_stream.BuildEvent.prototype.getUnstructuredCommandLine = function () {
    return /** @type{?proto.build_event_stream.UnstructuredCommandLine} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.UnstructuredCommandLine, 12));
};
/** @param {?proto.build_event_stream.UnstructuredCommandLine|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setUnstructuredCommandLine = function (value) {
    jspb.Message.setOneofWrapperField(this, 12, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearUnstructuredCommandLine = function () {
    this.setUnstructuredCommandLine(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasUnstructuredCommandLine = function () {
    return jspb.Message.getField(this, 12) != null;
};
/**
 * optional command_line.CommandLine structured_command_line = 22;
 * @return {?proto.command_line.CommandLine}
 */
proto.build_event_stream.BuildEvent.prototype.getStructuredCommandLine = function () {
    return /** @type{?proto.command_line.CommandLine} */ (jspb.Message.getWrapperField(this, src_main_protobuf_command_line_pb.CommandLine, 22));
};
/** @param {?proto.command_line.CommandLine|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setStructuredCommandLine = function (value) {
    jspb.Message.setOneofWrapperField(this, 22, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearStructuredCommandLine = function () {
    this.setStructuredCommandLine(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasStructuredCommandLine = function () {
    return jspb.Message.getField(this, 22) != null;
};
/**
 * optional OptionsParsed options_parsed = 13;
 * @return {?proto.build_event_stream.OptionsParsed}
 */
proto.build_event_stream.BuildEvent.prototype.getOptionsParsed = function () {
    return /** @type{?proto.build_event_stream.OptionsParsed} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.OptionsParsed, 13));
};
/** @param {?proto.build_event_stream.OptionsParsed|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setOptionsParsed = function (value) {
    jspb.Message.setOneofWrapperField(this, 13, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearOptionsParsed = function () {
    this.setOptionsParsed(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasOptionsParsed = function () {
    return jspb.Message.getField(this, 13) != null;
};
/**
 * optional WorkspaceStatus workspace_status = 16;
 * @return {?proto.build_event_stream.WorkspaceStatus}
 */
proto.build_event_stream.BuildEvent.prototype.getWorkspaceStatus = function () {
    return /** @type{?proto.build_event_stream.WorkspaceStatus} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.WorkspaceStatus, 16));
};
/** @param {?proto.build_event_stream.WorkspaceStatus|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setWorkspaceStatus = function (value) {
    jspb.Message.setOneofWrapperField(this, 16, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearWorkspaceStatus = function () {
    this.setWorkspaceStatus(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasWorkspaceStatus = function () {
    return jspb.Message.getField(this, 16) != null;
};
/**
 * optional Fetch fetch = 21;
 * @return {?proto.build_event_stream.Fetch}
 */
proto.build_event_stream.BuildEvent.prototype.getFetch = function () {
    return /** @type{?proto.build_event_stream.Fetch} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.Fetch, 21));
};
/** @param {?proto.build_event_stream.Fetch|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setFetch = function (value) {
    jspb.Message.setOneofWrapperField(this, 21, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearFetch = function () {
    this.setFetch(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasFetch = function () {
    return jspb.Message.getField(this, 21) != null;
};
/**
 * optional Configuration configuration = 17;
 * @return {?proto.build_event_stream.Configuration}
 */
proto.build_event_stream.BuildEvent.prototype.getConfiguration = function () {
    return /** @type{?proto.build_event_stream.Configuration} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.Configuration, 17));
};
/** @param {?proto.build_event_stream.Configuration|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setConfiguration = function (value) {
    jspb.Message.setOneofWrapperField(this, 17, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearConfiguration = function () {
    this.setConfiguration(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasConfiguration = function () {
    return jspb.Message.getField(this, 17) != null;
};
/**
 * optional PatternExpanded expanded = 6;
 * @return {?proto.build_event_stream.PatternExpanded}
 */
proto.build_event_stream.BuildEvent.prototype.getExpanded = function () {
    return /** @type{?proto.build_event_stream.PatternExpanded} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.PatternExpanded, 6));
};
/** @param {?proto.build_event_stream.PatternExpanded|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setExpanded = function (value) {
    jspb.Message.setOneofWrapperField(this, 6, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearExpanded = function () {
    this.setExpanded(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasExpanded = function () {
    return jspb.Message.getField(this, 6) != null;
};
/**
 * optional TargetConfigured configured = 18;
 * @return {?proto.build_event_stream.TargetConfigured}
 */
proto.build_event_stream.BuildEvent.prototype.getConfigured = function () {
    return /** @type{?proto.build_event_stream.TargetConfigured} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.TargetConfigured, 18));
};
/** @param {?proto.build_event_stream.TargetConfigured|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setConfigured = function (value) {
    jspb.Message.setOneofWrapperField(this, 18, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearConfigured = function () {
    this.setConfigured(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasConfigured = function () {
    return jspb.Message.getField(this, 18) != null;
};
/**
 * optional ActionExecuted action = 7;
 * @return {?proto.build_event_stream.ActionExecuted}
 */
proto.build_event_stream.BuildEvent.prototype.getAction = function () {
    return /** @type{?proto.build_event_stream.ActionExecuted} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.ActionExecuted, 7));
};
/** @param {?proto.build_event_stream.ActionExecuted|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setAction = function (value) {
    jspb.Message.setOneofWrapperField(this, 7, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearAction = function () {
    this.setAction(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasAction = function () {
    return jspb.Message.getField(this, 7) != null;
};
/**
 * optional NamedSetOfFiles named_set_of_files = 15;
 * @return {?proto.build_event_stream.NamedSetOfFiles}
 */
proto.build_event_stream.BuildEvent.prototype.getNamedSetOfFiles = function () {
    return /** @type{?proto.build_event_stream.NamedSetOfFiles} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.NamedSetOfFiles, 15));
};
/** @param {?proto.build_event_stream.NamedSetOfFiles|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setNamedSetOfFiles = function (value) {
    jspb.Message.setOneofWrapperField(this, 15, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearNamedSetOfFiles = function () {
    this.setNamedSetOfFiles(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasNamedSetOfFiles = function () {
    return jspb.Message.getField(this, 15) != null;
};
/**
 * optional TargetComplete completed = 8;
 * @return {?proto.build_event_stream.TargetComplete}
 */
proto.build_event_stream.BuildEvent.prototype.getCompleted = function () {
    return /** @type{?proto.build_event_stream.TargetComplete} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.TargetComplete, 8));
};
/** @param {?proto.build_event_stream.TargetComplete|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setCompleted = function (value) {
    jspb.Message.setOneofWrapperField(this, 8, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearCompleted = function () {
    this.setCompleted(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasCompleted = function () {
    return jspb.Message.getField(this, 8) != null;
};
/**
 * optional TestResult test_result = 10;
 * @return {?proto.build_event_stream.TestResult}
 */
proto.build_event_stream.BuildEvent.prototype.getTestResult = function () {
    return /** @type{?proto.build_event_stream.TestResult} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.TestResult, 10));
};
/** @param {?proto.build_event_stream.TestResult|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setTestResult = function (value) {
    jspb.Message.setOneofWrapperField(this, 10, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearTestResult = function () {
    this.setTestResult(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasTestResult = function () {
    return jspb.Message.getField(this, 10) != null;
};
/**
 * optional TestSummary test_summary = 9;
 * @return {?proto.build_event_stream.TestSummary}
 */
proto.build_event_stream.BuildEvent.prototype.getTestSummary = function () {
    return /** @type{?proto.build_event_stream.TestSummary} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.TestSummary, 9));
};
/** @param {?proto.build_event_stream.TestSummary|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setTestSummary = function (value) {
    jspb.Message.setOneofWrapperField(this, 9, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearTestSummary = function () {
    this.setTestSummary(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasTestSummary = function () {
    return jspb.Message.getField(this, 9) != null;
};
/**
 * optional BuildFinished finished = 14;
 * @return {?proto.build_event_stream.BuildFinished}
 */
proto.build_event_stream.BuildEvent.prototype.getFinished = function () {
    return /** @type{?proto.build_event_stream.BuildFinished} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildFinished, 14));
};
/** @param {?proto.build_event_stream.BuildFinished|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setFinished = function (value) {
    jspb.Message.setOneofWrapperField(this, 14, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearFinished = function () {
    this.setFinished(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasFinished = function () {
    return jspb.Message.getField(this, 14) != null;
};
/**
 * optional BuildToolLogs build_tool_logs = 23;
 * @return {?proto.build_event_stream.BuildToolLogs}
 */
proto.build_event_stream.BuildEvent.prototype.getBuildToolLogs = function () {
    return /** @type{?proto.build_event_stream.BuildToolLogs} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildToolLogs, 23));
};
/** @param {?proto.build_event_stream.BuildToolLogs|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setBuildToolLogs = function (value) {
    jspb.Message.setOneofWrapperField(this, 23, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearBuildToolLogs = function () {
    this.setBuildToolLogs(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasBuildToolLogs = function () {
    return jspb.Message.getField(this, 23) != null;
};
/**
 * optional BuildMetrics build_metrics = 24;
 * @return {?proto.build_event_stream.BuildMetrics}
 */
proto.build_event_stream.BuildEvent.prototype.getBuildMetrics = function () {
    return /** @type{?proto.build_event_stream.BuildMetrics} */ (jspb.Message.getWrapperField(this, proto.build_event_stream.BuildMetrics, 24));
};
/** @param {?proto.build_event_stream.BuildMetrics|undefined} value */
proto.build_event_stream.BuildEvent.prototype.setBuildMetrics = function (value) {
    jspb.Message.setOneofWrapperField(this, 24, proto.build_event_stream.BuildEvent.oneofGroups_[0], value);
};
proto.build_event_stream.BuildEvent.prototype.clearBuildMetrics = function () {
    this.setBuildMetrics(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.build_event_stream.BuildEvent.prototype.hasBuildMetrics = function () {
    return jspb.Message.getField(this, 24) != null;
};
/**
 * @enum {number}
 */
proto.build_event_stream.TestSize = {
    UNKNOWN: 0,
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3,
    ENORMOUS: 4
};
/**
 * @enum {number}
 */
proto.build_event_stream.TestStatus = {
    NO_STATUS: 0,
    PASSED: 1,
    FLAKY: 2,
    TIMEOUT: 3,
    FAILED: 4,
    INCOMPLETE: 5,
    REMOTE_FAILURE: 6,
    FAILED_TO_BUILD: 7,
    TOOL_HALTED_BEFORE_TESTING: 8
};
goog.object.extend(exports, proto.build_event_stream);
//# sourceMappingURL=build_event_stream_pb.js.map