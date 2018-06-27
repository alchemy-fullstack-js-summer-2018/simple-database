const { readdir, readFile, writeFile, } = require('./fs');
const path = require('path');
const shortid = require('shortid');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    save(mountain) {
        mountain._id = shortid.generate();
        const destName = path.join(this.path, `${mountain._id}.json`);
        const mtObject = JSON.stringify(mountain);
        return writeFile(destName, mtObject)
            .then(() => mtObject);
    }
};
