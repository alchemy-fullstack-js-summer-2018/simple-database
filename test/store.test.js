const assert = require('assert');
const { rimraf, mkdirp } = require('../lib/fs');
const path = require('path');

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

    it('Save a file to animals directory with an id', () => {
        store.save({ name: 'garfield' })
            .then(animal => {
                return store.get(animal._id);
            })
            .then(animal => {
                console.log('got animal & id', animal + animal._id);
                assert.equal(animal.name, 'garfield');
            })
            .catch(err => {
                console.log('Got error', err);
            });
    });

    

    
});
