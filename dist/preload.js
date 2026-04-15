"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore - electron types
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    // Window controls
    minimize: () => electron_1.ipcRenderer.send("window:minimize"),
    maximize: () => electron_1.ipcRenderer.send("window:maximize"),
    close: () => electron_1.ipcRenderer.send("window:close"),
    quit: () => electron_1.ipcRenderer.send("window:quit"),
    // Settings
    getSettings: () => electron_1.ipcRenderer.invoke("settings:get"),
    setSettings: (settings) => electron_1.ipcRenderer.invoke("settings:set", settings),
    // App controls
    startApp: () => electron_1.ipcRenderer.invoke("app:start"),
    stopApp: () => electron_1.ipcRenderer.invoke("app:stop"),
    toggleApp: () => electron_1.ipcRenderer.invoke("app:toggle"),
    getStatus: () => electron_1.ipcRenderer.invoke("app:status"),
    // Spotify
    authorizeSpotify: () => electron_1.ipcRenderer.invoke("spotify:authorize"),
    playSong: (data) => electron_1.ipcRenderer.invoke("spotify:play", data),
    pauseSong: () => electron_1.ipcRenderer.invoke("spotify:pause"),
    resumeSong: () => electron_1.ipcRenderer.invoke("spotify:resume"),
    nextSong: () => electron_1.ipcRenderer.invoke("spotify:next"),
    previousSong: () => electron_1.ipcRenderer.invoke("spotify:previous"),
    validateToken: (token) => electron_1.ipcRenderer.invoke("token:validate", token),
    // History
    getHistory: () => electron_1.ipcRenderer.invoke("history:get"),
    clearHistory: () => electron_1.ipcRenderer.invoke("history:clear"),
    // External links
    openExternal: (url) => electron_1.ipcRenderer.send("open:external", url),
    // Spotify user
    getSpotifyUser: () => electron_1.ipcRenderer.invoke("spotify:user"),
    // Spotify playlists
    getPlaylists: () => electron_1.ipcRenderer.invoke("spotify:playlists"),
    getPlaylistTracks: (playlistId) => electron_1.ipcRenderer.invoke("spotify:playlist-tracks", playlistId),
    getLikedSongs: () => electron_1.ipcRenderer.invoke("spotify:liked-songs"),
    // Spotify playback control (extended)
    seek: (positionMs) => electron_1.ipcRenderer.invoke("spotify:seek", positionMs),
    setVolume: (volumePercent) => electron_1.ipcRenderer.invoke("spotify:volume", volumePercent),
    getDevices: () => electron_1.ipcRenderer.invoke("spotify:devices"),
    transferPlayback: (deviceId, play) => electron_1.ipcRenderer.invoke("spotify:transfer", deviceId, play),
    getRecentlyPlayed: (limit) => electron_1.ipcRenderer.invoke("spotify:recently-played", limit),
    getAudioFeatures: (trackId) => electron_1.ipcRenderer.invoke("spotify:audio-features", trackId),
    saveTrack: (trackId) => electron_1.ipcRenderer.invoke("spotify:save-track", trackId),
    removeTrack: (trackId) => electron_1.ipcRenderer.invoke("spotify:remove-track", trackId),
    isTrackSaved: (trackId) => electron_1.ipcRenderer.invoke("spotify:is-track-saved", trackId),
    searchTracks: (query, limit) => electron_1.ipcRenderer.invoke("spotify:search-tracks", query, limit),
    searchArtists: (query, limit) => electron_1.ipcRenderer.invoke("spotify:search-artists", query, limit),
    getArtist: (artistId) => electron_1.ipcRenderer.invoke("spotify:artist", artistId),
    getArtistTopTracks: (artistId) => electron_1.ipcRenderer.invoke("spotify:artist-top-tracks", artistId),
    getAlbum: (albumId) => electron_1.ipcRenderer.invoke("spotify:album", albumId),
    getAlbumTracks: (albumId) => electron_1.ipcRenderer.invoke("spotify:album-tracks", albumId),
    getTrack: (trackId) => electron_1.ipcRenderer.invoke("spotify:track", trackId),
    getRecommendations: (seedTracks, seedArtists, limit) => electron_1.ipcRenderer.invoke("spotify:recommendations", seedTracks, seedArtists, limit),
    getGenres: () => electron_1.ipcRenderer.invoke("spotify:genres"),
    getNewReleases: (limit) => electron_1.ipcRenderer.invoke("spotify:new-releases", limit),
    getFeaturedPlaylists: (limit) => electron_1.ipcRenderer.invoke("spotify:featured-playlists", limit),
    // Discord user
    getDiscordUser: () => electron_1.ipcRenderer.invoke("discord:user"),
    // Discord token auto-extraction
    extractDiscordToken: () => electron_1.ipcRenderer.invoke("discord:extract-token"),
    // Discord LevelDB diagnostic dump
    dumpDiscordLevelDB: () => electron_1.ipcRenderer.invoke("discord:dump-leveldb"),
    // Event listeners
    onSongChanged: (callback) => {
        electron_1.ipcRenderer.on("song:changed", (_event, data) => callback(data));
    },
    onLyricsUpdated: (callback) => {
        electron_1.ipcRenderer.on("lyrics:updated", (_event, data) => callback(data));
    },
    onStatusSent: (callback) => {
        electron_1.ipcRenderer.on("status:sent", (_event, data) => callback(data));
    },
    onSpotifyUser: (callback) => {
        electron_1.ipcRenderer.on("spotify:user", (_event, data) => callback(data));
    },
    onSpotifyAuthComplete: (callback) => {
        electron_1.ipcRenderer.on("spotify:auth-complete", (_event, data) => callback(data));
    },
    onceSpotifyAuthComplete: (callback) => {
        electron_1.ipcRenderer.once("spotify:auth-complete", (_event, data) => callback(data));
    }
});
