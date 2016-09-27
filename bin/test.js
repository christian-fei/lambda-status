'use strict'
const installer = require('./installer')
const greeter = require('./greeter')
const processWrapper = require('./process-wrapper')
const chooseTableName = require('./choose-table-name')
const createTable = require('./create-table')

describe('installer', () => {
  it('interacts correctly', () => {
    const mockProcess = sinon.mock(processWrapper)
    const mockGreeter = sinon.mock(greeter)
    const mockChooseTableName = sinon.mock(chooseTableName)
    const mockCreateTable = sinon.mock(createTable)
    mockGreeter.expects('execute').returns(Promise.resolve())
    mockChooseTableName.expects('execute').returns(Promise.resolve('test-status'))
    mockCreateTable.expects('execute').returns(Promise.resolve('test-status'))
    mockProcess.expects('exit').withArgs(0).returns(Promise.resolve())

    return installer.start()
    .then(verifyMock(mockGreeter))
    .then(verifyMock(mockChooseTableName))
    .then(verifyMock(mockCreateTable))
    .then(verifyMock(mockProcess))
  })

  function verifyMock(mock) {
    return (value) => {
      mock.verify()
      return value
    }
  }
})
