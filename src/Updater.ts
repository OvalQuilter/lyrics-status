import { join, resolve } from "path"
import { readFileSync, copyFileSync, createReadStream, createWriteStream, existsSync, mkdirSync, readdirSync, unlinkSync } from "fs"
import { finished } from "stream/promises"
import { Readable } from "stream"
import unzip from "unzip"

export class Updater {
    public static async update(): Promise<void> {
        console.log("Checking for updates...")

        if (await Updater.checkUpdate()) {
            console.log("Found an update. Starting download...")

            const downloadPath = join(__dirname, "./v3")
            const exclude = [
                "dist/index.js",
                "dist/Update",
                "settings.json",
                "cache"
            ]

            await Updater.downloadRepo("OvalQuilter", "lyrics-status", "v3", downloadPath)

            Updater.replaceFiles(downloadPath, join(__dirname, "../../"), exclude)

            console.log("LyricsStatus updated successfully! Please restart to apply changes.")

            process.exit(0)
        }
    }

    public static async checkUpdate(): Promise<boolean> {
        const version = await (await fetch("https://github.com/OvalQuilter/lyrics-status/raw/refs/heads/v3/VERSION")).text()

        return readFileSync(join(__dirname, "../../VERSION"), { encoding: "utf-8" }) !== version;
    }

    public static async downloadRepo(userName: string, repoName: string, branch: string, outputDir: string): Promise<void> {
        const url = `https://github.com/${userName}/${repoName}/archive/refs/heads/${branch}.zip`
        const downloadPath = join(outputDir, `${repoName}-${branch}.zip`)

        if (!existsSync(outputDir)) {
            mkdirSync(outputDir)
        }

        const response = await fetch(url)
        const downloadStream = createWriteStream(downloadPath)

        await finished(Readable.fromWeb(response.body!).pipe(downloadStream))

        await finished(createReadStream(downloadPath).pipe(unzip.Extract({
            path: outputDir
        })))
    }

    public static replaceFiles(srcPath: string, dstPath: string, exclude: string[]): void {
        const resolvedSrcPath = resolve(srcPath)
        const resolvedDstPath = resolve(dstPath)

        const srcFiles = readdirSync(resolvedSrcPath, { withFileTypes: true })
        const dstFiles = readdirSync(resolvedDstPath, { withFileTypes: true })

        for (let i = 0; i < srcFiles.length; i++) {
            const srcFile = srcFiles[i]
            const srcFilePath = join(srcPath, srcFile.name)
            const resolvedSrcFilePath = join(resolvedSrcPath, srcFile.name)
            const srcIsDirectory = srcFile.isDirectory()

            const needsDelete: Set<string> = new Set()
            const needsIgnore: Set<string> = new Set()
            // For deleting files that doesn't exist in src dir

            for (let j = 0; j < dstFiles.length; j++) {
                const dstFile = dstFiles[j]
                const dstFilePath = join(dstPath, dstFile.name)
                const resolvedDstFilePath = join(resolvedDstPath, dstFile.name)
                const dstIsDirectory = dstFile.isDirectory()

                if (exclude.includes(dstFilePath)) continue

                if (srcFile.name !== dstFile.name) {
                    needsDelete.add(resolvedDstFilePath)

                    continue
                }

                needsIgnore.add(resolvedDstFilePath)

                if (srcIsDirectory) {
                    if (dstIsDirectory) {
                        Updater.replaceFiles(srcFilePath, dstFilePath, exclude)
                    } else {
                        unlinkSync(resolvedDstFilePath)
                        copyFileSync(resolvedSrcFilePath, resolvedDstPath)
                    }
                } else {
                    unlinkSync(resolvedDstFilePath)
                    copyFileSync(resolvedSrcFilePath, resolvedDstPath)
                }
            }

            for (const file of needsDelete) {
                if (needsIgnore.has(file)) continue

                unlinkSync(file)
            }
        }
    }
}
