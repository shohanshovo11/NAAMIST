const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getAllAlumni,
  approveAlumni,
  deleteAlumni,
  updateAlumni,
  getAlumni,
  getAlumniByEmail,
  getAlumniById
} = require('../controllers/alumniController');

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../images'); // Define upload path
    cb(null, uploadPath); // Use the upload path for storing files
  },
  filename: (req, file, cb) => {
    // Use a unique filename with the original name
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Initialize Multer with the defined storage
const upload = multer({ storage });

// Get All Alumni
router.get('/', getAllAlumni);

// Get Alumni for alumni page
router.get('/get', getAlumni);

// Get Alumni by ID
router.get('/:id', getAlumniById);

// Get Alumni by email
router.get('/getByEmail/:email', getAlumniByEmail);

// Approve Alumni
router.post('/approve/:id/:alumniType', approveAlumni);

// Delete Alumni by id or email
router.delete('/delete/:id', deleteAlumni);
router.delete('/deleteByEmail/:email', deleteAlumni);

// Update Alumni with file upload handling
router.put('/update/:id', upload.single('profilePic'), updateAlumni); // Use Multer to handle file upload

module.exports = router;
