"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const node_fs_1 = require("node:fs");
const Debug_1 = require("./Debug");
class Settings {
    static save() {
        (0, node_fs_1.writeFileSync)("./settings.json", JSON.stringify({
            credentials: this.credentials,
            view: this.view,
            timings: this.timings
        }));
    }
    static load() {
        let settings;
        try {
            settings = JSON.parse((0, node_fs_1.readFileSync)("./settings.json").toString());
        }
        catch (e) {
            Debug_1.Debug.write("An error occurred while trying to read settings from file. Using defaults. Error: " + e.stack);
        }
        if (settings) {
            this.credentials = settings.credentials || this.credentials;
            this.view = settings.view || this.view;
            this.timings = settings.timings || this.timings;
        }
    }
}
exports.Settings = Settings;
Settings.credentials = {
    token: "",
    cookies: ""
};
Settings.view = {
    timestamp: true,
    label: true,
    advanced: {
        enabled: false,
        customEmoji: "🎶",
        customStatus: "[{timestamp}] [{lyrics}]"
    }
};
Settings.timings = {
    offset: 500,
    enableAutooffset: true
};
