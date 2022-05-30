const { createReadStream } = require('fs');
const csv = require('csv-parser')

const csvToJs = (path) => {

  const results = []

  return new Promise((resolve, reject) => {
    createReadStream(path)
      .on('error', err => reject(err))
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', () => resolve(results));
  })
}

const attendeeBodyArg = {
  multipart: true,
  uploadDir: '.'
}

module.exports = {
  csvToJs,
  attendeeBodyArg
}