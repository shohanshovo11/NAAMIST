const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventManagementSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventContent: {
    type: String,
    required: true,
  },
  cardImage: {
    type: String,
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('EventManagement', eventManagementSchema);
