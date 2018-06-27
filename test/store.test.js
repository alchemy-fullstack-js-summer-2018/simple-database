const assert = require('assert');
const path = require('path');
const { prosimify } = require('util')
const { rimraf, mkdirp,  readdir } = require('../lib/fs');

// const Store = require('../lib/store');
// const rootDirectory = path.join(__dirname, 'animals');
// const store = new Store(rootDirectory);

describe('store', () => {

    const dir = path.join(__dirname, 'animals');

    beforeEach(() => {
        return rimraf (dir);
    });

    beforeEach(() => {
        return mkdirp (dir);
    });

    it('save', () => {
        const store = new Store(dir);
    });

})