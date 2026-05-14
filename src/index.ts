import { LyricsFetcher } from "./LyricsFetcher"
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


function init(): void {
    if (!Settings.credentials.uuid) {
        Settings.credentials.uuid = uuidv4()
        Settings.save()
    }
    ExternalAuthServerAPI.register()
    SpotifyService.refresh()

    const lyricsFetcher = new LyricsFetcher()
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

process.on("uncaughtException", (e) => {
    Debug.write(e.stack + "\n" + e.cause)
    if (!e.message.includes("fetch failed")) process.exit(1)
})
