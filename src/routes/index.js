const router = require('express').Router();

const authRoute = require('./auth');
// const adminController = require('../controllers/adminController');
// const alumniController = require('../controllers/alumniController');

router.use('/auth', authRoute);
// router.use("/admin", adminController);
// router.use("/alumni", alumniController);

module.exports = router;
