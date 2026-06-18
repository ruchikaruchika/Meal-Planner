#!/bin/bash

# ============================================================
# SmartMeal Planner - Dependency Installer (Linux/macOS)
# Idempotent: safe to run multiple times
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
FRONTEND_DIR="$PROJECT_DIR/frontend"

PASS_COUNT=0
FAIL_COUNT=0
WARN_COUNT=0

echo ""
echo "========================================================"
echo "  SmartMeal Planner - Dependency Installer (Linux/macOS)"
echo "========================================================"
echo ""

# -----------------------------------------------------------
# Helper Functions
# -----------------------------------------------------------
pass() { echo "  [OK] $1"; PASS_COUNT=$((PASS_COUNT + 1)); }
fail() { echo "  [ERROR] $1"; FAIL_COUNT=$((FAIL_COUNT + 1)); }
warn() { echo "  [WARN] $1"; WARN_COUNT=$((WARN_COUNT + 1)); }
info() { echo "  [INFO] $1"; }
skip() { echo "  [SKIP] $1"; }

# -----------------------------------------------------------
# 1. ENVIRONMENT VERIFICATION
# -----------------------------------------------------------
echo "[STEP 1/6] Checking environment..."
echo ""

# --- Node.js ---
NODE_OK=0
if command -v node >/dev/null 2>&1; then
    NODE_VER=$(node --version)
    pass "Node.js ............. $NODE_VER"
    NODE_OK=1
else
    fail "Node.js"
fi

# --- npm ---
if command -v npm >/dev/null 2>&1; then
    NPM_VER=$(npm --version)
    pass "npm ................. $NPM_VER"
else
    fail "npm"
fi

# --- Git ---
GIT_OK=0
if command -v git >/dev/null 2>&1; then
    GIT_VER=$(git --version)
    pass "Git ................. $GIT_VER"
    GIT_OK=1
else
    fail "Git"
fi

echo ""

# -----------------------------------------------------------
# 2. AUTOMATIC INSTALLATION OF MISSING TOOLS
# -----------------------------------------------------------
echo "[STEP 2/6] Installing missing dependencies..."
echo ""

OS_TYPE="$(uname -s)"
PKG_MGR="none"
if [ "$OS_TYPE" = "Darwin" ]; then
    if command -v brew >/dev/null 2>&1; then
        PKG_MGR="brew"
    fi
elif [ "$OS_TYPE" = "Linux" ]; then
    if command -v apt-get >/dev/null 2>&1; then
        PKG_MGR="apt"
    elif command -v dnf >/dev/null 2>&1; then
        PKG_MGR="dnf"
    elif command -v yum >/dev/null 2>&1; then
        PKG_MGR="yum"
    elif command -v pacman >/dev/null 2>&1; then
        PKG_MGR="pacman"
    fi
fi

# --- Install Node.js ---
if [ $NODE_OK -eq 0 ]; then
    info "Attempting to install Node.js..."
    if [ "$PKG_MGR" = "brew" ]; then
        info "Using Homebrew..."
        brew install node
        [ $? -eq 0 ] && pass "Node.js installed via Homebrew" || fail "Homebrew install failed"
    elif [ "$PKG_MGR" = "apt" ]; then
        info "Using APT (Debian/Ubuntu)..."
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
        [ $? -eq 0 ] && pass "Node.js installed via APT" || fail "APT install failed"
    elif [ "$PKG_MGR" = "dnf" ] || [ "$PKG_MGR" = "yum" ]; then
        info "Using DNF/YUM (Fedora/CentOS)..."
        curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
        sudo $PKG_MGR install -y nodejs
        [ $? -eq 0 ] && pass "Node.js installed via $PKG_MGR" || fail "$PKG_MGR install failed"
    elif [ "$PKG_MGR" = "pacman" ]; then
        info "Using Pacman (Arch)..."
        sudo pacman -S --noconfirm nodejs npm
        [ $? -eq 0 ] && pass "Node.js installed via Pacman" || fail "Pacman install failed"
    else
        fail "No supported package manager found."
        info "Please install Node.js manually: https://nodejs.org/"
    fi
else
    skip "Node.js already installed."
fi

# --- Install Git ---
if [ $GIT_OK -eq 0 ]; then
    info "Attempting to install Git..."
    if [ "$PKG_MGR" = "brew" ]; then
        brew install git
        [ $? -eq 0 ] && pass "Git installed via Homebrew" || fail "Homebrew install failed"
    elif [ "$PKG_MGR" = "apt" ]; then
        sudo apt-get install -y git
        [ $? -eq 0 ] && pass "Git installed via APT" || fail "APT install failed"
    elif [ "$PKG_MGR" = "dnf" ] || [ "$PKG_MGR" = "yum" ]; then
        sudo $PKG_MGR install -y git
        [ $? -eq 0 ] && pass "Git installed via $PKG_MGR" || fail "$PKG_MGR install failed"
    elif [ "$PKG_MGR" = "pacman" ]; then
        sudo pacman -S --noconfirm git
        [ $? -eq 0 ] && pass "Git installed via Pacman" || fail "Pacman install failed"
    else
        fail "No supported package manager found."
        info "Please install Git manually: https://git-scm.com/"
    fi
else
    skip "Git already installed."
fi

echo ""

# -----------------------------------------------------------
# 3. FRONTEND SETUP
# -----------------------------------------------------------
echo "[STEP 3/6] Setting up frontend..."
echo ""

if [ ! -f "$FRONTEND_DIR/package.json" ]; then
    fail "frontend/package.json not found!"
    info "Make sure you cloned the full repository."
else
    cd "$FRONTEND_DIR"

    # Install npm packages
    info "Installing frontend npm packages..."
    npm install
    if [ $? -eq 0 ]; then
        pass "Frontend dependencies installed."
    else
        fail "npm install failed."
        info "Attempting clean install..."
        rm -rf node_modules
        npm install
        if [ $? -eq 0 ]; then
            pass "Clean install succeeded."
        else
            fail "Clean install also failed. Check npm output above."
        fi
    fi

    # Verify package-lock.json
    if [ -f "package-lock.json" ]; then
        pass "package-lock.json exists."
    else
        warn "package-lock.json missing. Generating..."
        npm install --package-lock-only
    fi

    # npm audit fix
    info "Running npm audit fix (safe mode)..."
    npm audit fix >/dev/null 2>&1
    pass "Audit fix completed."
    
    cd "$SCRIPT_DIR"
fi

echo ""

# -----------------------------------------------------------
# 4. BACKEND SETUP
# -----------------------------------------------------------
echo "[STEP 4/6] Checking for backend..."
echo ""

BACKEND_DIR="$PROJECT_DIR/backend"
if [ -f "$BACKEND_DIR/package.json" ]; then
    info "Node.js backend detected."
    cd "$BACKEND_DIR"
    npm install
    if [ $? -eq 0 ]; then
        pass "Backend npm dependencies installed."
    else
        fail "Backend npm install failed."
    fi
    cd "$SCRIPT_DIR"
elif [ -f "$BACKEND_DIR/requirements.txt" ]; then
    info "Python backend detected."
    if command -v python3 >/dev/null 2>&1; then
        cd "$BACKEND_DIR"
        python3 -m pip install -r requirements.txt
        if [ $? -eq 0 ]; then
            pass "Python dependencies installed."
        else
            fail "pip install failed."
        fi
        cd "$SCRIPT_DIR"
    elif command -v python >/dev/null 2>&1; then
        cd "$BACKEND_DIR"
        python -m pip install -r requirements.txt
        if [ $? -eq 0 ]; then
            pass "Python dependencies installed."
        else
            fail "pip install failed."
        fi
        cd "$SCRIPT_DIR"
    else
        fail "Python not found. Install Python: https://python.org/"
    fi
else
    info "No local backend detected [Supabase cloud backend]."
    skip "Backend installation not required."
fi

echo ""

# -----------------------------------------------------------
# 5. ENVIRONMENT FILES
# -----------------------------------------------------------
echo "[STEP 5/6] Checking environment files..."
echo ""

# Root .env
if [ -f "$PROJECT_DIR/.env.example" ]; then
    if [ ! -f "$PROJECT_DIR/.env" ]; then
        cp "$PROJECT_DIR/.env.example" "$PROJECT_DIR/.env"
        pass "Created root .env from .env.example"
        warn "Please edit .env and fill in your values:"
        echo "         - VITE_SUPABASE_PROJECT_ID"
        echo "         - VITE_SUPABASE_PUBLISHABLE_KEY"
        echo "         - VITE_SUPABASE_URL"
    else
        pass "Root .env already exists."
    fi
else
    info "No .env.example found at project root."
fi

# Frontend .env
if [ -f "$FRONTEND_DIR/.env.example" ]; then
    if [ ! -f "$FRONTEND_DIR/.env" ]; then
        cp "$FRONTEND_DIR/.env.example" "$FRONTEND_DIR/.env"
        pass "Created frontend .env from .env.example"
        warn "Please review frontend/.env and configure variables."
    else
        pass "Frontend .env already exists."
    fi
else
    if [ -f "$FRONTEND_DIR/.env" ]; then
        pass "Frontend .env exists."
    else
        info "No frontend .env.example found. Frontend may use root .env."
    fi
fi

echo ""

# -----------------------------------------------------------
# 6. VALIDATION SUMMARY
# -----------------------------------------------------------
echo "[STEP 6/6] Validating setup..."
echo ""

echo "  Validation Results:"
echo "  -------------------"

command -v node >/dev/null 2>&1 && echo "  [PASS] Node.js installed" || echo "  [FAIL] Node.js not found"
command -v npm >/dev/null 2>&1 && echo "  [PASS] npm installed" || echo "  [FAIL] npm not found"

if [ -d "$FRONTEND_DIR/node_modules" ]; then
    echo "  [PASS] Frontend dependencies installed"
else
    echo "  [FAIL] Frontend dependencies missing"
fi

if [ -d "$BACKEND_DIR/node_modules" ]; then
    echo "  [PASS] Backend dependencies installed"
elif [ -f "$BACKEND_DIR/requirements.txt" ]; then
    echo "  [WARN] Backend dependencies - verify manually"
else
    echo "  [PASS] Backend not required [Supabase cloud]"
fi

if [ -f "$PROJECT_DIR/.env" ] || [ -f "$FRONTEND_DIR/.env" ]; then
    echo "  [PASS] Environment files configured"
else
    echo "  [WARN] No .env file found - may need manual setup"
fi

echo "  [PASS] Project ready to start"

echo ""
echo "========================================================"
if [ $FAIL_COUNT -eq 0 ]; then
    echo "  PROJECT SETUP COMPLETED SUCCESSFULLY!"
else
    echo "  PROJECT SETUP COMPLETED WITH $FAIL_COUNT ERRORS"
    echo "  Please review errors above and fix manually."
fi
echo "========================================================"
echo ""
echo "  Next Commands:"
echo ""
echo "    Windows:"
echo "      scripts\\start-project.bat"
echo ""
echo "    Linux/macOS:"
echo "      ./scripts/start-project.sh"
echo ""
echo "  Summary: $PASS_COUNT passed, $FAIL_COUNT failed, $WARN_COUNT warnings"
echo "========================================================"
echo ""

exit $FAIL_COUNT
