import express, { Express } from "express"
import { createServer } from "http"
import { join } from "path"
import { WebSocketServer } from "ws"
import { SettingsManager } from "../SettingsManager"

export class WebServer {
    public app: Express
    public httpServer: ReturnType<typeof createServer>

    public wss: WebSocketServer

    constructor() {
        this.app = express()
        this.httpServer = createServer(this.app)

        this.wss = new WebSocketServer({
            server: this.httpServer,
            path: "/ws"
        })
    }

    public startRouting(): void {
        this.app.use("/", express.static(join(__dirname, "../../static")))

        this.app.get("/", (req, res) => {
            res.sendFile(join(__dirname, "../../static/index.html"))
        })
    }

    public startListeners(): void {
        this.wss.on("connection", (ws) => {
            ws.on("data", (data) => {
                SettingsManager.data = JSON.parse(data.toString())
            })
        })
    }

    public startServer(port: number): void {
        this.httpServer.listen(port)
    }
}
