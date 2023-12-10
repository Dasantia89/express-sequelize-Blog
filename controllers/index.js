const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeroutes.js');
const dashRoutes = require('./dashboardroutes.js');

router.use('/dashboard', dashRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
