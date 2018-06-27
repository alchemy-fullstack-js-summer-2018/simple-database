const path = require('path');
const shortid = require('shortid');
const { writeFile, readFile } = require('./fs');

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
        data._id = shortid.generate();
        const destFilePath = path.join(this.path, `${data._id}.json`);
        const destFileContent = JSON.stringify(data);
        return writeFile(destFilePath, destFileContent)
            .then(() => destFileContent);
    }

    getFile(id) {
        const destFilePath = path.join(this.path, `${id}.json`);
        return readFile(destFilePath)
            .then(animal => JSON.parse(animal));
    }
};