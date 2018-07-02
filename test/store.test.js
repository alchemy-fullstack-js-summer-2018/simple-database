const Store = require('../lib/store');
const assert = require('assert');
const path = require('path');
const { rimraf, mkdirp } = require('../lib/fs');


describe('store', () => {

    const dir = path.join(__dirname, 'animals');
    const store = new Store(dir);

    beforeEach(() => {
        return rimraf(dir);
    });

    beforeEach(() => {
        return mkdirp(dir);
    });

    it('saves a file to the Database with an id', () => {
        return store.save({ file: 'file contents' })
            .then(saved => {
                assert.ok(saved._id);
                return store.get(saved._id);
            });
    });
});



