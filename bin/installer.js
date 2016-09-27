'use strict'
const greeter = require('./greeter')
const secondGreeter = require('./choose-table-name')

module.exports = {
  start: start
}

function start() {
  return greeter.execute()
  .then(secondGreeter.execute)
}
