"use strict";
const SysTray = require("systray2").default;
const notifier = require("node-notifier");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const Debug_1 = require("./Debug");

const IS_WIN = process.platform === "win32";
const ICON = path.resolve(__dirname, IS_WIN ? "../res/note.ico" : "../res/note.png");
const PANEL_URL = "http://localhost:8999";
const VERSION = (() => { try { return fs.readFileSync(path.resolve(__dirname, "../VERSION"), "utf8").trim(); } catch { return "v3"; } })();

function notify(title, msg) {
    notifier.notify({ title, message: msg, icon: ICON, appID: "Lyrics Status" });
}

function openPanel() {
    const cmd = IS_WIN ? `start ${PANEL_URL}` : process.platform === "darwin" ? `open ${PANEL_URL}` : `xdg-open ${PANEL_URL}`;
    exec(cmd, { shell: true }, () => {});
}

function startTray(onQuit) {
    if (!IS_WIN || process.env.NO_TRAY) { Debug_1.Debug.write("[Tray] Skipped"); return null; }
    if (!fs.existsSync(ICON)) { console.warn("[Tray] Icon not found:", ICON); Debug_1.Debug.write("[Tray] Icon not found: " + ICON); return null; }
    let tray;
    try {
        tray = new SysTray({
            menu: {
                icon: ICON,
                title: "",
                tooltip: "Lyrics Status",
                items: [
                    { title: "Open Panel", tooltip: "Open panel in browser", checked: false, enabled: true },
                    SysTray.separator,
                    { title: "About", tooltip: "About Lyrics Status", checked: false, enabled: true },
                    SysTray.separator,
                    { title: "Quit", tooltip: "Stop Lyrics Status", checked: false, enabled: true },
                ]
            },
            debug: false,
            copyDir: false,
        });
        tray.onClick(action => {
            switch (action.seq_id) {
                case 0: openPanel(); break;
                case 2: notify("Lyrics Status " + VERSION, "github.com/RamenFighter03/lyrics-status"); break;
                case 4: tray.kill(false); if (typeof onQuit === "function") onQuit(); break;
            }
        });
        tray.ready().then(() => {
            Debug_1.Debug.write("[Tray] Started");
        }).catch(e => Debug_1.Debug.write("[Tray] Failed: " + e.message));
    } catch (e) {
        Debug_1.Debug.write("[Tray] Error: " + e.message);
        return null;
    }
    return tray;
}

module.exports = { startTray, openPanel, notify };
