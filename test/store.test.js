const assert = require('assert');
const { map } = require('../lib/store');

describe('travis test', () => {
    it('maps an array', () => {
        const numbers = [1, 2, 3]; 
        const mapped = numbers.map(n => n + 1);
        assert.deepEqual(mapped, [2, 3, 4]);
    });
});