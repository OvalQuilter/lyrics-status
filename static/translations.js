// Translations for LyricsStatus
const translations = {
    en: {
        // Navigation
        'nav.dashboard': 'Dashboard',
        'nav.settings': 'Settings',
        'nav.history': 'History',
        'nav.playlists': 'Playlists',
        'nav.about': 'About',
        
        // Dashboard
        'dashboard.title': 'Dashboard',
        'dashboard.subtitle': 'Monitor your lyrics status in real-time',
        'dashboard.nowPlaying': 'Now Playing',
        'dashboard.notPlaying': 'Not Playing',
        'dashboard.stopped': 'Stopped',
        'dashboard.running': 'Running',
        'dashboard.noSong': 'Play a song on Spotify',
        'dashboard.lyrics': 'Lyrics',
        'dashboard.noLyrics': 'No lyrics available',
        'dashboard.lyricsDisplay': 'Lyrics Display',
        'dashboard.currentLyric': 'Current Lyric',
        'dashboard.nextLyric': 'Next',
        'dashboard.waitingForLyrics': 'Waiting for lyrics...',
        'dashboard.noLyricsYet': 'No lyrics yet',
        'dashboard.lyricsSource': 'Source',
        'dashboard.control': 'Control',
        'dashboard.start': 'Start',
        'dashboard.stop': 'Stop',
        'dashboard.statusPreview': 'Status Preview',
        'dashboard.stats': 'Session Stats',
        'dashboard.statistics': 'Statistics',
        'dashboard.songsToday': 'Songs Today',
        'dashboard.lyricsFound': 'Lyrics Found',
        'dashboard.statusChanges': 'Status Changes',
        'dashboard.cachedSongs': 'Cached Songs',
        
        // Settings
        'settings.title': 'Settings',
        'settings.subtitle': 'Configure your LyricsStatus experience',
        'settings.apiCredentials': 'API Credentials',
        'settings.discord': 'Discord',
        'settings.spotify': 'Spotify',
        'settings.authToken': 'Authorization Token',
        'settings.enterToken': 'Enter your Discord token',
        'settings.validate': 'Validate',
        'settings.clientId': 'Client ID',
        'settings.clientSecret': 'Client Secret',
        'settings.fromDashboard': 'From Developer Dashboard',
        'settings.redirectUri': 'Redirect URI',
        'settings.useExternalAuth': 'Use External Auth',
        'settings.authorizeSpotify': 'Authorize Spotify',
        'settings.connected': 'Connected',
        'settings.premium': 'Premium',
        'settings.free': 'Free',
        
        // Status Display
        'settings.statusDisplay': 'Status Display',
        'settings.profilePreview': 'Profile Preview',
        'settings.displayOptions': 'Display Options',
        'settings.showTimestamp': 'Show Timestamp',
        'settings.showLabel': 'Show "Song lyrics" Label',
        'settings.showEmoji': 'Show Status Emoji',
        'settings.statusEmoji': 'Status Emoji',
        'settings.emojiName': 'Status Emoji',
        'settings.useCustomEmoji': 'Use Custom/Animated Emoji',
        'settings.emojiId': 'Emoji ID',
        'settings.emojiIdHelp': 'Right-click emoji in Discord → Copy ID (needs Developer Mode)',
        'settings.emojiAnimated': 'Animated Emoji',
        'settings.enableAdvanced': 'Enable Advanced Mode',
        'settings.customFormat': 'Custom Format',
        'settings.statusFormat': 'Status Format',
        'settings.presets': 'Presets',
        
        // Preset Categories
        'presets.cute': 'Cute',
        'presets.sparkles': 'Sparkles',
        'presets.musical': 'Musical',
        'presets.minimal': 'Minimal',
        'presets.decorative': 'Decorative',
        'presets.kaomoji': 'Kaomoji',
        
        // Timing & Sync
        'settings.timingSync': 'Timing & Sync',
        'settings.timeOffset': 'Time Offset',
        'settings.seconds': 'seconds',
        'settings.behindAhead': 'behind / ahead',
        'settings.autoOffset': 'Auto Offset Detection',
        'settings.offsetSamples': 'Offset Samples',
        'settings.samples': 'samples',
        
        // Application
        'settings.application': 'Application',
        'settings.autoStart': 'Start with Windows',
        'settings.startMinimized': 'Start Minimized',
        'settings.minimizeToTray': 'Minimize to Tray',
        'settings.autoUpdate': 'Auto Update',
        'settings.language': 'Language',
        
        // Theme
        'settings.theme': 'Theme',
        'theme.dark': 'Dark',
        'theme.light': 'Light',
        'theme.spotify': 'Spotify',
        'theme.discord': 'Discord',
        'theme.ocean': 'Ocean',
        'theme.sunset': 'Sunset',
        'theme.matrix': 'Matrix',
        'theme.cherry': 'Cherry',
        
        // Save
        'settings.saveSettings': 'Save Settings',
        
        // History
        'history.title': 'History',
        'history.subtitle': 'Your recently played songs',
        'history.clearHistory': 'Clear History',
        'history.empty': 'No songs in history yet',
        'history.ago': 'ago',
        'history.played': 'played',
        'history.lyrics': 'LYRICS',
        'history.noLyrics': 'NO LYRICS',
        
        // Playlists
        'playlists.title': 'Playlists',
        'playlists.subtitle': 'Your Spotify library',
        'playlists.refresh': 'Refresh',
        'playlists.tracks': 'tracks',
        'playlists.back': 'Back',
        'playlists.likedSongs': 'Liked Songs',
        
        // About
        'about.title': 'About',
        'about.subtitle': 'LyricsStatus v4.0.0',
        'about.description': 'Display your current song lyrics as your Discord status. Syncs in real-time with Spotify.',
        'about.github': 'GitHub',
        'about.reportBug': 'Report Bug',
        'about.webPanel': 'Web Panel',
        
        // Help Modals
        'help.discordTitle': 'How to Get Your Discord Token',
        'help.discordWarning': 'Never share your token with anyone. It gives full access to your account!',
        'help.discordVideo': 'Watch Video Tutorial',
        'help.discordVideoUrl': 'https://youtu.be/Qr_iR9oZy4c',
        'help.step1Title': 'Open Discord in Browser',
        'help.step1Desc': 'Go to <a href="https://discord.com/app" target="_blank" style="color: #5865f2;">discord.com/app</a> and log in, or press Ctrl+Shift+I in the Desktop app.',
        'help.step2Title': 'Open Developer Tools',
        'help.step2Desc': 'Press <strong>F12</strong> or <strong>Ctrl+Shift+I</strong> to open the browser\'s developer tools.',
        'help.step3Title': 'Go to Network Tab',
        'help.step3Desc': 'Click on the <strong>Network</strong> tab in the developer tools.',
        'help.step4Title': 'Filter by /api',
        'help.step4Desc': 'Type <code>/api</code> in the filter box. Then reload the page (<strong>Ctrl+R</strong>).',
        'help.step5Title': 'Find Authorization Header',
        'help.step5Desc': 'Click any request, go to <strong>Headers</strong> tab, and find <code>authorization</code> under <strong>Request Headers</strong>.',
        'help.step6Title': 'Copy the Token',
        'help.step6Desc': 'Copy the value (without quotes) and paste it in the Discord Token field.',
        
        'help.spotifyTitle': 'How to Setup Spotify App',
        'help.spotifyVideo': 'Watch Video Tutorial',
        'help.spotifyVideoUrl': 'https://youtu.be/0fhkkkRuUxw',
        'help.spotifyStep1Title': 'Go to Spotify Developer Dashboard',
        'help.spotifyStep1Desc': 'Visit <a href="https://developer.spotify.com" target="_blank" style="color: #1DB954;">developer.spotify.com</a> and log in with your Spotify account.',
        'help.spotifyStep2Title': 'Create a New App',
        'help.spotifyStep2Desc': 'Click <strong>"Create App"</strong> and fill in any name and description.',
        'help.spotifyStep3Title': 'Add Redirect URI',
        'help.spotifyStep3Desc': '⚠️ <strong>Important:</strong> In app settings, add this exact URI: <code>http://127.0.0.1:67/callback</code>',
        'help.spotifyStep4Title': 'Copy Credentials',
        'help.spotifyStep4Desc': 'Copy the <strong>Client ID</strong> and <strong>Client Secret</strong> from your app\'s settings page.',
        'help.spotifyStep5Title': 'Paste in LyricsStatus',
        'help.spotifyStep5Desc': 'Paste the credentials here and click "Authorize Spotify".',
        
        // Toasts
        'toast.settingsSaved': 'Settings saved!',
        'toast.tokenValid': 'Token is valid!',
        'toast.tokenInvalid': 'Token is invalid',
        'toast.presetApplied': 'Preset applied!',
        'toast.historyClear': 'History cleared',
        'toast.copied': 'Copied to clipboard!',
        'toast.redirectUriCopied': 'Redirect URI copied!',
        'toast.error': 'An error occurred',
        'toast.welcomeBack': 'Welcome back',
        
        // Loading
        'loading.greeting': 'Welcome back',
        'loading.initializing': 'Initializing...',
        'loading.connecting': 'Connecting to services...',
        'loading.ready': 'Ready!',
        
        // Setup Wizard
        'setup.welcome': 'Welcome to LyricsStatus',
        'setup.subtitle': "Let's get you set up in just a few steps",
        'setup.selectLanguage': 'Select Language',
        'setup.connectDiscord': 'Connect Discord',
        'setup.discordDescription': 'Enter your Discord token to update your status with lyrics',
        'setup.discordToken': 'Discord Token',
        'setup.enterToken': 'Enter your Discord token',
        'setup.tokenHint': 'Your token is stored locally and never shared',
        'setup.skip': 'Skip for now',
        'setup.continue': 'Continue',
        'setup.back': 'Back',
        'setup.connectSpotify': 'Connect Spotify',
        'setup.spotifyDescription': 'Link your Spotify account to fetch song lyrics',
        'setup.clientId': 'Client ID',
        'setup.clientSecret': 'Client Secret',
        'setup.useExternalAuth': 'Use external auth server (easier setup)',
        'setup.authorizeSpotify': 'Authorize Spotify',
        'setup.allSet': "You're All Set!",
        'setup.finishDescription': 'LyricsStatus is ready to sync your music to Discord',
        'setup.discordConnected': 'Discord Connected',
        'setup.spotifyConnected': 'Spotify Connected',
        'setup.readyToSync': 'Ready to Sync',
        'setup.startUsing': 'Start Using LyricsStatus',
        'setup.waitingSpotify': 'Waiting for Spotify...',
        'setup.completeAuth': 'Complete the authorization in your browser, then come back here.',
        
        // Misc
        'misc.important': 'Important',
        'misc.close': 'Close',
        'misc.copy': 'Copy',
        
        // Help Modal New Keys
        'help_discord_title': 'How to Get Your Discord Token',
        'help_spotify_title': 'How to Setup Spotify App',
        'help_watch_video': 'Watch Video Tutorial',
        'help_important': 'Important:',
        'help_tip': 'Tip:',
        'help_discord_warning': 'Never share your token with anyone. It gives full access to your account!',
        'help_spotify_tip': 'Make sure to save the app settings after adding the redirect URI!',
        
        // Discord Help Steps
        'help_discord_step1_title': 'Open Discord in Browser',
        'help_discord_step1_desc': 'Go to',
        'help_discord_step1_desc2': 'and log in, or press',
        'help_discord_step1_desc3': 'in the Desktop app.',
        'help_discord_step2_title': 'Open Developer Tools',
        'help_discord_step2_desc': 'Press',
        'help_discord_step2_desc2': 'or',
        'help_discord_step2_desc3': 'to open the browser\'s developer tools.',
        'help_discord_step3_title': 'Go to Network Tab',
        'help_discord_step3_desc': 'Click on the',
        'help_discord_step3_desc2': 'tab in the developer tools.',
        'help_discord_step4_title': 'Filter by /api',
        'help_discord_step4_desc': 'Type',
        'help_discord_step4_desc2': 'in the filter box. Then reload the page',
        'help_discord_step5_title': 'Find Authorization Header',
        'help_discord_step5_desc': 'Click any request, go to',
        'help_discord_step5_desc2': 'tab, scroll to find',
        'help_discord_step5_desc3': 'that\'s your token!',
        
        // Spotify Help Steps
        'help_spotify_step1_title': 'Go to Spotify Developer Dashboard',
        'help_spotify_step1_desc': 'Visit',
        'help_spotify_step1_desc2': 'and log in with your Spotify account.',
        'help_spotify_step2_title': 'Create an App',
        'help_spotify_step2_desc': 'Click',
        'help_spotify_step2_desc2': 'button. Give it a name (e.g., "LyricsStatus") and description.',
        'help_spotify_step3_title': 'Set Redirect URI',
        'help_spotify_step3_desc': 'In Redirect URIs, add this exact URI:',
        'help_spotify_step3_desc2': 'Then click',
        'help_spotify_step3_desc3': 'and',
        'help_spotify_step4_title': 'Select Web API',
        'help_spotify_step4_desc': 'Check the box for',
        'help_spotify_step4_desc2': 'in the question: "Which API/SDKs are you planning to use?"',
        'help_spotify_step5_title': 'Get Your Credentials',
        'help_spotify_step5_desc': 'After creating the app, go to',
        'help_spotify_step5_desc2': 'Copy the',
        'help_spotify_step5_desc3': 'and click',
        'help_spotify_step5_desc4': 'to reveal and copy the',
        
        // Profile Preview
        'profile.aboutMe': 'ABOUT ME',
        'profile.listeningToSpotify': 'LISTENING TO SPOTIFY',
        'profile.connections': 'CONNECTIONS',
        
        // Additional Settings
        'settings.timingBehavior': 'Timing & Behavior',
        'settings.timing': 'Timing',
        'settings.sendTimeOffset': 'Send Time Offset (ms)',
        'settings.startup': 'Startup',
        'settings.autoStartLaunch': 'Auto Start on Launch',
        
        // About Page
        'about.tagline': '✨ Your music, your status, your vibe ✨',
        'about.feature1': 'Real-time Lyrics',
        'about.feature2': 'Fast & Accurate',
        'about.feature3': 'Beautiful UI',
        'about.madeWithLove': '💜 Made with love',
        'about.creatorRole': 'Creator & Developer',
        'about.forkHelp': 'With the help of the original fork',
        'about.specialThanks': 'Special Thanks',
        'about.lyricsPowered': '🎤 Lyrics powered by'
    },
    
    de: {
        // Navigation
        'nav.dashboard': 'Übersicht',
        'nav.settings': 'Einstellungen',
        'nav.history': 'Verlauf',
        'nav.playlists': 'Playlists',
        'nav.about': 'Über',
        
        // Dashboard
        'dashboard.title': 'Übersicht',
        'dashboard.subtitle': 'Überwache deinen Liedtext-Status in Echtzeit',
        'dashboard.nowPlaying': 'Läuft gerade',
        'dashboard.notPlaying': 'Keine Wiedergabe',
        'dashboard.stopped': 'Gestoppt',
        'dashboard.running': 'Läuft',
        'dashboard.noSong': 'Spiele einen Song auf Spotify',
        'dashboard.lyrics': 'Liedtext',
        'dashboard.noLyrics': 'Kein Liedtext verfügbar',
        'dashboard.lyricsDisplay': 'Liedtext-Anzeige',
        'dashboard.currentLyric': 'Aktueller Text',
        'dashboard.nextLyric': 'Nächster',
        'dashboard.waitingForLyrics': 'Warte auf Liedtext...',
        'dashboard.noLyricsYet': 'Noch kein Liedtext',
        'dashboard.lyricsSource': 'Quelle',
        'dashboard.control': 'Steuerung',
        'dashboard.start': 'Starten',
        'dashboard.stop': 'Stoppen',
        'dashboard.statusPreview': 'Status-Vorschau',
        'dashboard.stats': 'Sitzungsstatistik',
        'dashboard.statistics': 'Statistiken',
        'dashboard.songsToday': 'Songs heute',
        'dashboard.lyricsFound': 'Texte gefunden',
        'dashboard.statusChanges': 'Status-Änderungen',
        'dashboard.cachedSongs': 'Gecachte Songs',
        
        // Settings
        'settings.title': 'Einstellungen',
        'settings.subtitle': 'Konfiguriere dein LyricsStatus-Erlebnis',
        'settings.apiCredentials': 'API-Zugangsdaten',
        'settings.discord': 'Discord',
        'settings.spotify': 'Spotify',
        'settings.authToken': 'Autorisierungs-Token',
        'settings.enterToken': 'Gib deinen Discord-Token ein',
        'settings.validate': 'Prüfen',
        'settings.clientId': 'Client-ID',
        'settings.clientSecret': 'Client-Secret',
        'settings.fromDashboard': 'Vom Developer Dashboard',
        'settings.redirectUri': 'Weiterleitungs-URI',
        'settings.useExternalAuth': 'Externe Auth verwenden',
        'settings.authorizeSpotify': 'Spotify autorisieren',
        'settings.connected': 'Verbunden',
        'settings.premium': 'Premium',
        'settings.free': 'Kostenlos',
        
        // Status Display
        'settings.statusDisplay': 'Status-Anzeige',
        'settings.profilePreview': 'Profil-Vorschau',
        'settings.displayOptions': 'Anzeigeoptionen',
        'settings.showTimestamp': 'Zeitstempel anzeigen',
        'settings.showLabel': '"Liedtext" Label anzeigen',
        'settings.showEmoji': 'Status-Emoji anzeigen',
        'settings.statusEmoji': 'Status-Emoji',
        'settings.emojiName': 'Status Emoji',
        'settings.useCustomEmoji': 'Benutzerdefiniertes/Animiertes Emoji verwenden',
        'settings.emojiId': 'Emoji-ID',
        'settings.emojiIdHelp': 'Rechtsklick auf Emoji in Discord → ID kopieren (benötigt Entwicklermodus)',
        'settings.emojiAnimated': 'Animiertes Emoji',
        'settings.enableAdvanced': 'Erweiterter Modus',
        'settings.customFormat': 'Eigenes Format',
        'settings.statusFormat': 'Status-Format',
        'settings.presets': 'Vorlagen',
        
        // Preset Categories
        'presets.cute': 'Süß',
        'presets.sparkles': 'Glitzer',
        'presets.musical': 'Musikalisch',
        'presets.minimal': 'Minimal',
        'presets.decorative': 'Dekorativ',
        'presets.kaomoji': 'Kaomoji',
        
        // Timing & Sync
        'settings.timingSync': 'Timing & Synchronisation',
        'settings.timeOffset': 'Zeitversatz',
        'settings.seconds': 'Sekunden',
        'settings.behindAhead': 'zurück / vor',
        'settings.autoOffset': 'Auto-Versatz-Erkennung',
        'settings.offsetSamples': 'Versatz-Samples',
        'settings.samples': 'Samples',
        
        // Application
        'settings.application': 'Anwendung',
        'settings.autoStart': 'Mit Windows starten',
        'settings.startMinimized': 'Minimiert starten',
        'settings.minimizeToTray': 'In Taskleiste minimieren',
        'settings.autoUpdate': 'Auto-Update',
        'settings.language': 'Sprache',
        
        // Theme
        'settings.theme': 'Design',
        'theme.dark': 'Dunkel',
        'theme.light': 'Hell',
        'theme.spotify': 'Spotify',
        'theme.discord': 'Discord',
        'theme.ocean': 'Ozean',
        'theme.sunset': 'Sonnenuntergang',
        'theme.matrix': 'Matrix',
        'theme.cherry': 'Kirschblüte',
        
        // Save
        'settings.saveSettings': 'Einstellungen speichern',
        
        // History
        'history.title': 'Verlauf',
        'history.subtitle': 'Deine zuletzt gespielten Songs',
        'history.clearHistory': 'Verlauf löschen',
        'history.empty': 'Noch keine Songs im Verlauf',
        'history.ago': 'her',
        'history.played': 'gespielt',
        'history.lyrics': 'TEXT',
        'history.noLyrics': 'KEIN TEXT',
        
        // Playlists
        'playlists.title': 'Playlists',
        'playlists.subtitle': 'Deine Spotify-Bibliothek',
        'playlists.refresh': 'Aktualisieren',
        'playlists.tracks': 'Titel',
        'playlists.back': 'Zurück',
        'playlists.likedSongs': 'Lieblingssongs',
        
        // About
        'about.title': 'Über',
        'about.subtitle': 'LyricsStatus v4.0.0',
        'about.description': 'Zeige den aktuellen Liedtext als deinen Discord-Status an. Synchronisiert in Echtzeit mit Spotify.',
        'about.github': 'GitHub',
        'about.reportBug': 'Fehler melden',
        'about.webPanel': 'Web-Panel',
        
        // Help Modals
        'help.discordTitle': 'Wie du deinen Discord-Token bekommst',
        'help.discordWarning': 'Teile deinen Token niemals mit anderen. Er gibt vollen Zugriff auf dein Konto!',
        'help.discordVideo': 'Video-Anleitung ansehen',
        'help.discordVideoUrl': 'https://youtu.be/Qr_iR9oZy4c',
        'help.step1Title': 'Discord im Browser öffnen',
        'help.step1Desc': 'Gehe zu <a href="https://discord.com/app" target="_blank" style="color: #5865f2;">discord.com/app</a> und melde dich an, oder drücke Strg+Umschalt+I in der Desktop-App.',
        'help.step2Title': 'Entwicklertools öffnen',
        'help.step2Desc': 'Drücke <strong>F12</strong> oder <strong>Strg+Umschalt+I</strong> um die Entwicklertools zu öffnen.',
        'help.step3Title': 'Zum Netzwerk-Tab gehen',
        'help.step3Desc': 'Klicke auf den <strong>Network</strong> (Netzwerk) Tab in den Entwicklertools.',
        'help.step4Title': 'Nach /api filtern',
        'help.step4Desc': 'Tippe <code>/api</code> in das Filterfeld. Lade dann die Seite neu (<strong>Strg+R</strong>).',
        'help.step5Title': 'Authorization Header finden',
        'help.step5Desc': 'Klicke auf eine Anfrage, gehe zum <strong>Headers</strong> Tab und finde <code>authorization</code> unter <strong>Request Headers</strong>.',
        'help.step6Title': 'Token kopieren',
        'help.step6Desc': 'Kopiere den Wert (ohne Anführungszeichen) und füge ihn im Discord-Token-Feld ein.',
        
        'help.spotifyTitle': 'Spotify-App einrichten',
        'help.spotifyVideo': 'Video-Anleitung ansehen',
        'help.spotifyVideoUrl': 'https://youtu.be/0fhkkkRuUxw',
        'help.spotifyStep1Title': 'Zum Spotify Developer Dashboard gehen',
        'help.spotifyStep1Desc': 'Besuche <a href="https://developer.spotify.com" target="_blank" style="color: #1DB954;">developer.spotify.com</a> und melde dich mit deinem Spotify-Konto an.',
        'help.spotifyStep2Title': 'Neue App erstellen',
        'help.spotifyStep2Desc': 'Klicke auf <strong>"Create App"</strong> und gib einen Namen und eine Beschreibung ein.',
        'help.spotifyStep3Title': 'Weiterleitungs-URI hinzufügen',
        'help.spotifyStep3Desc': '⚠️ <strong>Wichtig:</strong> Füge in den App-Einstellungen diese exakte URI hinzu: <code>http://127.0.0.1:67/callback</code>',
        'help.spotifyStep4Title': 'Zugangsdaten kopieren',
        'help.spotifyStep4Desc': 'Kopiere die <strong>Client ID</strong> und das <strong>Client Secret</strong> von der Einstellungsseite deiner App.',
        'help.spotifyStep5Title': 'In LyricsStatus einfügen',
        'help.spotifyStep5Desc': 'Füge die Zugangsdaten hier ein und klicke auf "Spotify autorisieren".',
        
        // Toasts
        'toast.settingsSaved': 'Einstellungen gespeichert!',
        'toast.tokenValid': 'Token ist gültig!',
        'toast.tokenInvalid': 'Token ist ungültig',
        'toast.presetApplied': 'Vorlage angewendet!',
        'toast.historyClear': 'Verlauf gelöscht',
        'toast.copied': 'In Zwischenablage kopiert!',
        'toast.redirectUriCopied': 'Weiterleitungs-URI kopiert!',
        'toast.error': 'Ein Fehler ist aufgetreten',
        'toast.welcomeBack': 'Willkommen zurück',
        
        // Loading
        'loading.greeting': 'Willkommen zurück',
        'loading.initializing': 'Initialisiere...',
        'loading.connecting': 'Verbinde mit Diensten...',
        'loading.ready': 'Bereit!',
        
        // Setup Wizard
        'setup.welcome': 'Willkommen bei LyricsStatus',
        'setup.subtitle': 'Lass uns dich in wenigen Schritten einrichten',
        'setup.selectLanguage': 'Sprache wählen',
        'setup.connectDiscord': 'Discord verbinden',
        'setup.discordDescription': 'Gib deinen Discord-Token ein, um deinen Status mit Liedtexten zu aktualisieren',
        'setup.discordToken': 'Discord-Token',
        'setup.enterToken': 'Gib deinen Discord-Token ein',
        'setup.tokenHint': 'Dein Token wird lokal gespeichert und niemals geteilt',
        'setup.skip': 'Überspringen',
        'setup.continue': 'Weiter',
        'setup.back': 'Zurück',
        'setup.connectSpotify': 'Spotify verbinden',
        'setup.spotifyDescription': 'Verknüpfe dein Spotify-Konto, um Liedtexte abzurufen',
        'setup.clientId': 'Client-ID',
        'setup.clientSecret': 'Client-Secret',
        'setup.useExternalAuth': 'Externen Auth-Server verwenden (einfacher)',
        'setup.authorizeSpotify': 'Spotify autorisieren',
        'setup.allSet': 'Alles bereit!',
        'setup.finishDescription': 'LyricsStatus ist bereit, deine Musik mit Discord zu synchronisieren',
        'setup.discordConnected': 'Discord verbunden',
        'setup.spotifyConnected': 'Spotify verbunden',
        'setup.readyToSync': 'Bereit zur Synchronisation',
        'setup.startUsing': 'LyricsStatus starten',
        'setup.waitingSpotify': 'Warte auf Spotify...',
        'setup.completeAuth': 'Schließe die Autorisierung in deinem Browser ab und komm dann hierher zurück.',
        
        // Misc
        'misc.important': 'Wichtig',
        'misc.close': 'Schließen',
        'misc.copy': 'Kopieren',
        
        // Help Modal New Keys
        'help_discord_title': 'Wie du deinen Discord-Token bekommst',
        'help_spotify_title': 'Wie du eine Spotify-App einrichtest',
        'help_watch_video': 'Video-Anleitung ansehen',
        'help_important': 'Wichtig:',
        'help_tip': 'Tipp:',
        'help_discord_warning': 'Teile deinen Token niemals mit anderen. Er gibt vollen Zugriff auf dein Konto!',
        'help_spotify_tip': 'Vergiss nicht, die App-Einstellungen nach dem Hinzufügen der Redirect-URI zu speichern!',
        
        // Discord Help Steps
        'help_discord_step1_title': 'Discord im Browser öffnen',
        'help_discord_step1_desc': 'Gehe zu',
        'help_discord_step1_desc2': 'und melde dich an, oder drücke',
        'help_discord_step1_desc3': 'in der Desktop-App.',
        'help_discord_step2_title': 'Entwicklertools öffnen',
        'help_discord_step2_desc': 'Drücke',
        'help_discord_step2_desc2': 'oder',
        'help_discord_step2_desc3': 'um die Entwicklertools zu öffnen.',
        'help_discord_step3_title': 'Zum Netzwerk-Tab gehen',
        'help_discord_step3_desc': 'Klicke auf den',
        'help_discord_step3_desc2': 'Tab in den Entwicklertools.',
        'help_discord_step4_title': 'Nach /api filtern',
        'help_discord_step4_desc': 'Tippe',
        'help_discord_step4_desc2': 'in das Filterfeld. Dann lade die Seite neu',
        'help_discord_step5_title': 'Authorization-Header finden',
        'help_discord_step5_desc': 'Klicke auf eine Anfrage, gehe zum',
        'help_discord_step5_desc2': 'Tab, scrolle um zu finden',
        'help_discord_step5_desc3': 'das ist dein Token!',
        
        // Spotify Help Steps
        'help_spotify_step1_title': 'Zum Spotify Developer Dashboard gehen',
        'help_spotify_step1_desc': 'Besuche',
        'help_spotify_step1_desc2': 'und melde dich mit deinem Spotify-Konto an.',
        'help_spotify_step2_title': 'Eine App erstellen',
        'help_spotify_step2_desc': 'Klicke auf',
        'help_spotify_step2_desc2': 'Button. Gib einen Namen (z.B. "LyricsStatus") und eine Beschreibung ein.',
        'help_spotify_step3_title': 'Redirect-URI festlegen',
        'help_spotify_step3_desc': 'Bei Redirect-URIs füge diese exakte URI hinzu:',
        'help_spotify_step3_desc2': 'Dann klicke auf',
        'help_spotify_step3_desc3': 'und',
        'help_spotify_step4_title': 'Web API auswählen',
        'help_spotify_step4_desc': 'Aktiviere das Kontrollkästchen für',
        'help_spotify_step4_desc2': 'bei der Frage: "Welche API/SDKs planst du zu verwenden?"',
        'help_spotify_step5_title': 'Deine Zugangsdaten holen',
        'help_spotify_step5_desc': 'Nachdem du die App erstellt hast, gehe zu',
        'help_spotify_step5_desc2': 'Kopiere die',
        'help_spotify_step5_desc3': 'und klicke auf',
        'help_spotify_step5_desc4': 'um das zu enthüllen und zu kopieren',
        
        // Profile Preview
        'profile.aboutMe': 'ÜBER MICH',
        'profile.listeningToSpotify': 'HÖRT SPOTIFY',
        'profile.connections': 'VERBINDUNGEN',
        
        // Additional Settings
        'settings.timingBehavior': 'Timing & Verhalten',
        'settings.timing': 'Timing',
        'settings.sendTimeOffset': 'Sendeverzögerung (ms)',
        'settings.startup': 'Autostart',
        'settings.autoStartLaunch': 'Automatisch starten',
        
        // About Page
        'about.tagline': '✨ Deine Musik, dein Status, dein Vibe ✨',
        'about.feature1': 'Echtzeit-Liedtexte',
        'about.feature2': 'Schnell & Genau',
        'about.feature3': 'Schönes Design',
        'about.madeWithLove': '💜 Mit Liebe gemacht',
        'about.creatorRole': 'Ersteller & Entwickler',
        'about.forkHelp': 'Mit Hilfe des Original-Forks',
        'about.specialThanks': 'Besonderer Dank',
        'about.lyricsPowered': '🎤 Liedtexte bereitgestellt von'
    }
};

// Current language
let currentLanguage = 'en';

// Get translation
function t(key) {
    const lang = translations[currentLanguage] || translations.en;
    return lang[key] || translations.en[key] || key;
}

// Set language (saves to settings via IPC)
async function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        // Save to localStorage as fallback
        localStorage.setItem('lyricsstatus-language', lang);
        applyTranslations();
        return true;
    }
    return false;
}

// Apply translations to all elements with data-i18n
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = t(key);
        
        // Check if it's a placeholder
        if (el.hasAttribute('data-i18n-placeholder')) {
            el.placeholder = translation;
        } else if (el.hasAttribute('data-i18n-title')) {
            el.title = translation;
        } else {
            el.textContent = translation;
        }
    });
    
    // Update document language
    document.documentElement.lang = currentLanguage;
}

// Initialize language from settings or storage
async function initLanguage(savedLanguage) {
    // Priority: savedLanguage from settings > localStorage > browser language
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else {
        const localStorageLang = localStorage.getItem('lyricsstatus-language');
        if (localStorageLang && translations[localStorageLang]) {
            currentLanguage = localStorageLang;
        } else {
            // Try to detect browser language
            const browserLang = navigator.language.split('-')[0];
            if (translations[browserLang]) {
                currentLanguage = browserLang;
            }
        }
    }
    applyTranslations();
}

// Get available languages
function getAvailableLanguages() {
    return Object.keys(translations).map(code => ({
        code,
        name: code === 'en' ? 'English' : code === 'de' ? 'Deutsch' : code
    }));
}

// Export for use
window.i18n = {
    t,
    setLanguage,
    applyTranslations,
    initLanguage,
    getAvailableLanguages,
    getCurrentLanguage: () => currentLanguage
};
