const Store = require('../lib/store');
const rootDirectory = path.join(__dirname, 'animals');
const store = new Store(rootDirectory);

store.save({ name: 'garfield'});
    .then(animal => {
        return store.get(cat._id);
    })
    .then(cat => {
        console.log('got cat', cat);
    })
    .catch(err => console.log(err));