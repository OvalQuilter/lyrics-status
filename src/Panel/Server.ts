import express from "express"
import { createServer, Server } from "node:http"
import { WebSocketServer } from "ws"
import { join } from "node:path"
import { Settings } from "../Settings"
import { SpotifyService } from "../SpotifyService"

let httpServer: Server | null = null
let wss: WebSocketServer | null = null

// Event emitter for auth completion - will be set by main.ts
let onAuthComplete: (() => void) | null = null

export function setAuthCompleteCallback(callback: () => void): void {
    onAuthComplete = callback
}

export function startServer(): void {
    const app = express()
    httpServer = createServer(app)
    wss = new WebSocketServer({
        server: httpServer,
        path: "/ws"
    })

    app.use("/", express.static(join(__dirname, "../../static")))

    app.get("/", (req, res) => {
        res.sendFile(join(__dirname, "../../static/index.html"))
    })

    app.get("/callback", async (req, res) => {
        if (Settings.credentials.useExternalAuthServer) {
            if (!req.query.refresh_token) return res.sendStatus(401)

            const refreshToken = req.query.refresh_token
            console.log("External auth refresh token received:", refreshToken)
            Settings.credentials.refreshToken = refreshToken as string
            Settings.save()
            console.log("Settings saved with refresh token")
        } else {
            if (!req.query.code) return res.sendStatus(401)

            const code = req.query.code
            Settings.credentials.code = code as string
            console.log("Authorization code received, exchanging...")
            await SpotifyService.exchange()
            console.log("Token exchanged, refresh token:", Settings.credentials.refreshToken ? "present" : "missing")
            // exchange() now calls Settings.save() internally
        }

        // Notify that auth is complete
        if (onAuthComplete) {
            onAuthComplete()
        }

        res.send("<html><body><h1>Success!</h1><p>Spotify connected! You can close this page now.</p><script>window.close();</script></body></html>")
    })

    wss.on("connection", (ws) => {
        ws.on("message", (data) => {
            const settings = JSON.parse(data.toString())
            // Not typed but it's necessary

            Settings.credentials = settings.credentials
            Settings.view = settings.view
            Settings.timings = settings.timings
            Settings.update = settings.update

            Settings.save()
        })

        const settings = JSON.stringify({
            credentials: Settings.credentials,
            view: Settings.view,
            timings: Settings.timings,
            update: Settings.update
        })

        ws.send(settings)
    })

    httpServer.listen(67, "127.0.0.1", () => {
        console.log("Server started on http://127.0.0.1:67")
    })

    httpServer.on("error", (err: NodeJS.ErrnoException) => {
        if (err.code === "EADDRINUSE") {
            console.error("Port 67 is already in use. Trying port 6700...")
            httpServer?.listen(6700, "127.0.0.1", () => {
                console.log("Server started on http://127.0.0.1:6700")
            })
        } else if (err.code === "EACCES") {
            console.error("Port 67 requires elevated privileges. Trying port 6700...")
            httpServer?.listen(6700, "127.0.0.1", () => {
                console.log("Server started on http://127.0.0.1:6700")
            })
        } else {
            console.error("Server error:", err)
        }
    })
}

export function stopServer(): void {
    if (wss) {
        // Close all WebSocket connections
        wss.clients.forEach((client) => {
            client.terminate()
        })
        wss.close()
        wss = null
    }
    if (httpServer) {
        // Close all connections and stop listening
        httpServer.closeAllConnections()
        httpServer.close()
        httpServer = null
    }
}
