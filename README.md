# Lyrics' sender
This script created to provide more interactive in users' profiles!
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
// @icon         https://www.google.com/s2/favicons?domain=spotify.com
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

`404` - Clear you cache and Spotify cookies (you'll need to login again)

`502` - Wait few minutes or reload the webpage. It can be problem with Spotify itself.
