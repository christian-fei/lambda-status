'use strict'
const greeter = require('./greeter')
const chooseTableName = require('./choose-table-name')
const createTable = require('./create-table')
const outro = require('./outro')

module.exports = {
  start: start
}

function start() {
  return greeter.execute()
  .then(chooseTableName.execute)
  .then(createTable.execute)
  .then(outro.execute)
  .catch((err) => {
    console.log('==> The command failed with', err)
    process.exit(1)
  })
}
