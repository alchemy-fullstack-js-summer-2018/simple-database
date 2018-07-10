const assert = require('assert');
const path = require('path');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const mkdirp = promisify(require('mkdirp'));
const Store = require('../lib/store');



describe('store', () => {

    const dir = path.join(__dirname, 'animals');

    beforeEach(() => {
        return rimraf(dir);
    });

    beforeEach(() => {
        return mkdirp(dir);
    });

    it('saves an object with an id', () => {
        const store = new Store(dir);

        return store.save({ name: 'garfield' })
            .then(animal => {
                assert.ok(animal._id);
                return store.get(animal._id);
            })
            .then(animal => {
                assert.equal(animal.name, 'garfield');
            });
    });

    it('returns null when given a bad id', () => {
        const store = new Store(dir);

        return store.get('bad')
            .then(result => {
                assert.equal(result, null);
            });
    });
});