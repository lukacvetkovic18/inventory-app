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
  printDataSchema
} from "./cashier.schema";
import { Admin } from "../admin/admin.entity";


export default async (fastify, opts) =>{
  const cashierRepo: Repository<Cashier> = fastify.db.getRepository(Cashier);
  const adminRepo: Repository<Admin> = fastify.db.getRepository(Admin);
  
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

  fastify.post("/cashiers/auth", { schema: cashierAuth, }, async ( req, res, ) => {
    const cashier = await cashierRepo.findOne({where: {
      email: req.body.email
    }});
    const admin = await adminRepo.findOne({where: {
      email: req.body.email 
    }});
    if (cashier) {
      if (!req.body.password) {
        return res.code(401).send({message: "Password wasn't sent"})
      }
      if (!cashier.comparePassword(req.body.password)) {
        return res.code(401).send({message: "Sent password doesn't match database password"})
      }
      else{
         const token = await fastify.jwt.sign({email: cashier.email, role: cashier.role})
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
      return res.code(401).send({message: "Cashier not found"});
    }
   }
   )
}