const fs = require('fs');
const path = require('path');
const Announcement = require('../models/announcement');

// Get all announcements
module.exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json({ success: true, data: announcements });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

// Get announcement by ID
module.exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }
    res.json({ success: true, data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

// Utility function to handle date parsing without time zone shifts
const processDate = (dateString) => {
  const date = new Date(dateString);

  // If the date string is in YYYY-MM-DD format, set the time to midnight UTC (00:00:00)
  if (!isNaN(date.getTime())) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())); // This ensures that the date is always treated as UTC
  }

  return null; // Handle invalid dates
};

// Create a new announcement with image handling and date processing
module.exports.createAnnouncement = async (req, res) => {
  const {
    title, description, date, link
  } = req.body;

  try {
    // Handle image upload if it exists
    let imageFilename = '';
    if (req.file) {
      imageFilename = path.basename(req.file.path); // Save only the filename
    }

    // Process the date correctly
    const processedDate = processDate(date);

    const newAnnouncement = new Announcement({
      title,
      description,
      date: processedDate, // Use the processed date
      image: imageFilename, // Save only the filename in the announcement
      link,
    });

    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json({ success: true, data: savedAnnouncement });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

// Update an announcement by ID with image handling and date processing
module.exports.updateAnnouncement = async (req, res) => {
  const {
    title, description, date, link
  } = req.body;

  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    // Handle image upload if a new image is provided
    if (req.file) {
      // Delete the old image file if it exists
      if (announcement.image && fs.existsSync(path.join(__dirname, '../uploads/announcements', announcement.image))) {
        fs.unlinkSync(path.join(__dirname, '../uploads/announcements', announcement.image));
      }
      announcement.image = path.basename(req.file.path); // Update with new image filename
    }

    // Process the date correctly
    const processedDate = date ? processDate(date) : announcement.date;

    // Update other fields
    announcement.title = title || announcement.title;
    announcement.description = description || announcement.description;
    announcement.date = processedDate; // Use the processed date
    announcement.link = link || announcement.link;

    const updatedAnnouncement = await announcement.save();
    res.json({ success: true, data: updatedAnnouncement });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

// Delete an announcement by ID, including image deletion
module.exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    // Delete the image file if it exists
    if (announcement.image && fs.existsSync(path.join(__dirname, '../uploads/announcements', announcement.image))) {
      fs.unlinkSync(path.join(__dirname, '../uploads/announcements', announcement.image));
    }

    await announcement.remove();
    res.json({ success: true, message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};
