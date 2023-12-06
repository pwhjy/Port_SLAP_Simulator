"use strict";
// Copyright 2018 The Bazel Authors. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
const vscode = require("vscode");
const xml2js = require("xml2js");
/** Provides a promise-based API around a Bazel query. */
class BazelQuery extends commands_1.BazelChildProcessCommand {
    /**
     * Initializes a new Bazel query.
     *
     * @param workingDirectory The path to the directory from which Bazel will be spawned.
     * @param query The query to execute.
     * @param options Command line options that will be passed to Bazel (targets, query strings,
     *     flags, etc.).
     * @param ignoresErrors If true, a non-zero exit code for the child process is ignored and the
     *     {@link #run} function's promise is resolved with the empty string instead.
     */
    constructor(workingDirectory, query, options, ignoresErrors = false) {
        super(workingDirectory, [query].concat(options), ignoresErrors);
    }
    bazelCommand() { return "query"; }
    /**
     * Runs the query and parses its output into a rich object model that can be traversed.
     *
     * @param additionalOptions Additional command line options that should be passed just to this
     *     specific invocation of the query.
     * @returns A {@link QueryResult} object that contains structured information about the query
     *     results.
     */
    runAndParse(additionalOptions = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const xmlString = yield this.run(additionalOptions.concat(["--output=xml"]));
            return Promise.resolve(new QueryResult(xmlString));
        });
    }
}
exports.BazelQuery = BazelQuery;
/** Contains the structured results of a Bazel query. */
class QueryResult {
    /**
     * Intializes a new Bazel query result from the given XML output.
     *
     * @param xmlString The XML output of a {@code bazel query}. This string may be empty, in which
     *     case the results are empty as well.
     */
    constructor(xmlString) {
        if (xmlString.length == 0) {
            this.rules = [];
            this.sourceFiles = [];
            return;
        }
        var queryResult = {};
        xml2js.parseString(xmlString, (err, result) => {
            queryResult = result;
        });
        let queryNode = queryResult["query"];
        this.rules = (queryNode["rule"] || []).map((ruleNode) => {
            return new QueriedRule(ruleNode);
        });
        QueryResultItem.sortByName(this.rules);
        // TODO(allevato): These will only be returned if we do a ":*" query, not a "/..." query.
        // Determine if we want to surface these in the build target view.
        this.sourceFiles = (queryNode["source-file"] || []).map((sourceFileNode) => {
            return new QueriedSourceFile(sourceFileNode);
        });
        QueryResultItem.sortByName(this.sourceFiles);
    }
}
exports.QueryResult = QueryResult;
/** Represents the location of a query item in the BUILD file where it was defined. */
class QueryLocation {
    constructor(stringRepresentation) {
        const parts = stringRepresentation.split(":");
        this.path = parts[0];
        this.line = parts.length > 1 ? parseInt(parts[1]) : 1;
        this.column = parts.length > 2 ? parseInt(parts[2]) : 1;
    }
    /**
     * A {@code vscode.Range} value that points to the first character where the given query item is
     * defined.
     *
     * This property handles the conversation from Bazel's 1-based line/column indices to the 0-based
     * indices that VS Code expects.
     */
    get range() {
        return new vscode.Range(this.line - 1, this.column - 1, this.line - 1, this.column - 1);
    }
}
exports.QueryLocation = QueryLocation;
/**
 * An abstract class that contains common implementations of properties/methods shared by different
 * kinds of query result items.
 */
class QueryResultItem {
    /**
     * Initializes a new query result item from the given XML node.
     *
     * @param node A JavaScript object that was parsed from the query's XML output.
     */
    constructor(node) {
        this.node = node;
    }
    /**
     * The absolute file system path to the BUILD file where the query result item is defined, along
     * with the line and column number in that file.
     */
    get location() {
        return new QueryLocation(this.node["$"]["location"]);
    }
    /** The full package-qualified name of the build target that this item represents. */
    get name() {
        return this.node["$"]["name"];
    }
    /** Sorts the given array of query result items lexicographically based on their names. */
    static sortByName(items) {
        items.sort((a, b) => {
            const aName = a.name;
            const bName = b.name;
            if (aName < bName) {
                return -1;
            }
            if (aName > bName) {
                return 1;
            }
            return 0;
        });
    }
}
exports.QueryResultItem = QueryResultItem;
/** Represents a build target that was created by instantiation of a build rule. */
class QueriedRule extends QueryResultItem {
    /** The name of the build rule used to instantiate this target. */
    get ruleClass() {
        return this.node["$"]["class"];
    }
}
exports.QueriedRule = QueriedRule;
/** Represents a build target that represents a source file in a queried package. */
class QueriedSourceFile extends QueryResultItem {
}
exports.QueriedSourceFile = QueriedSourceFile;
//# sourceMappingURL=query.js.map