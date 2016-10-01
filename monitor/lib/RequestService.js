'use strict'

const requestPromise = require('request-promise')

module.exports = class RequestService {
  request(params) {
    return requestPromise(requestParams)
  }
}
