const { writeFile } = require('./fs');
const path = require('path');
const shortid = require('shortid');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    
    save(data) {
        data._id = shortid.generate();
        const destFileName = path.join(this.path, `${data._id}.json`);
        const fileData = JSON.stringify(data);
        return writeFile(destFileName, fileData)
            .then(() => data);
    }
};