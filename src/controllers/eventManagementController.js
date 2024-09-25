const EventManagement = require('../models/eventManagement');

// Get all available events without pagination
exports.getAllEvents = async (req, res) => {
  try {
    const events = await EventManagement.find().sort({ eventDate: -1 }).exec();
    res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching all events:', error);
    res.status(500).json({ message: 'Failed to retrieve all events' });
  }
};

// Get all events with pagination (6 per page)
exports.getPaginatedEvents = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const events = await EventManagement.find()
      .sort({ eventDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await EventManagement.countDocuments();
    res.status(200).json({
      events,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to retrieve events' });
  }
};

// Get the latest n number of events
exports.getLatestEvents = async (req, res) => {
  try {
    const { limit = 4 } = req.query;
    const events = await EventManagement.find()
      .sort({ eventDate: -1 }) // Sort by eventDate in descending order
      .limit(parseInt(limit)) // Limit to n events
      .exec();
    res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching latest events:', error);
    res.status(500).json({ message: 'Failed to retrieve latest events' });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await EventManagement.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ message: 'Failed to retrieve event' });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const newEvent = new EventManagement(req.body);
    console.log(newEvent, 'shovo');
    const savedEvent = await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', savedEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Failed to create event' });
  }
};

// Update event by ID
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await EventManagement.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event updated successfully', updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Failed to update event' });
  }
};

// Delete event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await EventManagement.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
};
