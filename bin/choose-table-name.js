'use strict'
module.exports = {
  execute: execute
}

function execute() {
  return new Promise((resolve, reject) => {
    console.log('\
==> DynamoDB table name: \
')
    resolve('next')
  })
}
