const express = require('express');
const router = express.Router();
const dashboardControllers = require('../controllers/dashboard_controllers');
const passport = require('passport');

router.get('/',passport.checkAuthentication,dashboardControllers.MyDashboard);

module.exports = router;