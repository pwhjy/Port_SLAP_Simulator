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
Object.defineProperty(exports, "__esModule", { value: true });
const xml2js = require("xml2js");
const queried_rule_1 = require("./queried_rule");
const queried_source_file_1 = require("./queried_source_file");
const query_result_item_1 = require("./query_result_item");
/** Contains the structured results of a Bazel query. */
class QueryResult {
    /**
     * Intializes a new Bazel query result from the given XML output.
     *
     * @param xmlString The XML output of a {@code bazel query}. This string may
     *     be empty, in which case the results are empty as well.
     */
    constructor(xmlString) {
        if (xmlString.length === 0) {
            this.rules = [];
            this.sourceFiles = [];
            return;
        }
        let queryResult = {};
        xml2js.parseString(xmlString, (err, result) => {
            queryResult = result;
        });
        const queryNode = queryResult.query;
        this.rules = (queryNode.rule || []).map((ruleNode) => {
            return new query_result_item_1.QueriedRule(ruleNode);
        });
        queried_rule_1.QueryResultItem.sortByName(this.rules);
        // TODO(allevato): These will only be returned if we do a ":*" query, not a
        // "/..." query. Determine if we want to surface these in the build target
        // view.
        this.sourceFiles = (queryNode["source-file"] || []).map((sourceFileNode) => {
            return new queried_source_file_1.QueriedSourceFile(sourceFileNode);
        });
        queried_rule_1.QueryResultItem.sortByName(this.sourceFiles);
    }
}
exports.QueryResult = QueryResult;
//# sourceMappingURL=query_result.js.map