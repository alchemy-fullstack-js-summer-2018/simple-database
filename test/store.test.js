const assert = require('assert');
const { travisTest } = require('../lib/store');

describe('store project', () =>

    describe('travisTest', () => {
        it('should pass a test to get travis going', () => {
            const numbers = [1, 2, 3, 4];
            const result = travisTest(numbers, (n) => n * n);
            assert.deepEqual(result, [1, 4, 9, 16]);
        });
    })

);