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
      return reply.send(await aR.getAdmin(req.params.id));
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
      console.log("I am a test function")
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
    test
  }
}