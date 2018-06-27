const assert = require('assert');
const path = require('path');
const { promisify } = require('util');
const { readFile } = require('../lib/fs');
const rimraf = promisify(require('rimraf'));
const mkdirp = promisify(require('mkdirp'));
const Store = require('../lib/store');

describe('Sample Test', () => {
    
    it('Returns each array item + 1', () => {
        const store = new Store();
        const arr = [1, 2, 3];
        const result = store.plusOne(arr, (item) => item + 1);
        assert.deepEqual(result, [2, 3, 4]);
    });
    
});


describe('Store some animal data', () => {

    let store = null;
    const dest = path.join(__dirname, 'animals');
    
    beforeEach(() => {
        return rimraf(dest);
    });
    
    beforeEach(() => {
        return mkdirp(dest);
    });
    
    it('Saves a file to animals directory with an id', () => {
        const store = new Store(dest);

        return store.saveFile({ name: 'Frank' })
            .then(animal => {
                assert.ok(JSON.parse(animal)._id);
            });
    });

    it('Gets an animal based on the id', () => {
        const store = new Store(dest);

        store.saveFile({ name: 'Doggo' })
            .then(animal => {
                return store.getFile(JSON.parse(animal)._id);
            })
            .then(animal => {
                assert.equal(animal.name, 'Doggo');
            })
            .catch(err => console.log(err));
    });

});
