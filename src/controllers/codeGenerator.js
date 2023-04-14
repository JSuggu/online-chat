export default function codeGenerator(){
	const abcArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "w", "x", "y", "z"];

    let code = "";
    for(let i = 0; i<5; i++){
        const letter = abcArray[(Math.trunc((Math.random()*25)))];
        code = code + letter;
    }

    return code;
}