import fsPromises from "node:fs/promises"
import path from "node:path"
import _ from "lodash"
import { Logger } from "pino"
import { stringify as yamlStringify, parse as yamlParse } from "yaml"
import { LogManager } from "../Debug/LogManager"
import { LRC_PATHS } from "../LrcPaths"
import { ISettingsData } from "./ISettingsData"

export class SettingsManager {
    public static instance: SettingsManager = new SettingsManager()

    public static CONFIG_FILE_PATH: string = path.join(LRC_PATHS.USER_CONFIG, "user.yaml")

    public _logger: Logger = LogManager.instance.getClassLogger("SettingsManager")

    public data: ISettingsData

    constructor() {
        this.data = this.defaultSettings
    }

    public get defaultSettings(): ISettingsData {
        return {
            credentials: {
                token: "",
                cookies: "",
            },
            view: {
                timestamp: true,
                label: true,
                advanced: {
                    enabled: false,
                    customEmoji: "🎶",
                    customStatus: "[{timestamp}] [{lyrics}]",
                },
            },
            timings: {
                sendTimeOffset: 500,
                enableAutooffset: true,
                autooffset: 3,
            },
            update: {
                enableAutoupdate: true,
            },
        }
    }

    public async saveSettings(): Promise<void> {
        await fsPromises.writeFile(SettingsManager.CONFIG_FILE_PATH, yamlStringify(this.data))
            .catch((error: Error) => {
                this._logger.error({ error }, "An error occurred while trying to write settings to file.")
            })
    }

    public async loadSettings(): Promise<void> {
        const fileContent = await fsPromises.readFile(SettingsManager.CONFIG_FILE_PATH)
            .catch((error: Error) => {
                this._logger.error({ error },
                    "An error occurred while trying to read settings from file. Using defaults.",
                )
            })

        if (fileContent) {
            this.data = _.merge(this.data, yamlParse(fileContent.toString())) as ISettingsData
        }
    }
}
