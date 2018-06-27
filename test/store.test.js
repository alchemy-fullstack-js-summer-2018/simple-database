const assert = require('assert');
const path = require('path');
const Store = require('../lib/store');
const { rimraf, mkdirp } = require('../lib/fs');


describe('Store Database Project', () => {

    //describe the destination of our database by joining the path and the database name:
    const dest = path.join(__dirname, 'database');
    //create a new Store/database with the attached root directory
    let store = new Store(dest);

    beforeEach(() => {
        return rimraf(dest);

    });

    beforeEach(() => {
        return mkdirp(dest);
    });

    it('saves a file to the Database with an id', () => {
        //use our .save() create a store file with these callback parameters:
        return store.save({ file: 'file contents' })
        //now check to see if this file matches the parameters we are looking for:
            .then(saved => {
                assert.equal(saved.file, 'file contents');
            });
    });


    it('gets a file based on its id', () =>  {
        return store.save({ file: 'file contents' })
        //use our .get() to verify the file id:
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