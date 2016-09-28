'use strict'

const exec = require('child_process').exec

module.exports = {
  execute: execute
}


function execute(endpoint) {
  const command = `sed -i "" -e 's/${escapeRegExp("https://example.org")}/${escapeRegExp(endpoint)}/g' ./monitor/event.json`
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        console.log(`stderr: ${stderr}`)
        return reject(error)
      }
      console.log('==> Updated url to monitor')
      return resolve()
    })
  })
}

function escapeRegExp(regExpString) {
  return regExpString.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
}
