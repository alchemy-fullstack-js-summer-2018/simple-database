const assert = require('assert');
const Store = require('../lib/store');


describe('store', () => {
    let newStore;
    beforeEach(() => {
        newStore = new Store();
    });

    const pets = [
        {
            name: 'Benjamin Frankilin',
            type: 'cat'
        },
        {
            name: 'Birdtrude Stein',
            type: 'bird'
        }, 
        {
            name: 'Milo',
            type: 'cat'
        }
    ];
 
});