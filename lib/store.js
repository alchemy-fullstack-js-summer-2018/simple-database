const { writeFile, readFile, unlink } = require('./fs');
const path = require('path');
const shortid = require('shortid');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    save(object) {
        object._id = shortid.generate();
        const destFileName = path.join(this.path, `${object._id}.json`);
        const fileContents = JSON.stringify(object);
        return writeFile(destFileName, fileContents)
            .then(() => object);
    }

    get(_id) {
        const filePath = path.join(this.path, `${_id}.json`);
        return readFile(filePath)
            .then(_id => {
                return JSON.parse(_id);
            })
            .catch(err => {
                if(err.code === 'ENOENT') return null;
                else throw err;
            });
    }

    remove(_id) {
        const filePath = path.join(this.path, `${_id}.json`);
        return unlink(filePath);
    }
};