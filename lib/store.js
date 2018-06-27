const { writeFile, readFile } = require('./fs');
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
        // console.log(sourceFile);
        return readFile(sourceFile)
            .then(sourceFile => {
                return JSON.parse(sourceFile);
            });
    }

    remove(id){
        
    }
}