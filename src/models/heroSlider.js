const mongoose = require('mongoose');

const heroSliderSchema = new mongoose.Schema({
  sliderImage: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const HeroSlider = mongoose.model('HeroSlider', heroSliderSchema);

module.exports = HeroSlider; 