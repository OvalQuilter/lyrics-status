// @ts-ignore - electron types
import { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, shell, IpcMainInvokeEvent, IpcMainEvent } from "electron"
import { join } from "path"
// @ts-ignore - will be compiled
import { LyricsStatusApp } from "./app/LyricsStatusApp"
import { Settings, IAllSettings, initSettingsPath } from "./Settings"
import { initDataPath, dataStore } from "./app/DataStore"
import { SpotifyService } from "./SpotifyService"
import { startServer, stopServer, setAuthCompleteCallback } from "./Panel/Server"
import { EventEmitter } from "events"

export const appEvents = new EventEmitter()

// Discord badge flags
const DISCORD_BADGES: { [key: number]: { name: string; icon: string } } = {
    1: { name: "Discord Staff", icon: "https://cdn.discordapp.com/badge-icons/5e74e9b61934fc1f67c65515d1f7e60d.png" },
    2: { name: "Partnered Server Owner", icon: "https://cdn.discordapp.com/badge-icons/3f9748e53446a137a052f3454e2f8f82.png" },
    4: { name: "HypeSquad Events", icon: "https://cdn.discordapp.com/badge-icons/bf01d1073931f921909045f3a39fd264.png" },
    8: { name: "Bug Hunter Level 1", icon: "https://cdn.discordapp.com/badge-icons/2717692c7dca7289b35297368a940dd0.png" },
    64: { name: "HypeSquad Bravery", icon: "https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png" },
    128: { name: "HypeSquad Brilliance", icon: "https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png" },
    256: { name: "HypeSquad Balance", icon: "https://cdn.discordapp.com/badge-icons/3aa41de486fa12454c3761e8e223442e.png" },
    512: { name: "Early Supporter", icon: "https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png" },
    16384: { name: "Bug Hunter Level 2", icon: "https://cdn.discordapp.com/badge-icons/848f79194d4be5ff5f81505cbd0ce1e6.png" },
    131072: { name: "Verified Bot Developer", icon: "https://cdn.discordapp.com/badge-icons/6df5892e0f35b051f8b61eace34f4f38.png" },
    262144: { name: "Discord Certified Moderator", icon: "https://cdn.discordapp.com/badge-icons/fee1624003e2fee35cb398e125dc479b.png" },
    4194304: { name: "Active Developer", icon: "https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png" }
}

function parseBadges(flags: number): { name: string; icon: string }[] {
    const badges: { name: string; icon: string }[] = []
    for (const [flag, badge] of Object.entries(DISCORD_BADGES)) {
        if (flags & parseInt(flag)) {
            badges.push(badge)
        }
    }
    return badges
}

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
let lyricsApp: LyricsStatusApp | null = null
let isQuitting = false

function createWindow(): void {
    // Use .ico for Windows, .png for other platforms
    const iconPath = process.platform === "win32" 
        ? join(__dirname, "../res/icon.ico")
        : join(__dirname, "../res/icon.png")
    
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        frame: false,
        transparent: true,
        backgroundColor: "#00000000",
        icon: iconPath,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: join(__dirname, "preload.js")
        },
        show: false
    })

    mainWindow.loadFile(join(__dirname, "../static/index.html"))

    mainWindow.once("ready-to-show", () => {
        mainWindow?.maximize()
        mainWindow?.show()
    })

    mainWindow.on("close", () => {
        // Always force quit when window closes
        forceQuit()
    })

    mainWindow.on("closed", () => {
        mainWindow = null
    })
}

// Force quit function - cleans up and exits immediately
function forceQuit(): void {
    isQuitting = true
    
    // Stop the lyrics app
    lyricsApp?.stop()
    
    // Save settings
    Settings.save()
    
    // Stop the HTTP/WebSocket server
    stopServer()
    
    // Destroy tray
    if (tray) {
        tray.destroy()
        tray = null
    }
    
    // Force exit the process immediately
    process.exit(0)
}

// Handle app quit properly
app.on("before-quit", () => {
    isQuitting = true
})

// Cleanup resources when app is about to quit
app.on("will-quit", () => {
    forceQuit()
})

function createTray(): void {
    // Use .ico for Windows, .png for other platforms
    const iconPath = process.platform === "win32" 
        ? join(__dirname, "../res/icon.ico")
        : join(__dirname, "../res/icon.png")
    const icon = nativeImage.createFromPath(iconPath)
    tray = new Tray(icon.resize({ width: 16, height: 16 }))

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Show LyricsStatus",
            click: () => mainWindow?.show()
        },
        {
            label: "Toggle Status",
            click: () => {
                if (lyricsApp) {
                    lyricsApp.toggle()
                    updateTrayMenu()
                }
            }
        },
        { type: "separator" },
        {
            label: "Quit",
            click: () => forceQuit()
        }
    ])

    tray.setToolTip("LyricsStatus")
    tray.setContextMenu(contextMenu)

    tray.on("double-click", () => {
        mainWindow?.show()
    })
}

function updateTrayMenu(): void {
    if (!tray) return

    const isRunning = lyricsApp?.isRunning ?? false

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Show LyricsStatus",
            click: () => mainWindow?.show()
        },
        {
            label: isRunning ? "⏸ Pause" : "▶ Resume",
            click: () => {
                if (lyricsApp) {
                    lyricsApp.toggle()
                    updateTrayMenu()
                }
            }
        },
        { type: "separator" },
        {
            label: "Quit",
            click: () => forceQuit()
        }
    ])

    tray.setContextMenu(contextMenu)
}

function setupIPC(): void {
    // Window controls
    ipcMain.on("window:minimize", () => mainWindow?.minimize())
    ipcMain.on("window:maximize", () => {
        if (mainWindow?.isMaximized()) {
            mainWindow.unmaximize()
        } else {
            mainWindow?.maximize()
        }
    })
    ipcMain.on("window:close", () => {
        forceQuit()
    })
    ipcMain.on("window:quit", () => {
        forceQuit()
    })

    // Settings
    ipcMain.handle("settings:get", () => Settings.getAll())
    ipcMain.handle("settings:set", async (_event: IpcMainInvokeEvent, settings: Partial<IAllSettings>) => {
        Settings.setAll(settings)
        Settings.save()
        
        // Auto-start if not running and settings look configured
        if (!lyricsApp?.isRunning && Settings.credentials.token && Settings.credentials.refreshToken) {
            await lyricsApp?.start()
            updateTrayMenu()
        }
        
        return true
    })

    // App controls
    ipcMain.handle("app:start", async () => {
        await lyricsApp?.start()
        updateTrayMenu()
        return true
    })
    ipcMain.handle("app:stop", () => {
        lyricsApp?.stop()
        updateTrayMenu()
        return true
    })
    ipcMain.handle("app:toggle", () => {
        lyricsApp?.toggle()
        updateTrayMenu()
        return lyricsApp?.isRunning
    })
    ipcMain.handle("app:status", () => ({
        isRunning: lyricsApp?.isRunning ?? false,
        isPlaying: lyricsApp?.isPlaying() ?? false,
        currentSong: lyricsApp?.getCurrentSong() ?? null,
        currentLyrics: lyricsApp?.getCurrentLyrics() ?? null,
        cachedSongs: lyricsApp?.getCachedSongsCount() ?? 0,
        stats: lyricsApp?.getStats() ?? null
    }))

    // Spotify auth
    ipcMain.handle("spotify:authorize", () => {
        const clientId = Settings.credentials.clientID
        const redirectUri = Settings.credentials.customRedirectUri

        if (Settings.credentials.useExternalAuthServer) {
            shell.openExternal(`https://rocky-quintessential-island.glitch.me/login/${Settings.credentials.uuid}`)
        } else {
            const scope = encodeURIComponent("user-read-playback-state user-read-currently-playing user-modify-playback-state user-library-read playlist-read-private playlist-read-collaborative")
            shell.openExternal(
                `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`
            )
        }
    })

    // Play a song from history
    ipcMain.handle("spotify:play", async (_event: IpcMainInvokeEvent, data: { uri?: string; name?: string; artist?: string }) => {
        try {
            let trackUri: string | undefined = data.uri

            // If no URI provided, search for the track
            if (!trackUri && data.name && data.artist) {
                trackUri = (await SpotifyService.searchTrack(data.name, data.artist)) ?? undefined
            }

            if (!trackUri) {
                return { success: false, error: "Could not find track" }
            }

            const success = await SpotifyService.playTrack(trackUri)
            return { 
                success, 
                error: success ? null : "Failed to play. Re-authorize Spotify in Settings to enable playback control, and ensure Spotify is open." 
            }
        } catch (error) {
            return { success: false, error: (error as Error).message }
        }
    })

    // Playback controls - instant, no waiting
    ipcMain.handle("spotify:pause", () => {
        // Clear Discord status IMMEDIATELY - don't wait for Spotify
        if (lyricsApp) {
            lyricsApp.clearDiscordStatus()
        }
        // Fire and forget - don't await
        SpotifyService.pause()
        return { success: true }
    })

    ipcMain.handle("spotify:resume", () => {
        // Fire and forget - don't await
        SpotifyService.resume()
        return { success: true }
    })

    ipcMain.handle("spotify:next", () => {
        SpotifyService.next()
        return { success: true }
    })

    ipcMain.handle("spotify:previous", () => {
        SpotifyService.previous()
        return { success: true }
    })

    ipcMain.handle("token:validate", async (_event: IpcMainInvokeEvent, token: string) => {
        try {
            const response = await fetch("https://discord.com/api/v9/users/@me", {
                headers: { Authorization: token }
            })
            return response.ok
        } catch {
            return false
        }
    })

    // Auto-extract Discord token from local storage using LevelDB
    ipcMain.handle("discord:extract-token", async () => {
        const fs = require('fs')
        const path = require('path')
        const os = require('os')
        const { Level } = require('level')
        
        // Discord storage paths
        const ROAMING = path.join(os.homedir(), 'AppData', 'Roaming')
        
        const discordPaths = [
            { name: 'Discord', dbPath: path.join(ROAMING, 'discord', 'Local Storage', 'leveldb') },
            { name: 'Discord Canary', dbPath: path.join(ROAMING, 'discordcanary', 'Local Storage', 'leveldb') },
            { name: 'Discord PTB', dbPath: path.join(ROAMING, 'discordptb', 'Local Storage', 'leveldb') },
            { name: 'Discord PTB (Alt)', dbPath: path.join(ROAMING, 'DiscordPTB', 'Local Storage', 'leveldb') },
        ]
        
        // Token patterns - plaintext and encrypted
        const tokenRegexes = [
            /[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g,
            /mfa\.[\w-]{84}/g,
        ]
        
        const foundTokens = new Set<string>()
        const debugInfo: Array<{name: string, exists: boolean, method: string, tokens: number}> = []
        
        // Helper: Decrypt Discord token using AES-256-GCM
        const crypto = require('crypto')
        const { execSync } = require('child_process')
        
        // Get master key from Local State file
        const getMasterKey = (localStatePath: string): Buffer | null => {
            try {
                const localState = JSON.parse(fs.readFileSync(localStatePath, 'utf8'))
                const encryptedKey = Buffer.from(localState.os_crypt.encrypted_key, 'base64')
                // Remove first 5 bytes (DPAPI header)
                const keyWithoutHeader = encryptedKey.slice(5)
                // Decrypt using DPAPI via PowerShell
                const psScript = `Add-Type -AssemblyName System.Security; $b=[Convert]::FromBase64String('${keyWithoutHeader.toString('base64')}'); $u=[Security.Cryptography.ProtectedData]::Unprotect($b,$null,'CurrentUser'); [Convert]::ToBase64String($u)`
                const result = execSync(`powershell -NoProfile -Command "${psScript}"`, { encoding: 'utf8', timeout: 5000 })
                return Buffer.from(result.trim(), 'base64')
            } catch { return null }
        }
        
        // Decrypt token using AES-256-GCM
        const decryptToken = (encryptedBase64: string, masterKey: Buffer): string | null => {
            try {
                const encryptedData = Buffer.from(encryptedBase64, 'base64')
                // Structure: [3 bytes header][12 bytes IV][payload][16 bytes tag]
                const iv = encryptedData.slice(3, 15)
                const payload = encryptedData.slice(15, -16)
                const tag = encryptedData.slice(-16)
                
                const decipher = crypto.createDecipheriv('aes-256-gcm', masterKey, iv)
                decipher.setAuthTag(tag)
                const decrypted = Buffer.concat([decipher.update(payload), decipher.final()])
                return decrypted.toString('utf8')
            } catch { return null }
        }
        
        for (const { name, dbPath } of discordPaths) {
            const info = { name, exists: false, method: 'none', tokens: 0 }
            
            if (!fs.existsSync(dbPath)) {
                debugInfo.push(info)
                continue
            }
            
            info.exists = true
            
            // Method 1: Try to read LevelDB directly using level module
            let db = null
            const tempDbPath = path.join(os.tmpdir(), 'lst-db', `${name.replace(/\s+/g, '_')}_${Date.now()}`)
            
            try {
                // Copy the LevelDB folder to temp location to avoid locks
                try {
                    fs.mkdirSync(path.dirname(tempDbPath), { recursive: true })
                    fs.cpSync(dbPath, tempDbPath, { recursive: true, force: true })
                } catch {
                    // Copy failed, try direct read
                }
                
                const dbToRead = fs.existsSync(tempDbPath) ? tempDbPath : dbPath
                info.method = fs.existsSync(tempDbPath) ? 'copied' : 'direct'
                
                // Open the database
                db = new Level(dbToRead, { valueEncoding: 'utf8' })
                
                // Iterate through all entries
                for await (const [key, value] of db.iterator()) {
                    const keyStr = String(key)
                    const valStr = String(value)
                    const content = keyStr + valStr
                    
                    // Check 1: Plaintext tokens
                    for (const regex of tokenRegexes) {
                        const matches = content.match(regex)
                        if (matches) {
                            for (const token of matches) {
                                if (!foundTokens.has(token)) {
                                    foundTokens.add(token)
                                    info.tokens++
                                    
                                    try {
                                        const response = await fetch("https://discord.com/api/v9/users/@me", {
                                            headers: { Authorization: token }
                                        })
                                        if (response.ok) {
                                            const user = await response.json() as { username: string; global_name?: string; id: string }
                                            await db.close().catch(() => {})
                                            try { fs.rmSync(tempDbPath, { recursive: true, force: true }) } catch {}
                                            return { success: true, token, username: user.global_name || user.username, id: user.id }
                                        }
                                    } catch {}
                                }
                            }
                        }
                    }
                    
                    // Check 2: Encrypted tokens (AES-256-GCM)
                    if (keyStr.toLowerCase().includes('token') && valStr.includes('dQw4w9WgXcQ:')) {
                        const match = valStr.match(/dQw4w9WgXcQ:([A-Za-z0-9+/=]+)/)
                        if (match) {
                            // Get master key from Local State
                            const localStatePath = path.join(path.dirname(dbPath), '..', 'Local State')
                            const masterKey = getMasterKey(localStatePath)
                            if (masterKey) {
                                const decrypted = decryptToken(match[1], masterKey)
                                if (decrypted) {
                                    // Validate it looks like a token
                                    if (decrypted.includes('.') && decrypted.length > 50) {
                                        foundTokens.add(decrypted)
                                        info.tokens++
                                        try {
                                            const response = await fetch("https://discord.com/api/v9/users/@me", { headers: { Authorization: decrypted } })
                                            if (response.ok) {
                                                const user = await response.json() as { username: string; global_name?: string; id: string }
                                                await db.close().catch(() => {})
                                                try { fs.rmSync(tempDbPath, { recursive: true, force: true }) } catch {}
                                                return { success: true, token: decrypted, username: user.global_name || user.username, id: user.id }
                                            }
                                        } catch {}
                                    }
                                }
                            }
                        }
                    }
                }
                
                await db.close().catch(() => {})
                
            } catch (dbError) {
                // LevelDB read failed, fallback to file scanning
                info.method = 'file-scan'
                
                try {
                    const files = fs.readdirSync(dbPath).filter((f: string) => 
                        f.endsWith('.ldb') || f.endsWith('.log')
                    )
                    
                    for (const file of files) {
                        const filePath = path.join(dbPath, file)
                        let content: string
                        
                        try {
                            content = fs.readFileSync(filePath, 'latin1')
                        } catch {
                            // Try copy fallback
                            try {
                                const tmpFile = path.join(os.tmpdir(), `lst_${Date.now()}_${file}`)
                                fs.copyFileSync(filePath, tmpFile)
                                content = fs.readFileSync(tmpFile, 'latin1')
                                fs.unlinkSync(tmpFile)
                            } catch { continue }
                        }
                        
                        for (const regex of tokenRegexes) {
                            const matches = content.match(regex)
                            if (matches) {
                                for (const token of matches) {
                                    if (!foundTokens.has(token)) {
                                        foundTokens.add(token)
                                        info.tokens++
                                        
                                        try {
                                            const response = await fetch("https://discord.com/api/v9/users/@me", {
                                                headers: { Authorization: token }
                                            })
                                            if (response.ok) {
                                                const user = await response.json() as { username: string; global_name?: string; id: string }
                                                return { 
                                                    success: true, 
                                                    token, 
                                                    username: user.global_name || user.username,
                                                    id: user.id
                                                }
                                            }
                                        } catch {}
                                    }
                                }
                            }
                        }
                    }
                } catch {}
            }
            
            // Cleanup temp db
            try { fs.rmSync(tempDbPath, { recursive: true, force: true }) } catch {}
            
            debugInfo.push(info)
        }
        
        // Build error message
        let errorMsg = 'No valid Discord token found.\n\n'
        errorMsg += 'Checked paths:\n'
        for (const info of debugInfo) {
            const status = info.exists 
                ? (info.tokens > 0 ? `✓ ${info.method} (${info.tokens} tokens)` : `✓ ${info.method} (0 tokens)`) 
                : '✗ not found'
            errorMsg += `${info.name}: ${status}\n`
        }
        if (foundTokens.size > 0) {
            errorMsg += `\nFound ${foundTokens.size} token(s) but API validation failed.\n`
        }
        errorMsg += '\nUse manual token extraction (click the ? button for instructions).'
        
        return { success: false, error: errorMsg }
    })

    // Diagnostic: Dump LevelDB contents to file for analysis
    ipcMain.handle("discord:dump-leveldb", async () => {
        const fs = require('fs')
        const path = require('path')
        const os = require('os')
        const { Level } = require('level')
        
        const ROAMING = path.join(os.homedir(), 'AppData', 'Roaming')
        
        const discordPaths = [
            { name: 'Discord', dbPath: path.join(ROAMING, 'discord', 'Local Storage', 'leveldb') },
            { name: 'Discord PTB', dbPath: path.join(ROAMING, 'discordptb', 'Local Storage', 'leveldb') },
            { name: 'Discord PTB (Alt)', dbPath: path.join(ROAMING, 'DiscordPTB', 'Local Storage', 'leveldb') },
        ]
        
        const outputLines: string[] = []
        outputLines.push('=== Discord LevelDB Diagnostic Dump ===')
        outputLines.push(`Date: ${new Date().toISOString()}`)
        outputLines.push('')
        
        for (const { name, dbPath } of discordPaths) {
            outputLines.push(`\n=== ${name} ===`)
            outputLines.push(`Path: ${dbPath}`)
            
            if (!fs.existsSync(dbPath)) {
                outputLines.push('Status: NOT FOUND')
                continue
            }
            
            outputLines.push('Status: FOUND')
            outputLines.push('')
            
            // List files
            try {
                const files = fs.readdirSync(dbPath)
                outputLines.push(`Files (${files.length}):`)
                files.forEach((f: string) => outputLines.push(`  - ${f}`))
                outputLines.push('')
            } catch (e) {
                outputLines.push(`Error listing files: ${(e as Error).message}`)
            }
            
            // Try to read LevelDB
            const tempDbPath = path.join(os.tmpdir(), 'lst-dump', `${name.replace(/\s+/g, '_')}_${Date.now()}`)
            
            try {
                // Copy DB
                try {
                    fs.mkdirSync(path.dirname(tempDbPath), { recursive: true })
                    fs.cpSync(dbPath, tempDbPath, { recursive: true, force: true })
                    outputLines.push('DB copied to temp: YES')
                } catch (e) {
                    outputLines.push(`DB copy failed: ${(e as Error).message}`)
                }
                
                const dbToRead = fs.existsSync(tempDbPath) ? tempDbPath : dbPath
                const db = new Level(dbToRead, { valueEncoding: 'utf8' })
                
                outputLines.push('\n--- LevelDB Entries ---')
                let entryCount = 0
                
                for await (const [key, value] of db.iterator()) {
                    entryCount++
                    const keyStr = String(key)
                    const valStr = String(value)
                    
                    // Check if value contains token-like patterns
                    const hasTokenPattern = /[\w-]{20,}\.[\w-]{5,}\.[\w-]{20,}/.test(valStr)
                    const hasMfaPattern = valStr.includes('mfa.')
                    
                    outputLines.push(`\n[Entry ${entryCount}]`)
                    outputLines.push(`Key: ${keyStr.substring(0, 200)}`)
                    outputLines.push(`Value Length: ${valStr.length}`)
                    outputLines.push(`Value Preview: ${valStr.substring(0, 500).replace(/\n/g, '\\n')}`)
                    
                    if (hasTokenPattern) {
                        const matches = valStr.match(/[\w-]{20,}\.[\w-]{5,}\.[\w-]{20,}/g)
                        outputLines.push(`*** TOKEN PATTERN FOUND: ${matches?.join(', ')}`)
                    }
                    if (hasMfaPattern) {
                        const matches = valStr.match(/mfa\.[\w-]+/g)
                        outputLines.push(`*** MFA PATTERN FOUND: ${matches?.join(', ')}`)
                    }
                    
                    // NO LIMIT - dump all entries
                }
                
                await db.close().catch(() => {})
                outputLines.push(`\nTotal entries read: ${entryCount}`)
                
            } catch (e) {
                outputLines.push(`\nLevelDB read error: ${(e as Error).message}`)
                outputLines.push(`Stack: ${(e as Error).stack}`)
                
                // Fallback: scan raw files
                outputLines.push('\n--- Fallback: Raw File Scan ---')
                try {
                    const files = fs.readdirSync(dbPath).filter((f: string) => 
                        f.endsWith('.ldb') || f.endsWith('.log')
                    )
                    
                    for (const file of files) { // ALL files
                        outputLines.push(`\nFile: ${file}`)
                        try {
                            const content = fs.readFileSync(path.join(dbPath, file), 'latin1')
                            const lines = content.split('\n').filter((l: string) => l.trim())
                            outputLines.push(`Lines: ${lines.length}`)
                            
                            // Search for ALL token patterns
                            const allMatches: string[] = []
                            for (const line of lines) {
                                const matches = line.match(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g)
                                if (matches) {
                                    allMatches.push(...matches)
                                }
                            }
                            if (allMatches.length > 0) {
                                outputLines.push(`  ALL TOKENS (${allMatches.length} total):`)
                                allMatches.forEach((t: string, i: number) => {
                                    outputLines.push(`    ${i+1}. ${t}`)
                                })
                            } else {
                                outputLines.push('  No tokens found in this file')
                            }
                        } catch (fe) {
                            outputLines.push(`  Error reading: ${(fe as Error).message}`)
                        }
                    }
                } catch (fe) {
                    outputLines.push(`File scan error: ${(fe as Error).message}`)
                }
            }
            
            // Cleanup
            try { fs.rmSync(tempDbPath, { recursive: true, force: true }) } catch {}
        }
        
        outputLines.push('\n=== END OF DUMP ===')
        
        // Write to desktop
        const desktopPath = path.join(os.homedir(), 'Desktop', `discord-leveldb-dump-${Date.now()}.txt`)
        fs.writeFileSync(desktopPath, outputLines.join('\n'))
        
        return { 
            success: true, 
            path: desktopPath,
            preview: outputLines.slice(0, 50).join('\n')
        }
    })

    // Discord user profile with full data from v9 API
    ipcMain.handle("discord:user", async () => {
        const token = Settings.credentials.token
        if (!token) return null
        
        try {
            // Get basic user info
            const response = await fetch("https://discord.com/api/v9/users/@me", {
                headers: { Authorization: token }
            })
            if (!response.ok) return null
            
            const data = await response.json() as { 
                id: string
                username: string
                global_name?: string
                avatar?: string
                banner?: string
                banner_color?: string
                public_flags?: number
                accent_color?: number
                display_name_styles?: {
                    font_id?: number
                    effect_id?: number
                    colors?: number[]
                }
            }
            
            // Check if avatar is animated (starts with a_)
            const isAnimatedAvatar = data.avatar?.startsWith('a_')
            const avatarExt = isAnimatedAvatar ? 'gif' : 'png'
            
            // Check if banner is animated
            const isAnimatedBanner = data.banner?.startsWith('a_')
            const bannerExt = isAnimatedBanner ? 'gif' : 'png'
            
            // Parse badges from public_flags
            const badges = parseBadges(data.public_flags || 0)
            
            // Get full user profile (bio, badges, premium status, etc.)
            let bio = ''
            let pronouns = ''
            let premiumType = 0
            let premiumSince: string | null = null
            let profileBadges: { id: string; description: string; icon: string; link?: string }[] = []
            let clan: { tag: string; badge: string; guildId: string } | null = null
            
            let themeColors: number[] | null = null
            
            try {
                const profileResponse = await fetch(`https://discord.com/api/v9/users/${data.id}/profile?with_mutual_guilds=false&with_mutual_friends=false`, {
                    headers: { Authorization: token }
                })
                if (profileResponse.ok) {
                    const profileData = await profileResponse.json() as { 
                        user: { bio?: string; clan?: { tag: string; badge: string; identity_guild_id: string } }
                        user_profile?: { bio?: string; pronouns?: string; theme_colors?: number[] }
                        badges?: Array<{ id: string; description: string; icon: string; link?: string }>
                        premium_type?: number
                        premium_since?: string
                    }
                    bio = profileData.user_profile?.bio || profileData.user?.bio || ''
                    pronouns = profileData.user_profile?.pronouns || ''
                    themeColors = profileData.user_profile?.theme_colors || null
                    premiumType = profileData.premium_type || 0
                    premiumSince = profileData.premium_since || null
                    profileBadges = profileData.badges || []
                    
                    if (profileData.user?.clan) {
                        clan = {
                            tag: profileData.user.clan.tag,
                            badge: profileData.user.clan.badge,
                            guildId: profileData.user.clan.identity_guild_id
                        }
                    }
                }
            } catch {}
            
            // Get connections
            let connections: { type: string; name: string; id: string; visibility: number }[] = []
            try {
                const connectionsResponse = await fetch("https://discord.com/api/v9/users/@me/connections", {
                    headers: { Authorization: token }
                })
                if (connectionsResponse.ok) {
                    const connectionsData = await connectionsResponse.json() as Array<{ type: string; name: string; id: string; visibility: number }>
                    connections = connectionsData
                }
            } catch {}
            
            // Use badges directly from API (includes aged Nitro badges)
            const allBadges: { name: string; icon: string }[] = []
            
            // Add profile badges from API (this includes the correct aged Nitro badges)
            for (const badge of profileBadges) {
                allBadges.push({
                    name: badge.description,
                    icon: `https://cdn.discordapp.com/badge-icons/${badge.icon}.png`
                })
            }
            
            return {
                id: data.id,
                username: data.username,
                globalName: data.global_name || data.username,
                avatar: data.avatar ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.${avatarExt}?size=256` : null,
                banner: data.banner ? `https://cdn.discordapp.com/banners/${data.id}/${data.banner}.${bannerExt}?size=600` : null,
                bannerColor: data.banner_color,
                accentColor: data.accent_color ? `#${data.accent_color.toString(16).padStart(6, '0')}` : null,
                themeColors: themeColors ? themeColors.map(c => `#${c.toString(16).padStart(6, '0')}`) : null,
                displayNameColors: data.display_name_styles?.colors 
                    ? data.display_name_styles.colors.map(c => `#${c.toString(16).padStart(6, '0')}`) 
                    : null,
                badges: allBadges,
                bio: bio,
                pronouns: pronouns,
                premiumType: premiumType,
                premiumSince: premiumSince,
                clan: clan,
                connections: connections
            }
        } catch {
            // Failed to get user
        }
        return null
    })

    // Spotify user profile
    ipcMain.handle("spotify:user", async () => {
        return await SpotifyService.getUserProfile()
    })

    // Spotify playlists
    ipcMain.handle("spotify:playlists", async () => {
        return await SpotifyService.getPlaylists()
    })

    // Spotify playlist tracks
    ipcMain.handle("spotify:playlist-tracks", async (_event: IpcMainInvokeEvent, playlistId: string) => {
        return await SpotifyService.getPlaylistTracks(playlistId)
    })

    // Spotify liked songs
    ipcMain.handle("spotify:liked-songs", async () => {
        return await SpotifyService.getLikedSongs()
    })

    // Spotify seek
    ipcMain.handle("spotify:seek", async (_event: IpcMainInvokeEvent, positionMs: number) => {
        return await SpotifyService.seek(positionMs)
    })

    // Spotify volume
    ipcMain.handle("spotify:volume", async (_event: IpcMainInvokeEvent, volumePercent: number) => {
        return await SpotifyService.setVolume(volumePercent)
    })

    // Spotify devices
    ipcMain.handle("spotify:devices", async () => {
        return await SpotifyService.getDevices()
    })

    // Spotify transfer playback
    ipcMain.handle("spotify:transfer", async (_event: IpcMainInvokeEvent, deviceId: string, play?: boolean) => {
        return await SpotifyService.transferPlayback(deviceId, play ?? true)
    })

    // Spotify recently played
    ipcMain.handle("spotify:recently-played", async (_event: IpcMainInvokeEvent, limit?: number) => {
        return await SpotifyService.getRecentlyPlayed(limit ?? 20)
    })

    // Spotify audio features
    ipcMain.handle("spotify:audio-features", async (_event: IpcMainInvokeEvent, trackId: string) => {
        return await SpotifyService.getAudioFeatures(trackId)
    })

    // Spotify save track (heart)
    ipcMain.handle("spotify:save-track", async (_event: IpcMainInvokeEvent, trackId: string) => {
        return await SpotifyService.saveTrack(trackId)
    })

    // Spotify remove track (unheart)
    ipcMain.handle("spotify:remove-track", async (_event: IpcMainInvokeEvent, trackId: string) => {
        return await SpotifyService.removeTrack(trackId)
    })

    // Spotify check if track is saved
    ipcMain.handle("spotify:is-track-saved", async (_event: IpcMainInvokeEvent, trackId: string) => {
        return await SpotifyService.isTrackSaved(trackId)
    })

    // Spotify search tracks
    ipcMain.handle("spotify:search-tracks", async (_event: IpcMainInvokeEvent, query: string, limit?: number) => {
        return await SpotifyService.searchTracks(query, limit ?? 20)
    })

    // Spotify search artists
    ipcMain.handle("spotify:search-artists", async (_event: IpcMainInvokeEvent, query: string, limit?: number) => {
        return await SpotifyService.searchArtists(query, limit ?? 20)
    })

    // Spotify get artist details
    ipcMain.handle("spotify:artist", async (_event: IpcMainInvokeEvent, artistId: string) => {
        return await SpotifyService.getArtist(artistId)
    })

    // Spotify get artist top tracks
    ipcMain.handle("spotify:artist-top-tracks", async (_event: IpcMainInvokeEvent, artistId: string) => {
        return await SpotifyService.getArtistTopTracks(artistId)
    })

    // Spotify get album details
    ipcMain.handle("spotify:album", async (_event: IpcMainInvokeEvent, albumId: string) => {
        return await SpotifyService.getAlbum(albumId)
    })

    // Spotify get album tracks
    ipcMain.handle("spotify:album-tracks", async (_event: IpcMainInvokeEvent, albumId: string) => {
        return await SpotifyService.getAlbumTracks(albumId)
    })

    // Spotify get track details
    ipcMain.handle("spotify:track", async (_event: IpcMainInvokeEvent, trackId: string) => {
        return await SpotifyService.getTrack(trackId)
    })

    // Spotify get recommendations
    ipcMain.handle("spotify:recommendations", async (_event: IpcMainInvokeEvent, seedTracks?: string[], seedArtists?: string[], limit?: number) => {
        return await SpotifyService.getRecommendations(seedTracks, seedArtists, limit ?? 20)
    })

    // Spotify get available genres
    ipcMain.handle("spotify:genres", async () => {
        return await SpotifyService.getAvailableGenres()
    })

    // Spotify get new releases
    ipcMain.handle("spotify:new-releases", async (_event: IpcMainInvokeEvent, limit?: number) => {
        return await SpotifyService.getNewReleases(limit ?? 20)
    })

    // Spotify get featured playlists
    ipcMain.handle("spotify:featured-playlists", async (_event: IpcMainInvokeEvent, limit?: number) => {
        return await SpotifyService.getFeaturedPlaylists(limit ?? 20)
    })

    // Song history
    ipcMain.handle("history:get", () => lyricsApp?.getHistory() ?? [])
    ipcMain.handle("history:clear", () => {
        lyricsApp?.clearHistory()
        return true
    })

    // Open external links
    ipcMain.on("open:external", (_event: IpcMainEvent, url: string) => shell.openExternal(url))

    // Forward app events to renderer
    appEvents.on("song:changed", (data) => {
        mainWindow?.webContents.send("song:changed", data)
    })
    appEvents.on("lyrics:updated", (data) => {
        mainWindow?.webContents.send("lyrics:updated", data)
    })
    appEvents.on("status:sent", (data) => {
        mainWindow?.webContents.send("status:sent", data)
    })
}

app.whenReady().then(async () => {
    // Initialize settings path with Electron's userData directory
    const userDataPath = app.getPath('userData')
    initSettingsPath(userDataPath)
    initDataPath(userDataPath)
    
    Settings.load()
    dataStore.reload() // Reload data from proper path

    // Set up callback for when Spotify auth completes
    setAuthCompleteCallback(async () => {
        console.log("Spotify auth complete callback triggered")
        // Notify frontend that auth is complete and settings changed
        mainWindow?.webContents.send("spotify:auth-complete", {
            refreshToken: Settings.credentials.refreshToken ? "present" : "missing"
        })
        
        // Get and send Spotify user info
        const userProfile = await SpotifyService.getUserProfile()
        if (userProfile) {
            mainWindow?.webContents.send("spotify:user", userProfile)
        }
        
        // Auto-start the lyrics app if we have all credentials and it's not already running
        if (!lyricsApp?.isRunning && Settings.credentials.token && Settings.credentials.refreshToken) {
            console.log("Auto-starting lyrics app after Spotify auth")
            await lyricsApp?.start()
            updateTrayMenu()
        }
    })

    // Start the HTTP/WebSocket server for Spotify callback
    startServer()

    createWindow()
    createTray()
    setupIPC()

    lyricsApp = new LyricsStatusApp()

    if (Settings.general.startMinimized) {
        mainWindow?.hide()
    }

    // Auto-start if credentials are configured
    if (Settings.credentials.token && Settings.credentials.refreshToken) {
        await lyricsApp.start()
        updateTrayMenu()
        
        // Get and display Spotify user info
        const userProfile = await SpotifyService.getUserProfile()
        if (userProfile) {
            mainWindow?.webContents.send("spotify:user", userProfile)
        }
    }
})

app.on("window-all-closed", () => {
    // Always quit when all windows are closed
    forceQuit()
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
// 🔥 FORCE KILL ELECTRON WHEN WINDOW CLOSES
