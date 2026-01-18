#!/bin/bash

# Port to check
PORT=3000

# Function to kill process on port
cleanup_port() {
  PID=$(lsof -ti:$PORT)
  if [ ! -z "$PID" ]; then
    echo "⚠️  Port $PORT is in use by PID $PID. Killing it..."
    kill -9 $PID
    echo "✅  Killed process $PID"
  fi
}

# Cleanup Next.js lock file
cleanup_lock() {
  if [ -f ".next/dev/lock" ]; then
    echo "🧹 Removing stale Next.js lock file..."
    rm -f ".next/dev/lock"
  fi
}

echo "🚀 Starting robust dev environment..."

cleanup_port
cleanup_lock

echo "✅  Cleanup complete. Starting Next.js..."
exec next dev
