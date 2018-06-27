const path = require('path');
// const shortid = require('shortid');

module.exports = {
    travisTest
};

function travisTest(arr, callback) {
    let arr2 = [];
    for(let i = 0; i < arr.length; i++) {
        arr2[i] = callback(arr[i]);
    }
    return arr2;
}