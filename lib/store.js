const { writeFile, readFile } = require('./fs');
const path = require('path');
const shortid = require('shortid');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    save(object) {
        //we create an id with shortid:
        object._id = shortid.generate();
        //we create the file path by joining the root path with the new shortid (and stringify it):
        const destFileName = path.join(this.path, `${object._id}.json`);
        //we give it some contents, stringified to be readable:
        const fileContents = JSON.stringify(object);
        //we satisfy callback parameters for the writeFile function:
        return writeFile(destFileName, fileContents)
        //then pass on the object
            .then(() => object);
    }


    get(_id) {
        //describe the file path by id, we need to know where it is:
        const filePath = path.join(this.path, `${_id}.json`);
        //we read the file and return its parsed id:
        return readFile(filePath)
            .then(_id => {
                return JSON.parse(_id);
            })
            .catch(err => {
                if(err.code === 'ENOENT') return null;
                else throw err;
            });
    }
};