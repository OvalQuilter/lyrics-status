"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChanger = void 0;
const Settings_1 = require("./Settings");
const Autooffset_1 = require("./Autooffset");
class StatusChanger {
    constructor(playbackState) {
        // Track last sent status to avoid duplicates
        this.lastSentStatusText = "";
        this.playbackState = playbackState;
        this.sentLines = [];
        this.sentNoLyricsStatus = false;
        this.lastNoLyricsUpdate = 0;
        this.autooffset = new Autooffset_1.Autooffset();
    }
    changeStatusRequest(text, token, emoji, emojiId, animated) {
        const now = Date.now();
        // Skip if this is the same status we just sent
        if (text === this.lastSentStatusText) {
            return Promise.resolve(new Response(null, { status: 304, statusText: "Not Modified" }));
        }
        // Build custom_status payload for Discord JSON API
        // Note: Custom/animated emojis have limited support via JSON API
        const customStatus = {
            text,
            expires_at: new Date(Date.now() + 600000).toISOString()
        };
        // Add emoji - prefer emoji_name for standard emojis
        // JSON API has limited support for custom emojis
        if (emoji) {
            // Standard Unicode emoji - works reliably
            customStatus.emoji_name = emoji;
        }
        const request = fetch("https://discord.com/api/v9/users/@me/settings", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                custom_status: customStatus
            })
        }).then(response => {
            if (!response.ok) {
                console.error(`[Discord API] Error ${response.status}: ${response.statusText}`);
            }
            return response;
        });
        this.lastSentStatusText = text;
        request.then(() => this.autooffset.addValue(Date.now() - now));
        return request;
    }
    // Clear Discord status completely
    clearStatus() {
        this.lastSentStatusText = "";
        return fetch("https://discord.com/api/v9/users/@me/settings", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Settings_1.Settings.credentials.token
            },
            body: JSON.stringify({ custom_status: null })
        });
    }
    // Reset emoji tracking (call when user changes emoji settings)
    resetEmojiTracking() {
        this.lastSentStatusText = "";
    }
    // Check if text contains Chinese characters
    containsChinese(text) {
        return /[\u4e00-\u9fff\u3400-\u4dbf]/.test(text);
    }
    changeStatus() {
        this.autooffset.setLimit(Settings_1.Settings.timings.autooffset);
        const playbackState = this.playbackState;
        if (playbackState.ended || !playbackState.isPlaying)
            return;
        // If no lyrics, show song title instead
        if (!playbackState.hasLyrics) {
            const now = Date.now();
            // Resend every 5 minutes to keep status alive
            const shouldResend = !this.sentNoLyricsStatus || (now - this.lastNoLyricsUpdate > 300000);
            if (shouldResend) {
                const songName = playbackState.songName;
                const songAuthor = playbackState.songAuthor;
                const noLyricsText = `${songName} - ${songAuthor}`;
                if (Settings_1.Settings.view.advanced.enabled) {
                    // In advanced mode, use custom format with song name & artist instead of lyrics
                    const statusText = Settings_1.Settings.view.advanced.customStatus
                        .replace("{lyrics}", noLyricsText)
                        .replace("{lyrics_upper}", noLyricsText.toUpperCase())
                        .replace("{lyrics_lower}", noLyricsText.toLowerCase())
                        .replace("{lyrics_letters_only}", noLyricsText.replace(/['",\.]/gi, ""))
                        .replace("{timestamp}", "0:00")
                        .replace("{song_name}", songName)
                        .replace("{song_author}", songAuthor)
                        .slice(0, 128);
                    // In advanced mode, don't add emoji - user's custom format has their own emojis
                    this.changeStatusRequest(statusText, Settings_1.Settings.credentials.token, null);
                }
                else {
                    const statusText = noLyricsText.slice(0, 128);
                    // Use standard emoji from settings (custom emojis have limited support via JSON API)
                    const emojiSettings = Settings_1.Settings.view.emoji;
                    if (emojiSettings.enabled) {
                        // Standard emoji only - custom/animated emojis need protobuf API
                        this.changeStatusRequest(statusText, Settings_1.Settings.credentials.token, emojiSettings.name || "🎵");
                    }
                    else {
                        // No emoji
                        this.changeStatusRequest(statusText, Settings_1.Settings.credentials.token, null);
                    }
                }
                this.sentNoLyricsStatus = true;
                this.lastNoLyricsUpdate = now;
            }
            return;
        }
        this.sentNoLyricsStatus = false;
        const lyrics = playbackState.lyrics;
        if (!lyrics)
            return;
        const currentLine = playbackState.currentLine;
        const songProgress = playbackState.songProgress;
        const lines = lyrics.lines;
        const offset = Settings_1.Settings.timings.enableAutooffset ? this.autooffset.getAverageValue() + 100 : Settings_1.Settings.timings.sendTimeOffset;
        // Find the most recent line that should be displayed
        let lineToDisplay = null;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const nextLine = lines[i + 1];
            // Check if this line's time has passed (with offset)
            if (line.time < (songProgress + offset)) {
                if (!line.text)
                    continue;
                // Skip lines with Chinese characters (wrong lyrics source)
                if (this.containsChinese(line.text))
                    continue;
                // Skip if next line has also passed (we want the most recent active line)
                if (nextLine && nextLine.time < (songProgress + offset))
                    continue;
                // This is the line that should currently be displayed
                lineToDisplay = line;
            }
        }
        // If we found a line to display and it's different from current
        if (lineToDisplay && lineToDisplay !== currentLine) {
            // Check if this specific line was already sent
            if (!this.sentLines.some((sentLine) => sentLine.time === lineToDisplay.time)) {
                playbackState.currentLine = lineToDisplay;
                if (Settings_1.Settings.view.advanced.enabled) {
                    // In advanced mode, don't add emoji_name - user's custom format has their own emojis
                    this.changeStatusRequest(this.parseStatusString(Settings_1.Settings.view.advanced.customStatus), Settings_1.Settings.credentials.token, null);
                }
                else {
                    // Use standard emoji from settings
                    const emojiSettings = Settings_1.Settings.view.emoji;
                    const statusText = this.getStatusString(lineToDisplay);
                    // Standard emoji only via JSON API
                    if (emojiSettings.enabled) {
                        this.changeStatusRequest(statusText, Settings_1.Settings.credentials.token, emojiSettings.name || "🎶");
                    }
                    else {
                        // No emoji
                        this.changeStatusRequest(statusText, Settings_1.Settings.credentials.token, null);
                    }
                }
                this.sentLines.push(lineToDisplay);
            }
        }
    }
    songChanged() {
        this.sentLines = [];
        this.sentNoLyricsStatus = false;
        this.lastNoLyricsUpdate = 0;
        this.lastSentStatusText = ""; // Reset to allow new song status
    }
    getCurrentStatusText() {
        const currentLine = this.playbackState.currentLine;
        if (!currentLine)
            return "";
        if (Settings_1.Settings.view.advanced.enabled) {
            return this.parseStatusString(Settings_1.Settings.view.advanced.customStatus);
        }
        return this.getStatusString(currentLine);
    }
    formatSeconds(s) {
        return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
    }
    getStatusString(line) {
        return `${Settings_1.Settings.view.timestamp ? `[${this.formatSeconds(+(line.time / 1000).toFixed(0))}] ` : ""}${Settings_1.Settings.view.label ? "Song lyrics - " : ""}${line.text.replace("♪", "🎶")}`.slice(0, 128);
    }
    parseStatusString(status) {
        if (this.playbackState.currentLine) {
            const line = this.playbackState.currentLine;
            const songName = this.playbackState.songName;
            const songAuthor = this.playbackState.songAuthor;
            status = status
                .replace("{lyrics}", line.text)
                .replace("{lyrics_upper}", line.text.toUpperCase())
                .replace("{lyrics_lower}", line.text.toLowerCase())
                .replace("{lyrics_letters_only}", line.text.replace(/['",\.]/gi, ""))
                .replace("{lyrics_upper_letters_only}", line.text.toUpperCase().replace(/['",\.]/gi, ""))
                .replace("{lyrics_lower_letters_only}", line.text.toLowerCase().replace(/['",\.]/gi, ""))
                .replace("{timestamp}", this.formatSeconds(+(line.time / 1000).toFixed()))
                .replace("{song_name}", songName)
                .replace("{song_name_upper}", songName.toUpperCase())
                .replace("{song_name_lower}", songName.toLowerCase())
                .replace("{song_name_cropped}", songName.replace(/( ?- ?.+)|(\(.+\))/gi, ""))
                .replace("{song_name_upper_cropped}", songName.toUpperCase().replace(/( ?- ?.+)|(\(.+\))/gi, ""))
                .replace("{song_name_lower_cropped}", songName.toLowerCase().replace(/( ?- ?.+)|(\(.+\))/gi, ""))
                .replace("{song_author}", songAuthor)
                .replace("{song_author_upper}", songAuthor.toUpperCase())
                .replace("{song_author_lower}", songAuthor.toLowerCase());
        }
        return status.slice(0, 128);
    }
}
exports.StatusChanger = StatusChanger;
