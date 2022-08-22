import { Repository } from "typeorm";
import purchaseController from "./purchase.controller";
import { Purchase } from "./purchase.entity";
import { 
  getPurchasesSchema,
  getPurchaseSchema
 } from "./purchase.schema";

export default async (fastify, opts) =>{
  const purchaseCtl = purchaseController(fastify);
  
  fastify.route({
    method: "GET",
    url: "/purchases",
    handler: (await purchaseCtl).getPurchases,
    schema: getPurchasesSchema,
  });
  
  fastify.route({
    method: "GET",
    url: "/purchases/:id",
    handler: (await purchaseCtl).getPurchase,
    schema: getPurchaseSchema,
  });
}