'use strict'

const ApiBuilder = require('claudia-api-builder')
const api = new ApiBuilder()
const StatusRepository = require('./lib/StatusRepository')
const readFileSync = require('fs').readFileSync

module.exports = api

const indexHtml = readFileSync('./assets/index.html', 'utf8')

api.get('/', function (request) {
  return indexHtml
}, {
  success: {contentType: 'text/html'},
  error: {code: 500}
})

api.get('/statuses', function (request) {
  const from = parseFrom(request.queryString.from)
  return StatusRepository.latest(from)
})


const HOUR = 1000*60*60
const DAY = HOUR*24
const WEEK = DAY*7

function parseFrom(from) {
  if(!from) {
    return
  }
  if(/\d+hago/.test(from)) {
    const hoursAgo = from.match(/(\d)+hago/)[1]
    return Date.now()-HOUR*hoursAgo
  }
  if(/\d+dago/.test(from)) {
    const daysAgo = from.match(/(\d)+dago/)[1]
    return Date.now()-DAY*daysAgo
  }
  if(/\d+wago/.test(from)) {
    const weeksAgo = from.match(/(\d)+wago/)[1]
    return Date.now()-WEEK*weeksAgo
  }
}
