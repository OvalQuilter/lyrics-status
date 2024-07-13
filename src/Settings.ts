import { readFileSync, writeFileSync } from "node:fs"
import { Debug } from "./Debug"

export class Settings {
    public static token: string

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
            token: this.token,
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
            this.token = settings.token
            this.view = settings.view
            this.timings = settings.timings
        }
    }
}
