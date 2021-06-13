const express = require('express');
const router = express.Router();
const dashboardControllers = require('../controllers/dashboard_controllers');
const passport = require('passport');

router.get('/',passport.checkAuthentication,dashboardControllers.MyDashboard);
router.get('/SelectTopics',passport.checkAuthentication,dashboardControllers.SelectTopics);
router.post('/addTopics',passport.checkAuthentication,dashboardControllers.addTopics);
router.get('/profile',passport.checkAuthentication,dashboardControllers.DisplayProfile);
router.get('/following',passport.checkAuthentication,dashboardControllers.following);



module.exports = router;