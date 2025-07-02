const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const authenticateToken = require('../middleware/auth');

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// Upload route
router.post('/', authenticateToken, upload.array('images', 5), async (req, res) => {
    try {
        console.log('Upload request received');
        console.log('Files received:', req.files ? req.files.length : 0);

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Log each file's details
        req.files.forEach(file => {
            console.log('File details:', {
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size
            });
        });

        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'event_images',
                        resource_type: 'auto'
                    },
                    (error, result) => {
                        if (error) {
                            console.error('Cloudinary upload error:', error);
                            reject(error);
                        } else {
                            console.log('Upload successful:', result.secure_url);
                            resolve(result.secure_url);
                        }
                    }
                );

                uploadStream.end(file.buffer);
            });
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        console.log('All uploads completed successfully');
        res.status(200).json({ urls: uploadedUrls });
    } catch (error) {
        console.error('Upload error:', error);
        console.error('Error stack:', error.stack);
        console.error('Error details:', {
            message: error.message,
            name: error.name,
            status: error.status
        });
        res.status(500).json({ message: 'Error uploading images', error: error.message });
    }
});

module.exports = router; 