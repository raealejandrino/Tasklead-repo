const router = require('express').Router();

const apiRoutes = require('./api');
const loginRoute = require('./login-route.js');
const homeRoutes = require('./home-routes.js');

router.use('/api', apiRoutes);
router.use('/', loginRoute);
router.use('/home', homeRoutes);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;