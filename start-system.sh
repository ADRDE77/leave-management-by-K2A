#!/bin/bash

echo "🚀 Starting Leave Management System..."

# Start backend
echo "Starting backend server..."
cd backend
npm start &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait for backend to start
sleep 3

# Start frontend
echo "Starting frontend server..."
cd ../frontend
npm run start:lan &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

# Save PIDs for cleanup
echo $BACKEND_PID > ../backend.pid
echo $FRONTEND_PID > ../frontend.pid

echo "✅ System started!"
echo "📱 Access at: http://$(hostname -I | awk '{print $1}'):3000"
echo "🛑 To stop: ./stop-system.sh"

wait
