// @ts-ignore - electron types
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron"

contextBridge.exposeInMainWorld("electronAPI", {
    // Window controls
    minimize: () => ipcRenderer.send("window:minimize"),
    maximize: () => ipcRenderer.send("window:maximize"),
    close: () => ipcRenderer.send("window:close"),
    quit: () => ipcRenderer.send("window:quit"),

    // Settings
    getSettings: () => ipcRenderer.invoke("settings:get"),
    setSettings: (settings: unknown) => ipcRenderer.invoke("settings:set", settings),

    // App controls
    startApp: () => ipcRenderer.invoke("app:start"),
    stopApp: () => ipcRenderer.invoke("app:stop"),
    toggleApp: () => ipcRenderer.invoke("app:toggle"),
    getStatus: () => ipcRenderer.invoke("app:status"),

    // Spotify
    authorizeSpotify: () => ipcRenderer.invoke("spotify:authorize"),
    playSong: (data: { uri?: string; name?: string; artist?: string }) => ipcRenderer.invoke("spotify:play", data),
    pauseSong: () => ipcRenderer.invoke("spotify:pause"),
    resumeSong: () => ipcRenderer.invoke("spotify:resume"),
    nextSong: () => ipcRenderer.invoke("spotify:next"),
    previousSong: () => ipcRenderer.invoke("spotify:previous"),
    validateToken: (token: string) => ipcRenderer.invoke("token:validate", token),

    // History
    getHistory: () => ipcRenderer.invoke("history:get"),
    clearHistory: () => ipcRenderer.invoke("history:clear"),

    // External links
    openExternal: (url: string) => ipcRenderer.send("open:external", url),

    // Spotify user
    getSpotifyUser: () => ipcRenderer.invoke("spotify:user"),

    // Spotify playlists
    getPlaylists: () => ipcRenderer.invoke("spotify:playlists"),
    getPlaylistTracks: (playlistId: string) => ipcRenderer.invoke("spotify:playlist-tracks", playlistId),
    getLikedSongs: () => ipcRenderer.invoke("spotify:liked-songs"),

    // Spotify playback control (extended)
    seek: (positionMs: number) => ipcRenderer.invoke("spotify:seek", positionMs),
    setVolume: (volumePercent: number) => ipcRenderer.invoke("spotify:volume", volumePercent),
    getDevices: () => ipcRenderer.invoke("spotify:devices"),
    transferPlayback: (deviceId: string, play?: boolean) => ipcRenderer.invoke("spotify:transfer", deviceId, play),
    getRecentlyPlayed: (limit?: number) => ipcRenderer.invoke("spotify:recently-played", limit),
    getAudioFeatures: (trackId: string) => ipcRenderer.invoke("spotify:audio-features", trackId),
    saveTrack: (trackId: string) => ipcRenderer.invoke("spotify:save-track", trackId),
    removeTrack: (trackId: string) => ipcRenderer.invoke("spotify:remove-track", trackId),
    isTrackSaved: (trackId: string) => ipcRenderer.invoke("spotify:is-track-saved", trackId),
    searchTracks: (query: string, limit?: number) => ipcRenderer.invoke("spotify:search-tracks", query, limit),
    searchArtists: (query: string, limit?: number) => ipcRenderer.invoke("spotify:search-artists", query, limit),
    getArtist: (artistId: string) => ipcRenderer.invoke("spotify:artist", artistId),
    getArtistTopTracks: (artistId: string) => ipcRenderer.invoke("spotify:artist-top-tracks", artistId),
    getAlbum: (albumId: string) => ipcRenderer.invoke("spotify:album", albumId),
    getAlbumTracks: (albumId: string) => ipcRenderer.invoke("spotify:album-tracks", albumId),
    getTrack: (trackId: string) => ipcRenderer.invoke("spotify:track", trackId),
    getRecommendations: (seedTracks?: string[], seedArtists?: string[], limit?: number) => 
        ipcRenderer.invoke("spotify:recommendations", seedTracks, seedArtists, limit),
    getGenres: () => ipcRenderer.invoke("spotify:genres"),
    getNewReleases: (limit?: number) => ipcRenderer.invoke("spotify:new-releases", limit),
    getFeaturedPlaylists: (limit?: number) => ipcRenderer.invoke("spotify:featured-playlists", limit),

    // Discord user
    getDiscordUser: () => ipcRenderer.invoke("discord:user"),
    
    // Discord token auto-extraction
    extractDiscordToken: () => ipcRenderer.invoke("discord:extract-token"),
    
    // Discord LevelDB diagnostic dump
    dumpDiscordLevelDB: () => ipcRenderer.invoke("discord:dump-leveldb"),

    // Event listeners
    onSongChanged: (callback: (data: unknown) => void) => {
        ipcRenderer.on("song:changed", (_event: IpcRendererEvent, data: unknown) => callback(data))
    },
    onLyricsUpdated: (callback: (data: unknown) => void) => {
        ipcRenderer.on("lyrics:updated", (_event: IpcRendererEvent, data: unknown) => callback(data))
    },
    onStatusSent: (callback: (data: unknown) => void) => {
        ipcRenderer.on("status:sent", (_event: IpcRendererEvent, data: unknown) => callback(data))
    },
    onSpotifyUser: (callback: (data: unknown) => void) => {
        ipcRenderer.on("spotify:user", (_event: IpcRendererEvent, data: unknown) => callback(data))
    },
    onSpotifyAuthComplete: (callback: (data: unknown) => void) => {
        ipcRenderer.on("spotify:auth-complete", (_event: IpcRendererEvent, data: unknown) => callback(data))
    },
    onceSpotifyAuthComplete: (callback: (data: unknown) => void) => {
        ipcRenderer.once("spotify:auth-complete", (_event: IpcRendererEvent, data: unknown) => callback(data))
    }
})
