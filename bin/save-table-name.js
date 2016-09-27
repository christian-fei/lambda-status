'use strict'

const exec = require('child_process').exec

module.exports = {
  execute: execute
}

function execute(tableName) {
  return new Promise((resolve, reject) => {
    const command = `sed -i "" -e "s/'status'/'${tableName}'/g" ../lambda/lib/StatusRepository.js; sed -i "" -e "s/'status'/'${tableName}'/g" ../api/lib/StatusRepository.js`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        console.log(`stderr: ${stderr}`)
        return reject(error)
      }
      return resolve(tableName)
    })
  })
}


