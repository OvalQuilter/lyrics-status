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
            Debug_1.Debug.write("[Updater] Updated! Run npm install & restart.");
            process.exit(0);
        }
    }
    static async checkUpdate() {
        // Bug 3 fix: use fork URL, not upstream
        const remote = (await (await fetch("https://github.com/RamenFighter03/lyrics-status/raw/refs/heads/v3/VERSION")).text()).trim();
        return readFileSync(join(__dirname, "../VERSION"), "utf-8").trim() !== remote;
    }
    static async forceUpdate() {
        const tmp = join(__dirname, "../temp");
        if (existsSync(tmp)) rmSync(tmp, { recursive: true, force: true });
        mkdirSync(tmp);
        // Bug 3 fix: use fork repo
        await Updater.downloadRepo("RamenFighter03", "lyrics-status", "v3", tmp);
        // Bug 2 fix: dynamically find extracted folder instead of hardcoded "lyrics-status-3"
        const extracted = readdirSync(tmp).find(f => f.startsWith("lyrics-status"));
        Updater.replaceFiles(resolve(join(tmp, extracted)), resolve(join(__dirname, "../")), EXCLUDE.map(e => resolve(e)));
    }
    static async downloadRepo(user, repo, branch, outDir) {
        const url = `https://github.com/${user}/${repo}/archive/refs/heads/${branch}.zip`;
        const zipPath = join(resolve(outDir), "v3.zip");
        if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
        const res = await fetch(url);
        await new Promise(r => Readable.fromWeb(res.body).pipe(createWriteStream(zipPath)).on("finish", r));
        await (new StreamZip.async({ file: zipPath })).extract(null, outDir);
    }
    // Bug 1 fix: build del from dst names not in src, not via cross-product
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
