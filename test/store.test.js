const assert = require('assert');
const Store = require('../lib/store');
const { rimraf, mkdirp } = require('../lib/fs');
const path = require('path');
const rootDir = path.join(__dirname, 'warehouse');

//from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
function sortGods(a, b) {
    const godA = a._id.toUpperCase();     
    const godB = b._id.toUpperCase(); 
    if(godA < godB) {
        return -1;
    }
    if(godA > godB) {
        return 1;
    }
    return 0;
}

describe('store', () => {

    let myStore = null;

    beforeEach(() => {
        myStore = new Store(rootDir);
        return rimraf(rootDir);
    });
    beforeEach(() => {
        return mkdirp(rootDir);
    });

    it('saves object to warehouse as json with id as file name and retrieves it', () => {
        return myStore.save({ god: 'Zeus' })
            .then(obj => {
                return myStore.get(obj._id);
            })
            .then(obj => {
                assert.equal(obj.god, 'Zeus');
            });
            
    });

    it('returns null', () => {
        return myStore.get('VeryBadWizard')
            .then(id => {
                assert.equal(id, null);
            });
    });
        
    it('removes file with specified id', () => {
        return myStore.save({ god: 'Kratos' })
            .then(obj => {
                return myStore.remove(obj._id);
            })
            .then(status => {
                assert.equal(status.removed, true);       
            });   
    });

    it('gets all files', () => {
        const gods = [
            { god: 'Zeus' },
            { god: 'Kratos' },
            { god: 'FSM' }
        ];
        return Promise.all(gods.map(god => {
            return myStore.save(god);
        }))
            .then(() => {
                return myStore.getAll();
            })
            .then(objList => {
                assert.deepEqual(objList.sort(sortGods), gods.sort(sortGods));
            });
    });

    it('returns an empty array', () => {
        return myStore.getAll()
            .then(objList => {
                assert.deepEqual(objList, []);
            });
    });

});