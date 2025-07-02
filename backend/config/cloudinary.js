const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Log configuration status
console.log('Cloudinary configuration:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    url_configured: !!process.env.CLOUDINARY_URL
});

// Configure Cloudinary using URL format
if (process.env.CLOUDINARY_URL) {
    cloudinary.config({
        url: process.env.CLOUDINARY_URL
    });
} else {
    // Fallback to individual credentials
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    });
}

// Test the configuration
cloudinary.api.ping()
    .then(() => {
        console.log('Cloudinary connection successful');
        console.log('Cloud name:', process.env.CLOUDINARY_CLOUD_NAME);
    })
    .catch(err => {
        console.error('Cloudinary connection error:', err);
        console.error('Please check your Cloudinary credentials in .env file');
    });

// Configure storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'event_images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
    }
});

// Create multer upload instance with error handling
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Check file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
            return;
        }
        cb(null, true);
    }
}).array('images', 5);

// Wrap the upload middleware to handle errors
const uploadMiddleware = (req, res, next) => {
    console.log('Starting file upload...');
    console.log('Request headers:', req.headers);
    
    upload(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err);
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' });
            }
            if (err.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).json({ message: 'Too many files. Maximum is 5 files.' });
            }
            return res.status(400).json({ message: err.message });
        }
        
        console.log('Files uploaded successfully:', req.files);
        next();
    });
};

module.exports = {
    cloudinary,
    upload: uploadMiddleware
}; 