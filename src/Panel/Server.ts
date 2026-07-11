import express from "express"
import { Debug } from "../Debug"
import { createServer } from "node:http"
import { WebSocketServer, WebSocket } from "ws"
import { join } from "node:path"
import { existsSync } from "node:fs"
import { Settings } from "../Settings"
import { SpotifyService } from "../SpotifyService"

const STATIC = join(__dirname, "../../static")
const KEYS = ["credentials","view","timings","update","rateLimit","sources","chineseConversion","restore","gateway","statusFlash","richPresence","spotifyParty","profileColor","idle","gamePresence"]

let _lastStatus: object | null = null

export function startServer(): { broadcast: (statusObj: object) => void } {
    if (!existsSync(STATIC)) {
        console.error(`\x1b[31m[lyrics-status] static/ directory not found at: ${STATIC}\n  The panel UI will not load. Re-download the release zip.\x1b[0m`)
        Debug.write("[Server] static/ directory missing: " + STATIC)
    }

    const app = express()
    const httpServer = createServer(app)
    const wss = new WebSocketServer({ server: httpServer, path: "/ws", maxPayload: 65536 })

    app.use("/", express.static(STATIC))
    app.get("/", (_, res) => res.sendFile(join(STATIC, "index.html")))
    app.get("/callback", (req, res) => {
        if (Settings.credentials.useExternalAuthServer) {
            if (!req.query.refresh_token) return res.sendStatus(401)
            Settings.credentials.refreshToken = req.query.refresh_token as string
            Settings.save()
        } else {
            if (!req.query.code) return res.sendStatus(401)
            Settings.credentials.code = req.query.code as string
            SpotifyService.exchange()
                .then(() => Settings.save())
                .catch((e: unknown) => Debug.write(`[Server] SpotifyService.exchange failed: ${e}`))
        }
        res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Authorized</title><script>(function(){try{if(window.opener&&!window.opener.closed)window.close();}catch(e){}})()</\script></head><body><p>Authorization complete. You can close this window.</p></body></html>`)
    })

    // Ping/pong heartbeat
    const heartbeat = setInterval(() => {
        for (const ws of wss.clients as Set<any>) {
            if (!ws.isAlive) { ws.terminate(); continue }
            ws.isAlive = false
            ws.ping()
        }
    }, 30000)
    wss.on("close", () => clearInterval(heartbeat))

    wss.on("connection", (ws: any) => {
        ws.isAlive = true
        ws.on("pong", () => { ws.isAlive = true })
        ws.on("error", (e: Error) => Debug.write("[Server] WS error: " + e))
        ws.on("message", (data: Buffer) => {
            let p: any
            try { p = JSON.parse(data.toString()) } catch { return }
            if (!p || typeof p !== "object") return
            if (p.type === "status" || p.type === "server_shutdown") return
            for (const k of KEYS) {
                if (p[k] == null) continue
                if (typeof (Settings as any)[k] === "object" && !Array.isArray((Settings as any)[k]) && typeof p[k] === "object") {
                    ;(Settings as any)[k] = { ...(Settings as any)[k], ...p[k] }
                    if (k === "view" && p[k].advanced) (Settings as any)[k].advanced = { ...(Settings as any)[k].advanced, ...p[k].advanced }
                } else {
                    ;(Settings as any)[k] = p[k]
                }
            }
            Settings.save()
        })
        const payload = JSON.stringify(Object.fromEntries(KEYS.map(k => [k, (Settings as any)[k]])))
        if (ws.readyState === WebSocket.OPEN) try { ws.send(payload) } catch (e) { Debug.write("[Server] Send failed: " + e) }
        if (_lastStatus && ws.readyState === WebSocket.OPEN) try { ws.send(JSON.stringify(_lastStatus)) } catch (e) { Debug.write("[Server] Send lastStatus failed: " + e) }
    })

    httpServer.on("error", (e: NodeJS.ErrnoException) => {
        if (e.code === "EADDRINUSE") {
            console.error("\x1b[31m[lyrics-status] Port 8999 is already in use.\n  Another instance may be running. Close it and try again.\x1b[0m")
            process.exit(1)
        }
        Debug.write("[Server] httpServer error: " + e.stack)
    })

    function shutdown() {
        for (const ws of wss.clients) {
            try { ws.send(JSON.stringify({ type: "server_shutdown" })) } catch (_) {}
        }
        wss.close()
        httpServer.close(() => process.exit(0))
        setTimeout(() => process.exit(1), 10000)
    }
    process.on("SIGINT", shutdown)
    process.on("SIGTERM", shutdown)

    httpServer.listen(8999)

    function broadcast(statusObj: object) {
        _lastStatus = statusObj
        for (const client of wss.clients) {
            if (client.readyState === WebSocket.OPEN) {
                try { client.send(JSON.stringify(statusObj)) } catch (e) { Debug.write("[Server] broadcast failed: " + e) }
            }
        }
    }
    return { broadcast }
}