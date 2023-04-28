import { get_encoding } from "@dqbd/tiktoken";
// TODO: make this configurable
const tokenizer = get_encoding("cl100k_base");
export function encode(input) {
    return tokenizer.encode(input);
}
//# sourceMappingURL=tokenizer.js.map