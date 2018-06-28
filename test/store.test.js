const assert = require('assert');
const path = require('path');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const mkdirp = promisify(require('mkdirp'));
const Store = require('../lib/store');

function sortId(a, b) {
    const a_id = a._id.toLowerCase();
    const b_id = b._id.toLowerCase();
    if(a_id < b_id) return -1;
    if(a_id > b_id) return 1;
}


describe('Store some animal data', () => {
    const dest = path.join(__dirname, 'animals');
    let store = new Store(dest);
    
    beforeEach(() => {
        return rimraf(dest);
    });
    
    beforeEach(() => {
        return mkdirp(dest);
    });
    

    it('Saves a file with an id and checks the id', () => {
        return store.saveFile({ name: 'Doggo' })
            .then(animal => {
                return store.getFile(JSON.parse(animal)._id);
            })
            .then(animal => {
                assert.equal(animal.name, 'Doggo');
            });
    });

    it('Returns null if no file id is found', () => {
        return store.getFile('FAKE ID')
            .then(animal => {
                assert.equal(animal, null);
            });
    });

    it('Deletes a file by id', () => {
        return store.saveFile({ name: 'Frank' })
            .then(animal => {
                return store.deleteFile(JSON.parse(animal)._id);
            })
            .then(animal => {
                assert.equal(animal.deleted, true);
                return store.getFile(animal._id);
            })
            .then(animal => {
                assert.equal(animal, null);
            });
    });

    it('Returns an array of all objects in the directory', () => {
        const animals = [
            { name: 'Frank' },
            { name: 'Sparky' },
            { name: 'Doggo' }
        ];

        return Promise.all(animals.map(animalName => {
            return store.saveFile(animalName);
        }))
            .then(() => {
                return store.getAll();
            })
            .then(allFiles => {
                assert.deepEqual(allFiles.sort(sortId), animals.sort(sortId));
            });
    });

    it('Returns [] when getting an empty directory', () => {
        return store.getAll()
            .then(response => {
                assert.deepEqual(response, []);
            });
    });

});
