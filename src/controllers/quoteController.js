const Quote = require('../models/quote');

// Get all active quotes
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({ isActive: true });
    res.status(200).json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Failed to retrieve quotes' });
  }
};

// Add new quote (admin only)
exports.addQuote = async (req, res) => {
  try {
    const { text, author } = req.body;
    const quote = new Quote({ text, author });
    await quote.save();
    res.status(201).json(quote);
  } catch (error) {
    console.error('Error adding quote:', error);
    res.status(500).json({ message: 'Failed to add quote' });
  }
};

// Update quote (admin only)
exports.updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findByIdAndUpdate(id, req.body, { new: true });
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.status(200).json(quote);
  } catch (error) {
    console.error('Error updating quote:', error);
    res.status(500).json({ message: 'Failed to update quote' });
  }
};

// Delete quote (admin only)
exports.deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findByIdAndDelete(id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.status(200).json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({ message: 'Failed to delete quote' });
  }
}; 