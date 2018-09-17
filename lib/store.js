const shortid = require('shortid');
const path = require('path');
const { writeFile, readFile, unlink, readdir } = require('./fs');

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

    get(_id) { 
        //Sets path for file to be retrieved in json format 
        const filePath = path.join(this.path, `${_id}.json`); 
        //calls function and returns its value as well 
        return readFile(filePath) 
        //Callback function invokes returning of parsed json data 
            .then(_id => { //Returns data n
                return JSON.parse(_id); }) 
            //Call back function that returns NULL if no data is found 
            .catch(err => { if(err.code === 'ENOENT') return null; else throw err; });
    }

    getAll() {
        // const filePath = path.join(this.path, id + '.json');       
        return readdir(this.path)
            .then(arr => {
                return arr;
            });
    }

    remove(id) {
        const filePath = path.join(this.path, id + '.json');
        return unlink(filePath)
            .then(() => {
                return { id: id, removed: true };
            })
            .catch(err => {
                if(err.code === 'ENOENT') return { removed: false };
            });
    }
};