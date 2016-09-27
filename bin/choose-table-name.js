'use strict'
const readline = require('readline')

module.exports = {
  execute: execute
}

const tableNamePattern = /[a-zA-Z0-0-_]/

function execute() {
  return new Promise((resolve, reject) => {
    console.log('==> Choose a DynamoDB table name (i will create one for you): ')

    const stdinInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    })

    stdinInterface.on('error', reject)
    stdinInterface.on('line', (data) => {
      const tableName = data
      if(validTableName(tableName)) {
        stdinInterface.close()
        return resolve(tableName)
      }
      console.log(`==> invalid table name (pattern: ${tableNamePattern})`)
    })
  })
}

function validTableName(tableName) {
  return tableNamePattern.test(tableName)
}
