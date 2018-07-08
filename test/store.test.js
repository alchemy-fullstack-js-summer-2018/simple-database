const assert = require('assert');
const path = require ('path');
const { rimraf, mkdirp } = require('../lib/fs');
const Store = require('../lib/store');
const dir = path.join(__dirname, 'pets');

describe('store some pet data', () => {

    beforeEach(() => {
        return rimraf(dir);
    });

    beforeEach(()  => {
        return mkdirp(dir);
    }); 
    
    it('save a pet with id and return', () => {
        const store = new Store(dir);
        return store.save({ pet: 'Benjamin Franklin' })
            .then(obj => {
                assert.ok(obj._id);
                return store.get(obj._id);
            })
            .then(obj => {
                assert.equal(obj.pet, 'Benjamin Franklin');
            }); 
    });  

    it('returns null if bad id', () => {
        const store = new Store(dir);
        return store.get('bad')
            .then(result => {
                assert.equal(result, null);
            });
    });

    it('removes files by id', () => {
        const store = new Store(dir);
        return store.save({ pet: 'Benjamin Franklin' })
            .then(obj => { 
                return store.remove(obj._id);
            })
            .then(status => {
                assert.equal(status.removed, true);
            });
    });
    it('gets all files', () => {
        const store = new Store(dir);
        const pets = [
            { pet: 'Milo' },
            { pet: 'Benjamin Franklin' },
            { pet: 'Birdtrude Stein' }
        ];
        return Promise.all(pets.map(pet => {
            return store.save(pet);
        }));
    });
}); 