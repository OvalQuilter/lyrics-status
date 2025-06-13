@echo off
cd /d "%~dp0"

REM Check if node_modules exists
IF NOT EXIST node_modules (
    echo Installing packages...
    npm install

    echo loading...
    timeout /t 7 >nul

    echo attempting to fund...
    npm fund
) ELSE (
    echo Dependencies already installed. Skipping install and fund.
)

echo attempting to run launcher...
npm run start

pause