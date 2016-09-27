'use strict'
module.exports = {
  execute: execute
}

function execute() {
  return new Promise((resolve, reject) => {
    console.log('\
# installer for lambda-status\
')
    resolve('next')
  })
}
