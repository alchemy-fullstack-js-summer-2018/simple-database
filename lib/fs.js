const fs = require('fs');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const mkdirp = promisify(require('mkdirp'));


module.exports = {
    readdir: promisify(fs.readdir),
    unlink: promisify(fs.unlink),
    readFile: promisify(fs.readFile),
    writeFile: promisify(fs.writeFile),
    rimraf: promisify(rimraf),
    mkdirp: promisify(mkdirp)
};