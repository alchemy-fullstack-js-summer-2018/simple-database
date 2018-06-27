const { writeFile } = require('./fs');
const shortid = require('shortid');
const path = require('path');

module.exports = class Store {

    constructor(directory) {
        this.directory = directory;
    }

    save(obj){
        // source = this.directory;
        obj._id = shortid.generate();
        const fileName = this.directory + obj._id + '.json';
        let file = JSON.stringify(obj);
        return writeFile(fileName, file)
            .then(() => {
                return file;
            });
    }
}