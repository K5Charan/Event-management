require('dotenv').config();

console.log('Testing environment variables:');
console.log('Current working directory:', process.cwd());
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing');
console.log('CLOUDINARY_URL:', process.env.CLOUDINARY_URL ? 'Present' : 'Missing'); 