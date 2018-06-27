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
    

    it('Saves a file with an id and checks the id', () => {
        return store.saveFile({ name: 'Doggo' })
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

    it('Deletes a file by id', () => {
        return store.saveFile({ name: 'Frank' })
            .then(animal => {
                return store.delete(animal._id);
            })
            .then(response => {
                assert.equal(response.removed, true);
            })
            .then(animal => {
                assert.equal(animal, null);
            });
    });

});
