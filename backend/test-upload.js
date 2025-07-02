require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Test the configuration
console.log('Testing Cloudinary configuration...');
console.log('Cloud name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '***' : 'Not set');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '***' : 'Not set');

// Test the connection
cloudinary.api.ping()
    .then(() => {
        console.log('Cloudinary connection successful!');
    })
    .catch(err => {
        console.error('Cloudinary connection error:', err);
    }); 