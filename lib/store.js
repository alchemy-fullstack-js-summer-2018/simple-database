const shortid = require('shortid');
const { readdir, writeFile, readFile, unlink } = require('../lib/fs');
const path = require('path');
const id = item._id = shortid.generate();

module.exports = class Store {
    constructor(directory) {
        this.directory = directory;
    }

    buildFileName(id) {
        return path.join(this.directory, `${id}.json`);
    }

    save(item){
        
        const fileName = this.buildFileName(id);
        const stringified = JSON.stringify(item);
        return writeFile(fileName, stringified)
            .then(() => {
                return item;
            });
    }
    //.get(<id>)
    get(id) {
        const fileName = this.buildFileName(id);
        return readFile(fileName)
            .then(fileName => {
                return JSON.parse(fileName);
            })
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            });
    }

    //.remove(<id>)
    remove(id){
        let removeFile = this.directory + id + '.json';
        return unlink(removeFile)
            .then(() => {
                return { removed: true };
            });
    }

    //.getAll()
    getAll() {
        return readdir(this.directory)
            .then(item => {
                return Promise.all(item.map(file => {
                    return this.get(path.basename(file, '.json'));
                }));
            });
    }
};
