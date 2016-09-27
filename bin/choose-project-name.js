'use strict'
const readline = require('readline')

module.exports = {
  execute: execute
}

const projectNamePattern = /^[a-zA-Z0-9-]+$/


function execute() {
  return new Promise((resolve, reject) => {
    console.log(`==> Choose a project name (e.g.: google-com-status) (pattern ${projectNamePattern}):`)

    const stdinInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    })

    stdinInterface.on('error', reject)
    stdinInterface.on('line', (data) => {
      const projectName = data
      if(validProjectName(projectName)) {
        stdinInterface.close()
        return resolve(projectName)
      }
      console.log(`==> invalid project name (pattern: ${projectNamePattern})`)
    })
  })
}

function validProjectName(projectName) {
  return projectNamePattern.test(projectName)
}
