'use strict'

const SECONDS = 1 * 1000

exports.handler = handler

function handler(event, context, requestService, statusRepository) {
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
  return requestService.request(requestParams)
  .then(responseToStatusFor(url))
  .then(statusRepository.insert)
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
