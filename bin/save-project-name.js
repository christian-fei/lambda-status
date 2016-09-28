'use strict'

const exec = require('child_process').exec

module.exports = {
  execute: execute
}

function execute(projectName) {
  return new Promise((resolve, reject) => {
    const monitorName = `${projectName}-monitor`
    const apiName = `${projectName}-api`
    const command = `sed -i "" -e 's/"lambda-status-monitor"/"${projectName}"/g' ./monitor/package.json; sed -i "" -e 's/"lambda-status-api"/"${projectName}"/g' ./api/package.json`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        console.log(`stderr: ${stderr}`)
        return reject(error)
      }
      return resolve()
    })
  })
}


