import { LyricsFetcher } from "./LyricsFetcher"
import { LrcLibSource } from "./Sources/LrcLibSource"
import { NetEaseMusicSource } from "./Sources/NetEaseMusicSource"
import { QQMusicSource } from "./Sources/QQMusicSource"
import { PlaybackStateUpdater } from "./PlaybackStateUpdater"
import { PlaybackState } from "./PlaybackState"
import { StatusChanger } from "./StatusChanger"
import { Debug } from "./Debug"
import { startServer } from "./Panel/Server"
import { Settings } from "./Settings"
import { Updater } from "./Updater"
import { v4 as uuidv4 } from "uuid"

// ─── Bootstrap ────────────────────────────────────────────────────────────────

Settings.load()

if (Settings.update.enableAutoupdate) {
    Updater.tryUpdate()
        .then(init)
        .catch((e: Error) => {
            Debug.write(`Auto-update failed: ${e.stack}`)
            init()
        })
} else {
    init()
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function init(): void {
    // Ensure a stable UUID exists for this installation
    if (!Settings.credentials.uuid) {
        Settings.credentials.uuid = uuidv4()
        Settings.save()
    }

    // Lyrics sources — tried in order, first success wins
    const lyricsFetcher = new LyricsFetcher()
    lyricsFetcher.addSource(new LrcLibSource())       // best synced-LRC coverage
    lyricsFetcher.addSource(new NetEaseMusicSource()) // large Chinese + global catalogue
    lyricsFetcher.addSource(new QQMusicSource())      // last resort

    const playbackState        = new PlaybackState()
    const playbackStateUpdater = new PlaybackStateUpdater(playbackState, lyricsFetcher)
    const statusChanger        = new StatusChanger(playbackState)

    // Poll Spotify (via Discord token) every 2 s to detect song changes
    setInterval(() => playbackStateUpdater.update(), 2000)

    // 60 fps loop: advance local progress counter + fire status updates
    let lastTick = Date.now()

    setInterval(() => {
        const now   = Date.now()
        const delta = now - lastTick
        lastTick    = now

        playbackState.songProgress += delta

        statusChanger.changeStatus()

        if (playbackState.ended) statusChanger.songChanged()

        console.clear()
        console.log(
            `  Song:    ${playbackState.songName   || "—"}\n` +
            `  Artist:  ${playbackState.songAuthor || "—"}\n` +
            `  Time:    ${statusChanger.formatSeconds(Math.floor(playbackState.songProgress / 1000))}\n` +
            `  Lyrics:  ${playbackState.currentLine?.text ?? "—"}\n` +
            `  Source:  ${lyricsFetcher.lastFetchedFrom}`
        )
    }, 1000 / 60)

    startServer()
}

// ─── Error handling ───────────────────────────────────────────────────────────

process.on("uncaughtException", (e: Error) => {
    Debug.write(`${e.stack}\n${e.cause ?? ""}`)

    // Network errors are transient — keep running
    if (!e.message.includes("fetch failed")) process.exit(1)
})
