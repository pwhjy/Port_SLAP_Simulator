"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
const async_1 = require("./async");
let expandVarRegex = /\$\{(?:([^:}]+):)?([^}]+)\}/g;
function expandVariables(str, expander) {
    let result = str.replace(expandVarRegex, (all, type, key) => {
        let replacement = expander(type, key);
        return replacement != null ? replacement : all;
    });
    return result;
}
exports.expandVariables = expandVariables;
function expandVariablesInObject(obj, expander) {
    if (typeof obj == 'string' || obj instanceof String)
        return expandVariables(obj, expander);
    if (isScalarValue(obj))
        return obj;
    if (obj instanceof Array)
        return obj.map(v => expandVariablesInObject(v, expander));
    for (let prop of Object.keys(obj))
        obj[prop] = expandVariablesInObject(obj[prop], expander);
    return obj;
}
exports.expandVariablesInObject = expandVariablesInObject;
// Expands variable references of the form ${dbgconfig:name} in all properties of launch configuration.
function expandDbgConfig(debugConfig, dbgconfigConfig) {
    let dbgconfig = Object.assign({}, dbgconfigConfig);
    // Compute fixed-point of expansion of dbgconfig properties.
    let expanding = '';
    let converged = true;
    let expander = (type, key) => {
        if (type == 'dbgconfig') {
            if (key == expanding)
                throw new Error('Circular dependency detected during expansion of dbgconfig:' + key);
            let value = dbgconfig[key];
            if (value == undefined)
                throw new Error('dbgconfig:' + key + ' is not defined');
            converged = false;
            return value.toString();
        }
        return null;
    };
    do {
        converged = true;
        for (let prop of Object.keys(dbgconfig)) {
            expanding = prop;
            dbgconfig[prop] = expandVariablesInObject(dbgconfig[prop], expander);
        }
    } while (!converged);
    // Now expand dbgconfigs in the launch configuration.
    debugConfig = expandVariablesInObject(debugConfig, (type, key) => {
        if (type == 'dbgconfig') {
            let value = dbgconfig[key];
            if (value == undefined)
                throw new Error('dbgconfig:' + key + ' is not defined');
            return value.toString();
        }
        return null;
    });
    return debugConfig;
}
exports.expandDbgConfig = expandDbgConfig;
function getProcessList(currentUserOnly) {
    return __awaiter(this, void 0, void 0, function* () {
        let is_windows = process.platform == 'win32';
        let command;
        if (!is_windows) {
            if (currentUserOnly)
                command = 'ps x';
            else
                command = 'ps ax';
        }
        else {
            if (currentUserOnly)
                command = 'tasklist /V /FO CSV /FI "USERNAME eq ' + process.env['USERNAME'] + '"';
            else
                command = 'tasklist /V /FO CSV';
        }
        let stdout = yield new Promise((resolve, reject) => {
            cp.exec(command, (error, stdout, stderr) => {
                if (error)
                    reject(error);
                else
                    resolve(stdout);
            });
        });
        let lines = stdout.split('\n');
        let items = [];
        let re, idx;
        if (!is_windows) {
            re = /^\s*(\d+)\s+.*?\s+.*?\s+.*?\s+(.*)()$/;
            idx = [1, 2, 3];
        }
        else {
            // name, pid, ..., window title
            re = /^"([^"]*)","([^"]*)",(?:"[^"]*",){6}"([^"]*)"/;
            idx = [2, 1, 3];
        }
        for (let i = 1; i < lines.length; ++i) {
            let groups = re.exec(lines[i]);
            if (groups) {
                let pid = parseInt(groups[idx[0]]);
                let name = groups[idx[1]];
                let descr = groups[idx[2]];
                let item = { label: `${pid}: ${name}`, description: descr, pid: pid };
                items.unshift(item);
            }
        }
        return items;
    });
}
exports.getProcessList = getProcessList;
function getConfigNoDefault(config, key) {
    let x = config.inspect(key);
    let value = x.workspaceFolderValue;
    if (value === undefined)
        value = x.workspaceValue;
    if (value === undefined)
        value = x.globalValue;
    return value;
}
exports.getConfigNoDefault = getConfigNoDefault;
function isEmpty(obj) {
    if (obj === null || obj === undefined)
        return true;
    if (typeof obj == 'number' || obj instanceof Number)
        return false;
    if (typeof obj == 'string' || obj instanceof String)
        return obj.length == 0;
    if (obj instanceof Array)
        return obj.length == 0;
    return Object.keys(obj).length == 0;
}
exports.isEmpty = isEmpty;
function mergeValues(value1, value2) {
    if (value2 === undefined)
        return value1;
    // For non-container types, value2 wins.
    if (isScalarValue(value1))
        return value2;
    // Concatenate arrays.
    if (value1 instanceof Array && value2 instanceof Array)
        return value1.concat(value2);
    // Merge dictionaries.
    return Object.assign({}, value1, value2);
}
exports.mergeValues = mergeValues;
function isScalarValue(value) {
    return value === null || value === undefined ||
        typeof value == 'boolean' || value instanceof Boolean ||
        typeof value == 'number' || value instanceof Number ||
        typeof value == 'string' || value instanceof String;
}
function logProcessOutput(process, output) {
    process.stdout.on('data', chunk => {
        output.append(chunk.toString());
    });
    process.stderr.on('data', chunk => {
        output.append(chunk.toString());
    });
}
exports.logProcessOutput = logProcessOutput;
function findFileByPattern(path, pattern) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let files = yield async_1.readdirAsync(path);
            for (let file of files) {
                if (pattern.test(file))
                    return file;
            }
        }
        catch (err) {
            // Ignore missing diractories and such...
        }
        return null;
    });
}
exports.findFileByPattern = findFileByPattern;
function setIfDefined(target, config, key) {
    let value = getConfigNoDefault(config, key);
    if (value !== undefined)
        target[key] = value;
}
exports.setIfDefined = setIfDefined;
function readRegistry(path, value) {
    return __awaiter(this, void 0, void 0, function* () {
        let args = ['query', path];
        if (value != null)
            args.push('/v', value);
        else
            args.push('/ve');
        args.push('/reg:64');
        try {
            let { stdout } = yield async_1.execFileAsync('reg.exe', args);
            let m = (/REG_SZ\s+(.*)/).exec(stdout);
            if (m) {
                return m[1];
            }
            else {
                return null;
            }
        }
        catch (err) {
            return null;
        }
    });
}
exports.readRegistry = readRegistry;
function getLLDBDirectories(executable) {
    return __awaiter(this, void 0, void 0, function* () {
        let statements = [];
        for (let type of ['ePathTypeLLDBShlibDir', 'ePathTypeSupportExecutableDir', 'ePathTypePythonDir']) {
            statements.push(`print('<!' + lldb.SBHostOS.GetLLDBPath(lldb.${type}).fullpath + '!>')`);
        }
        let args = ['-b', '-O', `script ${statements.join(';')}`];
        let { stdout, stderr } = yield async_1.execFileAsync(executable, args);
        let m = (/^<!([^!]*)!>$[^.]*^<!([^!]*)!>[^.]*^<!([^!]*)!>/m).exec(stdout);
        if (m) {
            return {
                shlibDir: m[1],
                supportExeDir: m[2],
                pythonDir: m[3]
            };
        }
        else {
            throw new Error(stderr);
        }
    });
}
exports.getLLDBDirectories = getLLDBDirectories;
class IgnoreCaseProxy {
    constructor() {
        this.keys = {};
    }
    get(target, key) {
        let upperKey = key.toUpperCase();
        let mappedKey = this.keys[upperKey];
        return target[mappedKey];
    }
    set(target, key, value) {
        let upperKey = key.toUpperCase();
        let mappedKey = this.keys[upperKey];
        if (mappedKey == undefined) {
            this.keys[upperKey] = key;
            mappedKey = key;
        }
        target[mappedKey] = value;
        return true;
    }
}
// Windows environment varibles are case-insensitive: for example, `Path` and `PATH` refer to the same variable.
// This class emulates such a behavior.
class Environment {
    constructor(ignoreCase) {
        if (ignoreCase)
            return new Proxy(this, new IgnoreCaseProxy());
        else
            return this;
    }
}
exports.Environment = Environment;
// Expand ${env:...} placeholders in extraEnv and merge it with the current process' environment.
function mergeEnv(extraEnv) {
    let env = new Environment(process.platform == 'win32');
    env = Object.assign(env, process.env);
    for (let key in extraEnv) {
        env[key] = expandVariables(extraEnv[key], (type, key) => {
            if (type == 'env')
                return process.env[key];
            throw new Error('Unknown variable type ' + type);
        });
    }
    return env;
}
exports.mergeEnv = mergeEnv;
//# sourceMappingURL=util.js.map