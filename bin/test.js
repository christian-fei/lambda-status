'use strict'
const installer = require('./installer')
const greeter = require('./greeter')
const chooseTableName = require('./choose-table-name')
const saveTableName = require('./save-table-name')
const createTable = require('./create-table')
const chooseEndpointToMonitor = require('./choose-endpoint-to-monitor')
const saveEndpointToMonitor = require('./save-endpoint-to-monitor')
const installDependencies = require('./install-dependencies')
const outro = require('./outro')

describe('installer', () => {
  it('interacts correctly', () => {
    const mockGreeter = sinon.mock(greeter)
    const mockChooseTableName = sinon.mock(chooseTableName)
    const mockSaveTableName = sinon.mock(saveTableName)
    const mockCreateTable = sinon.mock(createTable)
    const mockChooseEndpointToMonitor = sinon.mock(chooseEndpointToMonitor)
    const mockSaveEndpointToMonitor = sinon.mock(saveEndpointToMonitor)
    const mockInstallDependencies = sinon.mock(installDependencies)
    const mockOutro = sinon.mock(outro)
    mockGreeter.expects('execute').returns(Promise.resolve())
    mockChooseTableName.expects('execute').returns(Promise.resolve('test-table'))
    mockSaveTableName.expects('execute').returns(Promise.resolve('test-table'))
    mockCreateTable.expects('execute').returns(Promise.resolve())
    mockChooseEndpointToMonitor.expects('execute').returns(Promise.resolve('https://example.org'))
    mockSaveEndpointToMonitor.expects('execute').returns(Promise.resolve())
    mockInstallDependencies.expects('execute').returns(Promise.resolve())
    mockOutro.expects('execute').returns(Promise.resolve())

    return installer.start()

    .then(verifyMock(mockGreeter))
    .then(verifyMock(mockChooseTableName))
    .then(verifyMock(mockSaveTableName))
    .then(verifyMock(mockCreateTable))
    .then(verifyMock(mockChooseEndpointToMonitor))
    .then(verifyMock(mockSaveEndpointToMonitor))
    .then(verifyMock(mockInstallDependencies))
    .then(verifyMock(mockOutro))
  })

  function verifyMock(mock) {
    return (value) => {
      mock.verify()
      return value
    }
  }
})
