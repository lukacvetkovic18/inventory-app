import "fastify";
import fastify from "fastify";
import { EntityRepository, getCustomRepository, getRepository, IsNull, Repository } from "typeorm";
import { Product } from "../product/product.entity";
import { ProductRespository } from "../product/product.repository";
import { Purchase } from "../purchase/purchase.entity";
import { PurchaseRespository } from "../purchase/purchase.repository";
import { UserRepository } from "../user/user.repository";
import { WarehouseRepository } from "../warehouse/warehouse.repository";
import { Cashier } from "./cashier.entity";
const server = fastify()

@EntityRepository(Cashier)
export class CashierRepository extends Repository<Cashier>{
  public getCashiers() {
    return this.find();
  }

  public async getCashier(id) {
    const cashier = await this.findOne(id)
    return cashier;
  }

  public async addCashier(cashier) {
    await this.save(this.create(cashier));
    return "Cashier created"
  }

  public async deleteCashier(id) {
    const cashier = await this.findOne(id);
    this.remove(cashier);
    return `Deleted cashier with id ${id}`
  }

  public async updateCashier(id, data) {
    const cashier = await this.findOne(id);
    this.update(cashier, data)
    return `Updated cashier with id ${id}`
  }

  public async checkStock(id) {
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
    return `Cashier ${id} checked daily traffic of ${date} in the amount of ${traffic}`
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
  }

  public async checkTraffic(id){
    const cashier = await this.findOne(id)
    const purchases = await getCustomRepository(PurchaseRespository).find({where: { cashier: cashier }})
    let traffic = 0;
    purchases.forEach(purchase => {
      traffic += purchase.sum;
    })
    return `Cashier ${id} has traffic of ${traffic}`
  }

  public async printData(date){
    const products = await getCustomRepository(ProductRespository).find()
    const purchases = await getCustomRepository(PurchaseRespository).find({where: {date: date}})
    let ws = 0;
    let ss = 0;
    let result = ``
    products.forEach(product => {
      ws += product.warehouseState
      ss += product.stockState
      result += `Product ${product.id}: warehouse: ${product.warehouseState}, store: ${product.stockState}\n`
    })
    let traffic = 0;
    purchases.forEach(purchase => {
      traffic += purchase.sum;
    })
    result += `Daily traffic of ${date} in the amount of ${traffic}`
    return result;
  }
}