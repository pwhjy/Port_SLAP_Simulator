"use strict";
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
goog.provide('proto.blaze_query.Target');
goog.provide('proto.blaze_query.Target.Discriminator');
goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.blaze_query.EnvironmentGroup');
goog.require('proto.blaze_query.GeneratedFile');
goog.require('proto.blaze_query.PackageGroup');
goog.require('proto.blaze_query.Rule');
goog.require('proto.blaze_query.SourceFile');
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
proto.blaze_query.Target = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.blaze_query.Target, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.blaze_query.Target.displayName = 'proto.blaze_query.Target';
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
    proto.blaze_query.Target.prototype.toObject = function (opt_includeInstance) {
        return proto.blaze_query.Target.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.blaze_query.Target} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.blaze_query.Target.toObject = function (includeInstance, msg) {
        var f, obj = {
            type: jspb.Message.getField(msg, 1),
            rule: (f = msg.getRule()) && proto.blaze_query.Rule.toObject(includeInstance, f),
            sourceFile: (f = msg.getSourceFile()) && proto.blaze_query.SourceFile.toObject(includeInstance, f),
            generatedFile: (f = msg.getGeneratedFile()) && proto.blaze_query.GeneratedFile.toObject(includeInstance, f),
            packageGroup: (f = msg.getPackageGroup()) && proto.blaze_query.PackageGroup.toObject(includeInstance, f),
            environmentGroup: (f = msg.getEnvironmentGroup()) && proto.blaze_query.EnvironmentGroup.toObject(includeInstance, f)
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
 * @return {!proto.blaze_query.Target}
 */
proto.blaze_query.Target.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.blaze_query.Target;
    return proto.blaze_query.Target.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.blaze_query.Target} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.blaze_query.Target}
 */
proto.blaze_query.Target.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {!proto.blaze_query.Target.Discriminator} */ (reader.readEnum());
                msg.setType(value);
                break;
            case 2:
                var value = new proto.blaze_query.Rule;
                reader.readMessage(value, proto.blaze_query.Rule.deserializeBinaryFromReader);
                msg.setRule(value);
                break;
            case 3:
                var value = new proto.blaze_query.SourceFile;
                reader.readMessage(value, proto.blaze_query.SourceFile.deserializeBinaryFromReader);
                msg.setSourceFile(value);
                break;
            case 4:
                var value = new proto.blaze_query.GeneratedFile;
                reader.readMessage(value, proto.blaze_query.GeneratedFile.deserializeBinaryFromReader);
                msg.setGeneratedFile(value);
                break;
            case 5:
                var value = new proto.blaze_query.PackageGroup;
                reader.readMessage(value, proto.blaze_query.PackageGroup.deserializeBinaryFromReader);
                msg.setPackageGroup(value);
                break;
            case 6:
                var value = new proto.blaze_query.EnvironmentGroup;
                reader.readMessage(value, proto.blaze_query.EnvironmentGroup.deserializeBinaryFromReader);
                msg.setEnvironmentGroup(value);
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
proto.blaze_query.Target.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.blaze_query.Target.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.blaze_query.Target} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.blaze_query.Target.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = /** @type {!proto.blaze_query.Target.Discriminator} */ (jspb.Message.getField(message, 1));
    if (f != null) {
        writer.writeEnum(1, f);
    }
    f = message.getRule();
    if (f != null) {
        writer.writeMessage(2, f, proto.blaze_query.Rule.serializeBinaryToWriter);
    }
    f = message.getSourceFile();
    if (f != null) {
        writer.writeMessage(3, f, proto.blaze_query.SourceFile.serializeBinaryToWriter);
    }
    f = message.getGeneratedFile();
    if (f != null) {
        writer.writeMessage(4, f, proto.blaze_query.GeneratedFile.serializeBinaryToWriter);
    }
    f = message.getPackageGroup();
    if (f != null) {
        writer.writeMessage(5, f, proto.blaze_query.PackageGroup.serializeBinaryToWriter);
    }
    f = message.getEnvironmentGroup();
    if (f != null) {
        writer.writeMessage(6, f, proto.blaze_query.EnvironmentGroup.serializeBinaryToWriter);
    }
};
/**
 * @enum {number}
 */
proto.blaze_query.Target.Discriminator = {
    RULE: 1,
    SOURCE_FILE: 2,
    GENERATED_FILE: 3,
    PACKAGE_GROUP: 4,
    ENVIRONMENT_GROUP: 5
};
/**
 * required Discriminator type = 1;
 * @return {!proto.blaze_query.Target.Discriminator}
 */
proto.blaze_query.Target.prototype.getType = function () {
    return /** @type {!proto.blaze_query.Target.Discriminator} */ (jspb.Message.getFieldWithDefault(this, 1, 1));
};
/** @param {!proto.blaze_query.Target.Discriminator} value */
proto.blaze_query.Target.prototype.setType = function (value) {
    jspb.Message.setField(this, 1, value);
};
proto.blaze_query.Target.prototype.clearType = function () {
    jspb.Message.setField(this, 1, undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.blaze_query.Target.prototype.hasType = function () {
    return jspb.Message.getField(this, 1) != null;
};
/**
 * optional Rule rule = 2;
 * @return {?proto.blaze_query.Rule}
 */
proto.blaze_query.Target.prototype.getRule = function () {
    return /** @type{?proto.blaze_query.Rule} */ (jspb.Message.getWrapperField(this, proto.blaze_query.Rule, 2));
};
/** @param {?proto.blaze_query.Rule|undefined} value */
proto.blaze_query.Target.prototype.setRule = function (value) {
    jspb.Message.setWrapperField(this, 2, value);
};
proto.blaze_query.Target.prototype.clearRule = function () {
    this.setRule(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.blaze_query.Target.prototype.hasRule = function () {
    return jspb.Message.getField(this, 2) != null;
};
/**
 * optional SourceFile source_file = 3;
 * @return {?proto.blaze_query.SourceFile}
 */
proto.blaze_query.Target.prototype.getSourceFile = function () {
    return /** @type{?proto.blaze_query.SourceFile} */ (jspb.Message.getWrapperField(this, proto.blaze_query.SourceFile, 3));
};
/** @param {?proto.blaze_query.SourceFile|undefined} value */
proto.blaze_query.Target.prototype.setSourceFile = function (value) {
    jspb.Message.setWrapperField(this, 3, value);
};
proto.blaze_query.Target.prototype.clearSourceFile = function () {
    this.setSourceFile(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.blaze_query.Target.prototype.hasSourceFile = function () {
    return jspb.Message.getField(this, 3) != null;
};
/**
 * optional GeneratedFile generated_file = 4;
 * @return {?proto.blaze_query.GeneratedFile}
 */
proto.blaze_query.Target.prototype.getGeneratedFile = function () {
    return /** @type{?proto.blaze_query.GeneratedFile} */ (jspb.Message.getWrapperField(this, proto.blaze_query.GeneratedFile, 4));
};
/** @param {?proto.blaze_query.GeneratedFile|undefined} value */
proto.blaze_query.Target.prototype.setGeneratedFile = function (value) {
    jspb.Message.setWrapperField(this, 4, value);
};
proto.blaze_query.Target.prototype.clearGeneratedFile = function () {
    this.setGeneratedFile(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.blaze_query.Target.prototype.hasGeneratedFile = function () {
    return jspb.Message.getField(this, 4) != null;
};
/**
 * optional PackageGroup package_group = 5;
 * @return {?proto.blaze_query.PackageGroup}
 */
proto.blaze_query.Target.prototype.getPackageGroup = function () {
    return /** @type{?proto.blaze_query.PackageGroup} */ (jspb.Message.getWrapperField(this, proto.blaze_query.PackageGroup, 5));
};
/** @param {?proto.blaze_query.PackageGroup|undefined} value */
proto.blaze_query.Target.prototype.setPackageGroup = function (value) {
    jspb.Message.setWrapperField(this, 5, value);
};
proto.blaze_query.Target.prototype.clearPackageGroup = function () {
    this.setPackageGroup(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.blaze_query.Target.prototype.hasPackageGroup = function () {
    return jspb.Message.getField(this, 5) != null;
};
/**
 * optional EnvironmentGroup environment_group = 6;
 * @return {?proto.blaze_query.EnvironmentGroup}
 */
proto.blaze_query.Target.prototype.getEnvironmentGroup = function () {
    return /** @type{?proto.blaze_query.EnvironmentGroup} */ (jspb.Message.getWrapperField(this, proto.blaze_query.EnvironmentGroup, 6));
};
/** @param {?proto.blaze_query.EnvironmentGroup|undefined} value */
proto.blaze_query.Target.prototype.setEnvironmentGroup = function (value) {
    jspb.Message.setWrapperField(this, 6, value);
};
proto.blaze_query.Target.prototype.clearEnvironmentGroup = function () {
    this.setEnvironmentGroup(undefined);
};
/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.blaze_query.Target.prototype.hasEnvironmentGroup = function () {
    return jspb.Message.getField(this, 6) != null;
};
//# sourceMappingURL=target.js.map