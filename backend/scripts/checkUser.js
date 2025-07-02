const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function checkUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check for user with email
    const user = await User.findOne({ email: 'charan@gmail.com' });
    
    if (user) {
      console.log('User found:', {
        email: user.email,
        username: user.username,
        role: user.role,
        id: user._id
      });
    } else {
      console.log('User not found with email: charan@gmail.com');
      
      // List all users in the database
      const allUsers = await User.find({});
      console.log('\nAll users in database:');
      allUsers.forEach(u => {
        console.log({
          email: u.email,
          username: u.username,
          role: u.role
        });
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkUser(); 