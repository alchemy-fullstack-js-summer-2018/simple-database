
const { writeFile } = require('./fs');
const shortid = require('shortid');
const path = require('path');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    save(object){
        object._id = shortid.generate();
        const dirFileName = path.join(this.path, `${object._id}.json`);
        const fileContent = JSON.stringify(object);
        return writeFile(dirFileName, fileContent)
            .then(() => object);

    }   
};