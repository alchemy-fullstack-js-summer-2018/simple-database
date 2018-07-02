const Store = require('../lib/store');
const assert = require('assert');
const path = require('path');
const { rimraf, mkdirp } = require('../lib/fs');


describe('store', () => {

    //Creates path for the new directory with name
    const dir = path.join(__dirname, 'animals');
    const store = new Store(dir);

    beforeEach(() => {
        //deletes directory
        return rimraf(dir);
    });

    beforeEach(() => {
        //creates new directory
        return mkdirp(dir);
    });

    it('saves a file to the Database with an id', () => {
        return store.save({ Name: 'dog' })
            .then(saved => {
                assert.ok(saved._id);
                // return store.get(saved._id);
            });
    });

    it('Looks for a file and returns null if not found', () => {
        return store.get('file')
            .then(result => {
                assert.equal(result, null);
            });
    });
});



