// panel-ui.js â€" HTML builders and DOM rendering
// Depends on: panel-data.js (DEFAULTS, SOURCE_META, SECTION_DEFS, SECTION_BODIES keys,
//             PRESENCE_OPTIONS, FLASH_STATE_OPTIONS, RESTORE_STATUS_OPTIONS)
// Depends on: panel.js globals: settings, save()

const h = {
    row:     (...cols) => `<div class="row">${cols.map(c=>c||"").join("")}</div>`,
    label:   t => `<span class="row-label">${t}</span>`,
    field:   inner => `<div class="row-field">${inner}</div>`,
    inline:  inner => `<div class="row-inline">${inner}</div>`,
    input:   (id, ph="", extra="") => `<input type="text" id="${id}" class="full" placeholder="${ph}" ${extra}>`,
    number:  (id, min, max, step) => `<input type="number" id="${id}" min="${min}" max="${max}" step="${step}">`,
    check:   (id, label) => `<label class="check-row"><input type="checkbox" id="${id}"><span>${label}</span></label>`,
    btn:     (id, text, cls="") => `<button id="${id}" class="${cls}">${text}</button>`,
    ibtn:    (id, title) => `<button id="${id}" class="icon-btn" title="${title}">?</button>`,
    hint:    t => `<small class="hint">${t}</small>`,
    muted:   t => `<span style="font-size:12px;color:var(--muted)">${t}</span>`,
    indent:  inner => `<div class="indent">${inner}</div>`,
    divider: () => `<div class="divider"></div>`,
};

const SECTION_BODIES = {
    auth: () =>
        h.row(h.label("Discord token"),   h.field(h.inline(h.input("user-token","Paste your Discord user token") + h.btn("check-token","\u2192 Verify")))) +
        h.row(h.label("Spotify cookies"), h.field(h.input("spotify-cookies","Paste your sp_dc cookie value") + h.hint("Only the <code>sp_dc</code> value \u2014 DevTools \u2192 Application \u2192 Cookies \u2192 open.spotify.com"))) +
        h.row(h.label("Spotify token"),   h.field(h.inline(h.input("spotify-web-token","Auto-fetched from cookies on startup") + `<span id="spotify-token-status"></span>`) + h.hint("Optional \u2014 only needed if auto-fetch fails."))) +
        h.row(h.label("Client ID"),       h.field(h.input("client-id","Spotify app client ID"))) +
        h.row(h.label("Client secret"),   h.field(h.input("client-secret","Spotify app client secret"))) +
        h.row(h.label("Redirect URI"),    h.field(h.input("custom-redirect-uri","Must match URI in Spotify app settings"))) +
        h.row("", h.field(`<button id="btn-authorize" class="primary" style="width:100%;margin-bottom:8px">\u2192 Authorize Spotify</button><div class="auth-bottom">${h.check("use-external-auth-server","Use external auth server")}<span id="spotify-ok">\u2713 Authorized</span></div>`)),

    display: () =>
        h.row("", h.field(h.check("enable-timestamp","Show playback timestamp"))) +
        h.row("", h.field(h.check("enable-label","Show label before lyrics"))) +
        h.row(h.label("Live preview"), h.field(`<span class="preview-badge" id="status-preview">[2:17] Song lyrics \u2014 La-la-la</span>`)) +
        h.divider() +
        h.row("", h.field(h.check("enable-advanced-swt","Advanced custom status template"))) +
        `<div class="sub-box" id="advanced-swt">` +
            h.row(h.label("Custom emoji"), h.inline(`<input type="text" id="custom-emoji" style="width:64px" maxlength="4" placeholder="\uD83C\uDFB6">` + h.ibtn("custom-emoji-help","Emoji help"))) +
            h.row(h.label("Status template"), h.field(`<textarea id="custom-status" class="full"></textarea>` + h.inline(h.hint("128 char limit. Variables: {lyrics}, {timestamp}, {song_name}, {song_author}, {source}, {progress}, {duration}, {line_number}") + h.ibtn("custom-status-help","Template help")))) +
            h.row(h.label("Unicode style"), h.field(`<select id="unicode-style"><option value="none">None</option><option value="bold">\uD835\uDC01\uD835\uDC28\uD835\uDC25\uD835\uDC1D Bold</option><option value="italic">\uD835\uDC3C\uD835\uDC61\uD835\uDC4E\uD835\uDC59\uD835\uDC56\uD835\uDC50 Italic</option><option value="bold_italic">\uD835\uDC54\uD835\uDC90\uD835\uDC8F\uD835\uDC88 Bold Italic</option><option value="sans">\uD835\uDE34\uD835\uDE30\uD835\uDE2F\uD835\uDE34 Sans</option><option value="sans_bold">\uD835\uDDE6\uD835\uDDBC\uD835\uDDB3\uD835\uDDE6 Sans Bold</option><option value="sans_italic">\uD835\uDE58\uD835\uDE54\uD835\uDE53\uD835\uDE5A Sans Italic</option><option value="sans_bold_italic">\uD835\uDE5C\uD835\uDE58\uD835\uDE57\uD835\uDE5C Sans Bold Italic</option><option value="double_struck">\uD835\uDD64\uD835\uDD60\uD835\uDD5F\uD835\uDD64 Double-Struck</option><option value="fraktur">\uD835\uDD30\uD835\uDD2C\uD835\uDD2B\uD835\uDD30 Fraktur</option><option value="fraktur_bold">\uD835\uDE98\uD835\uDE94\uD835\uDE93\uD835\uDE98 Fraktur Bold</option></select>` + h.hint("Converts a\u2013z A\u2013Z to Unicode math chars. Works in Discord status. Non-latin letters pass through."))) +
            h.row("", h.field(h.check("style-alternate-enabled","Alternate bold \u2194 italic on a timer") + h.hint("Overrides Unicode style above."))) +
            `<div id="style-alternate-interval-row">` +
                h.row(h.label("Alternate interval"), h.inline(h.number("style-alternate-interval",500,60000,500) + h.muted("ms per style"))) +
            `</div>` +
        `</div>` +
        h.divider() +
        h.row(h.label("Send offset (ms)"), h.inline(h.number("send-time-offset",-2000,5000,100) + h.ibtn("send-time-offset-help","Offset help"))) +
        h.row("", h.inline(h.check("enable-autooffset","Enable autooffset") + h.ibtn("autooffset-help","Autooffset help"))) +
        h.row(h.label("Autooffset samples"), h.inline(h.number("autooffset",1,20,1) + h.muted("requests"))) +
        h.divider() +
        h.row("", h.field(h.check("enable-backoff","Auto backoff on rate limit"))) +
        h.indent(h.hint("Pauses sending for Discord\u2019s suggested retry window on 429.")) +
        h.row("", h.field(h.check("enable-min-interval","Minimum interval between updates"))) +
        h.indent(h.row(h.inline(h.number("min-interval-ms",1000,60000,500) + h.muted("ms between sends")))) +
        h.indent(h.hint("5000\u2009ms (5\u2009s) is a safe default.")) +
        h.row("", h.field(h.check("enable-merge-lines","Merge nearby lyric lines"))) +
        h.indent(h.row(h.inline(h.number("merge-window-ms",1000,30000,500) + h.muted("ms merge window")))) +
        h.indent(h.hint("Lines within this window are joined into one status update.")),

    gateway: () =>
        h.row("", h.inline(h.check("gateway-enabled","Use gateway (op\u00a03) instead of REST") + h.ibtn("gateway-help","Gateway help"))) +
        h.row(h.label("Presence status"),
            `<div class="row-field">` +
            `<div class="presence-toggle" id="presence-toggle">` +
            PRESENCE_OPTIONS.map(o => `<button class="presence-btn" data-value="${o.value}" style="--pc:${o.color}">${o.label}</button>`).join("") +
            `</div>` +
            h.hint("Mobile presence requires a restart to take effect. Sets your Discord status on each op\u00a03 send. Invisible hides you from others while still updating your custom status. Gateway must be enabled.") +
            `</div>`
        ) +
        h.row(h.label("GW min interval"), h.inline(h.number("gw-min-interval-ms",0,60000,500) + h.muted("ms between op\u00a03 sends"))) +
        h.indent(h.hint("Throttles gateway sends. 0\u2009=\u2009only Discord\u2019s hard cap (5/20\u2009s). Default: 5000\u2009ms.")) +
        h.divider() +
        h.row("", h.inline(h.check("flash-enabled","Enable status flash") + h.ibtn("flash-help","Flash help"))) +
        h.row(h.label("Cycle states"),
            `<div class="row-field">` +
            `<div class="flash-state-toggle" id="flash-state-toggle">` +
            FLASH_STATE_OPTIONS.map(o => `<button class="flash-state-btn" data-value="${o.value}">${o.label}</button>`).join("") +
            `</div>` +
            h.hint("Select which presence states to cycle through. Order: online \u2192 idle \u2192 dnd \u2192 invisible. At least one must be active.") +
            `</div>`
        ) +
        h.row(h.label("Interval"), h.inline(h.number("flash-interval-ms",300,5000,100) + h.muted("ms per state"))) +
        h.indent(h.hint("Minimum 300\u2009ms. Discord presence propagation to other users takes ~1\u20133s.")) +
        h.row(h.label("Restore to"),
            `<div class="row-field">` +
            `<select id="flash-restore-status">` +
            RESTORE_STATUS_OPTIONS.map(o => `<option value="${o.value}">${o.label}</option>`).join("") +
            `</select>` +
            h.hint("Presence status to restore when playback stops.") +
            `</div>`
        ) +
        h.divider() +
        h.row("", h.inline(h.check("rp-enabled","Enable rich presence (type\u00a02)") + h.ibtn("rp-help","Rich Presence help"))) +
        h.row("", h.field(`<small class="hint" id="rp-gw-warn" style="color:var(--amber);display:none">\u26a0 Gateway must be enabled for rich presence to work.</small>`)) +
        h.row(h.label("App name"),        h.field(h.input("rp-app-name","e.g. Spotify") + h.hint(`Shown as \u201cListening to [App name]\u201d in Discord.`))) +
        h.row(h.label("Details (line 1)"),h.field(`<textarea id="rp-details-template" class="full"></textarea>` + h.inline(h.hint("Top line. Same variables as custom status template.") + h.ibtn("custom-status-help","Template help")))) +
        h.row(h.label("State (line 2)"),  h.field(h.input("rp-state-template","e.g. {song_author}") + h.hint("Artist/subtitle row."))) +
        h.row("", h.field(h.check("rp-show-progress-bar","Show progress bar (uses timestamps)"))) +
        h.row("", h.field(h.check("rp-show-album-art","Show album art (Spotify CDN)"))) +
        `<div id="rp-album-art-url-row">` +
            h.indent(h.row(h.label("Album art URL"), h.field(h.input("rp-album-art-url","Override URL (leave blank for auto)")))) +
        `</div>` +
        h.row(h.label("Button label"),   h.field(h.input("rp-button-label","Leave blank to hide button"))) +
        h.row(h.label("Button URL"),     h.field(h.input("rp-button-url","https://...") + h.hint("Must start with http/https."))),

    restore: () =>
        h.row("", h.field(h.check("restore-enabled","Enable status restore"))) +
        h.row(h.label("Saved status"), `<div class="row-field" style="flex-direction:row;gap:8px;align-items:center"><span id="restore-status-display">Not set</span>${h.btn("btn-refresh-status","\u21BB Refresh")}${h.btn("btn-store-status","\u2713 Store")}</div>`) +
        h.row(h.label("Restore delay"), h.inline(h.number("restore-delay-ms",0,60000,1000) + h.muted("ms after song ends"))) +
        h.indent(h.hint("15\u2009000\u2009ms (15\u2009s) recommended to avoid rate limits on skips.")) +
        h.divider() +
        `<ul id="source-list"></ul>` +
        h.row(h.label("Chinese script"), h.field(
            `<select id="chinese-conversion"><option value="off">Off</option><option value="toTraditional">Simplified \u2192 Traditional</option><option value="toSimplified">Traditional \u2192 Simplified</option></select>` +
            h.hint("Converts Chinese lyrics at fetch time. Clear cache to reprocess existing songs.")
        )) +
        h.divider() +
        h.row("", h.field(h.check("enable-autoupdate","Automatic update checks"))),
};

function renderSections() {
    const container = document.getElementById("sections");
    container.innerHTML = SECTION_DEFS.map(([icon, title, desc, id, open]) => `
        <div class="section${open?" open":""}" data-section="${id}">
            <div class="section-header" aria-expanded="${open}">
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
    // UI-5: restore persisted open/close state
    document.querySelectorAll(".section[data-section]").forEach(sec => {
        const id = sec.dataset.section;
        const stored = (() => { try { return localStorage.getItem("sec_" + id); } catch(_) { return null; } })();
        if (stored === "1") sec.classList.add("open");
        else if (stored === "0") sec.classList.remove("open");
        const hdr = sec.querySelector(".section-header");
        if (hdr) hdr.setAttribute("aria-expanded", sec.classList.contains("open"));
    });
    document.querySelectorAll(".section-header").forEach(hdr => {
        hdr.addEventListener("click", () => {
            const sec = hdr.closest(".section");
            sec.classList.toggle("open");
            const id = sec.dataset.section;
            const isOpen = sec.classList.contains("open");
            hdr.setAttribute("aria-expanded", isOpen);
            try { localStorage.setItem("sec_" + id, isOpen ? "1" : "0"); } catch(_) {}
        });
    });
}

let _lastSourceSnapshot = null;
function renderSourceList() {
    const order = settings.sources?.sourceOrder || Object.keys(SOURCE_META);
    const snapshot = order.join(",") + "|" + order.map(n => SOURCE_META[n] ? settings.sources[SOURCE_META[n].key] : "").join(",");
    if (snapshot === _lastSourceSnapshot) return;
    _lastSourceSnapshot = snapshot;
    const ul = document.getElementById("source-list");
    if (!ul) return;
    ul.innerHTML = "";

    for (const name of order) {
        const meta = SOURCE_META[name]; if (!meta) continue;
        const li = document.createElement("li");
        li.dataset.source = name; li.draggable = true;
        li.innerHTML = `<span class="drag-handle" style="pointer-events:none">\u2630</span><span class="source-name" style="pointer-events:none">${name}</span><span class="source-desc" style="pointer-events:none">${meta.desc}</span><span class="source-badge" style="pointer-events:none">${meta.badge}</span><input type="checkbox" ${settings.sources[meta.key]!==false?"checked":""} style="accent-color:var(--accent);width:14px;height:14px;cursor:pointer;flex-shrink:0">`;
        ul.appendChild(li);
    }

    if (!ul.dataset.ulListenersAttached) {
        ul.dataset.ulListenersAttached = "1";
        const getLi = el => el.closest("li[data-source]");
        const syncOrder = () => {
            settings.sources.sourceOrder = [...ul.querySelectorAll("li")].map(el => el.dataset.source);
            _lastSourceSnapshot = null;
            save();
        };
        ul.addEventListener("change", e => {
            if (e.target.type !== "checkbox") return;
            e.stopPropagation();
            const li = getLi(e.target); if (!li) return;
            settings.sources[SOURCE_META[li.dataset.source]?.key] = e.target.checked;
            _lastSourceSnapshot = null; save();
        });
        ul.addEventListener("dragstart", e => {
            const li = getLi(e.target); if (!li) return;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", li.dataset.source);
            li.classList.add("dragging");
        });
        ul.addEventListener("dragend",  e => getLi(e.target)?.classList.remove("dragging"));
        ul.addEventListener("dragover", e => { e.preventDefault(); getLi(e.target)?.classList.add("drag-over"); });
        ul.addEventListener("dragleave",e => getLi(e.target)?.classList.remove("drag-over"));
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
