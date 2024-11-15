// server/routes/order.js
const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// Route to handle checkout and create an order
router.post('/checkout', async (req, res) => {
  const { items, total } = req.body;

  try {
    const order = new Order({
      items,
      total
    });
    
    await order.save();
    res.json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order', details: error.message });
  }
});

module.exports = router;
