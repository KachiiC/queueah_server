const { createReadStream } = require('fs');
const csv = require('csv-parser')

const genderTypes = {
  type: String,
  enum: ["male", "female"],
};

const scannedTypes = {
  type: Boolean,
  default: false,
};

// Creates new attendees
const AttendeeMaker = (data, creator) => {
  Array.isArray(data) ? data.forEach((obj) => creator(obj)) : creator(data)
}
const csvToJs = (path, type) => {

  const results = []

  return new Promise((resolve, reject) => {
    createReadStream(path)
      .on('error', err => reject(err))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results));
  })

}
module.exports = {
  genderTypes,
  scannedTypes,
  AttendeeMaker,
  csvToJs
};
