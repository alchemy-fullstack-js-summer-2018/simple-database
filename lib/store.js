/* eslint-disable-next-line */
class Store {
    constructor(id, type, name, age) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.age = age;
    }
}

function plusOne(arr, callback) {
    var result = [];
    for(let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i]));
    }
    return result;
}

module.exports = {
    plusOne
};