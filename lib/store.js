const shortid = require('shortid');
const path = require('path');
const { writeFile } = require('fs');

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

    saveFile() {

    }
};