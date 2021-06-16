module.exports.sortQuestions = function(result){
    var arr = [];
    for(var i in result){
        arr.push([result[i][0],result[i][1]]);
    }
    arr.sort(function(a,b){
        return (new Date(b[0].createdAt))-(new Date(a[0].createdAt));
    })
    return arr;
}