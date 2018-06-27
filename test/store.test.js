const assert = require('assert');
const { unlink, readFile } = require('../lib/fs');
const path = require('path');
const Store = require('../lib/store');
const rootDirectory = path.join(__dirname, 'animals');
const store = new Store(rootDirectory);

describe('save file', () => {
    const destFileName = 'test.txt';
    const dest = path.join(rootDirectory, destFileName);

    beforeEach(() => {
        return unlink(dest)
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            });
    });

    it('creates a new file in the destination', () => {
        return store.save(dest, 'testing testing')
            .then(() => {
                return Promise.all([
                    readFile(dest, 'utf8')
                ]);
            })
            .then(([content]) => {
                assert.deepEqual(content, 'testing testing');
            });
    });
});