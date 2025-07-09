#!/bin/bash

# Leave Management System - LAN Setup Script
# This script configures the system for LAN access

echo "🔧 Setting up Leave Management System for LAN access..."

# Get the current IP address
IP=$(hostname -I | awk '{print $1}')
echo "📡 Detected IP address: $IP"

# Check if IP was detected
if [ -z "$IP" ]; then
    echo "❌ Could not detect IP address. Please set it manually."
    read -p "Enter your server IP address: " IP
fi

echo "🔧 Configuring for IP: $IP"

# Update frontend .env file
echo "📝 Updating frontend/.env..."
cat > frontend/.env << EOF
# Frontend Environment Configuration
REACT_APP_API_URL=http://$IP:5000

# React Dev Server Configuration for LAN access
HOST=0.0.0.0
WDS_SOCKET_HOST=0.0.0.0
WDS_SOCKET_PORT=3000
CHOKIDAR_USEPOLLING=true
EOF

# Update backend CORS configuration
echo "📝 Updating backend CORS configuration..."
cat > backend/cors-config.js << EOF
// CORS Configuration for LAN access
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://$IP:3000',
    // Allow common private network ranges
    /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:3000$/,
    /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}:3000$/,
    /^http:\/\/172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}:3000$/
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

module.exports = corsOptions;
EOF

# Update server.js to use the new CORS config
echo "📝 Updating server.js..."
sed -i '/const corsOptions = {/,/};/c\
const corsOptions = require("./cors-config");' backend/server.js

# Install dependencies if needed
echo "📦 Checking dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

cd ..

# Create start script
echo "📝 Creating start script..."
cat > start-system.sh << 'EOF'
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
EOF

# Create stop script
cat > stop-system.sh << 'EOF'
#!/bin/bash

echo "🛑 Stopping Leave Management System..."

if [ -f backend.pid ]; then
    BACKEND_PID=$(cat backend.pid)
    kill $BACKEND_PID 2>/dev/null
    rm backend.pid
    echo "Backend stopped"
fi

if [ -f frontend.pid ]; then
    FRONTEND_PID=$(cat frontend.pid)
    kill $FRONTEND_PID 2>/dev/null
    rm frontend.pid
    echo "Frontend stopped"
fi

echo "✅ System stopped"
EOF

chmod +x start-system.sh stop-system.sh

echo "✅ LAN setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start MongoDB: sudo systemctl start mongod"
echo "2. Start the system: ./start-system.sh"
echo "3. Access from any device on your network at: http://$IP:3000"
echo ""
echo "🔧 Configuration files created:"
echo "   - frontend/.env (React app config)"
echo "   - backend/cors-config.js (CORS settings)"
echo "   - start-system.sh (startup script)"
echo "   - stop-system.sh (shutdown script)"