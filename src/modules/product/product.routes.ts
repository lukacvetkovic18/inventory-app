import {
  getProductsSchema,
  getProductSchema,
} from "./product.schema";
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