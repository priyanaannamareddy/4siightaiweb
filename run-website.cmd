@echo off
echo Starting 4SIGHT AI Website...
cd /d "%~dp0"
echo Current directory: %CD%
echo Verifying website files...
if not exist "index.html" (
    echo ERROR: index.html not found! Make sure you're in the correct directory.
    pause
    exit /b 1
)
echo Starting server on http://localhost:3000
echo Opening browser...
cmd /c "npx http-server -p 3000 -o"
pause
