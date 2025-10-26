# PowerShell script to start the 4SIGHT AI website
Write-Host "Starting 4SIGHT AI Website Server..." -ForegroundColor Green

# Change to the script directory
Set-Location -Path $PSScriptRoot

# Kill any existing Node.js processes
Write-Host "Stopping any existing servers..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

# Start the server
Write-Host "Starting server from: $PWD" -ForegroundColor Cyan
Write-Host "Website will be available at: http://localhost:3000" -ForegroundColor Green

# Start the custom server
node server.js



