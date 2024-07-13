import { readFileSync } from "node:fs"
import { Debug } from "./Debug"

interface AccessTokenResponse {
    accessToken: string
}

export class SpotifyAccessToken {
    public static token: string = ""

    public static readonly cookie: string = this.getCookie()

    public static async refresh(): Promise<void> {

        const request = await fetch("https://open.spotify.com/get_access_token?reason=transport&productType=web_player", {
            "headers": {
                "accept": "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "priority": "u=0, i",
                "sec-ch-ua": "\"Opera\";v=\"111\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?1",
                "sec-ch-ua-platform": "\"Android\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "cookie": this.cookie,
                "Referer": "https://open.spotify.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        })

        const json = await request.json() as AccessTokenResponse

        this.token = json.accessToken
    }

    public static getCookie(): string {
        let cookie: string | undefined

        try {
            cookie = readFileSync("./cookie.txt").toString()
        } catch(e) {
            Debug.write("An error occurred while trying to read cookies from file. Error: " + (e as Error).stack)

            return process.exit(1)
        }

        return cookie
    }
}

