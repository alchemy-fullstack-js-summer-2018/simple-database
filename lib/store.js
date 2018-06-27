const shortid = require('shortid');
const path = require('path');
const { writeFile } = require('../lib/fs');

module.exports = class Store {
    constructor(directory) {
        this.directory = directory;
        
    }

    buildFileName(id) {
        return path.join(this.directory, `${id}.json`);
    }

    save(item){
        const id = item._id = shortid.generate();
        const fileName = this.buildFileName(id);
        const stringified = JSON.stringify(item);
        return writeFile(fileName, stringified)
            .then(() => {
                return item;
            });
    }
};
