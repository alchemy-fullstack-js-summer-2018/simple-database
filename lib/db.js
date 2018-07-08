const Store = require('../lib/store');
const rootDirectory = path.join(__dirname, 'animals');
const store = new Store(rootDirectory);

store.save({ name: 'garfield' });
  .then(animal => {
    return store.get(animal._id);
  })
  .then(animal => {
    console.log('got animal', animal);
    // { name: 'garfield' }
  })
  .catch(err => console.log(err));