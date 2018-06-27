
const Store = require('../lib/store');
// const rootDirectory = path.join(__dirname, 'fruits');
// const store = new Store(rootDirectory);
const { rimraf, mkdirp } = require('../lib/fs');
const assert = require('assert');
// const { unlink, readFile } = require('../lib/fs');
const path = require('path');


describe('store', () => {

    const rootDirectory = path.join(__dirName, 'animals');
    const store = new Store(rootDirectory);

    beforeEach(() => {
        return rimraf(dest);
    });
    beforeEach(() => {
        return mkdirp(dest);
    });

    it('saves a file to database with id', () => {
        return store.save({ file: 'file data contents' });
            .then(saved => {
                assert.equal(saved.file, 'file data contents');
        });
    })
    it('get a file from ')
    
    
    
    
    
    
    
    
    store.save({ name: 'garfield' });
        .then(animal => {
            return store.get(animal._id);
        })
        .then(animal => {
            console.log('got animal', animal);
        })
        .catch(err => console.log(er));


    
    
    
    
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

