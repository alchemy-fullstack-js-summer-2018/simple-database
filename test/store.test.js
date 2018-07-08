const assert = require('assert');
const path = require('path');
const Store = require('../lib/store');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const mkdirp = promisify(require('mkdirp'));


describe('save file', () => {

    const saveDir = path.join(__dirname, 'animals');
    const store = new Store(saveDir);
    

    beforeEach(() => {
        return rimraf(saveDir);
    });

    beforeEach(() => {
        return mkdirp(saveDir);
    });

    it('saves file to database directory', () => { 
        const store = new Store(saveDir);
        
        return store.save({ name: 'garfield' })
            .then(saved => {
                assert.ok(saved._id);
            });
        
    });

    it('deletes a file with specific id', () => {
        return store.remove('')
            .then(item => {
                assert.deepEqual(item.removed, true);
            });
    });
    
    it('checks for bad id or no id', () => {
        return store.get('bad')
            .then(item => {
                assert.equal(item, null);
            });
    });

    it('get all files from store or return null if empty', () => {
        const cat = [
            { name: 'Velma' },
            { name: 'Daphne' },
            { name: 'Sydney' },
            { name: 'Mr. Black' }
        ];
        
        return Promise.all(cat.map(animal => {
            return store.save(animal);
        }))
            .then(() => {
                return store.getAll();
            })
            .then(arr => {
                assert.deepEqual(arr.name, cat.name);
            }); 
    });
});