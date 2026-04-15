import { existsSync, readFileSync, writeFileSync, mkdirSync, renameSync, unlinkSync } from "fs"
import { join, dirname } from "path"

export interface SongHistoryItem {
    name: string
    artist: string
    timestamp: number
    hadLyrics: boolean
    spotifyUri?: string
    albumArt?: string
    playCount: number
}

export interface AppStats {
    songsToday: number
    totalSongsPlayed: number
    statusChanges: number
    lyricsFoundCount: number
    lastResetDate: string  // ISO date string (YYYY-MM-DD)
}

export interface PersistedData {
    history: SongHistoryItem[]
    stats: AppStats
    lastUpdated: number
}

// Data path - will be initialized with app data directory for portable exe support
let dataPath = "./data/appdata.json"

export function initDataPath(userDataPath: string): void {
    // Ensure directory exists
    if (!existsSync(userDataPath)) {
        mkdirSync(userDataPath, { recursive: true })
    }
    dataPath = join(userDataPath, "appdata.json")
    console.log(`DataStore path initialized: ${dataPath}`)
}

export function getDataPath(): string {
    return dataPath
}

function getDefaultStats(): AppStats {
    return {
        songsToday: 0,
        totalSongsPlayed: 0,
        statusChanges: 0,
        lyricsFoundCount: 0,
        lastResetDate: new Date().toISOString().split("T")[0]
    }
}

function getDefaultData(): PersistedData {
    return {
        history: [],
        stats: getDefaultStats(),
        lastUpdated: Date.now()
    }
}

export class DataStore {
    private data: PersistedData
    private saveTimeout: NodeJS.Timeout | null = null

    constructor() {
        this.data = this.load()
        this.checkDailyReset()
    }

    private load(): PersistedData {
        try {
            if (existsSync(dataPath)) {
                const content = readFileSync(dataPath, "utf-8")
                const parsed = JSON.parse(content) as PersistedData
                
                // Ensure all fields exist
                if (!parsed.stats) parsed.stats = getDefaultStats()
                if (!parsed.history) parsed.history = []
                
                return parsed
            }
        } catch (error) {
            console.error("Failed to load data:", error)
        }
        return getDefaultData()
    }

    // Reload data from disk (used after path initialization)
    public reload(): void {
        this.data = this.load()
        this.checkDailyReset()
    }

    public save(): void {
        // Debounce saves to avoid excessive disk writes
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout)
        }

        this.saveTimeout = setTimeout(() => {
            const tempPath = dataPath + '.tmp'
            try {
                const dir = dirname(dataPath)
                if (!existsSync(dir)) {
                    mkdirSync(dir, { recursive: true })
                }

                this.data.lastUpdated = Date.now()
                // Atomic write: write to temp file first, then rename
                writeFileSync(tempPath, JSON.stringify(this.data, null, 2))
                renameSync(tempPath, dataPath)
            } catch (error) {
                console.error("Failed to save data:", error)
                // Clean up temp file if it exists
                try {
                    if (existsSync(tempPath)) unlinkSync(tempPath)
                } catch {}
            }
        }, 500)
    }

    public forceSave(): void {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout)
            this.saveTimeout = null
        }
        
        try {
            const dir = dirname(dataPath)
            if (!existsSync(dir)) {
                mkdirSync(dir, { recursive: true })
            }

            this.data.lastUpdated = Date.now()
            writeFileSync(dataPath, JSON.stringify(this.data, null, 2))
        } catch (error) {
            console.error("Failed to save data:", error)
        }
    }

    private checkDailyReset(): void {
        const today = new Date().toISOString().split("T")[0]
        if (this.data.stats.lastResetDate !== today) {
            // New day - reset daily counters
            this.data.stats.songsToday = 0
            this.data.stats.lastResetDate = today
            this.save()
        }
    }

    // History methods
    public addToHistory(item: Omit<SongHistoryItem, "playCount">): void {
        // Check if song already exists in history
        const existingIndex = this.data.history.findIndex(
            h => h.name === item.name && h.artist === item.artist
        )

        if (existingIndex !== -1) {
            // Update existing entry
            const existing = this.data.history[existingIndex]
            existing.playCount++
            existing.timestamp = item.timestamp
            existing.hadLyrics = item.hadLyrics
            existing.albumArt = item.albumArt || existing.albumArt
            existing.spotifyUri = item.spotifyUri || existing.spotifyUri

            // Move to top
            this.data.history.splice(existingIndex, 1)
            this.data.history.unshift(existing)
        } else {
            // Add new entry
            this.data.history.unshift({
                ...item,
                playCount: 1
            })
        }

        // Limit history size
        if (this.data.history.length > 100) {
            this.data.history = this.data.history.slice(0, 100)
        }

        // Update stats
        this.data.stats.songsToday++
        this.data.stats.totalSongsPlayed++
        if (item.hadLyrics) {
            this.data.stats.lyricsFoundCount++
        }

        this.save()
    }

    public getHistory(): SongHistoryItem[] {
        return [...this.data.history]
    }

    public clearHistory(): void {
        this.data.history = []
        this.save()
    }

    public updateSongLyrics(name: string, artist: string, hadLyrics: boolean): void {
        const existingIndex = this.data.history.findIndex(
            h => h.name === name && h.artist === artist
        )
        
        if (existingIndex !== -1) {
            this.data.history[existingIndex].hadLyrics = hadLyrics
            this.save()
        }
    }

    // Stats methods
    public getStats(): AppStats {
        this.checkDailyReset()
        return { ...this.data.stats }
    }

    public incrementStatusChanges(): void {
        this.data.stats.statusChanges++
        this.save()
    }

    public resetStats(): void {
        this.data.stats = getDefaultStats()
        this.save()
    }
}

// Singleton instance
export const dataStore = new DataStore()
