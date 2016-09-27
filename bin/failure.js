'use strict'

module.exports = {
  execute: execute
}

function execute(err) {
  console.log('==> The command failed with', err)
  process.exit(1)
}
