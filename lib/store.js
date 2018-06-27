const shortid = require('shortid');
const path = require('path');
const { writeFile, readFile, unlink } = require('./fs');

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

    get(id) {
        const filePath = path.join(this.dirName, `${id}.json`);
        return readFile(filePath)
            .then(filePath => {
                return JSON.parse(filePath);
            })
            .catch(err => {
                if(err.code === 'ENOENT') {
                    return null;
                }
            });
    }

    remove(id) {
        const filePath = path.join(this.dirName, `${id}.json`);
        return unlink(filePath)
            .then(() => {
                return { removed: true };
            })
            .catch(err => {
                if(err.code === 'ENOENT') {
                    return { removed: false };
                }
            });
    }
};