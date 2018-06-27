const assert = require('assert');
const shortid = require('shortid');
const { unlink } = require('../lib/fs');

const id = shortid.generate();
console.log(id);

describe('save file', () => {

    const saveDir = path.join(__dirname, 'animals');
    const destFileName = id + '.json';
    const dest = path.join(saveDir, destFileName);

    beforeEach(() => {
        return unlink(dest)
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            });
    });
    it('saves file to database directory', () => {
        return
    })
});