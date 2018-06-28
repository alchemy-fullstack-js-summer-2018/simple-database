Lab 3 - Simple Database
===
This is a lab assignment for creating a simple database that can retrieve objects from the file system, written in JavaScript using Node. It uses a `Store` class that has several methods to create, read, and delete files.

## Get Started
1. Fork and clone the repo.
1. Run `npm init` inside the repo directory in order to create a `package.json` file. 
1. Run `npm i` inside the directory to install all the necessary packages.
1. Run `npm start` to run the tests!

## Store API
* `.save(<objectToSave>)` will stringify and then save the object to a JSON file with a unique id.
    ```js
    store.save({ name: Mickey Mouse });
    ```
* `.get(<id>)` will find the JSON file with the corresponding ID and get a parsed object.
    ```js
    store.get(cat._id)
    ```
* `.remove(<id>)` will find the JSON file with the corresponding ID and delete it, returning `true` if it was successful and `false` if it didn't find the file.
    ```js
    store.remove(cat._id)
    ```
* `.getAll()` will get an array of all the objects in the directory, or an empty array if it's empty.
    ```js
    store.getAll();
    ```
