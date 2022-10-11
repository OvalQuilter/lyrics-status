# Lyrics Status
### What does it do?
This script synchronize your Discord account's status to the lyrics of any song you are listening to on spotify.

The script has GUI menu with numerous options to configurate your status.

![Work preview](https://user-images.githubusercontent.com/69106951/178853744-db356ac8-93cb-4c2a-acd2-7fb4329163c9.gif)
# Warning!
***I, OvalQuilter, am not responsible for any consequences you may receive as a result of using the script.***

***This script is provided 'as is.' USE AT YOUR OWN RISK.***
# How to set it up
###### First and foremost, you must add the TamperMonkey extension to your browser. You can find it [here](https://www.tampermonkey.net).
###### [Video](https://www.youtube.com/watch?v=LnBnm_tZlyU) Tutorial showing how to get your Discord token.
Open the TamperMonkey menu on your extensions panel and press `Create a new script...`.

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
Then click on the `File` dropdown in the top left, and press `Save`.

Now open the [Spotify website](open.spotify.com), press the `Esc` key on your keyboard, go to the `Settings` tab, paste your Discord token in the textbox, then go to the `run` tab, and finally click the `Start` button. Enjoy!

> Note: Low connection speed may create problems.
# Error list
Errors that may occur while using Lyrics Status and potential fixes

`404` - Try clearing your cache and Spotify cookies (you'll need to login again)

`502` - Wait a couple minutes or reload the webpage. It may be a problem with Spotify as opposed to the script.
