"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheStore = exports.cacheKey = void 0;
const Database = require("better-sqlite3");
const { createHash } = require("crypto");
const { renameSync, mkdirSync } = require("fs");
const Settings_1 = require("./Settings");

const CACHE_VERSION = 1;

// NO 'g' flag — strips first group only, matching PlaybackStateUpdater behaviour
const normalize = s => s.replace(/ \(.+\)/, "").toLowerCase().trim();

const cacheKey = (n, a) =>
    createHash("sha1").update(`${normalize(n)}\0${normalize(a)}`).digest("hex");
exports.cacheKey = cacheKey;

class CacheStore {
    constructor(dbPath) {
        // 1. Open DB
        this.db = new Database(dbPath);

        // 2. integrity_check FIRST — before pragmas
        let ok = false;
        try {
            const row = this.db.prepare("PRAGMA integrity_check").get();
            ok = row && row.integrity_check === "ok";
        } catch (_) {}

        if (!ok) {
            this.db.close();
            try { renameSync(dbPath, `${dbPath}.corrupt${Date.now()}`); } catch (_) {}
            this.db = new Database(dbPath);
        }

        // 3. WAL — fall back to DELETE on error (e.g. network drive)
        try { this.db.pragma("journal_mode=WAL"); }
        catch (e) { console.warn("[CacheStore] WAL unavailable, using DELETE journal:", e); }

        // 4. busy_timeout
        this.db.pragma("busy_timeout=3000");

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
        `);

        // 6. Prepare statements
        this._stmtGet   = this.db.prepare("SELECT * FROM lyrics WHERE key = ?");
        this._stmtSet   = this.db.prepare(`
            INSERT INTO lyrics (key, name, artist, name_normalized, ts, v, app_name, lines, error)
            VALUES (@key, @name, @artist, @name_normalized, @ts, @v, @app_name, @lines, @error)
            ON CONFLICT(key) DO UPDATE SET ts=excluded.ts, v=excluded.v,
                app_name=excluded.app_name, lines=excluded.lines, error=excluded.error
        `);
        this._stmtCount = this.db.prepare("SELECT COUNT(*) as cnt FROM lyrics");
        this._stmtEvict = this.db.prepare(
            "DELETE FROM lyrics WHERE key IN (SELECT key FROM lyrics ORDER BY ts ASC LIMIT ?)"
        );
    }

    get(name, artist) {
        const row = this._stmtGet.get(cacheKey(name, artist));
        if (!row) return null;
        if (row.v !== CACHE_VERSION) return null;

        const lyricsTtl = Settings_1.Settings.cache.lyricsTtlDays * 86_400_000;
        const emptyTtl  = Settings_1.Settings.cache.emptyTtlDays  * 86_400_000;
        const errorTtl  = Settings_1.Settings.cache.errorTtlHours * 3_600_000;
        const ttl = row.lines ? lyricsTtl : row.error === "network" ? errorTtl : emptyTtl;

        if (Date.now() - row.ts > ttl) return null;
        if (!row.lines) return { hit: true, lines: null };
        return { hit: true, lines: JSON.parse(row.lines), appName: row.app_name };
    }

    set(name, artist, lines, appName, error) {
        const safeLines = (lines?.length && !lines.every(l => l.time === 0))
            ? JSON.stringify(lines) : null;

        this._stmtSet.run({
            key: cacheKey(name, artist),
            name,
            artist,
            name_normalized: normalize(name),
            ts: Date.now(),
            v: CACHE_VERSION,
            app_name: appName || null,
            lines: safeLines,
            error: error ?? null
        });
    }

    evict(maxRows) {
        const floor = Math.max(maxRows, 50);
        const { cnt } = this._stmtCount.get();
        const excess = cnt - floor;
        if (excess > 0) this._stmtEvict.run(excess);
    }

    close() { this.db.close(); }
}
exports.CacheStore = CacheStore;
