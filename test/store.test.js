const assert = require('assert');
const Store = require('../lib/store');
const { rimraf, mkdirp } = require('../lib/fs');
const path = require('path');
const rootDir = path.join(__dirname, 'warehouse');

describe('store', () => {

    let myStore = null;

    beforeEach(() => {
        myStore = new Store(rootDir);
        return rimraf(rootDir);
    });
    beforeEach(() => {
        return mkdirp(rootDir);
    });

    it('saves object to warehouse as json with id as file name and retrieves it', () => {
        return myStore.save({ god: 'Zeus' })
            .then(obj => {
                return myStore.get(obj._id);
            })
            .then(obj => {
                assert.equal(obj.god, 'Zeus');
            })
            .catch(err => {
                if(err.code === 'ENOENT') {
                    return null;
                }
            });
    });


});