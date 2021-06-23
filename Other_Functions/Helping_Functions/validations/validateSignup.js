const User = require('../../../models/user');

module.exports.validateSignup = function(req,res,users){
    if(req.body.password != req.body['confirm-password']){
        req.flash('error','Password and Confirm-Password are not matching');
        return false;
    }
    console.log(users);
    if(users.length > 0){
        req.flash('error','User already exist');
        return false;
    }
    return true;
}


