'use strict'

const MultipleEndpointHandler = require('./MultipleEndpointHandler')
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
    const lambdaService = sinon.mock(new LambdaService())
    const nextEvent = { base: "https://example.org", endpoints: ["/"] }
    lambdaService.expects('invoke').withArgs(nextEvent, testContext).returns(Promise.resolve())

    return MultipleEndpointHandler.handler(testEvent, testContext, testRequestService, testStatusRepository, lambdaService.object)
    .then((returnValue) => {
      expect(returnValue).to.eql({"url": "https://example.org/other"})
      lambdaService.verify()
    })
  })
})
