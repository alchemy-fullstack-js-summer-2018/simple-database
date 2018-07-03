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

    it('Saves and gets file to animals directory with an id', () => {
        store.save({ name: 'garfield' })
            .then(animal => {
                return store.get(animal._id);
            })
            .then(animal => {
                console.log('got animal & id', animal,  animal._id);
                assert.equal(animal.name, 'garfield');
            })
            .catch(err => {
                console.log('Got error', err);
            });
    });

    it('Returns null for file with bad id', () => {
        return store.get('FileWithBadId')
            .then(animal => {
                assert.equal(animal, null);
            });
    });

    it('Removes an animal by id', () =>  {
        let saved = null;
        return store.save({ animal: 'garfield' })
            .then(animal => {
                saved = animal._id;
                return store.remove(animal._id);
            })
            .then(removed => {
                assert.deepEqual(removed, { removed: true });
                return store.get(saved);
            })
            .then(got => {
                assert.strictEqual(got, null);
            });
    });

    it('Returns false when deleting file with bad id', () => {
        return store.remove('FileWith BadId')
            .then(animal => {
                assert.strictEqual(animal.removed, false);
            });
    });

    it('Returns empty array for a newly ')

    
    
});
