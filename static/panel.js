const DEFAULTS = {
    credentials: { token:"", cookies:"", musixmatchToken:"", clientID:"", clientSecret:"", useExternalAuthServer:false, code:"", refreshToken:"", uuid:"", customRedirectUri:"" },
    view: { timestamp:true, label:true, advanced:{ enabled:false, customEmoji:"\uD83C\uDFB6", customStatus:"[{timestamp}] Song lyrics - {lyrics}" } },
    timings:   { sendTimeOffset:500, enableAutooffset:true, autooffset:3 },
    update:    { enableAutoupdate:true },
    rateLimit: { enableBackoff:true, enableMinInterval:true, minIntervalMs:5000, enableMergeLines:true, mergeWindowMs:8000 },
    sources:   { enableSpotify:true, enableMusixmatch:true, enableLrcLib:true, enableNetEase:true, enableQQMusic:true, sourceOrder:["Spotify","Musixmatch","LrcLib","NetEase","QQMusic"] },
    chineseConversion: "off",
    restore: { enabled:true, savedStatus:null, delayMs:15000 },
    gateway: { enabled:false, presenceStatus:"online" }
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
    ["#send-time-offset",        "timings.sendTimeOffset",            "number"],
    ["#enable-autooffset",       "timings.enableAutooffset",          "checkbox"],
    ["#autooffset",              "timings.autooffset",                "number"],
    ["#enable-autoupdate",       "update.enableAutoupdate",           "checkbox"],
    ["#enable-backoff",          "rateLimit.enableBackoff",           "checkbox"],
    ["#enable-min-interval",     "rateLimit.enableMinInterval",       "checkbox"],
    ["#min-interval-ms",         "rateLimit.minIntervalMs",           "number"],
    ["#enable-merge-lines",      "rateLimit.enableMergeLines",        "checkbox"],
    ["#merge-window-ms",         "rateLimit.mergeWindowMs",           "number"],
    ["#chinese-conversion",      "chineseConversion",                 "select"],
    ["#restore-enabled",         "restore.enabled",                   "checkbox"],
    ["#restore-delay-ms",        "restore.delayMs",                   "number"],
    ["#gateway-enabled",         "gateway.enabled",                   "checkbox"],
];

const SOURCE_META = {
    Spotify:    { key:"enableSpotify",    desc:"requires cookies",          badge:"Official" },
    Musixmatch: { key:"enableMusixmatch", desc:"auto token via SyncLyrics", badge:"Auto" },
    LrcLib:     { key:"enableLrcLib",     desc:"no key required",           badge:"Free" },
    NetEase:    { key:"enableNetEase",    desc:"strong Asian coverage",     badge:"CN" },
    QQMusic:    { key:"enableQQMusic",    desc:"strong Chinese coverage",   badge:"CN" }
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
};

const SECTION_DEFS = [
    ["\uD83D\uDD11", "Authentication",  "Discord and Spotify credentials, stored locally.",         "auth",      true],
    ["\uD83C\uDFA4", "Status Preview",  "What appears in your Discord status while music plays.",  "preview",   true],
    ["\u23F1",       "Timing",          "Fine-tune when your status changes relative to lyrics.",   "timing",    false],
    ["\uD83D\uDEE1", "Rate Limiting",   "Keep within Discord\u2019s update limits.",               "ratelimit", false],
    ["\u267B",       "Restore Status",  "Restore your original status after playback ends.",        "restore",   false],
    ["\u26A1",       "Gateway",         "WebSocket updates (op 3) with automatic iOS REST sync.",   "gateway",   false],
    ["\uD83D\uDD04", "Updates",         "Automatic update checks.",                                 "updates",   false],
    ["\uD83C\uDFB5", "Lyrics Sources",  "Drag to reorder. Changes take effect on restart.",        "sources",   true],
];

const h = {
    row:    (...cols) => `<div class="row">${cols.map(c=>c||"").join("")}</div>`,
    label:  t => `<span class="row-label">${t}</span>`,
    field:  inner => `<div class="row-field">${inner}</div>`,
    inline: inner => `<div class="row-inline">${inner}</div>`,
    input:  (id, ph="", extra="") => `<input type="text" id="${id}" class="full" placeholder="${ph}" ${extra}>`,
    number: (id, min, max, step) => `<input type="number" id="${id}" min="${min}" max="${max}" step="${step}">`,
    check:  (id, label) => `<label class="check-row"><input type="checkbox" id="${id}"><span>${label}</span></label>`,
    btn:    (id, text, cls="") => `<button id="${id}" class="${cls}">${text}</button>`,
    ibtn:   (id, title) => `<button id="${id}" class="icon-btn" title="${title}">?</button>`,
    hint:   t => `<small class="hint">${t}</small>`,
    muted:  t => `<span style="font-size:12px;color:var(--muted)">${t}</span>`,
    indent: inner => `<div class="indent">${inner}</div>`,
    divider:() => `<div class="divider"></div>`,
};

const PRESENCE_OPTIONS = [
    { value:"online", label:"\uD83D\uDFE2 Online",  color:"var(--green)" },
    { value:"idle",   label:"\uD83C\uDF19 Idle",    color:"var(--amber)" },
    { value:"dnd",    label:"\u26D4 Do Not Disturb",color:"var(--red)"   },
];

const SECTION_BODIES = {
    auth: () =>
        h.row(h.label("Discord token"),   h.field(h.inline(h.input("user-token","Paste your Discord user token") + h.btn("check-token","\u2192 Verify")))) +
        h.row(h.label("Spotify cookies"), h.field(h.input("spotify-cookies","Paste your sp_dc cookie value") + h.hint("Only the <code>sp_dc</code> value \u2014 DevTools \u2192 Application \u2192 Cookies \u2192 open.spotify.com"))) +
        h.row(h.label("Spotify token"),   h.field(h.inline(h.input("spotify-web-token","Auto-fetched from cookies on startup") + `<span id="spotify-token-status"></span>`) + h.hint("Optional \u2014 only needed if auto-fetch fails."))) +
        h.row(h.label("Client ID"),       h.field(h.input("client-id","Spotify app client ID"))) +
        h.row(h.label("Client secret"),   h.field(h.input("client-secret","Spotify app client secret"))) +
        h.row(h.label("Redirect URI"),    h.field(h.input("custom-redirect-uri","Must match URI in Spotify app settings"))) +
        h.row("", h.field(`<button id="btn-authorize" class="primary" style="width:100%;margin-bottom:8px">\u2192 Authorize Spotify</button><div class="auth-bottom">${h.check("use-external-auth-server","Use external auth server")}<span id="spotify-ok">\u2713 Authorized</span></div>`)),

    preview: () =>
        h.row("", h.field(h.check("enable-timestamp","Show playback timestamp"))) +
        h.row("", h.field(h.check("enable-label","Show label before lyrics"))) +
        h.row(h.label("Live preview"), h.field(`<span class="preview-badge" id="status-preview">[2:17] Song lyrics \u2014 La-la-la</span>`)) +
        h.divider() +
        h.row("", h.field(h.check("enable-advanced-swt","Advanced custom status template"))) +
        `<div class="sub-box" id="advanced-swt">` +
            h.row(h.label("Custom emoji"), h.inline(`<input type="text" id="custom-emoji" style="width:64px" maxlength="4" placeholder="\uD83C\uDFB6">` + h.ibtn("custom-emoji-help","Emoji help"))) +
            h.row(h.label("Status template"), h.field(`<textarea id="custom-status" class="full"></textarea>` + h.inline(h.hint("128 char limit. Variables: {lyrics}, {timestamp}, {song_name}, {song_author}, {source}, {progress}, {duration}, {line_number}") + h.ibtn("custom-status-help","Template help")))) +
        `</div>`,

    timing: () =>
        h.row(h.label("Send offset (ms)"), h.inline(h.number("send-time-offset",-2000,5000,100) + h.ibtn("send-time-offset-help","Offset help"))) +
        h.row("", h.inline(h.check("enable-autooffset","Enable autooffset") + h.ibtn("autooffset-help","Autooffset help"))) +
        h.row(h.label("Autooffset samples"), h.inline(h.number("autooffset",1,20,1) + h.muted("requests"))),

    ratelimit: () =>
        h.row("", h.field(h.check("enable-backoff","Auto backoff on rate limit"))) +
        h.indent(h.hint("Pauses sending for Discord\u2019s suggested retry window on 429.")) +
        h.row("", h.field(h.check("enable-min-interval","Minimum interval between updates"))) +
        h.indent(h.row(h.inline(h.number("min-interval-ms",1000,60000,500) + h.muted("ms between sends")))) +
        h.indent(h.hint("5000\u2009ms (5\u2009s) is a safe default.")) +
        h.row("", h.field(h.check("enable-merge-lines","Merge nearby lyric lines"))) +
        h.indent(h.row(h.inline(h.number("merge-window-ms",1000,30000,500) + h.muted("ms merge window")))) +
        h.indent(h.hint("Lines within this window are joined into one status update.")),

    restore: () =>
        h.row("", h.field(h.check("restore-enabled","Enable status restore"))) +
        h.row(h.label("Saved status"), `<div class="row-field" style="flex-direction:row;gap:8px;align-items:center"><span id="restore-status-display">Not set</span>${h.btn("btn-refresh-status","\u21BB Refresh")}${h.btn("btn-store-status","\u2713 Store")}</div>`) +
        h.row(h.label("Restore delay"), h.inline(h.number("restore-delay-ms",0,60000,1000) + h.muted("ms after song ends"))) +
        h.indent(h.hint("15\u2009000\u2009ms (15\u2009s) recommended to avoid rate limits on skips.")),

    gateway: () =>
        h.row("", h.inline(h.check("gateway-enabled","Use gateway (op\u00a03) instead of REST") + h.ibtn("gateway-help","Gateway help"))) +
        h.row(h.label("Presence status"),
            `<div class="row-field">` +
            `<div class="presence-toggle" id="presence-toggle">` +
            PRESENCE_OPTIONS.map(o => `<button class="presence-btn" data-value="${o.value}" style="--pc:${o.color}">${o.label}</button>`).join("") +
            `</div>` +
            h.hint("Sets your Discord online/idle/DND status on each op\u00a03 send. Gateway must be enabled.") +
            `</div>`
        ),

    updates: () =>
        h.row("", h.field(h.check("enable-autoupdate","Automatic update checks"))),

    sources: () =>
        `<ul id="source-list"></ul>` +
        h.row(h.label("Chinese script"), h.field(
            `<select id="chinese-conversion"><option value="off">Off</option><option value="toTraditional">Simplified \u2192 Traditional</option><option value="toSimplified">Traditional \u2192 Simplified</option></select>` +
            h.hint("Converts Chinese lyrics at fetch time. Clear cache to reprocess existing songs.")
        )),
};

function renderSections() {
    const container = document.getElementById("sections");
    container.innerHTML = SECTION_DEFS.map(([icon, title, desc, id, open]) => `
        <div class="section${open?" open":""}" data-section="${id}">
            <div class="section-header">
                <div class="section-header-left">
                    <div class="section-icon">${icon}</div>
                    <div>
                        <div class="section-title">${title}</div>
                        <div class="section-desc">${desc}</div>
                    </div>
                </div>
                <span class="section-chevron">&#x25BE;</span>
            </div>
            <div class="section-body">${SECTION_BODIES[id]()}</div>
        </div>
    `).join("");
    document.querySelectorAll(".section-header").forEach(hdr => {
        hdr.addEventListener("click", () => hdr.closest(".section").classList.toggle("open"));
    });
}
renderSections();

const getPath = (obj, path) => path.split(".").reduce((o,k) => o != null ? o[k] : undefined, obj);
function setPath(obj, path, val) {
    const keys = path.split("."), last = keys.pop();
    const t = keys.reduce((o,k) => o != null ? o[k] : null, obj);
    if (t != null) t[last] = val; else console.warn("setPath: bad path", path);
}

let settings = JSON.parse(JSON.stringify(DEFAULTS));
let loaded = false, ws = null, _pendingSave = false;

function mergeSettings(parsed) {
    const s = { ...DEFAULTS, ...parsed };
    s.credentials = { ...DEFAULTS.credentials, ...(parsed.credentials||{}) };
    s.view        = { ...DEFAULTS.view,        ...(parsed.view||{}) };
    s.view.advanced = { ...DEFAULTS.view.advanced, ...(parsed.view?.advanced||{}) };
    s.timings     = { ...DEFAULTS.timings,     ...(parsed.timings||{}) };
    s.update      = { ...DEFAULTS.update,      ...(parsed.update||{}) };
    s.rateLimit   = { ...DEFAULTS.rateLimit,   ...(parsed.rateLimit||{}) };
    s.sources     = { ...DEFAULTS.sources,     ...(parsed.sources||{}) };
    if (Array.isArray(parsed.sources?.sourceOrder) && parsed.sources.sourceOrder.length)
        s.sources.sourceOrder = parsed.sources.sourceOrder.slice();
    s.restore     = { ...DEFAULTS.restore,     ...(parsed.restore||{}) };
    s.gateway     = { ...DEFAULTS.gateway,     ...(parsed.gateway||{}) };
    return s;
}

function setIndicator(id, state, map) {
    const el = document.getElementById(id);
    const lbl = el.querySelector("[class$='-label']");
    el.className = "";
    const entry = map[state];
    if (entry) { if (entry.cls) el.classList.add(entry.cls); lbl.textContent = entry.text; entry.after?.(); }
}

function setWsStatus(state) {
    setIndicator("status-dot", state, {
        connected: { cls:"connected", text:"Connected" },
        error:     { cls:"error",     text:"Error" },
        default:   { text:"Connecting\u2026" }
    } );
    if (!["connected","error"].includes(state)) {
        const el = document.getElementById("status-dot");
        el.querySelector(".ws-label").textContent = "Connecting\u2026";
    }
}

function setSaveStatus(state) {
    setIndicator("save-indicator", state, {
        pending: { cls:"pending", text:"Unsaved" },
        saved:   { cls:"saved",   text:"Saved", after: () => setTimeout(() => { const el=document.getElementById("save-indicator"); el.className=""; el.querySelector(".si-label").textContent="Saved"; }, 2500) }
    });
}

function connectWS() {
    setWsStatus("connecting");
    ws = new WebSocket("ws://localhost:8999/ws");
    ws.onopen  = () => setWsStatus("connected");
    ws.onmessage = ({ data }) => {
        try {
            const parsed = JSON.parse(data);
            settings = mergeSettings(parsed);
            applyToDom();
            if (_pendingSave) { _pendingSave = false; save(); }
        } catch(e) { console.error("WS parse error:", e); }
    };
    ws.onerror = () => { setWsStatus("error"); _pendingSave = true; };
    ws.onclose = () => { setWsStatus("connecting"); setTimeout(connectWS, 2000); };
}
connectWS();

function save() {
    if (!loaded) return;
    if (!ws || ws.readyState !== WebSocket.OPEN) { _pendingSave = true; setSaveStatus("pending"); return; }
    try { ws.send(JSON.stringify(settings)); setSaveStatus("saved"); }
    catch(e) { console.error("ws.send failed:", e); _pendingSave = true; setSaveStatus("pending"); }
}

function toast(msg, type="info", duration=2500) {
    const icons = { success:"\u2713", error:"\u2717", info:"\u2139" };
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    el.innerHTML = `<span class="toast-icon">${icons[type]||""}</span><span>${msg}</span>`;
    document.getElementById("toast-container").appendChild(el);
    setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 250); }, duration);
}

const fmtTime = ms => { const s = Math.round(ms/1000); return `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`; };

function updatePreview() {
    const el = document.getElementById("status-preview");
    if (!el) return;
    const { timestamp, label } = settings.view;
    el.textContent = `${timestamp?`[${fmtTime(137000)}] `:""}${label?"Song lyrics \u2014 ":""}La-la-la`;
}

function updateRestoreDisplay() {
    const el = document.getElementById("restore-status-display");
    if (!el) return;
    const s = settings.restore?.savedStatus;
    if (s?.text) { el.style.color="var(--text)"; el.textContent=`${s.emoji_name?s.emoji_name+" ":""}${s.text}`; }
    else { el.style.color="var(--muted)"; el.textContent="Not set"; }
}

function updateSpotifyTokenStatus() {
    const el = document.getElementById("spotify-token-status");
    if (!el) return;
    const t = settings.credentials?.spotifyWebToken;
    el.style.color = t?.trim() ? "var(--green)" : "var(--muted)";
    el.textContent  = t?.trim() ? "\u2713 Set" : "Not set";
}

function updatePresenceToggle() {
    const current = settings.gateway?.presenceStatus || "online";
    document.querySelectorAll(".presence-btn").forEach(btn => {
        const active = btn.dataset.value === current;
        btn.classList.toggle("presence-active", active);
    });
}

let _lastSourceSnapshot = null;
function renderSourceList() {
    const order = settings.sources?.sourceOrder || Object.keys(SOURCE_META);
    const snapshot = order.join(",") + "|" + Object.keys(SOURCE_META).map(n=>settings.sources[SOURCE_META[n].key]).join(",");
    if (snapshot === _lastSourceSnapshot) return;
    _lastSourceSnapshot = snapshot;
    const ul = document.getElementById("source-list");
    if (!ul) return;
    ul.innerHTML = "";

    for (const name of order) {
        const meta = SOURCE_META[name]; if (!meta) continue;
        const li = document.createElement("li");
        li.dataset.source = name; li.draggable = true;
        li.innerHTML = `<span class="drag-handle">\u2630</span><span class="source-name">${name}</span><span class="source-desc">${meta.desc}</span><span class="source-badge">${meta.badge}</span><input type="checkbox" ${settings.sources[meta.key]!==false?"checked":""} style="accent-color:var(--accent);width:14px;height:14px;cursor:pointer;flex-shrink:0">`;
        ul.appendChild(li);
    }

    if (!ul.dataset.ulListenersAttached) {
        ul.dataset.ulListenersAttached = "1";
        const getLi = el => el.closest("li[data-source]");
        const syncOrder = () => { settings.sources.sourceOrder = [...ul.querySelectorAll("li")].map(el => el.dataset.source); _lastSourceSnapshot = null; save(); };
        ul.addEventListener("change", e => {
            if (e.target.type !== "checkbox") return;
            e.stopPropagation();
            const li = getLi(e.target); if (!li) return;
            settings.sources[SOURCE_META[li.dataset.source]?.key] = e.target.checked;
            _lastSourceSnapshot = null; save();
        });
        ul.addEventListener("dragstart", e => { const li = getLi(e.target); if (!li) return; e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", li.dataset.source); li.classList.add("dragging"); });
        ul.addEventListener("dragend",   e => getLi(e.target)?.classList.remove("dragging"));
        ul.addEventListener("dragover",  e => { e.preventDefault(); getLi(e.target)?.classList.add("drag-over"); });
        ul.addEventListener("dragleave", e => getLi(e.target)?.classList.remove("drag-over"));
        ul.addEventListener("drop", e => {
            e.preventDefault();
            const from = e.dataTransfer.getData("text/plain"), target = getLi(e.target);
            const fromEl = ul.querySelector(`li[data-source="${from}"]`);
            if (!fromEl) return;
            target ? ul.insertBefore(fromEl, target) : ul.appendChild(fromEl);
            target?.classList.remove("drag-over");
            syncOrder();
        });
    }
}

function applyToDom() {
    try {
        for (const [sel, path, type] of BINDINGS) {
            const el = document.querySelector(sel);
            if (!el) continue;
            const val = getPath(settings, path);
            if (val == null) continue;
            if (type === "checkbox") el.checked = !!val;
            else el.value = val;
        }
        const adv = settings.view?.advanced?.enabled;
        const advBox = document.getElementById("advanced-swt");
        if (advBox) advBox.classList.toggle("show", !!adv);
        const ts = document.getElementById("enable-timestamp");
        const lb = document.getElementById("enable-label");
        if (ts) ts.disabled = !!adv;
        if (lb) lb.disabled = !!adv;
        const ok = document.getElementById("spotify-ok");
        if (ok) ok.classList.toggle("show", !!(settings.credentials?.refreshToken||settings.credentials?.code));
        updateSpotifyTokenStatus(); updateRestoreDisplay(); updatePreview(); updatePresenceToggle(); renderSourceList();
    } catch(e) { console.error("applyToDom:", e); }
    finally { loaded = true; }
}

function bindAll() {
    for (const [sel, path, type] of BINDINGS) {
        const el = document.querySelector(sel);
        if (!el) continue;
        if (type === "checkbox") {
            el.addEventListener("change", () => {
                setPath(settings, path, el.checked);
                if (sel === "#enable-advanced-swt") {
                    const on = el.checked;
                    const advBox = document.getElementById("advanced-swt");
                    if (advBox) advBox.classList.toggle("show", on);
                    const ts = document.getElementById("enable-timestamp");
                    const lb = document.getElementById("enable-label");
                    if (ts) ts.disabled = on;
                    if (lb) lb.disabled = on;
                }
                if (sel==="#enable-timestamp"||sel==="#enable-label") updatePreview();
                save();
            });
        } else if (type === "select") {
            el.addEventListener("change", () => { setPath(settings, path, el.value); save(); });
        } else if (type === "number") {
            el.addEventListener("input", () => { const v=parseFloat(el.value); if(!isNaN(v)){setPath(settings,path,v);save();} });
        } else {
            el.addEventListener(type==="textarea"?"input":"change", () => {
                let v = el.value;
                if (sel==="#user-token") v=v.replace(/"/g,"");
                setPath(settings, path, v); save();
                if (sel==="#spotify-web-token") updateSpotifyTokenStatus();
            });
        }
    }

    // Presence toggle buttons
    document.getElementById("presence-toggle")?.addEventListener("click", e => {
        const btn = e.target.closest(".presence-btn");
        if (!btn) return;
        if (!settings.gateway) settings.gateway = {};
        settings.gateway.presenceStatus = btn.dataset.value;
        updatePresenceToggle();
        save();
        toast(`Presence set to ${btn.dataset.value}`, "success", 1500);
    });
}

function showModal(title, html) {
    document.querySelectorAll(".modal-overlay").forEach(el => el.remove());
    const m = document.createElement("div");
    m.className = "modal-overlay";
    m.innerHTML = `<div class="modal-box"><div class="modal-header"><span>${title}</span><span class="modal-close">\u2715</span></div><div class="modal-body">${html}</div></div>`;
    m.addEventListener("click", e => { if (e.target===m) m.remove(); });
    m.querySelector(".modal-close").addEventListener("click", () => m.remove());
    document.body.appendChild(m);
}

function btnFlash(btn, orig, cls, text, ms=2000) {
    btn.disabled=false; btn.classList.remove("success","danger"); btn.classList.add(cls); btn.textContent=text;
    setTimeout(()=>{ btn.classList.remove(cls); btn.textContent=orig; }, ms);
}

const withBtnSpinner = (btn, fn) => { const orig=btn.textContent; btn.disabled=true; btn.textContent="\u2026"; fn(orig, ()=>{ btn.disabled=false; btn.textContent=orig; }); };

function fetchDiscordStatus(token, cb) {
    fetch("https://discordapp.com/api/v8/users/@me/settings", { headers:{ Authorization:token } })
        .then(r => { if(!r.ok) throw r.status; return r.json(); })
        .then(j => cb(null, j?.custom_status))
        .catch(e => cb(e, null));
}

document.addEventListener("DOMContentLoaded", () => {
    bindAll();

    for (const [sel, info] of Object.entries(HELP)) {
        const el = document.querySelector(sel);
        if (el) el.addEventListener("click", () => showModal(info.title, info.html));
    }

    document.getElementById("check-token")?.addEventListener("click", function() {
        withBtnSpinner(this, (orig, reset) => {
            fetch("https://discordapp.com/api/v8/users/@me", { headers:{ Authorization:settings.credentials.token } })
                .then(r => { btnFlash(this,orig,r.ok?"success":"danger",r.ok?"\u2713 Valid":"\u2717 Invalid",3000); toast(r.ok?"Discord token is valid":"Discord token is invalid",r.ok?"success":"error"); })
                .catch(()=>{ btnFlash(this,orig,"danger","\u2717 Error",3000); toast("Could not reach Discord","error"); });
        });
    });

    document.getElementById("btn-authorize")?.addEventListener("click", () => {
        const {clientID,customRedirectUri,uuid,useExternalAuthServer}=settings.credentials;
        window.open(useExternalAuthServer
            ?`https://rocky-quintessential-island.glitch.me/login/${uuid}`
            :`https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(clientID)}&response_type=code&redirect_uri=${encodeURIComponent(customRedirectUri)}&scope=${encodeURIComponent("user-read-playback-state user-read-currently-playing")}`,
        "_blank");
    });

    document.getElementById("btn-refresh-status")?.addEventListener("click", function() {
        const token=settings.credentials?.token;
        if(!token){ toast("No Discord token set","error"); return; }
        withBtnSpinner(this, (orig, reset) => {
            fetchDiscordStatus(token, (err,s) => {
                reset();
                if(err){ toast("Failed to fetch Discord status","error"); return; }
                const disp=document.getElementById("restore-status-display");
                if(s?.text){
                    if(disp){ disp.style.color="var(--accent)"; disp.textContent=`${s.emoji_name?s.emoji_name+" ":""}${s.text} (unsaved \u2014 click Store)`; }
                    document.getElementById("btn-store-status")._fetched=s;
                    toast("Status fetched \u2014 click Store to save","info");
                } else {
                    if(disp){ disp.style.color="var(--muted)"; disp.textContent="No custom status set"; }
                    toast("No custom status active","info");
                }
            });
        });
    });

    document.getElementById("btn-store-status")?.addEventListener("click", function() {
        const persist=s=>{ if(!settings.restore)settings.restore={}; settings.restore.savedStatus=s?.text?s:null; this._fetched=null; save(); updateRestoreDisplay(); btnFlash(this,origRef,"success","\u2713 Stored"); toast("Status saved","success"); };
        let origRef;
        const fetched=this._fetched; if(fetched){ origRef=this.textContent; persist(fetched); return; }
        const token=settings.credentials?.token; if(!token){ toast("No Discord token set","error"); return; }
        withBtnSpinner(this, (orig, reset) => {
            origRef=orig;
            fetchDiscordStatus(token,(err,s)=>{ if(err){ btnFlash(this,orig,"danger","\u2717 Failed"); toast("Failed to fetch status","error"); return; } persist(s); });
        });
    });
});
