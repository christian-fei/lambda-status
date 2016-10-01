'use strict'
const RequestService = require('./lib/RequestService')
const StatusRepository = require('./lib/StatusRepository')
const LambdaService = require('./lib/LambdaService')
const SingleEndpointHandler = require('./lib/SingleEndpointHandler')
const MultipleEndpointHandler = require('./lib/MultipleEndpointHandler')

exports.handler = (event, context, requestService, statusRepository, lambdaService) => {
  requestService = requestService || new RequestService()
  statusRepository = statusRepository || new StatusRepository()
  lambdaService = lambdaService || new LambdaService()

  if(MultipleEndpointHandler.canHandle(event)) {
    return MultipleEndpointHandler.handler(event, context, requestService, statusRepository, lambdaService)
  }
  return SingleEndpointHandler.handler(event, context, requestService, statusRepository)
}
