// panel-data.js — constants only

const DEFAULTS = {
    credentials: { token:"", cookies:"", musixmatchToken:"", clientID:"", clientSecret:"", useExternalAuthServer:false, code:"", refreshToken:"", uuid:"", customRedirectUri:"", spotifyWebToken:"", useDealer:true },
    view: { timestamp:true, label:true, advanced:{ enabled:false, customEmoji:"\uD83C\uDFB6", customStatus:"[{timestamp}] Song lyrics - {lyrics}", unicodeStyle:"none", styleAlternateEnabled:false, styleAlternateIntervalMs:3000 } },
    timings:   { sendTimeOffset:500, enableAutooffset:true, autooffset:3 },
    update:    { enableAutoupdate:true },
    rateLimit: { enableBackoff:true, enableMinInterval:true, minIntervalMs:5000, enableMergeLines:true, mergeWindowMs:8000, mergeSeparator:" " },
    sources:   { enableSpotify:true, enableMusixmatch:true, enableLrcLib:true, enableNetEase:true, enableQQMusic:true, enableGenius:true, sourceOrder:["Spotify","Musixmatch","LrcLib","NetEase","QQMusic","Genius"] },
    cache: { path:"", lyricsTtlDays:30, emptyTtlDays:7, errorTtlHours:1, maxRows:2000 },
    chineseConversion: "off",
    restore: { enabled:true, savedStatus:null, delayMs:15000 },
    gateway: { enabled:false, presenceStatus:"online", minGwIntervalMs:5000, clearAfterLastLineMs:3000 },
    statusFlash: { enabled:false, states:["online","idle","dnd"], intervalMs:500, restoreStatus:null },
    richPresence: { enabled:false, appName:"Spotify", showAlbumArt:true, albumArtUrl:"", showProgressBar:true, buttonLabel:"", buttonUrl:"", detailsTemplate:"{lyrics}", stateTemplate:"{song_author}" },
};

const BINDINGS = [
    ["#user-token",              "credentials.token",                 "text"],
    ["#spotify-cookies",         "credentials.cookies",               "text"],
    ["#spotify-web-token",       "credentials.spotifyWebToken",       "text"],
    ["#client-id",               "credentials.clientID",              "text"],
    ["#client-secret",           "credentials.clientSecret",          "text"],
    ["#custom-redirect-uri",     "credentials.customRedirectUri",     "text"],
    ["#use-external-auth-server","credentials.useExternalAuthServer", "checkbox"],
    ["#enable-timestamp",        "view.timestamp",                    "checkbox"],
    ["#enable-label",            "view.label",                        "checkbox"],
    ["#enable-advanced-swt",     "view.advanced.enabled",             "checkbox"],
    ["#custom-emoji",            "view.advanced.customEmoji",         "text"],
    ["#custom-status",           "view.advanced.customStatus",        "textarea"],
    ["#unicode-style",           "view.advanced.unicodeStyle",        "select"],
    ["#style-alternate-enabled", "view.advanced.styleAlternateEnabled",    "checkbox"],
    ["#style-alternate-interval","view.advanced.styleAlternateIntervalMs", "number"],
    ["#send-time-offset",        "timings.sendTimeOffset",            "number"],
    ["#enable-autooffset",       "timings.enableAutooffset",          "checkbox"],
    ["#autooffset",              "timings.autooffset",                "number"],
    ["#enable-autoupdate",       "update.enableAutoupdate",           "checkbox"],
    ["#enable-backoff",          "rateLimit.enableBackoff",           "checkbox"],
    ["#enable-min-interval",     "rateLimit.enableMinInterval",       "checkbox"],
    ["#min-interval-ms",         "rateLimit.minIntervalMs",           "number"],
    ["#enable-merge-lines",      "rateLimit.enableMergeLines",        "checkbox"],
    ["#merge-window-ms",         "rateLimit.mergeWindowMs",           "number"],
    ["#merge-separator",          "rateLimit.mergeSeparator",          "text"],
    ["#chinese-conversion",      "chineseConversion",                 "select"],
    ["#restore-enabled",         "restore.enabled",                   "checkbox"],
    ["#restore-delay-ms",        "restore.delayMs",                   "number"],
    ["#gateway-enabled",         "gateway.enabled",                   "checkbox"],
    ["#gw-min-interval-ms",      "gateway.minGwIntervalMs",           "number"],
    ["#flash-enabled",           "statusFlash.enabled",               "checkbox"],
    ["#flash-interval-ms",       "statusFlash.intervalMs",            "number"],
    // Rich Presence
    ["#rp-enabled",              "richPresence.enabled",              "checkbox"],
    ["#rp-app-name",             "richPresence.appName",              "text"],
    ["#rp-details-template",     "richPresence.detailsTemplate",      "textarea"],
    ["#rp-state-template",       "richPresence.stateTemplate",        "text"],
    ["#rp-show-album-art",       "richPresence.showAlbumArt",         "checkbox"],
    ["#rp-album-art-url",        "richPresence.albumArtUrl",          "text"],
    ["#rp-show-progress-bar",    "richPresence.showProgressBar",      "checkbox"],
    ["#rp-button-label",         "richPresence.buttonLabel",          "text"],
    ["#rp-button-url",           "richPresence.buttonUrl",            "text"],
    // Gateway
    ["#gw-clear-last-line-ms",   "gateway.clearAfterLastLineMs",      "number"],
    // Credentials
    ["#use-dealer",              "credentials.useDealer",             "checkbox"],
    ["#musixmatch-token",        "credentials.musixmatchToken",       "text"],
    // Flash
    ["#flash-restore-status",    "statusFlash.restoreStatus",         "select"],
    // Cache
    ["#cache-lyrics-ttl",        "cache.lyricsTtlDays",               "number"],
    ["#cache-empty-ttl",         "cache.emptyTtlDays",                "number"],
    ["#cache-error-ttl",         "cache.errorTtlHours",               "number"],
    ["#cache-max-rows",          "cache.maxRows",                     "number"],
    ["#cache-path",              "cache.path",                        "text"],
];

const SOURCE_META = {
    Spotify:    { key:"enableSpotify",    desc:"requires cookies",          badge:"Official" },
    Musixmatch: { key:"enableMusixmatch", desc:"auto token via SyncLyrics", badge:"Auto" },
    LrcLib:     { key:"enableLrcLib",     desc:"no key required",           badge:"Free" },
    NetEase:    { key:"enableNetEase",    desc:"strong Asian coverage",     badge:"CN" },
    QQMusic:    { key:"enableQQMusic",    desc:"strong Chinese coverage",   badge:"CN" },
    Genius:     { key:"enableGenius",     desc:"scraped plain lyrics, no timestamps", badge:"EN" }
};

const HELP = {
    "#send-time-offset-help": {
        title: "Send time offset",
        html: `Shifts status changes earlier to feel more in sync.<br><br>Try <strong>-200</strong> without Spotify Premium. Default: <code>500</code> ms.`
    },
    "#autooffset-help": {
        title: "Autooffset",
        html: `Measures round-trip delay to Discord and adjusts the send offset automatically over time.`
    },
    "#custom-emoji-help": {
        title: "Custom emoji",
        html: `Paste any emoji. Get one from <a href="https://www.piliapp.com/emoji/list/" target="_blank">piliapp.com</a>.`
    },
    "#custom-status-help": {
        title: "Template variables",
        html: `<table class="help-table">
<tr><th>Variable</th><th>Value</th></tr>
<tr><td><code>{lyrics}</code></td><td>Current lyric line(s)</td></tr>
<tr><td><code>{timestamp}</code></td><td>Line time (MM:SS)</td></tr>
<tr><td><code>{song_name}</code></td><td>Song title</td></tr>
<tr><td><code>{song_author}</code></td><td>Primary artist</td></tr>
<tr><td><code>{source}</code></td><td>Source name (e.g. LrcLib)</td></tr>
<tr><td><code>{progress}</code></td><td>Playback position (MM:SS)</td></tr>
<tr><td><code>{duration}</code></td><td>Song length (MM:SS)</td></tr>
<tr><td><code>{line_number}</code></td><td>Line index (e.g. 12/47)</td></tr>
</table>
<br><strong>Modifiers</strong> \u2014 append to any variable:<br><br>
<code>_upper</code> &nbsp;<code>_lower</code> &nbsp;<code>_title_case</code> &nbsp;<code>_letters_only</code> &nbsp;<code>_cropped</code><br><br>
Example: <code>{lyrics_title_case}</code>, <code>{song_name_cropped}</code><br><br>
Cropped to <strong>128 Unicode code points</strong>.`
    },
    "#gateway-help": {
        title: "Gateway mode",
        html: `Sends status updates via Discord WebSocket (op&nbsp;3) instead of REST PATCH. Bypasses HTTP 429 rate limits entirely.<br><br>To keep iOS in sync, two background REST calls are made automatically: once per song change (on the first successful op&nbsp;3 send), and once after each gateway reconnect. Both are debounced and fire silently &mdash; no extra rate limit impact.<br><br>Disable if your status stops showing on desktop.`
    },
    "#flash-help": {
        title: "Status flash",
        html: `Cycles your Discord presence orb color (\uD83D\uDFE2 online / \uD83C\uDF19 idle / \u26D4 dnd) on an interval while lyrics are playing.<br><br>Select which states to include in the cycle using the buttons. At least one must be selected.<br><br><strong>Interval:</strong> minimum ~300&nbsp;ms. Below that Discord clients may not visually update fast enough to see the effect. 400&ndash;600&nbsp;ms is a good range.<br><br><strong>Restore status:</strong> when playback stops, presence returns to this value. Defaults to your gateway presence setting.<br><br>Works via Gateway (op&nbsp;3) when connected, or REST as fallback. Gateway flash sends bypass the 5/20&nbsp;s rate-limit tracker.`
    },
    "#rp-help": {
        title: "Rich Presence",
        html: `Shows lyrics as a Discord rich presence activity (type 2 &ldquo;Listening to&rdquo;).<br><br>Requires <strong>Gateway</strong> to be enabled &mdash; rich presence is not possible via REST.<br><br>Uses the same template variables as the custom status field. <strong>Details</strong> maps to the top line; <strong>State</strong> maps to the artist/subtitle line.<br><br>The progress bar is derived from song start/end timestamps. Album art is fetched from Spotify&rsquo;s CDN automatically.`
    },
};

const SECTION_DEFS = [
    ["\uD83D\uDD11", "Authentication",   "Discord and Spotify credentials, stored locally.",                "auth",    true],
    ["\uD83C\uDFA4", "Status Display",   "What appears in your Discord status, timing, and rate limiting.", "display", true],
    ["\u26A1",       "Gateway",          "WebSocket updates, status flash, and rich presence.",             "gateway", false],
    ["\u267B",       "Restore & Sources","Status restore, lyrics sources, cache, and updates.",             "restore", false],
];

// BUG 4 fix: child spans use pointer-events:none (see index.html CSS or inline on li render)
// Dedup: single base array, RESTORE prepends the empty "use gateway" option
const BASE_STATUS_OPTIONS = [
    { value:"online",    label:"\uD83D\uDFE2 Online" },
    { value:"idle",      label:"\uD83C\uDF19 Idle" },
    { value:"dnd",       label:"\u26D4 Do Not Disturb" },
    { value:"invisible", label:"\u26AB Invisible" },
];
const FLASH_STATE_OPTIONS   = BASE_STATUS_OPTIONS;
const RESTORE_STATUS_OPTIONS = [{ value:"", label:"Use gateway setting" }, ...BASE_STATUS_OPTIONS];

const PRESENCE_OPTIONS = [
    { value:"online",    label:"\uD83D\uDFE2 Online",      color:"var(--green)"  },
    { value:"idle",      label:"\uD83C\uDF19 Idle",         color:"var(--amber)"  },
    { value:"dnd",       label:"\u26D4 Do Not Disturb",     color:"var(--red)"    },
    { value:"mobile",    label:"\uD83D\uDCF1 Fake Mobile",  color:"var(--accent)" },
    { value:"invisible", label:"\u26AB Invisible",          color:"var(--muted)"  },
    { value:"off",       label:"\u23F8 Don't Override",  color:"var(--text-soft)" },
];
