import { readFileSync, writeFileSync } from "fs"
import { Debug } from "./Debug"
import { ISettingsData } from "./ISettingsData"

export class SettingsManager {
    public static instance: SettingsManager = new SettingsManager()

    public data: ISettingsData

    constructor() {
        this.data = this.defaultSettings
    }

    public get defaultSettings(): ISettingsData {
        return {
            credentials: {
                token: "",
                cookies: ""
            },
            view: {
                timestamp: true,
                label: true,
                advanced: {
                    enabled: false,
                    customEmoji: "🎶",
                    customStatus: "[{timestamp}] [{lyrics}]"
                }
            },
            timings: {
                sendTimeOffset: 500,
                enableAutooffset: true,
                autooffset: 3
            },
            update: {
                enableAutoupdate: true
            }
        }
    }

    public save(): void {
        writeFileSync("./settings.json", JSON.stringify(this.data))
    }

    public loadSettings(): void {
        let settings

        try {
            settings = JSON.parse(readFileSync("./settings.json").toString())
        } catch(e) {
            Debug.write("An error occurred while trying to read settings from file. Using defaults. Error: " + (e as Error).stack)
        }

        if (settings) {
            this.data = settings
        }
    }
}
