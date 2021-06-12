const express = require('express');
const router = express.Router();
const dashboardControllers = require('../controllers/dashboard_controllers');
const passport = require('passport');

router.get('/',passport.checkAuthentication,dashboardControllers.MyDashboard);
router.get('/SelectTopics',passport.checkAuthentication,dashboardControllers.SelectTopics);
router.post('/addTopics',dashboardControllers.addTopics);


module.exports = router;