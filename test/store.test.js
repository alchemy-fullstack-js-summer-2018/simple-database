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
        return store.save({ file: 'file contents' })
            .then(saved => {
                assert.equal(saved.file, 'file contents');
            });
    });

    it('gets a file based on its id', () =>  {
        return store.save({ file: 'file contents' })
            .then(verify => {
                return store.get(verify._id);
            });
    });

    it('looks for file and returns null if it does not exist', () => {
        return store.get('fake-file')
            .then(verify => {
                assert.equal(verify, null);
            });
    });

    it('deletes a file by id and returns true if deleted and false if does not exist', () => {
        return store.save({ file: 'to be deleted' })
            .then(saved => {
                return store.remove(saved._id);
            });

    });
   
});