'use strict'
const installer = require('./installer')
const greeter = require('./greeter')
const chooseTableName = require('./choose-table-name')

describe('installer', () => {
  it('interacts correctly', () => {
    const mockGreeter = sinon.mock(greeter)
    const mockChooseTableName = sinon.mock(chooseTableName)
    mockGreeter.expects('execute').returns(Promise.resolve())
    mockChooseTableName.expects('execute').returns(Promise.resolve())

    return installer
    .start()
    .then(verifyMock(mockGreeter))
    .then(verifyMock(mockChooseTableName))
  })

  function verifyMock(mock) {
    return (value) => {
      mock.verify()
      return value
    }
  }
})
