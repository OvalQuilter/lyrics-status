"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusixmatchSource = void 0;
const BaseSource_1 = require("./BaseSource");
const Settings_1 = require("../Settings");
const Debug_1 = require("../Debug");
const { SyncLyrics } = require("@stef-0012/synclyrics");

class MusixmatchSource extends BaseSource_1.BaseSource {
    constructor() {
        super(...arguments);
        this._manager = new SyncLyrics({
            logLevel: "none",
            sources: ["musixmatch"],
            saveMusixmatchToken: (tokenData) => {
                try {
                    Settings_1.Settings.credentials.musixmatchToken = JSON.stringify(tokenData);
                    Settings_1.Settings.save();
                    Debug_1.Debug.write("[MusixmatchSource] Token saved via SyncLyrics.");
                } catch (e) {
                    Debug_1.Debug.write("[MusixmatchSource] Failed to save token: " + e);
                }
            },
            getMusixmatchToken: () => {
                const raw = Settings_1.Settings.credentials.musixmatchToken;
                if (!raw || !raw.trim()) return null;
                try {
                    const parsed = JSON.parse(raw);
                    // Must be an object with at least a usertoken field
                    if (parsed && typeof parsed === "object" && parsed.usertoken) return parsed;
                } catch (_) {}
                // Plain string token from old config — not a valid tokenData object
                return null;
            }
        });
    }

    async getLyrics(name, artist) {
        const result = await this._manager.getLyrics({ track: name, artist });
        if (!result) throw new Error("Musixmatch: no result returned");
        const lineSynced = result.lyrics && result.lyrics.lineSynced;
        if (!lineSynced) throw new Error("Musixmatch: no synced lyrics available");
        const parsed = lineSynced.parse();
        if (!parsed || parsed.length === 0) throw new Error("Musixmatch: parsed lyrics empty");
        Debug_1.Debug.write(`[MusixmatchSource] Got ${parsed.length} lines for "${name}"`);
        return {
            lines: parsed.map(l => ({ time: Math.round(l.time * 1000), text: l.text }))
        };
    }

    getAppName() { return "Musixmatch"; }
}
exports.MusixmatchSource = MusixmatchSource;
