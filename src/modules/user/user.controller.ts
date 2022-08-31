import { getCustomRepository } from "typeorm";
import { checkDailyTrafficSchema } from "../cashier/cashier.schema";
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
      const user = await uR.getUser(req.params.id);
      if(user.banned){
        return reply.code(201).send("User has been banned")
      }
      return reply.code(200).send(user)
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
      return await uR.purchaseProducts(req.params.user_id, req.body.cashier_id, req.body.amounts, req.body.discount, req.body.granted);
    }
    catch(e){
      console.error(e);
    }
  }

  const getAllPurchasesFromUser = async (req, reply) => {
    try {
      return await uR.getAllPurchasesFromUser(req.params.id);
    }
    catch(e) {
      console.error(e);
    }
  }

  const changePassword = async (req, reply) => {
    try {
      return await uR.changePassword(req.params.id, req.body.new_pass)
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
    purchaseProduct,
    getAllPurchasesFromUser,
    changePassword
  }
}