import fs from "fs";
import path from "path";

const folderOfIcons = "./svgs";
const innerFolders = fs.readdirSync(folderOfIcons);
const fileNameToComponentNameMap = {};
const icons = innerFolders.map(folder => {
	const files = fs.readdirSync(path.join(folderOfIcons, folder));
	return files.map(file => {
		return file.split(".")[0];
	});
});
const numbers = [
	"Zero",
	"One",
	"Two",
	"Three",
	"Four",
	"Five",
	"Six",
	"Seven",
	"Eight",
	"Nine",
];

for (let i = 0; i < innerFolders.length; i++) {
	for (let j = 0; j < icons[i].length; j++) {
		// open file, convert to JSX component, save to new file
		const filePath = path.join(
			folderOfIcons,
			innerFolders[i],
			`${icons[i][j]}.svg`
		);
		const fileContent = fs.readFileSync(filePath, "utf8");
		const componentName = icons[i][j]
			.replace(/-([a-z])/g, g => g[1].toUpperCase())
			.replace(/^[a-z]/, g => g.toUpperCase())
			.replace(/\d/g, g => numbers[parseInt(g)]);
		fileNameToComponentNameMap[icons[i][j]] = componentName;
		let jsxContent = `const ${componentName} = ({fill,stroke,strokeWidth}:{fill:string,stroke:string,strokeWidth:number}) => (
	${fileContent}
);

export default ${componentName};`;
		jsxContent = jsxContent
			.replace(
				/<path/g,
				`<path fill={fill} stroke={stroke} strokeWidth={strokeWidth}`
			)
			.replace(/<!--!.+-->/, "");

		fs.writeFileSync(
			path.join("./icons", innerFolders[i], `${componentName}.tsx`),
			jsxContent
		);
	}
}

// export all icons in a single file
let exportContent = "";
for (let i = 0; i < innerFolders.length; i++) {
	for (let j = 0; j < icons[i].length; j++) {
		const componentName = fileNameToComponentNameMap[icons[i][j]];
		exportContent += `export { default as ${componentName} } from "./${innerFolders[i]}/${componentName}";\n`;
	}
}
fs.writeFileSync(path.join("./icons", "index.ts"), exportContent);
