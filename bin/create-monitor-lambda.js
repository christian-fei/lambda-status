'use strict'

const exec = require('child_process').exec

module.exports = {
  execute: execute
}


function execute(tableName) {
  const command = `(cd lambda; npm run create-lambda)`
  return new Promise((resolve, reject) => {
    console.log('==> Creating monitoring lambda function, this can take a while...')
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        console.log(`stderr: ${stderr}`)
        return reject(error)
      }
      console.log(`==> Successfully created monitor lambda!`)
      console.log(`==> stdout: ${stdout}`)
      return resolve(stdout)
    })
  })
}
