"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const { readFileSync, writeFileSync } = require("node:fs");
const Debug_1 = require("./Debug");

class Settings {
    static save() {
        writeFileSync("./settings.json", JSON.stringify(
            Object.fromEntries(Settings._KEYS.map(k => [k, this[k]]))
        ));
    }
    static load() {
        let d;
        try { d = JSON.parse(readFileSync("./settings.json").toString()); }
        catch (e) { Debug_1.Debug.write("Failed to read settings.json: " + e.stack); return; }
        for (const k of Settings._KEYS) {
            if (d[k] == null) continue;
            if (typeof this[k] === "object" && !Array.isArray(this[k])) {
                this[k] = { ...this[k], ...d[k] };
                if (k === "view" && d[k].advanced) this[k].advanced = { ...this.view.advanced, ...d[k].advanced };
            } else this[k] = d[k];
        }
    }
}
Settings._KEYS = ["credentials","view","timings","update","rateLimit","sources","chineseConversion","restore","gateway"];
exports.Settings = Settings;
Settings.credentials = { token:"", cookies:"", musixmatchToken:"", spotifyWebToken:"", spotifyWebTokenExpiry:0, clientID:"", clientSecret:"", useExternalAuthServer:"", code:"", refreshToken:"", uuid:"", customRedirectUri:"" };
Settings.view = { timestamp:true, label:true, advanced:{ enabled:false, customEmoji:"\uD83C\uDFB6", customStatus:"[{timestamp}] [{lyrics}]" } };
Settings.timings = { sendTimeOffset:500, enableAutooffset:true, autooffset:3 };
Settings.update = { enableAutoupdate:true };
Settings.rateLimit = { enableBackoff:true, enableMinInterval:true, minIntervalMs:5000, enableMergeLines:true, mergeWindowMs:8000 };
Settings.sources = { enableSpotify:true, enableMusixmatch:true, enableLrcLib:true, enableNetEase:true, enableQQMusic:true, sourceOrder:["Spotify","Musixmatch","LrcLib","NetEase","QQMusic"] };
Settings.chineseConversion = "off";
Settings.restore = { enabled:true, savedStatus:null, delayMs:15000 };
// presenceStatus: "online" | "idle" | "dnd" — used in gateway op3 status field
Settings.gateway = { enabled:false, presenceStatus:"online" };
