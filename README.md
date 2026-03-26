# lyrics-status — RamenFighter03 fork

> **Based on [OvalQuilter/lyrics-status](https://github.com/OvalQuilter/lyrics-status) (v3.0.7) — all credit to the original author.**
> This fork adds Musixmatch support, rate limit handling, smart truncation, line merging, improved terminal display, and various bug fixes. See [CHANGELOG.txt](CHANGELOG.txt) for the full breakdown.

![Terminal display](res/screenie.png)

---

## What does it do?

LyricsStatus polls Spotify every 5 seconds and updates your Discord custom status with the current synced lyric line in real time. It runs on Node.js and serves a settings panel at `localhost:8999`.

---

## What's different in this fork?

- **Musixmatch source** — the same lyrics database Spotify uses internally, now available as a fallback source with the widest catalog of any provider
- **Per-source toggles** — enable or disable Spotify, Musixmatch, LrcLib, NetEase, and QQ Music individually from the panel
- **Rate limit handling** — automatic backoff on Discord 429s, configurable minimum send interval, and lyric line merging to reduce total API calls
- **Smart truncation** — drops whole lines before chopping words; Unicode/emoji safe (code point aware, not byte length)
- **Song skip detection** — manual skips are detected immediately, clearing stale lyric state for the new song
- **Improved terminal display** — flicker-free, overwrites in place, shows current/next lyric, rate limit status, and send countdown
- **Null safety** — guards against missing artists, song metadata, and malformed Spotify responses

---

## Requirements

- [Node.js](https://nodejs.org/en) v17 or higher
- A Spotify account (free or premium)
- A Discord account

---

## Installation

**1. Clone this fork**

```bash
git clone --single-branch --branch v3 https://github.com/RamenFighter03/lyrics-status
cd lyrics-status
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the app**

```bash
npm start
```

Then open `http://localhost:8999` in your browser to configure it.

---

## Configuration

### Discord token

You need your Discord user token. [This video](https://www.youtube.com/watch?v=LnBnm_tZlyU) shows how to get it. Paste it into the **Discord token** field and click **Check** to verify.

> ⚠️ Never share your Discord token with anyone.

### Spotify cookies

1. Open [open.spotify.com](https://open.spotify.com) in your browser and make sure you're logged in.
2. Press `F12` to open DevTools and go to the **Network** tab.
3. Reload the page, then click on any request to `open.spotify.com`.
4. Find the `Cookie:` header in the request headers and copy the entire value.
5. Paste it into the **Spotify cookies** field in the panel.

![Network Tab](res/network_tab.png)
![Request](res/request.png)

### Musixmatch (optional, recommended)

Musixmatch has the widest synced lyrics catalog of any source — including songs that Spotify itself doesn't show lyrics for.

1. Go to [musixmatch.com](https://www.musixmatch.com) and log in or create a free account.
2. Open DevTools (`F12`) → **Application** tab → **Cookies** → `https://www.musixmatch.com`.
3. Find `musixmatchUserToken`, double-click its Value column and copy the whole string.
4. Paste it into the **Musixmatch token** field in the panel — the token is extracted automatically.
5. Click **Check** to verify it works.

Leaving this blank is fine — the app will fall through to LrcLib, NetEase, and QQ Music automatically.

### Spotify OAuth (optional)

Filling in a **Client ID**, **Client secret**, and **Redirect URI** from a [Spotify developer app](https://developer.spotify.com/dashboard) enables OAuth-based playback access. This is optional — cookies alone are sufficient for lyrics fetching.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Panel shows blank page | Restart the app and hard-refresh (`Ctrl+Shift+R`) |
| No lyrics showing | Check that Spotify cookies are fresh and a song with lyrics is playing |
| Spotify source "RBAC: access denied" | Cookies have expired — re-paste fresh ones from DevTools |
| Discord status not updating | Verify your Discord token is correct using the Check button |
| Rate limited by Discord | Raise the minimum interval in the panel's Rate Limiting section |

#### Windows
If the app won't start, try running the command prompt as Administrator or temporarily disabling your firewall.

#### Linux
Try running the terminal as `su`.

---

## Precautions

This tool is provided "AS IS" with no warranty. The original author (OvalQuilter) and this fork's maintainer are not responsible for any consequences arising from its use. By using it you accept this.

> ⚠️ Use of Discord user tokens is against Discord's Terms of Service. Proceed at your own risk.
