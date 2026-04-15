# 🎵 LyricsStatus - Einrichtungsanleitung

## Was macht LyricsStatus?
LyricsStatus zeigt die **Songtexte** deines aktuellen Spotify-Songs als **Discord-Status** an! 
Deine Freunde können sehen, welchen Song du hörst und welche Zeile gerade spielt.

---

## 📋 Was du brauchst

1. **Discord Account** (mit Discord App installiert)
2. **Spotify Premium Account** (Free funktioniert leider nicht)
3. **LyricsStatus App** (die .exe Datei)

---

## 🚀 Schritt-für-Schritt Einrichtung

### Schritt 1: App starten
- Doppelklick auf `LyricsStatus-Portable-4.0.0.exe`
- Die App öffnet sich mit einem Setup-Wizard

---

### Schritt 2: Sprache wählen
- Wähle **Deutsch** oder **English**
- Klicke auf **"Weiter"**

---

### Schritt 3: Discord Token eingeben ⚠️ WICHTIG

Das ist der schwierigste Teil - aber keine Sorge, ich erkläre es genau:

#### Video-Anleitung (empfohlen):
🎬 **YouTube Tutorial:** https://www.youtube.com/watch?v=LnBnm_tZlyU

#### So findest du deinen Discord Token:

1. **Öffne Discord** im Browser (https://discord.com/app) oder die Desktop-App

2. **Öffne die Entwicklertools:**
   - Drücke `Strg + Shift + I` (Windows) 
   - Oder `F12`

3. **Gehe zum "Network" Tab** (Netzwerk)

4. **Filtere nach "api"** (oben in der Suchleiste eingeben)

5. **Klicke auf irgendeine Anfrage** in der Liste (z.B. `science`, `messages`, etc.)

6. **Suche in den "Headers"** nach `authorization:`
   - Scrolle runter bis du "Request Headers" siehst
   - Dort steht `authorization:` gefolgt von einem langen Text
   - Das ist dein Token!

7. **Kopiere den Token** (nur den Wert nach `authorization:`, ohne das Wort selbst)

8. **Füge ihn in LyricsStatus ein**

> ⚠️ **WICHTIG:** Teile deinen Token NIEMALS mit anderen! Damit kann man auf deinen Account zugreifen!

---

### Schritt 4: Spotify Developer App erstellen ⚠️ WICHTIG

Bevor du Spotify verbinden kannst, musst du eine **Spotify Developer App** erstellen:

#### Video-Anleitung (empfohlen):
🎬 **YouTube Tutorial:** https://www.youtube.com/watch?v=3RGm4jALukM

#### Schritt-für-Schritt:

1. **Öffne das Spotify Developer Dashboard:**
   - Gehe zu: https://developer.spotify.com/dashboard
   - Melde dich mit deinem Spotify Account an

2. **Erstelle eine neue App:**
   - Klicke auf **"Create App"** (grüner Button)
   - **App Name:** `LyricsStatus` (oder was du willst)
   - **App Description:** `Lyrics Display` (oder was du willst)
   - **Redirect URI:** `http://127.0.0.1:67/callback` ⚠️ **GENAU SO EINGEBEN!**
   - **Which APIs are you planning to use?** → Wähle **"Web API"**
   - Haken bei "I understand..." setzen
   - Klicke **"Save"**

3. **Client ID & Client Secret kopieren:**
   - Du bist jetzt auf der App-Seite
   - Kopiere die **Client ID** (wird direkt angezeigt)
   - Klicke auf **"View client secret"** und kopiere das **Client Secret**

4. **In LyricsStatus einfügen:**
   - Füge **Client ID** in das erste Feld ein
   - Füge **Client Secret** in das zweite Feld ein

> 💡 **Tipp:** Die Redirect URI muss EXAKT `http://127.0.0.1:67/callback` sein, sonst funktioniert es nicht!

---

### Schritt 5: Spotify verbinden

1. Klicke auf **"Mit Spotify verbinden"**
2. Ein Browser-Fenster öffnet sich
3. **Melde dich bei Spotify an** (falls nicht schon eingeloggt)
4. Klicke auf **"Zustimmen"** um LyricsStatus Zugriff zu geben
5. Das Fenster schließt sich automatisch - fertig!

---

### Schritt 6: Fertig! 🎉

- Klicke auf **"Abschließen"** oder **"Fertig"**
- Du bist jetzt im Hauptbildschirm

---

## ▶️ So benutzt du LyricsStatus

### Starten:
1. Klicke den großen **"START"** Button
2. Spiele einen Song auf Spotify ab
3. Dein Discord-Status zeigt jetzt die Lyrics!

### Stoppen:
- Klicke auf **"STOP"** um die Lyrics-Anzeige zu beenden

---

## ⚙️ Einstellungen (optional)

Im **Settings** Tab kannst du anpassen:

| Einstellung | Was es macht |
|-------------|--------------|
| **Timestamp anzeigen** | Zeigt die aktuelle Zeit im Song |
| **Label anzeigen** | Zeigt "🎵" vor dem Text |
| **Theme** | Ändert das Aussehen der App |
| **Auto-Start** | Startet automatisch beim Windows-Start |

---

## ❓ Häufige Probleme

### "Keine Lyrics gefunden"
- Nicht alle Songs haben Lyrics in der Datenbank
- Instrumental-Songs haben keine Texte

### "Spotify nicht verbunden"
- Gehe zu Settings → Klicke "Mit Spotify verbinden"
- Stelle sicher, dass du Spotify Premium hast

### "Discord Status ändert sich nicht"
- Prüfe ob dein Discord Token noch gültig ist
- Der Token kann ablaufen - dann musst du einen neuen holen

### "App startet nicht"
- Rechtsklick → "Als Administrator ausführen"
- Windows Defender könnte die App blockieren → Erlauben

---

## 🔒 Sicherheitshinweise

1. **Discord Token geheim halten!** 
   - Niemals teilen, auch nicht mit Freunden
   - Ist wie ein Passwort für deinen Account

2. **Token regelmäßig erneuern**
   - Wenn du dich bei Discord abmeldest, wird der Token ungültig
   - Dann einfach neuen Token holen

3. **App nur von vertrauenswürdigen Quellen**
   - Lade LyricsStatus nur vom offiziellen Download

---

## 💡 Tipps

- **Minimieren statt schließen:** Die App läuft im Hintergrund weiter
- **Tray Icon:** Rechtsklick auf das Symbol unten rechts für Schnellzugriff
- **History:** Unter "History" siehst du alle gespielten Songs

---

## 🆘 Braucht ihr Hilfe?

Wenn etwas nicht funktioniert, fragt einfach nach! 

---

*Viel Spaß mit LyricsStatus!* 🎶
