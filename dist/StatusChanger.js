"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChanger = void 0;
const Settings_1 = require("./Settings");
class StatusChanger {
    constructor(playbackState) {
        this.playbackState = playbackState;
    }
    changeStatusRequest(text, token, emoji) {
        return fetch("https://discordapp.com/api/v8/users/@me/settings", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                custom_status: {
                    text,
                    emoji_id: null,
                    emoji_name: emoji,
                    expires_at: new Date(Date.now() + 60000).toISOString()
                }
            })
        });
    }
    changeStatus() {
        const playbackState = this.playbackState;
        if (playbackState.ended || !playbackState.hasLyrics || !playbackState.isPlaying)
            return;
        const lyrics = playbackState.lyrics;
        if (!lyrics)
            return;
        const currentLine = playbackState.currentLine;
        const songProgress = playbackState.songProgress;
        const lines = lyrics.lines;
        const offset = Settings_1.Settings.timings.offset;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const nextLine = lines[i + 1];
            if (line.time < (songProgress + offset)) {
                if (!line.text)
                    continue;
                if (nextLine && nextLine.time < (songProgress + offset))
                    continue;
                if (line === currentLine)
                    break;
                playbackState.currentLine = line;
                if (Settings_1.Settings.view.advanced.enabled) {
                    this.changeStatusRequest(this.parseStatusString(Settings_1.Settings.view.advanced.customStatus), Settings_1.Settings.credentials.token, Settings_1.Settings.view.advanced.customEmoji);
                }
                else {
                    this.changeStatusRequest(this.getStatusString(line), Settings_1.Settings.credentials.token, "🎶");
                }
                break;
            }
        }
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
                .replace("♪", "🎶")
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
