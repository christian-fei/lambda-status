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
  return request(requestParams, (err, response) => {
    const status = {
      id: Date.now(),
      url: url,
      statusCode: response.statusCode,
      loadingTime: response.elapsedTime
    }
    console.log('-- status', status)
    StatusRepository.insert(status)
    .then(context.succeed)
    .catch(context.fail)
  })
}
