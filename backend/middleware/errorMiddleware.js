const errorHandler = (err, req, res, next) => {
    console.error('Error stack:', err.stack);
    console.error('Error details:', {
        message: err.message,
        name: err.name,
        status: err.status
    });
    
    res.status(err.status || 500).json({ 
        message: err.message || 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
};

module.exports = { errorHandler }; 