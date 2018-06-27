const fs = require('fs');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const { promisify } = require('util');

module.exports = {
    rimraf: promisify(rimraf),
    mkdirp: promisify(mkdirp),
    writeFile: promisify(fs.writeFile),
    readFile: promisify(fs.readFile),
    readdir: promisify(fs.readdir),
    unlink: promisify(fs.unlink),
};