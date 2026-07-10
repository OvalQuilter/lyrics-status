#!/usr/bin/env node
"use strict";
// Launch lyrics-status detached (no visible terminal window on Windows).
// Usage: node launcher.js  OR  double-click via start.bat.
const { spawn, execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// First-run / post-update convenience: auto-install dependencies whenever
// package.json has changed since the last successful install, so users
// don't have to run `npm install` manually before launching or after an update.
const nodeModules = path.join(__dirname, "node_modules");
const marker = path.join(nodeModules, ".install-hash");
const pkgHash = crypto.createHash("sha1").update(fs.readFileSync(path.join(__dirname, "package.json"))).digest("hex");
const lastHash = fs.existsSync(marker) ? fs.readFileSync(marker, "utf8").trim() : null;
if (pkgHash !== lastHash) {
    try {
        console.log("[launcher] Dependencies out of date -- installing (this may take a minute)...");
        execSync("npm install --omit=dev", { cwd: __dirname, stdio: "inherit" });
        fs.mkdirSync(nodeModules, { recursive: true });
        fs.writeFileSync(marker, pkgHash);
    } catch (e) {
        console.error("[launcher] npm install failed: " + e.message);
        console.error("[launcher] Please run `npm install` manually, then restart.");
        process.exit(1);
    }
}

const entry = path.join(__dirname, "dist", "index.js");
const child = spawn(process.execPath, [entry], {
    detached: true,
    windowsHide: true,
    stdio: "ignore",
    env: { ...process.env, NO_TRAY: "1" },
    cwd: __dirname,
});
child.unref();
process.exit(0);
