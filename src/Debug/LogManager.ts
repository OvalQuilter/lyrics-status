import path from "path"
import pino, { Logger } from "pino"
import { argv } from "../argv"
import { LRC_PATHS } from "../LrcPaths"

export class LogManager {
    public static instance: LogManager = new LogManager(LRC_PATHS.LOGS, argv.logLevel || "info")

    public logDir: string
    public level: string

    public readonly globalLogger: Logger

    private _loggers = new Map<string, Logger>()

    constructor(logDir: string, level: string) {
        this.logDir = logDir
        this.level = level

        this.globalLogger = pino({
            name: "global",
            level: level,
            base: { pid: false },
            transport: {
                target: "pino/file",
                options: {
                    destination: path.join(logDir, "global.log"),
                },
            },
        })
    }

    public getClassLogger(className: string): Logger {
        if (!this._loggers.has(className)) {
            this._loggers.set(className, this.globalLogger.child({
                className,
                name: className,
                level: this.level,
                base: { pid: false },
                transport: {
                    targets: [
                        {
                            target: "pino/file",
                            options: {
                                destination: path.join(this.logDir, "classes", `${className}.log`),
                            },
                        },
                        {
                            target: "pino/file",
                            options: {
                                destination: path.join(this.logDir, "global.log"),
                            },
                        },
                    ],
                },
            }))
        }

        return this._loggers.get(className)!
    }
}
