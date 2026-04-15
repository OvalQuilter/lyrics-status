"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
exports.initSettingsPath = initSettingsPath;
exports.getSettingsPath = getSettingsPath;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const Debug_1 = require("./Debug");
// Debounce timer for batching rapid saves
let saveDebounceTimer = null;
const SAVE_DEBOUNCE_MS = 500;
// Get the settings path - use app.getPath in Electron, fallback to local for CLI
let settingsPath = "./settings.json";
function initSettingsPath(userDataPath) {
    // Ensure directory exists
    if (!(0, node_fs_1.existsSync)(userDataPath)) {
        (0, node_fs_1.mkdirSync)(userDataPath, { recursive: true });
    }
    settingsPath = (0, node_path_1.join)(userDataPath, "settings.json");
    Debug_1.Debug.write(`Settings path initialized: ${settingsPath}`);
}
function getSettingsPath() {
    return settingsPath;
}
class Settings {
    static save() {
        // Debounce to batch rapid saves
        if (saveDebounceTimer) {
            clearTimeout(saveDebounceTimer);
        }
        saveDebounceTimer = setTimeout(() => {
            this.saveImmediate();
        }, SAVE_DEBOUNCE_MS);
    }
    static saveImmediate() {
        const tempPath = settingsPath + '.tmp';
        try {
            // Write to temp file first
            (0, node_fs_1.writeFileSync)(tempPath, JSON.stringify({
                credentials: this.credentials,
                view: this.view,
                timings: this.timings,
                general: this.general,
                update: this.update
            }, null, 2));
            // Atomic rename
            (0, node_fs_1.renameSync)(tempPath, settingsPath);
            Debug_1.Debug.write(`Settings saved atomically to: ${settingsPath}`);
        }
        catch (e) {
            Debug_1.Debug.write(`Failed to save settings: ${e.message}`);
            // Clean up temp file if it exists
            try {
                if ((0, node_fs_1.existsSync)(tempPath))
                    (0, node_fs_1.unlinkSync)(tempPath);
            }
            catch { }
        }
    }
    static load() {
        Debug_1.Debug.write(`Loading settings from: ${settingsPath}`);
        if (!(0, node_fs_1.existsSync)(settingsPath)) {
            Debug_1.Debug.write("Settings file not found, creating with defaults");
            this.save();
            return;
        }
        let settings;
        try {
            settings = JSON.parse((0, node_fs_1.readFileSync)(settingsPath).toString());
            Debug_1.Debug.write("Settings loaded successfully");
        }
        catch (e) {
            Debug_1.Debug.write("An error occurred while trying to read settings from file. Using defaults. Error: " + e.stack);
        }
        if (settings) {
            this.credentials = { ...this.credentials, ...settings.credentials };
            this.view = { ...this.view, ...settings.view };
            this.timings = { ...this.timings, ...settings.timings };
            this.general = { ...this.general, ...settings.general };
            this.update = { ...this.update, ...settings.update };
        }
    }
    static getAll() {
        return {
            credentials: this.credentials,
            view: this.view,
            timings: this.timings,
            general: this.general,
            update: this.update
        };
    }
    static setAll(settings) {
        if (settings.credentials)
            this.credentials = { ...this.credentials, ...settings.credentials };
        if (settings.view)
            this.view = { ...this.view, ...settings.view };
        if (settings.timings)
            this.timings = { ...this.timings, ...settings.timings };
        if (settings.general)
            this.general = { ...this.general, ...settings.general };
        if (settings.update)
            this.update = { ...this.update, ...settings.update };
    }
}
exports.Settings = Settings;
Settings.credentials = {
    token: "",
    cookies: "",
    clientID: "",
    clientSecret: "",
    useExternalAuthServer: false,
    code: "",
    refreshToken: "",
    uuid: "",
    customRedirectUri: "http://127.0.0.1:67/callback"
};
Settings.view = {
    timestamp: true,
    label: true,
    emoji: {
        enabled: true,
        name: "🎶",
        id: null,
        animated: false
    },
    advanced: {
        enabled: false,
        customStatus: "[{timestamp}] {lyrics}"
    }
};
Settings.timings = {
    sendTimeOffset: 500,
    enableAutooffset: true,
    autooffset: 3
};
Settings.general = {
    autoStart: false,
    startMinimized: false,
    theme: "dark",
    language: "en"
};
Settings.update = {
    enableAutoupdate: true
};
