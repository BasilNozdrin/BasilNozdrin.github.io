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
}
function wordCheckFunction() {
    let wordCheckIn = document.getElementById("wordCheckInput_id");
    let wordCheckOut = document.getElementById("wordCheckOutput_id");
    function innerFunc() {
        let wdChInCopy = Array.from(wordCheckIn.value);
        let countLcl = 0;
        let countUcl = 0;
        while (wdChInCopy.length !== 0) {
            lower_case_l = wdChInCopy[0].toLowerCase();
            upper_case_l = wdChInCopy[0].toUpperCase();
            arr1 = wdChInCopy.filter(x => (x == lower_case_l)||(x == upper_case_l));
            countLcl = 0;
            countUcl = 0;
            for (let i = arr1.length; i >= 0; i--) {
                if (arr1[i-1] == lower_case_l) {countLcl += 1;}
                if (arr1[i-1] == upper_case_l) {countUcl += 1;}
            };
            if (countLcl != countUcl) {return false;};
            wdChInCopy1 = wdChInCopy.filter(x => (x != lower_case_l)&&(x != upper_case_l));
            wdChInCopy = wdChInCopy1;
        };
        return true;
    }
    if (innerFunc()==true){
        wordCheckOut.innerHTML = "In commutator";
    } else {
        wordCheckOut.innerHTML = "Not in commutator";
    };
};
function fialkDecompose() {
    function indexword(word, i1, i2) {
        result = ""
        if (i2 - i1 != 1 ) {
            result = word.substring(i1+1,i2);
        };
        return result;
    };
    let fialkDecomposeIn = document.getElementById("fialkDecomposeIn_id");
    let fialkDecomposeOut = document.getElementById("fialkDecomposeOut_id");
    let in_value = Array.from(fialkDecomposeIn.value);
    console.log(in_value);
    let out_value = "";
    if (in_value.length < 4) {
        console.log("bad word");
        new_value = "bad word";
    }
    for (let a1_id = 0; a1_id <= in_value.length - 4; a1_id++) {
        for (let a2_id = a1_id+1; a2_id <= in_value.length - 3; a2_id++) {
            for (let b1_id = a2_id+1; b1_id <= in_value.length - 2; b1_id++) {
                for (let b2_id = b1_id+1; b2_id <= in_value.length - 1; b2_id++) {

                    console.log("самое сложное скрыто здесь")
                };
            };
        };
    };
//	new_value = new_value + "\n" + newbie.join()
//	}
    fialkDecomposeOut.innerHTML = new_value;
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
not_mine();