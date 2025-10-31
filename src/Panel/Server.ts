import express from "express"
import { createServer } from "node:http"
import { WebSocketServer } from "ws"
import { join } from "node:path"
import { Settings } from "../Settings"
import { SpotifyService } from "../SpotifyService"

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

    app.get("/callback", (req, res) => {
        if (Settings.credentials.useExternalAuthServer) {
            if (!req.query.refresh_token) return res.sendStatus(401)

            const refreshToken = req.query.refresh_token
            console.log(refreshToken)
            Settings.credentials.refreshToken = refreshToken as string
            Settings.save()
        } else {
            if (!req.query.code) return res.sendStatus(401)

            const code = req.query.code
            Settings.credentials.code = code as string
            SpotifyService.exchange().then(() => Settings.save())
        }

        res.send("OK. You can close this page now.")
    })

    wss.on("connection", (ws) => {
        ws.on("message", (data) => {
            const settings = JSON.parse(data.toString())
            // Not typed but it's necessary

            Settings.credentials = settings.credentials
            Settings.view = settings.view
            Settings.translation = settings.translation,
            Settings.timings = settings.timings
            Settings.update = settings.update

            Settings.save()
        })

        const settings = JSON.stringify({
            credentials: Settings.credentials,
            view: Settings.view,
            translation: Settings.translation,
            timings: Settings.timings,
            update: Settings.update
        })

        ws.send(settings)
    })

    httpServer.listen(8999)
}
