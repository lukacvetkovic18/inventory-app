import "fastify";
import fastify from "fastify";
import { EntityRepository, getCustomRepository, getRepository, IsNull, Repository } from "typeorm";
import cashierController from "../cashier/cashier.controller";
import { CashierRepository } from "../cashier/cashier.repository";
import { Product } from "../product/product.entity";
import { ProductRespository } from "../product/product.repository";
import { Purchase } from "../purchase/purchase.entity";
import { PurchaseRespository } from "../purchase/purchase.repository";
import { UserRepository } from "../user/user.repository";
import { WarehouseRepository } from "../warehouse/warehouse.repository";
import { WarehouseWorker } from "./warehouseWorker.entity";
const server = fastify()

@EntityRepository(WarehouseWorker)
export class WarehouseWorkerRepository extends Repository<WarehouseWorker>{
  public getWorkers() {
    return this.find();
  }

  public async getWorker(id) {
    const worker = await this.findOne(id)
    return worker;
  }

  public async addWorker(worker) {
    await this.save(this.create(worker));
    return "Worker created"
  }

  public async deleteWorker(id) {
    const worker = await this.findOne(id);
    this.remove(worker);
    return `Deleted worker with id ${id}`
  }

  public async updateWorker(id, data) {
    const worker = await this.findOne(id);
    this.update(worker, data)
    return `Updated worker with id ${id}`
  }

  public async transferProducts(worker_id, warehouse_id, product_ids){
    const worker = await this.findOne(worker_id);
    const warehouse = await getCustomRepository(WarehouseRepository).findOne(warehouse_id)
    const products = await getCustomRepository(ProductRespository).findByIds(product_ids)
    let ws = products[0].warehouseState
    let ss = products[0].stockState
    products.forEach(async(product) => {
      ws = product.warehouseState
      ss = product.stockState
      if(product.warehouseState===0){
        return `Not enough products ${product.id} in warehouse ${warehouse_id}`
      }
      ws++
      ss--
      await getCustomRepository(ProductRespository).update(product, { warehouseState: ws, stockState: ss })
    })
    return `Transfer of products was successful by worker ${worker_id}`
  }

  /*public async checkStock(id) {
    const cashier = await this.findOne(id);
    const products = await getCustomRepository(ProductRespository).find();
    let stock = 0;
    products.forEach(product => {
      stock += product.stockState;
    })
    return `Cashier ${id} checked the stock of ${stock} items`
  }

  public async checkDailyTraffic(id, date) {
    const cashier = await this.findOne(id);
    const purchases = await getCustomRepository(PurchaseRespository).find({where: {date: date}})
    let traffic = 0;
    purchases.forEach(purchase => {
      traffic += purchase.sum;
    })
    return `Cashier ${id} checked daily traffic of ${date}} in the amount of ${traffic}`
  }

  public async addProduct(id, product) {
    const cashier = await this.findOne(id);
    await getCustomRepository(ProductRespository).save(getCustomRepository(ProductRespository).create(product));
    return `Cashier ${id} added new product to the stock`
  }

  public async removeProduct(cashier_id, product_id) {
    const cashier = await this.findOne(cashier_id);
    const product = await getCustomRepository(ProductRespository).findOne(product_id);
    await getCustomRepository(ProductRespository).remove(product);
    return `Cashier ${cashier_id} removed product with id ${product_id}`
  }

  public async returnMoney(cashier_id, user_id, amount) {
    const cashier = await this.findOne(cashier_id);
    const user = await getCustomRepository(UserRepository).findOne(user_id);
    const newBalance = user.balance + amount;
    await getCustomRepository(UserRepository).update(user, {balance: newBalance});
    return `Cashier ${cashier_id} gave user ${user_id} the amount of ${amount}`
  }*/
}