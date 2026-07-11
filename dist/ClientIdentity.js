"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const fs = require("fs");
const path = require("path");

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36";
const CACHE_PATH = path.resolve(__dirname, "../build_number.json");

const IDENTITY = {
    os: "Windows",
    browser: "Chrome",
    device: "",
    system_locale: "en-US",
    browser_user_agent: UA,
    browser_version: "136.0.0.0",
    os_version: "10",
    referrer: "",
    referring_domain: "",
    referrer_current: "",
    referring_domain_current: "",
    release_channel: "stable",
    client_event_source: null,
};

let buildNumber = 390018; // last-resort fallback

// Load last known-good build number from disk (survives across restarts
// if the live fetch below fails, e.g. due to no network at startup)
(function loadCachedBuild() {
    try {
        const d = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
        if (typeof d.buildNumber === "number" && d.buildNumber > 0) buildNumber = d.buildNumber;
    } catch (_) {}
})();

function _saveCachedBuild() {
    try { fs.writeFileSync(CACHE_PATH, JSON.stringify({ buildNumber, updatedAt: Date.now() })); } catch (_) {}
}

function superProperties() {
    return Buffer.from(JSON.stringify({ ...IDENTITY, client_build_number: buildNumber })).toString("base64");
}

function gatewayProperties() {
    return { ...IDENTITY, client_build_number: buildNumber };
}

function userAgent() { return UA; }

// Fetch current Discord client build number so REST and Gateway identities
// stay consistent with each other and with reality. Retries with backoff
// if the initial attempt fails, and persists the result to disk.
function _fetchBuildNumber() {
    return fetch("https://discord.com/login", { headers: { "User-Agent": UA } })
        .then(r => r.text())
        .then(async html => {
            const scripts = [...new Set((html.match(/src="(\/assets\/[^"]+\.js)"/g) || []).map(s => s.slice(5, -1)))];
            for (const src of scripts.slice(-6)) {
                try {
                    const res = await fetch("https://discord.com" + src, { headers: { "User-Agent": UA } });
                    const text = await res.text();
                    const m = text.match(/buildNumber[":)]+?(\d{4,7})/);
                    if (m) {
                        const n = parseInt(m[1], 10);
                        if (n !== buildNumber) { buildNumber = n; _saveCachedBuild(); }
                        return true;
                    }
                } catch (_) {}
            }
            return false;
        }).catch(() => false);
}

(function refreshBuildNumberWithRetry(attempt = 0) {
    _fetchBuildNumber().then(ok => {
        if (!ok && attempt < 3) {
            setTimeout(() => refreshBuildNumberWithRetry(attempt + 1), Math.min(5000 * (attempt + 1), 30000));
        }
    });
})();

exports.ClientIdentity = { superProperties, gatewayProperties, userAgent };
