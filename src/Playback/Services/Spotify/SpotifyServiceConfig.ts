import { IServiceConfig } from "../Base/IServiceConfig"

export const SpotifyServiceConfig: IServiceConfig = {
    "name": "Spotify",
    "authMethods": [{
        "name": "OAuth",
        "type": "oauth",
        "token": "",
        "oauthUrl": "",
        "callbackUrl": "",
    }],
    isMainService: true,
}
