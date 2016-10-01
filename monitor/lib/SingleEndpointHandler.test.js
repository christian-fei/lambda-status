'use strict'

const SingleEndpointHandler = require('./SingleEndpointHandler')
const StatusRepository = require('./StatusRepository')
const RequestService = require('./RequestService')

let statusRepository, requestService
const event = {url:'http://any.com'}
const context = {done:() => Promise.resolve(), succeed:() => Promise.resolve(), fail:() => Promise.resolve()}

describe('SingleEndpointHandler', () => {
  beforeEach(function () {
    statusRepository = new StatusRepository()
    requestService = new RequestService()
  })

  it('makes request', () => {
    const mockRequestService = sinon.mock(requestService)
    const mockStatusRepository = sinon.mock(statusRepository)
    mockRequestService.expects('request').returns(Promise.resolve({statusCode: 200, elapsedTime: 34}))
    mockStatusRepository.expects('insert').returns(Promise.resolve())

    return SingleEndpointHandler.handler(event, context, requestService, statusRepository)
    .then(() => {
      mockRequestService.verify()
      mockStatusRepository.verify()
    })
  })
})
