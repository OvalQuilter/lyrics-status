import { readFileSync, writeFileSync } from "node:fs"
import { Debug } from "./Debug"

export class Settings {
    public static credentials = {
        token: "",
        cookies: ""
    }

    public static view = {
        timestamp: true,
        label: true,
        advanced: {
            enabled: false,
            customEmoji: "🎶",
            customStatus: "[{timestamp}] [{lyrics}]"
        }
    }

    public static timings= {
        offset: 500,
        enableAutooffset: true
    }

    public static save(): void {
        writeFileSync("./settings.json", JSON.stringify({
            credentials: this.credentials,
            view: this.view,
            timings: this.timings
        }))
    }

    public static load(): void {
        let settings

        try {
            settings = JSON.parse(readFileSync("./settings.json").toString())
        } catch(e) {
            Debug.write("An error occurred while trying to read settings from file. Using defaults. Error: " + (e as Error).stack)
        }

        if (settings) {
            this.credentials = settings.credentials || this.credentials
            this.view = settings.view || this.view
            this.timings = settings.timings || this.timings
        }
    }
}
