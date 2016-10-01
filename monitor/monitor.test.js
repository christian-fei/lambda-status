const monitor = require('./monitor')
const SingleEndpointHandler = require('./lib/SingleEndpointHandler')

describe('monitor', function () {
  describe('event to monitor single endpoint', function () {
    it('delegates to SingleEndpointHandler', function () {
      const event = {url:'http://any.com'}
      const context = {done: () => Promise.resolve(), succeed: () => Promise.resolve(), fail: () => Promise.reject()}

      const mockHandler = sinon.mock(SingleEndpointHandler)
      mockHandler.expects('handler').returns(Promise.resolve())

      monitor.handler(event, context)

      mockHandler.verify()
    })
  })
})
