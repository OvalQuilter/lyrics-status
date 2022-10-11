$(`
<div id="menu-UI" class="hid-anim">
    <div id="menu-tabs">
        <button id="run-tab-button" class="tab">Run</button>
        <button id="settings-tab-button" class="tab">Settings</button>
    </div>
    <div id="run-tab" class="act">
        <div id="log-window"></div>
        <div id="ss-buttons">
            <button id="start" class="button1">Start</button>
            <button id="stop" class="button1">Stop</button>
        </div>
    </div>
    <div id="settings-tab" class="hid">
        <div class="settings">
            <span class="settings-name">General</span>
            <div class="option">
                <label for="user-token">Token:</label>
                <input type="text" id="user-token" class="text-input1">
                <button id="check-token" class="button1">Check</button>
            </div>
            <div class="option">
                <label for="autorun">Autorun:</label>
                <input type="checkbox" id="autorun">
            </div>
        </div>
        <div class="settings">
            <span class="settings-name">Status view</span>
            <div class="option">
                <label for="enable-timestamp">Enable timestamp</label>
                <input type="checkbox" id="enable-timestamp" checked>
            </div>
            <div class="option">
                <label for="enable-label">Enable label</label>
                <input type="checkbox" id="enable-label" checked>
            </div>
            <div class="option">
                <span class="fw-500">Preview:</span>
                <span id="status-preview">[2:17] Song lyrics - La-la-la</span>
            </div>
            <div class="option">
                <label for="enable-advanced-swt">Advanced settings</label>
                <input type="checkbox" id="enable-advanced-swt">
            </div>
            <div id="advanced-swt" class="sub-settings hid">
                <div class="option">
                    <label for="custom-status">
                        Custom status
                        <img id="custom-status-help" class="clickable question-mark1" src="https://www.pngall.com/wp-content/uploads/5/Help-Question-Mark-PNG-Free-Download.png" height="15">
                        :
                    </label>
                    <textarea rows="3" cols="40" id="custom-status" class="text-input2"></textarea>
                </div>
            </div>
        </div>
        <div class="settings">
            <span class="settings-name">Timings</span>
            <div class="option">
                <label for="send-time-offset">Send time offset:</label>
                <input type="text" id="send-time-offset" class="text-input1" maxlength="4" value="500">
                <img id="send-time-offset-help" class="clickable question-mark1" src="https://www.pngall.com/wp-content/uploads/5/Help-Question-Mark-PNG-Free-Download.png" height="15">
            </div>
        </div>
        <div class="settings">
            <span class="settings-name">Menu style</span>
            <div class="option">
                <label for="opacity-range-slider">Opacity</label>
                <input id="opacity-range-slider" class="range-slider1" type="range" min="50" max="100" value="90">
            </div>
        </div>
        <div id="version">Version 2.1.0</div>
    </div>
</div>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
        #menu-UI {
            width: 400px;
            height: 350px;
            background: rgba(40, 41, 41, var(--alpha));
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: transform .2s ease-in-out, opacity .2s ease-in-out;
            border-radius: 5px;
            position: absolute;
            z-index: 999;
        }
        #menu-UI * {
            color: rgba(204, 204, 204, var(--alpha));
            font-family: Roboto;
            user-select: none;
        }
        #menu-UI button {
            cursor: pointer;
        }
        #menu-UI input[type="checkbox"] {
            top: 1px;
            position: relative;
        }
        #menu-UI:not(:hover)::-webkit-scrollbar {
            display: none;
        }
        #menu-UI *::-webkit-scrollbar {
            width: 10px;
        }
        #menu-UI *::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background: rgba(65, 65, 65, var(--alpha));
        }
        #menu-UI *::-webkit-scrollbar-thumb:hover {
            background: rgba(75, 75, 75, var(--alpha));
        }
        #menu-tabs button:first-child {
            width: 50%;
            border-top-left-radius: 5px;
        }
        #menu-tabs button:last-child {
            width: 50%;
            border-top-right-radius: 5px;
        }
        #menu-tabs > .tab {
            height: 100%;
            background: rgba(60, 61, 61, var(--alpha));
            transition: background .2s ease-in-out;
            -webkit-transition: background .2s ease-in-out;
            -moz-transition: background .2s ease-in-out;
            border: none;
            float: left;
        }
        #menu-tabs > .tab:hover {
            background: rgba(80, 81, 81, var(--alpha));
        }
        #menu-tabs {
            width: 100%;
            height: 18px;
            background: rgba(60, 60, 60, var(--alpha));
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            box-shadow: 0px 1px 0px rgba(31, 31, 31, var(--alpha));

        }
        #settings-tab {
            margin-left: 5px;
        }
        #run-tab, #settings-tab {
            height: 332px;
            overflow: hidden auto;
        }
        #log-window {
            width: 390px;
            height: 250px;
            padding: 4px 0 0 2px;
            margin: 4px 0 0 4px;
            border: solid rgba(105, 105, 105, var(--alpha)) 1px;
            border-radius: 5px;
            background: rgba(55, 55, 55, var(--alpha));
            line-height: 20px;
            font-size: 20px;
            overflow: hidden auto;
        }
        #log-window span {
            width: 100%;
            margin: 2px 0 0 4px;
            float: left;
        }
        #start {
            background: rgba(127, 191, 63, var(--alpha));
        }
        #stop {
            background: rgba(191, 63, 63, var(--alpha));
        }
        #start:hover {
            background: rgba(142, 206, 78, var(--alpha));
        }
        #stop:hover {
            background: rgba(206, 78, 78, var(--alpha));
        }
        #ss-buttons {
            width: 200px;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 10px;
            position: relative;
            display: flex;
            justify-content: space-between;
        }
        #check-token {
            width: 70px;
            height: 20px;
            background: rgba(105, 105, 105, var(--alpha));
            padding-top: 1px;
            font-size: 13px;
        }
        #check-token:hover {
            background: rgba(115, 115, 115, var(--alpha));
        }
        #status-preview {
            border: solid rgba(105, 105, 105, var(--alpha)) 1px;
            border-radius: 3px;
            padding: 0 20px 0 20px;
            background: rgba(55, 55, 55, var(--alpha));
        }
        #custom-status {
            overflow: hidden auto;
        }
        #send-time-offset {
            width: 40px;
        }
        #version {
            width: 400px;
            left: -5px;
            text-align: center;
            position: relative;
            display: inline-block;
        }
        .act {
            display: block;
        }
        .hid {
            display: none;
        }
        .act-anim {
            transform: translate(-50%, -50%) scale(1) !important;
            opacity: 100;
        }
        .hid-anim {
            transform: translate(-50%, -50%) scale(0) !important;
            opacity: 0;
        }
        .cur-tab {
            background: rgba(110, 111, 111, var(--alpha)) !important;
        }
        .error {
            color: rgba(234, 0, 0, var(--alpha)) !important;
        }
        .warning {
            color: rgba(255, 182, var(--alpha)) !important;
        }
        .log {
            color: rgba(150, 150, 200, var(--alpha)) !important;
        }
        .green {
            color: rgba(150, 200, 150, var(--alpha)) !important;
        }
        .button1 {
            width: 90px;
            height: 35px;
            font-size: 17px;
            border: none;
            border-radius: 3px;
            position: relative;
            -webkit-transition: background .2s ease-in-out;
            -moz-transition: background .2s ease-in-out;
            transition: background .2s ease-in-out;
        }
        .text-input1 {
            border: solid 1px gray;
            border-radius: 2px;
            background: rgba(58, 58, 58, var(--alpha));
            -webkit-transition: background .2s ease-in-out, color .2s ease-in-out;
            -moz-transition: background .2s ease-in-out, color .2s ease-in-out;
            transition: background .2s ease-in-out, color .2s ease-in-out;
            text-align: center;
        }
        .text-input1:focus {
            outline: none;
        }
        .text-input2 {
            border: solid 1px gray;
            border-radius: 2px;
            background: rgba(58, 58, 58, var(--alpha));
            -webkit-transition: background .2s ease-in-out, color .2s ease-in-out;
            -moz-transition: background .2s ease-in-out, color .2s ease-in-out;
            transition: background .2s ease-in-out, color .2s ease-in-out;
            text-align: left;
            line-height: 15px;
            resize: none;
        }
        .text-input2:focus {
            outline: none;
        }
        .range-slider1 {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            width: 100px;
            height: 10px;
            border-radius: 5px;
            background: rgba(75, 75, 75, var(--alpha));
            -webkit-transition: background .2s ease-in-out;
            -moz-transition: background .2s ease-in-out;
            transition: background .2s ease-in-out;
        }
        .range-slider1:hover {
            background: rgba(80, 80, 80, var(--alpha));
        }
        .range-slider1::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 2px;
            background: rgba(90, 90, 90, var(--alpha));
            -webkit-transition: background .2s ease-in-out;
        }
        .range-slider1::-moz-range-thumb {
            -moz-appearance: none;
            width: 25px;
            height: 25px;
            background: rgba(90, 90, 90, var(--alpha));
            -moz-transition: background .2s ease-in-out;
        }
        .range-slider1::-webkit-slider-thumb:hover {
            background: rgba(100, 100, 100, var(--alpha));
        }
        .range-slider1::-moz-range-thumb:hover {
            background: rgba(100, 100, 100, var(--alpha));
        }
        .settings-name {
            font-size: 21px;
            font-weight: 700;
        }
        .option {
            margin: 3px 0 0 10px;
        }
        .sub-settings {
            margin: 3px 0 0 10px;
        }
        .clickable {
            cursor: pointer;
        }
        .question-mark1 {
            bottom: 5px;
            right: 1px;
            margin-right: -3px;
            filter: invert(39%) sepia(0%) saturate(0%) hue-rotate(339deg) brightness(94%) contrast(90%);
            position: relative;
        }
        input:disabled {
            color: rgba(184, 184, 184, var(--alpha)) !important;
            background: rgba(48, 48, 48, var(--alpha));
        }
        .fw-500 {
            font-weight: 500;
        }
        .fw-700 {
            font-weight: 700;
        }
        .modal {
            min-width: 300px;
            min-height: 100px;
            max-width: 700px;
            max-height: 350px;
            width: fit-content;
            height: fit-content;
            background: rgba(50, 51, 51, var(--alpha));
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 7px;
            z-index: 9999;
            position: absolute;
        }
        .modal * {
            user-select: none;
        }
        .modal > .top {
            width: 100%;
            height: 18px;
            background: rgba(60, 60, 60, var(--alpha));
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
            box-shadow: 0px 1px 0px rgba(31, 31, 31, var(--alpha));
        }
        .modal > .top > .title {
            height: 100%;
            left: 6px;
            bottom: 4px;
            position: relative;
            font-size: 14px;
        }
        .modal > .top > .close {
            width: 18px;
            height: 18px;
            background: rgba(228, 64, 64, var(--alpha));
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
            float: right;
            cursor: pointer;
        }
        .modal > .top > .close > .closeMark {
            left: 2px;
            bottom: 1px;
            position: relative;
        }
        .modal > .description {
            padding: 5px 5px 0 5px;
            text-align: center;
        }
        @keyframes light {
            from { filter: invert(39%) sepia(0%) saturate(0%) hue-rotate(339deg) brightness(94%) contrast(90%); }
            to { filter: invert(82%) sepia(7%) saturate(0%) hue-rotate(154deg) brightness(82%) contrast(90%); }
        }
        :root {
            --alpha: .9
        }
    </style>
</div>
`).appendTo(document.body);
// HTML and CSS

let menu                    = $("#menu-UI"),
    runTabButton            = $("#run-tab-button"),
    settingsTabButton       = $("#settings-tab-button"),
    runTab                  = $("#run-tab"),
    settingsTab             = $("#settings-tab"),
    startButton             = $("#start"),
    stopButton              = $("#stop"),
    logWindow               = $("#log-window"),
    userTokenInput          = $("#user-token"),
    checkTokenButton        = $("#check-token"),
    autorunCheckbox         = $("#autorun"),
    enableTimestampCheckbox = $("#enable-timestamp"),
    enableLabelCheckbox     = $("#enable-label"),
    statusPreview           = $("#status-preview"),
    advancedSWT             = $("#advanced-swt"),
    enableAdvancedSWT       = $("#enable-advanced-swt"),
    customStatusHelp        = $("#custom-status-help"),
    customStatus            = $("#custom-status"),
    sendTimeOffset          = $("#send-time-offset"),
    sendTimeOffsetHelp      = $("#send-time-offset-help"),
    opacityRangeSlider      = $("#opacity-range-slider");
// Elements

let settings = {
    token: null,
    autorun: false,
    view: {
        timestamp: true,
        label: true,
        advanced: {
            enabled: false,
            customStatus: "[{timestamp}] Song lyrics - {lyrics}"
        }
    },
    timings: {
        sendTimeOffset: 500
    },
    style: {
        opacity: 0.9
    }
}
// Settings

let stopped       = true,
    startLog      = false,
    stopLog       = false,
    accessToken   = null,
    errorCount    = 0,
    playbackState = {
        trackName: null,
        trackAuthor: null,
        trackId: null,
        oldTrackId: null,
        trackDuration: 0,
        trackProgress: 0,
        lyrics: [],
        currentLyric: null,
        hasLyrics: false,
        ended: () => playbackState.trackProgress >= playbackState.trackDuration,
        isPlaying: false
    },
    ms            = 0;
// Misc, in-session variables

$(document).keyup((e) => e.key === "Escape" ? menu.toggleClass("act-anim").toggleClass("hid-anim") : false);
runTabButton.click(() => {
    runTab.removeClass("hid").addClass("act");
    settingsTab.removeClass("act").addClass("hid");
    runTabButton.addClass("cur-tab");
    settingsTabButton.removeClass("cur-tab");
});
settingsTabButton.click(() => {
    settingsTab.removeClass("hid").addClass("act");
    runTab.removeClass("act").addClass("hid");
    settingsTabButton.addClass("cur-tab");
    runTabButton.removeClass("cur-tab");
});
startButton.click(() => { if(stopped) { startLog = true; } stopped = false; });
stopButton.click(() => { if(!stopped) { stopLog = true; } stopped = true; });
userTokenInput.change(() => {
    settings.token = userTokenInput.val();
    saveSettings();
});
checkTokenButton.click(() => {
    checkTokenButton.text("Checking...");

    let valid = checkToken(settings.token);

    checkTokenButton.text("Check");

    if(!valid) return modal("Token check", "Token is invalid.", { descriptionTextColor: "rgba(200, 0, 0, var(--alpha))" });
    modal("Token check", "Token is valid.", { descriptionTextColor: "rgba(0, 200, 0, var(--alpha))" });
});
autorunCheckbox.click(() => {
    settings.autorun = autorunCheckbox.prop("checked");
    saveSettings();
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
    let state = enableAdvancedSWT.prop("checked");

    settings.view.advanced.enabled = state;
    saveSettings();

    advancedSWT
        .toggleClass("hid")
        .toggleClass("act");
    enableTimestampCheckbox.prop("disabled", state);
    enableLabelCheckbox.prop("disabled", state);
});
customStatusHelp.click(() => {
    modal("Help", "<strong>Custom status</strong> option allows you to customise your status as you want.\nTo display text such as lyrics or timestamp you need to put it in {} brackets: <strong>[{timestamp}] Song lyrics - {lyrics}</strong><br>There's also other variables you can add to your status: <strong>{song_name}</strong> for displaying song name and <strong>{song_author}</strong> for displaying author name.<br>You can add <strong>upper</strong> or <strong>lower</strong> attribute to variable to make it upper/lower case: <strong>{song_name_upper}</strong>. This won't work for timestamp.<br><br><strong>Note: Lyrics' sender will automatically crop your status if it's too long. Discord not allowing statuses with length over 128 symbols.</strong>");
});
customStatus.on("input", (e) => {
    e.preventDefault();
    let value = customStatus.val();

    settings.view.advanced.customStatus = value;
    saveSettings();
});
sendTimeOffset.on("input", (e) => {
    e.preventDefault();
    let value = sendTimeOffset.val();

    if(value > 2000 || value < 0) {
        sendTimeOffset.css("color", "rgba(200, 0, 0, var(--alpha))");
        $("#send-time-offset-help").css({ animation: "light 2s infinite alternate" });

        return;
    } else if(isNaN(value)) {
        sendTimeOffset.css("color", "rgba(200, 0, 0, var(--alpha))");

        return;
    } else {
        sendTimeOffset.css("color", "inherit");
        $("#send-time-offset-help").css({ animation: "" });
    }

    settings.timings.sendTimeOffset = value;
    saveSettings();
});
sendTimeOffsetHelp.click(() => modal("Help", "This parameter defines the offset for time before the status changes (in milliseconds).<br>Default value is <strong>500</strong>. It is not recommended to change this parameter without a reason.<br><br><strong>Note: Value bigger than 2000 will be ignored.</strong>"));
opacityRangeSlider.on("input", () => {
    let value = opacityRangeSlider.val() / 100;

    $(":root").css("--alpha", value);

    settings.style.opacity = value;
    saveSettings();
});
// Events

function addLog(text, t) {
    t = t == "error" ? "Error" : t == "warning" ? "Warning" : "Log";
    $("<span/>", { class: t.toLowerCase() }).html(`[${t}]: ${text}`).appendTo(logWindow)[0].scrollIntoView(false);

    if(logWindow.children().length >= 30) $(logWindow[0].firstChild).remove();
}
function formatSeconds(s){
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0' ) + s;
}
function getStatusString(lyrics, time) {
    return `${settings.view.timestamp ? `[${formatSeconds((time / 1000).toFixed(0))}] ` : ""}${settings.view.label ? "Song lyrics - " : ""}${lyrics}`
}
function parseStatusString(status, data) {
    if(typeof data !== "object") return;

    if(data.lyrics) {
        status = status
            .replace("{lyrics}", data.lyrics)
            .replace("{lyrics_upper}", data.lyrics.toUpperCase())
            .replace("{lyrics_lower}", data.lyrics.toLowerCase());
    }
    if(data.time) status = status.replace("{timestamp}", formatSeconds((data.time / 1000).toFixed()));
    if(data.songName) {
        status = status
            .replace("{song_name}", data.songName)
            .replace("{song_name_upper}", data.songName.toUpperCase())
            .replace("{song_name_lower}", data.songName.toLowerCase());
    }
    if(data.songAuthor) {
        status = status
            .replace("{song_author}", data.songAuthor)
            .replace("{song_author_upper}", data.songAuthor.toUpperCase())
            .replace("{song_author_lower}", data.songAuthor.toLowerCase());
    }

    return status.slice(0, 128);
}
function sleep(ms) {
    return new Promise((res, rej) => setTimeout(res, ms));
}
function refreshAccessToken() {
    return $.get({ url: "https://open.spotify.com/get_access_token?reason=transport&productType=web_player", async: false, success: (d) => accessToken = d.accessToken});
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
function changeStatusRequest(token, text) {
    let start = Date.now();

    $.ajax({
        url: "https://discordapp.com/api/v8/users/@me/settings",
        method: "PATCH",
        dataType: "json",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        data: JSON.stringify({
            "custom_status": {
                "text": text,
                "emoji_id": null,
                "emoji_name": null,
                "expires_at": null
            }
        }),
        statusCode: {
            401: () => {
                modal("Run", "Token is invalid.", { descriptionTextColor: "rgba(200, 0, 0, var(--alpha))" });
                stopLog = true;
                stopped = true;
            }
        }
    });
}
function loadSettings() {
    let settingsLoaded = localStorage.getItem("LyricsSender_settings");
    settingsLoaded = settingsLoaded ? JSON.parse(settingsLoaded) : settings;

    if(!settingsLoaded.advanced) {
        settingsLoaded.advanced = settings.advanced;
    }

    settings = settingsLoaded;

    userTokenInput.val(settings.token);
    autorunCheckbox.prop("checked", settings.autorun);
    enableTimestampCheckbox.prop("checked", settings.view.timestamp);
    enableLabelCheckbox.prop("checked", settings.view.label);
    settings.view.advanced.enabled ? enableAdvancedSWT.click() : null;
    customStatus.html(settings.view.advanced.customStatus);
    statusPreview.text(getStatusString("La-la-la", 137000));
    sendTimeOffset.val(settings.timings.sendTimeOffset);
    opacityRangeSlider.val(settings.style.opacity * 100);

    $(":root").css("--alpha", settings.style.opacity);
}
function saveSettings() {
    localStorage.setItem("LyricsSender_settings", JSON.stringify(settings));
}
function modal(title, description, styles = {}) {
    let modalWindow = $(`
    <div class="modal">
        <div class="top">
            <span class="title" ${styles.titleTextColor ? `style="color: ${styles.titleTextColor};"` : ""}>${title}</span>
            <div class="close">
                <img class="closeMark" src="https://www.nicepng.com/png/full/61-612286_clip-art-check-mark-close-x-icon-png.png" height="14">
            </div>
        </div>
        <div class="description" ${styles.descriptionTextColor ? `style="color: ${styles.descriptionTextColor};"` : ""}>
            ${description}
        </div>
    </div>
    `);

    modalWindow.appendTo(document.body);

    for (let e of $(".close")) {
        e.parentNode.parentNode === modalWindow[0] ? $(e).click(() => { modalWindow.remove(); }) : null;
    }
}
function updatePlaybackState() {
    return $.ajax({
        url: "https://api.spotify.com/v1/me/player",
        method: "GET",
        dataType: "json",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        statusCode: {
            200: d => {
                if(playbackState.trackId !== d.item.id) {
                    playbackState.trackName = d.item.name;
                    playbackState.trackAuthor = d.item.artists[0].name;
                    playbackState.oldTrackId = playbackState.trackId;
                    playbackState.trackId = d.item.id;
                    playbackState.trackDuration = d.item.duration_ms;

                    playbackState.lyrics = [];

                    $.ajax({
                        url: `https://spclient.wg.spotify.com/lyrics/v1/track/${playbackState.trackId}`,
                        method: "GET",
                        dataType: "json",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${accessToken}`
                        },
                        statusCode: {
                            200: d => {
                                if(d.lines[0].time == undefined) {
                                    let timePerLyric = Math.round(playbackState.trackDuration / d.lines.length);
                                    d.lines.reduce((p, c, i, a) => {
                                        playbackState.lyrics.push({
                                            time: p,
                                            words: c.words[0].string
                                        });
                                        return p + timePerLyric;
                                    }, timePerLyric);
                                } else {
                                    for (let line of d.lines) {
                                        playbackState.lyrics.push({
                                            time: line.time,
                                            words: line.words[0].string,
                                        });
                                    }
                                }

                                playbackState.hasLyrics = true;

                            },
                            404: () => {
                                playbackState.hasLyrics = false;

                                addLog("Spotify doesn't have lyrics for this song. Status won't change.", "warning");
                                changeStatusRequest(settings.token, "");
                            }
                        }
                    });
                }
                playbackState.trackProgress = d.progress_ms;
                playbackState.isPlaying = d.is_playing;
            },
            401: () => { refreshAccessToken(); },
            404: () => { addLog("Got unexpected error! For more details please read <a style=\"color: #ff0000;\" href=\"https://github.com/OvalQuilter/lyrics-sender#error-list\" target=\"_blank\">this</a>. <strong class=\"error\">Error code: 502</strong>", "error"); stopLog = true; stopped = true; errorCount++ },
            502: () => { addLog("Got unexpected error! For more details please read <a style=\"color: #ff0000;\" href=\"https://github.com/OvalQuilter/lyrics-sender#error-list\" target=\"_blank\">this</a>. <strong class=\"error\">Error code: 502</strong>", "error"); stopLog = true; stopped = true; errorCount++ }
        }
    });
}
function changeStatus() {
    return new Promise((res, rej) => {
        if(playbackState.ended() || !playbackState.hasLyrics || !playbackState.isPlaying) return res();

        const offset = +settings.timings.sendTimeOffset;

        for (let i = 0; i < playbackState.lyrics.length; i++) {
            let lyric = playbackState.lyrics[i],
                nextLyric = playbackState.lyrics[i + 1];

            if(lyric.time < (playbackState.trackProgress + offset)) {
                if(!lyric.words) continue;
                if(nextLyric && nextLyric.time < (playbackState.trackProgress + offset)) continue;
                if(lyric === playbackState.currentLyric) {
                    res();
                    break;
                }

                playbackState.currentLyric = lyric;

                if(settings.view.advanced.enabled) {
                    let data = {
                        lyrics: lyric.words,
                        time: playbackState.trackProgress,
                        songName: playbackState.trackName,
                        songAuthor: playbackState.trackAuthor
                    }
                    changeStatusRequest(settings.token, parseStatusString(settings.view.advanced.customStatus, data));
                } else {
                    changeStatusRequest(settings.token, getStatusString(lyric.words, playbackState.trackProgress));
                }


                res();
                break;


            }
        }
    });
}
// Util functions

loadSettings();

if(settings.autorun) {
    stopped = false;
    startLog = true;
}

(async function playbackStateUpdater() {
    let start = Date.now();
    updatePlaybackState().always(async () => {
        if(errorCount >= 10) {
            addLog("Lyrics' sender was been stopped due to errors.", "warning");
            stopLog = true;
            stopped = true;

            errorCount = 0;

            return;
        }

        await sleep(1500 - (Date.now() - start));

        playbackStateUpdater();
    });
})();
(async function statusChanger() {
    setInterval(() => {
        if(startLog) {
            startLog = false;
            addLog("Lyrics' sender started...");
        }
        if(stopLog) {
            stopLog = false;
            addLog("Lyrics' sender stopped...");
        }
        if(stopped) {
            playbackState.trackProgress += 150;

            return;
        }

        changeStatus();
        playbackState.trackProgress += 150;
    }, 150);
})();
// Init
