const Topic = require('../models/topic');
const Question = require('../models/question');

module.exports.QuestionForm = async function(req,res){
    const topics = await Topic.find({});
    return res.render('question_files/questionForm',{
        title : 'Question Form',
        QList : topics
    });
}

module.exports.addQuestion = async function(req,res){
    try{

        const question_obj = await Question.create({
            question : req.body.question,
            relatedTopics : [],
            user : req.user.id
        });
        
        for(var i of req.body.topics){
            if(i!='Others'){
                var topic_obj = await Topic.findOne({name : i});
                question_obj.relatedTopics.push(topic_obj);
                topic_obj.questions.push(question_obj);
                topic_obj.save();
            }
        }
        question_obj.save();

        return res.redirect("/dashboard");
    }
    catch(err){
        console.log("<--------Error Ocuured--------->",err);
        return ;
    }
}

module.exports.MyQuestions = async function(req,res){
    let qlist = await Question.find({user : req.user});
    return res.render("question_files/MyQuestions",{
        title : 'MyQuestions',
        QList : qlist
    });
}