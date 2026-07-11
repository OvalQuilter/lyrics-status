import { Settings } from "./Settings"

interface IAccessTokenResponse {
    access_token: string
    refresh_token: string
}

export class SpotifyService {
    public static token: string = ""

    public static async exchange(): Promise<void> {
        const request = await fetch("https://accounts.spotify.com/api/token", {
            "headers": {
                "Authorization": `Basic ${Buffer.from(`${Settings.credentials.clientID}:${Settings.credentials.clientSecret}`).toString('base64')}`,
                "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: new URLSearchParams({
                client_id: Settings.credentials.clientID,
                grant_type: "authorization_code",
                code: Settings.credentials.code,
                redirect_uri: Settings.credentials.customRedirectUri
            }).toString(),
            "method": "POST"
        });

        if (!request.ok) return

        const json = await request.json() as IAccessTokenResponse

        this.token = json.access_token

        Settings.credentials.refreshToken = json.refresh_token
    }

    public static async refresh(): Promise<void> {
        const request = await fetch("https://accounts.spotify.com/api/token", {
            "headers": {
                "Authorization": `Basic ${Buffer.from(`${Settings.credentials.clientID}:${Settings.credentials.clientSecret}`).toString('base64')}`,
                "content-type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: Settings.credentials.refreshToken,
                redirect_uri: Settings.credentials.customRedirectUri
            }).toString(),
            "method": "POST"
        });

        if (!request.ok) return

        const json = await request.json() as IAccessTokenResponse

        this.token = json.access_token

        if (json.refresh_token) Settings.credentials.refreshToken = json.refresh_token
    }
}
