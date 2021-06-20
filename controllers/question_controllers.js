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
            user : req.user.id,
            likes : [],
            dislikes : [],
            comments : [],
        });
        if(typeof req.body.topics == 'string'){
            req.body['topics'] = [req.body.topics];
        }
        for(var i of req.body.topics){
            if(i!='Others'){
                var topic_obj = await Topic.findOne({name : i});
                question_obj.relatedTopics.push(topic_obj);
                topic_obj.questions.push(question_obj);
                topic_obj.save();
            }
        }
        question_obj.save();
        req.flash('success','Question created successfully');
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

module.exports.questionDetails = function(req,res){
    Question.findById(req.query.qid)
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err,question){
        return res.render('question_files/questionDetails',{
            title : 'Question',
            question_obj : question
        });
    });
}

module.exports.addLikes = function(req,res){
    Question.findById(req.query.question_id,function(err,question){
        if(err){ return res.end("Error Occured");  }
        var user_id = req.user.id;
        if(question.likes.includes(user_id)){
            console.log("You already liked");
        }
        else{
            if(question.dislikes.includes(user_id)){
                for(var i=0;i<question.dislikes.length;i++){
                    console.log(question.dislikes[i]);
                    if(question.dislikes[i] == user_id){
                        question.dislikes.splice(i,1);
                        break;
                    }
                }
            }
            question.likes.push(user_id);
            question.save();
        }
        return res.redirect('back');
    })
}

module.exports.addDislikes = function(req,res){
    Question.findById(req.query.question_id,function(err,question){
        if(err){ return res.end("Error Occured");  }
        var user_id = req.user.id;
        if(question.dislikes.includes(user_id)){
            console.log("You already disliked");
        }
        else{
            if(question.likes.includes(user_id)){
                for(var i=0;i<question.likes.length;i++){
                    console.log(question.likes[i]);
                    if(question.likes[i] == user_id){
                        question.likes.splice(i,1);
                        break;
                    }
                }
            }
            question.dislikes.push(user_id);
            question.save();
        } 
        return res.redirect('back');
    });
}