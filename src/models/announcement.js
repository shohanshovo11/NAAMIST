const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
