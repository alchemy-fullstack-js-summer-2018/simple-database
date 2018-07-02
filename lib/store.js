
const { writeFile } = require('./fs');
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
};