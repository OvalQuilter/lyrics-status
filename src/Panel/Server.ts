import express from "express"
import { Debug } from "../Debug"
import { createServer } from "node:http"
import { WebSocketServer, WebSocket } from "ws"
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
            Debug.write(`[Server] OAuth callback: received refresh token`)
            Settings.credentials.refreshToken = refreshToken as string
            Settings.save()
        } else {
            if (!req.query.code) return res.sendStatus(401)

            const code = req.query.code
            Settings.credentials.code = code as string
            SpotifyService.exchange()
                .then(() => Settings.save())
                .catch((e: unknown) => Debug.write(`[Server] SpotifyService.exchange failed: ${e}`))
        }

        res.send(`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Spotify authorization complete</title>
        <script>
            (function () {
                try {
                    if (window.opener && !window.opener.closed) {
                        window.close();
                    }
                } catch (e) {}
            })();
        </script>
    </head>
    <body>
        <p>Authorization complete. This window should close automatically. If it doesn't, you can close it now.</p>
    </body>
    </html>`)
    })

    wss.on("connection", (ws) => {
        ws.on("error", (err) => {
            console.error("[Server] WebSocket client error:", err)
        })

        ws.on("message", (data) => {
            let parsed: any
            try {
                parsed = JSON.parse(data.toString())
            } catch (e) {
                Debug.write(`[Server] Received malformed JSON from panel, ignoring: ${e}`)
                return
            }

            if (!parsed || typeof parsed !== "object") return

            Settings.credentials = parsed.credentials ?? Settings.credentials
            Settings.view        = parsed.view        ?? Settings.view
            Settings.timings     = parsed.timings     ?? Settings.timings
            Settings.update      = parsed.update      ?? Settings.update
            if (parsed.rateLimit) Settings.rateLimit  = parsed.rateLimit
            if (parsed.sources)   Settings.sources    = parsed.sources

            Settings.save()
        })

        const payload = JSON.stringify({
            credentials: Settings.credentials,
            view:        Settings.view,
            timings:     Settings.timings,
            update:      Settings.update,
            rateLimit:   Settings.rateLimit,
            sources:     Settings.sources
        })

        if (ws.readyState === WebSocket.OPEN) {
            ws.send(payload)
        }
    })

    httpServer.listen(8999)
}
