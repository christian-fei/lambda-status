'use strict'

const exec = require('child_process').exec

module.exports = {
  execute: execute
}


function execute(tableName) {
  const command = `(cd api; npm run create-api)`
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        console.log(`stderr: ${stderr}`)
        return reject(error)
      }
      console.log(`==> Successfully created api!`)
      console.log(`==> stdout: ${stdout}`)
      return resolve(stdout)
    })
  })
}
