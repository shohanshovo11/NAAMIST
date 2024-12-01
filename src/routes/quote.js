const router = require('express').Router();
const { getQuotes, addQuote, updateQuote, deleteQuote } = require('../controllers/quoteController');
const { isAdmin } = require('../middleware/validateRole');

// Public route
router.get('/', getQuotes);

// Admin routes
router.post('/', isAdmin, addQuote);
router.put('/:id', isAdmin, updateQuote);
router.delete('/:id', isAdmin, deleteQuote);

module.exports = router; 