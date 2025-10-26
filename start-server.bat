@echo off
echo Starting 4SIGHT AI Website Server...
cd /d "%~dp0"
npx http-server -p 3000 -o
pause



