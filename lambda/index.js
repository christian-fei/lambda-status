'use strict'
const request = require('request-promise')
const StatusRepository = require('./lib/StatusRepository')
const SECONDS = 1 * 1000

exports.handler = (event, context) => {
  const url = event.url
  const requestParams = {
    uri: url,
    method: event.method || 'get',
    headers: event.headers || {},
    time: true,
    simple: false,
    resolveWithFullResponse: true,
    timeout: 60*SECONDS
  }
  return request(requestParams)
  .then(responseToStatusFor(url))
  .then(StatusRepository.insert)
  .then(context.succeed)
  .catch(context.fail)
}

function responseToStatusFor(url) {
  return (response) => ({
    id: Date.now(),
    url: url,
    statusCode: response.statusCode,
    loadingTime: response.elapsedTime,
  })
}
