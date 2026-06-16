const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

console.log('=== ENV VARIABLES ===');
console.log('PORT:', process.env.PORT);
console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
console.log('====================');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const topicRoutes = require('./routes/topics');
app.use('/api', topicRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB not connected:', err.message));

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});