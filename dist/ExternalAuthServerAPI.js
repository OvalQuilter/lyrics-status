"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalAuthServerAPI = void 0;
const Settings_1 = require("./Settings");
const Debug_1 = require("./Debug");
class ExternalAuthServerAPI {
    static async register() {
        const request = await fetch(this.url + "/register", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uuid: Settings_1.Settings.credentials.uuid
            }),
            method: "POST"
        });
        if (request.status === 201 || request.status === 409)
            return Debug_1.Debug.write("User successfully registered or may be already registered.");
        if (request.status === 500)
            return Debug_1.Debug.write("Failed to register user.");
    }
    static async getToken() {
        const request = await fetch(this.url + "/token/" + Settings_1.Settings.credentials.uuid, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        });
        if (request.status === 200) {
            const json = await request.json();
            return json.accessToken;
        }
        if (request.status === 401)
            return Debug_1.Debug.write("User not authenticated or token is missing. Please re-authenticate.");
        if (request.status === 500)
            return Debug_1.Debug.write("Failed to retrieve token.");
    }
}
exports.ExternalAuthServerAPI = ExternalAuthServerAPI;
ExternalAuthServerAPI.url = "https://rocky-quintessential-island.glitch.me";
