import { readFileSync, writeFileSync } from "node:fs"
import { Debug } from "./Debug"

export class Settings {
    public static credentials = {
        token: "",
        cookies: "",
        musixmatchToken: "",
        clientID: "",
        clientSecret: "",
        useExternalAuthServer: "",
        code: "",
        refreshToken: "",
        uuid: "",
        customRedirectUri: ""
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

    public static timings = {
        sendTimeOffset: 500,
        enableAutooffset: true,
        autooffset: 3
    }

    public static update = {
        enableAutoupdate: true
    }

    public static rateLimit = {
        enableBackoff: true,
        enableMinInterval: true,
        minIntervalMs: 5000,
        enableMergeLines: true,
        mergeWindowMs: 8000
    }

    public static sources = {
        enableSpotify: true,
        enableMusixmatch: true,
        enableLrcLib: true,
        enableNetEase: true,
        enableQQMusic: true,
        sourceOrder: ["Spotify", "Musixmatch", "LrcLib", "NetEase", "QQMusic"] as string[]
    }

    public static cache = {
        path:          "",
        lyricsTtlDays: 30,
        emptyTtlDays:  7,
        errorTtlHours: 1,
        maxRows:       2000
    }

    public static chineseConversion: "off" | "toTraditional" | "toSimplified" = "off"

    public static save(): void {
        try {
            writeFileSync("./settings.json", JSON.stringify({
                credentials: this.credentials,
                view: this.view,
                timings: this.timings,
                update: this.update,
                rateLimit: this.rateLimit,
                sources: this.sources,
                cache: this.cache,
                chineseConversion: this.chineseConversion
            }))
        } catch (e) {
            console.error("[lyrics-status] Failed to save settings.json:", (e as Error).message)
            Debug.write("Failed to save settings.json: " + (e as Error).stack)
        }
    }

    public static load(): void {
        let settings

        try {
            settings = JSON.parse(readFileSync("./settings.json").toString())
        } catch(e) {
            console.warn("[lyrics-status] Could not read settings.json — using defaults. (" + (e as Error).message + ")")
            Debug.write("An error occurred while trying to read settings from file. Using defaults. Error: " + (e as Error).stack)
        }

        if (settings) {
            this.credentials = settings.credentials || this.credentials
            this.view = settings.view || this.view
            this.timings = settings.timings || this.timings
            this.update = settings.update || this.update
            this.rateLimit = { ...this.rateLimit, ...(settings.rateLimit || {}) }
            this.sources = { ...this.sources, ...(settings.sources || {}) }
            if (settings.cache) this.cache = { ...this.cache, ...settings.cache }
            if (settings.chineseConversion) this.chineseConversion = settings.chineseConversion
        }
    }
}
