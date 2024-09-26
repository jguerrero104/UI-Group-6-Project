const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err));


const TestSchema = new mongoose.Schema({
  name: String,
});

const TestModel = mongoose.model('Test', TestSchema);

// Route to test database connection
app.get('/test-db', async (req, res) => {
  try {
    // Insert a test document
    const testDoc = new TestModel({ name: 'Test Document' });
    await testDoc.save();

    // Fetch the inserted document from the database
    const result = await TestModel.find();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Database operation failed', details: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
