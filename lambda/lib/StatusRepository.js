'use strict'

module.exports = {
  insert,
  latest
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

function latest(from) {
  const params = {}
  params.id = from || (Date.now() - 1000*60*60*3)
  params. loadingTime = null
  params.statusCode = null
  params.url = null
  const scanParams = scanParamsFrom(params.id)
  return new Promise((resolve, reject) => {
    client.scan(scanParams, function(err, data) {
      err ? reject(err) : resolve(data.Items)
    })
  })
}


function scanParamsFrom(id) {
  return {
    TableName: table,
    ExpressionAttributeNames: {
      "#id": "id"
    },
    ExpressionAttributeValues: {
      ":id": id
    },
    ProjectionExpression: "id, statusCode,  loadingTime",
    FilterExpression: "#id > :id"
  }
}
