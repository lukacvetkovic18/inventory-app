import fp from "fastify-plugin";
import jwt, {fastifyJWT} from "fastify-jwt";

export default fp (async ( fastify, opts, done) =>{
  fastify.register( jwt, {
    secret: "nestotajno"
  });
  /*fastify.decorate('authenticate', async (req, reply) => {
    try {
      await req.jwtVerify();
    } catch (error){
      reply.send(error);
    }
  })*/

  fastify.decorate('adminACL', async (req, reply) => {
    try {
      const token = await req.jwtVerify()
      if (token.role !== 'Admin' && token.role !== 'SuperAdmin'){
        reply.send('Unauthorized')
      }else{}
    } catch (error){
      reply.send(error);
    }
  })

  fastify.decorate('superAdminACL',async (req, reply) => {
    try {
      const token = await req.jwtVerify()
      if (token.role !== 'SuperAdmin'){
        reply.send('Unauthorized')
      }else{}
    } catch (error){
      reply.send(error);
    }    
  })

  fastify.decorate('cashierACL', async (req, reply) => {
    try {
      const token = await req.jwtVerify()
      if (token.role !== 'Admin' && token.role !== 'SuperAdmin' && token.role !== 'Cashier'){
        reply.send('Unauthorized')
      }else{}
    } catch (error){
      reply.send(error);
    }
  })

  fastify.decorate('userACL', async (req, reply) => {
    try {
      const token = await req.jwtVerify()
      if (token.role !== 'Admin' && token.role !== 'SuperAdmin' && token.role !== 'User'){
        reply.send('Unauthorized')
      }else{}
    } catch (error){
      reply.send(error);
    }
  })

  fastify.decorate('workerACL', async (req, reply) => {
    try {
      const token = await req.jwtVerify()
      if (token.role !== 'Admin' && token.role !== 'SuperAdmin' && token.role !== 'WarehouseWorker'){
        reply.send('Unauthorized')
      }else{}
    } catch (error){
      reply.send(error);
    }
  })
  fastify.decorate("getRole", async (req, reply) =>{
    const token = await req.jwtVerify();
    reply.send(token.role);
  })
  done()
})