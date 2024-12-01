const router = require('express').Router();
const { getAllSlides, addSlide, deleteSlide, updateSlide } = require('../controllers/heroSliderController');
const upload = require('../middleware/uploadSlider');
const { isAdmin } = require('../middleware/validateRole');

router.get('/', getAllSlides);
router.post('/', isAdmin, upload.single('sliderImage'), addSlide);
router.delete('/:id', isAdmin, deleteSlide);
router.put('/:id', isAdmin, upload.single('sliderImage'), updateSlide);

module.exports = router; 