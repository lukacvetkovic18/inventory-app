import { Repository } from "typeorm";
import { Cashier } from "./cashier.entity";
import cashierController from "./cashier.controller";
import {
  getCashiersSchema,
  getCashierSchema,
  postCashierSchema,
  deleteCashierSchema,
  putCashierSchema,
  checkStockSchema,
  checkDailyTrafficSchema,
  addProductSchema,
  removeProductSchema,
  returnMoneySchema,
  cashierAuth,
  checkTrafficSchema,
  printDataSchema,
  changePasswordSchema,
  cashierGenMfa,
  cashierCompMfa,
  cashierMfaAuth
} from "./cashier.schema";
import { generateKey, generateToken, generateTotpUri, verifyToken } from "authenticator";
import { toDataURL } from "qrcode";


export default async (fastify, opts) =>{
  const cashierRepo: Repository<Cashier> = fastify.db.getRepository(Cashier);
  
  const cashierCtl = cashierController(fastify);
  
  fastify.route({
    method: "GET",
    url: "/cashiers",
    handler: (await cashierCtl).getCashiers,
    schema: getCashiersSchema,
    preValidation: [fastify.adminACL]
  });
  
  fastify.route({
    method: "GET",
    url: "/cashiers/:id",
    handler: (await cashierCtl).getCashier,
    schema: getCashierSchema,
    preValidation: [fastify.adminACL]
  });
  
  fastify.route({
    method: "POST",
    url: "/cashiers",
    handler: (await cashierCtl).addCashier,
    schema: postCashierSchema,
    preValidation: [fastify.adminACL]

  });
  
  fastify.route({
    method: "DELETE",
    url: "/cashiers/:id",
    handler: (await cashierCtl).deleteCashier,
    schema: deleteCashierSchema,
    preValidation: [fastify.adminACL]
  });
  
  fastify.route({
    method: "PUT",
    url: "/cashiers/:id",
    handler: (await cashierCtl).updateCashier,
    schema: putCashierSchema,
    preValidation: [fastify.adminACL]
  })

  fastify.route({
    method: "GET",
    url: "/cashiers/stock/:id",
    handler: (await cashierCtl).checkStock,
    schema: checkStockSchema,
    preValidation: [fastify.cashierACL]
  });

  fastify.route({
    method: "GET",
    url: "/cashiers/dailyTraffic/:id/:date",
    handler: (await cashierCtl).checkDailyTraffic,
    schema: checkDailyTrafficSchema,
    preValidation: [fastify.cashierACL]
  })

  fastify.route({
    method: "POST",
    url: "/cashiers/addProduct/:id",
    handler: (await cashierCtl).addProduct,
    schema: addProductSchema,
    preValidation: [fastify.cashierACL]
  });

  fastify.route({
    method: "DELETE",
    url: "/cashiers/removeProduct/:cashier_id/:product_id",
    handler: (await cashierCtl).removeProduct,
    schema: removeProductSchema,
    preValidation: [fastify.cashierACL]
  });
  
  fastify.route({
    method: "PUT",
    url: "/cashiers/returnMoney/:cashier_id/:user_id",
    handler: (await cashierCtl).returnMoney,
    schema: returnMoneySchema,
    preValidation: [fastify.cashierACL]
  });

  fastify.route({
    method: "GET",
    url: "/cashiers/traffic/:id",
    handler: (await cashierCtl).checkTraffic,
    schema: checkTrafficSchema,
    preValidation: [fastify.cashierACL]
  })

  fastify.route({
    method: "GET",
    url: "/cashiers/print/:date",
    handler: (await cashierCtl).printData,
    schema: printDataSchema,
    preValidation: [fastify.cashierACL]
  })

  fastify.post("/cashiers/generateMfa", { schema: cashierGenMfa },async (req, res) => {
    const cashier = await cashierRepo.findOne({where: {
      email: req.body.email
    }});
    if(!cashier) {
      return res.code(401).send( "Cashier not found" )
    }
    let formattedKey = generateKey();
    console.log(formattedKey)
    let formattedToken = generateToken(formattedKey);
    verifyToken(formattedKey, formattedToken);

    let key = formattedKey.replace(/\W/g, '').toLowerCase();
    let link = "otpauth://totp/{{NAME}}?secret={{KEY}}";
    const uri = generateTotpUri(formattedKey, req.body.email, "Google", "SHA1", 6, 30);

    await cashierRepo
    .createQueryBuilder()
    .update(Cashier)
    .set({ mfaToken: formattedKey })
    .where("email = :email", { email: req.body.email })
    .execute()
    console.log(await toDataURL(link.replace(/{{NAME}}/g, req.body.email).replace(/{{KEY}}/g, key)))
    return res.code(200).send( "Generated mfa token" )
  })

  fastify.post("/cashiers/compareMfa",{ schema: cashierCompMfa }, async (req, res) => {
    const cashier = await cashierRepo.findOne({where: {
      email: req.body.email
    }});
    if(!cashier) {
      return res.code(401).send({ message: "Cashier not found" })
    }
    const key = cashier.mfaToken;
    const enteredKey = req.body.mfaToken;

    const token = verifyToken(key, enteredKey)
    console.log(token)
    if(token != null) {
      return res.code(200).send({ isValid: true });
    }
    return res.code(404).send({ isValid: false })
  })

  fastify.post("/cashiers/authMfa", { schema: cashierMfaAuth, }, async ( req, res, ) => {
    const cashier = await cashierRepo.findOne({where: {
      email: req.body.email
    }});
    if (!cashier) {
      return res.code(401).send({message: "Cashier not found"});
    }
    if(cashier.banned) {
      return res.code(403).send({message: "Cashier with requested email is banned"})
    }
    if (!req.body.mfaToken) {
      return res.code(401).send({message: "Token wasn't sent"})
    }
    if ((verifyToken(cashier.mfaToken, req.body.mfaToken))===null) {
      return res.code(401).send({message: "Sent token doesn't match database token"})
    }
    else {
      const token = await fastify.jwt.sign({email: cashier.email, role: cashier.role})
      return res.send({token: token});
    }
   }
   )

  fastify.post("/cashiers/auth", { schema: cashierAuth, }, async ( req, res, ) => {
    const cashier = await cashierRepo.findOne({where: {
      email: req.body.email
    }});
    if (!cashier) {
      return res.code(401).send({message: "Cashier not found"});
    }
    if(cashier.banned) {
      return res.code(403).send({message: "Cashier with requested email is banned"})
    }
    if (!req.body.password) {
      return res.code(401).send({message: "Password wasn't sent"})
    }
    if (!await cashier.comparePassword(req.body.password)) {
      return res.code(401).send({message: "Sent password doesn't match database password"})
    }
    else {
      const token = await fastify.jwt.sign({email: cashier.email, role: cashier.role})
      return res.send({token: token});
    }
   }
   )

   fastify.route({
    method: "PUT",
    url: "/cashiers/changePass/:id",
    handler: (await cashierCtl).changePassword,
    schema: changePasswordSchema,
    preValidation: [fastify.cashierACL]
  })
}