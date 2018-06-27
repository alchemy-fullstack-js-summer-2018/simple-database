const shortid = require('shortid');
const path = require('path');
const { writeFile } = require('./fs');

module.exports = class Store {
    constructor(dirName) {
        this.dirName = dirName;
    }

    save(obj) {
        obj._id = shortid.generate();
        const filePath = path.join(this.dirName, `${obj._id}.json`);
        const object = JSON.stringify(obj);
        return writeFile(filePath, object)
            .then(() => {
                return obj;
            });
    }
};