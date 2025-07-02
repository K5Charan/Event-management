require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Log environment variables (without sensitive data)
console.log('Environment check:');
console.log('CLOUDINARY_URL:', process.env.CLOUDINARY_URL ? 'Present' : 'Missing');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing');

// Configure Cloudinary
if (process.env.CLOUDINARY_URL) {
    console.log('Using CLOUDINARY_URL configuration');
    cloudinary.config({
        url: process.env.CLOUDINARY_URL
    });
} else {
    console.log('Using individual credentials configuration');
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    });
}

// Test the configuration
console.log('\nTesting Cloudinary connection...');
cloudinary.api.ping()
    .then(() => {
        console.log('✅ Cloudinary connection successful');
        console.log('Cloud name:', process.env.CLOUDINARY_CLOUD_NAME);
    })
    .catch(err => {
        console.error('❌ Cloudinary connection error:', err);
        console.error('Error details:', {
            message: err.message,
            name: err.name,
            status: err.status,
            http_code: err.http_code,
            request_id: err.request_id
        });
        console.error('\nPlease check your Cloudinary credentials in .env file');
    }); 