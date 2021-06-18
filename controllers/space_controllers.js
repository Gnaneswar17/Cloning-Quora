const Space = require('../models/space');
const Question = require('../models/question');
const HelpingFunc = require('../Other_Functions/Helping_Functions/space');

module.exports.spaceForm = function(req,res){
    return res.render('space_files/spaceForm',{
        title : 'Space Creation Form'
    });
}

module.exports.createSpace = function(req,res){
    Space.create({
        name : req.body.space,
        followers : [],
        questions : [],
        admin : req.user.id,
        desc : req.body.desc
    },
    function(err,user){
        return res.redirect('/space/MySpaces');
    });
}

module.exports.MySpaces = function(req,res){
    Space.find({admin:req.user.id},function(err,mySpaces){
        return res.render('space_files/MySpaces',{
            title : 'My Spaces',
            MySpaces : mySpaces
        });
    });
}

module.exports.spaceDetails = function(req,res){
    Space.findById(req.query.space_id)
    .populate('admin')
    .populate({
        path : 'questions',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err,space){
        return res.render('space_files/spaceDetails',{
            title : space.name,
            space_obj : space
        });
    });
}

module.exports.popularSpaces = async function(req,res){
    const spaces = await Space.find({});
    let result = HelpingFunc.getPopularSpaces(spaces);
    return res.render('space_files/MySpaces',{
        title : 'Popular Spaces',
        MySpaces : result
    });
}

module.exports.followSpace = async function(req,res){
    let space = await Space.findById(req.query.space_id);
    if(! space.followers.includes(req.user.id)){
        space.followers.push(req.user.id);
        space.save();
    }
    return res.redirect('back');
}

module.exports.UnfollowSpace = async function(req,res){
    let space = await Space.findById(req.query.space_id);
    if(space.followers.includes(req.user.id)){
        for(var i=0;i<space.followers.length;i++){
            if(space.followers[i]==req.user.id){
                space.followers.splice(i,1);
                break;
            }
        }
        space.save();
    }
    return res.redirect('back');
}

module.exports.followingSpaces = async function(req,res){
    var result = [];
    var spaces = await Space.find({});
    for(var i=0;i<spaces.length;i++){
        if(spaces[i].followers.includes(req.user.id)){
            result.push(spaces[i]);
        }
    }
    return res.render('space_files/MySpaces',{
        title : 'Following Spaces',
        MySpaces : result
    });
}

module.exports.questionForm = function(req,res){
    return res.render('space_files/questionForm',{
        title : 'Question Form',
        space_id : req.query.space_id
    });
}

module.exports.addQuestion = async function(req,res){
    var space = await Space.findById(req.body.space_id);
    const question_obj = await Question.create({
        question : req.body.question,
        relatedTopics : [],
        user : req.user.id,
        likes : [],
        dislikes : [],
        comments : [],
    });
    space.questions.push(question_obj);
    space.save();
    return res.redirect('/space/spaceDetails/?space_id='+req.body.space_id);
}

module.exports.followers = function(req,res){
    Space.findById(req.query.space_id)
    .populate('followers')
    .exec(function(err,space){
        return res.render('follow_files/showFollowers',{
            title : 'Followers',
            user_obj : space
        });
    });
}