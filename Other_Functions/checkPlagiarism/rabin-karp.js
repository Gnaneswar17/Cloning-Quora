function areEqual(S1, S2) {
	if (S1 !== S2) {
		return false
	}
	for (i = 0; i < S1.length; i++) {
		if (S1[i] !== S2[i]) {
			return false
		}
	}
	return true
}

function polyHash(S, p, x) {
	var hash = 0
	for (i = 0; i <= S.length - 1; i++) {
		hash = (hash * x + S.charCodeAt(i)) % p
	}
	return hash
}

function rabinKarp(T,P){
	var p = 1019
	x = 34
	var count = 0
	pHash = polyHash(P,p,x)
    var text
	var tHash

	// Loop through text
	for (k = 0; k <= (T.length - P.length); k++) {
		text = T.slice(k, (k + P.length))

		tHash = polyHash(text,p,x)

		// If hashes don't match, continue to next loop
		if (pHash !== tHash) {
			continue
		}

		// If hashes do match, push locations to positions list
		if (areEqual(text,P)) {
			count += 1
		}
	}
	return count;
}

module.exports.DetectPlag = function(document1,document2){

    if(document1.length < document2.length)
    {
        var temp = document1;
        document1 = document2;
        document2 = temp;
    }
    var matches = 0;
    var doc1 = document1.join(' ');
    //console.log(rabinKarp.rabinKarp('magicword Lorem ipsum dolor sit magicword','magicword').length);
    for(var i in document2)
    {
        var count = rabinKarp(doc1, document2[i]); 
        if(count>0)
        matches += 1;
    }
    var plag = (2*matches)/(document1.length+document2.length);
    return plag*100;
};