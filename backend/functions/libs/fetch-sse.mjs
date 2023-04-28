var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { createParser } from "eventsource-parser";
import * as types from "./types.mjs";
import { fetch as globalFetch } from "./fetch.mjs";
function streamAsyncIterable(stream) {
    return __asyncGenerator(this, arguments, function* streamAsyncIterable_1() {
        const reader = stream.getReader();
        try {
            while (true) {
                const { done, value } = yield __await(reader.read());
                if (done) {
                    return yield __await(void 0);
                }
                yield yield __await(value);
            }
        }
        finally {
            reader.releaseLock();
        }
    });
}
export function fetchSSE(url, options, fetch = globalFetch) {
    var _a, e_1, _b, _c;
    var _d;
    return __awaiter(this, void 0, void 0, function* () {
        const { onMessage, onError } = options, fetchOptions = __rest(options, ["onMessage", "onError"]);
        const res = yield fetch(url, fetchOptions);
        if (!res.ok) {
            let reason;
            try {
                reason = yield res.text();
            }
            catch (err) {
                reason = res.statusText;
            }
            const msg = `ChatGPT error ${res.status}: ${reason}`;
            const error = new types.ChatGPTError(msg);
            error.statusCode = res.status;
            error.statusText = res.statusText;
            throw error;
        }
        const parser = createParser((event) => {
            if (event.type === "event") {
                onMessage(event.data);
            }
        });
        // handle special response errors
        const feed = (chunk) => {
            var _a;
            let response = null;
            try {
                response = JSON.parse(chunk);
            }
            catch (_b) {
                // ignore
            }
            if (((_a = response === null || response === void 0 ? void 0 : response.detail) === null || _a === void 0 ? void 0 : _a.type) === "invalid_request_error") {
                const msg = `ChatGPT error ${response.detail.message}: ${response.detail.code} (${response.detail.type})`;
                const error = new types.ChatGPTError(msg);
                error.statusCode = response.detail.code;
                error.statusText = response.detail.message;
                if (onError) {
                    onError(error);
                }
                else {
                    console.error(error);
                }
                // don't feed to the event parser
                return;
            }
            parser.feed(chunk);
        };
        if (!((_d = res.body) === null || _d === void 0 ? void 0 : _d.getReader)) {
            // Vercel polyfills `fetch` with `node-fetch`, which doesn't conform to
            // web standards, so this is a workaround...
            const body = res.body;
            if (!body.on || !body.read) {
                throw new types.ChatGPTError('unsupported "fetch" implementation');
            }
            body.on("readable", () => {
                let chunk;
                while (null !== (chunk = body.read())) {
                    feed(chunk.toString());
                }
            });
        }
        else {
            try {
                for (var _e = true, _f = __asyncValues(streamAsyncIterable(res.body)), _g; _g = yield _f.next(), _a = _g.done, !_a;) {
                    _c = _g.value;
                    _e = false;
                    try {
                        const chunk = _c;
                        const str = new TextDecoder().decode(chunk);
                        feed(str);
                    }
                    finally {
                        _e = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_e && !_a && (_b = _f.return)) yield _b.call(_f);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    });
}
//# sourceMappingURL=fetch-sse.js.map