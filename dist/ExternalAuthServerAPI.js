"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalAuthServerAPI = void 0;
const Settings_1 = require("./Settings");
const Debug_1 = require("./Debug");

const BASE = "https://rocky-quintessential-island.glitch.me";
const _req = (path, method, body) => fetch(BASE + path, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });

class ExternalAuthServerAPI {
    static async register() {
        const r = await _req("/register", "POST", { uuid: Settings_1.Settings.credentials.uuid });
        if (r.status === 201 || r.status === 409) return Debug_1.Debug.write("User registered.");
        if (r.status === 500) Debug_1.Debug.write("Failed to register user.");
    }
    static async getToken() {
        const r = await _req("/token/" + Settings_1.Settings.credentials.uuid, "GET");
        if (r.status === 200) return (await r.json()).accessToken;
        if (r.status === 401) Debug_1.Debug.write("User not authenticated — re-authenticate.");
        if (r.status === 500) Debug_1.Debug.write("Failed to retrieve token.");
        return null;
    }
}
exports.ExternalAuthServerAPI = ExternalAuthServerAPI;
ExternalAuthServerAPI.url = BASE;
