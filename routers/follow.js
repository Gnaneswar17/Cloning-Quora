const express = require('express');
const router = express.Router();
const followControllers = require('../controllers/follow_controllers');
const passport = require('passport');

router.get('/followUser',passport.checkAuthentication,followControllers.followUser);
router.get('/UnFollowUser',passport.checkAuthentication,followControllers.UnFollowUser);
router.get('/showFollowers',passport.checkAuthentication,followControllers.showFollowers);
router.get('/showFollowing',passport.checkAuthentication,followControllers.showFollowing);

module.exports = router;