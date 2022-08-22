import { getCustomRepository } from "typeorm";
import { PurchaseRespository } from "./purchase.repository";

export default async (server) =>{
  const pR = getCustomRepository(PurchaseRespository);
  
  const getPurchases = async (req, reply) => {
    try {
      return await pR.getPurchases();
    }
    catch(e){
      console.error(e);
    }
  }

  const getPurchase = async (req, reply) => {
    try {
      return reply.send(await pR.getPurchase(req.params.id));
    }
    catch(e){
      console.error(e);
    }
  }
 
  return {
    getPurchases,
    getPurchase
  }
}