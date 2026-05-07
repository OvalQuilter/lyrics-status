import { readFileSync, writeFileSync } from "node:fs"
import { Debug } from "./Debug"

// ─── Settings ─────────────────────────────────────────────────────────────────

/**
 * Static configuration store. Loaded from `settings.json` on startup and
 * persisted back whenever the user saves from the web panel.
 */
export class Settings {
    /** Discord user token — used both to update the custom status and to
     *  retrieve the Spotify access token from Discord's connections API. */
    public static credentials = {
        token: "",
        uuid:  "",
    }

    public static view = {
        /** Prepend `[m:ss]` to the status text. */
        timestamp: true,
        /** Prepend `Song lyrics -` to the status text. */
        label: true,
        advanced: {
            /** When true, `customStatus` is used instead of the simple format. */
            enabled: false,
            /** Emoji shown next to the status. Empty string = no emoji. */
            customEmoji: "🎶",
            customStatus: "[{timestamp}] [{lyrics}]",
        },
    }

    public static timings = {
        /** Fixed ms to send the status update ahead of the lyric timestamp. */
        sendTimeOffset: 500,
        /** When true, offset is calculated automatically from API latency. */
        enableAutooffset: true,
        /** Number of samples used for the autooffset average. */
        autooffset: 3,
    }

    public static update = {
        enableAutoupdate: true,
    }

    // ── Persistence ───────────────────────────────────────────────────────────

    public static save(): void {
        writeFileSync(
            "./settings.json",
            JSON.stringify(
                {
                    credentials: this.credentials,
                    view:        this.view,
                    timings:     this.timings,
                    update:      this.update,
                },
                null,
                2
            )
        )
    }

    public static load(): void {
        let saved: Record<string, unknown> | undefined

        try {
            saved = JSON.parse(readFileSync("./settings.json", "utf-8"))
        } catch (e) {
            Debug.write(`Could not read settings.json, using defaults. Error: ${(e as Error).stack}`)
        }

        if (!saved) return

        // Migrate: old settings had many Spotify credential fields — pick only what we need
        if (saved.credentials && typeof saved.credentials === "object") {
            const creds = saved.credentials as Record<string, string>
            this.credentials.token = creds.token ?? ""
            this.credentials.uuid  = creds.uuid  ?? ""
        }

        if (saved.view)    this.view    = { ...this.view,    ...(saved.view    as typeof this.view)    }
        if (saved.timings) this.timings = { ...this.timings, ...(saved.timings as typeof this.timings) }
        if (saved.update)  this.update  = { ...this.update,  ...(saved.update  as typeof this.update)  }
    }
}
