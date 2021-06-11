const User = require("../models/user");

module.exports.login = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/dashboard');
    }
    return res.render("user_files/login",{
        title : 'Login Page'
    });
}

module.exports.signup_form = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/dashboard');
    }
    return res.render("user_files/signup",{
        title : 'SignUp Page'
    });
}

module.exports.register = function(req,res){
    User.create({
        fname : req.body.fname,
        lname : req.body.lname,
        DOB : req.body.DOB,
        gender : req.body.gender,
        email : req.body.email,
        password : req.body.password
    });
    return res.redirect('/');
}

module.exports.createSession = function(req,res){
    return res.redirect('/dashboard');
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}