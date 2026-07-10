<div align="center">

# lyrics-status

**Real-time Spotify lyrics → Discord custom status**

[![Version](https://img.shields.io/badge/version-3.5.0-blue?style=flat-square)](https://github.com/RamenFighter03/lyrics-status)
[![Node](https://img.shields.io/badge/node-v17%2B-green?style=flat-square)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-purple?style=flat-square)](LICENSE)

Fork of [OvalQuilter/lyrics-status](https://github.com/OvalQuilter/lyrics-status) — actively maintained continuation.

![Terminal preview](res/screenie2.png)

</div>

---

## What it does

Syncs your Discord custom status to live Spotify lyrics, line by line. Configured entirely through a browser panel at `localhost:8999` — no config files to edit.

![Panel](res/panel.png)

---

## Features

| Feature | Details |
|---|---|
| **6 lyric sources** | Spotify, Musixmatch, LrcLib, NetEase, QQ Music, Genius |
| **Source ordering** | Toggle and reorder sources from the panel; changes apply live |
| **Gateway mode** | Sends via Discord WebSocket (op3) — eliminates REST rate limits |
| **Dealer mode** | Push-based Spotify playback events via WebSocket; no polling |
| **Status restore** | Saves and restores your pre-lyrics Discord status after playback ends |
| **Rich presence** | Shows lyrics as a "Listening to" activity with album art and progress bar |
| **Status flash** | Cycles presence orb colour on a configurable interval |
| **Fake mobile** | Identifies as Discord Android to show the mobile presence indicator |
| **Template engine** | Fully custom status format with variables (see below) |
| **Unicode styles** | Bold, italic, sans, fraktur, double-struck — optionally alternating on a timer |
| **Smart truncation** | Drops whole lines before cutting words; emoji and Unicode safe |
| **Line merging** | Joins nearby lines into one update to reduce API calls |
| **Chinese conversion** | Optional Simplified ↔ Traditional conversion via opencc-js |
| **Web panel** | Live status dashboard with lyric preview, rate-limit indicator, and source status |

### Template variables

```
{lyrics}        {lyrics_upper}      {lyrics_lower}      {lyrics_title_case}
{song_name}     {song_author}       {source}            {timestamp}
{progress}      {duration}          {line_number}
```

Append `_upper`, `_lower`, `_title_case`, `_letters_only`, or `_cropped` to any variable.

---

## Requirements

- **Node.js** v17 or later
- **Spotify** account (free or premium)
- **Discord** account

---

## Installation

```bash
git clone --single-branch --branch v3 https://github.com/RamenFighter03/lyrics-status
cd lyrics-status
npm install
npm start
```

Windows users: after the first `npm install`, you can also just double-click **start.bat** to launch -- it auto-installs/updates dependencies for you automatically, including after future updates.

> **Downloaded a zip?** GitHub's auto-generated archives may omit pre-built files. Always use `git clone`.

Open **http://localhost:8999** to configure.

---

## Setup

### 1. Discord token

Paste your Discord user token into the **Authentication** section and click **Verify**.

> ⚠️ Never share your token. Using self-bots is against Discord's ToS — use at your own risk.

### 2. Spotify credentials

**Option A — Cookies (recommended, enables Dealer mode)**
1. Open [open.spotify.com](https://open.spotify.com) while logged in
2. `F12` → **Application** → **Cookies** → `https://open.spotify.com`
3. Copy the value of `sp_dc` and paste it into **Spotify cookies** in the panel

**Option B — OAuth**
Use the OAuth flow in the panel with your own Spotify app credentials (Client ID + Secret).

### 3. Gateway (optional, recommended)

Enable **Gateway** in the panel. Status updates go via WebSocket instead of REST — no rate limiting. Falls back to REST automatically if the connection drops.

### 4. Musixmatch (optional)

Tokens are fetched automatically. To use your own: `F12` → **Application** → **Cookies** → `musixmatch.com` → copy `musixmatchUserToken`.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `npm start` exits immediately | Check `log.txt` — most likely a Node/`better-sqlite3` version mismatch. Run `npm rebuild` |
| No lyrics showing | Verify `sp_dc` cookie is fresh and a lyrics-enabled track is playing |
| `RBAC: access denied` | Re-paste a fresh `sp_dc` from DevTools |
| Status not updating | Re-verify your Discord token in the panel |
| HTTP 429 rate limited | Enable Gateway or increase the minimum send interval |
| Musixmatch not working | Known bot-detection issue — set LrcLib as primary fallback in source order |
| Source changes have no effect | Restart the app after reordering or toggling sources |
| Dealer mode not connecting | Ensure `sp_dc` is set; check `log.txt` for auth errors |

---

## Disclaimer

Provided "AS IS" with no warranty. The original author and this fork's maintainer accept no responsibility for consequences of use, including Discord account actions.