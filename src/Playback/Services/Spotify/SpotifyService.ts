import axios from "axios"
import { BaseService } from "../Base/BaseService"
import { IAuthMethod } from "../Base/IAuthMethod"
import { IServiceConfig } from "../Base/IServiceConfig"
import { IServicePlaybackStateData } from "../Base/IServicePlaybackState"
import { ISpotifyCredentials } from "./ISpotifyCredentials"
import { SpotifyServiceConfig } from "./SpotifyServiceConfig"

export class SpotifyService extends BaseService {
    public static readonly API_URL = "https://api.spotify.com/v1"

    public readonly name: string = "SpotifyService"

    public authMethods: IAuthMethod[]

    private _credentials: ISpotifyCredentials = {
        accessToken: "",
        accessTokenExpiration: 0,

        refreshToken: "",
    }

    public constructor(config: IServiceConfig = SpotifyServiceConfig) {
        super()

        this.authMethods = config.authMethods
    }

    public async getPlaybackState(): Promise<IServicePlaybackStateData> {
        const response = await axios.get(SpotifyService.API_URL + "/me/player", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._credentials.accessToken,
            },
        })

        const json = response.data

        return {
            songId: json.item.id,
            songName: json.item.name,
            songArtist: json.item.artists[0].name,
            songAlbum: json.item.album.name,

            songDuration: json.item.duration_ms,
            songProgress: json.progress_ms,

            isPlaying: json.is_playing,
        }
    }
}
