"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const node_fs_1 = require("node:fs");
const Debug_1 = require("./Debug");
// ─── Settings ─────────────────────────────────────────────────────────────────
/**
 * Static configuration store. Loaded from `settings.json` on startup and
 * persisted back whenever the user saves from the web panel.
 */
class Settings {
    // ── Persistence ───────────────────────────────────────────────────────────
    static save() {
        (0, node_fs_1.writeFileSync)("./settings.json", JSON.stringify({
            credentials: this.credentials,
            view: this.view,
            timings: this.timings,
            update: this.update,
        }, null, 2));
    }
    static load() {
        var _a, _b;
        let saved;
        try {
            saved = JSON.parse((0, node_fs_1.readFileSync)("./settings.json", "utf-8"));
        }
        catch (e) {
            Debug_1.Debug.write(`Could not read settings.json, using defaults. Error: ${e.stack}`);
        }
        if (!saved)
            return;
        // Migrate: old settings had many Spotify credential fields — pick only what we need
        if (saved.credentials && typeof saved.credentials === "object") {
            const creds = saved.credentials;
            this.credentials.token = (_a = creds.token) !== null && _a !== void 0 ? _a : "";
            this.credentials.uuid = (_b = creds.uuid) !== null && _b !== void 0 ? _b : "";
        }
        if (saved.view)
            this.view = Object.assign(Object.assign({}, this.view), saved.view);
        if (saved.timings)
            this.timings = Object.assign(Object.assign({}, this.timings), saved.timings);
        if (saved.update)
            this.update = Object.assign(Object.assign({}, this.update), saved.update);
    }
}
exports.Settings = Settings;
/** Discord user token — used both to update the custom status and to
 *  retrieve the Spotify access token from Discord's connections API. */
Settings.credentials = {
    token: "",
    uuid: "",
};
Settings.view = {
    /** Prepend `[m:ss]` to the status text. */
    timestamp: true,
    /** Prepend `Song lyrics -` to the status text. */
    label: true,
    advanced: {
        /** When true, `customStatus` is used instead of the simple format. */
        enabled: false,
        /** Emoji shown next to the status. Empty string = no emoji. */
        customEmoji: "🎶",
        customStatus: "[{timestamp}] [{lyrics}]",
    },
};
Settings.timings = {
    /** Fixed ms to send the status update ahead of the lyric timestamp. */
    sendTimeOffset: 500,
    /** When true, offset is calculated automatically from API latency. */
    enableAutooffset: true,
    /** Number of samples used for the autooffset average. */
    autooffset: 3,
};
Settings.update = {
    enableAutoupdate: true,
};
