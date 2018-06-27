const assert = require('assert');
const Store = require('../lib/store');
const path = require ('path');
const fs = require('fs');
const { rimraf, readdir, writeFile } = require('../lib/store');


describe('store some pet data', () => {
    const dest = path.join(__dirname, 'pets');
    const store = new Store(dest);

    beforeEach(()  => {
        return rimraf(dest);
    });
    beforeEach(()  => {
        return mkdirp(dest);
    }); 
    
    it('save a pet with id and return', () => {

        store.save({ name: 'Benjamin Franklin' });
    }
});  
    
    


