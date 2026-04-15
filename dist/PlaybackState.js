"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackState = void 0;
class PlaybackState {
    constructor() {
        this.songName = "";
        this.songAuthor = "";
        this.songId = "";
        this.oldSongId = "";
        this.songUri = "";
        this.albumArt = "";
        this.songDuration = 0;
        this.songProgress = 0;
        this.lyrics = null;
        this.currentLine = null;
        this.hasLyrics = false;
        this.isPlaying = false;
        this.spotifyConnected = true; // Assume connected until proven otherwise
    }
    get ended() {
        return this.songDuration < this.songProgress;
    }
}
exports.PlaybackState = PlaybackState;
