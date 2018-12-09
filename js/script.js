function union(setA, setB) {
    var _union = new Set(setA);
    for (var elem of setB) {
        _union.add(elem);
    }
    return _union;
};
//My Own built-in Functions
function cutter(i1, i2,word) {
        let result = ""
        if (i2 - i1 !== 1 ) {
            result = word.slice(i1+1,i2);
        };
        return result;
    };//returns substring from the word using indexes i1 and i2 without including them
function isOpChar(a,b) {
    if (a.toLowerCase() === b.toLowerCase()){
        if (a.toLowerCase() == a) {
            return b.toUpperCase() === b;
        } else if (a.toUpperCase() === a) {
            return b.toLowerCase() === b;
        } else {
            return false;
        };
    } else {return false;};
};//Check are the letters a and b opposite or not
function opWord(word) {
	let result = "";
	for (let char_idx = word.length - 1; char_idx >= 0; char_idx--) {
		let char = word.charAt(char_idx);
		if (char === char.toUpperCase()) {
			result += char.toLowerCase();
		} else {
			result += char.toUpperCase();
		};
	};
	return result;
};//Makes an opposite word from the word
function red(word){
    let out = "";
    function innerRed(word,i){
        if (i >= word.length-1){
            out = word;
        } else {
            if (isOpChar(word.charAt(i),word.charAt(i+1))){
                if (i !== 0) {
                    innerRed(word.slice(0,i)+word.slice(i+2,word.length),i-1)
                } else {
                    innerRed(word.slice(0,i)+word.slice(i+2,word.length),i)
                };
            } else {
                innerRed(word, i+1);
            };
        };
    };
    innerRed(word,0);
    if (out !== ""){
        return out;
    } else {
        return ""
    };
};//Applies reduction on the word
function fialkDecompose(word){
    let result = new Set(null);
    if (word.length < 4) {
        result.add("1");
    } else {
        for (let a1_id = 0; a1_id <= word.length - 4; a1_id++) {
            for (let b1_id = a1_id+1; b1_id <= word.length - 3; b1_id++) {
                for (let a2_id = b1_id+1; a2_id <= word.length - 2; a2_id++) {
                    for (let b2_id = a2_id+1; b2_id <= word.length - 1; b2_id++) {
                        if (isOpChar(word[a1_id],word[a2_id]) && isOpChar(word[b1_id],word[b2_id])) {
                            let w1 = cutter(-1,a1_id,word);
                            let w2 = cutter(a1_id,b1_id,word);
                            let w3 = cutter(b1_id,a2_id,word);
                            let w4 = cutter(a2_id,b2_id,word);
                            let w5 = cutter(b2_id,word.length,word);
                            result.add(red(w1+w4+w3+w2+w5));
                        };
                    };
                };
            };
        };
    };
    return result;
};//Make a set of words of w1w4w3w2w5 type from the word
function massFialkDecompose(set){
    let result = new Set(null);
    set.forEach(word => result = union(result,(fialkDecompose(word))));
    return result;
};//Make a set of words of w1w4w3w2w5 type from each word from the set of words
function cl(word){
    let i = 1;
    let set = fialkDecompose(word);
    while (!set.has("1")){
        set = massFialkDecompose(set);
        i++;
    };
    return i;
};//Calculates commutator length of the word using two previous functions and calculating iterations
function fialkDecomposition(word){
    let result = new Set(null);
    let separator = word.indexOf(":");
    let tail = "";
    let head = "";
    if (separator === -1){
        tail = "";
        head = word;
    } else if (separator + 1 === word.length){
        tail = word;
        head = "";
    } else {
        tail = word.slice(0,separator);
        head = word.slice(separator+1,word.length);
    };
    if (head === "") {
    result.add(tail);
    } else {
        for (let a1_id = 0; a1_id <= head.length - 4; a1_id++) {
            for (let b1_id = a1_id+1; b1_id <= head.length - 3; b1_id++) {
                for (let a2_id = b1_id+1; a2_id <= head.length - 2; a2_id++) {
                    for (let b2_id = a2_id+1; b2_id <= head.length - 1; b2_id++) {
                        if (isOpChar(head[a1_id],head[a2_id]) && isOpChar(head[b1_id],head[b2_id])) {
                            let a = head[a1_id];
                            let b = head[b1_id];
                            let w1 = cutter(-1,a1_id,head);
                            let w2 = cutter(a1_id,b1_id,head);
                            let w3 = cutter(b1_id,a2_id,head);
                            let w4 = cutter(a2_id,b2_id,head);
                            let w5 = cutter(b2_id,head.length,head);
                            result.add(tail+"["+red(w1+w4+w3+a+opWord(w1))+","+red(w1+w4+b+opWord(w2)+opWord(w3)+opWord(w4)+opWord(w1))+"]:"+red(w1+w4+w3+w2+w5));
                        };
                    };
                };
            };
        };
    };
    return result;
};// any word -> set of []:w1w4w3w2w5
function massFialkDecomposition(set){
    let result = new Set(null);
    set.forEach(word => result = union(result,(fialkDecomposition(word))));
    return result;
};
function cDecomposition(word){
    let set = fialkDecomposition(word);
    result = "-1";
    /*while (result === "-1") {*/
    for (let i = 1; i < 2; i++){
        set = massFialkDecomposition(set);
        function f(word){
            if (word.indexOf(":") === (word.length - 1)) {
                if (result === "-1") {
                    result = word.slice(0,word.length-1);
                };
            };
        };
        set.forEach(word => f(word));
    };
    return result;
};//Presents the word as composition of commutators
//My Own in-html-used Functions
function wordCheckFunction() {
    let wordCheckIn = document.getElementById("wordCheckInput_id");
    let wordCheckOut = document.getElementById("wordCheckOutput_id");
    function innerFunc() {
        let wdChInCopy = wordCheckIn.value;
        let countLcl = 0;
        let countUcl = 0;
        while (wdChInCopy.length !== 0) {
            let lower_case_l = wdChInCopy[0].toLowerCase();
            let upper_case_l = wdChInCopy[0].toUpperCase();
            let arr1 = "";
            for (let id = 0; id < wdChInCopy.length; id++){
                let x = wdChInCopy.charAt(id);
                if (x === lower_case_l || x === upper_case_l){arr1 += x};
            };
            countLcl = 0;
            countUcl = 0;
            for (let i = arr1.length; i >= 0; i--) {
                if (arr1[i-1] === lower_case_l) {countLcl += 1;}
                if (arr1[i-1] === upper_case_l) {countUcl += 1;}
            };
            if (countLcl != countUcl) {return false;};
            let wdChInCopy1 = "";
            for (let id = 0; id < wdChInCopy.length; id++){
                let x = wdChInCopy.charAt(id);
                if (x != lower_case_l && x != upper_case_l){wdChInCopy1 += x};
            };
            wdChInCopy = wdChInCopy1;
        };
        return true;
    };
    if (innerFunc() === true){
        wordCheckOut.innerHTML = "In commutator";
    } else {
        wordCheckOut.innerHTML = "Not in commutator";
    };
};//
function wordRedFunction(){
    let wordRedIn = document.getElementById("wordRedInput_id");
    let wordRedOut = document.getElementById("wordRedOutput_id");
    let in_value = wordRedIn.value;
    let out_value = red(in_value);
    wordRedOut.innerHTML = out_value;
};//Applies reduction on the word
function fialkDecomposeFunction() {
    let fialkDecomposeFunctionIn = document.getElementById("fialkDecomposeFunctionIn_id");
    let fialkDecomposeFunctionOut = document.getElementById("fialkDecomposeFunctionOut_id");
    let in_value = fialkDecomposeFunctionIn.value;
    let out_value = "";
    if (in_value.length < 4) {
        out_value = "bad word";
    };
    for (let a1_id = 0; a1_id <= in_value.length - 4; a1_id++) {
        for (let b1_id = a1_id+1; b1_id <= in_value.length - 3; b1_id++) {
            for (let a2_id = b1_id+1; a2_id <= in_value.length - 2; a2_id++) {
                for (let b2_id = a2_id+1; b2_id <= in_value.length - 1; b2_id++) {
                    if (isOpChar(in_value[a1_id],in_value[a2_id]) && isOpChar(in_value[b1_id],in_value[b2_id])) {
                        let w1 = cutter(-1,a1_id,in_value);
                        let w2 = cutter(a1_id,b1_id,in_value);
                        let w3 = cutter(b1_id,a2_id,in_value);
                        let w4 = cutter(a2_id,b2_id,in_value);
                        let w5 = cutter(b2_id,in_value.length,in_value);
                        let newbie = w1+"("+in_value[a1_id]+")"+w2+"("+in_value[b1_id]+")"+w3+"("+in_value[a2_id]+")"+w4+"("+ in_value[b2_id]+")"+w5;
                        out_value = out_value + newbie + "&#8194;&#8658;&#8194;" + red(w1+w4+w3+w2+w5) + "<br>";
                    };
                };
            };
        };
    };
    fialkDecomposeFunctionOut.innerHTML = out_value;
};//
function clFunction(){
    let clFunctionIn = document.getElementById("clFunctionIn_id");
    let clFunctionOut = document.getElementById("clFunctionOut_id");
    let in_value = clFunctionIn.value;
    let out_value = new String(cl(in_value));
    clFunctionOut.innerHTML = "cl(" + in_value + ")=" + out_value;
};//Calculates commutator length of the word
function fialkDecompositionFunction(){
    let fialkDecompositionFunctionIn = document.getElementById("fialkDecompositionIn_id");
    let fialkDecompositionFunctionOut = document.getElementById("fialkDecompositionOut_id");
    let in_value = fialkDecompositionFunctionIn.value;
    let out_value = cDecomposition(in_value);
    fialkDecompositionFunctionOut.innerHTML = in_value + "&#8194;&#8658;&#8194;" + out_value;
};//