const Topic = require("../models/topic");
const topList = require('../data_files/topics');


module.exports.topicForm = async function(req,res){
    return res.render("admin_files/TopicForm",{
        title : "Topic Form",
    });
}
module.exports.addTopic = async function(req,res){
    
    const topic = await Topic.create({
        name : req.body.topic
    });
    return res.redirect("back");
}