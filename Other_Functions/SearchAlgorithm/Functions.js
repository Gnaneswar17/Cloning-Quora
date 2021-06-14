const kwd = require("keyword-extractor");
const Functions = require("./Functions");
const natural = require("natural");

module.exports.getKeywordList = function(list1){
    var result = [];

    list1.sort(function(a,b){
        return b[2]-a[2];
    })
    
    for(var i=0;i<list1.length;i++){
        if(list1[i][2]!=0)
            result.push(list1[i]);
    }

    return result;
}

module.exports.getKeyword = function(str1) {
    var result =
    kwd.extract(str1,{
        language:"english",
        remove_digits:true,
        return_changed_case:true,
        remove_duplicates: true
    });
    return result;
}

module.exports.getNonKeywords = function(str1){
    var kewords = Functions.getKeyword(str1);
    var result = str1.split(" ");
    
    var i=0;
    while(i<result.length)
    {
        var j=0;
        var flag = 0;
        while(j<kewords.length)
        {
            if(kewords[j]==result[i])
            {
                flag=1;
                result.splice(i,1);
                break;
            }
            else
                j += 1;
        }
        if(flag==0)
            i += 1;
    }

    result = [...new Set(result)];
    return result;
}

module.exports.TokenizeFile = function(str1){
    var tokenizer = new natural.WordTokenizer();
    var tokenizeFile = tokenizer.tokenize(str1);
    str1 = tokenizeFile.join(" ");
    return str1;
}

