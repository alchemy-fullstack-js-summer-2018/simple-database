const { writeFile } = require('./fs');

module.exports = function saveFile(dest, contents) {
    return writeFile(dest, contents);
};