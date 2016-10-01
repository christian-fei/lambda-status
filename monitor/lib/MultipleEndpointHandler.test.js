'use strict'

const MultipleEndpointHandler = require('./MultipleEndpointHandler')
const SingleEndpointHandler = require('./SingleEndpointHandler')
const StatusRepository = require('./StatusRepository')
const RequestService = require('./RequestService')
const LambdaService = require('./LambdaService')

const event = {
  "base": "https://example.org",
  "endpoints": ["/", "/other"]
}

const context = {done:() => Promise.resolve(), succeed:() => Promise.resolve(), fail:() => Promise.resolve()}

const dummyRequestService = {request: () => Promise.resolve({statusCode: 200, elapsedTime: 50})}
const dummyStatusRepository = {insert: () => Promise.resolve()}

describe('MultipleEndpointHandler', () => {
  it('invokes lambda', () => {
    const lambdaService = sinon.mock(new LambdaService())
    lambdaService.expects('invoke').returns(Promise.resolve())

    return MultipleEndpointHandler.handler(event, context, dummyRequestService, dummyStatusRepository, lambdaService.object)
    .then(() => {
      lambdaService.verify()
    })
  })
})
