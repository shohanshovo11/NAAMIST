const express = require('express');
const { submitContactForm } = require('../controllers/contactController');
const { validateContactForm } = require('../middleware/validateContact');
const { emailLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/submit', emailLimiter, validateContactForm, submitContactForm);

module.exports = router; 