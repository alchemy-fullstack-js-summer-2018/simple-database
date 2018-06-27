var shortid = require('shortid');
const { writeFile, readFile } = require('./fs');

module.exports = class Store {
    constructor(directory) {
        this.directory = directory;
    }

    save(obj) {
        obj._id = shortid.generate();
        const dest = this.directory + obj._id + '.json';
        let file = JSON.stringify(obj);
        return writeFile(dest, file)
            .then(() => {
                return obj;
            });
    }

    get(id) {
        const file = this.directory + id + '.json';
        return readFile(file)
            .then((file) => {
                return JSON.parse(file);
            });
    }
};