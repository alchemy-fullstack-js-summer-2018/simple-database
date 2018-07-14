
const assert = require('assert');
const path = require('path');
const { rimraf, mkdirp } = require('../lib/fs');
const Store = require('../lib/store');


describe('store to database', () => {
    let store = null;
    const dest = path.join(__dirname, 'animals');
    store = new Store(dest);

    beforeEach(() => {
        return rimraf(dest);
    });
    beforeEach(() => {
        return mkdirp(dest);
    });

    it('saves a file to database with id', () => {
        return store.save({ name: 'cat' })

            .then(saved => {
                return store.get(saved._id);
            })
            .then(animal => {
                assert.equal(animal.name, 'cat');
            });     
    });

    it('removes a file from the database', () => {
        return store.save({ name: 'cat' })
            .then(saved => {
                return store.remove(saved._id);
            })
            .then(response => {
                assert.equal(response.removed, true);
                return store.get(response.id);
            })
            .then(returned => {
                assert.equal(returned, null);
            });
    });
});