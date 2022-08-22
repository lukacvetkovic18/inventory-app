import { Repository } from "typeorm";
import { Admin } from "./admin.entity";
import adminController from "./admin.controller";
import {
  getAdminsSchema,
  getAdminSchema,
  postAdminSchema,
  deleteAdminSchema,
  putAdminSchema,
  adminAuth,
  whoamischema
} from "./admin.schema";


export default async (fastify, opts) =>{
  const adminRepo: Repository<Admin> = fastify.db.getRepository(Admin);
  
  const adminCtl = adminController(fastify);
  
  fastify.route({
    method: "GET",
    url: "/admins",
    handler: (await adminCtl).getAdmins,
    schema: getAdminsSchema,
    preValidation: [fastify.superAdminACL]
  });
  
  fastify.route({
    method: "GET",
    url: "/admins/:id",
    handler: (await adminCtl).getAdmin,
    schema: getAdminSchema,
    preValidation: [fastify.superAdminACL]
  });
  
  fastify.route({
    method: "POST",
    url: "/admins",
    handler: (await adminCtl).addAdmin,
    schema: postAdminSchema,
    //preValidation: [fastify.superAdminACL]
  });
  
  fastify.route({
    method: "DELETE",
    url: "/admins/:id",
    handler: (await adminCtl).deleteAdmin,
    schema: deleteAdminSchema,
    preValidation: [fastify.superAdminACL]
  });
  
  fastify.route({
    method: "PUT",
    url: "/admins/:id",
    handler: (await adminCtl).updateAdmin,
    schema: putAdminSchema,
    preValidation: [fastify.superAdminACL]
  })

  fastify.post("/admins/auth", { schema: adminAuth, }, async ( req, res, ) => {
    const admin = await adminRepo.findOne({where: {
      email: req.body.email
    }});
    if (!admin) {
      return res.code(401).send({message: "Admin not found"});
    }
    if (!req.body.password) {
      return res.code(401).send({message: "Password wasn't sent"})
    }
    if (!admin.comparePassword(req.body.password)) {
      return res.code(401).send({message: "Sent password doesn't match database password"})
    }
    else {
      const token = await fastify.jwt.sign({email: admin.email, role: admin.role})
      return res.send({token: token});
    }
   }
   )

   fastify.route({
    method: "GET",
    url: "/whoami",
    handler: (await adminCtl).test,
    schema: whoamischema,
    preValidation: fastify.getRole
   })
}