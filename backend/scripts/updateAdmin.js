const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function updateUserToAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOneAndUpdate(
      { email: 'charan@gmail.com' },
      { role: 'admin' },
      { new: true }
    );

    if (user) {
      console.log('User updated successfully:', {
        email: user.email,
        username: user.username,
        role: user.role
      });
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

updateUserToAdmin(); 