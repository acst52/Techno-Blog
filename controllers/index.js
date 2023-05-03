const router = require('express').Router();

const apiRoutes = require('./api'); // removed the `/` after api, just to see - sometimes tiny things make bugs!
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;