const assert = require('assert');
const path = require('path');
const Store = require('../lib/store');
const { rimraf, mkdirp } = require('../lib/fs');


describe('Store Database Project', () => {

    const dest = path.join(__dirname, 'database');
    let store = new Store(dest);

    beforeEach(() => {
        return rimraf(dest);
    });

    beforeEach(() => {
        return mkdirp(dest);
    });

    it('saves a file to the Database with an id', () => {
        return store.save({ file: 'file data contents' })
            .then(saved => {
                assert.equal(saved.file, 'file data contents');
            });
    });
   
});