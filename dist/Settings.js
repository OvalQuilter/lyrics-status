
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const { readFileSync, writeFileSync, renameSync, existsSync, copyFileSync } = require("node:fs");
const { resolve } = require("node:path");
const SP = resolve(__dirname, "../settings.json");
const SPT = SP + ".tmp";
const SPB = SP + ".bak";
const Debug_1 = require("./Debug");

class Settings {
    static save() {
        if (Settings._saveTimer) return;
        Settings._saveTimer = setTimeout(() => { Settings._saveTimer = null; Settings._flushSave(); }, 300);
    }
    static _flushSave() {
        try {
            const data = JSON.stringify(Object.fromEntries(Settings._KEYS.map(k => [k, this[k]])));
            const tmpPath = SPT;
            writeFileSync(tmpPath, data);
            // Keep a backup of the last-known-good settings before overwriting
            if (existsSync(SP)) {
                try { copyFileSync(SP, SPB); } catch (_) {}
            }
            renameSync(tmpPath, SP);
        }
        catch (e) { console.error("[lyrics-status] Failed to save settings.json:", e.message); Debug_1.Debug.write("Failed to save settings.json: " + e.stack); }
    }
    static load() {
        let d;
        try { d = JSON.parse(readFileSync(SP).toString()); }
        catch (e) {
            // Primary file unreadable/corrupted — try the backup before giving up
            try {
                d = JSON.parse(readFileSync(SPB).toString());
                console.warn("[lyrics-status] settings.json was corrupted — recovered from settings.json.bak");
                Debug_1.Debug.write("settings.json corrupted (" + e.message + ") — recovered from backup");
            } catch (e2) {
                console.warn("[lyrics-status] Could not read settings.json — using defaults. (" + e.message + ")");
                Debug_1.Debug.write("Failed to read settings.json: " + e.stack);
                return;
            }
        }
        for (const k of Settings._KEYS) {
            if (d[k] == null) continue;
            if (typeof this[k] === "object" && !Array.isArray(this[k])) {
                if (typeof d[k] !== "object" || Array.isArray(d[k])) continue;
                this[k] = { ...this[k], ...d[k] };
                if (k === "view" && d[k].advanced) this[k].advanced = { ...Settings._viewAdvancedDefaults, ...d[k].advanced };
                if (k === "richPresence") this[k] = { ...Settings.richPresence, ...d[k] };
                if (k === "spotifyParty") this[k] = { ...Settings.spotifyParty, ...d[k] };
                if (k === "profileColor") this[k] = { ...Settings.profileColor, ...d[k] };
                if (k === "sources" && Array.isArray(this[k].sourceOrder)) { for (const s of Settings._defaultSourceOrder) if (!this[k].sourceOrder.includes(s)) this[k].sourceOrder.push(s); }
            } else this[k] = d[k];
        }
    }
}
Settings._saveTimer = null;
process.on("exit", () => { if (Settings._saveTimer) { clearTimeout(Settings._saveTimer); Settings._flushSave(); } });
Settings._KEYS = ["credentials","view","timings","update","rateLimit","sources","cache","chineseConversion","restore","gateway","statusFlash","richPresence","spotifyParty","profileColor","idle","gamePresence"];
exports.Settings = Settings;
Settings.credentials = { token:"", cookies:"", musixmatchToken:"", spotifyWebToken:"", spotifyWebTokenExpiry:0, oauthTokenExpiry:0, clientID:"", clientSecret:"", useExternalAuthServer:"", code:"", refreshToken:"", uuid:"", customRedirectUri:"", useDealer:true, useDiscordPresence:false };
Settings._viewAdvancedDefaults = { enabled:false, customEmoji:"\uD83C\uDFB6", customStatus:"[{timestamp}] [{lyrics}]", unicodeStyle:"none", styleAlternateEnabled:false, styleAlternateIntervalMs:3000, styleAlternateStyleA:"bold", styleAlternateStyleB:"italic", styleWordMap:"", styleCharMap:"", styleAlternateList:"", styleAlternateRandom:false, styleWordMapMarquee:false, lyricsBrackets:"", moodHeartsEnabled:false };
Settings.view = { timestamp:true, label:true, profanityFilter:false, profanityCensorMin:2, profanityCensorMax:6, profanityCensorRatio:50, advanced:{ ...Settings._viewAdvancedDefaults } };
Settings.timings = { sendTimeOffset:500, enableAutooffset:true, autooffset:3 };
Settings.update = { enableAutoupdate:true };
Settings.rateLimit = { enableBackoff:true, enableMinInterval:true, minIntervalMs:5000, enableMergeLines:true, mergeWindowMs:8000, mergeSeparator:" ", mergeMaxLines:3 };
Settings._defaultSourceOrder = ["Spotify","Musixmatch","LrcLib","NetEase","QQMusic","Genius","Kugou"];
Settings.sources = { enableSpotify:true, enableMusixmatch:true, enableLrcLib:true, enableNetEase:true, enableQQMusic:true, enableGenius:true, enableKugou:true, sourceOrder:["Spotify","Musixmatch","LrcLib","NetEase","QQMusic","Genius","Kugou"] };
Settings.cache = { path:"", lyricsTtlDays:30, emptyTtlDays:7, errorTtlHours:1, maxRows:2000 };
Settings.chineseConversion = "off";
Settings.restore = { enabled:true, savedStatus:null, delayMs:15000 };
Settings.gateway = { enabled:false, presenceStatus:"online", minGwIntervalMs:5000 };
Settings.statusFlash = { enabled:false, states:["online","idle","dnd"], intervalMs:2000, restoreStatus:null };
Settings.richPresence = { enabled:false, appName:"Spotify", showAlbumArt:true, albumArtUrl:"", showProgressBar:true, buttonLabel:"", buttonUrl:"", detailsTemplate:"{lyrics}", stateTemplate:"{song_author}" };
Settings.spotifyParty = { enabled:false, partyId:"", partySize:1, partyMax:10, syncId:"", flags:48 };
Settings.profileColor = { enabled:false, accentShift:30 };
Settings.idle = { enabled:true, timeoutSec:300 };
Settings.gamePresence = { enabled:false, game:"valorant", partyCurrent:1, partyMax:5, details:"", state:"" };
