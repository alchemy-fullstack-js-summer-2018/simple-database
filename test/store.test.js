const assert = require('assert');
const Store = require('../lib/store');
const path = require('path');

describe.only('this is my store function', () => {

    const source = path.join(__dirname, 'save-file-dir\\');

    it('saves shit', () => {
        // console.log(source);
        const item = new Store(source);
        item.save({name: 'Bobby'})
            .then(saved => {
                assert.ok(JSON.parse(saved)._id)
            });
    });
});