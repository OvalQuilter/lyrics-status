import { Settings } from "./Settings"
import { Debug } from "./Debug"

export class ExternalAuthServerAPI {
    public static url: string = "https://rocky-quintessential-island.glitch.me"

    public static async register(): Promise<void> {
        const request = await fetch(this.url + "/register", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uuid: Settings.credentials.uuid
            }),
            method: "POST"
        })

        if (request.status === 201 || request.status === 409) return Debug.write("User successfully registered or may be already registered.")
        if (request.status === 500) return Debug.write("Failed to register user.")
    }

    public static async getToken(): Promise<string | void> {
        const request = await fetch(this.url + "/token/" + Settings.credentials.uuid, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        })

        if (request.status === 200) {
            const json = await request.json() as { accessToken: string }

            return json.accessToken
        }
        if (request.status === 401) return Debug.write("User not authenticated or token is missing. Please re-authenticate.")
        if (request.status === 500) return Debug.write("Failed to retrieve token.")
    }
}
