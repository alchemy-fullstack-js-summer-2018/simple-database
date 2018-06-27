const path = require('path');
const shortid = require('shortid');
const { writeFile } = require('./fs');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    plusOne(arr, callback) {
        var result = [];
        for(let i = 0; i < arr.length; i++) {
            result.push(callback(arr[i]));
        }
        return result;
    }

    saveFile(data) {
        const id = shortid.generate();
        data._id = id;
        const destFile = path.join(this.path, `${id}.json`);
        const destFileContent = JSON.stringify(data);
        data._id = id;
        return writeFile(destFile, destFileContent)
            .then(() => destFileContent);
    }
};