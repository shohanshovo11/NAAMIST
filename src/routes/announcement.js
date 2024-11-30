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
const { isAdminOrAlumni, isAdmin } = require('../middleware/validateRole');

const router = express.Router();

// CRUD routes
router.get('/', getAllAnnouncements); // Get all announcements
router.get('/paginated', getPaginatedAnnouncement); // Get all announcements
router.get('/:id', getAnnouncementById); // Get announcement by ID
router.post('/',isAdminOrAlumni, upload.single('announcementImg'), createAnnouncement); // Create a new announcement with image upload
router.put('/:id',isAdminOrAlumni, upload.single('announcementImg'), updateAnnouncement); // Update an announcement with image upload
router.delete('/:id',isAdmin, deleteAnnouncement); // Delete an announcement by ID
router.put('/:id/approve',isAdmin, approveAnnouncement); // Approve an announcement

module.exports = router;
