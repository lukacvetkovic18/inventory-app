import { Repository } from "typeorm";
import {
  getProductsSchema,
  getProductSchema,
} from "./product.schema";
import { Product } from "./product.entity";
import productController from "./product.controller";

export default async (fastify, opts) =>{
  const productCtl = productController(fastify);
  
  fastify.route({
    method: "GET",
    url: "/products",
    handler: (await productCtl).getProducts,
    schema: getProductsSchema,
  });
  
  fastify.route({
    method: "GET",
    url: "/products/:id",
    handler: (await productCtl).getProduct,
    schema: getProductSchema,
  });
}