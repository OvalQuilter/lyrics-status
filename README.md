# lyrics-status — RamenFighter03 fork

> Forked from [OvalQuilter/lyrics-status](https://github.com/OvalQuilter/lyrics-status) (v3.0.7). Full credit to the original author.
> Change history: [CHANGELOG_old.txt](CHANGELOG_old.txt) (entries 1–46) · [CHANGELOG.txt](CHANGELOG.txt) (entries 47+).

![Terminal display](res/screenie.png)

Syncs your Discord custom status to live song lyrics from Spotify. Polls every 5 seconds and updates in real time. Configured through a browser panel at `localhost:8999`.

---

## What's new in this fork

| Feature | Details |
|---|---|
| **5 lyric sources** | Spotify, Musixmatch, LrcLib, NetEase, QQ Music — toggled and reordered from the panel. Falls through automatically if a source fails. |
| **Musixmatch support** | Largest synced lyrics catalog available. Token is fetched automatically — no setup required. |
| **Discord gateway** | Sends status via WebSocket (op 3) instead of REST, bypassing the ~1/3s REST rate limit entirely. |
| **Status restore** | Saves your Discord status before launch and restores it after music stops. |
| **Rate limit handling** | Auto backoff on 429s, configurable send interval, lyric line merging to reduce API calls. |
| **Smart truncation** | Drops whole lines before cutting words. Unicode and emoji safe. |
| **Song skip detection** | Detects manual skips immediately and clears stale lyric state. |
| **Template variables** | Customize the status format with `{lyrics}`, `{timestamp}`, `{source}`, `{progress}`, `{duration}`, `{line_number}`. |
| **Chinese conversion** | Optional Simplified → Traditional conversion via opencc-js. |

---

## Requirements

- [Node.js](https://nodejs.org/en) v17 or higher
- A Spotify account (free or premium)
- A Discord account

---

## Quick start

```bash
git clone --single-branch --branch v3 https://github.com/RamenFighter03/lyrics-status
cd lyrics-status
npm install
npm start
```

Once running, open **http://localhost:8999** in your browser to configure the app.

---

## Settings panel

![Settings panel](res/panel.png)

The panel lets you manage everything without touching any config files:

- Enter and verify your Discord token and Spotify cookies
- Toggle and reorder lyric sources
- Adjust rate limiting and send interval
- Enable the Discord gateway
- Manage status restore behaviour

---

## Setup guide

### 1. Discord token

Get your Discord user token ([how-to video](https://www.youtube.com/watch?v=LnBnm_tZlyU)) and paste it into the **Discord token** field in the panel. Click **Check** to verify it works.

> ⚠️ Never share your Discord token with anyone. Using user tokens is against Discord's ToS — proceed at your own risk.

---

### 2. Spotify cookies

The app needs your Spotify `sp_dc` cookie to fetch lyrics.

1. Open [open.spotify.com](https://open.spotify.com) while logged in.
2. Press `F12` → **Application** tab → **Cookies** → `https://open.spotify.com`.
3. Find the `sp_dc` cookie and copy its **value**.
4. Paste it into the **Spotify cookies** field in the panel.

![Network Tab](res/network_tab.png)
![Request](res/request.png)

---

### 3. Musixmatch (optional)

Tokens are fetched and rotated automatically — you don't need to do anything. If you want to use your own token:

1. Log in at [musixmatch.com](https://www.musixmatch.com).
2. Open DevTools → **Application** → **Cookies** → `https://www.musixmatch.com`.
3. Copy the value of `musixmatchUserToken` and paste it into the panel.

Leaving this blank is fine. The app falls through to other sources automatically.

---

### 4. Spotify OAuth (optional)

Create a [Spotify developer app](https://developer.spotify.com/dashboard) and fill in **Client ID**, **Client secret**, and **Redirect URI** in the panel. This is only needed for OAuth-based playback access — Spotify cookies alone are sufficient for lyrics.

---

### 5. Gateway (optional, recommended)

Enable **Gateway** in the panel to send status updates over Discord's WebSocket connection instead of REST. This removes the REST rate limit entirely. If the gateway disconnects, the app falls back to REST automatically.

> **Note:** Gateway status updates may not appear locally on some Discord clients (particularly certain mobile versions), which cache their own session state. The status **is** updated server-side and visible to everyone else. This is a Discord client limitation, not a bug.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| No lyrics showing | Make sure Spotify cookies are fresh and a song with lyrics is playing |
| `RBAC: access denied` | Cookies expired — re-paste a fresh `sp_dc` from DevTools |
| Discord status not updating | Re-verify your Discord token using the Check button |
| Rate limited (429) | Enable Gateway, or raise the minimum send interval in the panel |
| Panel shows a blank page | Restart the app and hard-refresh the page (`Ctrl+Shift+R`) |
| Musixmatch not working | Musixmatch uses bot-detection-prone tokens. LrcLib is the recommended fallback. |

**Windows:** If the app won't start, try running as Administrator or temporarily disabling your firewall.

**Linux:** Try running as `su`.

---

## Notes

### iOS status sync

The app includes logic (`_iOSSyncPending`, `_onGatewayReady`) that re-sends status after each song change and on gateway reconnect. This exists because Discord's iOS client caches its session state and misses gateway-only updates. If you don't use Discord on iOS, this code is harmless.

---

## Disclaimer

Provided "AS IS" with no warranty. The original author (OvalQuilter) and this fork's maintainer accept no responsibility for any consequences of use.