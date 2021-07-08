const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db/db.json', {
  serialize: (data) => JSON.stringify(data),
  deserialize: (data) => JSON.parse(data)
});
const db = low(adapter);

db.defaults({tokens: []}).write();

module.exports = {
  db
};