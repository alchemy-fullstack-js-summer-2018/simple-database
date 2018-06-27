const { join } = require('path');
const { readdir, mkdirp } = require('./fs');
const copyFile = require('./copy-file');

module.exports = function copyDir(source, dest) {
    return Promise.all([
        readdir(source),
        mkdirp(dest)
    ])
        .then((([files]) => {
            return Promise.all(files.map(file => {
                return copyFile(join(source, file), join(dest, file));
            }));
        }));
};