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
    $root.options = (function () {
        /**
         * Namespace options.
         * @exports options
         * @namespace
         */
        var options = {};
        /**
         * OptionEffectTag enum.
         * @name options.OptionEffectTag
         * @enum {string}
         * @property {number} UNKNOWN=0 UNKNOWN value
         * @property {number} NO_OP=1 NO_OP value
         * @property {number} LOSES_INCREMENTAL_STATE=2 LOSES_INCREMENTAL_STATE value
         * @property {number} CHANGES_INPUTS=3 CHANGES_INPUTS value
         * @property {number} AFFECTS_OUTPUTS=4 AFFECTS_OUTPUTS value
         * @property {number} BUILD_FILE_SEMANTICS=5 BUILD_FILE_SEMANTICS value
         * @property {number} BAZEL_INTERNAL_CONFIGURATION=6 BAZEL_INTERNAL_CONFIGURATION value
         * @property {number} LOADING_AND_ANALYSIS=7 LOADING_AND_ANALYSIS value
         * @property {number} EXECUTION=8 EXECUTION value
         * @property {number} HOST_MACHINE_RESOURCE_OPTIMIZATIONS=9 HOST_MACHINE_RESOURCE_OPTIMIZATIONS value
         * @property {number} EAGERNESS_TO_EXIT=10 EAGERNESS_TO_EXIT value
         * @property {number} BAZEL_MONITORING=11 BAZEL_MONITORING value
         * @property {number} TERMINAL_OUTPUT=12 TERMINAL_OUTPUT value
         * @property {number} ACTION_COMMAND_LINES=13 ACTION_COMMAND_LINES value
         * @property {number} TEST_RUNNER=14 TEST_RUNNER value
         */
        options.OptionEffectTag = (function () {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "NO_OP"] = 1;
            values[valuesById[2] = "LOSES_INCREMENTAL_STATE"] = 2;
            values[valuesById[3] = "CHANGES_INPUTS"] = 3;
            values[valuesById[4] = "AFFECTS_OUTPUTS"] = 4;
            values[valuesById[5] = "BUILD_FILE_SEMANTICS"] = 5;
            values[valuesById[6] = "BAZEL_INTERNAL_CONFIGURATION"] = 6;
            values[valuesById[7] = "LOADING_AND_ANALYSIS"] = 7;
            values[valuesById[8] = "EXECUTION"] = 8;
            values[valuesById[9] = "HOST_MACHINE_RESOURCE_OPTIMIZATIONS"] = 9;
            values[valuesById[10] = "EAGERNESS_TO_EXIT"] = 10;
            values[valuesById[11] = "BAZEL_MONITORING"] = 11;
            values[valuesById[12] = "TERMINAL_OUTPUT"] = 12;
            values[valuesById[13] = "ACTION_COMMAND_LINES"] = 13;
            values[valuesById[14] = "TEST_RUNNER"] = 14;
            return values;
        })();
        /**
         * OptionMetadataTag enum.
         * @name options.OptionMetadataTag
         * @enum {string}
         * @property {number} EXPERIMENTAL=0 EXPERIMENTAL value
         * @property {number} INCOMPATIBLE_CHANGE=1 INCOMPATIBLE_CHANGE value
         * @property {number} DEPRECATED=2 DEPRECATED value
         * @property {number} HIDDEN=3 HIDDEN value
         * @property {number} INTERNAL=4 INTERNAL value
         * @property {number} TRIGGERED_BY_ALL_INCOMPATIBLE_CHANGES=5 TRIGGERED_BY_ALL_INCOMPATIBLE_CHANGES value
         */
        options.OptionMetadataTag = (function () {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "EXPERIMENTAL"] = 0;
            values[valuesById[1] = "INCOMPATIBLE_CHANGE"] = 1;
            values[valuesById[2] = "DEPRECATED"] = 2;
            values[valuesById[3] = "HIDDEN"] = 3;
            values[valuesById[4] = "INTERNAL"] = 4;
            values[valuesById[5] = "TRIGGERED_BY_ALL_INCOMPATIBLE_CHANGES"] = 5;
            return values;
        })();
        return options;
    })();
    return $root;
});
//# sourceMappingURL=option_filters.js.map