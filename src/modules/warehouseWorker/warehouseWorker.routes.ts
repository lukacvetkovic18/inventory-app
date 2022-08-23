import { Repository } from "typeorm";
import {
  getWorkersSchema,
  getWorkerSchema,
  postWorkerSchema,
  deleteWorkerSchema,
  putWorkerSchema,
  workerAuth,
  transferProductsSchema
} from "./warehouseWorker.schema";
import { WarehouseWorker } from "./warehouseWorker.entity";
import warehouseWorkerController from "./warehouseWorker.controller";


export default async (fastify, opts) =>{
  const workerRepo: Repository<WarehouseWorker> = fastify.db.getRepository(WarehouseWorker);
  
  const workerCtl = warehouseWorkerController(fastify);
  
  fastify.route({
    method: "GET",
    url: "/warehouseWorkers",
    handler: (await workerCtl).getWorkers,
    schema: getWorkersSchema,
    preValidation: [fastify.adminACL]
  });
  
  fastify.route({
    method: "GET",
    url: "/warehouseWorkers/:id",
    handler: (await workerCtl).getWorker,
    schema: getWorkerSchema,
    preValidation: [fastify.adminACL]
  });
  
  fastify.route({
    method: "POST",
    url: "/warehouseWorkers",
    handler: (await workerCtl).addWorker,
    schema: postWorkerSchema,
    preValidation: [fastify.adminACL]
  });
  
  fastify.route({
    method: "DELETE",
    url: "/warehouseWorkers/:id",
    handler: (await workerCtl).deleteWorker,
    schema: deleteWorkerSchema,
    preValidation: [fastify.adminACL]
  });
  
  fastify.route({
    method: "PUT",
    url: "/warehouseWorkers/:id",
    handler: (await workerCtl).updateWorker,
    schema: putWorkerSchema,
    preValidation: [fastify.adminACL]
  })

  fastify.route({
    method: "PUT",
    url: "/warehouseWorkers/transfer/:worker_id",
    handler: (await workerCtl).transferProducts,
    schema: transferProductsSchema,
    preValidation: [fastify.workerACL]
  })

  fastify.post("/warehouseWorkers/auth", { schema: workerAuth, }, async ( req, res, ) => {
    const worker = await workerRepo.findOne({where: {
      email: req.body.email
    }});
    if (!worker) {
      return res.code(401).send({message: "Warehouse worker not found"});
    }
    if (!req.body.password) {
      return res.code(401).send({message: "Password wasn't sent"})
    }
    if (!worker.comparePassword(req.body.password)) {
      return res.code(401).send({message: "Sent password doesn't match database password"})
    }
    else {
      const token = await fastify.jwt.sign({email: worker.email, role: worker.role})
      return res.send({token: token});
    }
   }
   )
}