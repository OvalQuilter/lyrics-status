import { IServiceConfig } from "../Base/IServiceConfig"

export const SpotifyServiceConfig: IServiceConfig = {
    "name": "Spotify",
    "authMethods": [{
        "name": "OAuth",
        "type": "oauth",
        "value": "",
        "oauthUrl": "",
        "callbackUrl": "",
    }],
    isMainService: true,
}
