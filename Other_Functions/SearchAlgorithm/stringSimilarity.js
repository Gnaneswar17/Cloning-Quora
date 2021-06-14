const stringSimilarity = require("string-similarity");
const strSim = require("./stringSimilarity");
const Functions = require("./Functions");

module.exports.FindScore = function(list1,list2){
    var score = 0;

    for(var i=0;i<list1.length;i++){
        for(var j=0;j<list2.length;j++){
            score += stringSimilarity.compareTwoStrings(list1[i],list2[j]);
        }
    }
    return score;
}

module.exports.getScores = function(sqKeywords,listOfQuestions) {

    var score = [];
    for(var i=0;i<listOfQuestions.length;i++){
        score.push(0);
    }

    for(var i=0;i<listOfQuestions.length;i++){

        var curKeywords = Functions.getKeyword(listOfQuestions[i]);
    
        score[i] = strSim.FindScore(sqKeywords,curKeywords);
    }
    return score;
}

module.exports.getNonKeywordScores = function(nkwd,listOfQuestions) {

    var score = [];
    for(var i=0;i<listOfQuestions.length;i++){
        score.push(0);
    }

    for(var i=0;i<listOfQuestions.length;i++){

        var curKeywords = Functions.getNonKeywords(listOfQuestions[i]);
    
        score[i] = strSim.FindScore(nkwd,curKeywords);
    }
    return score;
}
