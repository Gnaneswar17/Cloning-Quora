const express = require('express');
const router = express.Router();
const plagControllers = require('../controllers/plagiarism_controllers');
const passport = require('passport');

router.get('/checkPlag',passport.checkAuthentication,plagControllers.checkPlag);

module.exports = router;