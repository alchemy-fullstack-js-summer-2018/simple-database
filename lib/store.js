
const { writeFile, readFile } = require('./fs');
const shortid = require('shortid');
const path = require('path');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    save(object){
        //Creates id for file, object being created
        object._id = shortid.generate();
        //Sets path for file to animal directory in json format
        const dirFileName = path.join(this.path, `${object._id}.json`);
        //Takes said json object and stringifys it
        const fileContent = JSON.stringify(object);
        //Calls function to create file, object
        return writeFile(dirFileName, fileContent)
        //Callback function...
            .then(() => object);
    }   

    get(_id) {
        const filePath = path.join(this.path, `${_id.json}`);
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