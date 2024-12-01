const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote; 