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
      return reply.send(await wwR.getWorker(req.params.id));
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
      return await wwR.transferProducts(req.params.worker_id, req.body.warehouse_id, req.body.product_ids)
    }
    catch(e){
      console.error(e);
    }
  }

  /*const checkStock = async (req, reply) => {
    try {
      return await cR.checkStock(req.params.id);
    }
    catch(e){
      console.error(e);
    }
  }

  const checkDailyTraffic = async (req, reply) => {
    try {
      return await cR.checkDailyTraffic(req.params.id, req.params.date);
    }
    catch(e){
      console.error(e);
    }
  }

  const addProduct = async (req, reply) => {
    try{
      return await cR.addProduct(req.params.id, req.body);
    }
    catch(e){
      console.error(e);
    }
  }

  const removeProduct = async (req, reply) => {
    try{
      return await cR.removeProduct(req.params.cashier_id, req.params.product_id);
    }
    catch(e){
      console.error(e);
    }
  }

  const returnMoney = async (req, reply) => {
    try{
      return await cR.returnMoney(req.params.cashier_id, req.params.user_id, req.body.balance);
    }
    catch(e){
      console.error(e);
    }
  }*/

  return {
    getWorkers,
    getWorker,
    addWorker,
    deleteWorker,
    updateWorker,
    transferProducts
    /*checkStock,
    checkDailyTraffic,
    addProduct,
    removeProduct,
    returnMoney*/
  }
}