const Comment = require("../models/comment");
const Question = require('../models/question');

module.exports.addComment = async function(req,res){
    let comment_obj = await Comment.create({
        comment : req.body.comment,
        user : req.user.id,
        question : req.query.question_id
    });
    let question_obj = await Question.findById(req.query.question_id);
    question_obj.comments.push(comment_obj);
    question_obj.save();
    return res.redirect('back');
}