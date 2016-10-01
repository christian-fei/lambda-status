'use strict'

const RequestHandler = require('./RequestHandler')

exports.handler = handler
exports.canHandle = canHandle

function canHandle(event) {
  return event && event.base && event.endpoints
}

function handler(event, context, requestService, statusRepository, lambdaService) {
  const singleEndpointEvent = getSingleEndpointEventFrom(event)
  const nextEvent = getNextMultipleEndpointEventFrom(event)
  if(event.endpoints.length>1) {
    return lambdaService.invoke(nextEvent, context)
    .then(() => {return singleEndpointEvent})
  }
  return Promise.resolve(singleEndpointEvent)
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
