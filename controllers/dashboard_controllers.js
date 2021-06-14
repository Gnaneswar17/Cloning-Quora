const sendEmail = require('../config/send-email');
const User = require('../models/user');
const Topic = require('../models/topic');
const Question = require('../models/question');
const otherFunctions = require('../Other_Functions/dashboard_questions');

module.exports.MyDashboard = async function(req,res){
    try{
        if(req.user.is_verified == 'false'){
            var x = false;
        }
        else{
            var x = true;
        }
        if(x){
            
            if(req.user.is_selected == 'false'){
                var y = false;
            }
            else{
                var y = true;
            }
            if(y){
                let user_obj = await User.findById(req.user.id);
                var result = [];
                for(var i of user_obj.topics){
                    var topic_obj = await Topic.findById(i);
                    for(var j of topic_obj.questions){
                        var question_obj = await Question.findById(j);
                        if(question_obj == null){
                            continue;
                        }
                        var user_obj1 = await User.findById(question_obj.user);
                        if((question_obj.id in result) || (req.user.id == user_obj1.id)){
                            continue;
                        }
                        result[question_obj.id] = [question_obj,user_obj1]; 
                    }
                }
                return res.render("dashboard_files/dashboard",{
                    title : 'MyDashboard',
                    user_obj : result
                });
            }
            else{
                return res.redirect('/dashboard/SelectTopics');
            }
        }
        else{
            sendEmail.sendEmail(req.user);
            return res.redirect('/user/verifyEmail');
        }
    }
    catch(err){
        console.log("<-----------------Error Occured------------------->",err);
        return res.end("Error Occured");
    }
}

module.exports.SelectTopics = async function(req,res){
    if(req.user.is_selected == 'true'){
        return res.redirect('/dashboard');
    }
    let topList = await Topic.find({});
    return res.render('dashboard_files/SelectTopics',{
        title : "Select Topics",
        topicList : topList
    });
}

module.exports.addTopics = async function(req,res){
    try{
        const user = await User.findById(req.user.id);
        for(var i in req.body){
            const topic_id = await Topic.findOne({name:i});
            user.topics.push(topic_id);
        }
        user.is_selected = true;
        user.save();
        return res.redirect('/dashboard');
    }
    catch(err){
        console.log("<------------Error ocuured-------------->",err);
    }
}

module.exports.DisplayProfile = function(req,res){
    return res.render("dashboard_files/MyProfile",{
        title : "MyProfile"
    });
}

module.exports.following = function(req,res){
    User.findById(req.user.id)
    .populate('topics')
    .exec(function(err,user){
        return res.render('dashboard_files/following',{
            title : 'Following',
            user_list : user
        });
    });
}