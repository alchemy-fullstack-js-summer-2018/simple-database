const assert = require('assert');
const { plusOne } = require('../lib/store');

describe('Sample test', () => {

    it('tests item + 1', () => {
        const arr = [1, 2, 3];
        const result = plusOne(arr, (item) => item + 1);
        assert.deepEqual(result, [2, 3, 4]);
    });

});