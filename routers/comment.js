const express = require('express');
const router = express.Router();
const commentControllers = require('../controllers/comment_controllers');
const passport = require('passport');

router.post('/addComment',passport.checkAuthentication,commentControllers.addComment);


module.exports = router;