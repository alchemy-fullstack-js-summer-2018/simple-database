const { writeFile, readFile, unlink, readdir } = require('./fs');
const shortid = require('shortid');

module.exports = class Store {

    constructor(directory) {
        this.directory = directory;
    }

    save(obj){
        obj._id = shortid.generate();
        const dest = this.directory + obj._id + '.json';
        let file = JSON.stringify(obj);
        return writeFile(dest, file)
            .then(() => {
                return obj;
            });
    }

    get(id){
        let sourceFile = this.directory + id + '.json';
        return readFile(sourceFile)
            .then(sourceFile => {
                return JSON.parse(sourceFile);
            })
            .catch(err => {
                if (err.code === 'ENOENT') return null;
                else throw err;
            });
    }

    remove(id){
        let sourceFile = this.directory + id + '.json';
        return unlink(sourceFile)
            .then(() => {
                return { removed: true };
            })
            .catch(err => {
                if (err.code === 'ENOENT') return { removed: false };
                else throw err;
            })
    }

    getAll(){
        return readdir(this.directory)
            .then(arr => {
                console.log(arr);
                return arr;
            })
        // return Promise.all([
        //     readdir(this.directory)
        // ])
        //     .then(([files]) => {
        //         return files;
        //     })
    }
}