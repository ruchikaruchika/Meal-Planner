#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "===================================="
echo "SmartMeal Planner - Startup Script"
echo "===================================="

if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm is not installed. Please install Node.js."
    exit 1
fi

FRONTEND_DIR="$SCRIPT_DIR/../frontend"

if [ -f "$FRONTEND_DIR/package.json" ]; then
    echo "[INFO] Frontend detected."
    cd "$FRONTEND_DIR"

    if [ ! -d "node_modules" ]; then
        echo "[INFO] Installing frontend dependencies..."
        npm install
    fi

    echo "[INFO] Starting Frontend Server (Vite)..."
    npm run dev > frontend.log 2>&1 &
    echo $! > frontend.pid
    echo "[INFO] Frontend running. PID saved to frontend.pid."
fi

echo ""
echo "[INFO] Waiting for services to initialize..."
sleep 3

echo "[INFO] Opening application in default browser..."
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:8080
elif command -v open &> /dev/null; then
    open http://localhost:8080
else
    echo "[WARN] Could not open browser. Visit http://localhost:8080"
fi

echo ""
echo "===================================="
echo "ALL SERVICES STARTED SUCCESSFULLY!"
echo "Frontend: http://localhost:8080"
echo "To stop: ./stop-project.sh"
echo "===================================="
