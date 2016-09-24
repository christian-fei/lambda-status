'use strict'

const Hapi = require('hapi')
const StatusRepository = require('../lib/StatusRepository')

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
  path:'/assets/index.css',
  handler: function (request, reply) {
    return reply.file('./assets/index.css');
  }
})
server.route({
  method: 'GET',
  path:'/statuses',
  handler: function (request, reply) {
    return StatusRepository.latest()
    .then((x) => {
      console.log('-- then', x)
      reply(x)
    })
    .catch((err) => {
      console.log('-- catch', err.message)
      reply({}).code(500)
    })
  }
})
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
