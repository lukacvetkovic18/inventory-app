import { Repository } from "typeorm";
import {
  getWorkersSchema,
  getWorkerSchema,
  postWorkerSchema,
  deleteWorkerSchema,
  putWorkerSchema,
  workerAuth,
  transferProductsSchema,
  changePasswordSchema,
  workerGenMfa,
  workerCompMfa,
  workerMfaAuth
} from "./warehouseWorker.schema";
import { WarehouseWorker } from "./warehouseWorker.entity";
import warehouseWorkerController from "./warehouseWorker.controller";
import { generateKey, generateToken, generateTotpUri, verifyToken } from "authenticator";
import { toDataURL } from "qrcode";


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

  fastify.post("/warehouseWorkers/generateMfa", { schema: workerGenMfa },async (req, res) => {
    const worker = await workerRepo.findOne({where: {
      email: req.body.email
    }});
    if(!worker) {
      return res.code(401).send( "Warehouse worker not found" )
    }
    let formattedKey = generateKey();
    console.log(formattedKey)
    let formattedToken = generateToken(formattedKey);
    verifyToken(formattedKey, formattedToken);

    let key = formattedKey.replace(/\W/g, '').toLowerCase();
    let link = "otpauth://totp/{{NAME}}?secret={{KEY}}";
    const uri = generateTotpUri(formattedKey, req.body.email, "Google", "SHA1", 6, 30);

    await workerRepo
    .createQueryBuilder()
    .update(WarehouseWorker)
    .set({ mfaToken: formattedKey })
    .where("email = :email", { email: req.body.email })
    .execute()
    console.log(await toDataURL(link.replace(/{{NAME}}/g, req.body.email).replace(/{{KEY}}/g, key)))
    return res.code(200).send( "Generated mfa token" )
  })

  fastify.post("/warehouseWorkers/compareMfa",{ schema: workerCompMfa }, async (req, res) => {
    const worker = await workerRepo.findOne({where: {
      email: req.body.email
    }});
    if(!worker) {
      return res.code(401).send({ message: "Warehouse worker not found" })
    }
    const key = worker.mfaToken;
    const enteredKey = req.body.mfaToken;

    const token = verifyToken(key, enteredKey)
    console.log(token)
    if(token != null) {
      return res.code(200).send({ isValid: true });
    }
    return res.code(404).send({ isValid: false })
  })

  fastify.post("/warehouseWorkers/authMfa", { schema: workerMfaAuth, }, async ( req, res, ) => {
    const worker = await workerRepo.findOne({where: {
      email: req.body.email
    }});
    if (!worker) {
      return res.code(401).send({message: "Warehouse worker not found"});
    }
    if(worker.banned) {
      return res.code(403).send({message: "Warehouse worker with requested email is banned"})
    }
    if (!req.body.mfaToken) {
      return res.code(401).send({message: "Token wasn't sent"})
    }
    if ((verifyToken(worker.mfaToken, req.body.mfaToken))===null) {
      return res.code(401).send({message: "Sent token doesn't match database token"})
    }
    else {
      const token = await fastify.jwt.sign({email: worker.email, role: worker.role})
      return res.send({token: token});
    }
   }
   )


  fastify.post("/warehouseWorkers/auth", { schema: workerAuth }, async ( req, res, ) => {
    const worker = await workerRepo.findOne({where: {
      email: req.body.email
    }});
    if (!worker) {
      return res.code(401).send({message: "Warehouse worker not found"});
    }
    if(worker.banned) {
      return res.code(403).send({message: "Warehouse worker with requested email is banned"})
    }
    if (!req.body.password) {
      return res.code(401).send({message: "Password wasn't sent"})
    }
    if (!await worker.comparePassword(req.body.password)) {
      return res.code(401).send({message: "Sent password doesn't match database password"})
    }
    else {
      const token = await fastify.jwt.sign({email: worker.email, role: worker.role})
      return res.send({token: token});
    }
   }
   )

   fastify.route({
    method: "PUT",
    url: "/warehouseWorkers/changePass/:id",
    handler: (await workerCtl).changePassword,
    schema: changePasswordSchema,
    preValidation: [fastify.workerACL]
  })
}