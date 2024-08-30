const router = require('express').Router();
const {
  registerAlumni,
  login,
  logoutAlumni,
  checkTokenValidity,
  refreshToken,
} = require('../controllers/authController');
const { validateToken } = require('../middleware/validateToken');

// Alumni Registration
router.post('/register', registerAlumni);

// Alumni Login
router.post('/login', login);

// Alumni Logout
router.post('/logout', validateToken, logoutAlumni);

// Check Token Validity
router.get('/check-token-validity', validateToken, checkTokenValidity);

// Refresh Token
router.post('/refresh-token', refreshToken);

// Admin

module.exports = router;
