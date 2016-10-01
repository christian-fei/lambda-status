'use strict'
const StatusRepository = require('./lib/StatusRepository')
const RequestService = require('./lib/RequestService')
const SingleEndpointHandler = require('./lib/SingleEndpointHandler')

exports.handler = (event, context) => {
  const statusRepository = new StatusRepository()
  const requestService = new RequestService()

  return SingleEndpointHandler.handler(event, context, requestService, statusRepository)
}
