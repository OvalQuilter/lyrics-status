"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataStore = exports.DataStore = void 0;
exports.initDataPath = initDataPath;
exports.getDataPath = getDataPath;
const fs_1 = require("fs");
const path_1 = require("path");
// Data path - will be initialized with app data directory for portable exe support
let dataPath = "./data/appdata.json";
function initDataPath(userDataPath) {
    // Ensure directory exists
    if (!(0, fs_1.existsSync)(userDataPath)) {
        (0, fs_1.mkdirSync)(userDataPath, { recursive: true });
    }
    dataPath = (0, path_1.join)(userDataPath, "appdata.json");
    console.log(`DataStore path initialized: ${dataPath}`);
}
function getDataPath() {
    return dataPath;
}
function getDefaultStats() {
    return {
        songsToday: 0,
        totalSongsPlayed: 0,
        statusChanges: 0,
        lyricsFoundCount: 0,
        lastResetDate: new Date().toISOString().split("T")[0]
    };
}
function getDefaultData() {
    return {
        history: [],
        stats: getDefaultStats(),
        lastUpdated: Date.now()
    };
}
class DataStore {
    constructor() {
        this.saveTimeout = null;
        this.data = this.load();
        this.checkDailyReset();
    }
    load() {
        try {
            if ((0, fs_1.existsSync)(dataPath)) {
                const content = (0, fs_1.readFileSync)(dataPath, "utf-8");
                const parsed = JSON.parse(content);
                // Ensure all fields exist
                if (!parsed.stats)
                    parsed.stats = getDefaultStats();
                if (!parsed.history)
                    parsed.history = [];
                return parsed;
            }
        }
        catch (error) {
            console.error("Failed to load data:", error);
        }
        return getDefaultData();
    }
    // Reload data from disk (used after path initialization)
    reload() {
        this.data = this.load();
        this.checkDailyReset();
    }
    save() {
        // Debounce saves to avoid excessive disk writes
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
        this.saveTimeout = setTimeout(() => {
            const tempPath = dataPath + '.tmp';
            try {
                const dir = (0, path_1.dirname)(dataPath);
                if (!(0, fs_1.existsSync)(dir)) {
                    (0, fs_1.mkdirSync)(dir, { recursive: true });
                }
                this.data.lastUpdated = Date.now();
                // Atomic write: write to temp file first, then rename
                (0, fs_1.writeFileSync)(tempPath, JSON.stringify(this.data, null, 2));
                (0, fs_1.renameSync)(tempPath, dataPath);
            }
            catch (error) {
                console.error("Failed to save data:", error);
                // Clean up temp file if it exists
                try {
                    if ((0, fs_1.existsSync)(tempPath))
                        (0, fs_1.unlinkSync)(tempPath);
                }
                catch { }
            }
        }, 500);
    }
    forceSave() {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
            this.saveTimeout = null;
        }
        try {
            const dir = (0, path_1.dirname)(dataPath);
            if (!(0, fs_1.existsSync)(dir)) {
                (0, fs_1.mkdirSync)(dir, { recursive: true });
            }
            this.data.lastUpdated = Date.now();
            (0, fs_1.writeFileSync)(dataPath, JSON.stringify(this.data, null, 2));
        }
        catch (error) {
            console.error("Failed to save data:", error);
        }
    }
    checkDailyReset() {
        const today = new Date().toISOString().split("T")[0];
        if (this.data.stats.lastResetDate !== today) {
            // New day - reset daily counters
            this.data.stats.songsToday = 0;
            this.data.stats.lastResetDate = today;
            this.save();
        }
    }
    // History methods
    addToHistory(item) {
        // Check if song already exists in history
        const existingIndex = this.data.history.findIndex(h => h.name === item.name && h.artist === item.artist);
        if (existingIndex !== -1) {
            // Update existing entry
            const existing = this.data.history[existingIndex];
            existing.playCount++;
            existing.timestamp = item.timestamp;
            existing.hadLyrics = item.hadLyrics;
            existing.albumArt = item.albumArt || existing.albumArt;
            existing.spotifyUri = item.spotifyUri || existing.spotifyUri;
            // Move to top
            this.data.history.splice(existingIndex, 1);
            this.data.history.unshift(existing);
        }
        else {
            // Add new entry
            this.data.history.unshift({
                ...item,
                playCount: 1
            });
        }
        // Limit history size
        if (this.data.history.length > 100) {
            this.data.history = this.data.history.slice(0, 100);
        }
        // Update stats
        this.data.stats.songsToday++;
        this.data.stats.totalSongsPlayed++;
        if (item.hadLyrics) {
            this.data.stats.lyricsFoundCount++;
        }
        this.save();
    }
    getHistory() {
        return [...this.data.history];
    }
    clearHistory() {
        this.data.history = [];
        this.save();
    }
    updateSongLyrics(name, artist, hadLyrics) {
        const existingIndex = this.data.history.findIndex(h => h.name === name && h.artist === artist);
        if (existingIndex !== -1) {
            this.data.history[existingIndex].hadLyrics = hadLyrics;
            this.save();
        }
    }
    // Stats methods
    getStats() {
        this.checkDailyReset();
        return { ...this.data.stats };
    }
    incrementStatusChanges() {
        this.data.stats.statusChanges++;
        this.save();
    }
    resetStats() {
        this.data.stats = getDefaultStats();
        this.save();
    }
}
exports.DataStore = DataStore;
// Singleton instance
exports.dataStore = new DataStore();
