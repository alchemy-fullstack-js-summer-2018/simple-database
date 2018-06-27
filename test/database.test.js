const assert = require('assert');
const path = require('path');
const { rimraf, mkdirp } = require('../lib/fs');
const Store = require('../lib/Store');

describe('Simple database', () => {
    let store = null;
    const dest = path.join(__dirname, 'database');


    beforeEach(() => {
        store = new Store(dest);
        return rimraf(dest);

    });

    beforeEach(() => {
        return mkdirp(dest);
    });

    it('saves file to database', () => {
        return store.save({ candybar: 'twix' });
            // .then(saved => {
            //     const result = saved._id;
            //     assert.equal(result, true);
            // });
    });
});

