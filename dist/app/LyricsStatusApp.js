"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LyricsStatusApp = void 0;
const LyricsFetcher_1 = require("../LyricsFetcher");
const SpotifySource_1 = require("../Sources/SpotifySource");
const NetEaseMusicSource_1 = require("../Sources/NetEaseMusicSource");
const LrcLibSource_1 = require("../Sources/LrcLibSource");
const QQMusicSource_1 = require("../Sources/QQMusicSource");
const PlaybackStateUpdater_1 = require("../PlaybackStateUpdater");
const PlaybackState_1 = require("../PlaybackState");
const StatusChanger_1 = require("../StatusChanger");
const SpotifyService_1 = require("../SpotifyService");
const DataStore_1 = require("./DataStore");
const fs_1 = require("fs");
// Import appEvents conditionally to avoid circular dependency issues
let appEvents = null;
try {
    appEvents = require("../main").appEvents;
}
catch {
    // Running outside electron context
}
class LyricsStatusApp {
    constructor() {
        this.lastStatusText = "";
        this.updateInterval = null;
        this.statusInterval = null;
        this.isRunning = false;
        this.lyricsFetcher = new LyricsFetcher_1.LyricsFetcher();
        this.lyricsFetcher.addSource(new SpotifySource_1.SpotifySource());
        this.lyricsFetcher.addSource(new LrcLibSource_1.LrcLibSource());
        this.lyricsFetcher.addSource(new NetEaseMusicSource_1.NetEaseMusicSource());
        this.lyricsFetcher.addSource(new QQMusicSource_1.QQMusicSource());
        this.playbackState = new PlaybackState_1.PlaybackState();
        this.playbackStateUpdater = new PlaybackStateUpdater_1.PlaybackStateUpdater(this.playbackState, this.lyricsFetcher);
        this.statusChanger = new StatusChanger_1.StatusChanger(this.playbackState);
    }
    async start() {
        if (this.isRunning)
            return;
        this.isRunning = true;
        await SpotifyService_1.SpotifyService.refresh();
        // Update playback state every 2 seconds (was 300ms - too aggressive, caused rate limits)
        this.updateInterval = setInterval(async () => {
            const previousSongId = this.playbackState.songId;
            const previousHasLyrics = this.playbackState.hasLyrics;
            await this.playbackStateUpdater.update();
            if (previousSongId !== this.playbackState.songId && this.playbackState.songId) {
                this.statusChanger.songChanged();
                const songInfo = this.getCurrentSong();
                if (songInfo) {
                    // Add to persistent history - use updated hasLyrics after fetch completes
                    DataStore_1.dataStore.addToHistory({
                        name: songInfo.name,
                        artist: songInfo.artist,
                        timestamp: Date.now(),
                        hadLyrics: this.playbackState.hasLyrics,
                        spotifyUri: this.playbackState.songUri,
                        albumArt: this.playbackState.albumArt
                    });
                    appEvents?.emit("song:changed", songInfo);
                }
            }
            else if (previousSongId === this.playbackState.songId && previousHasLyrics !== this.playbackState.hasLyrics) {
                // Lyrics status changed for same song - update history
                DataStore_1.dataStore.updateSongLyrics(this.playbackState.songName, this.playbackState.songAuthor, this.playbackState.hasLyrics);
            }
        }, 1500); // 1.5 seconds - balanced between responsiveness and rate limits
        // Update status 60 times per second
        let lastUpdate = Date.now();
        this.statusInterval = setInterval(() => {
            const now = Date.now();
            if (this.playbackState.isPlaying) {
                this.playbackState.songProgress += now - lastUpdate;
            }
            const currentStatus = this.statusChanger.getCurrentStatusText();
            if (currentStatus && currentStatus !== this.lastStatusText) {
                DataStore_1.dataStore.incrementStatusChanges();
                this.lastStatusText = currentStatus;
            }
            this.statusChanger.changeStatus();
            if (this.playbackState.ended) {
                this.statusChanger.songChanged();
            }
            const lyricsInfo = this.getCurrentLyrics();
            if (lyricsInfo) {
                appEvents?.emit("lyrics:updated", lyricsInfo);
            }
            lastUpdate = now;
        }, 1000 / 60);
    }
    stop() {
        if (!this.isRunning)
            return;
        this.isRunning = false;
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        if (this.statusInterval) {
            clearInterval(this.statusInterval);
            this.statusInterval = null;
        }
        // Clear Discord status
        this.statusChanger.clearStatus();
        // Force save data
        DataStore_1.dataStore.forceSave();
    }
    // Clear Discord status (when paused)
    clearDiscordStatus() {
        this.statusChanger.clearStatus();
    }
    toggle() {
        if (this.isRunning) {
            this.stop();
        }
        else {
            this.start();
        }
    }
    isPlaying() {
        return this.playbackState.isPlaying;
    }
    getCurrentSong() {
        if (!this.playbackState.songId)
            return null;
        return {
            name: this.playbackState.songName,
            artist: this.playbackState.songAuthor,
            progress: this.playbackState.songProgress,
            duration: this.playbackState.songDuration,
            albumArt: this.playbackState.albumArt,
            spotifyUri: this.playbackState.songUri,
            id: this.playbackState.songId // Include track ID for like button
        };
    }
    getCurrentLyrics() {
        const lyrics = this.playbackState.lyrics;
        const currentLine = this.playbackState.currentLine;
        if (!lyrics) {
            return {
                currentLine: "",
                nextLine: "",
                source: "None",
                hasLyrics: false,
                lines: [],
                currentLineIndex: -1,
                progress: this.playbackState.songProgress,
                isPlaying: this.playbackState.isPlaying
            };
        }
        const currentIndex = lyrics.lines.findIndex(l => l === currentLine);
        const nextLine = currentIndex >= 0 && currentIndex < lyrics.lines.length - 1
            ? lyrics.lines[currentIndex + 1].text
            : "";
        return {
            currentLine: currentLine?.text ?? "",
            nextLine,
            source: this.lyricsFetcher.lastFetchedFrom,
            hasLyrics: this.playbackState.hasLyrics,
            lines: lyrics.lines.map(l => ({ time: l.time, text: l.text, endTime: l.endTime, words: l.words })),
            currentLineIndex: currentIndex,
            progress: this.playbackState.songProgress,
            isPlaying: this.playbackState.isPlaying
        };
    }
    getHistory() {
        return DataStore_1.dataStore.getHistory();
    }
    clearHistory() {
        DataStore_1.dataStore.clearHistory();
    }
    getStats() {
        return DataStore_1.dataStore.getStats();
    }
    getCachedSongsCount() {
        const cachePath = "./cache";
        try {
            if ((0, fs_1.existsSync)(cachePath)) {
                const files = (0, fs_1.readdirSync)(cachePath);
                return files.filter(f => f.endsWith(".json")).length;
            }
        }
        catch {
            // Cache folder doesn't exist or can't be read
        }
        return 0;
    }
}
exports.LyricsStatusApp = LyricsStatusApp;
