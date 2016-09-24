'use strict'
const request = require('request')
const StatusRepository = require('./lib/StatusRepository')

exports.handler = (event, context) => {
  const url = event.url
  const requestParams = {
    uri: url,
    method: event.method || 'get',
    headers: event.headers || {},
    time: true
  }
  console.log('-- requestParams', requestParams)
  return request(requestParams, insertStatusResultFor(url, context))
}

function insertStatusResultFor(url, context) {
  return (err, response) => {
    const status = {
      id: Date.now(),
      url: url,
      statusCode: response.statusCode,
      loadingTime: response.elapsedTime
    }
    console.log('-- status', status)
    return StatusRepository.insert(status)
    .then(context.succeed)
    .catch(context.fail)
  }
}
