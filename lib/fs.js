const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const { promisify } = require('util');

module.exports = {
    mkdirp: promisify(mkdirp),
    rimraf: promisify(rimraf),
    readFile: promisify(fs.readFile),
    writeFile: promisify(fs.writeFile),
    readdir: promisify(fs.readdir)
};