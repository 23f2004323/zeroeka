const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Machine Learning', 'DBMS', 'Web Development', 'Programming', 'Data Science']
  },
  status: {
    type: String,
    required: true,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Topic', topicSchema);