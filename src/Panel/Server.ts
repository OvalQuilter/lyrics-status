import express from "express"
import { createServer } from "node:http"
import { WebSocketServer } from "ws"
import { join } from "node:path"
import { Settings } from "../Settings"

export function startServer(): void {
    const app = express()
    const httpServer = createServer(app)
    const wss = new WebSocketServer({
        server: httpServer,
        path: "/ws"
    })

    app.use("/", express.static(join(__dirname, "../../static")))

    app.get("/", (req, res) => {
        res.sendFile(join(__dirname, "../../static/index.html"))
    })

    wss.on("connection", (ws) => {
        ws.on("message", (data) => {
            const settings = JSON.parse(data.toString())

            Settings.credentials = settings.credentials
            Settings.view        = settings.view
            Settings.timings     = settings.timings
            Settings.update      = settings.update

            Settings.save()
        })

        ws.send(JSON.stringify({
            credentials: Settings.credentials,
            view:        Settings.view,
            timings:     Settings.timings,
            update:      Settings.update
        }))
    })

    httpServer.listen(8999)
}
