const router = require('express').Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getPaginatedEvents,
  getLatestEvents
} = require('../controllers/eventManagementController');

// Get all events without pagination
router.get('/all', getAllEvents);

// Get all events with pagination
router.get('/', getPaginatedEvents);

// Get latest n number of events
router.get('/latest', getLatestEvents);

// Get event by ID
router.get('/:id', getEventById);

// Create a new event
router.post('/', createEvent);

// Update event by ID
router.put('/:id', updateEvent);

// Delete event by ID
router.delete('/:id', deleteEvent);

module.exports = router;
