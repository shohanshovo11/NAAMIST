const rateLimit = require('express-rate-limit');

// Email-specific rate limiter
const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // limit each IP to 5 email requests per hour
  message: {
    success: false,
    message: 'Too many email requests. Please try again after an hour.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// OTP verification limiter
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 verification attempts
  message: {
    success: false,
    message: 'Too many OTP verification attempts. Please try again after 15 minutes.'
  }
});

module.exports = { emailLimiter, otpLimiter }; 