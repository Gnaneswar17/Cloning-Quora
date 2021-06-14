const Topic = require("../models/topic");


module.exports.topicForm = async function(req,res){
    return res.render("admin_files/TopicForm",{
        title : "Topic Form",
    });
}
module.exports.addTopic = async function(req,res){
    
    try{
        const topic = await Topic.create({
            name : req.body.topic
        });
        return res.redirect("back");
    }
    catch(err){
        return res.end("Error Occured");
    }
}