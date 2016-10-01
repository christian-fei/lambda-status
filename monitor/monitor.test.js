const monitor = require('./monitor')
const RequestHandler = require('./lib/RequestHandler')
const MultipleEndpointHandler = require('./lib/MultipleEndpointHandler')

const event = require('./event.json')
const eventMultipleEndpoints = require('./event.multiple-endpoints.json')

describe('monitor', function () {
  describe('event to monitor single endpoint', function () {
    it('delegates to RequestHandler', function () {
      const context = {done: () => Promise.resolve(), succeed: () => Promise.resolve(), fail: () => Promise.reject()}

      const mockRequestHandler = sinon.mock(RequestHandler)
      mockRequestHandler.expects('handler').returns(Promise.resolve())

      monitor.handler(event, context)

      mockRequestHandler.verify()
    })
  })

  describe('event to monitor multiple endpoint', function () {
    it('delegates to MultipleEndpointHandler', function () {
      const context = {done: () => Promise.resolve(), succeed: () => Promise.resolve(), fail: () => Promise.reject()}

      const mockMultipleEndpointHandler = sinon.mock(MultipleEndpointHandler)
      mockMultipleEndpointHandler.expects('handler').returns(Promise.resolve({url: "https://example.org/other"}))
      const mockRequestHandler = sinon.mock(RequestHandler)
      mockRequestHandler.expects('handler').returns(Promise.resolve())

      return monitor.handler(eventMultipleEndpoints, context)
      .then(() => {
        mockMultipleEndpointHandler.verify()
        mockRequestHandler.verify()
      })
    })
  })
})
