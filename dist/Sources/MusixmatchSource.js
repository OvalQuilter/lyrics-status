"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusixmatchSource = void 0;
const Settings_1 = require("../Settings");
const Debug_1 = require("../Debug");
const { SyncLyrics } = require("@stef-0012/synclyrics");

class MusixmatchSource {
    constructor() {
        this._manager = new SyncLyrics({
            logLevel: "none", sources: ["musixmatch"],
            saveMusixmatchToken: t => { try { Settings_1.Settings.credentials.musixmatchToken = JSON.stringify(t); Settings_1.Settings.save(); Debug_1.Debug.write("[MusixmatchSource] Token saved."); } catch (e) { Debug_1.Debug.write("[MusixmatchSource] Token save failed: " + e); } },
            getMusixmatchToken: () => { const raw = Settings_1.Settings.credentials.musixmatchToken; if (!raw?.trim()) return null; try { const p = JSON.parse(raw); return p?.usertoken ? p : null; } catch { return null; } }
        });
    }
    async getLyrics(name, artist) {
        const result = await this._manager.getLyrics({ track: name, artist });
        if (!result) throw new Error("Musixmatch: no result");
        const parsed = result.lyrics?.lineSynced?.parse();
        if (!parsed?.length) throw new Error("Musixmatch: no synced lyrics");
        Debug_1.Debug.write(`[MusixmatchSource] Got ${parsed.length} lines for "${name}"`);
        return { lines: parsed.map(l => ({ time: Math.round(l.time * 1000), text: l.text })) };
    }
    getAppName() { return "Musixmatch"; }
}
exports.MusixmatchSource = MusixmatchSource;
