# LyricsStatus V3

## What is it?

LyricsStatus is a tool that changes your Discord custom status to the synced lyrics of the song you're currently listening to on Spotify.

It is written in TypeScript and runs on Node.js. No Spotify developer account, no OAuth setup, no cookies — just your Discord token.

## How it works

LyricsStatus fetches your current Spotify playback state using the Spotify access token that Discord already holds internally (from your connected Spotify account). It then fetches synced lyrics from free sources and updates your Discord custom status line by line in real time.

## Precautions

This tool is provided "AS IS" without any warranty that it will work on your machine.

The creator of LyricsStatus is not responsible for any consequences that may arise from its use.

By using it, you agree with the statements above.

## Requirements

- [Node.js](https://nodejs.org/en) v17 or higher
- A Discord account with **Spotify connected** (Settings → Connections)
- Spotify playing on any device

## Setup

### 1. Download

Clone the repo or download the source archive from [Releases](https://github.com/OvalQuilter/lyrics-status/releases):

```
git clone https://github.com/OvalQuilter/lyrics-status
```

### 2. Install dependencies

```
npm install
```

### 3. Build

```
npm run build
```

### 4. Run

```
npm start
```

### 5. Configure

Open `http://localhost:8999` in your browser. You'll see the settings panel.

**Discord token** — the only credential you need. Here's [a video](https://www.youtube.com/watch?v=LnBnm_tZlyU) showing how to get it. Paste it into the Discord token field and click Check to verify it works.

That's it. Play a song on Spotify and your Discord status will start updating with synced lyrics within a few seconds.

## Settings

| Setting | Description |
|---|---|
| Discord token | Your Discord user token. Used to read your Spotify connection and update your status. |
| Show playback timestamp | Prepends `[m:ss]` to the status text. |
| Show label | Prepends `Song lyrics -` to the status text. |
| Custom status template | Advanced mode — build your own status string using placeholders (see below). |
| Send time offset | How many ms ahead of the lyric timestamp to send the status update. Default 500. |
| Autooffset | Automatically calculates the offset based on Discord API response times. |

### Custom status placeholders

`{lyrics}`, `{lyrics_upper}`, `{lyrics_lower}`, `{lyrics_letters_only}`  
`{song_name}`, `{song_name_cropped}`, `{song_name_upper}`, `{song_name_lower}`  
`{song_author}`, `{song_author_upper}`, `{song_author_lower}`  
`{timestamp}`

Status text is automatically cropped to 128 characters (Discord's limit).

## Lyrics sources

Lyrics are fetched in this order, falling back to the next if one fails:

1. **LrcLib** — best coverage for synced LRC lyrics
2. **NetEase Music** — large catalogue, good for non-English tracks
3. **QQ Music** — last resort fallback

Fetched lyrics are cached locally in `./cache/` to avoid redundant requests.

## Troubleshooting

**Status not updating** — make sure Spotify is connected to your Discord account under Settings → Connections, and that you have a song actively playing (not paused).

**Token invalid** — use the Check button in the settings panel to verify your Discord token is correct.

**No lyrics found** — the song may not be in any of the lyrics databases, or only has unsynced lyrics. LyricsStatus requires time-synced lyrics to work.

**Windows** — try running the command prompt with administrator privileges or temporarily disabling your firewall.

**Linux** — try running the terminal as root if you hit permission issues.
