import yargs from "yargs"
import { hideBin } from "yargs/helpers"

export const argv = yargs(hideBin(process.argv))
    .option("lrc-folder-path", {
        type: "string",
    })
    .option("log-level", {
        type: "string",
    })
    .parseSync()
