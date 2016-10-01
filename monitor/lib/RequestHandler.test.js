'use strict'

const RequestHandler = require('./RequestHandler')
const StatusRepository = require('./StatusRepository')
const RequestService = require('./RequestService')

const event = {url:'http://any.com'}
const context = {done:() => Promise.resolve(), succeed:() => Promise.resolve(), fail:() => Promise.resolve()}

describe('RequestHandler', () => {
  it('makes request and saves status', () => {
    const statusRepository = new StatusRepository()
    const requestService = new RequestService()
    const mockRequestService = sinon.mock(requestService)
    const mockStatusRepository = sinon.mock(statusRepository)
    mockRequestService.expects('request').returns(Promise.resolve({statusCode: 200, elapsedTime: 34}))
    mockStatusRepository.expects('insert').returns(Promise.resolve())

    return RequestHandler.handler(event, context, requestService, statusRepository)
    .then(() => {
      mockRequestService.verify()
      mockStatusRepository.verify()
    })
  })
})
