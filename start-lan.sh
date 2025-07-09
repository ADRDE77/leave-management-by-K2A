#!/bin/bash

# Leave Management System - LAN Startup Script

echo "🚀 Starting Leave Management System for LAN access..."

# Get the current IP address
IP=$(hostname -I | awk '{print $1}')
echo "📡 Detected IP address: $IP"

# Update the frontend .env file with the current IP
echo "🔧 Updating frontend configuration..."
cat > frontend/.env << EOF
# Frontend Environment Configuration - Auto-generated
REACT_APP_API_URL=http://$IP:5000

# WebSocket configuration for development server
WDS_SOCKET_HOST=0.0.0.0
WDS_SOCKET_PORT=3000
HOST=0.0.0.0
EOF

echo "✅ Frontend configured for IP: $IP"

# Start backend server
echo "🔧 Starting backend server..."
cd backend
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🔧 Starting frontend server..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo "✅ System started successfully!"
echo "📱 Access the application at:"
echo "   - Local: http://localhost:3000"
echo "   - LAN:   http://$IP:3000"
echo ""
echo "🛑 To stop the servers, press Ctrl+C or run: kill $BACKEND_PID $FRONTEND_PID"

# Wait for user to stop
wait