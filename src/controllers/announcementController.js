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

// Get all announcements with pagination
module.exports.getPaginatedAnnouncement = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  try {
    // Find approved announcements with pagination and sort by date in descending order
    const announcements = await Announcement.find({ isApproved: true })
      .sort({ date: -1 }) // Sort by date in descending order
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    // Get total count of approved announcements for pagination calculation
    const totalAnnouncements = await Announcement.countDocuments({ isApproved: true });

    res.json({
      success: true,
      data: announcements,
      totalPages: Math.ceil(totalAnnouncements / limitNumber),
      currentPage: pageNumber,
    });
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
    title, description, date, link, isApproved
  } = req.body;

  try {
    // Handle image upload if it exists
    let imageFilename = '';
    if (req.file) {
      imageFilename = path.basename(req.file.path); // Save only the filename
    }
    console.log(imageFilename, 'kjk');
    // Process the date correctly
    const processedDate = processDate(date);

    const newAnnouncement = new Announcement({
      title,
      description,
      date: processedDate, // Use the processed date
      image: imageFilename, // Save only the filename in the announcement
      link,
      isApproved: isApproved || false
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

    // Try to delete the image file if it exists
    if (announcement.image !== '' && announcement.image) {
      const imagePath = path.join(__dirname, '../uploads/announcements', announcement.image);

      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the image file
          console.log('Image file deleted successfully.');
        }
      } catch (imageError) {
        console.error('Error deleting image file:', imageError); // Log the image deletion error
      }
    }

    // Use findByIdAndDelete to remove the document
    await Announcement.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Announcement deleted successfully, even if image deletion failed.' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

// Approve an announcement by ID
module.exports.approveAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the announcement by ID and update its isApproved field to true
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true } // Return the updated document
    );

    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    res.json({ success: true, data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};
