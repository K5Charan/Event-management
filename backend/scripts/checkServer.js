const axios = require('axios');

async function checkServer() {
  try {
    console.log('Checking server at http://localhost:5002/api/auth/health');
    const response = await axios.get('http://localhost:5002/api/auth/health');
    console.log('Server response:', response.data);
  } catch (error) {
    console.error('Server check failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('Server is not running or not accessible on port 5002');
    }
  }
}

checkServer(); 