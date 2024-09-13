const router = require('express').Router();
const multer = require('multer');
const {
  registerAlumni,
  login,
  // logoutAlumni,
  // checkTokenValidity,
  // refreshToken,
} = require('../controllers/authController');
const { validateToken } = require('../middleware/validateToken');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer middleware
const upload = multer({ storage });

// Alumni Registration with profilePic upload
router.post('/register', upload.single('profilePic'), registerAlumni);

// Alumni Login
router.post('/login', login);

// Alumni Logout
// router.post('/logout', validateToken, logoutAlumni);

// // Check Token Validity
// router.get('/check-token-validity', validateToken, checkTokenValidity);

// // Refresh Token
// router.post('/refresh-token', refreshToken);

module.exports = router;
