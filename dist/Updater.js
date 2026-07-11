"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updater = void 0;
const { join, resolve } = require("path");
const { existsSync, rmSync, mkdirSync, readdirSync, copyFileSync, createWriteStream, readFileSync } = require("fs");
const { Readable } = require("stream");
const StreamZip = require("node-stream-zip");
const Debug_1 = require("./Debug");

const EXCLUDE = ["settings.json","cache",".git","temp","log.txt","node_modules","package-lock.json"];

class Updater {
    static async tryUpdate() {
        Debug_1.Debug.write("[Updater] Checking for updates...");
        if (await Updater.checkUpdate()) {
            Debug_1.Debug.write("[Updater] Found an update. Starting download...");
            await Updater.forceUpdate();
            Debug_1.Debug.write("[Updater] Updated! Restart the app -- dependencies will install automatically if needed.");
            process.exit(0);
        }
    }
    static async checkUpdate() {
        // CONN-10: 10s timeout prevents indefinite hang; AbortController cleans up timer on resolve
        const _ctrl = new AbortController(); const _tmo = setTimeout(() => _ctrl.abort(), 10000);
        let _verRes; try { _verRes = await fetch("https://github.com/RamenFighter03/lyrics-status/raw/refs/heads/v3/VERSION", { signal: _ctrl.signal }); } finally { clearTimeout(_tmo); }
        if (!_verRes.ok) throw new Error("[Updater] VERSION fetch HTTP " + _verRes.status);
        const remote = (await _verRes.text()).trim();
        let local;
        try {
            local = readFileSync(join(__dirname, "../VERSION"), "utf-8").trim();
        } catch (e) {
            console.warn("[lyrics-status] VERSION file missing — assuming stale, forcing update.");
            Debug_1.Debug.write("[Updater] VERSION missing: " + e.message);
            return true;
        }
        return local !== remote;
    }
    static async forceUpdate() {
        const tmp = join(__dirname, "../temp");
        let tmpCreated = false;
        try {
            if (existsSync(tmp)) rmSync(tmp, { recursive: true, force: true });
            mkdirSync(tmp);
            tmpCreated = true;
            await Updater.downloadRepo("RamenFighter03", "lyrics-status", "v3", tmp);
            const extracted = readdirSync(tmp).find(f => f.startsWith("lyrics-status"));
            if (!extracted) {
                throw new Error("Extracted folder not found in temp/ — zip may be malformed or download failed.");
            }
            Updater.replaceFiles(resolve(join(tmp, extracted)), resolve(join(__dirname, "../")), EXCLUDE.map(e => resolve(e)));
        } finally {
            // Clean up temp regardless of success/failure
            try { if (tmpCreated && existsSync(tmp)) rmSync(tmp, { recursive: true, force: true }); } catch {}
        }
    }
    static async downloadRepo(user, repo, branch, outDir) {
        const url = `https://github.com/${user}/${repo}/archive/refs/heads/${branch}.zip`;
        const zipPath = join(resolve(outDir), "v3.zip");
        if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
        const res = await fetch(url);
        if (!res.ok) throw new Error("[Updater] Download HTTP " + res.status);
        await new Promise((r,j) => { const rs=Readable.fromWeb(res.body); const ws=createWriteStream(zipPath); rs.on("error",j); ws.on("error",j); ws.on("finish", r); rs.pipe(ws); });
        await (new StreamZip.async({ file: zipPath })).extract(null, outDir);
    }
    static replaceFiles(src, dst, exclude) {
        const srcFiles = readdirSync(src, { withFileTypes: true });
        const dstFiles = readdirSync(dst, { withFileTypes: true });
        const srcNames = new Set(srcFiles.map(f => f.name));
        for (const df of dstFiles) {
            const dp = resolve(join(dst, df.name));
            if (exclude.includes(dp)) continue;
            if (!srcNames.has(df.name)) { rmSync(dp, { recursive: true, force: true }); continue; }
        }
        for (const sf of srcFiles) {
            const sp = resolve(join(src, sf.name));
            const dp = resolve(join(dst, sf.name));
            if (exclude.includes(dp)) continue;
            const df = dstFiles.find(f => f.name === sf.name);
            if (df) rmSync(dp, { recursive: true, force: true });
            sf.isDirectory() ? (mkdirSync(dp, { recursive: true }), Updater.replaceFiles(sp, dp, exclude)) : copyFileSync(sp, dp);
        }
    }
}
exports.Updater = Updater;
