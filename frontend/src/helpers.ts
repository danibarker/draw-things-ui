export const rot13 = (inputString: string) => {
	const resultArray: string[] = [];
	for (let i = 0; i < inputString.length; i++) {
		let currentChar = inputString[i];
		if (currentChar >= "a" && currentChar <= "z") {
			currentChar = String.fromCharCode(
				"a".charCodeAt(0) +
					((currentChar.charCodeAt(0) - "a".charCodeAt(0) + 13) % 26)
			);
		} else if (currentChar >= "A" && currentChar <= "Z") {
			currentChar = String.fromCharCode(
				"A".charCodeAt(0) +
					((currentChar.charCodeAt(0) - "A".charCodeAt(0) + 13) % 26)
			);
		}
		resultArray.push(currentChar);
	}
	return resultArray.join("");
};

function letterToNumber(inputString: string) {
	let result = "";
	for (let i = 0; i < inputString.length; i++) {
		let charCode = inputString.charCodeAt(i);
		if (charCode >= 97 && charCode <= 122) {
			charCode = charCode - 96;
		} else if (charCode >= 65 && charCode <= 90) {
			charCode = charCode - 38;
		}
		result += charCode.toString();
		console.log(`result is ${result}`);
	}
	return result;
}

function numberToLetter(idNumber: number) {
	if (idNumber >= 1 && idNumber <= 26) {
		return String.fromCharCode(idNumber + 96);
	} else if (idNumber >= 27 && idNumber <= 52) {
		return String.fromCharCode(idNumber + 38);
	}
	return "";
}

export function getId(input: string) {
	const answer = letterToNumber(input);
	let result = "";
	for (let i = 0; i < answer.length; i++) {
		if (i < answer.length - 1 && answer[i + 1] === "0") {
			const num = parseInt(answer.slice(i, i + 2));
			const letter = numberToLetter(num);
			result += letter;
			i++;
		} else if (i < answer.length - 1 && answer[i] === "1") {
			if (Math.random() < 0.5) {
				const num = parseInt(answer.slice(i, i + 2));
				const letter = numberToLetter(num);
				result += letter;
				i++;
			} else {
				if (Math.random() < 0.5) {
					const num = parseInt(answer[i]);
					const letter = numberToLetter(num);
					result += letter;
				} else {
					result += answer[i];
				}
			}
		} else if (
			i < answer.length - 1 &&
			answer[i] === "2" &&
			answer[i + 1] <= "6"
		) {
			if (Math.random() < 0.5) {
				const num = parseInt(answer.slice(i, i + 2));
				const letter = numberToLetter(num);
				result += letter;
				i++;
			} else {
				if (Math.random() < 0.5) {
					const num = parseInt(answer[i]);
					const letter = numberToLetter(num);
					result += letter;
				} else {
					result += answer[i];
				}
			}
		} else {
			if (Math.random() < 0.5) {
				const num = parseInt(answer[i]);
				const letter = numberToLetter(num);
				result += letter;
			} else {
				result += answer[i];
			}
		}
	}
	return result;
}
