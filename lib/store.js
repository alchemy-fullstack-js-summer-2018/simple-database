const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const shortid = require('shortid');

module.exports = class Store {
    constructor(dirname) {
        this.dirname = dirname;
        
    }

    save(obj) {
        obj._id = shortid.generate();

        const savedpath = path.join(this.dirname, `${obj._id}.json`);
        //fs.writeFile saves obj to a file
        return writeFile(savedpath, JSON.stringify(obj))
            .then(() => {
                return obj;
            });
    }

    get(id) {
        const getpath = path.join(this.dirname, `${id}.json`);

        return readFile(getpath, 'utf8')
            .then(json => {
                return JSON.parse(json); 
            });
    }
};