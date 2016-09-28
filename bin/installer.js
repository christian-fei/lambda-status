'use strict'
const greeter = require('./greeter')
const chooseProjectName = require('./choose-project-name')
const saveProjectName = require('./save-project-name')
const checkAwsConfiguration = require('./check-aws-configuration')
const chooseTableName = require('./choose-table-name')
const createTable = require('./create-table')
const saveTableName = require('./save-table-name')
const chooseEndpointToMonitor = require('./choose-endpoint-to-monitor')
const saveEndpointToMonitor = require('./save-endpoint-to-monitor')
const installDependencies = require('./install-dependencies')
const createMonitorLambda = require('./create-monitor-lambda')
const chooseMonitorInterval = require('./choose-monitor-interval')
const chooseScheduledEvent = require('./create-scheduled-event')
const createApi = require('./create-api')
const outro = require('./outro')
const failure = require('./failure')

module.exports = {
  start: start
}

function start() {
  return greeter.execute()
  .then(chooseProjectName.execute)
  .then(saveProjectName.execute)
  .then(checkAwsConfiguration.execute)
  .then(chooseTableName.execute)
  .then(saveTableName.execute)
  .then(createTable.execute)
  .then(chooseEndpointToMonitor.execute)
  .then(saveEndpointToMonitor.execute)
  .then(installDependencies.execute)
  .then(createMonitorLambda.execute)
  .then(chooseMonitorInterval.execute)
  .then(chooseScheduledEvent.execute)
  .then(createApi.execute)
  .then(outro.execute)
  .catch(failure.execute)
}
