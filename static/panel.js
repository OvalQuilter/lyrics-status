$(`
<div id="menu-UI" class="act-anim">
    <div class="settings-page">
        <header class="settings-header">
            <div class="settings-header-main">
                <h1 class="settings-title">Lyrics Status Settings</h1>
                <p class="settings-subtitle">Configure how Lyrics Status connects to Discord and displays your current song.</p>
            </div>
            <div class="settings-header-meta">
                <span id="version" class="settings-version">v3</span>
            </div>
        </header>

    <main id="menu-contents" class="settings-content">
            <section id="settings-tab" class="tab-content act">

                <section class="settings-section">
                    <h2 class="settings-name">Authentication</h2>
                    <p class="settings-description">These credentials are stored locally and used only to talk to Discord and Spotify on your behalf.</p>

                    <div class="option form-row">
                        <label class="form-label" for="user-token">Discord token</label>
                        <div class="form-field">
                            <div class="form-field-inline">
                                <input type="text" id="user-token" class="text-input1 full-width-input" placeholder="Paste your Discord user token">
                                <button id="check-token" class="button1"><span class="label">Check</span></button>
                            </div>
                        </div>
                    </div>

                    <div class="option form-row">
                        <label class="form-label" for="client-id">Spotify client ID</label>
                        <div class="form-field">
                            <input type="text" id="client-id" class="text-input1" placeholder="Your Spotify application client ID">
                        </div>
                    </div>

                    <div class="option form-row">
                        <label class="form-label" for="client-secret">Spotify client secret</label>
                        <div class="form-field">
                            <input type="text" id="client-secret" class="text-input1" placeholder="Your Spotify application client secret">
                        </div>
                    </div>

                    <div class="option form-row">
                            <label class="form-label" for="custom-redirect-uri">Redirect URI</label>
                            <div class="form-field">
                                <input type="text" id="custom-redirect-uri" class="text-input1" placeholder="The redirect URI you added in your Spotify app settings">
                                <small class="field-help">Must exactly match one of the redirect URIs configured in your Spotify application.</small>
                            </div>
                        </div>

                    <div class="option form-row">
                            <span class="form-label"></span>
                            <div class="form-field auth-actions">
                                <button id="authorize-spotify" class="button1 primary full-width-button">Authorize Spotify</button>
                                <div class="auth-row-bottom">
                                    <label class="checkbox-row" for="use-external-auth-server">
                                        <input type="checkbox" id="use-external-auth-server">
                                        <span>Use external auth server</span>
                                    </label>
                                    <div id="spotify-authorized-indicator" class="auth-indicator hid">Authorized!</div>
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
                                    <small class="field-help">Use placeholders like {lyrics}, {song_name}, {song_author}, {timestamp}. Your status will be cropped to 128 characters if needed.</small>
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

                <section class="settings-section">
                    <h2 class="settings-name">Rate Limiting</h2>
                    <p class="settings-description">Discord limits how often your custom status can be updated. These options help avoid hitting that limit.</p>

                    <div class="option form-row">
                        <label class="checkbox-row" for="enable-backoff">
                            <input type="checkbox" id="enable-backoff" checked>
                            <span>Auto backoff when rate limited</span>
                        </label>
                    </div>
                    <div class="option form-row" style="margin-left: 24px;">
                        <small class="field-help">When Discord returns a rate limit response, automatically pause sending for the suggested retry window.</small>
                    </div>

                    <div class="option form-row" style="margin-top: 14px;">
                        <label class="checkbox-row" for="enable-min-interval">
                            <input type="checkbox" id="enable-min-interval" checked>
                            <span>Minimum interval between updates</span>
                        </label>
                    </div>
                    <div class="option form-row" style="margin-left: 24px; align-items: center; gap: 8px;">
                        <input type="number" id="min-interval-ms" class="text-input1" style="width: 80px;" min="1000" max="60000" step="500" value="5000">
                        <span class="inline-text">ms between sends</span>
                    </div>
                    <div class="option form-row" style="margin-left: 24px;">
                        <small class="field-help">Prevents sending faster than this interval regardless of lyric timing. 5000ms (5s) is a safe default.</small>
                    </div>

                    <div class="option form-row" style="margin-top: 14px;">
                        <label class="checkbox-row" for="enable-merge-lines">
                            <input type="checkbox" id="enable-merge-lines" checked>
                            <span>Merge nearby lyric lines into one status</span>
                        </label>
                    </div>
                    <div class="option form-row" style="margin-left: 24px; align-items: center; gap: 8px;">
                        <input type="number" id="merge-window-ms" class="text-input1" style="width: 80px;" min="1000" max="30000" step="500" value="8000">
                        <span class="inline-text">ms merge window</span>
                    </div>
                    <div class="option form-row" style="margin-left: 24px;">
                        <small class="field-help">Lines closer together than this window are joined with a space into a single status update, reducing total sends.</small>
                    </div>
                </section>
            </section>
        </main>
    </div>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

        :root {
            --alpha: .9;
        }

        /* Full-page layout */
        #menu-UI {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at top left, rgba(60, 63, 68, var(--alpha)), rgba(24, 26, 27, var(--alpha)));
            z-index: 999;
            overflow-y: auto;
        }

        #menu-UI * {
            color: rgba(230, 230, 230, var(--alpha));
            font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .settings-page {
            max-width: 900px;
            margin: 32px auto 40px auto;
            padding: 8px 24px 32px 24px;
        }

        .settings-header {
            display: flex;
            justify-content: space-between;
            gap: 24px;
            margin-bottom: 24px;
            align-items: flex-end;
        }

        .settings-title {
            margin: 0 0 4px 0;
            font-size: 26px;
            font-weight: 600;
        }

        .settings-subtitle {
            margin: 0;
            font-size: 14px;
            color: rgba(200, 200, 200, var(--alpha));
        }

        .settings-version {
            font-size: 12px;
            padding: 4px 10px;
            border-radius: 999px;
            background: rgba(75, 85, 99, 0.8);
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }

        .settings-content {
            display: block;
        }

        /* Settings list */
        .settings-section {
            padding: 16px 0 12px 0;
            border-bottom: 1px solid rgba(50, 52, 55, var(--alpha));
        }

        .settings-section:last-of-type {
            border-bottom: none;
        }

        .settings-name {
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 4px 0;
        }

        .settings-description {
            margin: 0 0 12px 0;
            font-size: 13px;
            color: rgba(195, 195, 195, var(--alpha));
        }

        .option {
            margin-top: 10px;
        }

        .form-row {
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }

        .form-label {
            width: 160px;
            font-size: 13px;
            font-weight: 500;
            padding-top: 4px;
        }

        .form-field {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .form-field-inline {
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .full-width-input {
            width: 100%;
            max-width: 100%;
        }

        .field-help {
            font-size: 11px;
            color: rgba(180, 180, 180, var(--alpha));
        }

        .inline-text {
            font-size: 12px;
            color: rgba(210, 210, 210, var(--alpha));
        }

        .checkbox-row {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            cursor: pointer;
        }

        .auth-indicator {
            font-size: 12px;
            color: #22c55e !important; /* force bright green */
            margin-top: 0;
        }

        .full-width-button {
            width: 100%;
            justify-content: center;
        }

        .auth-row-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 6px;
        }

        /* Inputs & buttons */
        .text-input1,
        .text-input2 {
            border: 1px solid rgba(75, 75, 75, var(--alpha));
            border-radius: 4px;
            background: rgba(35, 37, 40, var(--alpha));
            color: rgba(235, 235, 235, var(--alpha));
            padding: 6px 10px;
            font-size: 13px;
            outline: none;
            transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
        }

        .text-input1:focus,
        .text-input2:focus {
            border-color: rgba(88, 166, 255, 0.9);
            box-shadow: 0 0 0 1px rgba(88, 166, 255, 0.4);
            background: rgba(26, 28, 32, var(--alpha));
        }

        .text-input1:disabled,
        .text-input2:disabled {
            color: rgba(184, 184, 184, var(--alpha)) !important;
            background: rgba(48, 48, 48, var(--alpha));
        }

        .text-input2 {
            resize: vertical;
            min-height: 70px;
            line-height: 1.4;
        }

        .button1 {
            min-width: 90px;
            height: 32px;
            padding: 0 12px;
            font-size: 13px;
            border: none;
            border-radius: 4px;
            background: rgba(75, 85, 99, 0.9);
            color: white;
            cursor: pointer;
            transition: background 1s ease, transform 1s ease, box-shadow 1s ease;
        }

        .button1.primary {
            background: rgba(56, 189, 248, 0.95);
            box-shadow: 0 4px 12px rgba(56, 189, 248, 0.35);
        }

        .button1:hover {
            background: rgba(107, 114, 128, 0.95);
        }

        .button1.primary:hover {
            background: rgba(14, 165, 233, 0.98);
        }

        .button1:active {
            transform: translateY(1px);
            box-shadow: none;
        }

        .button1.success {
            background: rgba(34, 197, 94, 0.95);
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.35);
        }

        .button1.error {
            background: rgba(239, 68, 68, 0.95);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35);
        }

        .button1 .label {
            display: inline-block;
            transition: opacity 0.2s ease;
        }

        #check-token {
            width: auto;
        }

        /* Preview badge */
        .b-area {
            border: 1px solid rgba(75, 85, 99, var(--alpha));
            border-radius: 999px;
            padding: 6px 16px;
            background: rgba(24, 26, 27, var(--alpha));
            font-family: "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-size: 12px;
            white-space: nowrap;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        /* Misc */
        .divider {
            height: 1px;
            background: rgba(50, 52, 55, var(--alpha));
            margin: 12px 0;
        }

        .sub-settings {
            margin-left: 0;
            margin-top: 6px;
            padding: 10px 12px 12px 12px;
            border-radius: 6px;
            background: rgba(17, 19, 21, var(--alpha));
            border: 1px dashed rgba(75, 85, 99, var(--alpha));
        }

        .clickable {
            cursor: pointer;
        }

        .question-mark1 {
            bottom: 0;
            right: 0;
            margin-right: 0;
            filter: invert(70%) sepia(4%) saturate(459%) hue-rotate(173deg) brightness(90%) contrast(86%);
            position: relative;
        }

        .fw-500 {
            font-weight: 500;
        }
        .fw-700 {
            font-weight: 700;
        }

        .act {
            display: block;
        }
        .hid {
            display: none;
        }

        /* Modal styles (kept, but visually aligned with new UI) */
        .modal {
            min-width: 300px;
            min-height: 100px;
            max-width: 700px;
            max-height: 450px;
            width: fit-content;
            height: fit-content;
            background: rgba(32, 34, 36, var(--alpha));
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 8px;
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.65);
            font-size: 14px;
            z-index: 9999;
            position: absolute;
        }

        .modal * {
            user-select: none;
        }

        .modal > .top {
            width: 100%;
            height: 32px;
            background: rgba(17, 24, 39, var(--alpha));
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            box-shadow: 0 1px 0 rgba(15, 23, 42, 0.9);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 8px;
        }

        .modal > .top > .title {
            font-size: 13px;
            font-weight: 500;
        }

        .modal > .top > .close {
            width: 22px;
            height: 22px;
            background: rgba(239, 68, 68, var(--alpha));
            border-radius: 999px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .modal > .top > .close > .closeMark {
            position: relative;
        }

        .modal > .description {
            padding: 10px 12px 12px 12px;
            text-align: left;
        }

        @keyframes light {
            from { filter: invert(39%) sepia(0%) saturate(0%) hue-rotate(339deg) brightness(94%) contrast(90%); }
            to { filter: invert(82%) sepia(7%) saturate(0%) hue-rotate(154deg) brightness(82%) contrast(90%); }
        }

        /* Scrollbar styling */
        #menu-UI::-webkit-scrollbar {
            width: 10px;
        }
        #menu-UI::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background: rgba(65, 65, 65, var(--alpha));
        }
        #menu-UI::-webkit-scrollbar-thumb:hover {
            background: rgba(75, 75, 75, var(--alpha));
        }
    </style>
</div>
`).appendTo(document.body);
// HTML and CSS

let menu                    = $("#menu-UI"),
    userTokenInput          = $("#user-token"),
    checkTokenButton        = $("#check-token"),
    clientIDInput           = $("#client-id"),
    clientSecretInput       = $("#client-secret"),
    customRedirectUriInput  = $("#custom-redirect-uri"),
    useExternalAuthServer   = $("#use-external-auth-server"),
    spotifyAuthorizedIndicator = $("#spotify-authorized-indicator"),
    authorizeButton         = $("#authorize-spotify"),
    enableTimestampCheckbox = $("#enable-timestamp"),
    enableLabelCheckbox     = $("#enable-label"),
    statusPreview           = $("#status-preview"),
    advancedSWT             = $("#advanced-swt"),
    enableAdvancedSWT       = $("#enable-advanced-swt"),
    customEmojiHelp         = $("#custom-emoji-help"),
    customEmoji             = $("#custom-emoji"),
    customStatusHelp        = $("#custom-status-help"),
    customStatus            = $("#custom-status"),
    sendTimeOffset          = $("#send-time-offset"),
    sendTimeOffsetHelp      = $("#send-time-offset-help"),
    enableAutooffset        = $("#enable-autooffset"),
    autooffset              = $("#autooffset"),
    autooffsetHelp          = $("#autooffset-help"),
    enableAutoupdate        = $("#enable-autoupdate"),
    enableBackoff           = $("#enable-backoff"),
    enableMinInterval       = $("#enable-min-interval"),
    minIntervalMs           = $("#min-interval-ms"),
    enableMergeLines        = $("#enable-merge-lines"),
    mergeWindowMs           = $("#merge-window-ms");
// Elements

let settings = {
    credentials: {
        token: "",
        cookies: "",
        clientID: "",
        clientSecret: "",
        useExternalAuthServer: false,
    code: "",
    refreshToken: "",
        uuid: "",
        customRedirectUri: ""
    },
    view: {
        timestamp: true,
        label: true,
        advanced: {
            enabled: false,
            customEmoji: "🎶",
            customStatus: "[{timestamp}] Song lyrics - {lyrics}"
        }
    },
    timings: {
        sendTimeOffset: 500,
        enableAutooffset: true,
        autooffset: 3
    },
    update: {
        enableAutoupdate: true
    },
    rateLimit: {
        enableBackoff: true,
        enableMinInterval: true,
        minIntervalMs: 5000,
        enableMergeLines: true,
        mergeWindowMs: 8000
    }
}
// Settings

let settingsLoaded = false;
// Misc, in-session variables

$(".tab-button").each((i, tab) => {
    tab = $(tab);

    tab.click(() => {
        $(".tab-button").each((ti, ctab) => {
            ctab = $(ctab);

            if(i === ti) {

                ctab.addClass("cur-tab");
                $(".tab-content").each((ci, cc) => {
                    cc = $(cc);

                    if(ti === ci) {

                        cc.removeClass("hid").addClass("act");
                    } else {
                        cc.removeClass("act").addClass("hid");
                    }
                });
            } else {
                ctab.removeClass("cur-tab");
            }
        });
    });
});
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
        if (!valid) {
            checkTokenButton.addClass("error");
            label.text("✖");
        } else {
            checkTokenButton.addClass("success");
            label.text("âœ”");
        }

        label.css("opacity", 1);

        setTimeout(() => {
            label.css("opacity", 0);

            setTimeout(() => {
                label.text(originalText);
                label.css("opacity", 1);
                checkTokenButton.removeClass("success error");
            }, 200);
        }, 3000);
    }, 200);
});
clientIDInput.change(() => {
    settings.credentials.clientID = clientIDInput.val();
    saveSettings();
});
clientSecretInput.change(() => {
    settings.credentials.clientSecret = clientSecretInput.val();
    saveSettings();
});
customRedirectUriInput.change(() => {
    settings.credentials.customRedirectUri = customRedirectUriInput.val();
    saveSettings();
});
authorizeButton.click(() => {
    const clientId = settings.credentials.clientID;
    const redirectUri = settings.credentials.customRedirectUri;
    if (settings.credentials.useExternalAuthServer) {
        window.open("https://rocky-quintessential-island.glitch.me/login/" + settings.credentials.uuid, "_blank")
    } else {
        window.open(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent("user-read-playback-state user-read-currently-playing")}`, '_blank');
    }
});
useExternalAuthServer.click(() => {
    settings.credentials.useExternalAuthServer = useExternalAuthServer.prop("checked");
    saveSettings();
})
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
    let state = enableAdvancedSWT.prop("checked");

    settings.view.advanced.enabled = state;
    saveSettings();

    advancedSWT
        .toggleClass("hid")
        .toggleClass("act");
    enableTimestampCheckbox.prop("disabled", state);
    enableLabelCheckbox.prop("disabled", state);
});
customEmojiHelp.click(() => {
    modal("Help", `
    <strong>Custom emoji</strong> option allows you to add an emoji before your status.<br>
    Use a unicode emoji. You can get it <a style="color: rgba(154, 154, 154, var(--alpha));" href="https://www.piliapp.com/emoji/list/">here</a>.
    `);
});
customEmoji.on("input", (e) => {
    e.preventDefault();
    let value = customEmoji.val();

    settings.view.advanced.customEmoji = value;
    saveSettings();
});
customStatusHelp.click(() => {
    modal("Help", `
    <strong>Custom status</strong> option allows you to customise your status as you want.<br>
    To display text such as lyrics or timestamp you need to put it in {} brackets.<br>List of all variables you can use (upper/lower attribute means uppercased/lowercased text):<br>
    {lyrics}, {lyrics_upper}, {lyrics_lower}, {lyrics_letters_only}, {lyrics_upper_letters_only}, {lyrics_lower_letters_only} - These variables contains current synchronized lyrics. <strong>letters_only</strong> attribute means there's no punctuations like dots and commas.<br>
    {song_name}, {song_name_upper}, {song_name_lower}, {song_name_cropped}, {song_name_upper_cropped}, {song_name_lower_cropped} - These variables contain current song name. <strong>cropped</strong> attribute means only song name without any other text.<br>
    {song_author}, {song_author_upper}, {song_author_lower} - These variables contains song author.<br><br>
    <strong>Note: Lyrics Status will automatically crop your status if it's too long. Discord not allowing statuses with length over 128 symbols.</strong>
    `);
});
customStatus.on("input", (e) => {
    e.preventDefault();
    let value = customStatus.val();

    settings.view.advanced.customStatus = value;
    saveSettings();
});
sendTimeOffset.on("input", (e) => {
    e.preventDefault();
    let value = +sendTimeOffset.val();

    if(isNaN(value)) {
        sendTimeOffset.css("color", "rgba(200, 0, 0, var(--alpha))");
        $("#send-time-offset-help").css({ animation: "light 2s infinite alternate" });

        return;
    } else {
        sendTimeOffset.css("color", "inherit");
        $("#send-time-offset-help").css({ animation: "" });
    }

    settings.timings.sendTimeOffset = value;
    saveSettings();
});
sendTimeOffsetHelp.click(() => modal("Help", `
Offset makes status changes appear before the lyrics have changed to make them look more synchronized.<br>
You can change it to your preference.<br>
If you don't have Spotify Premium you can set it to -200 because NetEase Music and QQMusic lyrics can appear faster than the actual song's words, but still it may be song-dependent.<br>
The offset time is defined in milliseconds. The default value is 500.
`));
enableAutooffset.click(() => {
    let state = enableAutooffset.prop("checked");

    settings.timings.enableAutooffset = state;
    saveSettings();
})
autooffset.on("input", (e) => {
    e.preventDefault();
    let value = +autooffset.val();

    if(isNaN(value)) {
        autooffset.css("color", "rgba(200, 0, 0, var(--alpha))");

        return;
    } else {
        autooffset.css("color", "inherit");
    }

    settings.timings.autooffset = value;
    saveSettings();
});
autooffsetHelp.click(() => modal("Help", `
Autooffset basically speaks for itself. Calculates average value depending on the time of status change + 100 ms (before Discord shows it).
`));
enableAutoupdate.click(() => {
    let state = enableAutoupdate.prop("checked");

    settings.update.enableAutoupdate = state;
    saveSettings();
})
enableBackoff.click(() => {
    settings.rateLimit.enableBackoff = enableBackoff.prop("checked");
    saveSettings();
});
enableMinInterval.click(() => {
    settings.rateLimit.enableMinInterval = enableMinInterval.prop("checked");
    saveSettings();
});
minIntervalMs.on("input", () => {
    let value = +minIntervalMs.val();
    if (!isNaN(value) && value >= 0) {
        settings.rateLimit.minIntervalMs = value;
        saveSettings();
    }
});
enableMergeLines.click(() => {
    settings.rateLimit.enableMergeLines = enableMergeLines.prop("checked");
    saveSettings();
});
mergeWindowMs.on("input", () => {
    let value = +mergeWindowMs.val();
    if (!isNaN(value) && value >= 0) {
        settings.rateLimit.mergeWindowMs = value;
        saveSettings();
    }
});
// Events

function formatSeconds(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0' ) + s;
}
function getStatusString(lyrics, time) {
    return `${settings.view.timestamp ? `[${formatSeconds((time / 1000).toFixed(0))}] ` : ""}${settings.view.label ? "Song lyrics - " : ""}${lyrics.replace("♪", "🎶")}`;
}
function checkToken(token) {
    let success = true;

    $.get({
        url: "https://discordapp.com/api/v8/users/@me",
        headers: {
            "Authorization": token
        },
        async: false,
        statusCode: {
            401: () => success = false
        }
    });

    return success;
}
function saveSettings() {
    if (!settingsLoaded) return console.error("Can't save settings before they're loaded from server.")

    ws.send(JSON.stringify(settings))
}
function loadSettings(settingsToLoad) {
    settingsToLoad = JSON.parse(settingsToLoad);

    settings = $.extend(true, settings, settingsToLoad);

    try {
        userTokenInput.val(settings.credentials.token);
        clientIDInput.val(settings.credentials.clientID);
        clientSecretInput.val(settings.credentials.clientSecret);
        customRedirectUriInput.val(settings.credentials.customRedirectUri);
        useExternalAuthServer.prop("checked", settings.credentials.useExternalAuthServer)
        enableTimestampCheckbox.prop("checked", settings.view.timestamp);
        enableLabelCheckbox.prop("checked", settings.view.label);
        settings.view.advanced.enabled ? enableAdvancedSWT.click() : null;
        customEmoji.val(settings.view.advanced.customEmoji);
        customStatus.html(settings.view.advanced.customStatus);
        statusPreview.text(getStatusString("La-la-la", 137000));
        sendTimeOffset.val(settings.timings.sendTimeOffset);
        enableAutooffset.prop("checked", settings.timings.enableAutooffset);
        autooffset.val(settings.timings.autooffset);
    enableAutoupdate.prop("checked", settings.update.enableAutoupdate)

    // Rate limit settings
    const rl = settings.rateLimit || {};
    enableBackoff.prop("checked", rl.enableBackoff !== false);
    enableMinInterval.prop("checked", rl.enableMinInterval !== false);
    minIntervalMs.val(rl.minIntervalMs != null ? rl.minIntervalMs : 5000);
    enableMergeLines.prop("checked", rl.enableMergeLines !== false);
    mergeWindowMs.val(rl.mergeWindowMs != null ? rl.mergeWindowMs : 8000);

    const authorized = !!(settings.credentials && (settings.credentials.refreshToken || settings.credentials.code));
    spotifyAuthorizedIndicator.toggleClass("hid", !authorized).toggleClass("act", authorized);

    settingsLoaded = true
    } catch(e) {
        console.log(e)
    }
}
function modal(title, description, styles = {}) {
    let modalWindow = $(`
    <div class="modal">
        <div class="top">
            <span class="title" style="color: ${styles.titleTextColor || "white"};">${title}</span>
            <div class="close">
                <img class="closeMark" src="https://www.nicepng.com/png/full/61-612286_clip-art-check-mark-close-x-icon-png.png" height="14">
            </div>
        </div>
        <div class="description" style="color: ${styles.descriptionTextColor || "white"};">
            ${description}
        </div>
    </div>
    `);

    modalWindow.appendTo(document.body);

    for (let e of $(".close")) {
        e.parentNode.parentNode === modalWindow[0] ? $(e).click(() => { modalWindow.remove(); }) : null;
    }
}
// Util functions

const ws = new WebSocket("ws://localhost:8999/ws")

ws.onmessage = (message) => {
    loadSettings(message.data)
}
// Init
