'use strict'

const SingleEndpointHandler = require('./SingleEndpointHandler')

exports.handler = handler
exports.canHandle = canHandle

function canHandle(event) {
  return event && event.base && event.endpoints
}

function handler(event, context, requestService, statusRepository, lambdaService) {
  const singleEndpointEvent = getSingleEndpointEventFrom(event)
  if(event.endpoints.length>1) {
    const nextEvent = getNextMultipleEndpointEventFrom(event)
    return lambdaService.invoke(nextEvent, context)
    .then(() => SingleEndpointHandler.handler(singleEndpointEvent, context, requestService, statusRepository))
  }
  return SingleEndpointHandler.handler(singleEndpointEvent, context, requestService, statusRepository)
}

function getSingleEndpointEventFrom(event) {
  const base = event.base
  const endpoints = event.endpoints
  const url = base + endpoints[endpoints.length - 1]
  return {url}
}

function getNextMultipleEndpointEventFrom(event) {
  let nextEvent = JSON.parse(JSON.stringify(event))
  nextEvent.endpoints.pop()
  return nextEvent
}
