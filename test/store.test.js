const assert = require('assert');
const path = require('path');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const mkdirp = promisify(require('mkdirp'));
const Store = require('../lib/store');


describe('Store some animal data', () => {
    const dest = path.join(__dirname, 'animals');
    const store = new Store(dest);
    
    beforeEach(() => {
        return rimraf(dest);
    });
    
    beforeEach(() => {
        return mkdirp(dest);
    });
    
    it('Saves a file to animals directory with an id', () => {
        return store.saveFile({ name: 'Frank' })
            .then(animal => {
                assert.ok(JSON.parse(animal)._id);
            });
    });

    it('Gets a file based on the id', () => {
        store.saveFile({ name: 'Doggo' })
            .then(animal => {
                return store.getFile(JSON.parse(animal)._id);
            })
            .then(animal => {
                assert.equal(animal.name, 'Doggo');
            })
            .catch(err => console.log(err));
    });

    it('Returns null if no file id is found', () => {
        return store.getFile('FAKEID')
            .then(animal => {
                assert.equal(animal, null);
            });
    });

});
