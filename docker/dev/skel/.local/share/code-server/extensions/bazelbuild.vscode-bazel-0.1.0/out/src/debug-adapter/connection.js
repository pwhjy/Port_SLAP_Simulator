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
const events_1 = require("events");
const net = require("net");
const protobuf = require("protobufjs");
const protos_1 = require("../protos");
/**
 * Manages the connection between the debug adapter and the debugging server
 * running in Bazel.
 *
 * This class acts as a Node event emitter for asynchronous events from the
 * server, and provides a Promise-based API for handling responses from
 * requests.
 */
class BazelDebugConnection extends events_1.EventEmitter {
    /**
     * Initializes a new debug connection and connects to the server.
     *
     * @param host The host name to connect to.
     * @param port The port number to connect to.
     */
    constructor(host, port, logger) {
        super();
        this.logger = logger;
        /**
         * A monotonically increasing sequence number used to uniquely identify
         * requests.
         */
        this.sequenceNumber = 1;
        /**
         * Keeps track of promises for responses that have not yet been received from
         * the server.
         *
         * When the debug adapter sends a request to Bazel, a promise for the response
         * is created and the resolve function for that promise is stored in this map,
         * keyed by the sequence number of the request. Then, when the response with
         * the matching sequence number is received from the server, we can look up
         * the resolver, call it, and continue execution of the client code waiting on
         * the promise.
         */
        this.pendingResolvers = new Map();
        this.buffer = null;
        this.tryToConnect(host, port);
    }
    /**
     * Sends a request to the Bazel debug server and returns a promise for its
     * response.
     *
     * @param options The options for the request. The sequence number will be
     *     populated by this method.
     * @returns A {@code Promise} for the response to the request.
     */
    sendRequest(options) {
        options.sequenceNumber = this.sequenceNumber++;
        const promise = new Promise((resolve) => {
            this.pendingResolvers.set(options.sequenceNumber.toString(), resolve);
        });
        const request = protos_1.skylark_debugging.DebugRequest.create(options);
        const writer = protos_1.skylark_debugging.DebugRequest.encodeDelimited(request);
        const bytes = writer.finish();
        this.socket.write(bytes);
        return promise;
    }
    /**
     * Makes an attempt to connect to the Bazel debug server.
     *
     * If the connection is not successful (for example, if Bazel is still
     * starting up and has not opened the socket yet), this function will wait one
     * second and make another attempt, up to a total of five attempts. If the
     * fifth attempt is unsuccessful, an error will be thrown.
     *
     * @param host The host name to connect to.
     * @param port The port number to connect to.
     * @param attempt The number of the attempt being made. Defaults to 1.
     */
    tryToConnect(host, port, attempt = 1) {
        const socket = new net.Socket()
            .on("connect", () => {
            this.socket = socket;
            socket.on("data", (chunk) => {
                this.consumeChunk(chunk);
            });
            this.emit("connect");
        })
            .on("error", (error) => {
            if (attempt <= 5) {
                setTimeout(() => {
                    this.tryToConnect(host, port, attempt + 1);
                }, 1000);
            }
            else {
                this.logger("Could not connect to Bazel debug server after 5 seconds");
                // TODO(allevato): Improve the error case.
                throw error;
            }
        });
        socket.connect(port, host);
    }
    /**
     * Consumes a chunk of data from the socket and decodes an event/response out
     * of the data received so far, if possible.
     *
     * If there is not enough data in the buffer for a full event, this method
     * tracks the chunk and then the connection waits for more data to try to
     * decode again.
     *
     * @param chunk A chunk of bytes from the socket.
     */
    consumeChunk(chunk) {
        let event = null;
        this.append(chunk);
        while (true) {
            try {
                event = protos_1.skylark_debugging.DebugEvent.decodeDelimited(this.reader);
            }
            catch (err) {
                // This occurs if there is a partial message in the buffer; stop reading
                // and wait for more data.
                return;
            }
            this.collapse();
            // Do the right thing whether the sequence number comes in as either a
            // number or a Long (which is an object with separate low/high ints.)
            if (event.sequenceNumber.toString() !== "0") {
                const handler = this.pendingResolvers.get(event.sequenceNumber.toString());
                if (handler) {
                    this.pendingResolvers.delete(event.sequenceNumber.toString());
                    handler(event);
                }
            }
            else {
                this.emit("event", event);
            }
        }
    }
    /** Appends a chunk of data to the buffer, resizing it as needed. */
    append(chunk) {
        if (!this.buffer) {
            this.buffer = chunk;
        }
        else {
            // The reader's position indicates where it last stopped trying to read
            // data from the buffer. In the event of an unsuccessful read, this tells
            // us how much data is in the buffer.
            const pos = this.reader.pos;
            const newBuffer = Buffer.alloc(pos + chunk.byteLength);
            this.buffer.copy(newBuffer, 0);
            chunk.copy(newBuffer, pos);
            this.buffer = newBuffer;
        }
        this.reader = protobuf.Reader.create(this.buffer);
    }
    /** Collapses the buffer so that any data already read is removed. */
    collapse() {
        this.buffer = this.buffer.slice(this.reader.pos);
        this.reader = protobuf.Reader.create(this.buffer);
    }
}
exports.BazelDebugConnection = BazelDebugConnection;
//# sourceMappingURL=connection.js.map