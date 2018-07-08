
const Store = require('../lib/store');
const { rimraf, mkdirp } = require('../lib/fs');
const assert = require('assert');
const path = require('path');


describe('store', () => {

    const rootDirectory = path.join(__dirname, 'animals');
    const store = new Store(rootDirectory);

    beforeEach(() => {
        return rimraf(rootDirectory);
    });
    beforeEach(() => {
        return mkdirp(rootDirectory);
    });

    it('saves a file to database with id', () => {
        return store.save({ file: 'file data contents' })
            .then(saved => {
                assert.ok(saved._id);
                assert.equal(saved.file, 'file data contents');
            });
    });
    
    // it('gets a file from database with id', () => {
    //     return 
    // } 
    
    
    
    
    
    
    
    
    // store.save({ name: 'garfield' });
    //     .then(animal => {
    //         return store.get(animal._id);
    //     })
    //     .then(animal => {
    //         console.log('got animal', animal);
    //     })
    //     .catch(err => console.log(er));


    
    
    
    
    // describe('apple constructor test', () => {
    //     it('creates an apple', () => {
    //         // const newFruit = 
    //         const apple = new Fruit('apple', 'red');
    //         assert.deepEqual(apple, red);
    //     });
    // });
    // describe('travis test', () => {
    //     it('maps an array', () => {
    //         const numbers = [1, 2, 3]; 
    //         const mapped = numbers.map(n => n + 1);
    //         assert.deepEqual(mapped, [2, 3, 4]);
    //     });
    // });

});

