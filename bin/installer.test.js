'use strict'
const installer = require('./installer')
const greeter = require('./greeter')
const checkAwsConfiguration = require('./check-aws-configuration')
const chooseProjectName = require('./choose-project-name')
const saveProjectName = require('./save-project-name')
const chooseTableName = require('./choose-table-name')
const saveTableName = require('./save-table-name')
const createTable = require('./create-table')
const chooseEndpointToMonitor = require('./choose-endpoint-to-monitor')
const saveEndpointToMonitor = require('./save-endpoint-to-monitor')
const chooseMonitorInterval = require('./choose-monitor-interval')
const installDependencies = require('./install-dependencies')
const createMonitorLambda = require('./create-monitor-lambda')
const createScheduledEvent = require('./create-scheduled-event')
const createApi = require('./create-api')
const outro = require('./outro')

describe('installer', () => {
  it('interacts correctly', () => {
    const mockGreeter = mockAction(greeter)
    const mockChooseProjectName = mockAction(chooseProjectName, 'example-org-status')
    const mockSaveProjectName = mockAction(saveProjectName)
    const mockCheckAwsConfiguration = mockAction(checkAwsConfiguration)
    const mockChooseTableName = mockAction(chooseTableName, 'test-table')
    const mockSaveTableName = mockAction(saveTableName, 'test-table')
    const mockCreateTable = mockActionWithArgs(createTable, 'test-table')
    const mockChooseEndpointToMonitor = mockAction(chooseEndpointToMonitor, 'https://example.org')
    const mockSaveEndpointToMonitor = mockActionWithArgs(saveEndpointToMonitor, 'https://example.org')
    const mockChooseMonitorInterval = mockAction(chooseMonitorInterval)
    const mockInstallDependencies = mockAction(installDependencies)
    const mockCreateMonitorLambda = mockAction(createMonitorLambda)
    const mockCreateScheduledEvent = mockAction(createScheduledEvent)
    const mockCreateApi = mockAction(createApi)
    const mockOutro = mockAction(outro)

    return installer.start()

    .then(verifyMock(mockGreeter))
    .then(verifyMock(mockChooseProjectName))
    .then(verifyMock(mockSaveProjectName))
    .then(verifyMock(mockCheckAwsConfiguration))
    .then(verifyMock(mockChooseTableName))
    .then(verifyMock(mockSaveTableName))
    .then(verifyMock(mockCreateTable))
    .then(verifyMock(mockChooseEndpointToMonitor))
    .then(verifyMock(mockSaveEndpointToMonitor))
    .then(verifyMock(mockChooseMonitorInterval))
    .then(verifyMock(mockInstallDependencies))
    .then(verifyMock(mockCreateMonitorLambda))
    .then(verifyMock(mockCreateScheduledEvent))
    .then(verifyMock(mockCreateApi))
    .then(verifyMock(mockOutro))
  })

  function verifyMock(mock) {
    return (value) => {
      mock.verify()
      return value
    }
  }

  function mockAction(action, returnValue) {
    return sinon.mock(action).expects('execute').returns(Promise.resolve(returnValue))
  }

  function mockActionWithArgs(action, args, returnValue) {
    return sinon.mock(action).expects('execute').withArgs(args).returns(Promise.resolve(returnValue))
  }
})
