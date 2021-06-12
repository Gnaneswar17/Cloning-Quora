const sendEmail = require('../config/send-email');
const topList = require('../data_files/topics');
const User = require('../models/user');
const Topic = require('../models/topic');

module.exports.MyDashboard = function(req,res){
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
            return res.render("dashboard_files/dashboard",{
                title : 'MyDashboard'
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

module.exports.SelectTopics = function(req,res){
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
            user.save();
        }
        user.is_selected = true;
        user.save();
        return res.redirect('/dashboard');
    }
    catch(err){
        console.log("<------------Error ocuured-------------->",err);
    }
}