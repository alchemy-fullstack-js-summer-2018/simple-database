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

    it('save and get animal', () => {
        store.save({ name: 'dog' })
            .then(object => {
                return store.get(object._id);
            })
            .then(animal => {
                assert.equal(animal.name, 'dog');
            })
    });
});


