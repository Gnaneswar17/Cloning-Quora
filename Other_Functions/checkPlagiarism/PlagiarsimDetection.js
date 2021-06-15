const natural = require("natural");
const sw = require("stopword");
const rabinKarp = require("./rabin-karp");


module.exports.checkPlagiarism = function(file1,file2){
    // Rabin-Karp Algorithm
    // Tokenizing
    var tokenizer = new natural.WordTokenizer();
    var tokenfile1 = tokenizer.tokenize(file1);
    //console.log(tokenfile1);
    var tokenizer = new natural.WordTokenizer();
    var tokenfile2 = tokenizer.tokenize(file2);

    // stemming
    var stemFile1=[];
    for(var i=0;i<tokenfile1.length;i++)
    {
        stemFile1.push(natural.PorterStemmer.stem(tokenfile1[i]));
    }
    //console.log(stemFile1);
    var afterStem1 = sw.removeStopwords(stemFile1);

    var stemFile2=[];
    for(var i=0;i<tokenfile2.length;i++)
    {
        stemFile2.push(natural.PorterStemmer.stem(tokenfile2[i]));
    }
    //console.log(stemFile1);
    var afterStem2 = sw.removeStopwords(stemFile2);

    return rabinKarp.DetectPlag(afterStem1,afterStem2);
}