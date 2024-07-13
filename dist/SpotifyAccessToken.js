"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyAccessToken = void 0;
const node_fs_1 = require("node:fs");
const Debug_1 = require("./Debug");
class SpotifyAccessToken {
    static refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch("https://open.spotify.com/get_access_token?reason=transport&productType=web_player", {
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
            });
            const json = yield request.json();
            this.token = json.accessToken;
        });
    }
    static getCookie() {
        let cookie;
        try {
            cookie = (0, node_fs_1.readFileSync)("./cookie.txt").toString();
        }
        catch (e) {
            Debug_1.Debug.write("An error occurred while trying to read cookies from file. Error: " + e.stack);
            return process.exit(1);
        }
        return cookie;
    }
}
exports.SpotifyAccessToken = SpotifyAccessToken;
_a = SpotifyAccessToken;
SpotifyAccessToken.token = "";
SpotifyAccessToken.cookie = _a.getCookie();
