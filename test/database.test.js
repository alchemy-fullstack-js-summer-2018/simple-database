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
                //assert.ok(saved._id);
                return store.get(saved._id);
            })

            .then(candyBar => {
                assert.equal(candyBar.name, 'twix');
            });
    });

    it('gets a bad id and returns null', () => {
        return store.get('bad id')
            .then(returned => {
                assert.equal(returned, null);
            });
    });
});