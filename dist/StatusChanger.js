"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChanger = void 0;
const Settings_1 = require("./Settings");
const Autooffset_1 = require("./Autooffset");
const Debug_1 = require("./Debug");

function cpLen(s) { return [...s].length; }
function cpSlice(s, n) { return [...s].slice(0, n).join(""); }

class StatusChanger {
    constructor(playbackState) {
        this.playbackState = playbackState;
        this.sentLines = [];
        this.autooffset = new Autooffset_1.Autooffset();
        this._rateLimitedUntil = 0;
        this._lastSentAt = 0;
        this._lastSentText = "";
    }

    changeStatusRequest(text, token, emoji) {
        const now = Date.now();
        Debug_1.Debug.write(`[StatusChanger] Sending Discord status: "${text}" | emoji: ${emoji}`);
        const request = fetch("https://discordapp.com/api/v8/users/@me/settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": token },
            body: JSON.stringify({
                custom_status: {
                    text, emoji_id: null, emoji_name: emoji,
                    expires_at: new Date(Date.now() + 60000).toISOString()
                }
            })
        });
        request.then((res) => {
            const elapsed = Date.now() - now;
            if (res.status === 429) {
                res.text().then(raw => {
                    Debug_1.Debug.write(`[StatusChanger] Rate limited (HTTP 429) | body: ${raw}`);
                    let retryAfter = 30;
                    try {
                        const body = JSON.parse(raw);
                        if (typeof body.retry_after === "number" && body.retry_after > 0) retryAfter = body.retry_after;
                    } catch (e) {
                        Debug_1.Debug.write(`[StatusChanger] Failed to parse rate limit body, defaulting to ${retryAfter}s: ${e}`);
                    }
                    if (Settings_1.Settings.rateLimit.enableBackoff) {
                        this._rateLimitedUntil = Date.now() + (retryAfter * 1000);
                        Debug_1.Debug.write(`[StatusChanger] Backing off ${retryAfter}s`);
                    } else {
                        Debug_1.Debug.write(`[StatusChanger] Rate limit (backoff disabled): ${retryAfter}s suggested`);
                    }
                }).catch((e) => {
                    Debug_1.Debug.write(`[StatusChanger] Rate limited but failed to read response body: ${e}`);
                    if (Settings_1.Settings.rateLimit.enableBackoff) this._rateLimitedUntil = Date.now() + 30000;
                });
            } else if (res.status === 200) {
                Debug_1.Debug.write(`[StatusChanger] OK (${elapsed}ms)`);
                this.autooffset.addValue(elapsed);
            } else {
                res.text().then(body => Debug_1.Debug.write(`[StatusChanger] Error HTTP ${res.status}: ${body}`)).catch(() => {});
            }
        }).catch((err) => {
            Debug_1.Debug.write(`[StatusChanger] Fetch error: ${err}`);
        });
        return request;
    }

    smartTruncate(text, limit = 128, lyricLines = null) {
        if (!text) return "";
        if (cpLen(text) <= limit) return text;
        if (lyricLines && lyricLines.length > 1) {
            const lines = lyricLines.slice();
            while (lines.length > 1) {
                lines.pop();
                const candidate = lines.join(" ");
                if (cpLen(candidate) <= limit) return candidate;
            }
            text = lines[0] || "";
            if (cpLen(text) <= limit) return text;
        }
        const words = text.split(" ");
        while (words.length > 1) {
            words.pop();
            const candidate = words.join(" ");
            if (cpLen(candidate) <= limit) return candidate + "...";
        }
        return cpSlice(text, limit - 3) + "...";
    }

    buildMergedLines(lines, anchorIndex, mergeWindowMs) {
        const anchor = lines[anchorIndex];
        let lyricLines = [anchor.text || ""];
        let mergedLines = [anchor];
        if (mergeWindowMs > 0) {
            for (let j = anchorIndex - 1; j >= 0; j--) {
                const gapFromAnchor = anchor.time - lines[j].time;
                if (gapFromAnchor > mergeWindowMs) break;
                if (!lines[j].text) continue;
                if (this.sentLines.some(s => s.time === lines[j].time)) continue;
                lyricLines.unshift(lines[j].text);
                mergedLines.unshift(lines[j]);
            }
        }
        return { mergedText: lyricLines.join(" "), lyricLines, mergedLines };
    }

    applyTemplate(template, mergedText, line, playbackState) {
        const name = playbackState.songName || "";
        const author = playbackState.songAuthor || "";
        return template
            .replace("{lyrics}", mergedText)
            .replace("{lyrics_upper}", mergedText.toUpperCase())
            .replace("{lyrics_lower}", mergedText.toLowerCase())
            .replace("{lyrics_letters_only}", mergedText.replace(/['",\.]/gi, ""))
            .replace("{lyrics_upper_letters_only}", mergedText.toUpperCase().replace(/['",\.]/gi, ""))
            .replace("{lyrics_lower_letters_only}", mergedText.toLowerCase().replace(/['",\.]/gi, ""))
            .replace("\u266a", "\uD83C\uDFB6")
            .replace("{timestamp}", this.formatSeconds(+(line.time / 1000).toFixed()))
            .replace("{song_name}", name)
            .replace("{song_name_upper}", name.toUpperCase())
            .replace("{song_name_lower}", name.toLowerCase())
            .replace("{song_name_cropped}", name.replace(/( ?- ?.+)|(\(.+\))/gi, ""))
            .replace("{song_name_upper_cropped}", name.toUpperCase().replace(/( ?- ?.+)|(\(.+\))/gi, ""))
            .replace("{song_name_lower_cropped}", name.toLowerCase().replace(/( ?- ?.+)|(\(.+\))/gi, ""))
            .replace("{song_author}", author)
            .replace("{song_author_upper}", author.toUpperCase())
            .replace("{song_author_lower}", author.toLowerCase());
    }

    changeStatus() {
        this.autooffset.setLimit(Settings_1.Settings.timings.autooffset);
        const playbackState = this.playbackState;
        if (playbackState.ended || !playbackState.hasLyrics || !playbackState.isPlaying) return;
        const lyrics = playbackState.lyrics;
        if (!lyrics) return;

        const now = Date.now();
        if (Settings_1.Settings.rateLimit.enableBackoff && now < this._rateLimitedUntil) return;

        const minInterval = Settings_1.Settings.rateLimit.enableMinInterval
            ? (Settings_1.Settings.rateLimit.minIntervalMs || 5000) : 0;
        if (minInterval > 0 && now - this._lastSentAt < minInterval) return;

        const currentLine = playbackState.currentLine;
        const songProgress = playbackState.songProgress;
        const lines = lyrics.lines;
        const offset = Settings_1.Settings.timings.enableAutooffset
            ? this.autooffset.getAverageValue() + 100
            : Settings_1.Settings.timings.sendTimeOffset;

        const mergeWindowMs = Settings_1.Settings.rateLimit.enableMergeLines
            ? (Settings_1.Settings.rateLimit.mergeWindowMs || 8000) : 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const nextLine = lines[i + 1];
            if (line.time < (songProgress + offset)) {
                if (!line.text) continue;
                if (nextLine && nextLine.time < (songProgress + offset)) continue;
                if (this.sentLines.some((sentLine) => sentLine.time === line.time)) break;
                if (line === currentLine) break;

                const { mergedText, lyricLines, mergedLines } = this.buildMergedLines(lines, i, mergeWindowMs);
                playbackState.currentLine = line;
                this._lastSentAt = now;

                let statusText;
                let emoji;

                if (Settings_1.Settings.view.advanced.enabled) {
                    const template = Settings_1.Settings.view.advanced.customStatus;
                    const fullStatus = this.applyTemplate(template, mergedText, line, playbackState);
                    if (cpLen(fullStatus) <= 128) {
                        statusText = fullStatus;
                    } else {
                        const reducedLines = lyricLines.slice();
                        let fitted = false;
                        while (reducedLines.length > 1) {
                            reducedLines.pop();
                            const candidate = this.applyTemplate(template, reducedLines.join(" "), line, playbackState);
                            if (cpLen(candidate) <= 128) { statusText = candidate; fitted = true; break; }
                        }
                        if (!fitted) {
                            statusText = this.smartTruncate(
                                this.applyTemplate(template, lyricLines[0], line, playbackState), 128, null
                            );
                        }
                    }
                    emoji = Settings_1.Settings.view.advanced.customEmoji;
                } else {
                    const prefix = `${Settings_1.Settings.view.timestamp ? `[${this.formatSeconds(+(line.time / 1000).toFixed(0))}] ` : ""}${Settings_1.Settings.view.label ? "Song lyrics - " : ""}`;
                    const cleanedLines = lyricLines.map(l => l.replace("\u266a", "\uD83C\uDFB6"));
                    const limit = 128 - cpLen(prefix);
                    const reduced = cleanedLines.slice();
                    while (reduced.length > 1 && cpLen(reduced.join(" ")) > limit) reduced.pop();
                    const lyricsText = cpLen(reduced.join(" ")) <= limit
                        ? reduced.join(" ")
                        : this.smartTruncate(reduced[0], limit, null);
                    statusText = prefix + lyricsText;
                    emoji = "\uD83C\uDFB6";
                }

                if (statusText === this._lastSentText) {
                    for (const ml of mergedLines) this.sentLines.push(ml);
                    break;
                }
                this._lastSentText = statusText;
                Debug_1.Debug.write(`[StatusChanger] Queuing status (${mergedLines.length} line(s) merged): "${statusText}"`);
                this.changeStatusRequest(statusText, Settings_1.Settings.credentials.token, emoji);
                for (const ml of mergedLines) this.sentLines.push(ml);
                break;
            }
        }
    }

    songChanged() {
        this.sentLines = [];
        this._lastSentAt = Date.now();
    }

    formatSeconds(s) {
        return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
    }
}
exports.StatusChanger = StatusChanger;
