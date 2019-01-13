//My Own built-in Functions
function cutter(i1, i2,word){
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
    let flag = true;
    while (word.length !== 0) {
        let lCL = word[0].toLowerCase();
        let lCLCounter = 0;
        let uCL = word[0].toUpperCase();
        let uCLCounter = 0;
        let filteredWord = "";
        let newWord = "";
        for (let i = 0; i < word.length; i++){
            let x = word.charAt(i);
            if (x === lCL) {
                lCLCounter += 1;
            } else if (x === uCL) {
                uCLCounter += 1;
            } else {
                newWord += x;
            };
        };
        if (lCLCounter != uCLCounter) {flag = false;};
        word = newWord;
    };
    if (flag){
        return true;
    } else {
        return false;
    };
};//Check if the word belongs to commutator
function opWord(word){
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
function fialkTail(set){
    let result = new Set(null);
    for (word of set){
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
    };
    return result;
};//Make a set of words of w1w4w3w2w5 type from the word
function cl(word){
    let i = 0;
    let set = new Set(null);
    set.add(word);
    while (!set.has("")){
        let result = fialkTail(set);
        set = result;
        i++;
    };
    return i;
};//Calculates commutator length of the word using previous function
function fialkDecomposition(set,obj){
    let newSet = new Set(null);
    for (word of set){
        if (word !== "") {
            for (let a1_id = 0; a1_id <= word.length - 4; a1_id++) {
                for (let b1_id = a1_id+1; b1_id <= word.length - 3; b1_id++) {
                    for (let a2_id = b1_id+1; a2_id <= word.length - 2; a2_id++) {
                        for (let b2_id = a2_id+1; b2_id <= word.length - 1; b2_id++) {
                            if (isOpChar(word[a1_id],word[a2_id]) && isOpChar(word[b1_id],word[b2_id])) {
                                let a = word[a2_id];
                                let b = word[b2_id];
                                let w1 = cutter(-1,a1_id,word);
                                let w2 = cutter(a1_id,b1_id,word);
                                let w3 = cutter(b1_id,a2_id,word);
                                let w4 = cutter(a2_id,b2_id,word);
                                let w5 = cutter(b2_id,word.length,word);
                                let w = red(w1+w4+w3+w2+w5);
                                let commutator = "["+red(w1+w4+w3+a+opWord(w1))+","+red(w1+w4+b+opWord(w2)+opWord(w3)+opWord(w4)+opWord(w1))+"]";
                                let newTail = obj[word] + commutator;
                                newSet.add(w);
                                obj[w] = newTail;
                            };
                        };
                    };
                };
            };
        } else {
            newSet.add("");
            obj[""] = obj[word];
        };
    };
    return [newSet,obj];
};//returns [newSet,obj]
function cDecomposition(word){
    let tails = {};
    let set = new Set(null);
    tails[word] = "";
    set.add(word);
    while (tails[""]===undefined) {
        let newObj = fialkDecomposition(set,tails);
        set = newObj[0];
        tails = newObj[1];
    };
    return tails[""];
};//Returns set of presentations of the word as composition of commutators
function setFialkDecomposition(set,obj){
    let newSet = new Set(null);
    let newObj = {};
    for (word of set){
        if (word !== "") {
            for (let a1_id = 0; a1_id <= word.length - 4; a1_id++) {
                for (let b1_id = a1_id+1; b1_id <= word.length - 3; b1_id++) {
                    for (let a2_id = b1_id+1; a2_id <= word.length - 2; a2_id++) {
                        for (let b2_id = a2_id+1; b2_id <= word.length - 1; b2_id++) {
                            if (isOpChar(word[a1_id],word[a2_id]) && isOpChar(word[b1_id],word[b2_id])) {
                                let a = word[a2_id];
                                let b = word[b2_id];
                                let w1 = cutter(-1,a1_id,word);
                                let w2 = cutter(a1_id,b1_id,word);
                                let w3 = cutter(b1_id,a2_id,word);
                                let w4 = cutter(a2_id,b2_id,word);
                                let w5 = cutter(b2_id,word.length,word);
                                let w = red(w1+w4+w3+w2+w5);
                                let commutator = "["+red(w1+w4+w3+a+opWord(w1))+","+red(w1+w4+b+opWord(w2)+opWord(w3)+opWord(w4)+opWord(w1))+"]";
                                newSet.add(w);
                                if (newObj[w] === undefined){
                                    newObj[w] = new Set(null);
                                };
                                for (x of obj[word]){
                                    newObj[w].add(x + commutator);
                                };
                            };
                        };
                    };
                };
            };
        } else {
            newSet.add("");
            newObj[""] = obj[word];
        };
    };
    return [newSet,newObj];
};
function cP2(word){
    let tails = {};//Create an object
    tails[word] = new Set(null);//add word:[]
    tails[word].add("");//set up word:[""]
    let set = new Set(null);//make a set
    set.add(word);//add the word to the set
    //tails = {word : [""]}; set = [word];
    while (tails[""] === undefined){
        let pairObj = setFialkDecomposition(set,tails);
        set = pairObj[0];//re-set the set
        tails = pairObj[1];//re-set the object
        console.log(tails);
    };
    return tails[""];
};
function openBracket(word){
    let arr = word.replace(/\[*/g,"").split(/\]/g);
    let result = "";
    for (i of arr){
        if (i !== ""){
            let pair = i.split(",");
            result += opWord(pair[0])+opWord(pair[1])+pair[0]+pair[1];
        };
    };
    console.log(red(result));
    return red(result);
};//
//My Own in-html-used Functions
function fialkDecompositionFunction(){
    let fialkDecomposeFunctionIn = document.getElementById("fialkDecompositionFunctionIn_id");
    let fialkDecomposeFunctionOut = document.getElementById("fialkDecompositionFunctionOut_id");
    let in_value = red(fialkDecomposeFunctionIn.value);
    let out_value = "";
    if (doesWordBelongToCommutator(in_value)){
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
    } else {
        out_value = "Error: Word does not belong to commutator";
    }
    fialkDecomposeFunctionOut.innerHTML = out_value;
};//
function clFunction(){
    let clFunctionIn = document.getElementById("clFunctionIn_id");
    let clFunctionOut = document.getElementById("clFunctionOut_id");
    let in_value = red(clFunctionIn.value);
    let out_value = new String(null);
    if (doesWordBelongToCommutator(in_value)){
        out_value = "cl(" + in_value+ ")=" + cl(in_value);
    } else {
        out_value = "Error: Word does not belong to commutator";
    };
    clFunctionOut.innerHTML = out_value;
};//Calculates commutator length of the word
function openBracketFunction(){
    let openBracketFunctionIn = document.getElementById("openBracketFunctionIn_id");
    let openBracketFunctionOut = document.getElementById("openBracketFunctionOut_id");
    let in_value = openBracketFunctionIn.value;
    let out_value = in_value + "&#8194;&#8658;&#8194;" + openBracket(in_value);
    openBracketFunctionOut.innerHTML = out_value;
};
function commutatorPresentationFunction(){
    let commutatorPresentationIn = document.getElementById("commutatorPresentationIn_id");
    let commutatorPresentationOut = document.getElementById("commutatorPresentationOut_id");
    let in_value = red(commutatorPresentationIn.value);
    let out_value = new String(null);
    if (doesWordBelongToCommutator(in_value)){
        out_value = in_value + "&#8194;&#8658;&#8194;" + cDecomposition(in_value) + "\n";
    } else {
        out_value = "Error: Word does not belong to commutator";
    }
    commutatorPresentationOut.innerHTML = out_value;
};//
function cP2Function(){
    let cP2In = document.getElementById("cP2In_id");
    let cP2Out = document.getElementById("cP2Out_id");
    let in_value = red(cP2In.value);
    let out_value = "";
    if (doesWordBelongToCommutator(in_value)){
        let result = cP2(in_value);//["jaja1","jaja2","jaja3"];
        for (word of result){
            out_value += in_value + "&#8194;&#8658;&#8194;" + word + "\n";
        };
    } else {
        out_value = "Error: Word does not belong to commutator";
    }
    cP2Out.innerHTML = out_value;
};//
function sBrFunction(){
    let sBrFunctionIn = document.getElementById("sBrIn_id");
    let sBrFunctionOut = document.getElementById("sBrOut_id");
    let in_value = openBracket(sBrFunctionIn.value);
    let out_value = new String(null);
    if (doesWordBelongToCommutator(in_value)){
        out_value = in_value + "&#8194;&#8658;&#8194;" + cDecomposition(in_value) + "\n";
    } else {
        out_value = "Error: Word does not belong to commutator";
    }
    sBrFunctionOut.innerHTML = out_value;
};;