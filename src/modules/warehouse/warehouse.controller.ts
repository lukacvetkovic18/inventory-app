import { getCustomRepository } from "typeorm";
import { WarehouseRepository } from "./warehouse.repository";

export default async (server) =>{
  const wR = getCustomRepository(WarehouseRepository);
  
  const getWarehouses = async (req, reply) => {
    try {
      return await wR.getWarehouses();
    }
    catch(e){
      console.error(e);
    }
  }

  const getWarehouse = async (req, reply) => {
    try {
      return reply.send(await wR.getWarehouse(req.params.id));
    }
    catch(e){
      console.error(e);
    }
  }

  const addWarehouse = async (req, reply) =>{
    try{
      return await wR.addWarehouse(req.body);
    }
    catch(e){
      console.error(e);
    }
  }

  const deleteWarehouse = async (req, reply) => {
    try {
      return await wR.deleteWarehouse(req.params.id);
    }
    catch(e){
      console.error(e);
    }
  }

  const updateWarehouse = async (req, reply) => {
    try {
      return await wR.updateWarehouse(req.params.id, req.body);
    }
    catch(e){
      console.error(e);
    }
  }

  const addWorker = async (req, reply) => {
    try{
      return await wR.addWorker(req.params.warehouse_id, req.body.worker_id);
    }
    catch(e){
      console.error(e);
    }
  }

  const addProduct = async (req, reply) => {
    try{
      return await wR.addProduct(req.params.warehouse_id, req.body.product_id, req.body.amount);
    }
    catch(e){
      console.error(e);
    }
  }

  return {
    getWarehouses,
    getWarehouse,
    addWarehouse,
    deleteWarehouse,
    updateWarehouse,
    addWorker,
    addProduct
  }
}