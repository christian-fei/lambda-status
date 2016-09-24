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
    const from = parseFrom(request.url.query.from)
    return StatusRepository.latest(from)
    .then((results) => {
      reply(results)
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


function parseFrom(from) {
  if(!from) {
    return
  }
  const hours = 1000*60*60
  const days = hours*24
  const weeks = days*7
  if(/\d+hago/.test(from)) {
    const hoursAgo = from.match(/(\d)+hago/)[1]
    return Date.now()-hours*hoursAgo
  }
  if(/\d+dago/.test(from)) {
    const daysAgo = from.match(/(\d)+dago/)[1]
    return Date.now()-days*daysAgo
  }
  if(/\d+wago/.test(from)) {
    const weeksAgo = from.match(/(\d)+wago/)[1]
    return Date.now()-weeks*weeksAgo
  }
}
