@echo off
echo ========================================
echo    4SIGHT AI Website Server
echo ========================================
echo.

REM Change to the script directory
cd /d "%~dp0"
echo Current directory: %CD%
echo.

REM Check if we're in the correct directory
if not exist "index.html" (
    echo ERROR: index.html not found!
    echo Make sure you're running this from the webpage directory.
    echo Expected location: ...\webpage (2)\webpage\
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo ERROR: node_modules not found!
    echo Please run 'npm install' first.
    echo.
    pause
    exit /b 1
)

echo ✓ All files found
echo ✓ Starting server on http://localhost:3000
echo ✓ Opening browser...
echo.

REM Start the server
cmd /c "npx http-server -p 3000 -o"

echo.
echo Server stopped. Press any key to exit...
pause >nul


