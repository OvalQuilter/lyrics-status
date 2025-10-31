import { LyricsFetcher } from "./LyricsFetcher"
import { SpotifySource} from "./Sources/SpotifySource"
import { NetEaseMusicSource } from "./Sources/NetEaseMusicSource"
import { LrcLibSource } from "./Sources/LrcLibSource"
import { QQMusicSource } from "./Sources/QQMusicSource"
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
import { translateLyrics } from "./Translation"


Settings.load()

if (Settings.update.enableAutoupdate) {
    Updater.tryUpdate()
        .then(() => {
            init()
        })
        .catch((e) => {
            Debug.write("LyricsStatus failed to update. Error: " + e.stack)

            init()
        })
} else {
    init()
}

   async function init(): Promise<void> {
    if (!Settings.credentials.uuid) {
        Settings.credentials.uuid = uuidv4()

        Settings.save()
    }
    ExternalAuthServerAPI.register()

    SpotifyService.refresh()

    const lyricsFetcher = new LyricsFetcher()
    lyricsFetcher.addSource(new SpotifySource())
    lyricsFetcher.addSource(new LrcLibSource())
    lyricsFetcher.addSource(new NetEaseMusicSource())
    lyricsFetcher.addSource(new QQMusicSource())

    const playbackState = new PlaybackState()
    const playbackStateUpdater = new PlaybackStateUpdater(playbackState, lyricsFetcher)

    const statusChanger = new StatusChanger(playbackState)
    
    setInterval(() => {
        playbackStateUpdater.update()

        //console.log(playbackState)
        //console.log(statusChanger, playbackStateUpdater, SpotifyAccessToken)
    }, 5000)

    let now = Date.now()
    setInterval(async () => {
        statusChanger.changeStatus()

        playbackState.songProgress += Date.now() - now

        if (playbackState.ended) statusChanger.songChanged()
        let currentText = (playbackState.currentLine && playbackState.currentLine.text) || "Not available"
        if (Settings.translation.enableTranslation && playbackState.currentLine) {
            try {
                    currentText = await translateLyrics(playbackState.currentLine.text, Settings.translation.translationLanguage)
                } catch (e) {
                    Debug.write("Translation failed: " + (e as Error).message)
                }
            }

        console.clear()
        console.log(`
    Song: ${playbackState.songName || "Not listening"}
    Author: ${playbackState.songAuthor || "Not listening"}
    Song progress: ${statusChanger.formatSeconds(+(playbackState.songProgress / 1000).toFixed(0))}
    Current lyrics: ${currentText}
    Lyrics fetched from: ${lyricsFetcher.lastFetchedFrom}
    `)

        now = Date.now()
    }, 1000 / 60)

    startServer()
}

process.on("uncaughtException", (e) => {
    Debug.write(e.stack + "\n" + e.cause)

    if (!e.message.includes("fetch failed")) {
        process.exit(1)
    }
})
