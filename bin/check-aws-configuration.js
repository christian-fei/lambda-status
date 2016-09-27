'use strict'

const exec = require('child_process').exec

module.exports = {
  execute: execute
}

function execute() {
  return new Promise((resolve, reject) => {
    const command = `ls ~/.aws/credentials`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log('==> AWS config not present. Please configure AWS CLI, and create `~/.aws/credentials`')
        return reject(error)
      }

      console.log(`==> Your AWS account seems to be configured correctly: using the following configuration:`)
      console.log(`==> AWS_ACCESS_KEY_ID:     ${redact(process.env.AWS_ACCESS_KEY_ID)}`)
      console.log(`==> AWS_SECRET_ACCESS_KEY: ${redact(process.env.AWS_SECRET_ACCESS_KEY)}`)
      console.log(`==> AWS_PROFILE:           ${redact(process.env.AWS_PROFILE)} (default value: "default")`)

      return resolve()
    })
  })
}

function redact(string) {
  if(!string) {
    return '[NOT_SPECIFIED]'
  }
  return string.substring(0, parseInt(string.length*3/4,10)) + '******'
}
