import path from "node:path"
import process from "node:process"
import { argv } from "./argv"

export const LRC_DATA = argv.lrcFolderPath || path.join(process.cwd(), "lrc_data")

export const LRC_CACHE = path.join(LRC_DATA, "cache")
export const LRC_SONGS_CACHE = path.join(LRC_CACHE, "songs")

export const LRC_CONFIG = path.join(LRC_DATA, "config")
export const LRC_USER_CONFIG = path.join(LRC_CONFIG, "user")

export const LRC_SERVICES = path.join(LRC_DATA, "services")

export const LRC_LOGS = path.join(LRC_DATA, "logs")

export const LRC_TEMP = path.join(LRC_DATA, "temp")

export const LRC_PATHS = {
    DATA: LRC_DATA,
    CACHE: LRC_CACHE,
    SONGS_CACHE: LRC_SONGS_CACHE,
    CONFIG: LRC_CONFIG,
    USER_CONFIG: LRC_USER_CONFIG,
    SERVICES: LRC_SERVICES,
    LOGS: LRC_LOGS,
    TEMP: LRC_TEMP,
}
