'use strict'

module.exports = {
  insert
}

const AWS = require('aws-sdk')
AWS.config.region = 'eu-central-1'
const client = new AWS.DynamoDB.DocumentClient()
const table = 'status'

function insert(item) {
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
