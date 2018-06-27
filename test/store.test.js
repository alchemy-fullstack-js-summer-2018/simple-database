const assert = require('assert');
const { rimraf, mkdirp } = require('../lib/fs');
const path = require('path');
const Store = require('../lib/store');
const rootDirectory = path.join(__dirname, 'animals/');
const store = new Store(rootDirectory);

describe('save file', () => {
    // readdir(rootDirectory)
    //     .then((obj) => {
    //         console.log(obj);
    //     });
    // const dir = path.join(rootDirectory, destFileName);

    beforeEach(() => {
        return rimraf(rootDirectory)
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            })
            .then(() => {
                return mkdirp(rootDirectory);
            });
    });

    it('creates a new file in the destination', () => {
        return store.save({ name: 'garfield' })
            .then(saved => {
                return store.get(saved._id);
            })
            .then(obj => {
                assert.equal(obj.name, 'garfield');
            });
    });
});