const assert = require('assert');
const path = require('path');
const { rimraf, mkdirp } = require('../lib/fs');
const Store = require('../lib/Store');

describe('Simple database', () => {
    let store = null;
    const dest = path.join(__dirname, 'database');
    store = new Store(dest);


    beforeEach(() => {
        return rimraf(dest);

    });

    beforeEach(() => {
        return mkdirp(dest);
    });

    it('saves file to database', () => {
        return store.save({ name: 'twix' })

            .then(saved => {
                return store.get(saved._id);
            })

            .then(candyBar => {
                assert.equal(candyBar.name, 'twix');
            });
    });

    it('get method returns null', () => {
        return store.get('badId')
            .then(returned => {
                assert.equal(returned, null);
            });
    });

    it('removes file from database', () => {
        return store.save({ name: 'snickers' })
            .then(saved => {
                return store.remove(saved._id);
            })
            .then(response => {
                assert.equal(response.removed, true);
                return store.get(response.id);
            })
            .then(returned => {
                assert.equal(returned, null);
            });
    });

    it('remove method returns null', () => {
        return store.remove('badId')
            .then(response => {
                assert.equal(response.removed, false);
            });
    });

    it('gets all the candy bars', () => {
        store = new Store(dest);
        
    });
});