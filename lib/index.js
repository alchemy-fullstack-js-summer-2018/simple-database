const Store = require('../lib/store');
const rootDirectory = path.join(__dirname, 'animals');
const store = new Store(rootDirectory);

store.save({ name: 'garfield' });
    .then(animal => {
        return store.get(cat._id);
    })
    .catch(err => console.log(err));