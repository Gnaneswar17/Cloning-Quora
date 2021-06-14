const express = require('express');
const router = express.Router();
const searchControllers = require('../controllers/search_controllers');
const passport = require('passport');

router.post('/searchQuestions',passport.checkAuthentication,searchControllers.searchQuestions);

module.exports = router;