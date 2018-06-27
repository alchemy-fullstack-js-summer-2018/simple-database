var shortid = require('shortid');
const { writeFile, readFile, readdir } = require('./fs');

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

    // get(obj) {
    //     const dest = readdir(this.directory)
    //         .then(() => {

    //         })
    //     console.log(dest);
    // }
};