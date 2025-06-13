import { Debug } from "./Debug"
import { SettingsManager } from "./SettingsManager"
import { Updater } from "./Updater"
import { LyricsStatus } from "./LyricsStatus"

SettingsManager.instance.loadSettings()

const lyricsStatus = new LyricsStatus()

if (SettingsManager.instance.data.update.enableAutoupdate) {
    Updater.tryUpdate()
        .then(() => {
            lyricsStatus.init()
        })
        .catch((e) => {
            Debug.write("LyricsStatus failed to update. Error: " + e.stack)

            lyricsStatus.init()
        })
} else {
    lyricsStatus.init()
}

process.on("uncaughtException", (e) => {
    Debug.write(e.stack + "\n" + e.cause)

    if (!e.message.includes("fetch failed")) {
        process.exit(1)
    }
})
