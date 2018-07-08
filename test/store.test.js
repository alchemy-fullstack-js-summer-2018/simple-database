const assert = require('assert');
const path = require ('path');
//const rimraf = promisify(require('rimraf'));
//const mkdirp = promisify(require('mkdirp'));
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
        
        return store.save({ name: 'Benjamin Franklin' })
            .then(pet => {
                assert.ok(pet._id);
                return store.get(pet._id);
            })
            .then(pet => {
                assert.equal(pet.name, 'Benjamin Franklin');
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
}); 