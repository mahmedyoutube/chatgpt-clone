// register.js
const fetch = require("node-fetch");

if (typeof fetch !== "undefined") {
  throw new Error(
    "fetch is already defined. This environment may already provide and implementation of fetch."
  );
}

if (typeof globalThis === "object") {
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
  globalThis.fetch = fetch;
} else if (typeof global === "object") {
  // For Node <12
  global.fetch = fetch;
} else {
  // Everything else is not supported
  throw new Error("Unknown JavaScript environment: Not supported");
}
