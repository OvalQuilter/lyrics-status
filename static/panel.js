// panel.js — runtime core
// Depends on: panel-data.js, panel-ui.js (loaded before this file)

const getPath = (obj, path) => path.split(".").reduce((o,k) => o != null ? o[k] : undefined, obj);
function setPath(obj, path, val) {
    const keys = path.split("."), last = keys.pop();
    const t = keys.reduce((o,k) => o != null ? o[k] : null, obj);
    if (t != null) t[last] = val; else console.warn("setPath: bad path", path);
}

let settings = JSON.parse(JSON.stringify(DEFAULTS));
let loaded = false, ws = null, _pendingSave = false, _dirty = false;

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
    s.statusFlash = { ...DEFAULTS.statusFlash, ...(parsed.statusFlash||{}) };
    s.statusFlash.states = Array.isArray(parsed.statusFlash?.states) && parsed.statusFlash.states.length
        ? parsed.statusFlash.states.slice()
        : DEFAULTS.statusFlash.states.slice();
    s.richPresence = { ...DEFAULTS.richPresence, ...(parsed.richPresence||{}) };
    return s;
}

// BUG 1 fix: track save-indicator timer to cancel before rescheduling
let _saveTimer = null;
function setSaveStatus(state) {
    const el = document.getElementById("save-indicator");
    if (!el) return;
    const lbl = el.querySelector(".si-label");
    if (state === "pending") {
        if (_saveTimer) { clearTimeout(_saveTimer); _saveTimer = null; }
        el.className = "pending";
        if (lbl) lbl.textContent = "Unsaved";
    } else if (state === "saved") {
        el.className = "saved";
        if (lbl) lbl.textContent = "Saved";
        if (_saveTimer) clearTimeout(_saveTimer);
        _saveTimer = setTimeout(() => { _saveTimer = null; el.className = ""; }, 2500);
    }
}

function setWsStatus(state) {
    const el = document.getElementById("status-dot");
    if (!el) return;
    const lbl = el.querySelector(".status-label");
    el.className = "";
    if (state === "connected")  { el.classList.add("connected"); if (lbl) lbl.textContent = "Connected"; }
    else if (state === "error") { el.classList.add("error");     if (lbl) lbl.textContent = "Error"; }
    else                        {                                 if (lbl) lbl.textContent = "Connecting\u2026"; }
}

function updateNowPlaying(d) {
    const bar = document.getElementById("np-bar");
    const song = document.getElementById("np-song");
    const badge = document.getElementById("np-status-badge");
    const lyric = document.getElementById("np-lyric");
    const author = document.getElementById("np-author");
    const source = document.getElementById("np-source");
    const progress = document.getElementById("np-progress");
    const gw = document.getElementById("np-gw");
    const send = document.getElementById("np-send");
    if (!bar) return;
    const playing = d.isPlaying;
    bar.className = playing ? "" : "paused";
    if (song) song.textContent = d.song || "Not playing";
    if (badge) { badge.textContent = playing ? "\u25B6 Playing" : (d.song ? "\u23F8 Paused" : "Idle"); badge.className = "np-status-badge " + (playing ? "playing" : d.song ? "paused" : "idle"); }
    if (lyric) { lyric.style.display = d.lyric ? "" : "none"; lyric.textContent = d.lyric || ""; }
    if (author) author.textContent = d.author || "\u2014";
    if (source) source.textContent = d.source || "\u2014";
    if (progress) progress.textContent = d.progress || "\u2014";
    if (gw) {
        if (!d.gwEnabled) { gw.textContent = "REST"; gw.className = "off"; }
        else if (d.gwConnected) { gw.textContent = "GW " + (d.gwRate||0) + "/5"; gw.className = d.gwRate >= 4 ? "warn" : "ok"; }
        else if (d.gwReconnecting) { gw.textContent = "GW reconnecting"; gw.className = "warn"; } else { gw.textContent = "GW \u2014"; gw.className = "err"; }
    }
    if (send) {
        if (d.rateLimited) { send.textContent = "Rate limited " + d.rateLimited + "s"; send.className = "rate"; }
        else if (!d.nextSend || d.nextSend <= 0) { send.textContent = "Ready"; send.className = "ready"; }
        else { send.textContent = "Next: " + (d.nextSend/1000).toFixed(1) + "s"; send.className = ""; }
    }
}
function connectWS() {
    setWsStatus("connecting");
    ws = new WebSocket("ws://localhost:8999/ws");
    ws.onopen = () => { setWsStatus("connected"); };
    ws.onmessage = ({ data }) => {
        try {
            const parsed = JSON.parse(data);
            if (parsed.type === "status") { updateNowPlaying(parsed); return; }
            if (parsed.type === "server_shutdown") return;
            if (!_dirty) {
                settings = mergeSettings(parsed);
                applyToDom();
            }
            if (_pendingSave) { _pendingSave = false; save(); }
        } catch(e) { console.error("WS parse error:", e); }
    };
    ws.onerror = () => { setWsStatus("error"); _pendingSave = true; };
    ws.onclose = () => { setWsStatus("connecting"); setTimeout(connectWS, 2000); if (!_disconnectToast) { _disconnectToast = setTimeout(() => { if (!ws || ws.readyState !== WebSocket.OPEN) toast("Panel disconnected â€” reconnecting\u2026", "error", 5000); _disconnectToast = null; }, 5000); } };
}
connectWS();

function save() {
    if (!loaded) return;
    if (!ws || ws.readyState !== WebSocket.OPEN) { _pendingSave = true; setSaveStatus("pending"); return; }
    try {
        ws.send(JSON.stringify(settings));
        _dirty = false;
        setSaveStatus("saved");
    } catch(e) { console.error("ws.send failed:", e); _pendingSave = true; setSaveStatus("pending"); }
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

function syncAdvancedSwt(on) {
    const advBox = document.getElementById("advanced-swt");
    if (advBox) advBox.classList.toggle("show", on);
    const ts = document.getElementById("enable-timestamp");
    const lb = document.getElementById("enable-label");
    if (ts) ts.disabled = on;
    if (lb) lb.disabled = on;
}

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
        btn.classList.toggle("presence-active", btn.dataset.value === current);
    });
}

function updateFlashStateToggle() {
    const states = settings.statusFlash?.states || [];
    document.querySelectorAll(".flash-state-btn").forEach(btn => {
        btn.classList.toggle("flash-state-active", states.includes(btn.dataset.value));
    });
}

function updateFlashRestoreSelect() {
    const el = document.getElementById("flash-restore-status");
    if (!el) return;
    el.value = settings.statusFlash?.restoreStatus || "";
}

function updateStyleAlternateIntervalVisibility() {
    const row = document.getElementById("style-alternate-interval-row");
    if (!row) return;
    row.style.display = settings.view?.advanced?.styleAlternateEnabled ? "" : "none";
}

function updateRpGwWarn() {
    const el = document.getElementById("rp-gw-warn");
    if (!el) return;
    el.style.display = (settings.richPresence?.enabled && !settings.gateway?.enabled) ? "" : "none";
}

function updateRpAlbumArtRow() {
    const row = document.getElementById("rp-album-art-url-row");
    if (!row) return;
    row.style.display = settings.richPresence?.showAlbumArt ? "none" : "";
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
        syncAdvancedSwt(!!settings.view?.advanced?.enabled);
        const ok = document.getElementById("spotify-ok");
        if (ok) ok.classList.toggle("show", !!(settings.credentials?.refreshToken||settings.credentials?.code));
        updateSpotifyTokenStatus(); updateRestoreDisplay(); updatePreview(); updatePresenceToggle();
        updateFlashStateToggle(); updateFlashRestoreSelect();
        renderSourceList(); updateStyleAlternateIntervalVisibility();
        updateRpGwWarn(); updateRpAlbumArtRow();
    } catch(e) { console.error("applyToDom:", e); }
    loaded = true;
}

function bindAll() {
    for (const [sel, path, type] of BINDINGS) {
        const el = document.querySelector(sel);
        if (!el) continue;
        if (type === "checkbox") {
            el.addEventListener("change", () => {
                setPath(settings, path, el.checked);
                if (sel === "#enable-advanced-swt") syncAdvancedSwt(el.checked);
                if (sel === "#style-alternate-enabled") updateStyleAlternateIntervalVisibility();
                if (sel==="#enable-timestamp"||sel==="#enable-label") updatePreview();
                if (sel==="#rp-enabled"||sel==="#gateway-enabled") updateRpGwWarn();
                if (sel==="#rp-show-album-art") updateRpAlbumArtRow();
                _dirty = true; save();
            });
        } else if (type === "select") {
            el.addEventListener("change", () => { setPath(settings, path, el.value); _dirty = true; save(); });
        } else if (type === "number") {
            el.addEventListener("input", () => {
                let v = parseFloat(el.value);
                if (isNaN(v)) return;
                const mn = el.min !== "" ? parseFloat(el.min) : -Infinity;
                const mx = el.max !== "" ? parseFloat(el.max) :  Infinity;
                v = Math.min(mx, Math.max(mn, v));
                setPath(settings, path, v); _dirty = true; save();
            });
        } else {
            el.addEventListener(type==="textarea"?"input":"change", () => {
                let v = el.value;
                if (sel==="#user-token") v=v.replace(/"/g,"");
                setPath(settings, path, v); _dirty = true; save();
                if (sel==="#spotify-web-token") updateSpotifyTokenStatus();
            });
        }
    }

    document.getElementById("presence-toggle")?.addEventListener("click", e => {
        const btn = e.target.closest(".presence-btn");
        if (!btn) return;
        if (!settings.gateway) settings.gateway = {};
        settings.gateway.presenceStatus = btn.dataset.value;
        updatePresenceToggle();
        _dirty = true; save();
        toast(`Presence set to ${btn.dataset.value}`, "success", 1500);
    });

    document.getElementById("flash-state-toggle")?.addEventListener("click", e => {
        const btn = e.target.closest(".flash-state-btn");
        if (!btn) return;
        if (!settings.statusFlash) settings.statusFlash = { ...DEFAULTS.statusFlash };
        const states = settings.statusFlash.states || [];
        const val = btn.dataset.value;
        const idx = states.indexOf(val);
        if (idx === -1) {
            states.push(val);
        } else {
            if (states.length <= 1) { toast("At least one state must be selected", "error", 2000); return; }
            states.splice(idx, 1);
        }
        const ORDER = ["online","idle","dnd","invisible"];
        settings.statusFlash.states = ORDER.filter(s => states.includes(s));
        updateFlashStateToggle();
        _dirty = true; save();
    });

    document.getElementById("flash-restore-status")?.addEventListener("change", e => {
        if (!settings.statusFlash) settings.statusFlash = { ...DEFAULTS.statusFlash };
        settings.statusFlash.restoreStatus = e.target.value || null;
        _dirty = true; save();
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
    btn.classList.remove("success","danger"); btn.classList.add(cls); btn.textContent=text;
    setTimeout(()=>{ btn.classList.remove(cls); btn.textContent=orig; }, ms);
}

const withBtnSpinner = (btn, fn) => {
    const orig = btn.textContent;
    btn.disabled = true; btn.textContent = "\u2026";
    fn(orig, () => { btn.disabled = false; btn.textContent = orig; });
};

document.addEventListener("DOMContentLoaded", () => {
    renderSections();
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
            fetch("https://discordapp.com/api/v8/users/@me/settings", { headers:{ Authorization:token } })
                .then(r => { if(!r.ok) throw r.status; return r.json(); })
                .then(j => {
                    reset();
                    const s = j?.custom_status;
                    const disp = document.getElementById("restore-status-display");
                    if (s?.text) {
                        if (disp) { disp.style.color="var(--accent)"; disp.textContent=`${s.emoji_name?s.emoji_name+" ":""}${s.text} (unsaved \u2014 click Store)`; }
                        document.getElementById("btn-store-status")._fetched = s;
                        toast("Status fetched \u2014 click Store to save","info");
                    } else {
                        if (disp) { disp.style.color="var(--muted)"; disp.textContent="No custom status set"; }
                        toast("No custom status active","info");
                    }
                })
                .catch(() => { reset(); toast("Failed to fetch Discord status","error"); });
        });
    });

    document.getElementById("btn-store-status")?.addEventListener("click", function() {
        const origRef = this.textContent;
        const persist = s => {
            if (!settings.restore) settings.restore = {};
            settings.restore.savedStatus = s?.text ? s : null;
            this._fetched = null;
            _dirty = true; save();
            updateRestoreDisplay();
            btnFlash(this, origRef, "success", "\u2713 Stored");
            toast("Status saved","success");
        };
        const fetched = this._fetched;
        if (fetched) { persist(fetched); return; }
        const token = settings.credentials?.token;
        if (!token) { toast("No Discord token set","error"); return; }
        withBtnSpinner(this, (orig, reset) => {
            fetch("https://discordapp.com/api/v8/users/@me/settings", { headers:{ Authorization:token } })
                .then(r => { if(!r.ok) throw r.status; return r.json(); })
                .then(j => persist(j?.custom_status))
                .catch(() => { btnFlash(this,orig,"danger","\u2717 Failed"); toast("Failed to fetch status","error"); });
        });
    });
});

// -- Discord profile card + equalizer --------------------------------------
(function() {
    let _cardToken = null, _cardFetched = false, _songPollInterval = null;

    function setEq(playing) {
        document.querySelectorAll(".eq-bar").forEach(b => b.classList.toggle("paused", !playing));
    }

    function updateSongDisplay(songName, songAuthor, isPlaying) {
        const notPlaying = document.getElementById("dc-not-playing");
        const songEl     = document.getElementById("dc-song");
        const songText   = document.getElementById("dc-song-text");
        if (songName) {
            if (notPlaying) notPlaying.style.display = "none";
            if (songEl)    { songEl.style.display = "flex"; }
            if (songText)  songText.textContent = (songAuthor ? songAuthor + " \u2014 " : "") + songName;
            setEq(isPlaying);
        } else {
            if (notPlaying) notPlaying.style.display = "";
            if (songEl)    songEl.style.display = "none";
            setEq(false);
        }
    }

    function fetchDiscordProfile(token) {
        if (!token || _cardFetched) return;
        _cardFetched = true;
        fetch("https://discordapp.com/api/v8/users/@me", { headers: { Authorization: token } })
            .then(r => r.ok ? r.json() : null)
            .then(u => {
                if (!u) return;
                const nameEl   = document.getElementById("dc-name");
                const tagEl    = document.getElementById("dc-tag");
                const avatarEl = document.getElementById("dc-avatar");
                const avatarPh = document.getElementById("dc-avatar-ph");
                if (nameEl) nameEl.textContent = u.global_name || u.username || "Unknown";
                if (tagEl)  tagEl.textContent  = u.username ? "@" + u.username : "";
                if (u.avatar && avatarEl) {
                    avatarEl.src = "https://cdn.discordapp.com/avatars/" + u.id + "/" + u.avatar + ".webp?size=128";
                    avatarEl.style.display = "";
                    if (avatarPh) avatarPh.style.display = "none";
                }
            })
            .catch(() => { _cardFetched = false; });

        fetch("https://discordapp.com/api/v8/users/@me/settings", { headers: { Authorization: token } })
            .then(r => r.ok ? r.json() : null)
            .then(s => {
                if (!s) return;
                const pip    = document.getElementById("dc-pip");
                const csEl   = document.getElementById("dc-custom-status");
                const status = s.status || "online";
                if (pip) { pip.className = "dc-status-pip " + status; }
                if (csEl && s.custom_status?.text) {
                    csEl.textContent = (s.custom_status.emoji_name ? s.custom_status.emoji_name + " " : "") + s.custom_status.text;
                } else if (csEl) { csEl.textContent = ""; }
            })
            .catch(() => {});
    }

    const _origApply = typeof applyToDom === "function" ? applyToDom : null;

    function onSettingsUpdate() {
        const token = settings?.credentials?.token;
        if (token && token !== _cardToken) {
            _cardToken = token;
            _cardFetched = false;
            fetchDiscordProfile(token);
        }
    }

    if (typeof window !== "undefined") {
        const _orig = window.applyToDom;
        if (typeof _orig === "function") {
            window.applyToDom = function() { _orig.apply(this, arguments); onSettingsUpdate(); };
        }
    }

    window._setNowPlaying = updateSongDisplay;

    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function poll() {
            if (typeof settings !== "undefined") onSettingsUpdate();
            setTimeout(poll, 5000);
        }, 1000);
    });
})();
