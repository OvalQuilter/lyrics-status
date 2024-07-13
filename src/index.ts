import { LyricsFetcher } from "./LyricsFetcher"
import { NetEaseMusicSource } from "./Sources/NetEaseMusicSource"
import { QQMusicSource } from "./Sources/QQMusicSource"
import { PlaybackStateUpdater } from "./PlaybackStateUpdater"
import { PlaybackState } from "./PlaybackState"
import { StatusChanger } from "./StatusChanger"
import { SpotifyAccessToken } from "./SpotifyAccessToken"
import { Debug } from "./Debug"
import { startServer } from "./Panel/Server"
import { Settings } from "./Settings"

const lyricsFetcher = new LyricsFetcher()
lyricsFetcher.addSource(new NetEaseMusicSource())
lyricsFetcher.addSource(new QQMusicSource())

const playbackState = new PlaybackState()
const playbackStateUpdater = new PlaybackStateUpdater(playbackState, lyricsFetcher)

const statusChanger = new StatusChanger(playbackState)

SpotifyAccessToken.refresh()
Settings.load()

setInterval(() => {
    playbackStateUpdater.update()

    //console.log(playbackState)
    //console.log(statusChanger, playbackStateUpdater, SpotifyAccessToken)
}, 1500)

setInterval(() => {
    statusChanger.changeStatus()

    playbackState.songProgress += 100

    console.clear()
    console.log(`
    Song: ${playbackState.songName || "Not listening"}
    Author: ${playbackState.songAuthor || "Not listening"}
    Lyrics: ${(playbackState.currentLine && playbackState.currentLine.text) || "Not available"}
    Lyrics fetched from: ${lyricsFetcher.lastFetchedFrom}
    `)
}, 100)

startServer()

process.on("uncaughtException", (e) => {
    Debug.write(e.stack + "\n" + e.cause)

    if (!e.message.includes("fetch failed")) {
        process.exit(1)
    }
})