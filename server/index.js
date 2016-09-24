'use strict'

const Hapi = require('hapi')
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 3000
})
server.register(require('inert'), (err) => {
  if (err) {
    throw err
  }
})
server.route({
  method: 'GET',
  path:'/',
  handler: function (request, reply) {
    return reply.file('./index.html');
  }
})
server.route({
  method: 'GET',
  path:'/assets/index.js',
  handler: function (request, reply) {
    return reply.file('./assets/index.js');
  }
})
server.route({
  method: 'GET',
  path:'/statuses',
  handler: function (request, reply) {
    return reply({
      data: [{
        statusCode: 200,
        responseTime: 100,
      },{
        statusCode: 200,
        responseTime: 67,
      },{
        statusCode: 200,
        responseTime: 54,
      },{
        statusCode: 200,
        responseTime: 97,
      },{
        statusCode: 200,
        responseTime: 55,
      },{
        statusCode: 200,
        responseTime: 130,
      },{
        statusCode: 200,
        responseTime: 89,
      },]
    }).code(200);
  }
})
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
