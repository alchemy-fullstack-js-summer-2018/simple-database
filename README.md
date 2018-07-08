# Simple Database
A simple node app that creates a "database" by saving individual files to a directory - called "store". Uses Shortid npm app to create unique a unique id which is used as the filname. Also utilizes rimraf and mkdirp to handle the file system functions. Tests are written for:
1. Saving an object
1. Asserting that the saved object has an id
1. Tests for a bad id
1. Pass bad id to get function and receive null
1. Save an object, then pass its _id to .remove and check that { removed: true } is returned. 
1. Pass bad id to remove and checlk for proper result
1. Test for getAll = [] on an new store.
1. Test that get All returns objects from an existing store.