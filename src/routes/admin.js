const router = require('express').Router();
const { uploadImage } = require('../controllers/adminController');

// Upload Image on server
router.post('/upload', uploadImage);

module.exports = router;
