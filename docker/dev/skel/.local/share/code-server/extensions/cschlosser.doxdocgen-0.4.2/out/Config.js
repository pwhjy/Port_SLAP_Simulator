"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
// tslint:disable:max-classes-per-file
// tslint:disable:max-line-length
class C {
    constructor() {
        this.triggerSequence = "/**";
        this.firstLine = "/**";
        this.commentPrefix = " * ";
        this.lastLine = " */";
        this.getterText = "Get the {name} object";
        this.setterText = "Set the {name} object";
        this.factoryMethodText = "Create a {name} object";
    }
    static getConfiguration() {
        return vscode_1.workspace.getConfiguration("doxdocgen.c");
    }
}
class Cpp {
    constructor() {
        this.tparamTemplate = "@tparam {param} ";
        this.ctorText = "Construct a new {name} object";
        this.dtorText = "Destroy the {name} object";
    }
    static getConfiguration() {
        return vscode_1.workspace.getConfiguration("doxdocgen.cpp");
    }
}
class File {
    constructor() {
        this.fileTemplate = "@file {name}";
        this.copyrightTag = ["@copyright Copyright (c) {year}"];
        this.versionTag = "@version 0.1";
        this.customTag = [];
        this.fileOrder = ["brief", "empty", "file", "author", "date"];
    }
    static getConfiguration() {
        return vscode_1.workspace.getConfiguration("doxdocgen.file");
    }
}
class Generic {
    constructor() {
        this.includeTypeAtReturn = true;
        this.boolReturnsTrueFalse = true;
        this.briefTemplate = "@brief {text}";
        this.paramTemplate = "@param {param} ";
        this.returnTemplate = "@return {type} ";
        this.linesToGet = 20;
        this.authorName = "your name";
        this.authorEmail = "you@domain.com";
        this.authorTag = "@author {author} ({email})";
        this.dateTemplate = "@date {date}";
        this.dateFormat = "YYYY-MM-DD";
        this.generateSmartText = true;
        this.splitCasingSmartText = true;
        this.order = ["brief", "empty", "tparam", "param", "return"];
    }
    static getConfiguration() {
        return vscode_1.workspace.getConfiguration("doxdocgen.generic");
    }
}
class Config {
    constructor() {
        this.paramTemplateReplace = "{param}";
        this.typeTemplateReplace = "{type}";
        this.nameTemplateReplace = "{name}";
        this.authorTemplateReplace = "{author}";
        this.emailTemplateReplace = "{email}";
        this.dateTemplateReplace = "{date}";
        this.yearTemplateReplace = "{year}";
        this.textTemplateReplace = "{text}";
        this.C = new C();
        this.Cpp = new Cpp();
        this.File = new File();
        this.Generic = new Generic();
    }
    static ImportFromSettings() {
        const values = new Config();
        values.C.triggerSequence = C.getConfiguration().get("triggerSequence", values.C.triggerSequence);
        values.C.firstLine = C.getConfiguration().get("firstLine", values.C.firstLine);
        values.C.commentPrefix = C.getConfiguration().get("commentPrefix", values.C.commentPrefix);
        values.C.lastLine = C.getConfiguration().get("lastLine", values.C.lastLine);
        values.C.getterText = C.getConfiguration().get("getterText", values.C.getterText);
        values.C.setterText = C.getConfiguration().get("setterText", values.C.setterText);
        values.C.factoryMethodText = C.getConfiguration().get("factoryMethodText", values.C.factoryMethodText);
        values.Cpp.tparamTemplate = Cpp.getConfiguration().get("tparamTemplate", values.Cpp.tparamTemplate);
        values.Cpp.ctorText = Cpp.getConfiguration().get("ctorText", values.Cpp.ctorText);
        values.Cpp.dtorText = Cpp.getConfiguration().get("dtorText", values.Cpp.dtorText);
        values.File.fileTemplate = File.getConfiguration().get("fileTemplate", values.File.fileTemplate);
        values.File.versionTag = File.getConfiguration().get("versionTag", values.File.versionTag);
        values.File.copyrightTag = File.getConfiguration().get("copyrightTag", values.File.copyrightTag);
        values.File.customTag = File.getConfiguration().get("customTag", values.File.customTag);
        values.File.fileOrder = File.getConfiguration().get("fileOrder", values.File.fileOrder);
        values.Generic.includeTypeAtReturn = Generic.getConfiguration().get("includeTypeAtReturn", values.Generic.includeTypeAtReturn);
        values.Generic.boolReturnsTrueFalse = Generic.getConfiguration().get("boolReturnsTrueFalse", values.Generic.boolReturnsTrueFalse);
        values.Generic.briefTemplate = Generic.getConfiguration().get("briefTemplate", values.Generic.briefTemplate);
        values.Generic.paramTemplate = Generic.getConfiguration().get("paramTemplate", values.Generic.paramTemplate);
        values.Generic.returnTemplate = Generic.getConfiguration().get("returnTemplate", values.Generic.returnTemplate);
        values.Generic.linesToGet = Generic.getConfiguration().get("linesToGet", values.Generic.linesToGet);
        values.Generic.authorTag = Generic.getConfiguration().get("authorTag", values.Generic.authorTag);
        values.Generic.authorName = Generic.getConfiguration().get("authorName", values.Generic.authorName);
        values.Generic.authorEmail = Generic.getConfiguration().get("authorEmail", values.Generic.authorEmail);
        values.Generic.dateTemplate = Generic.getConfiguration().get("dateTemplate", values.Generic.dateTemplate);
        values.Generic.dateFormat = Generic.getConfiguration().get("dateFormat", values.Generic.dateFormat);
        values.Generic.generateSmartText = Generic.getConfiguration().get("generateSmartText", values.Generic.generateSmartText);
        values.Generic.splitCasingSmartText = Generic.getConfiguration().get("splitCasingSmartText", values.Generic.splitCasingSmartText);
        values.Generic.order = Generic.getConfiguration().get("order", values.Generic.order);
        return values;
    }
}
exports.Config = Config;
//# sourceMappingURL=Config.js.map