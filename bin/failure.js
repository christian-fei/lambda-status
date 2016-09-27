'use strict'

module.exports = {
  execute: execute
}

function execute(err) {
  console.log('==> The previous command failed.')
  console.log('==> Here is the error:\n')
  console.log(err)
  process.exit(1)
}
