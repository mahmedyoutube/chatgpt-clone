var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class TimeoutError extends Error {
    //@ts-ignore
    constructor(message) {
        super(message);
        this.name = "TimeoutError";
    }
}
/**
An error to be thrown when the request is aborted by AbortController.
DOMException is thrown instead of this Error when DOMException is available.
*/
export class AbortError extends Error {
    //@ts-ignore
    constructor(message) {
        super();
        this.name = "AbortError";
        this.message = message;
    }
}
/**
TODO: Remove AbortError and just throw DOMException when targeting Node 18.
*/
//@ts-ignore
const getDOMException = (errorMessage) => globalThis.DOMException === undefined
    ? new AbortError(errorMessage)
    : new DOMException(errorMessage);
/**
TODO: Remove below function and just 'reject(signal.reason)' when targeting Node 18.
*/
//@ts-ignore
const getAbortedReason = (signal) => {
    const reason = signal.reason === undefined
        ? getDOMException("This operation was aborted.")
        : signal.reason;
    return reason instanceof Error ? reason : getDOMException(reason);
};
//@ts-ignore
export default function pTimeout(promise, options) {
    const { milliseconds, fallback, message, customTimers = { setTimeout, clearTimeout }, } = options;
    //@ts-ignore
    let timer;
    const cancelablePromise = new Promise((resolve, reject) => {
        if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
            throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
        }
        if (milliseconds === Number.POSITIVE_INFINITY) {
            resolve(promise);
            return;
        }
        if (options.signal) {
            const { signal } = options;
            if (signal.aborted) {
                reject(getAbortedReason(signal));
            }
            signal.addEventListener("abort", () => {
                reject(getAbortedReason(signal));
            });
        }
        // We create the error outside of `setTimeout` to preserve the stack trace.
        //@ts-ignore
        const timeoutError = new TimeoutError();
        timer = customTimers.setTimeout.call(undefined, () => {
            if (fallback) {
                try {
                    resolve(fallback());
                }
                catch (error) {
                    reject(error);
                }
                return;
            }
            if (typeof promise.cancel === "function") {
                promise.cancel();
            }
            if (message === false) {
                //@ts-ignore
                resolve();
            }
            else if (message instanceof Error) {
                reject(message);
            }
            else {
                timeoutError.message =
                    message !== null && message !== void 0 ? message : `Promise timed out after ${milliseconds} milliseconds`;
                reject(timeoutError);
            }
        }, milliseconds);
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                resolve(yield promise);
            }
            catch (error) {
                reject(error);
            }
            finally {
                customTimers.clearTimeout.call(undefined, timer);
            }
        }))();
    });
    //@ts-ignore
    cancelablePromise.clear = () => {
        //@ts-ignore
        customTimers.clearTimeout.call(undefined, timer);
        timer = undefined;
    };
    return cancelablePromise;
}
//# sourceMappingURL=pTimout.js.map