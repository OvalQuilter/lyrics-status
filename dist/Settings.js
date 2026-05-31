"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const { readFileSync, writeFileSync } = require("node:fs");
const Debug_1 = require("./Debug");

class Settings {
    static save() {
        try {
            writeFileSync("./settings.json", JSON.stringify(
                Object.fromEntries(Settings._KEYS.map(k => [k, this[k]]))
            ));
        } catch (e) {
            console.error("[lyrics-status] Failed to save settings.json:", e.message);
            Debug_1.Debug.write("Failed to save settings.json: " + e.stack);
        }
    }
    static load() {
        let d;
        try { d = JSON.parse(readFileSync("./settings.json").toString()); }
        catch (e) {
            console.warn("[lyrics-status] Could not read settings.json — using defaults. (" + e.message + ")");
            Debug_1.Debug.write("Failed to read settings.json: " + e.stack);
            return;
        }
        for (const k of Settings._KEYS) {
            if (d[k] == null) continue;
            if (typeof this[k] === "object" && !Array.isArray(this[k])) {
                this[k] = { ...this[k], ...d[k] };
                if (k === "view" && d[k].advanced) this[k].advanced = { ...this.view.advanced, ...d[k].advanced };
                if (k === "richPresence") this[k] = { ...Settings.richPresence, ...d[k] };
            } else this[k] = d[k];
        }
    }
}
Settings._KEYS = ["credentials","view","timings","update","rateLimit","sources","cache","chineseConversion","restore","gateway","statusFlash","richPresence"];
exports.Settings = Settings;
Settings.credentials = { token:"", cookies:"", musixmatchToken:"", spotifyWebToken:"", spotifyWebTokenExpiry:0, clientID:"", clientSecret:"", useExternalAuthServer:"", code:"", refreshToken:"", uuid:"", customRedirectUri:"", useDealer:true };
Settings.view = { timestamp:true, label:true, advanced:{ enabled:false, customEmoji:"\uD83C\uDFB6", customStatus:"[{timestamp}] [{lyrics}]", unicodeStyle:"none", styleAlternateEnabled:false, styleAlternateIntervalMs:3000, styleAlternateStyleA:"bold", styleAlternateStyleB:"italic" } };
Settings.timings = { sendTimeOffset:500, enableAutooffset:true, autooffset:3 };
Settings.update = { enableAutoupdate:true };
Settings.rateLimit = { enableBackoff:true, enableMinInterval:true, minIntervalMs:5000, enableMergeLines:true, mergeWindowMs:8000, mergeSeparator:" " };
Settings.sources = { enableSpotify:true, enableMusixmatch:true, enableLrcLib:true, enableNetEase:true, enableQQMusic:true, enableGenius:true, sourceOrder:["Spotify","Musixmatch","LrcLib","NetEase","QQMusic","Genius"] };
Settings.cache = { path:"", lyricsTtlDays:30, emptyTtlDays:7, errorTtlHours:1, maxRows:2000 };
Settings.chineseConversion = "off";
Settings.restore = { enabled:true, savedStatus:null, delayMs:15000 };
Settings.gateway = { enabled:false, presenceStatus:"online", minGwIntervalMs:5000 };
Settings.statusFlash = { enabled:false, states:["online","idle","dnd"], intervalMs:2000, restoreStatus:null };
Settings.richPresence = { enabled:false, appName:"Spotify", showAlbumArt:true, albumArtUrl:"", showProgressBar:true, buttonLabel:"", buttonUrl:"", detailsTemplate:"{lyrics}", stateTemplate:"{song_author}" };
