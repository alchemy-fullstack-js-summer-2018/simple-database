const assert = require('assert');
const path = require('path');
const Store = require('../lib/store');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const mkdirp = promisify(require('mkdirp'));


describe('save file', () => {

    const saveDir = path.join(__dirname, 'animals');
    

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
    
    it('checks for bad id or no id', () => {
        const store = new Store(bad)

        return store.get('bad')
            .then(result => {
                assert.equal(result, null);
            });
    });

    it('get all files from store or return null if empty', () => {
        getAll(source) {
            return Promise.all([
                readdir(source)
            ])
                .then(([files]) => {
                    return Promise.all(files.map);
                })
                .then() //what is my assert block?
        }
    })
});