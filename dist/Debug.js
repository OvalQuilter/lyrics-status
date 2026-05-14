"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debug = void 0;
const { appendFileSync, unlink } = require("fs");
const { join } = require("path");
const LOG = join("./", "log.txt");
unlink(LOG, () => {});
class Debug {
    static write(text) {
        appendFileSync(LOG, `[${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}]: ${text}\n`);
    }
}
exports.Debug = Debug;
Debug.path = "./";
