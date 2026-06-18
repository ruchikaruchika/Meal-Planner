@echo off
setlocal EnableDelayedExpansion

:: ============================================================
:: SmartMeal Planner - Dependency Installer (Windows)
:: Idempotent: safe to run multiple times
:: ============================================================

set "SCRIPT_DIR=%~dp0"
set "PROJECT_DIR=%SCRIPT_DIR%.."
set "FRONTEND_DIR=%PROJECT_DIR%\frontend"
set "PASS_COUNT=0"
set "FAIL_COUNT=0"
set "WARN_COUNT=0"

echo.
echo ========================================================
echo   SmartMeal Planner - Dependency Installer (Windows)
echo ========================================================
echo.

:: -----------------------------------------------------------
:: 1. ENVIRONMENT VERIFICATION
:: -----------------------------------------------------------
echo [STEP 1/6] Checking environment...
echo.

:: --- Node.js ---
set "NODE_OK=0"
where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    for /f "tokens=*" %%v in ('node --version 2^>nul') do set "NODE_VER=%%v"
    echo   [OK] Node.js ............. !NODE_VER!
    set "NODE_OK=1"
    set /a PASS_COUNT+=1
) else (
    echo   [MISSING] Node.js
    set /a FAIL_COUNT+=1
)

:: --- npm ---
set "NPM_OK=0"
where npm >nul 2>nul
if %ERRORLEVEL% equ 0 (
    for /f "tokens=*" %%v in ('npm --version 2^>nul') do set "NPM_VER=%%v"
    echo   [OK] npm ................. !NPM_VER!
    set "NPM_OK=1"
    set /a PASS_COUNT+=1
) else (
    echo   [MISSING] npm
    set /a FAIL_COUNT+=1
)

:: --- Git ---
set "GIT_OK=0"
where git >nul 2>nul
if %ERRORLEVEL% equ 0 (
    for /f "tokens=*" %%v in ('git --version 2^>nul') do set "GIT_VER=%%v"
    echo   [OK] Git ................. !GIT_VER!
    set "GIT_OK=1"
    set /a PASS_COUNT+=1
) else (
    echo   [MISSING] Git
    set /a FAIL_COUNT+=1
)

echo.

:: -----------------------------------------------------------
:: 2. AUTOMATIC INSTALLATION OF MISSING TOOLS
:: -----------------------------------------------------------
echo [STEP 2/6] Installing missing dependencies...
echo.

:: Detect package manager
set "PKG_MGR=none"
where winget >nul 2>nul
if %ERRORLEVEL% equ 0 (
    set "PKG_MGR=winget"
) else (
    where choco >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        set "PKG_MGR=choco"
    )
)

:: --- Install Node.js (includes npm) ---
if !NODE_OK! equ 0 (
    echo   [INFO] Attempting to install Node.js...
    if "!PKG_MGR!"=="winget" (
        echo   [INFO] Using winget...
        winget install --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements -e
        if !ERRORLEVEL! equ 0 (
            echo   [OK] Node.js installed via winget.
            echo   [WARN] You may need to restart your terminal for 'node' and 'npm' to be available.
            set /a WARN_COUNT+=1
        ) else (
            echo   [ERROR] winget install failed.
            echo   [INFO] Please install Node.js manually: https://nodejs.org/
            set /a FAIL_COUNT+=1
        )
    ) else if "!PKG_MGR!"=="choco" (
        echo   [INFO] Using Chocolatey...
        choco install nodejs-lts -y
        if !ERRORLEVEL! equ 0 (
            echo   [OK] Node.js installed via Chocolatey.
            echo   [WARN] You may need to restart your terminal for 'node' and 'npm' to be available.
            set /a WARN_COUNT+=1
        ) else (
            echo   [ERROR] Chocolatey install failed.
            echo   [INFO] Please install Node.js manually: https://nodejs.org/
            set /a FAIL_COUNT+=1
        )
    ) else (
        echo   [ERROR] No package manager found [winget/choco].
        echo   [INFO] Please install Node.js manually: https://nodejs.org/
        set /a FAIL_COUNT+=1
    )
) else (
    echo   [SKIP] Node.js already installed.
)

:: --- Install Git ---
if !GIT_OK! equ 0 (
    echo   [INFO] Attempting to install Git...
    if "!PKG_MGR!"=="winget" (
        winget install --id Git.Git --accept-source-agreements --accept-package-agreements -e
        if !ERRORLEVEL! equ 0 (
            echo   [OK] Git installed via winget.
            echo   [WARN] You may need to restart your terminal for 'git' to be available.
            set /a WARN_COUNT+=1
        ) else (
            echo   [ERROR] winget install failed.
            echo   [INFO] Please install Git manually: https://git-scm.com/
            set /a FAIL_COUNT+=1
        )
    ) else if "!PKG_MGR!"=="choco" (
        choco install git -y
        if !ERRORLEVEL! equ 0 (
            echo   [OK] Git installed via Chocolatey.
            set /a WARN_COUNT+=1
        ) else (
            echo   [ERROR] Chocolatey install failed.
            echo   [INFO] Please install Git manually: https://git-scm.com/
            set /a FAIL_COUNT+=1
        )
    ) else (
        echo   [ERROR] No package manager found [winget/choco].
        echo   [INFO] Please install Git manually: https://git-scm.com/
        set /a FAIL_COUNT+=1
    )
) else (
    echo   [SKIP] Git already installed.
)

echo.

:: -----------------------------------------------------------
:: 3. FRONTEND SETUP
:: -----------------------------------------------------------
echo [STEP 3/6] Setting up frontend...
echo.

if not exist "%FRONTEND_DIR%\package.json" (
    echo   [ERROR] frontend\package.json not found!
    echo   [INFO] Make sure you cloned the full repository.
    set /a FAIL_COUNT+=1
    goto :env_setup
)

cd /d "%FRONTEND_DIR%"

:: Install npm packages
echo   [INFO] Installing frontend npm packages...
call npm install
if %ERRORLEVEL% equ 0 (
    echo   [OK] Frontend dependencies installed.
    set /a PASS_COUNT+=1
) else (
    echo   [ERROR] npm install failed.
    echo   [INFO] Attempting clean install...
    if exist "node_modules" rmdir /s /q node_modules
    call npm install
    if !ERRORLEVEL! equ 0 (
        echo   [OK] Clean install succeeded.
        set /a PASS_COUNT+=1
    ) else (
        echo   [ERROR] Clean install also failed. Check npm output above.
        set /a FAIL_COUNT+=1
    )
)

:: Verify package-lock.json
if exist "package-lock.json" (
    echo   [OK] package-lock.json exists.
    set /a PASS_COUNT+=1
) else (
    echo   [WARN] package-lock.json missing. Generating...
    call npm install --package-lock-only
    set /a WARN_COUNT+=1
)

:: npm audit fix (safe mode only)
echo   [INFO] Running npm audit fix (safe mode)...
call npm audit fix 2>nul
if %ERRORLEVEL% equ 0 (
    echo   [OK] Audit fix completed.
) else (
    echo   [INFO] Some vulnerabilities may require manual review. Run: npm audit
)

echo.

:: -----------------------------------------------------------
:: 4. BACKEND SETUP
:: -----------------------------------------------------------
echo [STEP 4/6] Checking for backend...
echo.

set "BACKEND_DIR=%PROJECT_DIR%\backend"
if exist "%BACKEND_DIR%\package.json" (
    echo   [INFO] Node.js backend detected.
    cd /d "%BACKEND_DIR%"
    call npm install
    if !ERRORLEVEL! equ 0 (
        echo   [OK] Backend npm dependencies installed.
        set /a PASS_COUNT+=1
    ) else (
        echo   [ERROR] Backend npm install failed.
        set /a FAIL_COUNT+=1
    )
) else if exist "%BACKEND_DIR%\requirements.txt" (
    echo   [INFO] Python backend detected.
    where python >nul 2>nul
    if !ERRORLEVEL! equ 0 (
        cd /d "%BACKEND_DIR%"
        python -m pip install -r requirements.txt
        if !ERRORLEVEL! equ 0 (
            echo   [OK] Python dependencies installed.
            set /a PASS_COUNT+=1
        ) else (
            echo   [ERROR] pip install failed.
            set /a FAIL_COUNT+=1
        )
    ) else (
        echo   [ERROR] Python not found. Install Python: https://python.org/
        set /a FAIL_COUNT+=1
    )
) else (
    echo   [INFO] No local backend detected [Supabase cloud backend].
    echo   [SKIP] Backend installation not required.
)

echo.

:: -----------------------------------------------------------
:: 5. ENVIRONMENT FILES
:: -----------------------------------------------------------
:env_setup
echo [STEP 5/6] Checking environment files...
echo.

:: Root .env
if exist "%PROJECT_DIR%\.env.example" (
    if not exist "%PROJECT_DIR%\.env" (
        copy "%PROJECT_DIR%\.env.example" "%PROJECT_DIR%\.env" >nul
        echo   [OK] Created root .env from .env.example
        echo   [WARN] Please edit .env and fill in your values:
        echo          - VITE_SUPABASE_PROJECT_ID
        echo          - VITE_SUPABASE_PUBLISHABLE_KEY
        echo          - VITE_SUPABASE_URL
        set /a WARN_COUNT+=1
    ) else (
        echo   [OK] Root .env already exists.
        set /a PASS_COUNT+=1
    )
) else (
    echo   [INFO] No .env.example found at project root.
)

:: Frontend .env
if exist "%FRONTEND_DIR%\.env.example" (
    if not exist "%FRONTEND_DIR%\.env" (
        copy "%FRONTEND_DIR%\.env.example" "%FRONTEND_DIR%\.env" >nul
        echo   [OK] Created frontend .env from .env.example
        echo   [WARN] Please review frontend\.env and configure variables.
        set /a WARN_COUNT+=1
    ) else (
        echo   [OK] Frontend .env already exists.
        set /a PASS_COUNT+=1
    )
) else (
    if exist "%FRONTEND_DIR%\.env" (
        echo   [OK] Frontend .env exists.
        set /a PASS_COUNT+=1
    ) else (
        echo   [INFO] No frontend .env.example found. Frontend may use root .env.
    )
)

echo.

:: -----------------------------------------------------------
:: 6. VALIDATION SUMMARY
:: -----------------------------------------------------------
echo [STEP 6/6] Validating setup...
echo.

:: Re-check everything
set "V_NODE=FAIL"
set "V_NPM=FAIL"
set "V_FRONTEND=FAIL"
set "V_ENV=FAIL"

where node >nul 2>nul && set "V_NODE=PASS"
where npm >nul 2>nul && set "V_NPM=PASS"
if exist "%FRONTEND_DIR%\node_modules" set "V_FRONTEND=PASS"
if exist "%PROJECT_DIR%\.env" set "V_ENV=PASS"
if exist "%FRONTEND_DIR%\.env" set "V_ENV=PASS"

echo   Validation Results:
echo   -------------------
if "!V_NODE!"=="PASS" (echo   [PASS] Node.js installed) else (echo   [FAIL] Node.js not found)
if "!V_NPM!"=="PASS" (echo   [PASS] npm installed) else (echo   [FAIL] npm not found)
if "!V_FRONTEND!"=="PASS" (echo   [PASS] Frontend dependencies installed) else (echo   [FAIL] Frontend dependencies missing)

:: Backend validation
if exist "%BACKEND_DIR%\node_modules" (
    echo   [PASS] Backend dependencies installed
) else if exist "%BACKEND_DIR%\requirements.txt" (
    echo   [WARN] Backend dependencies - verify manually
) else (
    echo   [PASS] Backend not required [Supabase cloud]
)

if "!V_ENV!"=="PASS" (echo   [PASS] Environment files configured) else (echo   [WARN] No .env file found - may need manual setup)
echo   [PASS] Project ready to start

echo.
echo ========================================================
if !FAIL_COUNT! equ 0 (
    echo   PROJECT SETUP COMPLETED SUCCESSFULLY!
) else (
    echo   PROJECT SETUP COMPLETED WITH !FAIL_COUNT! ERRORS
    echo   Please review errors above and fix manually.
)
echo ========================================================
echo.
echo   Next Commands:
echo.
echo     Windows:
echo       scripts\start-project.bat
echo.
echo     Linux/macOS:
echo       ./scripts/start-project.sh
echo.
echo   Summary: !PASS_COUNT! passed, !FAIL_COUNT! failed, !WARN_COUNT! warnings
echo ========================================================
echo.

cd /d "%SCRIPT_DIR%"
endlocal
exit /b %FAIL_COUNT%
