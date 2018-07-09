const shortid = require('shortid');
const path = require('path');
const { writeFile, readFile, unlink, readdir } = require('./fs');

module.exports = class Store {
    constructor(dirname) {
        this.dirname = dirname;
    }
    save(obj) {
        obj._id = shortid.generate();

        const getPath = path.join(this.dirname, `${obj._id}.json`);
        const object = JSON.stringify(obj);
        return writeFile(getPath, object)
            .then(() => {
                return obj;
            });
    }

    get(id) {
        const getPath = path.join(this.dirname, `${id}.json`);
        return readFile(getPath)
            .then(getPath => {
                return JSON.parse(getPath);
            })
            .catch(err => {
                if(err.code === 'ENOENT') {
                    return null;
                }
                else throw err;
            });
    }

    remove(id) {
        const getPath = path.join(this.dirname, `${id}.json`);
        return unlink(getPath)
            .then(() => {
                return { removed: true };
            })
            .catch(err => {
                if(err.code === 'ENOENT') {
                    return { removed: false };
                }
                else throw err;
            });
    }

    getAll() {
        return readdir(this.dirName)
            .then(files => {
                return Promise.all(files.map(file => {
                    return this.get(path.basename(file, '.json'));
                }));
            });
    }
};