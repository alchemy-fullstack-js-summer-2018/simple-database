
const shortid = require('shortid');
const path = require('path');
const { readFile, writeFile, unlink } = require('./fs');

// , readdir

// Save method will create an id property for the object using npm shortid
// Save the object to a JSON file with name as the id
// If id is 123abc, the file name is 123abc.json
// Return a promise that will result to the saved object with the added id property 

// Get method will a return promise that will result to the deserialized (JSON.parse) object that has that id 
// If an object with that id does not exists, return null from promise (HINT: catch ENOENT errors)


module.exports = class Store {
    constructor(root) {
        this.root = root;
    }

    getFileName(id) {
        return path.join(this.root, `${id}.json`);
    }

    save(object) {
        const id = object._id = shortid.generate();
        const fileName = this.getFileName(id);
        const serialized = JSON.stringify(object); 
        return writeFile(fileName, serialized)
            .then(() => JSON.parse(serialized));
    }

    get(id) {
        const fileName = this.getFileName(id);
        return readFile(fileName, 'utf8')
            .then(data => JSON.parse(data))
            .catch(err => {
                if(err.code === 'ENOENT') return null;
                throw err;
            }); 
    }

    remove(id) {
        const fileName = this.getFileName(id);
        return unlink(fileName)
            .then(() => { 
                return { removed: true };
            })
            .catch(err => {
                if(err.code === 'ENOENT') return { removed: false };
                else throw err;
            });
    }
};