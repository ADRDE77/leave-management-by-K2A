// Configuration for API endpoints
const config = {
  // Get the current host IP or use localhost as fallback
  API_BASE_URL: process.env.REACT_APP_API_URL || `http://${window.location.hostname}:5000`,
  
  // Alternative: You can also set a specific IP for LAN access
  // API_BASE_URL: 'http://10.1.0.222:5000',
  
  // API endpoints
  endpoints: {
    auth: {
      login: '/api/auth/login',
      register: '/api/auth/register'
    },
    leave: {
      apply: '/api/leave/apply',
      list: '/api/leave',
      pending: '/api/leave/pending',
      approved: '/api/leave/approved',
      rejected: '/api/leave/rejected',
      balance: '/api/leave/balance'
    }
  }
};

export default config;