const shortid = require('shortid');
const path = require('path');
const { writeFile, readFile, deleteFile, readDir } = require('./fs');

// create class and methods for that class
module.exports = class Store {
    constructor(path) {
        this.path = path;
    }};

