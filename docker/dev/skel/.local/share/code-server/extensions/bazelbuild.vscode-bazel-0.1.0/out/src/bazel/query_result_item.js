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
const queried_rule_1 = require("./queried_rule");
/**
 * Represents a build target that was created by instantiation of a build rule.
 */
class QueriedRule extends queried_rule_1.QueryResultItem {
    /** The name of the build rule used to instantiate this target. */
    get ruleClass() {
        return this.node.$.class;
    }
}
exports.QueriedRule = QueriedRule;
//# sourceMappingURL=query_result_item.js.map