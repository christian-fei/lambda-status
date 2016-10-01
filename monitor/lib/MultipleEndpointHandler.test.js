'use strict'

const MultipleEndpointHandler = require('./MultipleEndpointHandler')
const RequestHandler = require('./RequestHandler')
const LambdaService = require('./LambdaService')



const testRequestService = {request: () => Promise.resolve({statusCode: 200, elapsedTime: 50})}
const testStatusRepository = {insert: () => Promise.resolve()}

const testEvent = {
  "base": "https://example.org",
  "endpoints": ["/", "/other"]
}
const testContext = {done:() => Promise.resolve(), succeed:() => Promise.resolve(), fail:() => Promise.resolve()}

describe('MultipleEndpointHandler', () => {
  it('invokes lambda and ', () => {
    const mockRequestHandler = sinon.mock(RequestHandler)
    const lambdaService = sinon.mock(new LambdaService())
    const nextEvent = { base: "https://example.org", endpoints: ["/"] }
    mockRequestHandler.expects('handler').returns(Promise.resolve())
    lambdaService.expects('invoke').withArgs(nextEvent, testContext).returns(Promise.resolve())

    return MultipleEndpointHandler.handler(testEvent, testContext, testRequestService, testStatusRepository, lambdaService.object)
    .then(() => {
      mockRequestHandler.verify()
      lambdaService.verify()
    })
  })
})
