const assert = require('assert');
const { unlink, readFile } = require('../lib/fs');
const path = require('path');
const saveFile = require('../lib/save-file');

describe('save file', () => {
    const testDir = path.join(__dirname, 'save-file-dir');
    const destFileName = 'test.txt';
    const dest = path.join(testDir, destFileName);

    beforeEach(() => {
        return unlink(dest)
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            });
    });

    it('creates a new file in the destination', () => {
        return saveFile(dest, 'testing testing')
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