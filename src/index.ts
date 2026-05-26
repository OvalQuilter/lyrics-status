import { execSync } from "child_process"
import * as path from "path"

// --- Startup checks ---
const _nodeVer = process.versions.node.split(".").map(Number)
if (_nodeVer[0] < 17) {
    console.error(`\x1b[31m[lyrics-status] Node.js v${process.versions.node} is not supported. Please upgrade to v17 or later.\x1b[0m`)
    process.exit(1)
}
try {
    require("better-sqlite3")
} catch (e: any) {
    if (e.code === "ERR_DLOPEN_FAILED" || (e.message && e.message.includes("NODE_MODULE_VERSION"))) {
        console.error(`\x1b[33m[lyrics-status] Native module mismatch - rebuilding better-sqlite3 for Node.js v${process.versions.node}...\x1b[0m`)
        try {
            execSync("npm rebuild better-sqlite3", { stdio: "inherit", cwd: path.resolve(__dirname, "..") })
            console.log("\x1b[32m[lyrics-status] Rebuild successful - starting...\x1b[0m")
        } catch {
            console.error("\x1b[31m[lyrics-status] Rebuild failed. Try running 'npm rebuild' manually.\x1b[0m")
            process.exit(1)
        }
    } else {
        console.error(`\x1b[31m[lyrics-status] Failed to load better-sqlite3: ${e.message}\x1b[0m`)
        process.exit(1)
    }
}
// --- End startup checks ---
import { LyricsFetcher } from "./LyricsFetcher"
import { CacheStore } from "./CacheStore"
import { SpotifySource } from "./Sources/SpotifySource"
import { NetEaseMusicSource } from "./Sources/NetEaseMusicSource"
import { LrcLibSource } from "./Sources/LrcLibSource"
import { QQMusicSource } from "./Sources/QQMusicSource"
import { MusixmatchSource } from "./Sources/MusixmatchSource"
import { PlaybackStateUpdater } from "./PlaybackStateUpdater"
import { PlaybackState } from "./PlaybackState"
import { StatusChanger } from "./StatusChanger"
import { Debug } from "./Debug"
import { startServer } from "./Panel/Server"
import { Settings } from "./Settings"
import { Updater } from "./Updater"
import { SpotifyService } from "./SpotifyService"
import { v4 as uuidv4 } from "uuid"
import { ExternalAuthServerAPI } from "./ExternalAuthServerAPI"
import * as path from "path"

Settings.load()

const SOURCES: Record<string, { cls: () => any, key: keyof typeof Settings.sources }> = {
    Spotify:    { cls: () => new SpotifySource(),          key: "enableSpotify" },
    Musixmatch: { cls: () => new MusixmatchSource(),       key: "enableMusixmatch" },
    LrcLib:     { cls: () => new LrcLibSource(),           key: "enableLrcLib" },
    NetEase:    { cls: () => new NetEaseMusicSource(),     key: "enableNetEase" },
    QQMusic:    { cls: () => new QQMusicSource(),          key: "enableQQMusic" }
}

if (Settings.update.enableAutoupdate) {
    Updater.tryUpdate()
        .then(() => { init() })
        .catch((e) => { Debug.write("LyricsStatus failed to update. Error: " + e.stack); init() })
} else {
    init()
}

let store: CacheStore | null = null

function init(): void {
    if (!Settings.credentials.uuid) {
        Settings.credentials.uuid = uuidv4()
        Settings.save()
    }
    ExternalAuthServerAPI.register()
    SpotifyService.refresh()

    const dbPath = Settings.cache.path || path.resolve(__dirname, "../cache/cache.db")
    store = new CacheStore(dbPath)

    const lyricsFetcher = new LyricsFetcher(store)
    for (const name of Settings.sources.sourceOrder) {
        const s = SOURCES[name]
        if (s && Settings.sources[s.key] !== false) lyricsFetcher.addSource(s.cls())
    }

    const playbackState = new PlaybackState()
    const playbackStateUpdater = new PlaybackStateUpdater(playbackState, lyricsFetcher)
    const statusChanger = new StatusChanger(playbackState)

    setInterval(() => { playbackStateUpdater.update() }, 5000)

    let now = Date.now()
    setInterval(() => {
        statusChanger.changeStatus()
        playbackState.songProgress += Date.now() - now
        if (playbackState.ended) statusChanger.songChanged()
        // NOTE: src/index.ts display loop is superseded by dist/index.js version.
        // dist version uses ANSI overwrite (no console.clear) and includes gateway/op3 status.
        // Gateway display: GW <op3Used>/5 (connected), GW reconnecting, GW disconnected, or REST.
        console.clear()
        console.log(`
    Song: ${playbackState.songName || "Not listening"}
    Author: ${playbackState.songAuthor || "Not listening"}
    Song progress: ${statusChanger.formatSeconds(+(playbackState.songProgress / 1000).toFixed(0))}
    Current lyrics: ${(playbackState.currentLine && playbackState.currentLine.text) || "Not available"}
    Lyrics fetched from: ${lyricsFetcher.lastFetchedFrom}
    `)
        now = Date.now()
    }, 1000 / 60)

    startServer()
}

function shutdown() {
    try { store?.close() } catch {}
    process.exit(0)
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)

process.on("uncaughtException", (e) => {
    Debug.write(e.stack + "\n" + e.cause)
    try { store?.close() } catch {}
    if (!e.message.includes("fetch failed")) process.exit(1)
})
