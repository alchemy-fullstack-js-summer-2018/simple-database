const shortid = require('shortid');
const path = require('path');
const { writeFile, readFile, unlink } = require('./fs');

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

    get(id) {

        const candyBar = path.join(this.path, id + '.json');
        return readFile(candyBar)
            .then(candyBar => {
                return JSON.parse(candyBar);
            })
            .catch(err => {
                if(err.code === 'ENOENT') return null;
            });
        
    }

    remove(id) {
        const candyBar = path.join(this.path, id + '.json');
        return unlink(candyBar)
            .then(() => {
                return { id: id, removed: true };
            })
            .catch(err => {
                if(err.code === 'ENOENT') return { removed: false }
            });
    }
};