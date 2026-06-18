@echo off
setlocal
echo ====================================
echo SmartMeal Planner - Startup Script
echo ====================================

:: 1. Check Dependencies
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] npm is not installed. Please install Node.js to run this project.
    exit /b 1
)

:: 2. Navigate to frontend
if exist "%~dp0..\frontend\package.json" (
    echo [INFO] Frontend detected.
    cd /d "%~dp0..\frontend"

    if not exist "node_modules" (
        echo [INFO] Installing frontend dependencies...
        call npm install
    )

    echo [INFO] Starting Frontend Server - Vite...
    start /b cmd /c "npm run dev > frontend.log 2>&1"
    echo [INFO] Frontend running. Logs saved to frontend\frontend.log.
) else (
    echo [ERROR] frontend\package.json not found. Run this script from the scripts\ folder.
    exit /b 1
)

echo.
echo [INFO] Waiting for services to initialize properly...
ping 127.0.0.1 -n 4 > nul

:: 3. Open Browser
echo [INFO] Opening application in default browser...
start http://localhost:8080

echo.
echo ====================================
echo ALL SERVICES STARTED SUCCESSFULLY!
echo Frontend: http://localhost:8080
echo To stop the project, run: stop-project.bat
echo ====================================
endlocal
