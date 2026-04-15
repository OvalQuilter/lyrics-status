<p align="center">
  <img src="res/icon.png" alt="LyricsStatus Logo" width="120" height="120">
</p>

<h1 align="center">🎵 LyricsStatus</h1>

<p align="center">
  <strong>Display real-time Spotify lyrics as your Discord status</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#setup-guide">Setup Guide</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#faq">FAQ</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-4.0.0-purple?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/platform-Windows-blue?style=for-the-badge" alt="Platform">
  <img src="https://img.shields.io/badge/electron-28.0.0-teal?style=for-the-badge" alt="Electron">
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License">
</p>

---

## ✨ Features

- 🎤 **Real-time Lyrics** - Display synchronized lyrics from your current Spotify track
- 💬 **Discord Status Integration** - Show lyrics directly in your Discord custom status
- 🎨 **Multiple Themes** - Dark, Light, Spotify, Discord, Ocean, and more
- 📊 **Statistics** - Track your listening history and stats
- 🌍 **Multi-language** - English and German support
- ⚡ **Lightweight** - Minimal resource usage, runs in the background
- 🔄 **Auto-sync** - Lyrics automatically sync with song progress
- 📝 **Custom Formats** - Customize how lyrics appear in your status

---

## 📸 Screenshots

<p align="center">
  <img src="https://via.placeholder.com/800x500?text=Dashboard+Screenshot" alt="Dashboard" width="80%">
</p>

<p align="center">
  <img src="https://via.placeholder.com/400x300?text=Discord+Status+Preview" alt="Discord Status" width="45%">
  <img src="https://via.placeholder.com/400x300?text=Settings+Page" alt="Settings" width="45%">
</p>

---

## 📥 Installation

### Download

Download the latest release from the [Releases](https://github.com/nightgta/lyrics-status/releases) page:

| File | Description |
|------|-------------|
| `LyricsStatus-Portable-4.0.0.exe` | Portable version (recommended) |
| `LyricsStatus-Setup-4.0.0.exe` | Installer version |

### System Requirements

- **OS:** Windows 10/11 (64-bit)
- **Spotify:** Premium account required
- **Discord:** Desktop app installed

---

## 🚀 Setup Guide

### Video Tutorials

For visual learners, we have video tutorials:

| Step | Video |
|------|-------|
| Discord Token | [YouTube Tutorial](https://www.youtube.com/watch?v=LnBnm_tZlyU) |
| Spotify App Setup | [YouTube Tutorial](https://www.youtube.com/watch?v=3RGm4jALukM) |

---

### Step 1: Get Your Discord Token

> ⚠️ **Security Warning:** Never share your Discord token with anyone! It provides full access to your account.

1. Open Discord in your browser or desktop app
2. Press `Ctrl + Shift + I` to open Developer Tools
3. Go to the **Network** tab
4. Type `api` in the filter box
5. Click on any request (e.g., `science`, `messages`)
6. In the **Headers** section, find `authorization:`
7. Copy the value (this is your token)

---

### Step 2: Create a Spotify Developer App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click **"Create App"**
4. Fill in the details:
   - **App Name:** `LyricsStatus`
   - **App Description:** `Lyrics Display`
   - **Redirect URI:** `http://127.0.0.1:67/callback` ⚠️ **Exact match required!**
   - **APIs:** Select **Web API**
5. Accept the terms and click **Save**
6. Copy the **Client ID** and **Client Secret**

---

### Step 3: Configure LyricsStatus

1. Launch `LyricsStatus-Portable-4.0.0.exe`
2. Select your language (English/Deutsch)
3. Paste your **Discord Token**
4. Paste your **Spotify Client ID** and **Client Secret**
5. Click **"Connect to Spotify"** and authorize the app
6. Click **"Finish"** - You're ready!

---

### Step 4: Start Using

1. Click the **START** button in the Dashboard
2. Play any song on Spotify
3. Watch your Discord status update with lyrics! 🎶

---

## ⚙️ Configuration

### Settings Overview

| Setting | Description |
|---------|-------------|
| **Show Timestamp** | Display current position in the song (e.g., `[1:23]`) |
| **Show Label** | Add a music emoji prefix (🎵) |
| **Theme** | Choose from multiple visual themes |
| **Auto-Start** | Launch LyricsStatus on Windows startup |
| **Start Minimized** | Start in system tray |
| **Auto-Offset** | Automatically adjust lyrics timing |

### Advanced Custom Status

Enable **Advanced Mode** to customize your status format:

```
{timestamp} {lyrics}
```

**Available Variables:**
- `{lyrics}` - Current lyric line
- `{timestamp}` - Song position `[MM:SS]`
- `{song}` - Song name
- `{artist}` - Artist name

**Examples:**
```
🎵 {lyrics}
[{timestamp}] {lyrics}
{song} - {lyrics}
```

### Themes

| Theme | Description |
|-------|-------------|
| `dark` | Default neon dark theme |
| `light` | Clean light theme |
| `spotify` | Spotify green accents |
| `discord` | Discord blurple accents |
| `ocean` | Cyan/teal ocean theme |
| `sunset` | Warm orange theme |
| `matrix` | Green matrix theme |
| `cherry` | Pink/red theme |

---

## 🔧 Building from Source

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ 
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/nightgta/lyrics-status.git
cd lyrics-status

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run dist
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run in development mode |
| `npm run build` | Compile TypeScript |
| `npm run start` | Build and run |
| `npm run dist` | Build portable executable |
| `npm run dist:installer` | Build installer |

---

## ❓ FAQ

### Why doesn't it work with Spotify Free?

Spotify Free doesn't provide the necessary API access for real-time playback information. Premium is required.

### Why are some songs missing lyrics?

Not all songs have lyrics available in our database. Instrumental tracks and some newer releases may not have lyrics.

### My Discord status isn't updating

1. Check if your Discord token is still valid
2. Make sure Discord is running
3. Verify you clicked "START" in LyricsStatus
4. Try restarting both Discord and LyricsStatus

### Is my Discord token safe?

Your token is stored locally on your computer and is never sent to any external servers. However, always keep your token private.

### Can I get banned for using this?

Using self-bots (which this technically is) is against Discord's Terms of Service. Use at your own risk. The likelihood of being banned is low for personal use, but we cannot guarantee anything.

### How do I update the app?

Simply download the latest release and replace your old executable. Your settings are stored separately and will be preserved.

---

## 🛠️ Tech Stack

- **Framework:** [Electron](https://www.electronjs.org/) 28
- **Language:** [TypeScript](https://www.typescriptlang.org/) 5.3
- **Backend:** [Express](https://expressjs.com/) for OAuth handling
- **Packaging:** [electron-builder](https://www.electron.build/)

---

## 📁 Project Structure

```
lyrics-status/
├── src/                    # TypeScript source files
│   ├── main.ts            # Electron main process
│   ├── preload.ts         # Preload script
│   ├── app/               # Core application logic
│   ├── Panel/             # Express server
│   └── ...
├── static/                 # Frontend files
│   ├── index.html         # Main UI
│   ├── styles.css         # Styling
│   ├── app.js             # Frontend JavaScript
│   └── translations.js    # i18n
├── res/                    # Resources (icons)
├── cache/                  # Lyrics cache
└── dist/                   # Compiled output
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ideas for Contributions

- [ ] Add more themes
- [ ] Support more languages
- [ ] Improve lyrics database coverage
- [ ] Add macOS/Linux support
- [ ] Create browser extension version

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This application is not affiliated with, endorsed by, or connected to Spotify AB or Discord Inc. Use of this application may violate Discord's Terms of Service. Use at your own risk.

---

## 💖 Acknowledgments

- [Spotify](https://www.spotify.com/) for the amazing music platform
- [Discord](https://discord.com/) for bringing communities together
- All contributors and users of LyricsStatus

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/nightgta">nightgta</a>
</p>

<p align="center">
  ⭐ Star this repo if you find it useful!
</p>

