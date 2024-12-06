const express = require('express');
const { registerUser, loginUser, updateEmail, updatePassword } = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.error('Token missing in request');
    return res.status(403).json({ error: 'Access denied, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log('Decoded Token:', decoded); // Log decoded token
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message); // Log verification error
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Rate limiter for sensitive endpoints
const updateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each user to 5 requests per 15 minutes
  message: { error: 'Too many requests, please try again later' },
});

// Profile route (protected)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, 'name email'); // Fetch only name and email
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error.message); // Log error
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Email (protected)
router.put('/update-email', verifyToken, updateLimiter, updateEmail);

// Update Password (protected)
router.put('/update-password', verifyToken, updateLimiter, updatePassword);

// Registration and login routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = { router, verifyToken }; // Export verifyToken and router
