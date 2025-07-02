// Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const uploadRoutes = require('./routes/upload');
const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/users');

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

// Test Cloudinary connection
cloudinary.api.ping()
    .then(() => {
        console.log('✅ Cloudinary connection successful');
        console.log('Cloud name:', process.env.CLOUDINARY_CLOUD_NAME);
    })
    .catch(err => {
        console.error('❌ Cloudinary connection error:', err);
        console.error('Please check your Cloudinary credentials in .env file');
        process.exit(1); // Exit if Cloudinary configuration fails
    });

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173'
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../mini/build')));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../mini/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start server only after successful database connection
        const PORT = process.env.PORT || 5002;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }); 