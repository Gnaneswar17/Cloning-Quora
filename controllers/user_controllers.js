const User = require("../models/user");
const Otp = require('../models/otp');
const validateSignup = require('../Other_Functions/Helping_Functions/validations/validateSignup');

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

module.exports.register = async function(req,res){

    let users = await User.find({email:req.body.email});
    var is_valid = validateSignup.validateSignup(req,res,users);
    if(! is_valid){
        return res.redirect('back');
    }
    try{
        var user = await User.create({
            fname : req.body.fname,
            lname : req.body.lname,
            DOB : req.body.DOB,
            gender : req.body.gender,
            email : req.body.email,
            password : req.body.password,
            is_verified : false,
            is_selected : false
        });
        var otp1 = await Otp.create({
            user : user._id,
            otp : '0'
        });
        req.flash('success',user.fname + ' '+user.lname + ' registered successfully');
        return res.redirect('/');
    }
    catch(err){
        console.log("<---------------Error Occured ------------>",err);
    }
}

module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/dashboard');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','logged out successfully');
    return res.redirect('/');
}

module.exports.verifyEmail = async function(req,res){
    if(req.user.is_verified == 'true'){
        return res.redirect('/dashboard');
    }
    return res.render("user_files/verifyEmail",{
        title : 'verify Email'
    });
}

module.exports.validateOtp = async function(req,res){
    let otp_obj = await Otp.findOne({user:req.user.id});
    if(req.body.otp == otp_obj.otp){

        let user_obj = await User.findById(req.user.id);
        user_obj.is_verified = true;
        user_obj.save();

        let otp_obj = await Otp.findOne({user:req.user.id});
        otp_obj.otp = '0';
        otp_obj.save();
        return res.redirect('/dashboard');
    }
    else{
        req.flash('error','Wrong OTP');
        return res.redirect('back');
    }
}


module.exports.userDetails = function(req,res){
    if(req.query.user_id == req.user.id){
        return res.redirect('/dashboard/profile');
    }
    User.findById(req.query.user_id,function(err,user){
        return res.render('user_files/userDetails',{
            title : 'User Details',
            user_obj : user
        });
    });
}