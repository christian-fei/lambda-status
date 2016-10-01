'use strict'
const StatusRepository = require('./lib/StatusRepository')
const RequestService = require('./lib/RequestService')
const SingleEndpointHandler = require('./lib/SingleEndpointHandler')

exports.handler = (event, context, requestService, statusRepository) => {
  requestService = requestService || new RequestService()
  statusRepository = statusRepository || new StatusRepository()

  return SingleEndpointHandler.handler(event, context, requestService, statusRepository)
}
