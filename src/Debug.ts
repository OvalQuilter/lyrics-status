import { unlink, appendFileSync } from "fs"
import { join } from "path"

export class Debug {
    public static path: string = "./"

    public static write(text: string): void {
        const date = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })

        appendFileSync(join(this.path, "log.txt"), `[${date}]: ${text}\n`)
    }
}

unlink(join(Debug.path, "log.txt"), () => {})
