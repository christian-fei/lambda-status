'use strict'

const exec = require('child_process').exec

module.exports = {
  execute: execute
}


function execute(tableName) {
  const command = `(cd lambda; npm i); (cd api; npm i)`
  return new Promise((resolve, reject) => {
    console.log('==> Installing dependencies, this can take a while...')
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error}`)
        console.log(`stderr: ${stderr}`)
        return reject(error)
      }
      console.log(`==> Successfully installed dependencies!`)
      return resolve(stdout)
    })
  })
}
