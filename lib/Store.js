var shortid = require('shortid');
const { writeFile } = require('./fs');

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
                return JSON.parse(file);
            });
    }
};