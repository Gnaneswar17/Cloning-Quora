module.exports.MyDashboard = function(req,res){
    return res.render("dashboard_files/dashboard",{
        title : 'MyDashboard'
    });
}