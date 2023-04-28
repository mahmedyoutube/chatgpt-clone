var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Keyv from "keyv";
import pTimeout from "./pTimout.mjs";
import QuickLRU from "quick-lru";
import { v4 as uuidv4 } from "uuid";
import * as tokenizer from "./tokenizer.mjs";
import * as types from "./types.mjs";
import { fetchSSE } from "./fetch-sse.mjs";
import { fetch as globalFetch } from "./fetch.mjs";
const CHATGPT_MODEL = "gpt-3.5-turbo";
const USER_LABEL_DEFAULT = "User";
const ASSISTANT_LABEL_DEFAULT = "ChatGPT";
export class ChatGPTAPI {
    /**
     * Creates a new client wrapper around OpenAI's chat completion API, mimicing the official ChatGPT webapp's functionality as closely as possible.
     *
     * @param apiKey - OpenAI API key (required).
     * @param apiOrg - Optional OpenAI API organization (optional).
     * @param apiBaseUrl - Optional override for the OpenAI API base URL.
     * @param debug - Optional enables logging debugging info to stdout.
     * @param completionParams - Param overrides to send to the [OpenAI chat completion API](https://platform.openai.com/docs/api-reference/chat/create). Options like `temperature` and `presence_penalty` can be tweaked to change the personality of the assistant.
     * @param maxModelTokens - Optional override for the maximum number of tokens allowed by the model's context. Defaults to 4096.
     * @param maxResponseTokens - Optional override for the minimum number of tokens allowed for the model's response. Defaults to 1000.
     * @param messageStore - Optional [Keyv](https://github.com/jaredwray/keyv) store to persist chat messages to. If not provided, messages will be lost when the process exits.
     * @param getMessageById - Optional function to retrieve a message by its ID. If not provided, the default implementation will be used (using an in-memory `messageStore`).
     * @param upsertMessage - Optional function to insert or update a message. If not provided, the default implementation will be used (using an in-memory `messageStore`).
     * @param fetch - Optional override for the `fetch` implementation to use. Defaults to the global `fetch` function.
     */
    constructor(opts) {
        const { apiKey, apiOrg, apiBaseUrl = "https://api.openai.com/v1", debug = false, messageStore, completionParams, systemMessage, maxModelTokens = 4000, maxResponseTokens = 1000, getMessageById, upsertMessage, fetch = globalFetch, } = opts;
        this._apiKey = apiKey;
        this._apiOrg = apiOrg;
        this._apiBaseUrl = apiBaseUrl;
        this._debug = !!debug;
        this._fetch = fetch;
        this._completionParams = Object.assign({ model: CHATGPT_MODEL, temperature: 0.8, top_p: 1.0, presence_penalty: 1.0 }, completionParams);
        //@ts-ignore
        this._systemMessage = systemMessage;
        if (this._systemMessage === undefined) {
            const currentDate = new Date().toISOString().split("T")[0];
            this._systemMessage = `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.\nKnowledge cutoff: 2021-09-01\nCurrent date: ${currentDate}`;
        }
        this._maxModelTokens = maxModelTokens;
        this._maxResponseTokens = maxResponseTokens;
        this._getMessageById = getMessageById !== null && getMessageById !== void 0 ? getMessageById : this._defaultGetMessageById;
        this._upsertMessage = upsertMessage !== null && upsertMessage !== void 0 ? upsertMessage : this._defaultUpsertMessage;
        if (messageStore) {
            this._messageStore = messageStore;
        }
        else {
            this._messageStore = new Keyv({
                store: new QuickLRU({ maxSize: 10000 }),
            });
        }
        if (!this._apiKey) {
            throw new Error("OpenAI missing required apiKey");
        }
        if (!this._fetch) {
            throw new Error("Invalid environment; fetch is not defined");
        }
        if (typeof this._fetch !== "function") {
            throw new Error('Invalid "fetch" is not a function');
        }
    }
    /**
     * Sends a message to the OpenAI chat completions endpoint, waits for the response
     * to resolve, and returns the response.
     *
     * If you want your response to have historical context, you must provide a valid `parentMessageId`.
     *
     * If you want to receive a stream of partial responses, use `opts.onProgress`.
     *
     * Set `debug: true` in the `ChatGPTAPI` constructor to log more info on the full prompt sent to the OpenAI chat completions API. You can override the `systemMessage` in `opts` to customize the assistant's instructions.
     *
     * @param message - The prompt message to send
     * @param opts.parentMessageId - Optional ID of the previous message in the conversation (defaults to `undefined`)
     * @param opts.conversationId - Optional ID of the conversation (defaults to `undefined`)
     * @param opts.messageId - Optional ID of the message to send (defaults to a random UUID)
     * @param opts.systemMessage - Optional override for the chat "system message" which acts as instructions to the model (defaults to the ChatGPT system message)
     * @param opts.timeoutMs - Optional timeout in milliseconds (defaults to no timeout)
     * @param opts.onProgress - Optional callback which will be invoked every time the partial response is updated
     * @param opts.abortSignal - Optional callback used to abort the underlying `fetch` call using an [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
     * @param completionParams - Optional overrides to send to the [OpenAI chat completion API](https://platform.openai.com/docs/api-reference/chat/create). Options like `temperature` and `presence_penalty` can be tweaked to change the personality of the assistant.
     *
     * @returns The response from ChatGPT
     */
    sendMessage(text, opts = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { parentMessageId, messageId = uuidv4(), timeoutMs, onProgress, stream = onProgress ? true : false, completionParams, conversationId, } = opts;
            let { abortSignal } = opts;
            //@ts-ignore
            let abortController = null;
            if (timeoutMs && !abortSignal) {
                abortController = new AbortController();
                abortSignal = abortController.signal;
            }
            const message = {
                role: "user",
                id: messageId,
                conversationId,
                parentMessageId,
                text,
            };
            const latestQuestion = message;
            const { messages, maxTokens, numTokens } = yield this._buildMessages(text, opts);
            const result = {
                role: "assistant",
                id: uuidv4(),
                conversationId,
                parentMessageId: messageId,
                text: "",
            };
            const responseP = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const url = `${this._apiBaseUrl}/chat/completions`;
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this._apiKey}`,
                };
                const body = Object.assign(Object.assign(Object.assign({ max_tokens: maxTokens }, this._completionParams), completionParams), { messages,
                    stream });
                // Support multiple organizations
                // See https://platform.openai.com/docs/api-reference/authentication
                if (this._apiOrg) {
                    //@ts-ignore
                    headers["OpenAI-Organization"] = this._apiOrg;
                }
                if (this._debug) {
                    console.log(`sendMessage (${numTokens} tokens)`, body);
                }
                if (stream) {
                    fetchSSE(url, {
                        method: "POST",
                        headers,
                        body: JSON.stringify(body),
                        signal: abortSignal,
                        onMessage: (data) => {
                            var _a;
                            if (data === "[DONE]") {
                                result.text = result.text.trim();
                                return resolve(result);
                            }
                            try {
                                const response = JSON.parse(data);
                                if (response.id) {
                                    result.id = response.id;
                                }
                                if ((_a = response.choices) === null || _a === void 0 ? void 0 : _a.length) {
                                    const delta = response.choices[0].delta;
                                    result.delta = delta.content;
                                    if (delta === null || delta === void 0 ? void 0 : delta.content)
                                        result.text += delta.content;
                                    if (delta.role) {
                                        result.role = delta.role;
                                    }
                                    //@ts-ignore
                                    result.detail = response;
                                    onProgress === null || onProgress === void 0 ? void 0 : onProgress(result);
                                }
                            }
                            catch (err) {
                                console.warn("OpenAI stream SEE event unexpected error", err);
                                return reject(err);
                            }
                        },
                    }, this._fetch).catch(reject);
                }
                else {
                    try {
                        const res = yield this._fetch(url, {
                            method: "POST",
                            headers,
                            body: JSON.stringify(body),
                            signal: abortSignal,
                        });
                        if (!res.ok) {
                            const reason = yield res.text();
                            const msg = `OpenAI error ${res.status || res.statusText}: ${reason}`;
                            //@ts-ignore
                            const error = new types.ChatGPTError(msg, { cause: res });
                            error.statusCode = res.status;
                            error.statusText = res.statusText;
                            return reject(error);
                        }
                        const response = yield res.json();
                        if (this._debug) {
                            console.log(response);
                        }
                        if (response === null || response === void 0 ? void 0 : response.id) {
                            result.id = response.id;
                        }
                        if ((_a = response === null || response === void 0 ? void 0 : response.choices) === null || _a === void 0 ? void 0 : _a.length) {
                            const message = response.choices[0].message;
                            //@ts-ignore
                            result.text = message.content;
                            //@ts-ignore
                            if (message.role) {
                                //@ts-ignore
                                result.role = message.role;
                            }
                        }
                        else {
                            const res = response;
                            return reject(new Error(`OpenAI error: ${((_b = res === null || res === void 0 ? void 0 : res.detail) === null || _b === void 0 ? void 0 : _b.message) || (res === null || res === void 0 ? void 0 : res.detail) || "unknown"}`));
                        }
                        result.detail = response;
                        return resolve(result);
                    }
                    catch (err) {
                        return reject(err);
                    }
                }
            })).then((message) => __awaiter(this, void 0, void 0, function* () {
                if (message.detail && !message.detail.usage) {
                    try {
                        const promptTokens = numTokens;
                        const completionTokens = yield this._getTokenCount(message.text);
                        message.detail.usage = {
                            prompt_tokens: promptTokens,
                            completion_tokens: completionTokens,
                            total_tokens: promptTokens + completionTokens,
                            estimated: true,
                        };
                    }
                    catch (err) {
                        // TODO: this should really never happen, but if it does,
                        // we should handle notify the user gracefully
                    }
                }
                return Promise.all([
                    this._upsertMessage(latestQuestion),
                    this._upsertMessage(message),
                ]).then(() => message);
            }));
            if (timeoutMs) {
                if (abortController) {
                    // This will be called when a timeout occurs in order for us to forcibly
                    // ensure that the underlying HTTP request is aborted.
                    responseP.cancel = () => {
                        abortController.abort();
                    };
                }
                //@ts-ignore
                return pTimeout(responseP, {
                    milliseconds: timeoutMs,
                    message: "OpenAI timed out waiting for response",
                });
            }
            else {
                return responseP;
            }
        });
    }
    get apiKey() {
        return this._apiKey;
    }
    set apiKey(apiKey) {
        this._apiKey = apiKey;
    }
    get apiOrg() {
        //@ts-ignore
        return this._apiOrg;
    }
    set apiOrg(apiOrg) {
        this._apiOrg = apiOrg;
    }
    _buildMessages(text, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const { systemMessage = this._systemMessage } = opts;
            let { parentMessageId } = opts;
            const userLabel = USER_LABEL_DEFAULT;
            const assistantLabel = ASSISTANT_LABEL_DEFAULT;
            const maxNumTokens = this._maxModelTokens - this._maxResponseTokens;
            let messages = [];
            if (systemMessage) {
                messages.push({
                    role: "system",
                    content: systemMessage,
                });
            }
            const systemMessageOffset = messages.length;
            let nextMessages = text
                ? messages.concat([
                    {
                        role: "user",
                        content: text,
                        name: opts.name,
                    },
                ])
                : messages;
            let numTokens = 0;
            do {
                const prompt = nextMessages
                    .reduce((prompt, message) => {
                    switch (message.role) {
                        case "system":
                            return prompt.concat([`Instructions:\n${message.content}`]);
                        case "user":
                            return prompt.concat([`${userLabel}:\n${message.content}`]);
                        default:
                            return prompt.concat([`${assistantLabel}:\n${message.content}`]);
                    }
                }, [])
                    .join("\n\n");
                const nextNumTokensEstimate = yield this._getTokenCount(prompt);
                const isValidPrompt = nextNumTokensEstimate <= maxNumTokens;
                if (prompt && !isValidPrompt) {
                    break;
                }
                messages = nextMessages;
                numTokens = nextNumTokensEstimate;
                if (!isValidPrompt) {
                    break;
                }
                if (!parentMessageId) {
                    break;
                }
                const parentMessage = yield this._getMessageById(parentMessageId);
                if (!parentMessage) {
                    break;
                }
                const parentMessageRole = parentMessage.role || "user";
                nextMessages = nextMessages.slice(0, systemMessageOffset).concat([
                    {
                        role: parentMessageRole,
                        content: parentMessage.text,
                        name: parentMessage.name,
                    },
                    ...nextMessages.slice(systemMessageOffset),
                ]);
                parentMessageId = parentMessage.parentMessageId;
            } while (true);
            // Use up to 4096 tokens (prompt + response), but try to leave 1000 tokens
            // for the response.
            const maxTokens = Math.max(1, Math.min(this._maxModelTokens - numTokens, this._maxResponseTokens));
            return { messages, maxTokens, numTokens };
        });
    }
    _getTokenCount(text) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: use a better fix in the tokenizer
            text = text.replace(/<\|endoftext\|>/g, "");
            return tokenizer.encode(text).length;
        });
    }
    _defaultGetMessageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._messageStore.get(id);
            //@ts-ignore
            return res;
        });
    }
    _defaultUpsertMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._messageStore.set(message.id, message);
        });
    }
}
//# sourceMappingURL=ChatGpt.js.map