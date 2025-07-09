#!/bin/bash

# Update AdminApprovedRequests.js
sed -i "1i import config from '../config';" /home/dev/Downloads/leave-management-system-new/frontend/src/pages/AdminApprovedRequests.js
sed -i "s|'http://localhost:5000/api/leave/approved'|\`\${config.API_BASE_URL}\${config.endpoints.leave.approved}\`|g" /home/dev/Downloads/leave-management-system-new/frontend/src/pages/AdminApprovedRequests.js

# Update AdminRejectedRequests.js
sed -i "1i import config from '../config';" /home/dev/Downloads/leave-management-system-new/frontend/src/pages/AdminRejectedRequests.js
sed -i "s|'http://localhost:5000/api/leave/rejected'|\`\${config.API_BASE_URL}\${config.endpoints.leave.rejected}\`|g" /home/dev/Downloads/leave-management-system-new/frontend/src/pages/AdminRejectedRequests.js

# Update LeaveList.js
sed -i "1i import config from '../config';" /home/dev/Downloads/leave-management-system-new/frontend/src/pages/LeaveList.js
sed -i "s|'http://localhost:5000/api/leave'|\`\${config.API_BASE_URL}\${config.endpoints.leave.list}\`|g" /home/dev/Downloads/leave-management-system-new/frontend/src/pages/LeaveList.js

# Update LeaveHistory.js
sed -i "1i import config from '../config';" /home/dev/Downloads/leave-management-system-new/frontend/src/pages/LeaveHistory.js
sed -i "s|'http://localhost:5000/api/leave'|\`\${config.API_BASE_URL}\${config.endpoints.leave.list}\`|g" /home/dev/Downloads/leave-management-system-new/frontend/src/pages/LeaveHistory.js

echo "Files updated successfully!"