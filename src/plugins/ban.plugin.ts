import fp from "fastify-plugin";
const fastifyRateLimit = require('fastify-rate-limit');
export default fp (async ( fastify, opts, done) => {
  fastify.register(require('fastify-rate-limit'), {
    global: false,
    max: 3,
    timeWindow: '1 minute'
  })
  fastify.setErrorHandler(function (error, req, reply) {
    if(reply.statusCode === 429){
      reply.send('You entered wrong password too many time. User is permenantly banned.');
    }
  });
  done()
})