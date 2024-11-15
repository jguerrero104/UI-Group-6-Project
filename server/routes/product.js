// server/routes/product.js
const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Route to get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product', details: error.message });
  }
});

// Route to get all products with optional search, category, and sorting
router.get('/', async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let filter = {};
    if (search) filter.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    if (category) filter.category = category;

    let products = await Product.find(filter);

    if (sort === 'lowToHigh') products = products.sort((a, b) => a.price - b.price);
    if (sort === 'highToLow') products = products.sort((a, b) => b.price - a.price);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
});

module.exports = router;
