import { getCustomRepository } from "typeorm";
import { CashierRepository } from "./cashier.repository";

export default async (server) =>{
  const cR = getCustomRepository(CashierRepository);
  
  const getCashiers = async (req, reply) => {
    try {
      return await cR.getCashiers();
    }
    catch(e){
      console.error(e);
    }
  }

  const getCashier = async (req, reply) => {
    try {
      return reply.send(await cR.getCashier(req.params.id));
    }
    catch(e){
      console.error(e);
    }
  }

  const addCashier = async (req, reply) =>{
    try{
      return await cR.addCashier(req.body);
    }
    catch(e){
      console.error(e);
    }
  }

  const deleteCashier = async (req, reply) => {
    try {
      return await cR.deleteCashier(req.params.id);
    }
    catch(e){
      console.error(e);
    }
  }

  const updateCashier = async (req, reply) => {
    try {
      return await cR.updateCashier(req.params.id, req.body);
    }
    catch(e){
      console.error(e);
    }
  }

  const checkStock = async (req, reply) => {
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
  }

  const checkTraffic = async (req, reply) => {
    try {
      return await cR.checkTraffic(req.params.id);
    }
    catch(e){
      console.error(e);
    }
  }

  const printData = async (req, reply) => {
    try {
      return await cR.printData(req.params.date);
    }
    catch(e){
      console.error(e);
    }
  }

  return {
    getCashiers,
    getCashier,
    addCashier,
    deleteCashier,
    updateCashier,
    checkStock,
    checkDailyTraffic,
    addProduct,
    removeProduct,
    returnMoney,
    checkTraffic,
    printData
  }
}