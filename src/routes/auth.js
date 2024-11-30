const router = require('express').Router();
const multer = require('multer');
const {
  registerAlumni,
  login,
  // logoutAlumni,
  // checkTokenValidity,
  // refreshToken,
  testEmail,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} = require('../controllers/authController');
const { validateToken } = require('../middleware/validateToken');
const { validateEmailRequest } = require('../middleware/validateEmail');
const { emailLimiter, otpLimiter } = require('../middleware/rateLimiter');
const { isAdmin } = require('../middleware/validateRole');

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

// test email
// @route POST /test-email
// @access Public
router.post('/test-email',isAdmin, testEmail);

// forgot password
// @route POST /forgot-password
// @access Public
router.post("/forgot-password",emailLimiter, otpLimiter, validateEmailRequest , forgotPassword);

// verify reset otp
// @route POST /verify-reset-otp
// @access Public
router.post("/verify-reset-otp", emailLimiter, otpLimiter, validateEmailRequest, verifyResetOtp);

// reset password
// @route POST /reset-password
// @access Public
router.post("/reset-password",emailLimiter, otpLimiter, validateEmailRequest, resetPassword); 

module.exports = router;
