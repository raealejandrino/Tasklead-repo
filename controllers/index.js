const router = require('express').Router();

const apiRoutes = require('./api');
const loginRoute = require('./login-route.js');
const dashboardRoutes = require('./dashboard-routes.js');
const projectRoutes = require('./project-routes.js');

router.use('/api', apiRoutes);
router.use('/', loginRoute);
router.use('/dashboard', dashboardRoutes);
router.use('/', projectRoutes);


router.use((req, res) => {
  res.status(404).end();
});



module.exports = router;