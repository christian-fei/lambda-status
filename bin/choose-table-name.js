'use strict'
const readline = require('readline')

module.exports = {
  execute: execute
}

function execute() {
  return new Promise((resolve, reject) => {
    const stdinInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    })

    stdinInterface.on('line', (data) => {
      resolve(data)
    })
    stdinInterface.on('error', reject)
  })
}
