'use strict'

const exec = require('child_process').exec

module.exports = {
  execute: execute
}


function execute(tableName) {
  const command = '\
  aws dynamodb create-table \
  --region eu-central-1 \
  --table-name '+ tableName +' \
  --attribute-definitions AttributeName=id,AttributeType=N \
  --key-schema AttributeName=id,KeyType=HASH \
  --provisioned-throughput \
  ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --query TableDescription.TableArn \
  --output text'
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        console.log(`stderr: ${stderr}`)
        return reject(error)
      }
      console.log(`==> Successfully created table: ${tableName}`)
      console.log(`==> stdout: ${stdout}`)
      return resolve(stdout)
    })
  })
}
