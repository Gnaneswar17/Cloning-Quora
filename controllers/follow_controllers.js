const User = require("../models/user")

module.exports.followUser = async function(req,res){
    let user_obj1 = await User.findById(req.query.user_id);
    let user_obj2 = await User.findById(req.user.id);
    if(! user_obj2.following.includes(user_obj1.id)){
        user_obj2.following.push(user_obj1.id);
        user_obj2.save();
    }
    if(! user_obj1.followers.includes(user_obj2.id)){
        user_obj1.followers.push(user_obj2.id);
        user_obj1.save();
    }
    return res.redirect("back");
}

module.exports.UnFollowUser = async function(req,res){
    let user_obj1 = await User.findById(req.query.user_id);
    let user_obj2 = await User.findById(req.user.id);
    if(user_obj2.following.includes(user_obj1.id)){
        for(var i=0;i<user_obj2.following.length;i++){
            if(user_obj2.following[i] == user_obj1.id){
                user_obj2.following.splice(i,1);
                break;
            }
        }
        user_obj2.save();
    }
    if(user_obj1.followers.includes(user_obj2.id)){
        for(var i=0;i<user_obj1.followers.length;i++){
            if(user_obj1.followers[i] == user_obj2.id){
                user_obj1.followers.splice(i,1);
                break;
            }
        }
        user_obj1.save();
    }
    return res.redirect("back");
}

module.exports.showFollowers = function(req,res){
    User.findById(req.query.user_id)
    .populate('followers')
    .exec(function(err,user){
        return res.render("follow_files/showFollowers",{
            title : 'Followers',
            user_obj : user
        });
    });
}

module.exports.showFollowing = function(req,res){
    User.findById(req.query.user_id)
    .populate('following')
    .exec(function(err,user){
        return res.render("follow_files/showFollowing",{
            title : 'Following',
            user_obj : user
        });
    });
}