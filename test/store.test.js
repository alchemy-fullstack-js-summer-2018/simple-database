const assert = require('assert');
const Store = require('../lib/Store');

describe('Creates file to add to database', () => {
    let candyBar = null;

    beforeEach(() => {
        candyBar = new Store('twix');
    });

    it('Creates a new candy bar and stores in it database', () => {
    });
});

