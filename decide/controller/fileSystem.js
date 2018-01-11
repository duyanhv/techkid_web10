const fs = require('fs');

const writeFileS = (filePath, data) => {
    fs.writeFileSync(filePath, data,'utf-8');
}

const readFileS = (filePath, data) => {
    fs.readFileSync(filePath,data,'utf-8');
}

const existsS = (filePath) => {
    return fs.exists(filePath);
}

module.exports = {
    writeFileS,
    readFileS,
    existsS
}