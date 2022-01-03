# Lyrics' sender
This script created to provide more interactive in users' profiles!
# How to use
###### Before all - you need to install TamperMonkey in your browser. You can get it [here](https://www.tampermonkey.net).
Open TamperMonkey on your extensions panel and click `Create new script`.

Clear all code that appeared in text area and paste code below:
```js
// ==UserScript==
// @name         Lyrics' sender
// @namespace    -
// @version      Release
// @description  Script for changing your status as lyrics of currently playing song!
// @author       OvalQuilter | OQ project
// @match        *://open.spotify.com/*
// @icon         https://www.google.com/s2/favicons?domain=spotify.com
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/OvalQuilter/lyrics-sender/main/LyricsSender.js");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      eval(xhr.responseText);
   }};

xhr.send();
```
