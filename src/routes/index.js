const router = require('express').Router();

const authRoute = require('./auth');
const alumniRoute = require('./alumni');
const adminRoute = require('./admin');
const eventRoute = require('./eventManagement');
const announcementRoute = require('./announcement');
const contactRoutes = require('./contactRoutes');

// const adminController = require('../controllers/adminController');

// const alumniController = require('../controllers/alumniController');

router.use('/auth', authRoute);
router.use('/alumni', alumniRoute);
router.use('/admin', adminRoute);
router.use('/event', eventRoute);
router.use('/announcements', announcementRoute);
router.use('/contact', contactRoutes);

// router.use("/admin", adminController);

// router.use("/alumni", alumniController);

module.exports = router;
