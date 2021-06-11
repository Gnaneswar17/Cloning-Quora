const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user_controllers');
const passport = require('passport');

router.get('/signup',userControllers.signup_form);
router.post('/register',userControllers.register);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/'}
),userControllers.createSession);

router.get('/signout',userControllers.destroySession);

module.exports = router;