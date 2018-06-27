const { readdir, mkdir } = require('./fs');
const copyFile = require('./copy-file');


module.exports = function copyDir(source, dest) {
    return Promise.all([

        readdir(source),

        mkdirp(dest)
    ])
        .then([files]) => {
            return Promise.all(files.map(file => {
                return copyFile()
            }))
        }
}