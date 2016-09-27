'use strict'
const readline = require('readline')

module.exports = {
  execute: execute
}

const intervalPattern = /^[0-9] minutes?$/

function execute() {
  return new Promise((resolve, reject) => {
    console.log(`==> Choose an interval to schedule the monitoring (default: 1 minute) (pattern ${intervalPattern}):`)

    const stdinInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    })

    stdinInterface.on('error', reject)
    stdinInterface.on('line', (data) => {
      const interval = data || '1 minute'
      if(validInterval(interval)) {
        stdinInterface.close()
        return resolve(interval)
      }
      console.log(`==> invalid interval (pattern: ${intervalPattern})`)
    })
  })
}

function validInterval(inteval) {
  return intervalPattern.test(inteval)
}
