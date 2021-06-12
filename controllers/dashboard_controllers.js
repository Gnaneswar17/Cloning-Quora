const sendEmail = require('../config/send-email');

module.exports.MyDashboard = function(req,res){
    if(req.user.is_verified == 'false'){
        var x = false;
    }
    else{
        var x = true;
    }
    if(x){
        
        return res.render("dashboard_files/dashboard",{
            title : 'MyDashboard'
        });
    }
    else{
        sendEmail.sendEmail(req.user);
        return res.redirect('/user/verifyEmail');
    }
}