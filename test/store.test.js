const assert = require('assert');
const fs = require('fs');
const path = require ('path');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const mkdirp = promisify(require('mkdirp'));
const shortid = require('shortid');
const { save } = require('../lib/store');
const Store = require('../lib/store');

describe('store some pet data', () => {
    const dir = path.join(__dirname, 'pets');

    beforeEach(()  => {
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
                //(shortid.generate) ??
            })
            .then(pet => {
                assert.equal(pet.name, 'Benjamin Franklin');
                console.log('got pet', pet);
            }); 
    });  
}); 
    
    


