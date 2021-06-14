const stringSimilarity = require("./stringSimilarity");
const Functions = require("./Functions");

module.exports.getSimilarQuestions = function(SearchQuestion,listOfQuestions){
    
    var QandScores=[], QandScores1 = [];
    for(var i=0;i<listOfQuestions.length;i++){
        var Question = listOfQuestions[i].question.toLowerCase();
        Question = Functions.TokenizeFile(Question);
        QandScores.push([listOfQuestions[i],Question]);
        QandScores1.push([listOfQuestions[i],Question]);
        listOfQuestions[i] = Question;
    }

    var SearchQuestion = SearchQuestion.toLowerCase();
    SearchQuestion = Functions.TokenizeFile(SearchQuestion);

    var sqKeywords = Functions.getKeyword(SearchQuestion);

    var score = stringSimilarity.getScores(sqKeywords,listOfQuestions);

    for(var i=0;i<listOfQuestions.length;i++){
        QandScores[i].push(score[i]);
    }

    var KeywordList = Functions.getKeywordList(QandScores);

    var nkwd = Functions.getNonKeywords(SearchQuestion);

    var nkscores = stringSimilarity.getNonKeywordScores(nkwd,listOfQuestions);

    for(var i=0;i<listOfQuestions.length;i++){
        QandScores1[i].push(nkscores[i]);
    }

    var NonKeywordList = Functions.getKeywordList(QandScores1);

    var dict = {};
    var Result = [];
    for(var i=0;i<QandScores.length;i++){
        dict[QandScores[i][0]] = 0;
    }

    for(var i=0;i<KeywordList.length;i++){
        var val = KeywordList[i][0];
        dict[val] = 1;
        Result.push(val);
    }

    for(var i=0;i<NonKeywordList.length;i++){
        var val = NonKeywordList[i][0];
        if(dict[val]==0)
            Result.push(val);
    }

    return Result;

}

