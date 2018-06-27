
const shortid = require('shortid');
const path = require('path');
const { readFile, writeFile, readdir, unlink } = require('./fs');

// Save method will create an id property for the object using npm shortid
// Save the object to a JSON file with name as the id
// If id is 123abc, the file name is 123abc.json
// Return a promise that will result to the saved object with the added id property 



module.exports = class Store {
    constructor(root) {
        this.root = root;
    }

    getFileName(id) {
        return path.join(this.root, `${id}.json`);
    }

    save(object){
        const id = object._id = shortid.generate();
        const fileName = this.getFileName(id);
        const serialized = JSON.stringify(object); 
        return writeFile(fileName, serialized)
            .then(() => object);
    }
};