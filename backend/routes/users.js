const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const admin = require('../middleware/admin');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('tickets', 'event status')
                                           
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', [
  auth,
  body('firstName').optional().trim().notEmpty(),
  body('lastName').optional().trim().notEmpty(),
  body('location').optional().trim(),
  body('interests').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, location, interests } = req.body;
    const user = await User.findById(req.user.id);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (location) user.location = location;
    if (interests) user.interests = interests;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
       return res.status(400).json({ message: 'user not found' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token here:
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
         }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Update user password
router.put('/password', [
  auth,
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
//Update user interestsAdd commentMore actions
router.post('/interests', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { interests } = req.body;
        if (!interests || typeof interests !== 'object' || Array.isArray(interests)) {
            return res.status(400).json({ message: 'Interests must be an object mapping categories to arrays.' });
        }
        // Optionally, validate that each value is an array
        for (const key in interests) {
            if (!Array.isArray(interests[key])) {
                return res.status(400).json({ message: `Interests for category '${key}' must be an array.` });
            }
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.interests = interests;
        await user.save();
        res.json({ message: 'Interests saved',interests: user.interests });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/interests', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id || req.user._id).select('interests');
    res.json({ interests: user.interests });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Save user locations
router.post('/locations', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { locations } = req.body;
    if (!Array.isArray(locations)) {
      return res.status(400).json({ message: 'Locations must be an array' });
    }
    await User.findByIdAndUpdate(userId, { locations });
    res.json({ message: 'Locations saved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user locations
router.get('/locations', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id || req.user._id).select('locations');
    res.json({ locations: user.locations || [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/', [auth, admin], async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID (admin only)
router.get('/:id', [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user role (admin only)
router.patch('/:id/role', [auth, admin], async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 