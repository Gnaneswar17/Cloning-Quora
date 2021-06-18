const express = require('express');
const router = express.Router();
const spaceControllers = require('../controllers/space_controllers');
const passport = require('passport');

router.get('/spaceForm',passport.checkAuthentication,spaceControllers.spaceForm);
router.post('/createSpace',passport.checkAuthentication,spaceControllers.createSpace);
router.get('/MySpaces',passport.checkAuthentication,spaceControllers.MySpaces);
router.get('/spaceDetails',passport.checkAuthentication,spaceControllers.spaceDetails);
router.get('/popularSpaces',passport.checkAuthentication,spaceControllers.popularSpaces);
router.get('/followSpace',passport.checkAuthentication,spaceControllers.followSpace);
router.get('/UnfollowSpace',passport.checkAuthentication,spaceControllers.UnfollowSpace);
router.get('/followingSpaces',passport.checkAuthentication,spaceControllers.followingSpaces);
router.get('/questionForm',passport.checkAuthentication,spaceControllers.questionForm);
router.post('/addQuestion',passport.checkAuthentication,spaceControllers.addQuestion);
router.get('/followers',passport.checkAuthentication,spaceControllers.followers);

module.exports = router;