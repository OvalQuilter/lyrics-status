// API Bridge
const api = window.electronAPI;

// State
let settings = {};
let isRunning = false;
let isPlaying = false;
let cachedSongsCount = 0;
let currentLyricText = '';
let spotifyUserName = '';
let discordUserName = '';
let currentTrackId = null;
let currentTrackLiked = false;
let currentVolume = 50;
let currentSong = null; // Current song object
let stats = {
    songsToday: 0,
    lyricsFound: 0,
    totalSongs: 0,
    statusChanges: 0
};
let karaokeClock = {
    baseProgress: 0,
    baseTimestamp: 0,
    isPlaying: false
};
let karaokeCache = {
    lineKey: '',
    words: [],
    timings: []
};
let lastDisplayedLine = ''; // Track last line to prevent continuous flashing

// Loading Screen Elements
const loadingScreen = document.getElementById('loading-screen');
const loadingGreeting = document.getElementById('loading-greeting');
const loadingProgress = document.getElementById('loading-progress');
const loadingStatus = document.getElementById('loading-status');
const loadingParticles = document.getElementById('loading-particles');

// Setup Wizard Elements
const setupWizard = document.getElementById('setup-wizard');

// DOM Elements
const elements = {
    // Window controls
    minimizeBtn: document.getElementById('minimize-btn'),
    maximizeBtn: document.getElementById('maximize-btn'),
    closeBtn: document.getElementById('close-btn'),
    closeAppBtn: document.getElementById('close-app-btn'),
    
    // Sidebar user
    sidebarUsername: document.getElementById('sidebar-username'),
    
    // Spotify user (legacy)
    spotifyUser: document.getElementById('spotify-user'),
    spotifyUserName: document.getElementById('spotify-user-name'),
    
    // Navigation
    navBtns: document.querySelectorAll('.nav-item'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // Dashboard
    statusIndicator: document.getElementById('status-indicator'),
    albumArt: document.getElementById('album-art'),
    songTitle: document.getElementById('song-title'),
    songArtist: document.getElementById('song-artist'),
    progressFill: document.getElementById('progress-fill'),
    currentTime: document.getElementById('current-time'),
    totalTime: document.getElementById('total-time'),
    currentLyric: document.getElementById('current-lyric'),
    lyricsSource: document.getElementById('lyrics-source'),
    toggleBtn: document.getElementById('toggle-btn'),
    toggleIcon: document.getElementById('toggle-icon'),
    toggleText: document.getElementById('toggle-text'),
    statusPreview: document.getElementById('status-preview'),
    songsToday: document.getElementById('songs-today'),
    lyricsFound: document.getElementById('lyrics-found'),
    statusChanges: document.getElementById('status-changes'),
    cachedSongs: document.getElementById('cached-songs'),
    
    // Playback controls
    playPauseBtn: document.getElementById('play-pause-btn'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    likeBtn: document.getElementById('like-btn'),
    volumeControl: document.getElementById('volume-control'),
    volumeBtn: document.getElementById('volume-btn'),
    volumeSlider: document.getElementById('volume-slider'),
    volumeValue: document.getElementById('volume-value'),
    
    // Settings
    discordToken: document.getElementById('discord-token'),
    validateToken: document.getElementById('validate-token'),
    clientId: document.getElementById('client-id'),
    clientSecret: document.getElementById('client-secret'),
    useExternalAuth: document.getElementById('use-external-auth'),
    authorizeSpotify: document.getElementById('authorize-spotify'),
    showTimestamp: document.getElementById('show-timestamp'),
    showLabel: document.getElementById('show-label'),
    showEmoji: document.getElementById('show-emoji'),
    emojiName: document.getElementById('emoji-name'),
    useCustomEmoji: document.getElementById('use-custom-emoji'),
    emojiId: document.getElementById('emoji-id'),
    emojiAnimated: document.getElementById('emoji-animated'),
    customEmojiFields: document.getElementById('custom-emoji-fields'),
    advancedMode: document.getElementById('advanced-mode'),
    advancedSettings: document.getElementById('advanced-settings'),
    customStatus: document.getElementById('custom-status'),
    timeOffset: document.getElementById('time-offset'),
    autoOffset: document.getElementById('auto-offset'),
    offsetSamples: document.getElementById('offset-samples'),
    autoStart: document.getElementById('auto-start'),
    startMinimized: document.getElementById('start-minimized'),
    minimizeTray: document.getElementById('minimize-tray'),
    autoUpdate: document.getElementById('auto-update'),
    saveSettings: document.getElementById('save-settings'),
    
    // History
    historyList: document.getElementById('history-list'),
    clearHistory: document.getElementById('clear-history'),
    
    // Playlists
    playlistsGrid: document.getElementById('playlists-grid'),
    refreshPlaylists: document.getElementById('refresh-playlists-btn'),
    playlistModal: document.getElementById('playlist-modal'),
    playlistBackBtn: document.getElementById('playlist-back-btn'),
    playlistModalCover: document.getElementById('playlist-modal-cover'),
    playlistModalName: document.getElementById('playlist-modal-name'),
    playlistModalTracks: document.getElementById('playlist-modal-tracks'),
    playlistTracks: document.getElementById('playlist-tracks'),
    playPlaylistBtn: document.getElementById('play-playlist-btn'),
    
    // About
    githubLink: document.getElementById('github-link'),
    reportBug: document.getElementById('report-bug'),
    openWebPanel: document.getElementById('open-web-panel'),
    
    // Toast
    toastContainer: document.getElementById('toast-container')
};

// Initialize
async function init() {
    // Create loading particles
    createLoadingParticles();
    
    // Start loading sequence
    await runLoadingSequence();
    
    // Check if first time setup needed
    settings = await api.getSettings();
    const needsSetup = !settings.credentials?.token && !settings.credentials?.clientID;
    
    if (needsSetup) {
        hideLoadingScreen();
        showSetupWizard();
        return;
    }
    
    // Normal initialization
    try {
        // Initialize translations with saved language from settings
        if (window.i18n) {
            window.i18n.initLanguage(settings.general?.language);
        }
        
        setupWindowControls();
        setupNavigation();
        setupEventListeners();
        await loadSettings();
        await loadSpotifyUser().catch(() => {});
        await updateStatus().catch(() => {});
    } catch (err) {
        console.error('Init error:', err);
    }
    
    hideLoadingScreen();
    startUpdateLoop();
}

// Create enhanced loading particles
function createLoadingParticles() {
    if (!loadingParticles) return;
    
    const colors = ['var(--neon-purple)', 'var(--neon-pink)', 'var(--neon-blue)', 'var(--neon-green)'];
    const musicNotes = ['♪', '♫', '♬', '♩', '♭', '♮'];
    
    // Create floating dots
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '-20px';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (4 + Math.random() * 3) + 's';
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = particle.style.color;
        loadingParticles.appendChild(particle);
    }
    
    // Create floating rings
    for (let i = 0; i < 8; i++) {
        const ring = document.createElement('div');
        ring.className = 'particle-ring';
        ring.style.left = Math.random() * 100 + '%';
        ring.style.bottom = '-30px';
        ring.style.width = (20 + Math.random() * 30) + 'px';
        ring.style.height = ring.style.width;
        ring.style.animationDelay = Math.random() * 6 + 's';
        ring.style.animationDuration = (5 + Math.random() * 4) + 's';
        ring.style.color = colors[Math.floor(Math.random() * colors.length)];
        ring.style.borderColor = ring.style.color;
        loadingParticles.appendChild(ring);
    }
    
    // Create floating music notes
    for (let i = 0; i < 10; i++) {
        const note = document.createElement('div');
        note.className = 'particle-note';
        note.textContent = musicNotes[Math.floor(Math.random() * musicNotes.length)];
        note.style.left = Math.random() * 100 + '%';
        note.style.bottom = '-20px';
        note.style.animationDelay = Math.random() * 4 + 's';
        note.style.animationDuration = (3.5 + Math.random() * 3) + 's';
        note.style.color = colors[Math.floor(Math.random() * colors.length)];
        loadingParticles.appendChild(note);
    }
    
    // Create sparkles
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'particle-sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.bottom = (Math.random() * 50) + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.style.animationDuration = (2 + Math.random() * 2) + 's';
        sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
        loadingParticles.appendChild(sparkle);
    }
}

// Loading sequence
async function runLoadingSequence() {
    const steps = [
        { progress: 15, status: 'Tuning frequencies... 📻', delay: 300 },
        { progress: 30, status: 'Syncing with Discord... 🔗', delay: 400 },
        { progress: 50, status: 'Connecting to Spotify... 🎵', delay: 400 },
        { progress: 70, status: 'Fetching your vibe... ✨', delay: 300 },
        { progress: 85, status: 'Polishing the decks... 🎛', delay: 200 },
        { progress: 100, status: 'Ready to drop the beat! 🎉', delay: 300 }
    ];
    
    // Try to get user name for personalized greeting
    try {
        const discordUser = await api.getDiscordUser();
        if (discordUser) {
            discordUserName = discordUser.globalName || discordUser.username;
            const greetings = [
                // Fun and energetic
                `Hey ${discordUserName}! Ready to jam? 🎸`,
                `What's up, ${discordUserName}? Let's rock! 🤘`,
                `Yo ${discordUserName}! Time for some bangers 🔥`,
                `Sup ${discordUserName}? Crank it up! 🎵`,
                
                // Chill vibes
                `Hey ${discordUserName}, good vibes only ✨`,
                `Welcome back, ${discordUserName} 🌙`,
                `Chillin' with ${discordUserName} 💫`,
                `Vibin' with ${discordUserName} 🎶`,
                
                // Music themed
                `Drop the beat, ${discordUserName}! 🥁`,
                `${discordUserName} is in the house! 🎤`,
                `Sound check, ${discordUserName}? 🎧`,
                `Turn it up, ${discordUserName}! 📢`,
                
                // Cool/funny
                `Back at it, ${discordUserName}! 💜`,
                `The legend ${discordUserName} returns 👑`,
                `Loading awesomeness for ${discordUserName}... ⚡`,
                `${discordUserName} has entered the chat 💬`,
                
                // Time based (will be filtered by actual time)
                `Morning vibes, ${discordUserName} ☕`,
                `Afternoon jams, ${discordUserName} 🌤`,
                `Evening session, ${discordUserName} 🌆`,
                `Night owl mode, ${discordUserName} 🦉`
            ];
            
            // Filter time-based greetings based on current hour
            const hour = new Date().getHours();
            let validGreetings = greetings.slice(0, 16); // Non-time based first
            if (hour >= 5 && hour < 12) validGreetings.push(greetings[16]); // Morning
            if (hour >= 12 && hour < 17) validGreetings.push(greetings[17]); // Afternoon
            if (hour >= 17 && hour < 22) validGreetings.push(greetings[18]); // Evening
            if (hour >= 22 || hour < 5) validGreetings.push(greetings[19]); // Night
            
            if (loadingGreeting) {
                loadingGreeting.textContent = validGreetings[Math.floor(Math.random() * validGreetings.length)];
            }
        } else {
            // Anonymous greetings
            const anonGreetings = [
                'Loading your music journey... 🎵',
                'Getting the party started... 🎉',
                'Tuning the frequencies... 📻',
                'Preparing the soundwaves... 🌊',
                'Syncing with the rhythm... ⏱',
                'Warming up the speakers... 🔊',
                'Connecting to the beat... 🔗',
                'Unleashing the vibes... ✨'
            ];
            if (loadingGreeting) {
                loadingGreeting.textContent = anonGreetings[Math.floor(Math.random() * anonGreetings.length)];
            }
        }
    } catch {
        if (loadingGreeting) loadingGreeting.textContent = 'Getting everything ready...';
    }
    
    // Run through loading steps
    for (const step of steps) {
        if (loadingProgress) loadingProgress.style.width = step.progress + '%';
        if (loadingStatus) loadingStatus.textContent = step.status;
        await sleep(step.delay);
    }
    
    await sleep(400);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Hide loading screen
function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Auto-detect Discord Token - Uses IPC to extract from Discord app/browser storage
// Returns { success: boolean, token?: string, error?: string, details?: string }
async function detectDiscordToken() {
    try {
        // Check if there's a token in our own storage first
        const existingToken = settings?.credentials?.token;
        if (existingToken) {
            return { success: true, token: existingToken };
        }
        
        // Use IPC to extract token from Discord storage
        if (window.electronAPI && window.electronAPI.extractDiscordToken) {
            const result = await window.electronAPI.extractDiscordToken();
            return result;
        }
        
        return { success: false, error: 'API not available - electronAPI not found' };
    } catch (error) {
        console.error('Error detecting Discord token:', error);
        return { success: false, error: error.message || 'Unknown error' };
    }
}

// Setup Wizard Functions
function showSetupWizard() {
    if (setupWizard) {
        setupWizard.style.display = 'flex';
        initSetupWizard();
    }
}

function initSetupWizard() {
    let currentStep = 1;
    
    const steps = document.querySelectorAll('.setup-step');
    const contents = {
        1: document.getElementById('setup-step-1'),
        2: document.getElementById('setup-step-2'),
        3: document.getElementById('setup-step-3')
    };
    
    // Setup language buttons in wizard
    const languageBtns = document.querySelectorAll('.language-btn');
    languageBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const lang = btn.dataset.lang;
            
            // Update active state
            languageBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Set language
            if (window.i18n) {
                await window.i18n.setLanguage(lang);
            }
            
            // Save to settings
            settings.general = settings.general || {};
            settings.general.language = lang;
        });
    });
    
    function showStep(step) {
        // Update step indicators
        steps.forEach((s, i) => {
            s.classList.remove('active');
            if (i + 1 < step) s.classList.add('completed');
            if (i + 1 === step) s.classList.add('active');
        });
        
        // Show content
        Object.keys(contents).forEach(key => {
            if (contents[key]) {
                contents[key].style.display = parseInt(key) === step ? 'block' : 'none';
            }
        });
        
        currentStep = step;
    }
    
    // Auto-detect Discord token
    const autoDetectBtn = document.getElementById('setup-auto-detect-token');
    const tokenInput = document.getElementById('setup-discord-token');
    const tokenStatus = document.getElementById('token-detect-status');
    
    if (autoDetectBtn) {
        autoDetectBtn.addEventListener('click', async () => {
            autoDetectBtn.disabled = true;
            tokenStatus.textContent = 'Detecting...';
            tokenStatus.className = 'token-status detecting';
            
            try {
                // Try to auto-detect token from Discord local storage
                const result = await detectDiscordToken();
                
                if (result.success && result.token) {
                    tokenInput.value = result.token;
                    tokenStatus.textContent = '✓ Token found!';
                    tokenStatus.className = 'token-status success';
                    
                    // Validate the token
                    const isValid = await api.validateToken(result.token);
                    if (isValid) {
                        tokenStatus.textContent = '✓ Token valid!';
                        settings.credentials = settings.credentials || {};
                        settings.credentials.token = result.token;
                    } else {
                        tokenStatus.textContent = '✗ Token invalid';
                        tokenStatus.className = 'token-status error';
                    }
                } else {
                    // Show detailed error with debug info
                    let errorMsg = result.error || 'Not found - manual input required';
                    
                    // If error is long (has debug info), show summary but log full details
                    if (errorMsg.length > 100) {
                        console.log('Full token extraction error:', errorMsg);
                        // Show first line of error in UI
                        const firstLine = errorMsg.split('\n')[0];
                        tokenStatus.innerHTML = `✗ ${firstLine}<br><small>Check console (F12) for details</small>`;
                    } else {
                        tokenStatus.textContent = `✗ ${errorMsg}`;
                    }
                    tokenStatus.className = 'token-status error';
                    tokenInput.focus();
                }
            } catch (err) {
                console.error('Token detection failed:', err);
                tokenStatus.textContent = '✗ Detection failed';
                tokenStatus.className = 'token-status error';
            } finally {
                autoDetectBtn.disabled = false;
            }
        });
    }
    
    // Debug: Dump LevelDB button
    const dumpBtn = document.getElementById('setup-dump-leveldb');
    if (dumpBtn) {
        dumpBtn.addEventListener('click', async () => {
            dumpBtn.disabled = true;
            tokenStatus.textContent = 'Creating diagnostic dump...';
            tokenStatus.className = 'token-status detecting';
            
            try {
                if (window.electronAPI && window.electronAPI.dumpDiscordLevelDB) {
                    const result = await window.electronAPI.dumpDiscordLevelDB();
                    if (result.success) {
                        tokenStatus.innerHTML = `✓ Dump created!<br><small>Saved to: ${result.path}</small>`;
                        tokenStatus.className = 'token-status success';
                        console.log('Dump preview:', result.preview);
                    } else {
                        tokenStatus.textContent = '✗ Dump failed';
                        tokenStatus.className = 'token-status error';
                    }
                } else {
                    tokenStatus.textContent = '✗ Debug API not available';
                    tokenStatus.className = 'token-status error';
                }
            } catch (err) {
                console.error('Dump failed:', err);
                tokenStatus.textContent = '✗ Dump failed';
                tokenStatus.className = 'token-status error';
            } finally {
                dumpBtn.disabled = false;
            }
        });
    }
    
    // Step 1 handlers
    document.getElementById('setup-next-1')?.addEventListener('click', () => {
        const token = document.getElementById('setup-discord-token')?.value;
        if (token) {
            settings.credentials = settings.credentials || {};
            settings.credentials.token = token;
        }
        showStep(2);
    });
    
    document.getElementById('setup-skip-discord')?.addEventListener('click', () => {
        showStep(2);
    });
    
    // Step 2 handlers
    document.getElementById('setup-back-2')?.addEventListener('click', () => {
        showStep(1);
    });
    
    document.getElementById('setup-next-2')?.addEventListener('click', async () => {
        const clientId = document.getElementById('setup-client-id')?.value;
        const clientSecret = document.getElementById('setup-client-secret')?.value;
        const useExternal = document.getElementById('setup-external-auth')?.checked;
        
        settings.credentials = settings.credentials || {};
        settings.credentials.clientID = clientId;
        settings.credentials.clientSecret = clientSecret;
        settings.credentials.useExternalAuthServer = useExternal;
        settings.credentials.customRedirectUri = 'http://127.0.0.1:67/callback';
        
        // Save settings before authorizing
        await api.setSettings(settings);
        
        // Set up listener for auth completion BEFORE opening auth
        const authPromise = new Promise((resolve) => {
            // Set up one-time listener for auth completion
            api.onceSpotifyAuthComplete?.((data) => {
                console.log('Setup wizard: Spotify auth complete', data);
                resolve(data);
            });
            
            // Also resolve after 60 seconds timeout (user might cancel)
            setTimeout(() => resolve({ timeout: true }), 60000);
        });
        
        // Authorize Spotify if credentials provided
        if (clientId || useExternal) {
            api.authorizeSpotify();
            
            // Show waiting message
            const step2Content = document.getElementById('setup-step-2');
            const originalContent = step2Content?.innerHTML;
            if (step2Content) {
                const waitingTitle = window.i18n?.t('setup.waitingSpotify') || 'Waiting for Spotify...';
                const waitingDesc = window.i18n?.t('setup.completeAuth') || 'Complete the authorization in your browser, then come back here.';
                step2Content.innerHTML = `
                    <div class="setup-waiting">
                        <div class="loading-spinner"></div>
                        <h2>${waitingTitle}</h2>
                        <p>${waitingDesc}</p>
                    </div>
                `;
            }
            
            // Wait for auth to complete
            const result = await authPromise;
            
            // Restore content and move to step 3
            if (step2Content && originalContent) {
                step2Content.innerHTML = originalContent;
            }
            
            // Reload settings to get the refresh token
            settings = await api.getSettings();
        }
        
        showStep(3);
    });
    
    // Step 3 handler
    document.getElementById('setup-finish')?.addEventListener('click', async () => {
        // Save final settings
        await api.setSettings(settings);
        
        // Start the app before reload
        const status = await api.getStatus();
        if (!status.isRunning) {
            console.log('Starting app after setup...');
            await api.startApp();
        }
        
        // Reload the window to reinitialize everything fresh
        console.log('Setup complete, reloading window...');
        window.location.reload();
    });
}

// Load Spotify User
async function loadSpotifyUser() {
    try {
        const user = await api.getSpotifyUser();
        if (user && user.name) {
            spotifyUserName = user.name;
            
            // Update sidebar user info
            const sidebarUsername = document.getElementById('sidebar-username');
            const sidebarUserStatus = document.querySelector('.user-mini-status');
            if (sidebarUsername) sidebarUsername.textContent = user.name;
            if (sidebarUserStatus) sidebarUserStatus.textContent = user.product === 'premium' ? 'Spotify Premium' : 'Spotify Free';
            
            // Hide legacy user display
            if (elements.spotifyUser) {
                elements.spotifyUser.style.display = 'none';
            }
            
            // Update Spotify connected info in credentials
            const spotifyConnectedInfo = document.getElementById('spotify-connected-info');
            if (spotifyConnectedInfo) {
                const productLabel = user.product === 'premium' ? 'Premium' : 'Free';
                const avatarHtml = user.image 
                    ? `<img src="${user.image}" alt="" class="connected-avatar" />` 
                    : `<div class="connected-avatar spotify-default"><svg viewBox="0 0 24 24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg></div>`;
                
                // Build full user info display
                const followersText = user.followers ? `${user.followers.toLocaleString()} followers` : '';
                const countryText = user.country ? `🌍 ${user.country}` : '';
                const statsText = [followersText, countryText].filter(Boolean).join(' • ');
                
                // Build API capabilities based on product type
            const apiCapabilities = user.product === 'premium' 
                ? ['Playback Control', 'High Quality', 'No Ads', 'Full API Access']
                : ['Playback Control (limited)', 'Standard Quality', 'API Access'];
            
            spotifyConnectedInfo.innerHTML = `
                    <div class="spotify-user-full">
                        ${avatarHtml}
                        <div class="spotify-user-details">
                            <span class="connected-name">${user.name}</span>
                            ${statsText ? `<span class="connected-stats">${statsText}</span>` : ''}
                        </div>
                        <span class="connected-status spotify-product ${user.product || 'free'}">${productLabel}</span>
                    </div>
                    <div class="spotify-api-info">
                        <div class="api-info-row">
                            <span class="api-info-label">ID:</span>
                            <code class="api-info-value" title="${user.id}">${user.id}</code>
                        </div>
                        <div class="api-capabilities">
                            ${apiCapabilities.map(cap => `<span class="api-capability">${cap}</span>`).join('')}
                        </div>
                    </div>
                `;
                spotifyConnectedInfo.style.display = 'block';
            }
            
            showToast(`Welcome back, ${user.name}!`, 'success');
        }
    } catch (error) {
        console.log('Could not load Spotify user');
    }
}

// Listen for Spotify user update from main process
if (api.onSpotifyUser) {
    api.onSpotifyUser((user) => {
        if (user && user.name) {
            spotifyUserName = user.name;
            
            // Update sidebar user info
            const sidebarUsername = document.getElementById('sidebar-username');
            const sidebarUserStatus = document.querySelector('.user-mini-status');
            if (sidebarUsername) sidebarUsername.textContent = user.name;
            if (sidebarUserStatus) sidebarUserStatus.textContent = user.product === 'premium' ? 'Spotify Premium' : 'Spotify Free';
            
            // Hide legacy user display
            if (elements.spotifyUser) {
                elements.spotifyUser.style.display = 'none';
            }
            
            // Update Spotify connected info in credentials
            const spotifyConnectedInfo = document.getElementById('spotify-connected-info');
            if (spotifyConnectedInfo) {
                const productLabel = user.product === 'premium' ? 'Premium' : 'Free';
                const avatarHtml = user.image 
                    ? `<img src="${user.image}" alt="" class="connected-avatar" />` 
                    : `<div class="connected-avatar spotify-default"><svg viewBox="0 0 24 24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg></div>`;
                
                // Build full user info display
                const followersText = user.followers ? `${user.followers.toLocaleString()} followers` : '';
                const countryText = user.country ? `🌍 ${user.country}` : '';
                const statsText = [followersText, countryText].filter(Boolean).join(' • ');
                
                // Build API capabilities based on product type
                const apiCapabilities = user.product === 'premium' 
                    ? ['Playback Control', 'High Quality', 'No Ads', 'Full API Access']
                    : ['Playback Control (limited)', 'Standard Quality', 'API Access'];
                
                spotifyConnectedInfo.innerHTML = `
                    <div class="spotify-user-full">
                        ${avatarHtml}
                        <div class="spotify-user-details">
                            <span class="connected-name">${user.name}</span>
                            ${statsText ? `<span class="connected-stats">${statsText}</span>` : ''}
                        </div>
                        <span class="connected-status spotify-product ${user.product || 'free'}">${productLabel}</span>
                    </div>
                    <div class="spotify-api-info">
                        <div class="api-info-row">
                            <span class="api-info-label">ID:</span>
                            <code class="api-info-value" title="${user.id}">${user.id}</code>
                        </div>
                        <div class="api-capabilities">
                            ${apiCapabilities.map(cap => `<span class="api-capability">${cap}</span>`).join('')}
                        </div>
                    </div>
                `;
                spotifyConnectedInfo.style.display = 'block';
            }
            
            showToast(`Welcome back, ${user.name}!`, 'success');
        }
    });
}

// Window Controls
function setupWindowControls() {
    elements.minimizeBtn?.addEventListener('click', () => api.minimize());
    elements.maximizeBtn?.addEventListener('click', () => api.maximize());
    elements.closeBtn?.addEventListener('click', () => api.close());
    
    // Close app button in sidebar
    elements.closeAppBtn?.addEventListener('click', () => {
        if (confirm('Are you sure you want to exit LyricsStatus?')) {
            api.close();
        }
    });
}

// Navigation
function setupNavigation() {
    elements.navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const tab = btn.dataset.tab;
            if (!tab) return;
            
            // Update active states
            elements.navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show/hide tab contents
            elements.tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tab}-tab`) {
                    content.classList.add('active');
                }
            });
            
            // Update page title
            const pageTitle = document.querySelector('.page-title');
            if (pageTitle) {
                pageTitle.textContent = tab.charAt(0).toUpperCase() + tab.slice(1);
            }
            
            // Load tab-specific data
            if (tab === 'history') {
                loadHistory();
            }
            
            if (tab === 'playlists') {
                loadPlaylists();
            }
            
            if (tab === 'lyrics') {
                // Refresh lyrics display when tab is activated
                refreshLyricsTab();
                startLyricsAnimationLoop();
            } else {
                stopLyricsAnimationLoop();
            }
            
            console.log(`Switched to ${tab} tab`);
        });
    });
}

// Event Listeners
function setupEventListeners() {
    // Toggle app
    elements.toggleBtn?.addEventListener('click', async () => {
        isRunning = await api.toggleApp();
        updateToggleButton();
    });
    
    // Playback controls - Fire and forget, instant UI
    elements.playPauseBtn?.addEventListener('click', () => {
        // Immediately toggle visual state
        const wasPlaying = isPlaying;
        isPlaying = !wasPlaying;
        
        // Update button instantly
        if (isPlaying) {
            elements.playPauseBtn?.classList.add('playing');
        } else {
            elements.playPauseBtn?.classList.remove('playing');
        }
        
        // Fire and forget - don't await
        if (wasPlaying) {
            api.pauseSong();
        } else {
            api.resumeSong();
        }
    });
    
    elements.prevBtn?.addEventListener('click', () => {
        api.previousSong();
    });
    
    elements.nextBtn?.addEventListener('click', () => {
        api.nextSong();
    });
    
    // Progress bar click to seek (like LyricGlow)
    const progressBar = document.getElementById('progress-bar');
    progressBar?.addEventListener('click', (e) => {
        if (!currentSong || !currentSong.duration) return;
        
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, clickX / rect.width));
        const seekPosition = Math.floor(percentage * currentSong.duration);
        
        // Seek to position
        api.seek(seekPosition);
    });

    // Playlist controls
    setupPlaylistListeners();
    
    // Like button - toggle liked state for current track
    elements.likeBtn?.addEventListener('click', async () => {
        if (!currentTrackId) {
            console.log('Like button clicked but no track is playing');
            showToast('No track playing', 'error');
            return;
        }
        
        console.log(`Like button clicked, current state: ${currentTrackLiked}, track: ${currentTrackId}`);
        
        // Optimistic UI update
        const wasLiked = currentTrackLiked;
        currentTrackLiked = !wasLiked;
        elements.likeBtn.classList.toggle('liked', currentTrackLiked);
        elements.likeBtn.title = currentTrackLiked ? 'Unlike' : 'Like';
        
        // Fire API call
        try {
            if (currentTrackLiked) {
                await api.saveTrack(currentTrackId);
                showToast('Added to Liked Songs', 'success');
            } else {
                await api.removeTrack(currentTrackId);
                showToast('Removed from Liked Songs', 'success');
            }
        } catch (err) {
            // Revert on error
            console.error('Like button error:', err);
            currentTrackLiked = wasLiked;
            elements.likeBtn.classList.toggle('liked', currentTrackLiked);
            elements.likeBtn.title = currentTrackLiked ? 'Unlike' : 'Like';
            showToast('Failed to update like status', 'error');
        }
    });
    
    // Volume control
    if (elements.volumeSlider) {
        elements.volumeSlider.value = currentVolume;
        updateVolumeIcon(currentVolume);
        
        elements.volumeSlider.addEventListener('input', (e) => {
            currentVolume = parseInt(e.target.value);
            if (elements.volumeValue) {
                elements.volumeValue.textContent = `${currentVolume}%`;
            }
            updateVolumeIcon(currentVolume);
        });
        
        elements.volumeSlider.addEventListener('change', async (e) => {
            const volume = parseInt(e.target.value);
            await api.setVolume(volume);
        });
    }
    
    // Volume button click - mute/unmute
    let volumeBeforeMute = 50;
    elements.volumeBtn?.addEventListener('click', async () => {
        if (currentVolume > 0) {
            volumeBeforeMute = currentVolume;
            currentVolume = 0;
        } else {
            currentVolume = volumeBeforeMute || 50;
        }
        
        if (elements.volumeSlider) elements.volumeSlider.value = currentVolume;
        if (elements.volumeValue) elements.volumeValue.textContent = `${currentVolume}%`;
        updateVolumeIcon(currentVolume);
        await api.setVolume(currentVolume);
    });
    
    // Validate token
    elements.validateToken?.addEventListener('click', async () => {
        const token = elements.discordToken.value;
        if (!token) {
            showToast('Please enter a token', 'error');
            return;
        }
        
        elements.validateToken.textContent = 'Checking...';
        const valid = await api.validateToken(token);
        elements.validateToken.textContent = 'Validate';
        
        if (valid) {
            showToast('Token is valid!', 'success');
        } else {
            showToast('Token is invalid', 'error');
        }
    });
    
    // Authorize Spotify
    elements.authorizeSpotify?.addEventListener('click', () => {
        api.authorizeSpotify();
        showToast('Opening Spotify authorization...', 'success');
    });
    
    // Emoji toggle
    elements.showEmoji?.addEventListener('change', () => {
        updateStatusPreview();
    });
    
    // Custom emoji toggle
    elements.useCustomEmoji?.addEventListener('change', () => {
        if (elements.customEmojiFields) {
            elements.customEmojiFields.style.display = elements.useCustomEmoji.checked ? 'block' : 'none';
        }
        updateStatusPreview();
    });
    
    // Emoji inputs update preview
    [elements.emojiName, elements.emojiId, elements.emojiAnimated].forEach(el => {
        el?.addEventListener('input', updateStatusPreview);
        el?.addEventListener('change', updateStatusPreview);
    });
    
    // Advanced mode toggle
    elements.advancedMode?.addEventListener('change', () => {
        elements.advancedSettings?.classList.toggle('active', elements.advancedMode.checked);
        updateStatusPreview();
    });
    
    // Preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const preset = btn.dataset.preset;
            if (preset && elements.customStatus) {
                elements.customStatus.value = preset;
                updateStatusPreview();
                showToast('Preset applied!', 'success');
            }
        });
    });
    
    // Status preview updates
    [elements.showTimestamp, elements.showLabel, elements.customStatus].forEach(el => {
        el?.addEventListener('input', updateStatusPreview);
        el?.addEventListener('change', updateStatusPreview);
    });
    
    // Theme change - handle radio buttons
    document.querySelectorAll('input[name="theme"]').forEach(radio => {
        radio.addEventListener('change', () => {
            document.documentElement.dataset.theme = radio.value;
        });
    });
    
    // Background animation selector - properly handle all modes
    const bgAnimationSelect = document.getElementById('background-animation');
    const intensitySlider = document.getElementById('animation-intensity');
    const speedSlider = document.getElementById('animation-speed');
    
    function setBackgroundAnimation(mode) {
        // Remove all animation mode classes
        const modes = ['aurora', 'mesh', 'orbs', 'particles', 'grain', 'waves', 'grid', 'rain', 'shimmer', 'liquid'];
        modes.forEach(m => document.body.classList.remove(`${m}-mode`));
        
        // Initialize liquid background if needed
        if (mode === 'liquid') {
            initLiquidBackground();
        }
        
        // Add new mode class
        if (mode && mode !== 'none') {
            document.body.classList.add(`${mode}-mode`);
        }
        
        console.log('Background animation set to:', mode);
    }
    
    if (bgAnimationSelect) {
        bgAnimationSelect.addEventListener('change', () => {
            setBackgroundAnimation(bgAnimationSelect.value);
        });
        
        // Apply initial animation on load
        setTimeout(() => {
            setBackgroundAnimation(bgAnimationSelect.value);
        }, 200);
    }
    
    if (intensitySlider) {
        intensitySlider.addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById('intensity-value').textContent = value + '%';
            document.documentElement.style.setProperty('--animation-intensity', value / 100);
        });
    }
    
    if (speedSlider) {
        speedSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById('speed-value').textContent = value + 'x';
            document.documentElement.style.setProperty('--animation-speed', value);
        });
    }
    
    // Settings tabs navigation
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanel = tab.dataset.settingsTab;
            
            // Update tab buttons
            document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update panels
            document.querySelectorAll('.settings-panel').forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${targetPanel}-panel`) {
                    panel.classList.add('active');
                }
            });
        });
    });
    
    // Save settings
    elements.saveSettings?.addEventListener('click', saveSettingsHandler);
    
    // Clear history
    elements.clearHistory?.addEventListener('click', async () => {
        await api.clearHistory();
        elements.historyList.innerHTML = `
            <div class="history-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                <p>No songs in history yet</p>
            </div>
        `;
        showToast('History cleared', 'success');
    });
    
    // About links
    elements.githubLink?.addEventListener('click', () => {
        api.openExternal('https://github.com/OvalQuilter/lyrics-status');
    });
    
    elements.reportBug?.addEventListener('click', () => {
        api.openExternal('https://github.com/OvalQuilter/lyrics-status/issues');
    });
    
    elements.openWebPanel?.addEventListener('click', () => {
        api.openExternal('http://localhost');
    });
    
    // API events
    api.onSongChanged?.((data) => {
        updateNowPlaying(data);
        stats.songsToday++;
        updateStats();
    });
    
    api.onLyricsUpdated?.((data) => {
        updateLyrics(data, currentSong);
    });
    
    api.onStatusSent?.(() => {
        stats.statusChanges++;
        updateStats();
    });
    
    // Listen for Spotify auth completion
    api.onSpotifyAuthComplete?.(async (data) => {
        console.log('Spotify auth complete:', data);
        // Reload settings to get the new refresh token
        settings = await api.getSettings();
        showToast('Spotify connected successfully!', 'success');
        
        // Update UI - reload all Spotify-related content
        await loadSpotifyUser();
        
        // Check if app is running, start it if not
        let status = await api.getStatus();
        if (!status.isRunning) {
            console.log('Starting app after Spotify auth...');
            await api.startApp();
            // Wait a moment for the app to initialize
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Refresh the entire status to update now playing, lyrics, etc.
        await updateStatus();
        
        // Force a second update after a short delay to ensure everything is synced
        setTimeout(async () => {
            await updateStatus();
            console.log('Status refreshed after Spotify auth');
        }, 1000);
    });
    
    // Settings sub-navigation handlers
    const subnavBtns = document.querySelectorAll('.subnav-btn');
    const settingsSubtabs = document.querySelectorAll('.settings-subtab');
    
    subnavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSubtab = btn.getAttribute('data-subtab');
            
            // Update active states
            subnavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show/hide subtabs
            settingsSubtabs.forEach(tab => {
                if (tab.id === `subtab-${targetSubtab}`) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
        });
    });
    
    // Help modal handlers
    const discordHelpBtn = document.getElementById('discord-help-btn');
    const discordHelpModal = document.getElementById('discord-help-modal');
    const discordHelpClose = document.getElementById('discord-help-close');
    const spotifyHelpBtn = document.getElementById('spotify-help-btn');
    const spotifyHelpModal = document.getElementById('spotify-help-modal');
    const spotifyHelpClose = document.getElementById('spotify-help-close');
    
    discordHelpBtn?.addEventListener('click', () => {
        if (discordHelpModal) discordHelpModal.style.display = 'flex';
    });
    
    discordHelpClose?.addEventListener('click', () => {
        if (discordHelpModal) discordHelpModal.style.display = 'none';
    });
    
    discordHelpModal?.addEventListener('click', (e) => {
        if (e.target === discordHelpModal) discordHelpModal.style.display = 'none';
    });
    
    spotifyHelpBtn?.addEventListener('click', () => {
        if (spotifyHelpModal) spotifyHelpModal.style.display = 'flex';
    });
    
    spotifyHelpClose?.addEventListener('click', () => {
        if (spotifyHelpModal) spotifyHelpModal.style.display = 'none';
    });
    
    spotifyHelpModal?.addEventListener('click', (e) => {
        if (e.target === spotifyHelpModal) spotifyHelpModal.style.display = 'none';
    });
    
    // Copy redirect URI button
    const copyRedirectBtn = document.getElementById('copy-redirect-uri');
    copyRedirectBtn?.addEventListener('click', async () => {
        const uri = 'http://127.0.0.1:67/callback';
        try {
            await navigator.clipboard.writeText(uri);
            copyRedirectBtn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            `;
            showToast('Redirect URI copied!', 'success');
            setTimeout(() => {
                copyRedirectBtn.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                    </svg>
                `;
            }, 2000);
        } catch (err) {
            showToast('Failed to copy', 'error');
        }
    });
    
    // Auto-extract Discord token button
    const autoExtractBtn = document.getElementById('auto-extract-token');
    autoExtractBtn?.addEventListener('click', async () => {
        autoExtractBtn.disabled = true;
        autoExtractBtn.innerHTML = `
            <svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
        `;
        
        try {
            const result = await api.extractDiscordToken();
            
            if (result.success && result.token) {
                // Fill in the token
                if (elements.discordToken) {
                    elements.discordToken.value = result.token;
                }
                showToast(`✅ Token found! Logged in as: ${result.username}`, 'success');
                
                // Auto-validate and load user info
                await loadDiscordUser(result.token);
            } else {
                // Show detailed error in console and summary in toast
                const errorMsg = result.error || 'No token found';
                console.log('Full token extraction error:', errorMsg);
                
                // Show first line in toast
                const firstLine = errorMsg.split('\n')[0];
                showToast(`❌ ${firstLine} (see console)`, 'error');
            }
        } catch (error) {
            console.error('Token extraction error:', error);
            showToast('❌ Failed to extract token. Try manual entry.', 'error');
        }
        
        autoExtractBtn.disabled = false;
        autoExtractBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </svg>
        `;
    });
    
    // Language selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect && window.i18n) {
        // Set current language
        languageSelect.value = window.i18n.getCurrentLanguage();
        
        languageSelect.addEventListener('change', async () => {
            const newLang = languageSelect.value;
            window.i18n.setLanguage(newLang);
            
            // Save language to settings
            settings.general = settings.general || {};
            settings.general.language = newLang;
            await api.setSettings(settings);
            
            showToast(newLang === 'de' ? 'Sprache geändert!' : 'Language changed!', 'success');
        });
    }
    
    // Spotify Search functionality
    setupSearchFunctionality();
}

// Setup Spotify Search
function setupSearchFunctionality() {
    const searchInput = document.getElementById('spotify-search-input');
    const searchBtn = document.getElementById('spotify-search-btn');
    const searchResults = document.getElementById('search-results');
    const searchTabs = document.querySelectorAll('.search-tab');
    
    let currentSearchType = 'tracks';
    let searchTimeout = null;
    
    // Tab switching
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            searchTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentSearchType = tab.dataset.searchType;
            
            // Update placeholder
            if (searchInput) {
                searchInput.placeholder = currentSearchType === 'tracks' 
                    ? 'Search for songs, tracks...' 
                    : 'Search for artists...';
            }
            
            // Clear results
            if (searchResults) {
                searchResults.innerHTML = '<div class="search-placeholder">Enter a search term to find music</div>';
            }
        });
    });
    
    // Search function
    async function performSearch() {
        const query = searchInput?.value?.trim();
        if (!query) return;
        
        if (!searchResults) return;
        
        // Show loading
        searchResults.innerHTML = '<div class="search-loading">Searching...</div>';
        
        try {
            if (currentSearchType === 'tracks') {
                const results = await api.searchTracks(query, 10);
                displayTrackResults(results);
            } else {
                const results = await api.searchArtists(query, 10);
                displayArtistResults(results);
            }
        } catch (err) {
            console.error('Search error:', err);
            searchResults.innerHTML = '<div class="search-empty">Search failed. Please try again.</div>';
        }
    }
    
    // Display track results
    function displayTrackResults(tracks) {
        if (!tracks || tracks.length === 0) {
            searchResults.innerHTML = '<div class="search-empty">No tracks found</div>';
            return;
        }
        
        searchResults.innerHTML = tracks.map(track => `
            <div class="search-result-item" data-uri="${track.uri}">
                <img src="${track.albumArt || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 48 48\'%3E%3Crect fill=\'%23333\' width=\'48\' height=\'48\'/%3E%3C/svg%3E'}" 
                     alt="" class="search-result-image">
                <div class="search-result-info">
                    <div class="search-result-title">${escapeHtml(track.name)}</div>
                    <div class="search-result-subtitle">${escapeHtml(track.artist)} • ${escapeHtml(track.album)}</div>
                </div>
                <button class="search-result-play" title="Play">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                </button>
            </div>
        `).join('');
        
        // Add click handlers
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', async (e) => {
                if (e.target.closest('.search-result-play')) {
                    const uri = item.dataset.uri;
                    if (uri) {
                        await api.playSong({ uri });
                        showToast('Playing track...', 'success');
                    }
                }
            });
        });
    }
    
    // Display artist results
    function displayArtistResults(artists) {
        if (!artists || artists.length === 0) {
            searchResults.innerHTML = '<div class="search-empty">No artists found</div>';
            return;
        }
        
        searchResults.innerHTML = artists.map(artist => `
            <div class="search-result-item" data-artist-id="${artist.id}">
                <img src="${artist.image || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 48 48\'%3E%3Ccircle fill=\'%23333\' cx=\'24\' cy=\'24\' r=\'24\'/%3E%3C/svg%3E'}" 
                     alt="" class="search-result-image artist">
                <div class="search-result-info">
                    <div class="search-result-title">${escapeHtml(artist.name)}</div>
                    <div class="search-result-subtitle">${artist.followers ? artist.followers.toLocaleString() + ' followers' : ''}${artist.genres?.length ? ' • ' + artist.genres.join(', ') : ''}</div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers to view artist top tracks
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', async () => {
                const artistId = item.dataset.artistId;
                if (artistId) {
                    // Load artist top tracks
                    const tracks = await api.getArtistTopTracks(artistId);
                    if (tracks && tracks.length > 0) {
                        displayTrackResults(tracks);
                        // Update tab to tracks
                        searchTabs.forEach(t => t.classList.remove('active'));
                        document.querySelector('[data-search-type="tracks"]')?.classList.add('active');
                        currentSearchType = 'tracks';
                    }
                }
            });
        });
    }
    
    // Search on button click
    searchBtn?.addEventListener('click', performSearch);
    
    // Search on Enter key
    searchInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Debounced search on type (optional)
    searchInput?.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (searchInput.value.trim().length >= 3) {
                performSearch();
            }
        }, 500);
    });
    
    // Genre chip click handlers
    document.querySelectorAll('.genre-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const genre = chip.dataset.genre;
            if (searchInput) {
                searchInput.value = genre;
                performSearch();
            }
        });
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load Settings
async function loadSettings() {
    settings = await api.getSettings();
    
    // Credentials
    if (elements.discordToken) elements.discordToken.value = settings.credentials?.token || '';
    if (elements.clientId) elements.clientId.value = settings.credentials?.clientID || '';
    if (elements.clientSecret) elements.clientSecret.value = settings.credentials?.clientSecret || '';
    if (elements.useExternalAuth) elements.useExternalAuth.checked = settings.credentials?.useExternalAuthServer || false;
    
    // View
    if (elements.showTimestamp) elements.showTimestamp.checked = settings.view?.timestamp ?? true;
    if (elements.showLabel) elements.showLabel.checked = settings.view?.label ?? true;
    
    // Emoji settings
    if (elements.showEmoji) elements.showEmoji.checked = settings.view?.emoji?.enabled ?? true;
    if (elements.emojiName) elements.emojiName.value = settings.view?.emoji?.name || '🎶';
    if (elements.useCustomEmoji) elements.useCustomEmoji.checked = !!settings.view?.emoji?.id;
    if (elements.emojiId) elements.emojiId.value = settings.view?.emoji?.id || '';
    if (elements.emojiAnimated) elements.emojiAnimated.checked = settings.view?.emoji?.animated || false;
    if (elements.customEmojiFields) {
        elements.customEmojiFields.style.display = elements.useCustomEmoji?.checked ? 'block' : 'none';
    }
    
    if (elements.advancedMode) elements.advancedMode.checked = settings.view?.advanced?.enabled || false;
    if (elements.customStatus) elements.customStatus.value = settings.view?.advanced?.customStatus || '[{timestamp}] {lyrics}';
    
    if (settings.view?.advanced?.enabled && elements.advancedSettings) {
        elements.advancedSettings.classList.add('active');
    }
    
    // Timings
    if (elements.timeOffset) elements.timeOffset.value = settings.timings?.sendTimeOffset || 500;
    if (elements.autoOffset) elements.autoOffset.checked = settings.timings?.enableAutooffset ?? true;
    if (elements.offsetSamples) elements.offsetSamples.value = settings.timings?.autooffset || 3;
    
    // General
    if (elements.autoStart) elements.autoStart.checked = settings.general?.autoStart || false;
    if (elements.startMinimized) elements.startMinimized.checked = settings.general?.startMinimized || false;
    if (elements.autoUpdate) elements.autoUpdate.checked = settings.update?.enableAutoupdate ?? true;
    
    // Language - update selector and apply
    const languageSelect = document.getElementById('language-select');
    const savedLanguage = settings.general?.language || 'en';
    if (languageSelect) {
        languageSelect.value = savedLanguage;
    }
    if (window.i18n) {
        window.i18n.initLanguage(savedLanguage);
    }
    
    // Theme - handle both old select and new radio buttons
    const theme = settings.general?.theme || 'dark';
    const themeRadio = document.querySelector(`input[name="theme"][value="${theme}"]`);
    if (themeRadio) themeRadio.checked = true;
    
    // Apply theme
    document.documentElement.dataset.theme = theme;
    
    // Background Animation settings
    const bgAnimation = settings.general?.backgroundAnimation || 'liquid';
    const bgAnimationSelect = document.getElementById('background-animation');
    if (bgAnimationSelect) {
        bgAnimationSelect.value = bgAnimation;
        // Remove old animation mode classes first
        const modes = ['aurora', 'mesh', 'orbs', 'particles', 'grain', 'waves', 'grid', 'rain', 'shimmer', 'liquid'];
        modes.forEach(m => document.body.classList.remove(`${m}-mode`));
        // Apply new animation class
        if (bgAnimation && bgAnimation !== 'none') {
            document.body.classList.add(`${bgAnimation}-mode`);
            console.log('Applied background animation:', bgAnimation);
        }
    }
    
    const animationIntensity = settings.general?.animationIntensity || 60;
    const intensitySlider = document.getElementById('animation-intensity');
    if (intensitySlider) {
        intensitySlider.value = animationIntensity;
        document.getElementById('intensity-value').textContent = animationIntensity + '%';
        document.documentElement.style.setProperty('--animation-intensity', animationIntensity / 100);
    }
    
    const animationSpeed = settings.general?.animationSpeed || 1.2;
    const speedSlider = document.getElementById('animation-speed');
    if (speedSlider) {
        speedSlider.value = animationSpeed;
        document.getElementById('speed-value').textContent = animationSpeed + 'x';
        document.documentElement.style.setProperty('--animation-speed', animationSpeed);
    }
    
    // Load Discord profile for preview (non-blocking)
    loadDiscordProfilePreview().catch(() => {});
    
    updateStatusPreview();
}

// Save Settings
async function saveSettingsHandler() {
    // Get theme from radio buttons
    const selectedTheme = document.querySelector('input[name="theme"]:checked')?.value || 'dark';
    // Get language from selector
    const selectedLanguage = document.getElementById('language-select')?.value || 'en';
    // Get background animation settings
    const bgAnimation = document.getElementById('background-animation')?.value || 'liquid';
    const animationIntensity = parseInt(document.getElementById('animation-intensity')?.value) || 60;
    const animationSpeed = parseFloat(document.getElementById('animation-speed')?.value) || 1.2;
    
    const newSettings = {
        credentials: {
            ...settings.credentials,
            token: elements.discordToken?.value || '',
            clientID: elements.clientId?.value || '',
            clientSecret: elements.clientSecret?.value || '',
            customRedirectUri: 'http://127.0.0.1:67/callback',
            useExternalAuthServer: elements.useExternalAuth?.checked || false
        },
        view: {
            timestamp: elements.showTimestamp?.checked ?? true,
            label: elements.showLabel?.checked ?? true,
            emoji: {
                enabled: elements.showEmoji?.checked ?? true,
                name: elements.emojiName?.value || '🎶',
                id: elements.useCustomEmoji?.checked ? (elements.emojiId?.value || null) : null,
                animated: elements.useCustomEmoji?.checked ? (elements.emojiAnimated?.checked || false) : false
            },
            advanced: {
                enabled: elements.advancedMode?.checked || false,
                customStatus: elements.customStatus?.value || '[{timestamp}] {lyrics}'
            }
        },
        timings: {
            sendTimeOffset: parseInt(elements.timeOffset?.value) || 500,
            enableAutooffset: elements.autoOffset?.checked ?? true,
            autooffset: parseInt(elements.offsetSamples?.value) || 3
        },
        general: {
            autoStart: elements.autoStart?.checked || false,
            startMinimized: elements.startMinimized?.checked || false,
            theme: selectedTheme,
            language: selectedLanguage,
            backgroundAnimation: bgAnimation,
            animationIntensity: animationIntensity,
            animationSpeed: animationSpeed
        },
        update: {
            enableAutoupdate: elements.autoUpdate?.checked ?? true
        }
    };
    
    await api.setSettings(newSettings);
    settings = newSettings;
    showToast('Settings saved successfully!', 'success');
}

// Update Status
async function updateStatus() {
    const status = await api.getStatus();
    isRunning = status.isRunning;
    cachedSongsCount = status.cachedSongs || 0;
    
    updateToggleButton();
    updateCachedSongsDisplay();
    
    if (status.currentSong) {
        updateNowPlaying(status.currentSong);
        updateProgressClock(status.currentSong.progress ?? status.currentSong.position ?? 0, status.isPlaying);
    }
    
    if (status.currentLyrics) {
        updateLyrics(status.currentLyrics, status.currentSong);
    }
    
    // Update stats from persisted data
    if (status.stats) {
        stats.songsToday = status.stats.songsToday || 0;
        stats.statusChanges = status.stats.statusChanges || 0;
        stats.lyricsFound = status.stats.lyricsFoundCount || 0;
        stats.totalSongs = status.stats.totalSongsPlayed || 0;
        updateStats();
    }
}

// Update Toggle Button - Professional Style
function updateToggleButton() {
    const statusBadge = document.getElementById('status-badge');
    const statusText = document.getElementById('status-text');
    const toggleBtn = document.getElementById('toggle-btn');
    const toggleText = document.getElementById('toggle-text');
    
    if (isRunning) {
        // Update status badge
        statusBadge?.classList.add('running');
        if (statusText) statusText.textContent = 'Running';
        
        // Update toggle button
        if (toggleBtn) {
            toggleBtn.classList.remove('start');
            toggleBtn.classList.add('stop');
            toggleBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                </svg>
                <span>Stop Sync</span>
            `;
        }
    } else {
        // Update status badge
        statusBadge?.classList.remove('running');
        if (statusText) statusText.textContent = 'Stopped';
        
        // Update toggle button
        if (toggleBtn) {
            toggleBtn.classList.remove('stop');
            toggleBtn.classList.add('start');
            toggleBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                <span>Start Sync</span>
            `;
        }
    }
}

// Update Play/Pause Button
function updatePlayPauseButton() {
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    
    if (isPlaying) {
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
    } else {
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
    }
}

// Update Now Playing
function updateNowPlaying(song) {
    // Store current song globally for status preview
    currentSong = song;
    
    // Update track ID and check like status
    if (song.id && song.id !== currentTrackId) {
        currentTrackId = song.id;
        // Reset lyrics tracking when song changes
        lastDisplayedLine = '';
        karaokeCache.lineKey = '';
        // Check if track is liked (async, don't block)
        checkTrackLikeStatus(song.id);
    }
    
    const notPlayingText = typeof t === 'function' ? t('dashboard.notPlaying') : 'Not Playing';
    if (elements.songTitle) elements.songTitle.textContent = song.name || notPlayingText;
    if (elements.songArtist) elements.songArtist.textContent = song.artist || '-';
    if (elements.totalTime) elements.totalTime.textContent = formatTime(song.duration);
    
    // Update album art
    if (elements.albumArt && song.albumArt) {
        elements.albumArt.src = song.albumArt;
    } else if (elements.albumArt && !song.albumArt) {
        elements.albumArt.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%231f1f23' width='100' height='100'/%3E%3Cpath fill='%236b6b85' d='M50 30v30c-2-1-4-2-6-2-5 0-9 4-9 9s4 9 9 9 9-4 9-9V40h9V30h-12z'/%3E%3C/svg%3E";
    }
}


// Update Cached Songs Display
function updateCachedSongsDisplay() {
    if (elements.cachedSongs) {
        elements.cachedSongs.textContent = cachedSongsCount;
    }
}

// Update Stats
function updateStats() {
    if (elements.songsToday) elements.songsToday.textContent = stats.songsToday;
    if (elements.statusChanges) elements.statusChanges.textContent = stats.statusChanges;
    
    const percentage = stats.songsToday > 0 
        ? Math.round((stats.lyricsFound / stats.songsToday) * 100) 
        : 0;
    if (elements.lyricsFound) elements.lyricsFound.textContent = `${percentage}%`;
}

// Update Status Preview - Real-time with current lyrics
function updateStatusPreview(forceStatic = false) {
    let preview = '';
    const statusPreviewEl = elements.statusPreview?.parentElement;
    
    // Use real lyrics if running and available
    const useRealLyrics = isRunning && currentLyricText && !forceStatic;
    // If no lyrics, use song name instead
    const songName = currentSong?.name || 'Song Name';
    const songArtist = currentSong?.artist || 'Artist';
    const displayLyrics = useRealLyrics ? currentLyricText : songName;
    const hasLyrics = isRunning && currentLyricText;
    
    // Add/remove live indicator
    if (statusPreviewEl) {
        if (isRunning) {
            statusPreviewEl.classList.add('live');
        } else {
            statusPreviewEl.classList.remove('live');
        }
    }
    
    // Check settings values - use actual DOM values
    const advancedEnabled = settings?.view?.advanced?.enabled || elements.advancedMode?.checked;
    const showTimestamp = settings?.view?.timestamp ?? elements.showTimestamp?.checked ?? false;
    const showLabel = settings?.view?.label ?? elements.showLabel?.checked ?? false;
    const customFormat = elements.customStatus?.value || settings?.view?.advanced?.customStatus || '{lyrics}';
    
    if (advancedEnabled) {
        // In advanced mode, use custom format exactly as user defined (preserve their emojis)
        preview = customFormat
            .replace('{lyrics}', hasLyrics ? displayLyrics : songName)
            .replace('{lyrics_upper}', (hasLyrics ? displayLyrics : songName).toUpperCase())
            .replace('{lyrics_lower}', (hasLyrics ? displayLyrics : songName).toLowerCase())
            .replace('{timestamp}', formatTime(currentSong?.progress || 0))
            .replace('{song_name}', songName)
            .replace('{song_author}', songArtist);
    } else {
        if (showTimestamp) {
            preview += `[${formatTime(currentSong?.progress || 0)}] `;
        }
        if (showLabel) {
            preview += 'Song lyrics - ';
        }
        preview += displayLyrics;
        // Add custom emoji in non-advanced mode
        const showEmoji = elements.showEmoji?.checked ?? true;
        if (showEmoji) {
            const emojiName = elements.emojiName?.value || '🎶';
            preview = `${emojiName} ${preview}`;
        }
    }
    
    if (elements.statusPreview) elements.statusPreview.textContent = preview;
    
    // Also update Discord profile preview
    updateDiscordProfilePreview();
}

// Load History with click-to-play functionality
async function loadHistory() {
    const history = await api.getHistory();
    
    if (!history || history.length === 0) {
        elements.historyList.innerHTML = `
            <div class="history-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                <p>No songs in history yet</p>
            </div>
        `;
        return;
    }
    
    elements.historyList.innerHTML = history.map((item, index) => `
        <div class="history-item" data-index="${index}" data-uri="${escapeHtml(item.spotifyUri || '')}" data-name="${escapeHtml(item.name)}" data-artist="${escapeHtml(item.artist)}">
            <div class="history-number">#${index + 1}</div>
            <div class="history-album ${item.albumArt ? 'has-art' : ''}">
                ${item.albumArt 
                    ? `<img src="${escapeHtml(item.albumArt)}" alt="Album art" />`
                    : `<svg class="play-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                       </svg>`
                }
                <div class="history-album-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                </div>
            </div>
            <div class="history-info">
                <div class="history-song">${escapeHtml(item.name)}</div>
                <div class="history-artist">${escapeHtml(item.artist)}</div>
            </div>
            <div class="history-meta">
                <div class="history-time">${formatRelativeTime(item.timestamp)}</div>
                <div class="history-plays">${item.playCount || 1}x played</div>
            </div>
            <span class="history-lyrics-badge ${item.hadLyrics ? '' : 'no-lyrics'}">
                ${item.hadLyrics ? 'Lyrics' : 'No Lyrics'}
            </span>
        </div>
    `).join('');
    
    // Add click handlers to play songs
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', async () => {
            const uri = item.dataset.uri;
            const name = item.dataset.name;
            const artist = item.dataset.artist;
            
            // Show loading state
            item.classList.add('loading');
            
            try {
                const result = await api.playSong({ 
                    uri: uri || undefined, 
                    name, 
                    artist 
                });
                
                if (result.success) {
                    showToast(`Now playing: ${name}`, 'success');
                } else {
                    showToast(result.error || 'Failed to play song', 'error');
                }
            } catch (error) {
                showToast('Failed to play song. Make sure Spotify is open.', 'error');
            }
            
            item.classList.remove('loading');
        });
    });
}

// Start Update Loop
let updateLoopRunning = false;
function startUpdateLoop() {
    if (updateLoopRunning) {
        console.log('Update loop already running, skipping');
        return;
    }
    updateLoopRunning = true;
    console.log('Starting update loop');
    
    // Update progress bar every second
    setInterval(async () => {
        const status = await api.getStatus();
        
        // Debug logging
        if (!status.currentSong && status.isRunning) {
            console.log('Status update - running but no currentSong:', status);
        }
        
        if (status.currentSong) {
            const progress = status.currentSong.progress;
            const duration = status.currentSong.duration;
            
            if (elements.currentTime) elements.currentTime.textContent = formatTime(progress);
            if (elements.progressFill) elements.progressFill.style.width = `${(progress / duration) * 100}%`;
            
            // Update song info and album art
            updateNowPlaying(status.currentSong);
            updateProgressClock(status.currentSong.progress ?? status.currentSong.position ?? 0, status.isPlaying);
        } else {
            // No song playing - reset UI
            if (elements.songTitle) {
                const notPlayingText = typeof t === 'function' ? t('dashboard.notPlaying') : 'Not Playing';
                if (elements.songTitle.textContent !== notPlayingText) {
                    elements.songTitle.textContent = notPlayingText;
                }
            }
            if (elements.songArtist) elements.songArtist.textContent = '-';
            if (elements.currentTime) elements.currentTime.textContent = '0:00';
            if (elements.progressFill) elements.progressFill.style.width = '0%';
            
            // Reset lyrics when no song
            if (elements.currentLyric) {
                elements.currentLyric.innerHTML = '<span class="word active">Start playing music to see lyrics</span>';
            }
        }
        
        // Update lyrics display
        if (status.currentLyrics) {
            updateLyrics(status.currentLyrics, status.currentSong);
        }
        
        // Update cached songs count
        if (status.cachedSongs !== undefined) {
            cachedSongsCount = status.cachedSongs;
            updateCachedSongsDisplay();
        }
        
        // Update stats - always update from persisted data
        if (status.stats) {
            stats.songsToday = status.stats.songsToday || 0;
            stats.statusChanges = status.stats.statusChanges || 0;
            stats.lyricsFound = status.stats.lyricsFoundCount || 0;
            updateStats();
        }
        
        // Always update play/pause button state
        isPlaying = status.isPlaying || false;
        updatePlayPauseButton();
        
        // Update running state
        if (status.isRunning !== isRunning) {
            isRunning = status.isRunning;
            updateToggleButton();
        }
        
        // Update status preview with live data
        updateStatusPreview();
    }, 500); // Update every 500ms for smoother lyrics
}

// Utility Functions
function formatTime(ms) {
    if (!ms) return '0:00';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatRelativeTime(timestamp) {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Connection type icons
const connectionIcons = {
    spotify: 'https://cdn.simpleicons.org/spotify/1DB954',
    github: 'https://cdn.simpleicons.org/github/white',
    twitter: 'https://cdn.simpleicons.org/x/white',
    twitch: 'https://cdn.simpleicons.org/twitch/9146FF',
    youtube: 'https://cdn.simpleicons.org/youtube/FF0000',
    steam: 'https://cdn.simpleicons.org/steam/white',
    reddit: 'https://cdn.simpleicons.org/reddit/FF4500',
    playstation: 'https://cdn.simpleicons.org/playstation/003791',
    xbox: 'https://cdn.simpleicons.org/xbox/107C10',
    battlenet: 'https://cdn.simpleicons.org/battledotnet/00AEFF',
    instagram: 'https://cdn.simpleicons.org/instagram/E4405F',
    facebook: 'https://cdn.simpleicons.org/facebook/1877F2',
    tiktok: 'https://cdn.simpleicons.org/tiktok/white',
    domain: 'https://cdn.simpleicons.org/googlechrome/white',
    epicgames: 'https://cdn.simpleicons.org/epicgames/white',
    riotgames: 'https://cdn.simpleicons.org/riotgames/D32936',
    leagueoflegends: 'https://cdn.simpleicons.org/leagueoflegends/C28F2C',
    paypal: 'https://cdn.simpleicons.org/paypal/00457C',
    ebay: 'https://cdn.simpleicons.org/ebay/E53238',
    crunchyroll: 'https://cdn.simpleicons.org/crunchyroll/F47521',
};

// Load Discord profile for preview
async function loadDiscordProfilePreview() {
    try {
        const discordUser = await api.getDiscordUser();
        if (discordUser) {
            const previewAvatar = document.getElementById('preview-avatar');
            const previewUsername = document.getElementById('preview-username');
            const previewHandle = document.getElementById('preview-handle');
            const previewBanner = document.getElementById('preview-banner');
            const previewBadges = document.getElementById('preview-badges');
            const previewBio = document.getElementById('preview-bio');
            const previewAboutSection = document.getElementById('preview-about-section');
            const previewConnections = document.getElementById('preview-connections');
            const previewConnectionsSection = document.getElementById('preview-connections-section');
            const discordConnectedInfo = document.getElementById('discord-connected-info');
            const previewCard = document.getElementById('discord-profile-preview');
            const previewAvatarBorder = document.getElementById('preview-avatar-border');
            
            // Helper function to convert decimal color to hex
            const decimalToHex = (decimal) => {
                if (!decimal && decimal !== 0) return null;
                // Handle both decimal numbers and hex strings
                if (typeof decimal === 'number') {
                    return '#' + decimal.toString(16).padStart(6, '0');
                }
                // Already a hex string
                if (typeof decimal === 'string' && decimal.startsWith('#')) {
                    return decimal;
                }
                return decimal;
            };
            
            // Get theme colors - priority: theme_colors > accent_color > banner_color > default
            // Discord sends these as decimal integers (e.g., 8323072 = #7F00FF)
            const themeColors = discordUser.themeColors;
            let primaryColor = '#5865f2'; // Default Discord blurple
            let secondaryColor = '#eb459e'; // Default Discord pink
            
            if (themeColors && themeColors.length >= 2) {
                // User has Nitro theme colors (decimal format from Discord)
                primaryColor = decimalToHex(themeColors[0]) || primaryColor;
                secondaryColor = decimalToHex(themeColors[1]) || secondaryColor;
            } else if (discordUser.accentColor) {
                // Use accent color (decimal format from Discord)
                const accentHex = decimalToHex(discordUser.accentColor);
                if (accentHex) {
                    primaryColor = accentHex;
                    secondaryColor = accentHex;
                }
            } else if (discordUser.bannerColor) {
                // Use banner color (usually hex format)
                primaryColor = discordUser.bannerColor;
                secondaryColor = discordUser.bannerColor;
            }
            
            console.log('Discord Theme:', {
                themeColors,
                accentColor: discordUser.accentColor,
                bannerColor: discordUser.bannerColor,
                applied: { primaryColor, secondaryColor }
            });
            
            // Apply CSS custom property for accent color to the card
            if (previewCard) {
                previewCard.style.setProperty('--user-accent-color', primaryColor);
                previewCard.style.setProperty('--user-secondary-color', secondaryColor);
                
                // Set CSS custom properties for the gradient
                previewCard.style.setProperty('--theme-color-1', primaryColor);
                previewCard.style.setProperty('--theme-color-2', secondaryColor);
                
                // Apply Discord Nitro theme if user has theme colors
                // This creates the full-card gradient effect
                if (themeColors && themeColors.length >= 2) {
                    previewCard.classList.add('has-nitro-theme');
                    console.log('Nitro theme applied - full card gradient');
                } else {
                    previewCard.classList.remove('has-nitro-theme');
                }
            }
            
            if (previewAvatar && discordUser.avatar) {
                previewAvatar.src = discordUser.avatar;
            }
            
            // Apply theme color to avatar border container
            if (previewAvatarBorder) {
                if (themeColors && themeColors.length >= 2) {
                    // Use gradient for Nitro users
                    previewAvatarBorder.style.background = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
                } else {
                    previewAvatarBorder.style.background = primaryColor;
                }
                previewAvatarBorder.style.boxShadow = `0 0 20px ${primaryColor}60`;
            }
            
            if (previewUsername) {
                previewUsername.textContent = discordUser.globalName || discordUser.username || 'Username';
                
                // Apply gradient text effect if user has display_name_styles colors
                const displayNameColors = discordUser.displayNameColors;
                if (displayNameColors && displayNameColors.length >= 2) {
                    // Convert decimal colors to hex
                    const color1 = decimalToHex(displayNameColors[0]) || displayNameColors[0];
                    const color2 = decimalToHex(displayNameColors[1]) || displayNameColors[1];
                    // Create gradient text effect
                    previewUsername.style.background = `linear-gradient(90deg, ${color1}, ${color2})`;
                    previewUsername.style.webkitBackgroundClip = 'text';
                    previewUsername.style.webkitTextFillColor = 'transparent';
                    previewUsername.style.backgroundClip = 'text';
                    console.log('Applied display name gradient:', color1, color2);
                } else {
                    // Reset to default white text
                    previewUsername.style.background = '';
                    previewUsername.style.webkitBackgroundClip = '';
                    previewUsername.style.webkitTextFillColor = '';
                    previewUsername.style.backgroundClip = '';
                }
            }
            if (previewHandle) {
                previewHandle.textContent = discordUser.username || 'username';
            }
            
            // Apply banner image if user has one
            if (previewBanner && discordUser.banner) {
                previewBanner.style.backgroundImage = `url(${discordUser.banner})`;
                previewBanner.style.backgroundSize = 'cover';
                previewBanner.style.backgroundPosition = 'center';
                console.log('Applied banner image on top of gradient');
            } else if (previewBanner) {
                previewBanner.style.backgroundImage = '';
            }
            
            // Show all badges including Nitro
            if (previewBadges && discordUser.badges && discordUser.badges.length > 0) {
                previewBadges.innerHTML = discordUser.badges.map(badge => 
                    `<img src="${badge.icon}" alt="${badge.name}" title="${badge.name}" class="badge-icon" onerror="this.style.display='none'" />`
                ).join('');
            }
            
            // Show bio if available
            if (previewBio && previewAboutSection && discordUser.bio) {
                previewBio.textContent = discordUser.bio;
                previewAboutSection.style.display = 'block';
            }
            
            // Show connections if available (all visible ones)
            if (previewConnections && previewConnectionsSection && discordUser.connections && discordUser.connections.length > 0) {
                const visibleConnections = discordUser.connections.filter(c => c.visibility === 1).slice(0, 8);
                if (visibleConnections.length > 0) {
                    previewConnections.innerHTML = visibleConnections.map(conn => {
                        const icon = connectionIcons[conn.type] || 'https://cdn.simpleicons.org/link/white';
                        return `<div class="connection-item">
                            <img src="${icon}" alt="${conn.type}" onerror="this.src='https://cdn.simpleicons.org/link/white'" />
                            <span class="connection-name" title="${conn.name}">${conn.name}</span>
                        </div>`;
                    }).join('');
                    previewConnectionsSection.style.display = 'block';
                }
            }
            
            // Update connected account info in credentials
            if (discordConnectedInfo) {
                // Show full Discord user info
                const premiumText = discordUser.premiumType ? 
                    (discordUser.premiumType === 2 ? 'Nitro' : discordUser.premiumType === 1 ? 'Nitro Classic' : '') : '';
                
                discordConnectedInfo.innerHTML = `
                    <div class="discord-user-full">
                        <img src="${discordUser.avatar || ''}" alt="" class="connected-avatar" />
                        <div class="discord-user-details">
                            <span class="connected-name">${discordUser.globalName || discordUser.username}</span>
                            <span class="connected-username">@${discordUser.username}</span>
                            ${premiumText ? `<span class="connected-premium">${premiumText}</span>` : ''}
                        </div>
                        <span class="connected-status discord-status">Connected &#10003;</span>
                    </div>
                `;
                discordConnectedInfo.style.display = 'block';
            }
        }
    } catch (err) {
        console.error('Failed to load Discord profile for preview:', err);
    }
}

// Load Discord user info after token validation/extraction
async function loadDiscordUser(token) {
    // Temporarily set the token for validation
    const originalSettings = await api.getSettings();
    originalSettings.credentials = originalSettings.credentials || {};
    originalSettings.credentials.token = token;
    await api.setSettings(originalSettings);
    
    // Load profile preview
    await loadDiscordProfilePreview();
}

// Update Discord profile preview with current song
function updateDiscordProfilePreview() {
    const previewStatus = document.getElementById('preview-discord-status');
    const previewSongName = document.getElementById('preview-song-name');
    const previewArtistName = document.getElementById('preview-artist-name');
    const previewAlbumArt = document.getElementById('preview-album-art');
    
    if (previewStatus && elements.statusPreview) {
        const statusText = elements.statusPreview.textContent;
        previewStatus.textContent = statusText || '♪ Listening to lyrics...';
    }
    
    if (currentSong) {
        if (previewSongName) previewSongName.textContent = currentSong.name || 'Song Name';
        if (previewArtistName) previewArtistName.textContent = `by ${currentSong.artist || 'Artist'}`;
        if (previewAlbumArt && currentSong.albumArt) previewAlbumArt.src = currentSong.albumArt;
    }
}

// Update volume icon based on level
function updateVolumeIcon(volume) {
    const control = elements.volumeControl;
    if (!control) return;
    
    if (volume === 0) {
        control.dataset.level = 'mute';
    } else if (volume < 50) {
        control.dataset.level = 'low';
    } else {
        control.dataset.level = 'high';
    }
}

// Check if current track is liked
async function checkTrackLikeStatus(trackId) {
    try {
        currentTrackLiked = await api.isTrackSaved(trackId);
        if (elements.likeBtn) {
            elements.likeBtn.classList.toggle('liked', currentTrackLiked);
            elements.likeBtn.title = currentTrackLiked ? 'Unlike' : 'Like';
        }
    } catch (err) {
        console.error('Failed to check like status:', err);
    }
}

function showToast(message, type = 'success') {
    if (!elements.toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-close">×</button>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });
    
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// ============================================
// PLAYLISTS
// ============================================

async function loadPlaylists() {
    if (!elements.playlistsGrid) return;
    
    // Add loading state to button
    elements.refreshPlaylists?.classList.add('loading');
    
    elements.playlistsGrid.innerHTML = `
        <div class="playlists-loading">
            <div class="loading-spinner"></div>
        </div>
    `;
    
    try {
        // Fetch both liked songs and playlists in parallel
        const [likedSongs, playlists] = await Promise.all([
            api.getLikedSongs(),
            api.getPlaylists()
        ]);
        
        let html = '';
        
        // Add Liked Songs card first (special card with gradient)
        if (likedSongs && likedSongs.total > 0) {
            html += `
                <div class="playlist-item liked-songs-item" data-playlist-id="liked" data-playlist-name="Liked Songs" data-playlist-tracks="${likedSongs.total}">
                    <div class="playlist-item-cover liked-songs-cover">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </div>
                    <div class="playlist-item-info">
                        <div class="playlist-item-name">Liked Songs</div>
                        <div class="playlist-item-count">${likedSongs.total} tracks</div>
                    </div>
                </div>
            `;
        }
        
        // Add regular playlists
        if (playlists && playlists.length > 0) {
            html += playlists.map(playlist => `
                <div class="playlist-item" data-playlist-id="${playlist.id}" data-playlist-name="${escapeHtml(playlist.name)}" data-playlist-tracks="${playlist.tracks.total}" data-playlist-image="${playlist.images[0]?.url || ''}">
                    ${playlist.images[0]?.url 
                        ? `<img class="playlist-item-cover" src="${playlist.images[0].url}" alt="${escapeHtml(playlist.name)}">`
                        : `<div class="playlist-item-cover" style="background: var(--bg-elevated); display: flex; align-items: center; justify-content: center;">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity: 0.5;">
                                <path d="M9 18V5l12-2v13"/>
                                <circle cx="6" cy="18" r="3"/>
                                <circle cx="18" cy="16" r="3"/>
                            </svg>
                        </div>`
                    }
                    <div class="playlist-item-info">
                        <div class="playlist-item-name">${escapeHtml(playlist.name)}</div>
                        <div class="playlist-item-count">${playlist.tracks.total} tracks</div>
                    </div>
                </div>
            `).join('');
        }
        
        if (!html) {
            elements.playlistsGrid.innerHTML = `
                <div class="playlists-empty">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                        <polyline points="17 21 17 13 7 13 7 21"/>
                        <polyline points="7 3 7 8 15 8"/>
                    </svg>
                    <p>No playlists found</p>
                </div>
            `;
            return;
        }
        
        elements.playlistsGrid.innerHTML = html;
        
        // Remove loading state from button
        elements.refreshPlaylists?.classList.remove('loading');
        
        // Add click handlers
        document.querySelectorAll('.playlist-item').forEach(card => {
            card.addEventListener('click', () => {
                const playlistId = card.dataset.playlistId;
                const playlistName = card.dataset.playlistName;
                const trackCount = card.dataset.playlistTracks;
                const imageUrl = card.dataset.playlistImage || '';
                openPlaylist(playlistId, playlistName, trackCount, imageUrl);
            });
        });
        
    } catch (error) {
        // Remove loading state on error too
        elements.refreshPlaylists?.classList.remove('loading');
        console.error('Failed to load playlists:', error);
        elements.playlistsGrid.innerHTML = `
            <div class="playlists-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p>Failed to load playlists</p>
            </div>
        `;
    }
}

async function openPlaylist(playlistId, name, trackCount, imageUrl) {
    if (!elements.playlistModal) return;
    
    elements.playlistModal.style.display = 'flex';
    elements.playlistModal.dataset.currentPlaylistId = playlistId;
    elements.playlistModalName.textContent = name;
    elements.playlistModalTracks.textContent = `${trackCount} tracks`;
    
    // Special handling for Liked Songs cover
    if (playlistId === 'liked') {
        elements.playlistModalCover.style.display = 'none';
        // Add a liked songs gradient indicator
        elements.playlistModalCover.parentElement.classList.add('liked-modal');
    } else {
        elements.playlistModalCover.parentElement.classList.remove('liked-modal');
        if (imageUrl) {
            elements.playlistModalCover.src = imageUrl;
            elements.playlistModalCover.style.display = 'block';
        } else {
            elements.playlistModalCover.style.display = 'none';
        }
    }
    
    elements.playlistTracks.innerHTML = `
        <div class="playlists-loading">
            <div class="loading-spinner"></div>
        </div>
    `;
    
    try {
        let tracks;
        
        if (playlistId === 'liked') {
            // Fetch liked songs
            const likedSongs = await api.getLikedSongs();
            tracks = likedSongs?.tracks || [];
        } else {
            // Fetch regular playlist
            tracks = await api.getPlaylistTracks(playlistId);
        }
        
        if (!tracks || tracks.length === 0) {
            elements.playlistTracks.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 40px;">No tracks in this playlist</p>';
            return;
        }
        
        elements.playlistTracks.innerHTML = tracks.map((track, index) => `
            <div class="playlist-track-item" data-uri="${track.uri}" data-name="${escapeHtml(track.name)}" data-artist="${escapeHtml(track.artist)}">
                <span class="playlist-track-number">${index + 1}</span>
                ${track.albumArt 
                    ? `<img class="playlist-track-cover" src="${track.albumArt}" alt="">`
                    : `<div class="playlist-track-cover" style="background: var(--bg-tertiary);"></div>`
                }
                <div class="playlist-track-info">
                    <div class="playlist-track-name">${escapeHtml(track.name)}</div>
                    <div class="playlist-track-artist">${escapeHtml(track.artist)}</div>
                </div>
                <span class="playlist-track-duration">${formatDuration(track.duration)}</span>
            </div>
        `).join('');
        
        // Add click handlers to play tracks
        document.querySelectorAll('.playlist-track-item').forEach(track => {
            track.addEventListener('click', async () => {
                const uri = track.dataset.uri;
                const name = track.dataset.name;
                const artist = track.dataset.artist;
                
                try {
                    await api.playSong({ uri, name, artist });
                    showToast(`Playing: ${name}`, 'success');
                } catch (error) {
                    showToast('Failed to play track', 'error');
                }
            });
        });
        
    } catch (error) {
        console.error('Failed to load playlist tracks:', error);
        elements.playlistTracks.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 40px;">Failed to load tracks</p>';
    }
}

function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Setup playlist event listeners
function setupPlaylistListeners() {
    // Refresh playlists
    elements.refreshPlaylists?.addEventListener('click', () => {
        loadPlaylists();
    });
    
    // Back button
    elements.playlistBackBtn?.addEventListener('click', () => {
        if (elements.playlistModal) {
            elements.playlistModal.style.display = 'none';
        }
    });
    
    // Play playlist button - plays first track
    elements.playPlaylistBtn?.addEventListener('click', async () => {
        const playlistId = elements.playlistModal?.dataset?.currentPlaylistId;
        if (playlistId) {
            try {
                let tracks;
                if (playlistId === 'liked') {
                    const likedSongs = await api.getLikedSongs();
                    tracks = likedSongs?.tracks || [];
                } else {
                    tracks = await api.getPlaylistTracks(playlistId);
                }
                
                if (tracks?.length > 0) {
                    await api.playSong({ 
                        uri: tracks[0].uri, 
                        name: tracks[0].name, 
                        artist: tracks[0].artist 
                    });
                    showToast(`Playing: ${tracks[0].name}`, 'success');
                } else {
                    showToast('No tracks found in playlist', 'error');
                }
            } catch (error) {
                console.error('Failed to play playlist:', error);
                showToast('Failed to play playlist', 'error');
            }
        }
    });

    // Close modal when clicking outside content
    elements.playlistModal?.addEventListener('click', (event) => {
        if (event.target === elements.playlistModal) {
            elements.playlistModal.style.display = 'none';
        }
    });
}

// ====== Part 11: Enhanced UI Effects ======

// 11.4 Button Ripple Effect - Disabled to prevent button expansion issues
function initRippleEffect() {
    // Ripple effect disabled - was causing button expansion issues
    // Buttons now use CSS-only hover effects instead
    return;
}

// Ambient cursor glow effect for cards
function initAmbientLighting() {
    const cards = document.querySelectorAll('.now-playing-card, .control-card, .statistics-card, .lyrics-card');
    
    cards.forEach(card => {
        card.classList.add('card-ambient');
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--mouse-x', x + '%');
            this.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// Status-active breathing effect for control card
function updateControlCardStatus(running) {
    const controlCard = document.querySelector('.control-card');
    if (controlCard) {
        if (running) {
            controlCard.classList.add('status-active');
        } else {
            controlCard.classList.remove('status-active');
        }
    }
}

// Progress bar playing animation
function updateProgressBarPlaying(playing) {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        if (playing) {
            progressFill.classList.add('playing');
        } else {
            progressFill.classList.remove('playing');
        }
    }
}

// Initialize liquid background (optional mode)
function initLiquidBackground() {
    // Check if liquid background exists, if not create it
    if (!document.querySelector('.liquid-background')) {
        const liquidBg = document.createElement('div');
        liquidBg.className = 'liquid-background';
        liquidBg.innerHTML = `
            <div class="liquid-orb liquid-orb-1"></div>
            <div class="liquid-orb liquid-orb-2"></div>
            <div class="liquid-orb liquid-orb-3"></div>
        `;
        document.body.insertBefore(liquidBg, document.body.firstChild);
    }
}

// Toggle liquid background mode
function toggleLiquidBackground(enabled) {
    if (enabled) {
        initLiquidBackground();
        document.body.classList.add('liquid-mode');
    } else {
        document.body.classList.remove('liquid-mode');
    }
}

// Initialize all Part 11 effects
function initEnhancedUI() {
    // Initialize ripple effects after DOM is ready
    initRippleEffect();
    
    // Initialize ambient lighting
    initAmbientLighting();
    
    // Initialize liquid background (hidden by default, enable via settings)
    initLiquidBackground();
    
    // Check if liquid mode should be enabled from settings
    if (settings.liquidBackground) {
        toggleLiquidBackground(true);
    }
    
    console.log('Enhanced UI effects initialized');
}

// Initialize app
init();
// Update Lyrics - Karaoke style with word-level sync
function updateLyricsLegacy(lyrics, song) {
    // Legacy function kept for compatibility - now delegates to main function
    updateLyrics(lyrics, song);
}

function updateLyrics(lyrics, song) {
    if (!elements.currentLyric || !lyrics) return;

    elements.currentLyric.classList.remove('line-only');

    const lines = lyrics.lines || [];
    const progressFromLyrics = typeof lyrics.progress === 'number' ? lyrics.progress : null;
    const progressFromSong = song ? (song.progress ?? song.position ?? 0) : 0;

    if (progressFromLyrics !== null) {
        updateProgressClock(progressFromLyrics, typeof lyrics.isPlaying === 'boolean' ? lyrics.isPlaying : isPlaying);
    } else if (song) {
        updateProgressClock(progressFromSong, isPlaying);
    }

    const songPosition = getEstimatedSongPosition();

    if ((lyrics.currentLine && lyrics.currentLine.length) || lines.length > 0) {
        const activeLineInfo = getActiveLineInfo(lyrics, lines, songPosition);
        const line = activeLineInfo.line;
        const lineIndex = activeLineInfo.index;
        const lineText = line?.text ?? lyrics.currentLine ?? '';

        if (lineText) {
            const wordData = line ? getWordData(line, lineIndex, lines) : null;

            // If no detailed word timing data, use smooth character-based animation
            if (!wordData || wordData.words.length === 0 || wordData.timings.length === 0) {
                renderSmoothLineAnimation(lineText, line, songPosition, lines, lineIndex);
                currentLyricText = lineText;
                updateStatusPreview();
                if (elements.lyricsSource) {
                    elements.lyricsSource.textContent = lyrics.source || (lyrics.hasLyrics ? 'LRC' : 'NO LYRICS');
                }
                return;
            }

            const words = wordData.words;
            const timings = wordData.timings;

            // Find current active word with improved accuracy
            let currentWordIndex = -1;
            let wordProgress = 0; // 0-1 progress within the current word

            if (timings.length > 0) {
                for (let i = 0; i < timings.length; i++) {
                    const start = timings[i].startTime;
                    const end = timings[i].endTime ?? timings[i + 1]?.startTime ?? wordData.lineEnd ?? (start + 300);

                    if (songPosition >= start && songPosition < end) {
                        currentWordIndex = i;
                        wordProgress = (songPosition - start) / (end - start);
                        break;
                    }
                    if (songPosition >= end) {
                        currentWordIndex = i;
                        wordProgress = 1;
                    }
                }
            }

            // Build HTML with word spans and smooth transitions
            const wordsHtml = words.map((word, index) => {
                let className = 'word';
                
                if (index < currentWordIndex) {
                    // Words that have been completely sung
                    className += ' sung';
                } else if (index === currentWordIndex) {
                    // Currently active word
                    className += ' active';
                    // Add CSS variable for smooth progress within the word
                    if (wordProgress > 0) {
                        return `<span class="${className}" style="--word-progress: ${wordProgress.toFixed(2)}">${escapeHtml(word)}</span>`;
                    }
                }
                return `<span class="${className}">${escapeHtml(word)}</span>`;
            }).join(' ');

            elements.currentLyric.innerHTML = wordsHtml || `<span class="word active">${escapeHtml(lineText)}</span>`;
            currentLyricText = lineText;
            
            // Update next lyric preview if available
            updateNextLyric(lines, lineIndex);
        } else if (lyrics.hasLyrics) {
            elements.currentLyric.innerHTML = '<span class="word active">🎵 Instrumental...</span>';
            currentLyricText = '';
        } else {
            elements.currentLyric.innerHTML = '<span class="word active">No lyrics available</span>';
            currentLyricText = '';
        }

        updateStatusPreview();
    }

    if (elements.lyricsSource) {
        elements.lyricsSource.textContent = lyrics.source || (lyrics.hasLyrics ? 'LRC' : 'NO LYRICS');
    }
    
    // Update full lyrics view in Lyrics tab
    updateFullLyricsDisplay(lyrics, song);
}

// Update full lyrics display in the Lyrics tab
let currentLyricsLines = [];
let currentLyricsSongId = null;
let currentLyricsData = null;
let currentLyricsSong = null;
let lyricsAnimationFrame = null;

function updateFullLyricsDisplay(lyrics, song) {
    // Store current lyrics data for continuous updates
    currentLyricsData = lyrics;
    currentLyricsSong = song;
    const fullLyricsDisplay = document.getElementById('full-lyrics-display');
    const lyricsTabSource = document.getElementById('lyrics-tab-source');
    
    if (!fullLyricsDisplay) return;
    
    
    // Support both data structures - lines array or currentLine string
    let lines = lyrics.lines || [];
    const songPosition = getEstimatedSongPosition();
    const songId = song?.id || song?.name;
    
    // If no lines but has currentLine, create a single-line array
    if (lines.length === 0 && lyrics.currentLine) {
        lines = [{ time: 0, text: lyrics.currentLine }];
    }
    
    // Check if we need to rebuild the lyrics list (new song or first time)
    const needRebuild = !currentLyricsSongId || currentLyricsSongId !== songId || 
                       currentLyricsLines.length !== lines.length;
    
    // Check if we actually have lyrics - either hasLyrics flag, lines array, or currentLine
    const hasLyricsData = lyrics.hasLyrics || lines.length > 0 || lyrics.currentLine;
    
    if (!hasLyricsData || lines.length === 0) {
        fullLyricsDisplay.innerHTML = `
            <div class="lyrics-empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M9 18V5l12-2v13"/>
                    <circle cx="6" cy="18" r="3"/>
                    <circle cx="18" cy="16" r="3"/>
                </svg>
                <p>${lyrics.currentLine || 'Start playing music to see lyrics'}</p>
            </div>
        `;
        currentLyricsLines = [];
        currentLyricsSongId = null;
        if (lyricsTabSource) {
            lyricsTabSource.textContent = lyrics.source || 'WAITING...';
        }
        return;
    }
    
    // Find current active line index
    let activeIndex = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].time <= songPosition) {
            activeIndex = i;
        } else {
            break;
        }
    }
    
    if (needRebuild) {
        // Build full lyrics HTML once
        const lyricsHtml = lines.map((line, index) => {
            return `<div class="lyric-line" data-index="${index}" data-time="${line.time}">${escapeHtml(line.text || '♪')}</div>`;
        }).join('');
        
        fullLyricsDisplay.innerHTML = `<div class="lyrics-list" id="lyrics-list-container">${lyricsHtml}</div>`;
        currentLyricsLines = lines;
        currentLyricsSongId = songId;
        
        // Start animation loop if on lyrics tab
        const lyricsTab = document.getElementById('lyrics-tab');
        if (lyricsTab && lyricsTab.classList.contains('active')) {
            startLyricsAnimationLoop();
        }
    }
    
    // Update classes efficiently
    const lyricsList = fullLyricsDisplay.querySelector('.lyrics-list');
    if (lyricsList) {
        const lineElements = lyricsList.querySelectorAll('.lyric-line');
        lineElements.forEach((el, index) => {
            el.classList.remove('active', 'passed');
            if (index === activeIndex) {
                el.classList.add('active');
            } else if (index < activeIndex) {
                el.classList.add('passed');
            }
        });
        
        // Scroll active line into view (only if changed)
        const activeEl = lineElements[activeIndex];
        if (activeEl) {
            const container = fullLyricsDisplay;
            const containerRect = container.getBoundingClientRect();
            const activeRect = activeEl.getBoundingClientRect();
            const relativeTop = activeRect.top - containerRect.top;
            const containerCenter = containerRect.height / 2;
            
            // Only scroll if active line is outside the center area
            if (relativeTop < containerCenter - 50 || relativeTop > containerCenter + 50) {
                activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
    
    if (lyricsTabSource) {
        lyricsTabSource.textContent = lyrics.source || 'LRC';
    }
    
    // Start continuous animation loop for lyrics tab
    startLyricsAnimationLoop();
}

// Continuous animation loop for lyrics tab (updates active line position)
function startLyricsAnimationLoop() {
    if (lyricsAnimationFrame) {
        cancelAnimationFrame(lyricsAnimationFrame);
    }
    
    const fullLyricsDisplay = document.getElementById('full-lyrics-display');
    if (!fullLyricsDisplay || !currentLyricsData || !currentLyricsData.lines) return;
    
    const lines = currentLyricsData.lines;
    const lyricsList = fullLyricsDisplay.querySelector('.lyrics-list');
    if (!lyricsList) return;
    
    const lineElements = lyricsList.querySelectorAll('.lyric-line');
    if (lineElements.length === 0) return;
    
    let lastActiveIndex = -1;
    
    function animate() {
        const songPosition = getEstimatedSongPosition();
        
        // Find current active line index
        let activeIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].time <= songPosition) {
                activeIndex = i;
            } else {
                break;
            }
        }
        
        // Only update if active line changed
        if (activeIndex !== lastActiveIndex) {
            lastActiveIndex = activeIndex;
            
            lineElements.forEach((el, index) => {
                el.classList.remove('active', 'passed');
                if (index === activeIndex) {
                    el.classList.add('active');
                } else if (index < activeIndex) {
                    el.classList.add('passed');
                }
            });
            
            // Scroll active line into view
            const activeEl = lineElements[activeIndex];
            if (activeEl) {
                const container = fullLyricsDisplay;
                const containerRect = container.getBoundingClientRect();
                const activeRect = activeEl.getBoundingClientRect();
                const relativeTop = activeRect.top - containerRect.top;
                const containerCenter = containerRect.height / 2;
                
                if (relativeTop < containerCenter - 50 || relativeTop > containerCenter + 50) {
                    activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }
        
        // Continue animation loop if on lyrics tab
        const lyricsTab = document.getElementById('lyrics-tab');
        if (lyricsTab && lyricsTab.classList.contains('active')) {
            lyricsAnimationFrame = requestAnimationFrame(animate);
        }
    }
    
    lyricsAnimationFrame = requestAnimationFrame(animate);
}

// Stop lyrics animation loop
function stopLyricsAnimationLoop() {
    if (lyricsAnimationFrame) {
        cancelAnimationFrame(lyricsAnimationFrame);
        lyricsAnimationFrame = null;
    }
}

// Refresh lyrics tab when activated
async function refreshLyricsTab() {
    try {
        // Get current status which includes lyrics
        const status = await api.getStatus();
        if (status.currentLyrics) {
            updateFullLyricsDisplay(status.currentLyrics, status.currentSong);
        } else {
            // Show empty state
            const fullLyricsDisplay = document.getElementById('full-lyrics-display');
            const lyricsTabSource = document.getElementById('lyrics-tab-source');
            if (fullLyricsDisplay) {
                fullLyricsDisplay.innerHTML = `
                    <div class="lyrics-empty-state">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <path d="M9 18V5l12-2v13"/>
                            <circle cx="6" cy="18" r="3"/>
                            <circle cx="18" cy="16" r="3"/>
                        </svg>
                        <p>Start playing music to see lyrics</p>
                    </div>
                `;
            }
            if (lyricsTabSource) {
                lyricsTabSource.textContent = 'WAITING...';
            }
        }
    } catch (error) {
        console.error('Failed to refresh lyrics tab:', error);
    }
}

// Render LRC line with fade animation (whole line, not character by character)
function renderSmoothLineAnimation(lineText, line, songPosition, lines, lineIndex) {
    elements.currentLyric.classList.add('line-only');
    
    // Only update DOM if line changed - prevents continuous flashing
    if (lineText !== lastDisplayedLine) {
        lastDisplayedLine = lineText;
        // For LRC, show the whole line with fade in animation on change
        elements.currentLyric.innerHTML = `<span class="lrc-line lrc-line-new">${escapeHtml(lineText)}</span>`;
    }
    
    // Update next lyric preview
    updateNextLyric(lines, lineIndex);
}

// Update the next lyric preview
function updateNextLyric(lines, currentLineIndex) {
    const nextLyricEl = document.getElementById('next-lyric');
    if (!nextLyricEl) return;
    
    const nextLine = lines[currentLineIndex + 1];
    if (nextLine && nextLine.text) {
        nextLyricEl.textContent = nextLine.text;
        nextLyricEl.style.opacity = '0.6';
    } else {
        nextLyricEl.textContent = '';
    }
}

function updateProgressClock(progress, playing) {
    if (typeof progress === 'number' && !Number.isNaN(progress)) {
        karaokeClock.baseProgress = progress;
        karaokeClock.baseTimestamp = performance.now();
    }
    if (typeof playing === 'boolean') {
        karaokeClock.isPlaying = playing;
    }
}

function getEstimatedSongPosition() {
    const base = typeof karaokeClock.baseProgress === 'number' ? karaokeClock.baseProgress : 0;
    const elapsed = performance.now() - (karaokeClock.baseTimestamp || performance.now());
    const playing = typeof karaokeClock.isPlaying === 'boolean' ? karaokeClock.isPlaying : isPlaying;
    return base + (playing ? Math.max(0, elapsed) : 0);
}

function getActiveLineInfo(lyrics, lines, songPosition) {
    let index = typeof lyrics.currentLineIndex === 'number' ? lyrics.currentLineIndex : -1;
    let line = lines[index];

    if (!line && lines.length) {
        index = findLineIndexByTime(lines, songPosition);
        line = lines[index];
    }

    return { line, index };
}

function findLineIndexByTime(lines, time) {
    let low = 0;
    let high = lines.length - 1;
    let best = 0;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (lines[mid].time <= time) {
            best = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return best;
}

function getWordData(line, lineIndex, lines) {
    const lineStart = line?.time ?? 0;
    let lineEnd = line?.endTime;
    if ((!lineEnd || lineEnd <= lineStart) && lines[lineIndex + 1]?.time > lineStart) {
        lineEnd = lines[lineIndex + 1].time;
    }

    if (!line || !Array.isArray(line.words) || line.words.length === 0) return null;

    const lineKey = `${lineStart}|${lineEnd ?? ''}|${line.words.map(word => word.text).join(' ')}`;

    if (karaokeCache.lineKey !== lineKey) {
        const displayWords = [];
        const timings = [];

        for (const word of line.words) {
            const textValue = typeof word.text === 'string' ? word.text.trim() : String(word.text ?? '').trim();
            if (!textValue) continue;

            const rawStart = Number(word.startTime ?? word.time ?? NaN);
            if (!Number.isFinite(rawStart)) continue;

            const rawEnd = Number(word.endTime ?? NaN);
            const startTime = (rawStart < lineStart - 1000 && lineStart > 0) ? (lineStart + rawStart) : rawStart;
            const endTime = Number.isFinite(rawEnd)
                ? ((rawEnd < lineStart - 1000 && lineStart > 0) ? (lineStart + rawEnd) : rawEnd)
                : undefined;

            displayWords.push(textValue);
            timings.push({ startTime, endTime });
        }

        karaokeCache = {
            lineKey,
            words: displayWords,
            timings
        };
    }

    if (!karaokeCache.words.length || !karaokeCache.timings.length) return null;

    return { words: karaokeCache.words, timings: karaokeCache.timings, lineEnd };
}
