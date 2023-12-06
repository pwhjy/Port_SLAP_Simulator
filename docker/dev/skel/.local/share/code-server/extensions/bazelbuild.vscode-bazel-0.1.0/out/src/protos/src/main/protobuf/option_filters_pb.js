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
goog.exportSymbol('proto.options.OptionEffectTag', null, global);
goog.exportSymbol('proto.options.OptionMetadataTag', null, global);
/**
 * @enum {number}
 */
proto.options.OptionEffectTag = {
    UNKNOWN: 0,
    NO_OP: 1,
    LOSES_INCREMENTAL_STATE: 2,
    CHANGES_INPUTS: 3,
    AFFECTS_OUTPUTS: 4,
    BUILD_FILE_SEMANTICS: 5,
    BAZEL_INTERNAL_CONFIGURATION: 6,
    LOADING_AND_ANALYSIS: 7,
    EXECUTION: 8,
    HOST_MACHINE_RESOURCE_OPTIMIZATIONS: 9,
    EAGERNESS_TO_EXIT: 10,
    BAZEL_MONITORING: 11,
    TERMINAL_OUTPUT: 12,
    ACTION_COMMAND_LINES: 13,
    TEST_RUNNER: 14
};
/**
 * @enum {number}
 */
proto.options.OptionMetadataTag = {
    EXPERIMENTAL: 0,
    INCOMPATIBLE_CHANGE: 1,
    DEPRECATED: 2,
    HIDDEN: 3,
    INTERNAL: 4,
    TRIGGERED_BY_ALL_INCOMPATIBLE_CHANGES: 5
};
goog.object.extend(exports, proto.options);
//# sourceMappingURL=option_filters_pb.js.map