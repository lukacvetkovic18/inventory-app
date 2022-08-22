import { getCustomRepository } from "typeorm";
import { ProductRespository } from "./product.repository";

export default async (server) =>{
  const pR = getCustomRepository(ProductRespository);
  
  const getProducts = async (req, reply) => {
    try {
      return await pR.getProducts();
    }
    catch(e){
      console.error(e);
    }
  }

  const getProduct = async (req, reply) => {
    try {
      return reply.send(await pR.getProduct(req.params.id));
    }
    catch(e){
      console.error(e);
    }
  }
 
  return {
    getProducts,
    getProduct
  }
}