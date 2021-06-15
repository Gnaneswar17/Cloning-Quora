const Question = require('../models/question');
const PlagFunc = require('../Other_Functions/checkPlagiarism/PlagiarsimDetection');

module.exports.checkPlag = async function(req,res){
    try{
        var Result = [];
        let question_obj = await Question.findById(req.query.question_id)
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            }
        });


        for(var i=1;i<question_obj.comments.length;i++){
            var list1 = [];
            for(var j=i-1;j>=0;j--){
                var file1 = question_obj.comments[i].comment;
                var file2 = question_obj.comments[j].comment;
                var similarity = PlagFunc.checkPlagiarism(file1,file2);

                var user1 = question_obj.comments[i].user.id;
                var user2 = question_obj.comments[j].user.id;
                if(similarity > 0 &&(user1 != user2)){
                    list1.push(
                        [question_obj.comments[j],similarity]
                    );
                }
            }
            if(list1.length > 0 && user1 != req.user.id){
                Result.push([question_obj.comments[i],list1])
            }
        }

        return res.render("plag_files/displayPlag",{
            title : 'Display Plagiarism',
            comment_obj : Result
        });
    }
    catch(err){
        console.log("<-------------Error Occured------------->",err);
        return res.end("Error Occured");
    }
}