import { getCustomRepository } from "typeorm";
import { AdminRepository } from "./admin.repository";

export default async (server) =>{
  const aR = getCustomRepository(AdminRepository);
  
  const getAdmins = async (req, reply) => {
    try {
      return await aR.getAdmins();
    }
    catch(e){
      console.error(e);
    }
  }

  const getAdmin = async (req, reply) => {
    try {
      const admin = await aR.getAdmin(req.params.id);
      if(admin.banned){
        return reply.code(201).send("Admin has been banned")
      }
      return reply.code(200).send(admin)
    }
    catch(e){
      console.error(e);
    }
  }

  const addAdmin = async (req, reply) =>{
    try{
      return await aR.addAdmin(req.body);
    }
    catch(e){
      console.error(e);
    }
  }

  const deleteAdmin = async (req, reply) => {
    try {
      return await aR.deleteAdmin(req.params.id);
    }
    catch(e){
      console.error(e);
    }
  }

  const updateAdmin = async (req, reply) => {
    try {
      return await aR.updateAdmin(req.params.id, req.body);
    }
    catch(e){
      console.error(e);
    }
  }
  const test = async (req, reply) =>{
    try {
      let data: any = [];
      await server.sendMail(data);
    }
    catch(e){
      console.error(e);
    }
  }

  const banUser = async (req, reply) => {
    try {
      const data = await aR.banUser(req.body.adminId, req.body.userMail);
      return await server.sendMail(data);
    }
    catch(e){
      console.error(e);
    }
  }

  const changePassword = async (req, reply) => {
    try {
      return await aR.changePassword(req.params.id, req.body.new_pass)
    }
    catch(e){
      console.error(e);
    }
  }

  return {
    getAdmins,
    getAdmin,
    addAdmin,
    deleteAdmin,
    updateAdmin,
    test,
    banUser,
    changePassword
  }
}