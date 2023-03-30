const fs = require('fs');
const args = process.argv.slice(2); // remove "node" and "create-file.js" from the arguments array

const paths = {
	rules: 'src/__tests__/classes/rules'
};

const commands = {
	'make:rule': (filename) => createRule(filename),
};

const createRule = (filename) => {
	try {
		const filePath = `${paths.rules}/${filename}.test.ts`;
		if (fs.existsSync(filePath)) {
			console.log('\x1b[31m%s\x1b[0m', `The file "${filename}.test.ts" exists.`);
		} else {
			const fileContent = `import Rule from "classes/Rule";\n\ndescribe('"${filename}"', () => {\n\ttest('"${filename}" rule with out --attributes and --messages', () => {\n\t\tconst rule = new Rule();\n\t});\n\n\ttest('"${filename}" rule with --attributes', () => {\n\t\tconst attributes = {\n\t\t\t//\n\t\t};\n\n\t\tconst rule = new Rule(attributes);\n\t});\n\n\ttest('"${filename}" rule with --messages', () => {\n\t\tconst messages = {\n\t\t\t//\n\t\t};\n\n\t\tconst rule = new Rule({}, messages);\n\t});\n\n\ttest('"${filename}" rule with --attributes and --messages', () => {\n\t\tconst attributes = {\n\t\t\t//\n\t\t};\n\n\t\tconst messages = {\n\t\t\t//\n\t\t};\n\n\t\tconst rule = new Rule(attributes, messages);\n\t});\n});`;
			fs.writeFile(filePath, fileContent, function (err) {
				if (err) {
					console.error(err);
				} else {
					console.log('\x1b[32m%s\x1b[0m', `Rule "${filename}.test.ts" created successfully!`);
				}
			});
		}
	} catch (e) {
		console.error(e.message);
	}
};

try {
	const command = args[0];
	commands[command](args[1] || 'example');
} catch (e) {
	console.error(e);
}