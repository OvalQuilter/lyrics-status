## Unreleased
- index.js: settings load try/catch, fallback-timer clear, lock race fix (wx-style + stale 6h check + 60s heartbeat), immediate REST poll on init, forward-seek reset, gateway reconnect jitter
- StatusChanger.js: rate-limit density forecast (merge window widen), catch-up 3s threshold fix (rapid-line skip)
- StatusChangerBase.js: char-budget merge cap (120c), iOS sync rate-limit guard, retry_after jitter, in-flight dedupe scaffold
- LyricsFetcher.js: parallel source fetch, timestamp-priority winner, 429 circuit breaker (60s skip)
- Autooffset.js: median-based offset calc
