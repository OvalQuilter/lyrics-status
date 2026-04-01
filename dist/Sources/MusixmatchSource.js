"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusixmatchSource = void 0;
const BaseSource_1 = require("./BaseSource");
const Settings_1 = require("../Settings");
const Debug_1 = require("../Debug");

class MusixmatchSource extends BaseSource_1.BaseSource {
    request(url) {
        const token = Settings_1.Settings.credentials.musixmatchToken;
        return fetch(url, {
            headers: {
                "authority": "apic-desktop.musixmatch.com",
                "cookie": `x-mxm-token-guid=${token}`
            }
        });
    }
    async getSongId(name, artist) {
        const token = Settings_1.Settings.credentials.musixmatchToken;
        if (!token) throw new Error("No Musixmatch token configured");
        const url = `https://apic-desktop.musixmatch.com/ws/1.1/track.search` +
            `?q_track=${encodeURIComponent(name)}&q_artist=${encodeURIComponent(artist)}` +
            `&page_size=5&page=1&s_track_rating=desc&quorum_factor=1.0` +
            `&app_id=web-desktop-app-v1.0&usertoken=${token}`;
        const res = await this.request(url);
        if (!res.ok) throw new Error(`Musixmatch search HTTP ${res.status}`);
        const json = await res.json();
        const trackList = json?.message?.body?.track_list;
        if (!trackList || trackList.length === 0) throw new Error("Musixmatch: song not found");
        const track = trackList[0]?.track;
        if (!track?.track_id) throw new Error("Musixmatch: no track_id in result");
        Debug_1.Debug.write(`[MusixmatchSource] Found track: "${track.track_name}" id=${track.track_id}`);
        return track.track_id;
    }
    async getLyrics(name, artist) {
        const token = Settings_1.Settings.credentials.musixmatchToken;
        if (!token) throw new Error("No Musixmatch token configured");
        const trackId = await this.getSongId(name, artist);
        const url = `https://apic-desktop.musixmatch.com/ws/1.1/track.subtitle.get` +
            `?track_id=${trackId}&subtitle_format=lrc&app_id=web-desktop-app-v1.0&usertoken=${token}`;
        const res = await this.request(url);
        if (!res.ok) {
            const body = await res.text().catch(() => "");
            throw new Error(`Musixmatch subtitle HTTP ${res.status}: ${body.slice(0, 200)}`);
        }
        const json = await res.json();
        const statusCode = json?.message?.header?.status_code;
        const subtitleBody = json?.message?.body?.subtitle?.subtitle_body;
        if (!subtitleBody || !subtitleBody.trim()) {
            throw new Error(`Musixmatch: no synced lyrics (api status=${statusCode})`);
        }
        Debug_1.Debug.write(`[MusixmatchSource] Got synced lyrics for "${name}"`);
        return this.parseLyrics(subtitleBody);
    }
    parseLyrics(lrc) {
        const result = { lines: [] };
        for (const rawLine of lrc.split("\n")) {
            const line = rawLine.trim();
            if (!line) continue;
            const regexp = /\[(\d\d):(\d\d)(?:\.(\d\d?\d?))?]/g;
            const timestamps = [];
            let match;
            while ((match = regexp.exec(line)) !== null) {
                const min = parseInt(match[1]);
                const sec = parseInt(match[2]);
                const ms = match[3] ? parseInt(match[3].padEnd(3, "0")) : 0;
                timestamps.push((min * 60 + sec) * 1000 + ms);
            }
            const text = line.replace(/\[\d\d:\d\d(?:\.\d+)?]/g, "").trim();
            if (!text) continue;
            for (const time of timestamps.length ? timestamps : [0]) {
                result.lines.push({ time, text });
            }
        }
        result.lines.sort((a, b) => a.time - b.time);
        return result;
    }
    getAppName() { return "Musixmatch"; }
}
exports.MusixmatchSource = MusixmatchSource;
