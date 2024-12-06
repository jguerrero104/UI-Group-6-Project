const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  const { items, total, address } = req.body;

  try {
    const newOrder = new Order({
      user: req.user.id,
      items,
      total,
      address,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Fetch order history
exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
};
