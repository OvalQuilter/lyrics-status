import Database, { Database as DB } from "better-sqlite3"
import { createHash } from "crypto"
import { renameSync } from "fs"
import { Settings } from "./Settings"
import { LyricsLine } from "./Sources/BaseSource"

const CACHE_VERSION = 1

export type CacheResult =
    | { hit: true; lines: LyricsLine[]; appName: string }
    | { hit: true; lines: null }
    | null

interface CacheRow {
    key: string
    name: string
    artist: string
    name_normalized: string
    ts: number
    v: number
    app_name: string | null
    lines: string | null
    error: string | null
}

// NO 'g' flag — matches PlaybackStateUpdater behaviour (strips first group only)
const normalize = (s: string) => s.replace(/ \(.+\)/, "").toLowerCase().trim()

export const cacheKey = (n: string, a: string) =>
    createHash("sha1").update(`${normalize(n)}\0${normalize(a)}`).digest("hex")

export class CacheStore {
    private db: DB
    private stmtGet: ReturnType<DB["prepare"]>
    private stmtSet: ReturnType<DB["prepare"]>
    private stmtCount: ReturnType<DB["prepare"]>
    private stmtEvict: ReturnType<DB["prepare"]>

    constructor(dbPath: string) {
        // 1. Open DB
        this.db = new Database(dbPath)

        // 2. integrity_check FIRST — before any pragma
        let ok = false
        try {
            const row = this.db.prepare("PRAGMA integrity_check").get() as any
            ok = row?.integrity_check === "ok"
        } catch {}

        if (!ok) {
            this.db.close()
            try { renameSync(dbPath, `${dbPath}.corrupt${Date.now()}`) } catch {}
            this.db = new Database(dbPath)
        }

        // 3. WAL (fall back to DELETE on error)
        try {
            this.db.pragma("journal_mode=WAL")
        } catch (e) {
            console.warn("[CacheStore] WAL unavailable, using DELETE journal mode:", e)
        }

        // 4. busy_timeout
        this.db.pragma("busy_timeout=3000")

        // 5. DDL
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS lyrics (
                key             TEXT PRIMARY KEY,
                name            TEXT NOT NULL,
                artist          TEXT NOT NULL,
                name_normalized TEXT NOT NULL,
                ts              INTEGER NOT NULL,
                v               INTEGER NOT NULL,
                app_name        TEXT,
                lines           TEXT,
                error           TEXT
            );
            CREATE INDEX IF NOT EXISTS idx_ts ON lyrics(ts);
        `)

        // 6. Prepare statements
        this.stmtGet = this.db.prepare("SELECT * FROM lyrics WHERE key = ?")
        this.stmtSet = this.db.prepare(`
            INSERT INTO lyrics (key, name, artist, name_normalized, ts, v, app_name, lines, error)
            VALUES (@key, @name, @artist, @name_normalized, @ts, @v, @app_name, @lines, @error)
            ON CONFLICT(key) DO UPDATE SET ts=excluded.ts, v=excluded.v,
                app_name=excluded.app_name, lines=excluded.lines, error=excluded.error
        `)
        this.stmtCount = this.db.prepare("SELECT COUNT(*) as cnt FROM lyrics")
        this.stmtEvict = this.db.prepare(`
            DELETE FROM lyrics WHERE key IN (
                SELECT key FROM lyrics ORDER BY ts ASC LIMIT ?
            )
        `)
    }

    get(name: string, artist: string): CacheResult {
        const row = this.stmtGet.get(cacheKey(name, artist)) as CacheRow | undefined
        if (!row) return null
        if (row.v !== CACHE_VERSION) return null

        const lyricsTtl = Settings.cache.lyricsTtlDays * 86_400_000
        const emptyTtl  = Settings.cache.emptyTtlDays  * 86_400_000
        const errorTtl  = Settings.cache.errorTtlHours * 3_600_000
        const ttl = row.lines ? lyricsTtl : row.error === "network" ? errorTtl : emptyTtl

        if (Date.now() - row.ts > ttl) return null
        if (!row.lines) return { hit: true, lines: null }
        return { hit: true, lines: JSON.parse(row.lines), appName: row.app_name! }
    }

    set(name: string, artist: string, lines: LyricsLine[] | null, appName: string, error?: string): void {
        const safeLines = (lines?.length && !lines.every(l => l.time === 0))
            ? JSON.stringify(lines) : null

        this.stmtSet.run({
            key: cacheKey(name, artist),
            name,
            artist,
            name_normalized: normalize(name),
            ts: Date.now(),
            v: CACHE_VERSION,
            app_name: appName || null,
            lines: safeLines,
            error: error ?? null
        })
    }

    evict(maxRows: number): void {
        const floor = Math.max(maxRows, 50)
        const { cnt } = this.stmtCount.get() as { cnt: number }
        const excess = cnt - floor
        if (excess > 0) this.stmtEvict.run(excess)
    }

    close(): void {
        this.db.close()
    }
}
