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

        const savedPath = path.join(this.dirname, `${obj._id}.json`);
        //fs.writeFile saves obj to a file
        return writeFile(savedPath, JSON.stringify(obj))
            .then(() => {
                return obj;
            });
    }

    get(id) {
        const getPath = path.join(this.dirname, `${id}.json`);

        return readFile(getPath, 'utf8')
            .then(json => {
                return JSON.parse(json); 
            })
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            });
    }
};