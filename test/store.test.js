const assert = require('assert');
const Store = require('../lib/store');
const path = require('path');

describe.only('this is my store function', () => {

    const source = path.join(__dirname, 'save-file-dir/');

    it('saves obj', () => {
        const item = new Store(source);
        item.save({name: 'james'})
            .then(obj => {
                console.log(obj._id)
                return item.get(obj._id);
            })
            .then(animal => {
                assert.equal(animal.name, 'james');
            });
    });

    // it('removes files', () => {
        
    // })
});