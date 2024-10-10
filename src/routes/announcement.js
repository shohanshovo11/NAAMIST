// routes/announcementRoutes.js
const express = require('express');
const {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getPaginatedAnnouncement,
  approveAnnouncement,
} = require('../controllers/announcementController');
const upload = require('../middleware/uploadAnnouncement'); // Import the multer configuration

const router = express.Router();

// CRUD routes
router.get('/', getAllAnnouncements); // Get all announcements
router.get('/paginated', getPaginatedAnnouncement); // Get all announcements
router.get('/:id', getAnnouncementById); // Get announcement by ID
router.post('/', upload.single('announcementImg'), createAnnouncement); // Create a new announcement with image upload
router.put('/:id', upload.single('announcementImg'), updateAnnouncement); // Update an announcement with image upload
router.delete('/:id', deleteAnnouncement); // Delete an announcement by ID
router.put('/:id/approve', approveAnnouncement); // Approve an announcement

module.exports = router;
