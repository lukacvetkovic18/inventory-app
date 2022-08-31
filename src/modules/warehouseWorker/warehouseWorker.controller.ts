import { getCustomRepository } from "typeorm";
import { WarehouseWorkerRepository } from "./warehouseWorker.repository";

export default async (server) =>{
  const wwR = getCustomRepository(WarehouseWorkerRepository);
  
  const getWorkers = async (req, reply) => {
    try {
      return await wwR.getWorkers();
    }
    catch(e){
      console.error(e);
    }
  }

  const getWorker = async (req, reply) => {
    try {
      const worker = await wwR.getWorker(req.params.id);
      if(worker.banned){
        return reply.code(201).send("Warehouse worker has been banned")
      }
      return reply.code(200).send(worker);
    }
    catch(e){
      console.error(e);
    }
  }

  const addWorker = async (req, reply) =>{
    try{
      return await wwR.addWorker(req.body);
    }
    catch(e){
      console.error(e);
    }
  }

  const deleteWorker = async (req, reply) => {
    try {
      return await wwR.deleteWorker(req.params.id);
    }
    catch(e){
      console.error(e);
    }
  }

  const updateWorker = async (req, reply) => {
    try {
      return await wwR.updateWorker(req.params.id, req.body);
    }
    catch(e){
      console.error(e);
    }
  }

  const transferProducts = async (req, reply) => {
    try {
      return await wwR.transferProducts(req.params.worker_id, req.body.amounts)
    }
    catch(e){
      console.error(e);
    }
  }

  const changePassword = async (req, reply) => {
    try {
      return await wwR.changePassword(req.params.id, req.body.new_pass)
    }
    catch(e){
      console.error(e);
    }
  }

  return {
    getWorkers,
    getWorker,
    addWorker,
    deleteWorker,
    updateWorker,
    transferProducts,
    changePassword
  }
}