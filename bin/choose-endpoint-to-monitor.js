'use strict'
const readline = require('readline')

module.exports = {
  execute: execute
}

const urlPattern = /(([\w\.\-\+]+:)\/{2}(([\w\d\.]+):([\w\d\.]+))?@?(([a-zA-Z0-9\.\-_]+)(?::(\d{1,5}))?))?(\/(?:[a-zA-Z0-9\.\-\/\+\%]+)?)(?:\?([a-zA-Z0-9=%\-_\.\*&;]+))?(?:#([a-zA-Z0-9\-=,&%;\/\\"'\?]+)?)?/g
const simplifiedUrlPattern = /https?:\/\/optional-subdomain?\.domain\.tld\/optional-route/
function execute() {
  return new Promise((resolve, reject) => {
    console.log('==> Choose an endpoint to monitor: ')
    console.log(`==> PS: it must be in the format ${simplifiedUrlPattern}`)

    const stdinInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    })

    stdinInterface.on('error', reject)
    stdinInterface.on('line', (data) => {
      const url = data
      if(validUrl(url)) {
        stdinInterface.close()
        return resolve(url)
      }
      console.log(`==> invalid url (pattern: ${urlPattern})`)
    })
  })
}

function validUrl(url) {
  return urlPattern.test(url)
}
