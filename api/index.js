'use strict'

const ApiBuilder = require('claudia-api-builder')
const api = new ApiBuilder()

exports.handler = api

api.get('/', function (request) {
  return 'Ok'
})

api.get('/statuses', function (request) {
  return Promise.resolve([])
})
