const fs = require('fs');

function readFileAsString(filePath) {
        return new Promise((resolve, reject) => {
            try {
                resolve(fs.createReadStream(filePath));
            } catch  {
                reject(null);
            }
        })

}

module.exports = {readFileAsString}