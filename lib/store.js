const shortid = require('shortid');
const path = require('path');
const { writeFile } = require('./fs');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    save(newFile) {
        const id = shortid.generate();
        newFile._id = id;
        const dest = path.join(this.path, id + '.json');
        const file = JSON.stringify(newFile);
        return writeFile(dest, file)
            .then(() => {
                return newFile;
            });
    }

    
};