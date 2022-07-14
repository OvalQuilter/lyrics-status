# Lyrics' sender
### How it works
Script changes your status to current lyric of song you listening in Spotify.

Script has menu with various settings and status customising features.

![Work preview](https://user-images.githubusercontent.com/69106951/178853744-db356ac8-93cb-4c2a-acd2-7fb4329163c9.gif)
# Warning!
***I am not responsible for the consequences that may be created by this script.***

***This script is provided 'as is' and you use it at your own risk.***
# How to use
###### Before all - you need to add TamperMonkey to your browser. You can get it [here](https://www.tampermonkey.net).
###### [Video](https://www.youtube.com/watch?v=LnBnm_tZlyU) how to get your Discord token.
Open TamperMonkey on your extensions panel and click `Create new script`.

Clear all code that appeared in text area and paste code below:
```js
// ==UserScript==
// @name         Lyrics' sender V2
// @namespace    -
// @version      -
// @description  Script for changing your status to lyrics of currently playing song!
// @author       OvalQuilter | OQ project
// @match        *://open.spotify.com/*
// @icon         https://raw.githubusercontent.com/OvalQuilter/lyrics-sender/main/Logo.png
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

$.get("https://raw.githubusercontent.com/OvalQuilter/lyrics-sender/main/LyricsSender.js", (d) => eval(d));
```
Then open `File` section and click `Save`.

Now open [Spotify](open.spotify.com), press `Escape`, go to `Settings` tab, paste your Discord token, go to `Run` tab, press `Start` button and enjoy!

> Note: Low connection speed may create problems.
# Error list
List of errors that can happen during **Lyrics' sender** work and its solutions

`404` - Clear your cache and Spotify cookies (you'll need to login again)

`502` - Wait few minutes or reload the webpage. It can be problem with Spotify itself.
