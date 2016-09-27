'use strict'
const greeter = require('./greeter')
const chooseTableName = require('./choose-table-name')
const createTable = require('./create-table')
const processWrapper = require('./process-wrapper')

module.exports = {
  start: start
}

function start() {
  return greeter.execute()
  .then(chooseTableName.execute)
  .then(createTable.execute)
  .then((data) => {
    console.log('==> Woohoo! Successfully created the status page :) Check the logs above for more infomation.')
    processWrapper.exit(0)
  })
  .catch((err) => {
    console.log('==> The command failed with', err)
  })
}
