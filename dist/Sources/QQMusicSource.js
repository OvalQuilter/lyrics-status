"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QQMusicSource = void 0;
const { decode } = require("he");
const QQ_RE = /\[(\d\d):((\d\d)\.(\d\d?\d?))]/;
const QQ_HEADERS = { "Referer": "http://y.qq.com/portal/player.html" };

class QQMusicSource {
    _req(url) { return fetch(url, { headers: QQ_HEADERS }); }
    async getSongId(name, artist) {
        const r = await this._req(`https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?inCharset=utf-8&outCharset=utf-8&key=${encodeURIComponent(`${name}-${artist}`)}`);
        const j = await r.json();
        if (!j?.data?.song?.itemlist?.length) throw new Error("QQMusic: song not found");
        return j.data.song.itemlist[0].mid;
    }
    async getLyrics(name, artist) {
        const mid = await this.getSongId(name, artist);
        const r = await this._req(`http://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?g_tk=5381&format=json&inCharset=utf-8&outCharset=utf-8&songmid=${mid}`);
        const j = await r.json();
        if (!j.lyric) throw new Error("QQMusic: no lyrics");
        return this.parseLyrics(j.lyric);
    }
    parseLyrics(lyrics) {
        const lines = [];
        for (const line of Buffer.from(lyrics, "base64").toString("utf-8").split("\n")) {
            if (!line) continue;
            const m = line.match(QQ_RE);
            if (!m?.[1] || !m[3] || !m[4]) continue;
            lines.push({ time: (60 * +m[1] + +m[3]) * 1000 + parseInt(String(m[4]).padEnd(3, "0")), text: decode(line.replace(QQ_RE, "") || "") });
        }
        return { lines };
    }
    getAppName() { return "QQMusic"; }
}
exports.QQMusicSource = QQMusicSource;
