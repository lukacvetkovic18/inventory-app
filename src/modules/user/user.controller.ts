import { getCustomRepository } from "typeorm";
import { UserRepository } from "./user.repository";

export default async (server) =>{
  const uR = getCustomRepository(UserRepository);
  
  const getUsers = async (req, reply) => {
    try {
      return await uR.getUsers();
    }
    catch(e){
      console.error(e);
    }
  }

  const getUser = async (req, reply) => {
    try {
      return reply.send(await uR.getUser(req.params.id));
    }
    catch(e){
      console.error(e);
    }
  }

  const addUser = async (req, reply) =>{
    try{
      return await uR.addUser(req.body);
    }
    catch(e){
      console.error(e);
    }
  }

  const deleteUser = async (req, reply) => {
    try {
      return await uR.deleteUser(req.params.id);
    }
    catch(e){
      console.error(e);
    }
  }

  const updateUser = async (req, reply) => {
    try {
      return await uR.updateUser(req.params.id, req.body);
    }
    catch(e){
      console.error(e);
    }
  }

  const purchaseProduct = async (req, reply) => {
    try {
      return await uR.purchaseProducts(req.params.user_id, req.body.cashier_id, req.body.product_ids, req.body.date);
    }
    catch(e){
      console.error(e);
    }
  }

  return {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
    purchaseProduct
  }
}