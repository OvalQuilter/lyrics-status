import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync, unlinkSync } from "node:fs"
import { join } from "node:path"
import { Debug } from "./Debug"

// Debounce timer for batching rapid saves
let saveDebounceTimer: NodeJS.Timeout | null = null
const SAVE_DEBOUNCE_MS = 500

// Get the settings path - use app.getPath in Electron, fallback to local for CLI
let settingsPath = "./settings.json"

export function initSettingsPath(userDataPath: string): void {
    // Ensure directory exists
    if (!existsSync(userDataPath)) {
        mkdirSync(userDataPath, { recursive: true })
    }
    settingsPath = join(userDataPath, "settings.json")
    Debug.write(`Settings path initialized: ${settingsPath}`)
}

export function getSettingsPath(): string {
    return settingsPath
}

export interface IAllSettings {
    credentials: typeof Settings.credentials
    view: typeof Settings.view
    timings: typeof Settings.timings
    general: typeof Settings.general
    update: typeof Settings.update
}

export class Settings {
    public static credentials = {
        token: "",
        cookies: "",
        clientID: "",
        clientSecret: "",
        useExternalAuthServer: false,
        code: "",
        refreshToken: "",
        uuid: "",
        customRedirectUri: "http://127.0.0.1:67/callback"
    }

    public static view = {
        timestamp: true,
        label: true,
        emoji: {
            enabled: true,
            name: "🎶",
            id: null as string | null,
            animated: false
        },
        advanced: {
            enabled: false,
            customStatus: "[{timestamp}] {lyrics}"
        }
    }

    public static timings = {
        sendTimeOffset: 500,
        enableAutooffset: true,
        autooffset: 3
    }

    public static general = {
        autoStart: false,
        startMinimized: false,
        theme: "dark" as "dark" | "light" | "spotify" | "discord",
        language: "en" as "en" | "de"
    }

    public static update = {
        enableAutoupdate: true
    }

    public static save(): void {
        // Debounce to batch rapid saves
        if (saveDebounceTimer) {
            clearTimeout(saveDebounceTimer)
        }
        
        saveDebounceTimer = setTimeout(() => {
            this.saveImmediate()
        }, SAVE_DEBOUNCE_MS)
    }

    public static saveImmediate(): void {
        const tempPath = settingsPath + '.tmp'
        
        try {
            // Write to temp file first
            writeFileSync(tempPath, JSON.stringify({
                credentials: this.credentials,
                view: this.view,
                timings: this.timings,
                general: this.general,
                update: this.update
            }, null, 2))
            
            // Atomic rename
            renameSync(tempPath, settingsPath)
            Debug.write(`Settings saved atomically to: ${settingsPath}`)
        } catch (e) {
            Debug.write(`Failed to save settings: ${(e as Error).message}`)
            // Clean up temp file if it exists
            try {
                if (existsSync(tempPath)) unlinkSync(tempPath)
            } catch {}
        }
    }

    public static load(): void {
        Debug.write(`Loading settings from: ${settingsPath}`)
        if (!existsSync(settingsPath)) {
            Debug.write("Settings file not found, creating with defaults")
            this.save()
            return
        }

        let settings

        try {
            settings = JSON.parse(readFileSync(settingsPath).toString())
            Debug.write("Settings loaded successfully")
        } catch(e) {
            Debug.write("An error occurred while trying to read settings from file. Using defaults. Error: " + (e as Error).stack)
        }

        if (settings) {
            this.credentials = { ...this.credentials, ...settings.credentials }
            this.view = { ...this.view, ...settings.view }
            this.timings = { ...this.timings, ...settings.timings }
            this.general = { ...this.general, ...settings.general }
            this.update = { ...this.update, ...settings.update }
        }
    }

    public static getAll() {
        return {
            credentials: this.credentials,
            view: this.view,
            timings: this.timings,
            general: this.general,
            update: this.update
        }
    }

    public static setAll(settings: Partial<ReturnType<typeof Settings.getAll>>): void {
        if (settings.credentials) this.credentials = { ...this.credentials, ...settings.credentials }
        if (settings.view) this.view = { ...this.view, ...settings.view }
        if (settings.timings) this.timings = { ...this.timings, ...settings.timings }
        if (settings.general) this.general = { ...this.general, ...settings.general }
        if (settings.update) this.update = { ...this.update, ...settings.update }
    }
}
