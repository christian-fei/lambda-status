'use strict'

const AWS = require('aws-sdk')
AWS.config.region = 'eu-central-1'

module.exports = class StatusRepository {
  constructor(table) {
    this.client = new AWS.DynamoDB.DocumentClient()
    this.table = table || 'status'
  }

  insert(item) {
    const client = this.client
    const table = this.table

    const params = {
      TableName: table,
      Item: item
    }
    return new Promise((resolve, reject) => {
      client.put(params, function(err, data) {
        err ? reject(err) : resolve(data)
      })
    })
  }
}
