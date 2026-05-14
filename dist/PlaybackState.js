"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackState = void 0;
class PlaybackState {
    constructor() {
        this.songName = ""; this.songAuthor = ""; this.songId = ""; this.oldSongId = "";
        this.songDuration = 0; this.songProgress = 0;
        this.lyrics = null; this.currentLine = null;
        this.hasLyrics = false; this.isPlaying = false; this.lyricsSource = "";
    }
    // Bug 8 fix: require songDuration > 0 to prevent ended=true on init or mid-song-change frame
    get ended() { return this.songDuration > 0 && this.songDuration < this.songProgress; }
}
exports.PlaybackState = PlaybackState;
