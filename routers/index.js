const express = require('express');
const router = express.Router();
const user_controllers = require('../controllers/user_controllers');

router.get('/',user_controllers.login);

router.use('/user',require('./user'));
router.use('/dashboard',require('./dashboard'));
router.use('/admin',require('./admin'));
router.use('/question',require('./question'));
router.use('/search',require('./search'));

module.exports = router;