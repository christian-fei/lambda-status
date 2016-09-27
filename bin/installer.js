'use strict'
const greeter = require('./greeter')
const chooseTableName = require('./choose-table-name')
const createTable = require('./create-table')
const saveTableName = require('./save-table-name')
const outro = require('./outro')
const failure = require('./failure')

module.exports = {
  start: start
}

function start() {
  return greeter.execute()
  .then(chooseTableName.execute)
  .then(saveTableName.execute)
  .then(createTable.execute)
  .then(outro.execute)
  .catch(failure.execute)
}
