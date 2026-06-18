#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/../frontend"

echo "===================================="
echo "SmartMeal Planner - Shutdown Script"
echo "===================================="

if [ -f "$FRONTEND_DIR/frontend.pid" ]; then
    PID=$(cat "$FRONTEND_DIR/frontend.pid")
    kill $PID 2>/dev/null
    rm "$FRONTEND_DIR/frontend.pid"
    echo "[OK] Frontend process terminated."
fi

echo "[INFO] Ensuring port 8080 is freed..."
if command -v lsof &> /dev/null; then
    PIDS=$(lsof -t -i:8080)
    if [ ! -z "$PIDS" ]; then
        kill -9 $PIDS 2>/dev/null
        echo "[OK] Port 8080 freed."
    fi
fi

pkill -f "vite" 2>/dev/null

echo ""
echo "===================================="
echo "ALL SERVICES STOPPED SUCCESSFULLY."
echo "===================================="
