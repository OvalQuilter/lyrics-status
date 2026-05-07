"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debug = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class Debug {
    static write(text) {
        const date = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        (0, fs_1.appendFileSync)((0, path_1.join)(this.path, "log.txt"), `[${date}]: ${text}\n`);
    }
}
exports.Debug = Debug;
Debug.path = "./";
(0, fs_1.unlink)((0, path_1.join)(Debug.path, "log.txt"), () => { });
