
import { Repository } from "typeorm";
import { User } from "./user.entity";
import userController from "./user.controller";
import {
  getUsersSchema,
  getUserSchema,
  postUserSchema,
  deleteUserSchema,
  putUserSchema,
  userAuth,
  purchaseProductsSchema,
  changePasswordSchema,
  userGenMfa,
  userCompMfa,
  userMfaAuth,
  getAllPurchasesFromUserSchema
} from "./user.schema";
import { Admin } from "../admin/admin.entity";
import { generateKey, generateToken, generateTotpUri, verifyToken } from "authenticator";
import { toDataURL } from "qrcode";


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
    url: "/users/purchase/:user_id",
    handler: (await userCtl).purchaseProduct,
    schema: purchaseProductsSchema,
    preValidation: [fastify.userACL]
  })

  fastify.route({
    method: "GET",
    url: "/users/purchases/:id",
    handler: (await userCtl).getAllPurchasesFromUser,
    schema: getAllPurchasesFromUserSchema,
    preValidation: [fastify.adminACL]
  });

  fastify.post("/users/generateMfa", { schema: userGenMfa },async (req, res) => {
    const user = await userRepo.findOne({where: {
      email: req.body.email
    }});
    if(!user) {
      return res.code(401).send( "User not found" )
    }
    let formattedKey = generateKey();
    console.log(formattedKey)
    let formattedToken = generateToken(formattedKey);
    verifyToken(formattedKey, formattedToken);

    let key = formattedKey.replace(/\W/g, '').toLowerCase();
    let link = "otpauth://totp/{{NAME}}?secret={{KEY}}";
    const uri = generateTotpUri(formattedKey, req.body.email, "Google", "SHA1", 6, 30);

    await userRepo
    .createQueryBuilder()
    .update(User)
    .set({ mfaToken: formattedKey })
    .where("email = :email", { email: req.body.email })
    .execute()
    console.log(await toDataURL(link.replace(/{{NAME}}/g, req.body.email).replace(/{{KEY}}/g, key)))
    return res.code(200).send( "Generated mfa token" )
  })

  fastify.post("/users/compareMfa",{ schema: userCompMfa }, async (req, res) => {
    const user = await userRepo.findOne({where: {
      email: req.body.email
    }});
    if(!user) {
      return res.code(401).send({ message: "User not found" })
    }
    const key = user.mfaToken;
    const enteredKey = req.body.mfaToken;

    const token = verifyToken(key, enteredKey)
    console.log(token)
    if(token != null) {
      return res.code(200).send({ isValid: true });
    }
    return res.code(404).send({ isValid: false })
  })

  fastify.post("/users/authMfa", { schema: userMfaAuth, }, async ( req, res, ) => {
    const user = await userRepo.findOne({where: {
      email: req.body.email
    }});
    if (!user) {
      return res.code(401).send({message: "User not found"});
    }
    if(user.banned) {
      return res.code(403).send({message: "User with requested email is banned"})
    }
    if (!req.body.mfaToken) {
      return res.code(401).send({message: "Token wasn't sent"})
    }
    if ((verifyToken(user.mfaToken, req.body.mfaToken))===null) {
      return res.code(401).send({message: "Sent token doesn't match database token"})
    }
    else {
      const token = await fastify.jwt.sign({email: user.email, role: user.role})
      return res.send({token: token});
    }
   }
   )


  fastify.post("/users/auth", 
  { schema: userAuth,
    config: {
      rateLimit: {
        max: 3,
        timeWindow:'1 minute'
      }
    }
  }, 
  async ( req, res, ) => {
    const user = await userRepo.findOne({where: {
      email: req.body.email
    }});
    if (!user) {
      return res.code(401).send({message: "User not found"});
    }
    if(user.banned) {
      return res.code(403).send({message: "User with requested email is banned"})
    }
    if (!req.body.password) {
      return res.code(401).send({message: "Password wasn't sent"})
    }
    if (!await user.comparePassword(req.body.password)) {
      return res.code(401).send({message: "Sent password doesn't match database password"})
    }
    else {
      const token = await fastify.jwt.sign({email: user.email, role: user.role})
      return res.send({token: token});
    }
   }
   )

   fastify.route({
    method: "PUT",
    url: "/users/changePass/:id",
    handler: (await userCtl).changePassword,
    schema: changePasswordSchema,
    preValidation: [fastify.userACL]
  })
}