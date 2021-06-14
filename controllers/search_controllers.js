const searchAlgo = require('../Other_Functions/SearchAlgorithm/searchAlgorithm');
const Question = require('../models/question');

module.exports.searchQuestions = async function(req,res){
    var searchQ = req.body.search;
    var QuestionList = await Question.find({}).populate('user');
    var QuestionList = searchAlgo.getSimilarQuestions(searchQ,QuestionList);
    return res.render("search_files/searchResult",{
        title : 'Search Results',
        question_list : QuestionList,
        searchQ : searchQ
    });
}