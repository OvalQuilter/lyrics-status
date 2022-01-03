# Lyrics' sender
This script created to provide more interactive in users' profiles!
# Warning!
***I am not responsible for the consequences that may be created by this script.***

***This script is provided 'as is' and you use it at your own risk.***
# How to use
###### Before all - you need to install TamperMonkey in your browser. You can get it [here](https://www.tampermonkey.net).
###### [Video](https://www.youtube.com/watch?v=LnBnm_tZlyU) how to get your token.
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
After all this done, open `File` section and click `Save`.

Now you gotta go to `open.spotify.com`, press `Escape`, paste your token and enjoy!
