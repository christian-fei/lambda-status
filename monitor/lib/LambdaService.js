'use strict'

const aws = require('aws-sdk')
const lambda = new aws.Lambda()

module.exports = class LamdbaService {
  invoke(event, context) {
    console.log('-- LamdbaService.invoke', event, context)
    return new Promise((resolve, reject) => {
      lambda.invoke({
        FunctionName: context.lambdaContext.functionName,
        InvocationType: 'Event',
        Payload: JSON.stringify(event),
        Qualifier: context.lambdaContext.functionVersion
      }, (err, done) => {
        return err ? reject(err) : resolve()
      })
    })
  }
}
