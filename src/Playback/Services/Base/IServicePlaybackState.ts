export interface IServicePlaybackStateData {
    songId: string
    songName: string
    songArtist: string
    songAlbum: string

    songDuration: number
    songProgress: number

    isPlaying: boolean
}
