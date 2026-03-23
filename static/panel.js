// ── Settings schema & defaults ────────────────────────────────────────────────
const DEFAULTS = {
    credentials: {
        token: "", cookies: "", musixmatchToken: "", clientID: "", clientSecret: "",
        useExternalAuthServer: false, code: "", refreshToken: "",
        uuid: "", customRedirectUri: ""
    },
    view: {
        timestamp: true, label: true,
        advanced: { enabled: false, customEmoji: "\uD83C\uDFB6", customStatus: "[{timestamp}] Song lyrics - {lyrics}" }
    },
    timings:  { sendTimeOffset: 500, enableAutooffset: true, autooffset: 3 },
    update:   { enableAutoupdate: true },
    rateLimit:{ enableBackoff: true, enableMinInterval: true, minIntervalMs: 5000, enableMergeLines: true, mergeWindowMs: 8000 },
    sources:  { enableSpotify: true, enableMusixmatch: true, enableLrcLib: true, enableNetEase: true, enableQQMusic: true }
};

// ── Binding map: [ selector, settings path, type ] ───────────────────────────
// type: "text" | "checkbox" | "number" | "textarea"
const BINDINGS = [
    ["#user-token",              "credentials.token",                   "text"],
    ["#client-id",               "credentials.clientID",                "text"],
    ["#client-secret",           "credentials.clientSecret",            "text"],
    ["#custom-redirect-uri",     "credentials.customRedirectUri",       "text"],
    ["#use-external-auth-server","credentials.useExternalAuthServer",   "checkbox"],
    ["#musixmatch-token",        "credentials.musixmatchToken",         "text"],
    ["#enable-timestamp",        "view.timestamp",                      "checkbox"],
    ["#enable-label",            "view.label",                          "checkbox"],
    ["#enable-advanced-swt",     "view.advanced.enabled",               "checkbox"],
    ["#custom-emoji",            "view.advanced.customEmoji",           "text"],
    ["#custom-status",           "view.advanced.customStatus",          "textarea"],
    ["#send-time-offset",        "timings.sendTimeOffset",              "text"],
    ["#enable-autooffset",       "timings.enableAutooffset",            "checkbox"],
    ["#autooffset",              "timings.autooffset",                  "text"],
    ["#enable-autoupdate",       "update.enableAutoupdate",             "checkbox"],
    ["#enable-backoff",          "rateLimit.enableBackoff",             "checkbox"],
    ["#enable-min-interval",     "rateLimit.enableMinInterval",         "checkbox"],
    ["#min-interval-ms",         "rateLimit.minIntervalMs",             "number"],
    ["#enable-merge-lines",      "rateLimit.enableMergeLines",          "checkbox"],
    ["#merge-window-ms",         "rateLimit.mergeWindowMs",             "number"],
    ["#enable-spotify",          "sources.enableSpotify",               "checkbox"],
    ["#enable-musixmatch",       "sources.enableMusixmatch",            "checkbox"],
    ["#enable-lrclib",           "sources.enableLrcLib",                "checkbox"],
    ["#enable-netease",          "sources.enableNetEase",               "checkbox"],
    ["#enable-qqmusic",          "sources.enableQQMusic",               "checkbox"],
];

// ── Help text map ─────────────────────────────────────────────────────────────
const HELP = {
    "#send-time-offset-help": `
        <strong>Send time offset</strong> shifts status changes earlier to feel more in sync with the lyrics.<br><br>
        If you don't have Spotify Premium, try <em>-200</em> — third-party lyrics can arrive ahead of playback.<br>
        Value is in milliseconds. Default: 500.`,
    "#autooffset-help": `
        <strong>Autooffset</strong> measures the average round-trip delay to Discord and adjusts the offset automatically,
        using the number of samples you set.`,
    "#custom-emoji-help": `
        <strong>Custom emoji</strong> adds a Unicode emoji before your status.<br>
        Get one from <a href="https://www.piliapp.com/emoji/list/" target="_blank" style="color:var(--accent)">piliapp.com</a>.`,
    "#custom-status-help": `
        <strong>Template variables:</strong><br>
        <code>{lyrics}</code>, <code>{lyrics_upper}</code>, <code>{lyrics_lower}</code>, <code>{lyrics_letters_only}</code><br>
        <code>{song_name}</code>, <code>{song_name_cropped}</code>, <code>{song_author}</code>, <code>{timestamp}</code><br><br>
        Status is automatically cropped to 128 characters.`,
    "#musixmatch-token-help": `
        <strong>Musixmatch user token</strong> is required to fetch lyrics from Musixmatch.<br><br>
        To get it:<br>
        1. Go to <a href="https://www.musixmatch.com" target="_blank" style="color:var(--accent)">musixmatch.com</a> and log in.<br>
        2. Open DevTools (F12) &rarr; Network tab &rarr; reload the page.<br>
        3. Click any request to <code>apic-desktop.musixmatch.com</code>.<br>
        4. In the Cookie header, copy the value of <code>x-mxm-token-guid</code>.<br><br>
        Musixmatch is the database that powers Spotify's own lyrics &mdash; it has the widest coverage.`,
};

// ── Deep path helpers ─────────────────────────────────────────────────────────
function getPath(obj, path) {
    return path.split(".").reduce((o, k) => (o != null ? o[k] : undefined), obj);
}
function setPath(obj, path, val) {
    const keys = path.split(".");
    const last = keys.pop();
    const target = keys.reduce((o, k) => (o != null ? o[k] : null), obj);
    if (target != null) target[last] = val;
}

// ── State ─────────────────────────────────────────────────────────────────────
let settings = $.extend(true, {}, DEFAULTS);
let loaded   = false;

// ── WebSocket with auto-reconnect ─────────────────────────────────────────────
let ws = null;
let _pendingSave = false;

function connectWS() {
    ws = new WebSocket("ws://localhost:8999/ws");
    ws.onmessage = ({ data }) => {
        try {
            settings = $.extend(true, {}, DEFAULTS, JSON.parse(data));
            applyToDom();
            if (_pendingSave) { _pendingSave = false; save(); }
        } catch (e) { console.error("Failed to load settings:", e); }
    };
    ws.onerror = (e) => console.error("WebSocket error:", e);
    ws.onclose = () => { setTimeout(connectWS, 2000); };
}
connectWS();

// ── Save ──────────────────────────────────────────────────────────────────────
function save() {
    if (!loaded) return console.warn("Settings not yet loaded - save skipped.");
    if (!ws || ws.readyState !== WebSocket.OPEN) { _pendingSave = true; return; }
    try { ws.send(JSON.stringify(settings)); }
    catch (e) { console.error("ws.send failed:", e); _pendingSave = true; }
}

// ── Preview ───────────────────────────────────────────────────────────────────
function fmtTime(ms) {
    const s = Math.round(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
function updatePreview() {
    const { timestamp, label } = settings.view;
    $("#status-preview").text(
        `${timestamp ? `[${fmtTime(137000)}] ` : ""}${label ? "Song lyrics - " : ""}La-la-la`
    );
}

// ── Load settings into DOM ────────────────────────────────────────────────────
function applyToDom() {
    try {
        for (const [sel, path, type] of BINDINGS) {
            const el  = $(sel);
            const val = getPath(settings, path);
            if (val == null) continue;
            if (type === "checkbox") el.prop("checked", !!val);
            else                     el.val(val);
        }
        const adv = settings.view.advanced.enabled;
        $("#advanced-swt").toggleClass("show", adv);
        $("#enable-timestamp, #enable-label").prop("disabled", adv);
        const ok = !!(settings.credentials?.refreshToken || settings.credentials?.code);
        $("#spotify-ok").toggleClass("show", ok);
        updatePreview();
    } catch (e) { console.error("applyToDom error:", e); }
    finally { loaded = true; }
}

// ── Attach data-driven events ─────────────────────────────────────────────────
function bindAll() {
    for (const [sel, path, type] of BINDINGS) {
        const el = $(sel);
        if (type === "checkbox") {
            el.on("change", () => {
                setPath(settings, path, el.prop("checked"));
                if (sel === "#enable-advanced-swt") {
                    const on = el.prop("checked");
                    $("#advanced-swt").toggleClass("show", on);
                    $("#enable-timestamp, #enable-label").prop("disabled", on);
                }
                if (sel === "#enable-timestamp" || sel === "#enable-label") updatePreview();
                save();
            });
        } else if (type === "number") {
            el.on("input", () => {
                const v = parseFloat(el.val());
                if (!isNaN(v) && v >= 0) { setPath(settings, path, v); save(); }
            });
        } else {
            const evt = type === "textarea" ? "input" : "change";
            el.on(evt, () => {
                let v = el.val();
                if (sel === "#user-token") v = v.replace(/"/g, "");
                if (sel === "#send-time-offset") {
                    const n = parseFloat(v);
                    el.toggleClass("invalid", isNaN(n));
                    if (isNaN(n)) return;
                    v = n;
                }
                setPath(settings, path, v);
                save();
            });
        }
    }
}

// ── Help modal ────────────────────────────────────────────────────────────────
function showModal(title, html) {
    const m = $(`
        <div class="modal-overlay">
            <div class="modal-box">
                <div class="modal-header">
                    <span>${title}</span>
                    <span class="modal-close">&#x2715;</span>
                </div>
                <div class="modal-body">${html}</div>
            </div>
        </div>`);
    m.on("click", function(e) { if (e.target === this) m.remove(); });
    m.find(".modal-close").on("click", () => m.remove());
    m.appendTo(document.body);
}
function bindHelp() {
    for (const [sel, html] of Object.entries(HELP)) {
        const title = sel.replace(/^#/, "").replace(/-help$/, "").replace(/-/g, " ");
        $(sel).on("click", () => showModal(title, html));
    }
}

// ── Check token ───────────────────────────────────────────────────────────────
$("#check-token").on("click", function () {
    const btn = $(this), orig = btn.text();
    btn.prop("disabled", true).text("...");
    let ok = true;
    $.ajax({
        url: "https://discordapp.com/api/v8/users/@me",
        headers: { Authorization: settings.credentials.token },
        async: true,
        statusCode: { 401: () => { ok = false; } },
        error: () => { ok = false; },
        complete: () => {
            btn.prop("disabled", false).removeClass("success danger")
               .addClass(ok ? "success" : "danger").text(ok ? "\u2713" : "\u2717");
            setTimeout(() => btn.removeClass("success danger").text(orig), 3000);
        }
    });
});

// ── Authorize Spotify ─────────────────────────────────────────────────────────
$("#btn-authorize").on("click", () => {
    const { clientID, customRedirectUri, uuid, useExternalAuthServer } = settings.credentials;
    const url = useExternalAuthServer
        ? `https://rocky-quintessential-island.glitch.me/login/${uuid}`
        : `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(clientID)}&response_type=code&redirect_uri=${encodeURIComponent(customRedirectUri)}&scope=${encodeURIComponent("user-read-playback-state user-read-currently-playing")}`;
    window.open(url, "_blank");
});

// ── Init ──────────────────────────────────────────────────────────────────────
$(document).ready(() => { bindAll(); bindHelp(); });
