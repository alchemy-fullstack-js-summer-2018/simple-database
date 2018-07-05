
const { writeFile, readFile, readdir } = require('./fs');
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
        //Sets path for file to be retrieved in json format
        const filePath = path.join(this.path, `${_id.json}`);
        //calls function and returns its value as well
        return readFile(filePath)
        //Callback function invokes returnng of parsed json data
            .then(_id => {
                return JSON.parse(_id);
            })
        //Call back function that returns NULL if no data is found
            .catch(err => {
                if(err.code === 'ENOENT') return null;
                else throw err;
            });
    }

    getAll(){
        //Function uses set path to read data and the return it
        return readdir(this.path)
        //Callback function returns array items
            .then(arr => {
                return arr;
            });
    }
};