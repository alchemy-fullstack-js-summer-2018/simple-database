const assert = require('assert');
const path = require('path');
const Store = require('../lib/store');
// const { promisify } = require('util');
// const rimraf = promisify(require('rimraf'));
// const mkdirp = promisify(require('mkdirp'));


describe('save file', () => {

    const saveDir = path.join(__dirname, 'animals');
    

    // beforeEach(() => {
    //     //rimraf
    //     return unlink(dest)
    //         .catch(err => {
    //             if(err.code !== 'ENOENT') throw err;
    //         });
    // });

    it('saves file to database directory', () => { 
        const store = new Store(saveDir);
        
        return store.save({ name: 'garfield' })
            .then(saved => {
                assert.ok(saved._id);
            });
        
    });
});