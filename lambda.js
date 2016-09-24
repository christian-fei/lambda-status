'use strict'
const request = require('request')
exports.handler = (event, context) => {
  const requestParams = {
    uri: event.url,
    method: event.method || 'get',
    headers: event.headers || {},
    time: true
  }
  console.log('-- requestParams', requestParams)
  request(requestParams, (err, response) => {
    const status = {
      url: event.url,
      statusCode: response.statusCode,
      loadingTime: response.elapsedTime
    }
    console.log('-- status', status)
  })
}
