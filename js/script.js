function isOpChar(a,b) {
    if (a.toLowerCase() == b.toLowerCase()){
        if (a.toLowerCase() == a) {
            return b.toUpperCase() == b;
        } else if (a.toUpperCase() == a) {
            return b.toLowerCase() == b;
        } else {
            return false;
        };
    } else {return false;};
};
function red(word){
    let out = "";
    function innerRed(word,i){
        if (i == word.length-1){
            out = word;
        } else {
            if (isOpChar(word.charAt(i),word.charAt(i+1))){
                if (i != 0) {
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
    if (out != ""){
        return out;
    } else {
        return "1"
    };
};
function wordRedFunction(){
    let wordRedIn = document.getElementById("wordRedInput_id");
    let wordRedOut = document.getElementById("wordRedOutput_id");
    let in_value = wordRedIn.value;
    let out_value = red(in_value);
    wordRedOut.innerHTML = out_value;
};
function opWordFunction() {
	let opWordIn = document.getElementById("opWordInput_id");
	let opWordOut = document.getElementById("opWordOutput_id");
	let text = opWordIn.value;
	let new_text = "";
	for (let char_idx = text.length - 1; char_idx >= 0; char_idx--) {
		let char = text.charAt(char_idx);
		if (char.toUpperCase() === char.toLowerCase()) {
			new_text = "Error";
			break;
		};
		if (char === char.toUpperCase()) {
			new_text += char.toLowerCase();
		} else {
			new_text += char.toUpperCase();
		};
	};
	opWordOut.innerHTML = new_text;
};
function wordCheckFunction() {
    let wordCheckIn = document.getElementById("wordCheckInput_id");
    let wordCheckOut = document.getElementById("wordCheckOutput_id");
    function innerFunc() {
        let wdChInCopy = wordCheckIn.value;
        let countLcl = 0;
        let countUcl = 0;
        while (wdChInCopy.length !== 0) {
            lower_case_l = wdChInCopy[0].toLowerCase();
            upper_case_l = wdChInCopy[0].toUpperCase();
            let arr1 = "";
            for (let id = 0; id < wdChInCopy.length; id++){
                let x = wdChInCopy.charAt(id);
                if (x == lower_case_l || x == upper_case_l){arr1 += x};
            };
            countLcl = 0;
            countUcl = 0;
            for (let i = arr1.length; i >= 0; i--) {
                if (arr1[i-1] == lower_case_l) {countLcl += 1;}
                if (arr1[i-1] == upper_case_l) {countUcl += 1;}
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
    if (innerFunc()==true){
        wordCheckOut.innerHTML = "In commutator";
    } else {
        wordCheckOut.innerHTML = "Not in commutator";
    };
};
function fialkDecompose() {
    let fialkDecomposeIn = document.getElementById("fialkDecomposeIn_id");
    let fialkDecomposeOut = document.getElementById("fialkDecomposeOut_id");
    let in_value = fialkDecomposeIn.value;
    let out_value = "";
    function cutter(i1, i2) {
        result = ""
        if (i2 - i1 != 1 ) {
            result = in_value.slice(i1+1,i2);
        };
        return result;
    };
    if (in_value.length < 4) {
        console.log("bad word");
        out_value = "bad word";
    }
    for (let a1_id = 0; a1_id <= in_value.length - 4; a1_id++) {
        for (let b1_id = a1_id+1; b1_id <= in_value.length - 3; b1_id++) {
            for (let a2_id = b1_id+1; a2_id <= in_value.length - 2; a2_id++) {
                for (let b2_id = a2_id+1; b2_id <= in_value.length - 1; b2_id++) {
                    if (isOpChar(in_value[a1_id],in_value[a2_id]) && isOpChar(in_value[b1_id],in_value[b2_id])) {
                        let w1 = cutter(-1,a1_id);
                        let w2 = cutter(a1_id,b1_id);
                        let w3 = cutter(b1_id,a2_id);
                        let w4 = cutter(a2_id,b2_id);
                        let w5 = cutter(b2_id,in_value.length);
                        console.log("w1:");
                        console.log(w1);
                        let newbie = w1+"("+in_value[a1_id]+")"+w2+"("+in_value[b1_id]+")"+w3+"("+in_value[a2_id]+")"+w4+"("+ in_value[b2_id]+")"+w5;
                        out_value = out_value + newbie + "\t -> \t" + red(w1+w4+w3+w2+w5) + "<br>";
                    };
                };
            };
        };
    };
    fialkDecomposeOut.innerHTML = out_value;
};
function not_mine(){
    let word1 = document.querySelector("#word1");
    let word2 = document.querySelector("#word2");
    let result = document.querySelector("#result");
    function invert_word(word) {
        let new_word = "";
        for (let char_idx = word.length - 1; char_idx >= 0; char_idx--) {
            let char = word.charAt(char_idx);
            if (char === char.toUpperCase()) {
                new_word += char.toLowerCase();
            } else {
                new_word += char.toUpperCase();
            };
        };
        return new_word;
    };
    function do_ur_work() {
        let first = invert_word(word1.value);
        let second = word2.value;
        let shorter_len = 0;
        if (first.length < second.length) {
            shorter_len = first.length;
        } else {
            shorter_len = second.length;
        };
        while (true) {
            if (first[0] === second[0]) {
                first = first.slice(1);
                second = second.slice(1);
            } else {
            break;
            };
        };
        result.innerHTML = invert_word(first) + second;
    };
    word1.addEventListener('input', do_ur_work);
    word2.addEventListener('input', do_ur_work);
    };
//not_mine();