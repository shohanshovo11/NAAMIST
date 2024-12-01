const HeroSlider = require('../models/heroSlider');
const fs = require('fs');
const path = require('path');

exports.getAllSlides = async (req, res) => {
  try {
    const slides = await HeroSlider.find().sort('order');
    res.status(200).json(slides);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slides', error });
  }
};

exports.addSlide = async (req, res) => {
  try {
    const { title, description, order } = req.body;
    
    // Check if file exists in request
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const image = req.file.filename;
    console.log('Received file:', req.file); // Debug log

    const slide = new HeroSlider({
      sliderImage: image,
      title,
      description,
      order: order || 0
    });

    await slide.save();
    res.status(201).json(slide);
  } catch (error) {
    console.error('Error adding slide:', error); // Debug log
    res.status(500).json({ message: 'Error adding slide', error: error.message });
  }
};

exports.deleteSlide = async (req, res) => {
  try {
    const slide = await HeroSlider.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    // Delete image file
    const imagePath = path.join(__dirname, '../../images/slider', slide.sliderImage);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await slide.deleteOne();
    res.status(200).json({ message: 'Slide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting slide', error });
  }
};

exports.updateSlide = async (req, res) => {
  try {
    const { title, description, order, isActive } = req.body;
    const slide = await HeroSlider.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    // Handle image update if new file is uploaded
    if (req.file) {
      // Delete old image if it exists
      const oldImagePath = path.join(__dirname, '../../images/slider', slide.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      slide.image = req.file.filename;
    }

    // Update other fields if provided
    if (title) slide.title = title;
    if (description) slide.description = description;
    if (order !== undefined) slide.order = order;
    if (isActive !== undefined) slide.isActive = isActive;

    await slide.save();
    res.status(200).json(slide);
  } catch (error) {
    console.error('Error updating slide:', error); // Debug log
    res.status(500).json({ message: 'Error updating slide', error: error.message });
  }
}; 