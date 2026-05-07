$(`
<div id="menu-UI" class="act-anim">
    <div class="settings-page">
        <header class="settings-header">
            <div class="settings-header-main">
                <h1 class="settings-title">Lyrics Status Settings</h1>
                <p class="settings-subtitle">Reads the currently playing song from your OS and shows synced lyrics in your Discord status.</p>
            </div>
            <div class="settings-header-meta">
                <span id="version" class="settings-version">v4</span>
            </div>
        </header>

        <main id="menu-contents" class="settings-content">
            <section class="settings-section">
                <h2 class="settings-name">Discord</h2>
                <p class="settings-description">Your Discord user token is stored locally and only used to update your custom status.</p>

                <div class="option form-row">
                    <label class="form-label" for="user-token">Discord token</label>
                    <div class="form-field">
                        <div class="form-field-inline">
                            <input type="text" id="user-token" class="text-input1 full-width-input" placeholder="Paste your Discord user token">
                            <button id="check-token" class="button1"><span class="label">Check</span></button>
                        </div>
                    </div>
                </div>
            </section>

            <section class="settings-section">
                <h2 class="settings-name">Status preview</h2>
                <p class="settings-description">Choose what appears in your Discord custom status while music is playing.</p>

                <div class="option form-row">
                    <label class="checkbox-row" for="enable-timestamp">
                        <input type="checkbox" id="enable-timestamp" checked>
                        <span>Show playback timestamp</span>
                    </label>
                </div>

                <div class="option form-row">
                    <label class="checkbox-row" for="enable-label">
                        <input type="checkbox" id="enable-label" checked>
                        <span>Show label before lyrics ("Song lyrics -")</span>
                    </label>
                </div>

                <div class="option form-row">
                    <div class="form-label">Live preview</div>
                    <div class="form-field">
                        <div id="status-preview" class="b-area">[2:17] Song lyrics - La-la-la</div>
                    </div>
                </div>

                <div class="divider"></div>

                <div class="option form-row">
                    <label class="checkbox-row" for="enable-advanced-swt">
                        <input type="checkbox" id="enable-advanced-swt">
                        <span>Enable advanced custom status template</span>
                    </label>
                </div>

                <div id="advanced-swt" class="sub-settings hid">
                    <div class="option form-row">
                        <label class="form-label" for="custom-emoji">
                            Custom emoji
                            <img id="custom-emoji-help" class="clickable question-mark1" src="https://www.pngall.com/wp-content/uploads/5/Help-Question-Mark-PNG-Free-Download.png" height="15" alt="Help">
                        </label>
                        <input style="width: 60px;" maxlength="4" id="custom-emoji" class="text-input1" placeholder="🎶">
                    </div>

                    <div class="option form-row">
                        <label class="form-label" for="custom-status">
                            Custom status template
                            <img id="custom-status-help" class="clickable question-mark1" src="https://www.pngall.com/wp-content/uploads/5/Help-Question-Mark-PNG-Free-Download.png" height="15" alt="Help">
                        </label>
                        <div class="form-field">
                            <textarea rows="3" cols="40" id="custom-status" class="text-input2" placeholder="[{timestamp}] Song lyrics - {lyrics}"></textarea>
                            <small class="field-help">Placeholders: {lyrics}, {song_name}, {song_author}, {timestamp}. Status is cropped to 128 characters.</small>
                        </div>
                    </div>
                </div>
            </section>

            <section class="settings-section">
                <h2 class="settings-name">Timing</h2>
                <p class="settings-description">Fine-tune how early or late your status changes compared to the actual lyrics.</p>

                <div class="option form-row">
                    <label class="form-label" for="send-time-offset">Send time offset (ms)</label>
                    <div class="form-field-inline">
                        <input type="text" id="send-time-offset" class="text-input1" maxlength="4" value="500">
                        <img id="send-time-offset-help" class="clickable question-mark1" src="https://www.pngall.com/wp-content/uploads/5/Help-Question-Mark-PNG-Free-Download.png" height="15" alt="Help">
                    </div>
                </div>

                <div class="option form-row">
                    <label class="checkbox-row" for="enable-autooffset">
                        <input type="checkbox" id="enable-autooffset">
                        <span>Enable Autooffset (auto-calculated delay)</span>
                    </label>
                </div>

                <div class="option form-row">
                    <label class="form-label" for="autooffset">Autooffset samples</label>
                    <div class="form-field-inline">
                        <input style="width: 60px;" id="autooffset" class="text-input1" type="text" maxlength="2">
                        <span class="inline-text">requests</span>
                        <img id="autooffset-help" class="clickable question-mark1" src="https://www.pngall.com/wp-content/uploads/5/Help-Question-Mark-PNG-Free-Download.png" height="15" style="left: 1px;" alt="Help">
                    </div>
                </div>
            </section>

            <section class="settings-section">
                <h2 class="settings-name">Updates</h2>
                <p class="settings-description">Keep Lyrics Status up to date with the latest fixes and features.</p>

                <div class="option form-row">
                    <label class="checkbox-row" for="enable-autoupdate">
                        <input type="checkbox" id="enable-autoupdate">
                        <span>Enable automatic update checks</span>
                    </label>
                </div>
            </section>
        </main>
    </div>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

        :root { --alpha: .9; }

        #menu-UI {
            position: fixed; inset: 0; width: 100%; height: 100%;
            background: radial-gradient(circle at top left, rgba(60,63,68,var(--alpha)), rgba(24,26,27,var(--alpha)));
            z-index: 999; overflow-y: auto;
        }
        #menu-UI * { color: rgba(230,230,230,var(--alpha)); font-family: Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }

        .settings-page { max-width: 900px; margin: 32px auto 40px; padding: 8px 24px 32px; }

        .settings-header { display: flex; justify-content: space-between; gap: 24px; margin-bottom: 24px; align-items: flex-end; }
        .settings-title  { margin: 0 0 4px; font-size: 26px; font-weight: 600; }
        .settings-subtitle { margin: 0; font-size: 14px; color: rgba(200,200,200,var(--alpha)); }
        .settings-version { font-size: 12px; padding: 4px 10px; border-radius: 999px; background: rgba(75,85,99,.8); text-transform: uppercase; letter-spacing: .08em; }

        .settings-section { padding: 16px 0 12px; border-bottom: 1px solid rgba(50,52,55,var(--alpha)); }
        .settings-section:last-of-type { border-bottom: none; }
        .settings-name { font-size: 18px; font-weight: 600; margin: 0 0 4px; }
        .settings-description { margin: 0 0 12px; font-size: 13px; color: rgba(195,195,195,var(--alpha)); }

        .option { margin-top: 10px; }
        .form-row { display: flex; align-items: flex-start; gap: 12px; }
        .form-label { width: 160px; font-size: 13px; font-weight: 500; padding-top: 4px; }
        .form-field { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .form-field-inline { display: inline-flex; align-items: center; gap: 8px; }
        .full-width-input { width: 100%; max-width: 100%; }
        .field-help { font-size: 11px; color: rgba(180,180,180,var(--alpha)); }
        .inline-text { font-size: 12px; color: rgba(210,210,210,var(--alpha)); }
        .checkbox-row { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; }

        .text-input1, .text-input2 {
            border: 1px solid rgba(75,75,75,var(--alpha)); border-radius: 4px;
            background: rgba(35,37,40,var(--alpha)); color: rgba(235,235,235,var(--alpha));
            padding: 6px 10px; font-size: 13px; outline: none;
            transition: border-color .15s ease, background .15s ease, box-shadow .15s ease;
        }
        .text-input1:focus, .text-input2:focus {
            border-color: rgba(88,166,255,.9); box-shadow: 0 0 0 1px rgba(88,166,255,.4);
            background: rgba(26,28,32,var(--alpha));
        }
        .text-input2 { resize: vertical; min-height: 70px; line-height: 1.4; }

        .button1 {
            min-width: 90px; height: 32px; padding: 0 12px; font-size: 13px;
            border: none; border-radius: 4px; background: rgba(75,85,99,.9);
            color: white; cursor: pointer;
            transition: background 1s ease, transform 1s ease, box-shadow 1s ease;
        }
        .button1:hover  { background: rgba(107,114,128,.95); }
        .button1:active { transform: translateY(1px); box-shadow: none; }
        .button1.success { background: rgba(34,197,94,.95); box-shadow: 0 4px 12px rgba(34,197,94,.35); }
        .button1.error   { background: rgba(239,68,68,.95);  box-shadow: 0 4px 12px rgba(239,68,68,.35); }
        .button1 .label  { display: inline-block; transition: opacity .2s ease; }

        .b-area {
            border: 1px solid rgba(75,85,99,var(--alpha)); border-radius: 999px;
            padding: 6px 16px; background: rgba(24,26,27,var(--alpha));
            font-family: "SF Mono",Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
            font-size: 12px; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px;
        }

        .divider { height: 1px; background: rgba(50,52,55,var(--alpha)); margin: 12px 0; }

        .sub-settings {
            margin-top: 6px; padding: 10px 12px 12px;
            border-radius: 6px; background: rgba(17,19,21,var(--alpha));
            border: 1px dashed rgba(75,85,99,var(--alpha));
        }

        .clickable { cursor: pointer; }
        .question-mark1 {
            bottom: 0; right: 0; margin-right: 0; position: relative;
            filter: invert(70%) sepia(4%) saturate(459%) hue-rotate(173deg) brightness(90%) contrast(86%);
        }

        .act { display: block; }
        .hid { display: none; }

        .modal {
            min-width: 300px; max-width: 700px; width: fit-content; height: fit-content;
            background: rgba(32,34,36,var(--alpha)); top: 50%; left: 50%;
            transform: translate(-50%,-50%); border-radius: 8px;
            box-shadow: 0 18px 45px rgba(0,0,0,.65); font-size: 14px; z-index: 9999; position: absolute;
        }
        .modal * { user-select: none; }
        .modal > .top {
            width: 100%; height: 32px; background: rgba(17,24,39,var(--alpha));
            border-top-left-radius: 8px; border-top-right-radius: 8px;
            box-shadow: 0 1px 0 rgba(15,23,42,.9);
            display: flex; align-items: center; justify-content: space-between; padding: 0 8px;
        }
        .modal > .top > .title { font-size: 13px; font-weight: 500; }
        .modal > .top > .close {
            width: 22px; height: 22px; background: rgba(239,68,68,var(--alpha));
            border-radius: 999px; display: flex; align-items: center; justify-content: center; cursor: pointer;
        }
        .modal > .description { padding: 10px 12px 12px; text-align: left; }

        #menu-UI::-webkit-scrollbar { width: 10px; }
        #menu-UI::-webkit-scrollbar-thumb { border-radius: 5px; background: rgba(65,65,65,var(--alpha)); }
        #menu-UI::-webkit-scrollbar-thumb:hover { background: rgba(75,75,75,var(--alpha)); }
    </style>
</div>
`).appendTo(document.body);

// ── Element refs ──────────────────────────────────────────────────────────────
let userTokenInput        = $("#user-token"),
    checkTokenButton      = $("#check-token"),
    enableTimestampCheckbox = $("#enable-timestamp"),
    enableLabelCheckbox   = $("#enable-label"),
    statusPreview         = $("#status-preview"),
    advancedSWT           = $("#advanced-swt"),
    enableAdvancedSWT     = $("#enable-advanced-swt"),
    customEmojiHelp       = $("#custom-emoji-help"),
    customEmoji           = $("#custom-emoji"),
    customStatusHelp      = $("#custom-status-help"),
    customStatus          = $("#custom-status"),
    sendTimeOffset        = $("#send-time-offset"),
    sendTimeOffsetHelp    = $("#send-time-offset-help"),
    enableAutooffset      = $("#enable-autooffset"),
    autooffset            = $("#autooffset"),
    autooffsetHelp        = $("#autooffset-help"),
    enableAutoupdate      = $("#enable-autoupdate");

// ── Settings model ────────────────────────────────────────────────────────────
let settings = {
    credentials: { token: "", uuid: "" },
    view: {
        timestamp: true,
        label: true,
        advanced: { enabled: false, customEmoji: "🎶", customStatus: "[{timestamp}] Song lyrics - {lyrics}" }
    },
    timings:  { sendTimeOffset: 500, enableAutooffset: true, autooffset: 3 },
    update:   { enableAutoupdate: true }
};

let settingsLoaded = false;

// ── Event handlers ────────────────────────────────────────────────────────────
userTokenInput.change(() => {
    settings.credentials.token = userTokenInput.val().replace(/"/g, "");
    saveSettings();
});

checkTokenButton.click(() => {
    const label = checkTokenButton.find(".label");
    const originalText = label.text();
    checkTokenButton.removeClass("success error");
    label.css("opacity", 0);

    let valid = checkToken(settings.credentials.token);

    setTimeout(() => {
        checkTokenButton.addClass(valid ? "success" : "error");
        label.text(valid ? "✔" : "✖").css("opacity", 1);

        setTimeout(() => {
            label.css("opacity", 0);
            setTimeout(() => {
                label.text(originalText).css("opacity", 1);
                checkTokenButton.removeClass("success error");
            }, 200);
        }, 3000);
    }, 200);
});

enableTimestampCheckbox.click(() => {
    settings.view.timestamp = enableTimestampCheckbox.prop("checked");
    saveSettings();
    statusPreview.text(getStatusString("La-la-la", 137000));
});

enableLabelCheckbox.click(() => {
    settings.view.label = enableLabelCheckbox.prop("checked");
    saveSettings();
    statusPreview.text(getStatusString("La-la-la", 137000));
});

enableAdvancedSWT.click(() => {
    const state = enableAdvancedSWT.prop("checked");
    settings.view.advanced.enabled = state;
    saveSettings();
    advancedSWT.toggleClass("hid").toggleClass("act");
    enableTimestampCheckbox.prop("disabled", state);
    enableLabelCheckbox.prop("disabled", state);
});

customEmojiHelp.click(() => modal("Help",
    "<strong>Custom emoji</strong> lets you add a unicode emoji before your status. " +
    "Get one <a style='color:rgba(154,154,154,var(--alpha))' href='https://www.piliapp.com/emoji/list/'>here</a>."
));

customEmoji.on("input", (e) => {
    e.preventDefault();
    settings.view.advanced.customEmoji = customEmoji.val();
    saveSettings();
});

customStatusHelp.click(() => modal("Help",
    "<strong>Custom status template</strong> — use {lyrics}, {song_name}, {song_author}, {timestamp} as placeholders.<br>" +
    "Status is automatically cropped to 128 characters."
));

customStatus.on("input", (e) => {
    e.preventDefault();
    settings.view.advanced.customStatus = customStatus.val();
    saveSettings();
});

sendTimeOffset.on("input", (e) => {
    e.preventDefault();
    const value = +sendTimeOffset.val();
    if (isNaN(value)) {
        sendTimeOffset.css("color", "rgba(200,0,0,var(--alpha))");
        return;
    }
    sendTimeOffset.css("color", "inherit");
    settings.timings.sendTimeOffset = value;
    saveSettings();
});

sendTimeOffsetHelp.click(() => modal("Help",
    "Offset makes status changes appear slightly before the lyrics line to feel more in sync.<br>" +
    "Defined in milliseconds. Default is 500."
));

enableAutooffset.click(() => {
    settings.timings.enableAutooffset = enableAutooffset.prop("checked");
    saveSettings();
});

autooffset.on("input", (e) => {
    e.preventDefault();
    const value = +autooffset.val();
    if (isNaN(value)) { autooffset.css("color", "rgba(200,0,0,var(--alpha))"); return; }
    autooffset.css("color", "inherit");
    settings.timings.autooffset = value;
    saveSettings();
});

autooffsetHelp.click(() => modal("Help",
    "Autooffset calculates the average Discord API response time and adjusts the offset automatically."
));

enableAutoupdate.click(() => {
    settings.update.enableAutoupdate = enableAutoupdate.prop("checked");
    saveSettings();
});

// ── Util ──────────────────────────────────────────────────────────────────────
function formatSeconds(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

function getStatusString(lyrics, time) {
    return `${settings.view.timestamp ? `[${formatSeconds((time / 1000).toFixed(0))}] ` : ""}${settings.view.label ? "Song lyrics - " : ""}${lyrics.replace("♪", "🎶")}`;
}

function checkToken(token) {
    let success = true;
    $.get({
        url: "https://discordapp.com/api/v8/users/@me",
        headers: { "Authorization": token },
        async: false,
        statusCode: { 401: () => success = false }
    });
    return success;
}

function saveSettings() {
    if (!settingsLoaded) return console.error("Can't save before settings are loaded.");
    ws.send(JSON.stringify(settings));
}

function loadSettings(raw) {
    const loaded = JSON.parse(raw);
    settings = $.extend(true, settings, loaded);

    try {
        userTokenInput.val(settings.credentials.token);
        enableTimestampCheckbox.prop("checked", settings.view.timestamp);
        enableLabelCheckbox.prop("checked", settings.view.label);
        if (settings.view.advanced.enabled) enableAdvancedSWT.click();
        customEmoji.val(settings.view.advanced.customEmoji);
        customStatus.html(settings.view.advanced.customStatus);
        statusPreview.text(getStatusString("La-la-la", 137000));
        sendTimeOffset.val(settings.timings.sendTimeOffset);
        enableAutooffset.prop("checked", settings.timings.enableAutooffset);
        autooffset.val(settings.timings.autooffset);
        enableAutoupdate.prop("checked", settings.update.enableAutoupdate);
        settingsLoaded = true;
    } catch (e) {
        console.error(e);
    }
}

function modal(title, description, styles = {}) {
    const w = $(`
    <div class="modal">
        <div class="top">
            <span class="title" style="color:${styles.titleTextColor || "white"}">${title}</span>
            <div class="close"><img class="closeMark" src="https://www.nicepng.com/png/full/61-612286_clip-art-check-mark-close-x-icon-png.png" height="14"></div>
        </div>
        <div class="description" style="color:${styles.descriptionTextColor || "white"}">${description}</div>
    </div>`).appendTo(document.body);

    w.find(".close").click(() => w.remove());
}

// ── WebSocket ─────────────────────────────────────────────────────────────────
const ws = new WebSocket("ws://localhost:8999/ws");
ws.onmessage = (msg) => loadSettings(msg.data);
