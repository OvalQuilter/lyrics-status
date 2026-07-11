@echo off
where node >nul 2>nul
if errorlevel 1 (
    echo Node.js is not installed. Download it from https://nodejs.org and try again.
    pause
    exit /b 1
)
node "%~dp0launcher.js"
