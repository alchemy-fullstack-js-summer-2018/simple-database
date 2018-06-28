const assert = require('assert');
const { rimraf, mkdirp } = require('../lib/fs');
const Store = require('../lib/store');
const path = require('path');

describe.only('this is my store function', () => {

    const source = path.join(__dirname, 'save-file-dir/');
    const item = new Store(source);

    beforeEach(() => {
        return rimraf(source)
            .catch(err => {
                if(err !== 'ENOENT') throw err;
            })
            .then(() => {
                return mkdirp(source);
            });
    });

    it('saves obj and gets obj successfully', () => {
        item.save({ name: 'DOGS' })
            .then(obj => {
                return item.get(obj._id);
            })
            .then(animal => {
                assert.equal(animal.name, 'DOGS');
            });
    });

    it('returns null when given a bad id', () => {
        return item.get('HHH')
            .then(obj => {
                assert.equal(obj, null);
            });      
    });

    it('returns an array the length of items', () => {
        return item.getAll()
            .then(items => {
                assert.deepEqual(items.length, 0);
            });
    });
    it('removes items at the specified id and returns true', () => {
        item.remove('HysUzaGGQ')
            .then(status => {
                assert.deepEqual(status, { removed: true });
            });
    });

    it('returns false when trying to remove on a bad id', () => {
        item.remove('bad')
            .then(status => {
                assert.deepEqual(status, { removed: false });
            });
    });

});