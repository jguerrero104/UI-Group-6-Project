const express = require('express');
const { verifyToken } = require('./auth'); // Middleware from auth.js
const Order = require('../models/Order'); // Ensure this is imported correctly
const { createOrder, getOrderHistory } = require('../controllers/orderController');

const router = express.Router();

// Checkout route
router.post('/checkout', verifyToken, createOrder);

// Order history route
router.get('/history', verifyToken, getOrderHistory);

// Delete all order history
router.delete('/history', verifyToken, async (req, res) => {
  try {
    // Delete all orders associated with the logged-in user
    await Order.deleteMany({ user: req.user.id });
    res.status(200).json({ message: 'Order history deleted successfully.' });
  } catch (error) {
    console.error('Failed to delete order history:', error);
    res.status(500).json({ error: 'Failed to delete order history.' });
  }
});

module.exports = router;
