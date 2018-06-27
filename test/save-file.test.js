const assert = require('assert');
const { unlink, saveFile } = require('../lib/fs');
const path = require('path');

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
        return saveFile(dest)
            .then(() => {
                assert.deepEqual(dest, 'testing testing');
            });
    });
});