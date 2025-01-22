import { join, resolve } from "path"
import { readFileSync, copyFileSync, createWriteStream, existsSync, mkdirSync, readdirSync, rmSync } from "fs"
import { Readable } from "stream"
import zip from "node-stream-zip"

export class Updater {
    public static async tryUpdate(): Promise<void> {
        console.log("Checking for updates...")

        if (await Updater.checkUpdate()) {
            console.log("Found an update. Starting download...")

            await Updater.forceUpdate()

            console.log("LyricsStatus updated successfully! Please run \"npm install\" & restart to apply changes.")

            process.exit(0)
        }
    }

    public static async forceUpdate(): Promise<void> {
        const downloadPath = join(__dirname, "../temp")
        const exclude = [
            "dist/index.js",
            "dist/Update",
            "settings.json",
            "cache",
            ".git",
            "temp",
            "log.txt",
            "node_modules",
            "package-lock.json"
        ]

        if (existsSync(downloadPath)) {
            rmSync(downloadPath, { recursive: true, force: true })
        }

        mkdirSync(downloadPath)

        await Updater.downloadRepo("OvalQuilter", "lyrics-status", "v3", downloadPath)

        Updater.replaceFiles(join(downloadPath, "./lyrics-status-3"), join(__dirname, "../"), exclude)
    }

    public static async checkUpdate(): Promise<boolean> {
        const version = await (await fetch("https://github.com/OvalQuilter/lyrics-status/raw/refs/heads/v3/VERSION")).text()

        return readFileSync(join(__dirname, "../VERSION"), { encoding: "utf-8" }) !== version;
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

        await new Promise((res, rej) => {
            Readable.fromWeb(response.body!)
                .pipe(downloadStream)
                .on("finish", res)
        })

        const file = new zip.async({ file: downloadPath })

        await file.extract(null, outputDir)
    }

    public static replaceFiles(srcPath: string, dstPath: string, exclude: string[]): void {
        const resolvedSrcPath = resolve(srcPath)
        const resolvedDstPath = resolve(dstPath)

        const resolvedExclude = exclude.map((path) => {
            return resolve(path)
        })

        const srcFiles = readdirSync(resolvedSrcPath, { withFileTypes: true })
        const dstFiles = readdirSync(resolvedDstPath, { withFileTypes: true })

        const needsDelete: Set<string> = new Set()
        const needsIgnore: Set<string> = new Set()
        // For deleting files that doesn't exist in src dir

        for (let i = 0; i < srcFiles.length; i++) {
            const srcFile = srcFiles[i]
            const srcFilePath = join(srcPath, srcFile.name)
            const srcIsDirectory = srcFile.isDirectory()

            for (let j = 0; j < dstFiles.length; j++) {
                const dstFile = dstFiles[j]
                const dstFilePath = join(dstPath, dstFile.name)
                const dstIsDirectory = dstFile.isDirectory()

                if (resolvedExclude.includes(dstFilePath)) continue

                if (srcFile.name !== dstFile.name) {
                    needsDelete.add(dstFilePath)

                    continue
                }

                needsIgnore.add(dstFilePath)

                if (srcIsDirectory) {
                    if (dstIsDirectory) {
                        Updater.replaceFiles(srcFilePath, dstFilePath, resolvedExclude)
                    } else {
                        rmSync(dstFilePath, { recursive: true, force: true })
                        copyFileSync(srcFilePath, dstFilePath)
                    }
                } else {
                    rmSync(dstFilePath, { recursive: true, force: true })
                    copyFileSync(srcFilePath, dstFilePath)
                }
            }
        }

        for (const file of needsDelete) {
            if (needsIgnore.has(file)) continue

            rmSync(file, { recursive: true, force: true })
        }
    }
}
