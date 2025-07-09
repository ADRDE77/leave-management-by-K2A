# Leave Management System - LAN Setup Guide

This guide will help you set up the Leave Management System for access across your local network (LAN).

## Issues Fixed

✅ **Font Awesome Integrity Hash** - Updated to correct hash  
✅ **CORS Errors** - Configured for LAN access  
✅ **WebSocket Connection** - Fixed for network access  
✅ **React Router Warnings** - Added future flags  
✅ **API Endpoints** - Centralized configuration  

## Quick Setup

### 1. Run the Setup Script
```bash
./setup-lan.sh
```

This script will:
- Detect your IP address automatically
- Configure frontend and backend for LAN access
- Create start/stop scripts
- Install dependencies if needed

### 2. Start MongoDB
```bash
sudo systemctl start mongod
# or
sudo service mongod start
```

### 3. Start the System
```bash
./start-system.sh
```

### 4. Access the Application
- **Local**: http://localhost:3000
- **LAN**: http://YOUR_IP:3000 (displayed when starting)

## Manual Configuration

If you prefer manual setup:

### Frontend Configuration
Create `frontend/.env`:
```env
REACT_APP_API_URL=http://YOUR_IP:5000
HOST=0.0.0.0
WDS_SOCKET_HOST=0.0.0.0
WDS_SOCKET_PORT=3000
```

### Backend Configuration
The backend is already configured with dynamic CORS that allows:
- All localhost origins
- Private network IP ranges (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
- Development mode allows all origins

### Start Services Manually
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run start:lan
```

## Network Access

### From Other Devices
1. Ensure your firewall allows connections on ports 3000 and 5000
2. Connect devices to the same network
3. Access: http://SERVER_IP:3000

### Firewall Configuration (if needed)
```bash
# Ubuntu/Debian
sudo ufw allow 3000
sudo ufw allow 5000

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --permanent --add-port=5000/tcp
sudo firewall-cmd --reload
```

## Troubleshooting

### CORS Errors
- Check that your IP is correctly configured in frontend/.env
- Verify backend is running on the correct IP
- Check browser console for specific CORS error messages

### WebSocket Connection Errors
- Ensure WDS_SOCKET_HOST=0.0.0.0 in frontend/.env
- Check that port 3000 is accessible from other devices

### Cannot Access from Other Devices
- Verify devices are on the same network
- Check firewall settings
- Try accessing http://SERVER_IP:3000 directly

### Backend Connection Failed
- Ensure MongoDB is running
- Check backend logs for errors
- Verify backend is listening on 0.0.0.0:5000

## Security Notes

⚠️ **Development Mode**: The current configuration allows broad network access for development. For production:

1. Restrict CORS origins to specific IPs
2. Use HTTPS instead of HTTP
3. Implement proper authentication
4. Configure firewall rules appropriately

## File Structure

```
leave-management-system-new/
├── frontend/
│   ├── .env                    # Frontend configuration
│   ├── src/config.js          # API endpoint configuration
│   └── package.json           # Added start:lan script
├── backend/
│   ├── server.js              # Updated CORS configuration
│   └── .env                   # Backend configuration
├── setup-lan.sh               # Automated setup script
├── start-system.sh            # System startup script
├── stop-system.sh             # System shutdown script
└── LAN-SETUP.md              # This guide
```

## Default Credentials

Create admin user through the registration page or directly in MongoDB:
```javascript
// In MongoDB shell
use leaveDB
db.users.insertOne({
  name: "Admin",
  email: "admin@company.com",
  password: "$2a$10$...", // bcrypt hash of your password
  role: "manager"
})
```

## Support

If you encounter issues:
1. Check the console logs in your browser
2. Check backend terminal for error messages
3. Verify network connectivity between devices
4. Ensure all services are running on the correct ports