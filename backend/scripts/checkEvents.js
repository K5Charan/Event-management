require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/event_platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Event = require('../models/Event');

const checkEvents = async () => {
    try {
        const events = await Event.find();
        console.log('Events in database:', events);
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error checking events:', error);
        process.exit(1);
    }
};

checkEvents(); 