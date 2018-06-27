const assert = require('assert');
const { rimraf, mkdirp } = require('../lib/fs.js');
const path = require('path');

const Store = require('../lib/store.js');

describe('Store some animal data', () => {
    const dest = path.join(__dirname, 'animals');
    const store = new Store(dest);

    beforeEach(() => {
        return rimraf(dest);
    });

    beforeEach(() => {
        return mkdirp(dest);
    });

    it('Save a file to animals directory with an id', () => {
        store.save({ name: 'garfield' })
            .then(animal => {
                return store.get(animal._id);
            })
            .then(animal => {
                console.log('got animal & id', animal + animal._id);
            })
            .catch(err => console.log(err));
    });

});

