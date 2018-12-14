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
function doesWordBelongToCommutator(word){
    let wdChInCopy = word;
    let countLcl = 0;
    let countUcl = 0;
    let flag = true;
    while (word.length !== 0) {
        let lCL = word[0].toLowerCase();
        let uCL = word[0].toUpperCase();
        let filteredWord = "";
        for (let i = 0; i < word.length; i++){
            let x = word.charAt(i);
            if (x === lCL || x === uCL){filteredWord += x};
        };
        lCLCounter = 0;
        uCLCounter = 0;
        for (let i = 0 ; i < filteredWord.length; i++) {
            if (arr1[i] === lCL) {lCLCounter += 1;}
            if (arr1[i] === uCL) {uCLCounter += 1;}
        };
        if (lCLCounter != uLCCounter) {flag = false;};
        let newWord = "";
        for (let id = 0; id < word.length; id++){
            let x = word.charAt(id);
            if (x !== lCL && x !== uCL){word1 += x};
        };
        word = newWord;
    };
    if (flag){
        wordCheckOut.innerHTML = "In commutator";
    } else {
        wordCheckOut.innerHTML = "Not in commutator";
    };
};//Check if the word belongs to commutator
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
    return out;
};//Applies reduction on the word
function oneFialkShorten(word){
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
function cl(word){
    let i = 1;
    let set = oneFialkShorten(word);
    while (!set.has("")){
        let result = new Set(null);
        set.forEach(word => result = union(result,(oneFialkShorten(word))));
        set = result;
        i++;
    };
    return i;
};//Calculates commutator length of the word using previous function
function fialkDecomposition(word){
    let result = new Set(null);
    if (word !== "") {
        for (let a1_id = 0; a1_id <= word.length - 4; a1_id++) {
            for (let b1_id = a1_id+1; b1_id <= word.length - 3; b1_id++) {
                for (let a2_id = b1_id+1; a2_id <= word.length - 2; a2_id++) {
                    for (let b2_id = a2_id+1; b2_id <= word.length - 1; b2_id++) {
                        if (isOpChar(word[a1_id],word[a2_id]) && isOpChar(word[b1_id],word[b2_id])) {
                            let a = word[a1_id];
                            let b = word[b1_id];
                            let w1 = cutter(-1,a1_id,word);
                            let w2 = cutter(a1_id,b1_id,word);
                            let w3 = cutter(b1_id,a2_id,word);
                            let w4 = cutter(a2_id,b2_id,word);
                            let w5 = cutter(b2_id,word.length,word);
                            result.add({
                                "commutator":"["+red(w1+w4+w3+opWord(a)+opWord(w1))+","+red(w1+w4+opWord(b)+opWord(w2)+opWord(w3)+opWord(w4)+opWord(w1))+"]",
                                "rest":red(w1+w4+w3+w2+w5)
                                });
                        };
                    };
                };
            };
        };
    } else {
        result.add({
            "commutator":"",
            "rest":""
            });
    };
    return result;
};//any word -> set of all {"commutator":,"rest":} type objects
function cDecomposition(word){
    let tails = {};//object of {rest:commutator} type
    let initialSet = fialkDecomposition(word);//making first cycle of decomposition
    initialSet.forEach(obj => tails[obj.rest] = obj.commutator);//filling tails obj with results of first cycle of decomposition
    let set = new Set(null);//set of rest parts
    initialSet.forEach(obj => set.add(obj.rest));//filling set of rest parts//tails[rest] returns commutator tail from word//always word = tails[rest]+rest
    while (!set.has("")) {
        console.log("set:");
        console.log(set);
        for (let value of set) {
            newSet = new Set(null);
            inSet = fialkDecomposition(value);
            for (let value2 of inSet) {
                tails[value2.rest] = tails[value] + value2.commutator;
                newSet.add(value2.rest);
            };
            set = newSet;
        };
    };
    result = new Set(null);
    for (let value of set) {
        if (value === ""){
            result.add(tails[value])
        };
    };
    return result;
};//Returns set of presentations of the word as composition of commutators
//  set of rests:   ->
//  rest1           ->  fialkDecomposition(rest1):
//                                  newRest1,newCommutator1     ->  tails[newRest1] = tails[rest1]+newCommutator1
//                                                                  newSet.add(newRest1)
//  rest2           ->              newRest2,newCommutator2     ->  ...
//  rest3           ->  ...
//My Own in-html-used Functions
function wordRedFunction(){
    let wordRedIn = document.getElementById("wordRedInput_id");
    let wordRedOut = document.getElementById("wordRedOutput_id");
    let in_value = wordRedIn.value;
    let out_value = red(in_value);
    wordRedOut.innerHTML = out_value;
};//Applies reduction on the word
function fialkDecompositionFunction() {
    let fialkDecomposeFunctionIn = document.getElementById("fialkDecompositionFunctionIn_id");
    let fialkDecomposeFunctionOut = document.getElementById("fialkDecompositionFunctionOut_id");
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
                        let w1w4w3w2w5 = red(w1+w4+w3+w2+w5);
                        if (w1w4w3w2w5 === ""){w1w4w3w2w5 = "1"};
                        out_value = out_value + newbie + "&#8194;&#8658;&#8194;" + w1w4w3w2w5 + "<br>";
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
function commutatorPresentationFunction(){
    let commutatorPresentationIn = document.getElementById("commutatorPresentationIn_id");
    let commutatorPresentationOut = document.getElementById("commutatorPresentationOut_id");
    let in_value = commutatorPresentationIn.value;
    let presentationSet = cDecomposition(in_value);
    let out_value = "";
    for (let value of presentationSet){
        out_value += in_value + "&#8194;&#8658;&#8194;" + value + "<br>";
    };
    commutatorPresentationOut.innerHTML = out_value;
};//


