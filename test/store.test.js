const assert = require('assert');
const Store = require('../lib/store');
const path = require('path');

describe.only('this is my store function', () => {

    const source = path.join(__dirname, 'save-file-dir/');
    const item = new Store(source);

    it('saves obj and gets obj successfully', () => {
        item.save({name: 'DOGS'})
            .then(obj => {
                console.log(obj._id)
                return item.get(obj._id);
            })
            .then(animal => {
                assert.equal(animal.name, 'DOGS');
            });
    });

    it('returns null when given a bad id', () => {
        return item.get('HHH')
            .then(obj => {
                assert.equal(obj, null);
            });      
    })
});