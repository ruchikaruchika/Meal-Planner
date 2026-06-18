@echo off
setlocal
echo ====================================
echo SmartMeal Planner - Shutdown Script
echo ====================================

echo [INFO] Stopping all related Node.js processes...
taskkill /F /IM node.exe >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [OK] Node.js processes terminated successfully.
) else (
    echo [OK] No Node.js processes were running.
)

echo [INFO] Ensuring port 8080 is freed...
for /f "tokens=5" %%a in ('netstat -aon ^| find "8080" ^| find "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>nul
)

echo.
echo ====================================
echo ALL SERVICES STOPPED SUCCESSFULLY.
echo ====================================
endlocal
