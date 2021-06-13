const express = require('express');
const router = express.Router();
const questionControllers = require("../controllers/question_controllers");
const passport = require('passport');

router.get('/questionForm',passport.checkAuthentication,questionControllers.QuestionForm);
router.post('/addQuestion',passport.checkAuthentication,questionControllers.addQuestion);
router.get('/MyQuestions',passport.checkAuthentication,questionControllers.MyQuestions);



module.exports = router;