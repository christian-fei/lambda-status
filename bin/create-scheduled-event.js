'use strict'

const exec = require('child_process').exec

module.exports = {
  execute: execute
}


function execute(interval) {
  const command = `(cd lambda; AWS_SCHEDULED_EVENT_RATE="${interval}" npm run add-scheduled-event)`
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        console.log(`stderr: ${stderr}`)
        return reject(error)
      }
      console.log(`==> Successfully created scheduled event!`)
      console.log(`==> stdout: ${stdout}`)
      return resolve(stdout)
    })
  })
}
