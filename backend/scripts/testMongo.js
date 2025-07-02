const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function testMongo() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/event_platform');
    console.log('Connected to MongoDB');

    // Check if admin user exists
    const adminUser = await User.findOne({ email: 'charan@gmail.com' });
    console.log('Admin user:', adminUser ? {
      email: adminUser.email,
      username: adminUser.username,
      role: adminUser.role
    } : 'Not found');

    // List all users
    const allUsers = await User.find({});
    console.log('\nAll users in database:');
    allUsers.forEach(user => {
      console.log({
        email: user.email,
        username: user.username,
        role: user.role
      });
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testMongo(); 