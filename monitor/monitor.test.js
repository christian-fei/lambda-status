const monitor = require('./monitor')
const SingleEndpointHandler = require('./lib/SingleEndpointHandler')
const MultipleEndpointHandler = require('./lib/MultipleEndpointHandler')

const event = require('./event.json')
const eventMultipleEndpoints = require('./event.multiple-endpoints.json')

describe('monitor', function () {
  describe('event to monitor single endpoint', function () {
    it('delegates to SingleEndpointHandler', function () {
      const context = {done: () => Promise.resolve(), succeed: () => Promise.resolve(), fail: () => Promise.reject()}

      const mockHandler = sinon.mock(SingleEndpointHandler)
      mockHandler.expects('handler').returns(Promise.resolve())

      monitor.handler(event, context)

      mockHandler.verify()
    })
  })

  describe('event to monitor multiple endpoint', function () {
    it('delegates to MultipleEndpointHandler', function () {
      const context = {done: () => Promise.resolve(), succeed: () => Promise.resolve(), fail: () => Promise.reject()}

      const mockHandler = sinon.mock(MultipleEndpointHandler)
      mockHandler.expects('handler').returns(Promise.resolve())

      monitor.handler(eventMultipleEndpoints, context)

      mockHandler.verify()
    })
  })
})
