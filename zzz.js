import { baddies } from "./yyy.js";
import readline from "readline-sync";
import fs from "fs";
// want to sort by users choice, asking between 2, which is better, until we have a ranked list
const answers = baddies.sort((a, b) => {
	// sort random first
	return Math.random() - 0.5;
});
const compare = (a, b) => {
	console.log(`Which is better? a:${a} or b:${b}`);
	const answer = readline.question("a or b? ");
	if (answer === "a") {
		return 1;
	} else {
		return -1;
	}
};

const sort = arr => {
	const sorted = arr.sort((a, b) => compare(a, b));
	console.log(sorted);
	fs.writeFileSync("sorted.json", JSON.stringify(sorted));
};

sort(answers);
