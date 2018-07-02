const { writeFile, readFile, readdir } = require('./fs');
const shortid = require('shortid');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    save(object){
        object._id = shortid.generate();
        const dir = ;
    }   
