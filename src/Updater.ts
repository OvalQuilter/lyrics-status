import { join, resolve } from "path"
import { readFileSync, copyFileSync, createWriteStream, existsSync, mkdirSync, readdirSync, rmSync } from "fs"
import { Readable } from "stream"
import zip from "node-stream-zip"
import { Debug } from "./Debug"

export class Updater {
    public static async tryUpdate(): Promise<void> {
        console.log("Checking for updates...")

        if (await Updater.checkUpdate()) {
            console.log("Found an update. Starting download...")

            await Updater.forceUpdate()

            console.log("LyricsStatus updated successfully! Restart to apply changes -- dependencies will install automatically if needed.")

            process.exit(0)
        }
    }

    public static async forceUpdate(): Promise<void> {
        const downloadPath = join(__dirname, "../temp")
        const exclude = [
            "settings.json",
            "cache",
            ".git",
            "temp",
            "log.txt",
            "node_modules",
            "package-lock.json"
        ]

        let tmpCreated = false
        try {
            if (existsSync(downloadPath)) {
                rmSync(downloadPath, { recursive: true, force: true })
            }
            mkdirSync(downloadPath)
            tmpCreated = true

            await Updater.downloadRepo("OvalQuilter", "lyrics-status", "v3", downloadPath)

            const extracted = readdirSync(downloadPath).find(f => f.startsWith("lyrics-status"))
            if (!extracted) {
                throw new Error("Extracted folder not found in temp/ — zip may be malformed or download failed.")
            }

            Updater.replaceFiles(join(downloadPath, extracted), join(__dirname, "../"), exclude)
        } finally {
            try { if (tmpCreated && existsSync(downloadPath)) rmSync(downloadPath, { recursive: true, force: true }) } catch {}
        }
    }

    public static async checkUpdate(): Promise<boolean> {
        const version = await (await fetch("https://github.com/OvalQuilter/lyrics-status/raw/refs/heads/v3/VERSION")).text()

        let local: string
        try {
            local = readFileSync(join(__dirname, "../VERSION"), { encoding: "utf-8" }).trim()
        } catch (e) {
            console.warn("[lyrics-status] VERSION file missing — assuming stale, forcing update.")
            Debug.write("[Updater] VERSION missing: " + (e as Error).message)
            return true
        }

        return local !== version.trim()
    }

    public static async downloadRepo(userName: string, repoName: string, branch: string, outputDir: string): Promise<void> {
        const url = `https://github.com/${userName}/${repoName}/archive/refs/heads/${branch}.zip`
        const resolvedOutputDir = resolve(outputDir)
        const downloadPath = join(resolvedOutputDir, `v3.zip`)

        if (!existsSync(outputDir)) {
            mkdirSync(outputDir, { recursive: true })
        }

        const response = await fetch(url)
        const downloadStream = createWriteStream(downloadPath)

        await new Promise<void>((res, rej) => {
            Readable.fromWeb(response.body!)
            .pipe(downloadStream)
            .on("finish", () => res())
           })

        const file = new zip.async({ file: downloadPath })

        await file.extract(null, outputDir)
    }

    public static replaceFiles(srcPath: string, dstPath: string, exclude: string[]): void {
        const resolvedSrcPath = resolve(srcPath)
        const resolvedDstPath = resolve(dstPath)

        const resolvedExclude = exclude.map((p) => resolve(p))

        const srcFiles = readdirSync(resolvedSrcPath, { withFileTypes: true })
        const dstFiles = readdirSync(resolvedDstPath, { withFileTypes: true })
        const srcNames = new Set(srcFiles.map(f => f.name))

        for (const df of dstFiles) {
            const dp = resolve(join(dstPath, df.name))
            if (resolvedExclude.includes(dp)) continue
            if (!srcNames.has(df.name)) { rmSync(dp, { recursive: true, force: true }); continue }
        }

        for (const sf of srcFiles) {
            const sp = resolve(join(srcPath, sf.name))
            const dp = resolve(join(dstPath, sf.name))
            if (resolvedExclude.includes(dp)) continue
            const df = dstFiles.find(f => f.name === sf.name)
            if (df) rmSync(dp, { recursive: true, force: true })
            if (sf.isDirectory()) {
                mkdirSync(dp, { recursive: true })
                Updater.replaceFiles(sp, dp, resolvedExclude)
            } else {
                copyFileSync(sp, dp)
            }
        }
    }
}
