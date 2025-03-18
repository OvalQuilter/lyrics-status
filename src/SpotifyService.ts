// Functions cleanBuffer, base32FromBytes and generateTotp are rewrited from Dart, taken from Spotube repository (https://github.com/KRTirtho/spotube)

import { TOTP } from "totp-generator"
import { Settings } from "./Settings"

interface IGetTimeResponse {
    serverTime: number
}

interface IAccessTokenResponse {
    accessToken: string
}

export class SpotifyService {
    public static token: string = ""

    private static _cleanBuffer(e: string): Uint8Array {
        e = e.replaceAll(" ", ""); // Удаляем пробелы
        const n = new Uint8Array(e.length / 2);

        for (let r = 0; r < e.length; r += 2) {
            n[r / 2] = parseInt(e.substring(r, r + 2), 16);
        }

        return n;
    }

    private static _base32FromBytes(bytes: Uint8Array, salt: string): string {
        let t = 0
        let n = 0
        let r = ""

        for (let i = 0; i < bytes.length; i++) {
            n = n << 8 | bytes[i]
            t += 8

            while (t >= 5) {
                r += salt[n >>> t - 5 & 31]
                t -= 5
            }
        }

        if (t > 0) {
            r += salt[n << 5 - t & 31]
        }

        return r
    }

    private static async _getServerTime(): Promise<number> {
        const request = await fetch("https://open.spotify.com/server-time", {
            "headers": {
                "accept": "*/*",
                "Referer": "https://open.spotify.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/237.84.2.178 Safari/537.36"
            }
        })

        const json = await request.json() as IGetTimeResponse

        return json.serverTime
    }

    private static async _generateTotp(): Promise<{ otp: string, expires: number }> {
        const secretSalt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
        const secretCipherBytes = [
            12,
            56,
            76,
            33,
            88,
            44,
            88,
            33,
            78,
            78,
            11,
            66,
            22,
            22,
            55,
            69,
            54
        ].map((e, t) => e ^ t % 33 + 9)

        const secretBytes = this._cleanBuffer(
            Array.from(
                new TextEncoder()
                    .encode(secretCipherBytes.join(""))
            )
                .map((e) => e.toString(16))
                .join("")
        )
        const secret = this._base32FromBytes(secretBytes, secretSalt)

        const serverTime = await this._getServerTime()

        return TOTP.generate(secret, {
            timestamp: serverTime * 1000
        })
    }

    public static async refresh(): Promise<void> {
        const totp = await this._generateTotp()

        const request = await fetch(`https://open.spotify.com/get_access_token?reason=init&productType=web-player&totp=${totp.otp}&totpVer=5`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": Settings.credentials.cookies,
                "Referer": "https://open.spotify.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        });

        const json = await request.json() as IAccessTokenResponse

        this.token = json.accessToken
    }
}
