#!/usr/bin/env node
"use strict";
// Launch lyrics-status detached (no visible terminal window on Windows).
// Usage: node launcher.js  OR  double-click via .bat/.sh wrapper.
const { spawn } = require("child_process");
const path = require("path");

const entry = path.join(__dirname, "dist", "index.js");
const child = spawn(process.execPath, [entry], {
    detached: true,
    windowsHide: true,
    stdio: "ignore",
    cwd: __dirname,
});
child.unref();
