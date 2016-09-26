'use strict'
const request = require('request')
const StatusRepository = require('./lib/StatusRepository')
const SECONDS = 1 * 1000

exports.handler = (event, context) => {
  const url = event.url
  const requestParams = {
    uri: url,
    method: event.method || 'get',
    headers: event.headers || {},
    time: true,
    timeout: 60*SECONDS
  }
  console.log('-- requestParams', requestParams)
  return request(requestParams, (err, response) => {
    if( err || !response ) {
      console.log('-- err, response', err, response)
      throw err
    }
    console.log('-- response defined', !!response)
    const id = Date.now()
    const statusCode = response.statusCode
    const loadingTime = response.elapsedTime
    const status = {id,url,statusCode,loadingTime}
    console.log('-- status', status)
    StatusRepository.insert(status)
    .then(context.succeed)
    .catch(context.fail)
  })
}
