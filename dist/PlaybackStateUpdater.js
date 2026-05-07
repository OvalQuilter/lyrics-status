"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackStateUpdater = void 0;
const Settings_1 = require("./Settings");
// ─── Constants ────────────────────────────────────────────────────────────────
const DISCORD_API = "https://discord.com/api/v10";
const SPOTIFY_API = "https://api.spotify.com/v1";
/** Strip featured artist / remix suffixes like "(feat. X)" or "(Remix)" */
const TITLE_CLEANUP_RE = / \(.+\)/g;
// ─── PlaybackStateUpdater ─────────────────────────────────────────────────────
/**
 * Polls the Spotify player API every few seconds and keeps {@link PlaybackState}
 * up to date.
 *
 * Authentication is handled transparently: the Spotify access token is read
 * from Discord's `/users/@me/connections` endpoint, which Discord refreshes
 * automatically. No OAuth setup or Spotify developer account is required.
 */
class PlaybackStateUpdater {
    constructor(playbackState, lyricsFetcher) {
        /** Spotify access token sourced from Discord connections. */
        this.spotifyToken = "";
        this.playbackState = playbackState;
        this.lyricsFetcher = lyricsFetcher;
    }
    // ── Private helpers ───────────────────────────────────────────────────────
    /**
     * Fetches a fresh Spotify access token from Discord's connections endpoint.
     * Returns `true` on success, `false` if the Discord token is invalid or
     * the user has no Spotify account connected.
     */
    refreshSpotifyToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`${DISCORD_API}/users/@me/connections`, {
                    headers: { Authorization: Settings_1.Settings.credentials.token },
                });
                if (!res.ok)
                    return false;
                const connections = (yield res.json());
                const spotify = connections.find((c) => c.type === "spotify");
                if (!(spotify === null || spotify === void 0 ? void 0 : spotify.access_token))
                    return false;
                this.spotifyToken = spotify.access_token;
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    /**
     * Calls the Spotify player endpoint. Automatically refreshes the token
     * once on a 401 and retries before giving up.
     */
    fetchPlayerState() {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = () => ({ Authorization: `Bearer ${this.spotifyToken}` });
            let res = yield fetch(`${SPOTIFY_API}/me/player`, { headers: headers() });
            if (res.status === 401) {
                const refreshed = yield this.refreshSpotifyToken();
                if (!refreshed)
                    return null;
                res = yield fetch(`${SPOTIFY_API}/me/player`, { headers: headers() });
            }
            return res;
        });
    }
    /**
     * Fetches lyrics for the current song if they haven't been fetched yet,
     * or if a rapid song switch interrupted a previous fetch.
     */
    syncLyrics() {
        return __awaiter(this, void 0, void 0, function* () {
            const { playbackState, lyricsFetcher } = this;
            const key = playbackState.songName + playbackState.songAuthor;
            if (lyricsFetcher.lastFetchedFor === key)
                return;
            playbackState.lyrics = yield lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor);
            playbackState.hasLyrics = !!playbackState.lyrics;
        });
    }
    // ── Public API ────────────────────────────────────────────────────────────
    /**
     * Polls the Spotify API and updates {@link PlaybackState}.
     * Call this on a regular interval (e.g. every 2 s).
     */
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.spotifyToken) {
                const ok = yield this.refreshSpotifyToken();
                if (!ok)
                    return;
            }
            const requestStart = Date.now();
            const res = yield this.fetchPlayerState();
            if (!res)
                return;
            const { playbackState } = this;
            // 204 = player is inactive (nothing queued / no active device)
            if (res.status === 204 || !res.ok) {
                playbackState.isPlaying = false;
                return;
            }
            const data = (yield res.json());
            if (!data.item) {
                playbackState.isPlaying = false;
                return;
            }
            // Compensate for network round-trip so progress stays accurate
            playbackState.isPlaying = data.is_playing;
            playbackState.songProgress = data.progress_ms + (Date.now() - requestStart);
            playbackState.songDuration = data.item.duration_ms;
            // Detect song change
            if (playbackState.songId !== data.item.id) {
                playbackState.oldSongId = playbackState.songId;
                playbackState.songId = data.item.id;
                playbackState.songName = data.item.name.replace(TITLE_CLEANUP_RE, "");
                playbackState.songAuthor = data.item.artists[0].name;
                playbackState.lyrics = null;
                playbackState.currentLine = null;
                playbackState.hasLyrics = false;
            }
            yield this.syncLyrics();
        });
    }
}
exports.PlaybackStateUpdater = PlaybackStateUpdater;
