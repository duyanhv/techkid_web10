const fs = require('fs');

const writeFileSync = (filePath, data) => {
	fs.writeFileSync(filePath, data,'utf-8');
}

const readFileSync = (fileName) => {
	let readData = fs.readFileSync(fileName, data,'utf-8');
}

module.exports = {
	writeFile: writeFileSync,
	readFile : readFileSync
}