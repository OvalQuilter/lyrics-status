import { LyricsFetcher } from "../LyricsFetcher"
import { SpotifySource } from "../Sources/SpotifySource"
import { NetEaseMusicSource } from "../Sources/NetEaseMusicSource"
import { LrcLibSource } from "../Sources/LrcLibSource"
import { QQMusicSource } from "../Sources/QQMusicSource"
import { PlaybackStateUpdater } from "../PlaybackStateUpdater"
import { PlaybackState } from "../PlaybackState"
import { StatusChanger } from "../StatusChanger"
import { Settings } from "../Settings"
import { SpotifyService } from "../SpotifyService"
import { dataStore, SongHistoryItem, AppStats } from "./DataStore"
import { readdirSync, existsSync } from "fs"

// Import appEvents conditionally to avoid circular dependency issues
let appEvents: { emit: (event: string, data: unknown) => void } | null = null
try {
    appEvents = require("../main").appEvents
} catch {
    // Running outside electron context
}

export interface CurrentSongInfo {
    name: string
    artist: string
    progress: number
    duration: number
    albumArt?: string
    spotifyUri?: string
    id?: string  // Spotify track ID for like/unlike functionality
}

export interface CurrentLyricsInfo {
    currentLine: string
    nextLine: string
    source: string
    hasLyrics: boolean
    lines: Array<{time: number, text: string, endTime?: number, words?: Array<{ startTime: number, endTime?: number, text: string }>}>
    currentLineIndex: number
    progress: number
    isPlaying: boolean
}

export class LyricsStatusApp {
    private lyricsFetcher: LyricsFetcher
    private playbackState: PlaybackState
    private playbackStateUpdater: PlaybackStateUpdater
    private statusChanger: StatusChanger
    private lastStatusText: string = ""

    private updateInterval: NodeJS.Timeout | null = null
    private statusInterval: NodeJS.Timeout | null = null

    public isRunning: boolean = false

    constructor() {
        this.lyricsFetcher = new LyricsFetcher()
        this.lyricsFetcher.addSource(new SpotifySource())
        this.lyricsFetcher.addSource(new LrcLibSource())
        this.lyricsFetcher.addSource(new NetEaseMusicSource())
        this.lyricsFetcher.addSource(new QQMusicSource())

        this.playbackState = new PlaybackState()
        this.playbackStateUpdater = new PlaybackStateUpdater(this.playbackState, this.lyricsFetcher)
        this.statusChanger = new StatusChanger(this.playbackState)
    }

    public async start(): Promise<void> {
        if (this.isRunning) return

        this.isRunning = true

        await SpotifyService.refresh()

        // Update playback state every 2 seconds (was 300ms - too aggressive, caused rate limits)
        this.updateInterval = setInterval(async () => {
            const previousSongId = this.playbackState.songId
            const previousHasLyrics = this.playbackState.hasLyrics

            await this.playbackStateUpdater.update()

            if (previousSongId !== this.playbackState.songId && this.playbackState.songId) {
                this.statusChanger.songChanged()

                const songInfo = this.getCurrentSong()
                if (songInfo) {
                    // Add to persistent history - use updated hasLyrics after fetch completes
                    dataStore.addToHistory({
                        name: songInfo.name,
                        artist: songInfo.artist,
                        timestamp: Date.now(),
                        hadLyrics: this.playbackState.hasLyrics,
                        spotifyUri: this.playbackState.songUri,
                        albumArt: this.playbackState.albumArt
                    })

                    appEvents?.emit("song:changed", songInfo)
                }
            } else if (previousSongId === this.playbackState.songId && previousHasLyrics !== this.playbackState.hasLyrics) {
                // Lyrics status changed for same song - update history
                dataStore.updateSongLyrics(
                    this.playbackState.songName,
                    this.playbackState.songAuthor,
                    this.playbackState.hasLyrics
                )
            }
        }, 1500)  // 1.5 seconds - balanced between responsiveness and rate limits

        // Update status 60 times per second
        let lastUpdate = Date.now()
        this.statusInterval = setInterval(() => {
            const now = Date.now()
            if (this.playbackState.isPlaying) {
                this.playbackState.songProgress += now - lastUpdate
            }

            const currentStatus = this.statusChanger.getCurrentStatusText()
            if (currentStatus && currentStatus !== this.lastStatusText) {
                dataStore.incrementStatusChanges()
                this.lastStatusText = currentStatus
            }

            this.statusChanger.changeStatus()

            if (this.playbackState.ended) {
                this.statusChanger.songChanged()
            }

            const lyricsInfo = this.getCurrentLyrics()
            if (lyricsInfo) {
                appEvents?.emit("lyrics:updated", lyricsInfo)
            }

            lastUpdate = now
        }, 1000 / 60)
    }

    public stop(): void {
        if (!this.isRunning) return

        this.isRunning = false

        if (this.updateInterval) {
            clearInterval(this.updateInterval)
            this.updateInterval = null
        }

        if (this.statusInterval) {
            clearInterval(this.statusInterval)
            this.statusInterval = null
        }

        // Clear Discord status
        this.statusChanger.clearStatus()

        // Force save data
        dataStore.forceSave()
    }

    // Clear Discord status (when paused)
    public clearDiscordStatus(): void {
        this.statusChanger.clearStatus()
    }

    public toggle(): void {
        if (this.isRunning) {
            this.stop()
        } else {
            this.start()
        }
    }

    public isPlaying(): boolean {
        return this.playbackState.isPlaying
    }

    public getCurrentSong(): CurrentSongInfo | null {
        if (!this.playbackState.songId) return null

        return {
            name: this.playbackState.songName,
            artist: this.playbackState.songAuthor,
            progress: this.playbackState.songProgress,
            duration: this.playbackState.songDuration,
            albumArt: this.playbackState.albumArt,
            spotifyUri: this.playbackState.songUri,
            id: this.playbackState.songId  // Include track ID for like button
        }
    }

    public getCurrentLyrics(): CurrentLyricsInfo | null {
        const lyrics = this.playbackState.lyrics
        const currentLine = this.playbackState.currentLine

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
            }
        }

        const currentIndex = lyrics.lines.findIndex(l => l === currentLine)
        const nextLine = currentIndex >= 0 && currentIndex < lyrics.lines.length - 1
            ? lyrics.lines[currentIndex + 1].text
            : ""

        return {
            currentLine: currentLine?.text ?? "",
            nextLine,
            source: this.lyricsFetcher.lastFetchedFrom,
            hasLyrics: this.playbackState.hasLyrics,
            lines: lyrics.lines.map(l => ({ time: l.time, text: l.text, endTime: l.endTime, words: l.words })),
            currentLineIndex: currentIndex,
            progress: this.playbackState.songProgress,
            isPlaying: this.playbackState.isPlaying
        }
    }

    public getHistory(): SongHistoryItem[] {
        return dataStore.getHistory()
    }

    public clearHistory(): void {
        dataStore.clearHistory()
    }

    public getStats(): AppStats {
        return dataStore.getStats()
    }

    public getCachedSongsCount(): number {
        const cachePath = "./cache"
        try {
            if (existsSync(cachePath)) {
                const files = readdirSync(cachePath)
                return files.filter(f => f.endsWith(".json")).length
            }
        } catch {
            // Cache folder doesn't exist or can't be read
        }
        return 0
    }
}
