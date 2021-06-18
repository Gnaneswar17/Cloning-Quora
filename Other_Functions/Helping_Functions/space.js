module.exports.getPopularSpaces = function(arr){
    arr.sort(function(a,b){
        return b.followers.length - a.followers.length;
    });
    return arr;
}