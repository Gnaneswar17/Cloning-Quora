const express = require('express');
const router = express.Router();
const commentControllers = require('../controllers/comment_controllers');
const passport = require('passport');

router.post('/addComment',passport.checkAuthentication,commentControllers.addComment);
router.get('/MyComments',passport.checkAuthentication,commentControllers.MyComments);


module.exports = router;