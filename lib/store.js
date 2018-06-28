const path = require('path');
const shortid = require('shortid');
const { writeFile, readFile, unlink, readdir } = require('./fs');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    saveFile(animal) {
        animal._id = shortid.generate();
        const destFilePath = path.join(this.path, `${animal._id}.json`);
        const destFileContent = JSON.stringify(animal);
        return writeFile(destFilePath, destFileContent)
            .then(() => destFileContent);
    }

    getFile(animalId) {
        const destFilePath = path.join(this.path, `${animalId}.json`);
        return readFile(destFilePath)
            .then(animal => JSON.parse(animal))
            .catch(err => {
                if(err.code === 'ENOENT') return null;
                else throw err;
            });
    }

    deleteFile(animalId) {
        const destFilePath = path.join(this.path, `${animalId}.json`);
        return unlink(destFilePath)
            .then(() => {
                return {
                    deleted: true,
                };
            })
            .catch(err => {
                if(err.code === 'ENOENT') return { delete: false };
                else throw err;
            });
    }

    getAll() {
        return readdir(this.path)
            .then(files => {
                return Promise.all(files.map(fileName => {
                    return this.getFile(path.basename(fileName, '.json'));
                }));
            });
    }

};