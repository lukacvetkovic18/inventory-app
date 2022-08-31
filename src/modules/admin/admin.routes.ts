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
  whoamischema,
  banUserSchema,
  changePasswordSchema,
  adminGenMfa,
  adminCompMfa,
  adminMfaAuth
} from "./admin.schema";
import { generateKey, generateToken, generateTotpUri, verifyToken } from "authenticator";
import { toDataURL } from "qrcode";


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
    preValidation: [fastify.superAdminACL]
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

  fastify.route({
    method: "PUT",
    url: "/admins/banUser",
    handler: (await adminCtl).banUser,
    schema: banUserSchema,
    preValidation: [fastify.superAdminACL]
  })

  fastify.post("/admins/generateMfa", { schema: adminGenMfa },async (req, res) => {
    const admin = await adminRepo.findOne({where: {
      email: req.body.email
    }});
    if(!admin) {
      return res.code(401).send( "Admin not found" )
    }
    let formattedKey = generateKey();
    console.log(formattedKey)
    let formattedToken = generateToken(formattedKey);
    verifyToken(formattedKey, formattedToken);

    let key = formattedKey.replace(/\W/g, '').toLowerCase();
    let link = "otpauth://totp/{{NAME}}?secret={{KEY}}";
    const uri = generateTotpUri(formattedKey, req.body.email, "Google", "SHA1", 6, 30);

    await adminRepo
    .createQueryBuilder()
    .update(Admin)
    .set({ mfaToken: formattedKey })
    .where("email = :email", { email: req.body.email })
    .execute()
    console.log(await toDataURL(link.replace(/{{NAME}}/g, req.body.email).replace(/{{KEY}}/g, key)))
    return res.code(200).send( "Generated mfa token" )
  })

  fastify.post("/admins/compareMfa",{ schema: adminCompMfa }, async (req, res) => {
    const admin = await adminRepo.findOne({where: {
      email: req.body.email
    }});
    if(!admin) {
      return res.code(401).send({ message: "Admin not found" })
    }
    const key = admin.mfaToken;
    const enteredKey = req.body.mfaToken;

    const token = verifyToken(key, enteredKey)
    console.log(token)
    if(token != null) {
      return res.code(200).send({ isValid: true });
    }
    return res.code(404).send({ isValid: false })
  })

  fastify.post("/admins/authMfa", { schema: adminMfaAuth, }, async ( req, res, ) => {
    const admin = await adminRepo.findOne({where: {
      email: req.body.email
    }});
    if (!admin) {
      return res.code(401).send({message: "Admin not found"});
    }
    if(admin.banned) {
      return res.code(403).send({message: "Admin with requested email is banned"})
    }
    if (!req.body.mfaToken) {
      return res.code(401).send({message: "Token wasn't sent"})
    }
    if ((verifyToken(admin.mfaToken, req.body.mfaToken))===null) {
      return res.code(401).send({message: "Sent token doesn't match database token"})
    }
    else {
      const token = await fastify.jwt.sign({email: admin.email, role: admin.role})
      return res.send({token: token});
    }
   }
   )

  fastify.post("/admins/auth", { schema: adminAuth, }, async ( req, res, ) => {
    const admin = await adminRepo.findOne({where: {
      email: req.body.email
    }});
    if (!admin) {
      return res.code(401).send({message: "Admin not found"});
    }
    if(admin.banned) {
      return res.code(403).send({message: "Admin with requested email is banned"})
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

   fastify.route({
    method: "PUT",
    url: "/admins/changePass/:id",
    handler: (await adminCtl).changePassword,
    schema: changePasswordSchema,
    preValidation: [fastify.adminACL]
  })
}