const shortid = require('shortid');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

// create class and methods for that class
module.exports = class Store {
    constructor(path) {
        this.path = path;
    }
};


