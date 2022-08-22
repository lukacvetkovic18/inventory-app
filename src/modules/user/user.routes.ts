
import fastify from "fastify";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import userController from "./user.controller";
import {
  getUsersSchema,
  getUserSchema,
  postUserSchema,
  deleteUserSchema,
  putUserSchema,
  userAuth,
  purchaseProductsSchema
} from "./user.schema";
import { Admin } from "../admin/admin.entity";


export default async (fastify, opts) =>{
  const userRepo: Repository<User> = fastify.db.getRepository(User);
  const adminRepo: Repository<Admin> = fastify.db.getRepository(Admin);

  const userCtl = userController(fastify);
  
  fastify.route({
    method: "GET",
    url: "/users",
    handler: (await userCtl).getUsers,
    schema: getUsersSchema,
    preValidation: [fastify.adminACL]
  });
  
  fastify.route({
    method: "GET",
    url: "/users/:id",
    handler: (await userCtl).getUser,
    schema: getUserSchema,
    preValidation: [fastify.adminACL]
  });
  
  fastify.route({
    method: "POST",
    url: "/users",
    handler: (await userCtl).addUser,
    schema: postUserSchema,
    preValidation: [fastify.adminACL]
  });
  
  fastify.route({
    method: "DELETE",
    url: "/users/:id",
    handler: (await userCtl).deleteUser,
    schema: deleteUserSchema,
    preValidation: [fastify.adminACL]
  });
  
  fastify.route({
    method: "PUT",
    url: "/users/:id",
    handler: (await userCtl).updateUser,
    schema: putUserSchema,
    preValidation: [fastify.adminACL]
  })

  fastify.route({
    method: "POST",
    url: "/users/purchase/:id",
    handler: (await userCtl).purchaseProduct,
    schema: purchaseProductsSchema,
    preValidation: [fastify.userACL]
  })

  fastify.post("/users/auth", { schema: userAuth, }, async ( req, res, ) => {
    const user = await userRepo.findOne({where: {
      email: req.body.email
    }});
    const admin = await adminRepo.findOne({where: {
      email: req.body.email 
    }});
    if (user) {
      if (!req.body.password) {
        return res.code(401).send({message: "Password wasn't sent"})
      }
      if (!user.comparePassword(req.body.password)) {
        return res.code(401).send({message: "Sent password doesn't match database password"})
      }
      else{
         const token = await fastify.jwt.sign({email: user.email, role: user.role})
         return res.send({token: token});
       }
    }
    if (admin) {
      if (!req.body.password) {
        return res.code(401).send({message: "Password wasn't sent"})
      }
      if (!admin.comparePassword(req.body.password)) {
        return res.code(401).send({message: "Sent password doesn't match database password"})
      }
      else{
         const token = await fastify.jwt.sign({email: admin.email, role: admin.role})
         return res.send({token: token});
       }
    } else {
      return res.code(401).send({message: "User not found"});
    }
   }
   )
}