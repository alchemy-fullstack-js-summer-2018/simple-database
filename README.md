# Simple-Database

Simple ability to read, write, and delete data in JSON format within a directory. Also returns array of the objects in the directory using getAll(). IDs are currently assigned randomly using shortid (included in dependencies).

The store class (e.g. new Store) will give you access to the following:

store.saveFile(object)
store.getFile(id)
store.deleteFile(id)
store.getAll()
