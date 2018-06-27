const assert = require('assert');
const store = require('../lib/store');
const myMap = store.myMap;

describe('array methods', () => {
    describe('map function', () => {
        const numbers = [1, 2, 3];
        const result = myMap(numbers, x => x + 1);
        it('is equal length', () => {
            assert.equal(numbers.length, result.length);  
        });
        it('copy of array with method applied', () => {
            assert.deepEqual([2, 3, 4], result);      
        });
    });
});