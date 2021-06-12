const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin_controllers');
const passport = require('passport');

router.get('/topicForm',passport.checkAuthentication,adminControllers.topicForm);
router.post('/addTopic',passport.checkAuthentication,adminControllers.addTopic);

module.exports = router;