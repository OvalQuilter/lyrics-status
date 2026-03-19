> **This is a fork of [OvalQuilter/lyrics-status](https://github.com/OvalQuilter/lyrics-status).**
> The purpose of this fork is to refactor and improve several core functions — including rate limit handling, lyric line merging, smart truncation, null safety, error handling, and the terminal display. See [CHANGELOG.txt](CHANGELOG.txt) for a full breakdown of changes.

FORK COMPARISON — RamenFighter03 vs OvalQuilter/lyrics-status (v3)
====================================================================
Base: OvalQuilter/lyrics-status @ v3 (v3.0.7)
Fork: RamenFighter03/lyrics-status @ v3
Date: March 2026

This document is based on a direct git diff between the two branches.
17 files changed, 1515 insertions, 1025 deletions.

────────────────────────────────────────────────────────────────────
1. DISCORD RATE LIMIT PROTECTION — NEW
   Files: dist/StatusChanger.js, src/StatusChanger.ts

   Original: no throttling. The app sent a status update on every
   qualifying lyric tick with no rate limit handling whatsoever.
   Result: frequent HTTP 429 errors with no recovery.

   Fork adds three layers:

   Auto backoff — on HTTP 429, reads retry_after from the response
   and blocks all sends until that timestamp elapses. Falls back to
   30s if the body can't be parsed. Toggle: enableBackoff.

   Minimum send interval — configurable floor (default 5000ms)
   between any two Discord sends. Toggle: enableMinInterval /
   minIntervalMs.

   Song boundary protection — songChanged() unconditionally resets
   _lastSentAt so the interval still applies on the first send of
   every new song.

────────────────────────────────────────────────────────────────────
2. LYRIC LINE MERGING — NEW
   Files: dist/StatusChanger.js, src/StatusChanger.ts

   Original: one line per send, no grouping.

   Fork: consecutive lines whose gaps are within a configurable
   window are joined into a single status update. Reduces total
   API calls on fast songs and produces more natural-reading
   statuses. Toggle: enableMergeLines / mergeWindowMs.

────────────────────────────────────────────────────────────────────
3. SMART TRUNCATION — CHANGED
   Files: dist/StatusChanger.js, src/StatusChanger.ts

   Original: hard .slice(0, 128) which broke mid-word.

   Fork replaces this with smartTruncate():
   - Phase 1: drops whole merged lyric lines from the end
   - Phase 2: word-boundary chop with "..."
   - Phase 3: hard cut only for single overlong words
   - Guards against null/undefined input

────────────────────────────────────────────────────────────────────
4. BUG FIX — LYRICS RE-FETCH LOOP — FIXED
   File: dist/LyricsFetcher.js

   Original bug: lastFetchedFor was only set on live-source fetches,
   not cache hits. Caused lyrics to re-fetch from cache on every
   5s Spotify poll tick.

   Fix: lastFetchedFor is now set on the cache hit path.

────────────────────────────────────────────────────────────────────
5. NULL SAFETY — IMPROVED
   Files: dist/StatusChanger.js, dist/PlaybackStateUpdater.js,
          dist/index.js, src/StatusChanger.ts,
          src/PlaybackStateUpdater.ts

   StatusChanger: songName/songAuthor default to "" in applyTemplate,
   smartTruncate returns "" on null, buildMergedLines anchor.text
   defaults to "", parseStatusString fully null-coalesced.

   PlaybackStateUpdater: json.item null guard added (podcasts and
   local files return a null item — previously crashed). artists[0]
   access uses optional chaining with "Unknown" fallback.

   index.js: optional chaining on rateLimit settings fields to
   prevent crashes if settings.json is missing the block.

────────────────────────────────────────────────────────────────────
6. AUTOOFFSET NULL GUARD — FIXED
   File: dist/Autooffset.js

   Original: getAverageValue() divided by keys.length with no
   guard, returning NaN when the array was empty. NaN then
   propagated into the offset calculation silently.

   Fork: returns 0 immediately if keys is empty.

────────────────────────────────────────────────────────────────────
7. RATE LIMIT SETTINGS IN PANEL — NEW
   Files: dist/Settings.js, dist/Panel/Server.js, src/Settings.ts,
          src/Panel/Server.ts, static/index.html, static/panel.js

   New rateLimit block in settings with five fields:
     enableBackoff, enableMinInterval, minIntervalMs,
     enableMergeLines, mergeWindowMs

   Persisted in settings.json, synced through the WebSocket in
   Server.js, and exposed in the web panel as a new Rate Limiting
   section with checkboxes and number inputs.

   Settings.ts load() now uses spread merge
   ({ ...defaults, ...loaded }) so a partial rateLimit object in
   settings.json doesn't silently discard missing keys.

────────────────────────────────────────────────────────────────────
8. SERVER ROBUSTNESS — IMPROVED
   Files: dist/Panel/Server.js, src/Panel/Server.ts

   Three fixes applied to the WebSocket server:

   - JSON.parse wrapped in try/catch — a malformed panel payload
     previously threw an uncaught exception that reached the
     process-level error handler and could crash the app.

   - Per-connection error handler added — a single bad WebSocket
     client previously had no error handler, meaning an ECONNRESET
     or similar error was unhandled.

   - readyState check before sending initial settings payload —
     guards against the edge case where the connection closes in
     the same tick it opens.

   - SpotifyService.exchange() failure in the OAuth callback is
     now caught and logged instead of being swallowed silently.

────────────────────────────────────────────────────────────────────
9. TERMINAL DISPLAY — REWRITTEN
   File: dist/index.js

   Original: console.clear() inside a 60fps setInterval caused
   severe scroll-spam in Git Bash on Windows. Display showed only
   song name, author, progress, and last sent lyric (frozen at
   last Discord send, not real time).

   Fork uses two separate intervals:
   - 60fps: changeStatus() and songProgress only, no rendering
   - 1s: ANSI ESC[H + ESC[K overwrites lines in place, zero scroll

   New display: song/artist/progress/state, lyrics source,
   real-time current lyric, next lyric countdown, last sent status,
   send readiness with live countdown, rate limit settings values.

────────────────────────────────────────────────────────────────────
10. PANEL & UI — REWRITTEN
    Files: static/index.html, static/panel.js

    Original: all HTML was generated inside panel.js (~500 lines).
    Mojibake emoji corruption and UTF-8 BOM present in panel.js.

    Fork moves all HTML into index.html with a fully redesigned
    modern UI (DM Sans/DM Mono fonts, CSS variables, dark theme).

    panel.js rewritten to ~160 lines using a data-driven BINDINGS
    map — one entry per setting replaces 40+ individual event
    handlers. Deep path helpers (getPath/setPath) replace
    repetitive object access. BOM stripped, all emoji restored.

────────────────────────────────────────────────────────────────────
11. EXTENDED LOGGING — NEW
    Files: dist/StatusChanger.js, dist/PlaybackStateUpdater.js

    log.txt previously received only uncaught exceptions and update
    errors. Now logs: every Spotify poll and HTTP response, song
    detection, lyrics fetch result and source, every Discord send
    with HTTP response and round-trip time, rate limit events with
    retry_after, auth errors, and merged line count per send.

────────────────────────────────────────────────────────────────────
FILES CHANGED vs ORIGINAL
────────────────────────────────────────────────────────────────────
  dist/Autooffset.js          — null guard in getAverageValue()
  dist/LyricsFetcher.js       — cache hit bug fix
  dist/PlaybackStateUpdater.js — logging, null safety, item guard
  dist/StatusChanger.js       — rate limiting, merging, truncation,
                                  null safety, logging
  dist/Settings.js            — rateLimit block added
  dist/Panel/Server.js        — rateLimit, WebSocket robustness
  dist/index.js               — terminal display rewrite
  src/Autooffset.ts           — null guard synced
  src/StatusChanger.ts        — synced with dist changes
  src/Settings.ts             — rateLimit block, spread merge load
  src/Panel/Server.ts         — WebSocket robustness synced
  src/PlaybackStateUpdater.ts — null safety synced
  static/index.html           — full UI redesign
  static/panel.js             — rewrite, rate limit UI, encoding fix
  package.json                — discord-rpc dependency added
  README.md                   — fork notice added
  CHANGELOG.txt               — new file, full modification log

---

# LyricsStatus V3

## What is it?

LyricsStatus is a tool that changes your Discord status to lyrics of songs you listen to on Spotify!

It is written in TypeScript and runs on Node.js.

## Precautions

Before you proceed to [Setup](#Setup) please read those precautions.

This tool is provided "AS IS" and doesn't have any warranty that it will work on your machine.

I, creator of the LyricsStatus, am not responsible for any consequences that LyricsStatus can lead to.

By using it, you agree with the statements above.

## Setup

### Node.js

Firstly, you need to [download](https://nodejs.org/en) Node.js.

LyricsStatus needs version 17.x.x or higher.

### Downloading LyricsStatus

You can download it using Git or going to [Releases](https://github.com/OvalQuilter/lyrics-status/releases) and downloading source code archive. Then unpack it to the place you want.

For Git, use this command:

```
git clone --single-branch --branch v3 https://github.com/OvalQuilter/lyrics-status
```

### Locating to LyricsStatus

#### Windows & Linux

Copy the path to the LyricsStatus folder, often found on top of your File Explorer (`C:\Users\your_profile_name\path\to\LyricsStatus` or `/usr/name/path/to/LyricsStatus` for example).

For Windows, press `Win + R` and type `cmd`, then press `Run`.

For Linux, you need to manually open Terminal from your start menu.

In the opened window type `cd paste_path_you_copied` and press `Enter`.

### Installing modules

Now, you need to install modules. In the command prompt, run the following command:

```
npm install
```

Then wait for modules to install.

### Running and configuring

Run `npm run start` to start LyricsStatus.

Now you need to configure it. Open `localhost:8999` in your browser, you should see a menu with various settings.

First, you need to get your Discord token. [Here's](https://www.youtube.com/watch?v=LnBnm_tZlyU) a nice video on how to do it.

After getting your token you need to paste it, head back to the menu and paste it in the `Token` input field. Remove quotes if there are any.

Second, you need to get your Spotify cookies. Open [Spotify](https://open.spotify.com/) in your browser, then press `F12` or `Ctrl + Alt + I`, depending on your browser.

Head to the `Network` tab or similar, you should see something like this:

![Network Tab](res/network_tab.png)

Now reload the page, wait for it to load, and search for something like `open.spotify.com` (often it's appear on top):

![Request](res/request.png)

Click on it, in the opened window search for `Cookie:`, it's your cookies. Copy and paste them in `Cookie` input field in the menu.

Start some song in Spotify, if it has lyrics, you should see current lyrics in your command prompt as well as in your Discord status.

### Troubleshooting

#### Windows

Try running command line with administrator privileges or disabling your firewall.

#### Linux

Try running Terminal from `su` user.
