import { LyricsFetcher } from "./LyricsFetcher"
import { PlaybackState } from "./PlaybackState"
import { PlaybackStateUpdater } from "./PlaybackStateUpdater"
import { StatusChanger } from "./StatusChanger"
import { SpotifySource } from "./Sources/SpotifySource"
import { NetEaseMusicSource } from "./Sources/NetEaseMusicSource"
import { QQMusicSource } from "./Sources/QQMusicSource"
import { WebServer } from "./Panel/WebServer"
import { SpotifyAccessToken } from "./SpotifyAccessToken"

export class LyricsStatus {
    public lyricsFetcher: LyricsFetcher

    public playbackState: PlaybackState
    public playbackStateUpdater: PlaybackStateUpdater

    public statusChanger: StatusChanger

    public webServer: WebServer

    constructor() {
        this.lyricsFetcher = new LyricsFetcher()

        this.lyricsFetcher.addSource(new SpotifySource())
        this.lyricsFetcher.addSource(new NetEaseMusicSource())
        this.lyricsFetcher.addSource(new QQMusicSource())

        this.playbackState = new PlaybackState()
        this.playbackStateUpdater = new PlaybackStateUpdater(this.playbackState, this.lyricsFetcher)

        this.statusChanger = new StatusChanger(this.playbackState)

        this.webServer = new WebServer()
    }

    public init(): void {
        SpotifyAccessToken.refresh()

        this.initIntervals()

        this.webServer.startRouting()
        this.webServer.startListeners()
        this.webServer.startServer(8999)
    }

    public initIntervals(): void {
        setInterval(() => {
            this.playbackStateUpdater.update()
        }, 3000)

        let now = Date.now()
        setInterval(() => {
            this.statusChanger.changeStatus()

            this.playbackState.songProgress += Date.now() - now

            if (this.playbackState.ended) this.statusChanger.songChanged()

            now = Date.now()
        }, 1000 / 60)

        setInterval(() => {
            console.clear()
            console.log(`
            Song: ${this.playbackState.songName || "Not listening"}
            Author: ${this.playbackState.songAuthor || "Not listening"}
            Song progress: ${this.statusChanger.formatSeconds(+(this.playbackState.songProgress / 1000).toFixed(0))}
            Current lyrics: ${this.playbackState.currentLine && this.playbackState.currentLine.text || "Not available"}
            Lyrics fetched from: ${this.lyricsFetcher.lastFetchedFrom}
            `)
        }, 500)
    }
}