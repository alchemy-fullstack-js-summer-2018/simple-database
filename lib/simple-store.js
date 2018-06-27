var shortid = require('shortid');
const { writeFile, readFile, unlink, readdir } = require('./fs');

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
            .then(file => {
                return JSON.parse(file);
            })
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            });
    }

    remove(id) {
        const file = this.directory + id + '.json';
        return unlink(file)
            .then(() => {
                return { removed: true };
            })
            .catch(err => {
                if(err.code === 'ENOENT') return { removed: false };
                else throw err;
            });
    }

    getAll() {
        return readdir(this.directory)
            .then(arr => {
                return arr;
            });
    }
};