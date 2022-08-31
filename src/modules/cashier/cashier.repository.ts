import "fastify";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { LogRepository } from "../log/log.repository";
import { ProductRespository } from "../product/product.repository";
import { PurchaseRespository } from "../purchase/purchase.repository";
import { UserRepository } from "../user/user.repository";
import { Cashier } from "./cashier.entity";

@EntityRepository(Cashier)
export class CashierRepository extends Repository<Cashier>{
  public getCashiers() {
    getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Got all cashiers`}))
    return this.find({ where: { banned: false } });
  }

  public async getCashier(id) {
    const cashier = await this.findOne(id)
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Got cashier ${id}`}))
    return cashier;
  }

  public async addCashier(cashier) {
    await this.save(this.create(cashier));
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Added new ${cashier.role}`}))
    return "Cashier created"
  }

  public async deleteCashier(id) {
    const cashier = await this.findOne(id);
    if(cashier.banned){
      return "Cashier has been banned"
    }
    this.remove(cashier);
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Deleted cashier ${id}`}))
    return `Deleted cashier with id ${id}`
  }

  public async updateCashier(id, data) {
    const cashier = await this.findOne(id);
    if(cashier.banned){
      return "Cashier has been banned"
    }
    this.update(cashier, data)
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Updated cashier ${id}`}))
    return `Updated cashier with id ${id}`
  }

  public async checkStock(id) {
    const cashier = await this.findOne(id);
    if(cashier.banned){
      return "Cashier has been banned"
    }
    const products = await getCustomRepository(ProductRespository).find();
    let stock = 0;
    products.forEach(product => {
      stock += product.stockState;
    })
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Checked store stock`}))
    return `Cashier ${id} checked the stock of ${stock} items`
  }

  public async checkDailyTraffic(id, date) {
    const cashier = await this.findOne(id);
    if(cashier.banned){
      return "Cashier has been banned"
    }
    const purchases = await getCustomRepository(PurchaseRespository).find({where: {created: date}})
    let traffic = 0;
    purchases.forEach(purchase => {
      traffic += purchase.sum;
    })
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Checked daily traffic of ${date}`}))
    return `Cashier ${id} checked daily traffic of ${date} in the amount of ${traffic}`
  }

  public async addProduct(id, product) {
    const cashier = await this.findOne(id);
    if(cashier.banned){
      return "Cashier has been banned"
    }
    await getCustomRepository(ProductRespository).save(getCustomRepository(ProductRespository).create(product));
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Added new product`}))
    return `Cashier ${id} added new product to the stock`
  }

  public async removeProduct(cashier_id, product_id) {
    const cashier = await this.findOne(cashier_id);
    if(cashier.banned){
      return "Cashier has been banned"
    }
    const product = await getCustomRepository(ProductRespository).findOne(product_id);
    await getCustomRepository(ProductRespository).remove(product);
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Removed product ${product_id}`}))
    return `Cashier ${cashier_id} removed product with id ${product_id}`
  }

  public async returnMoney(cashier_id, user_id, amount:number) {
    const cashier = await this.findOne(cashier_id);
    if(cashier.banned){
      return "Cashier has been banned"
    }
    const user = await getCustomRepository(UserRepository).findOne(user_id);
    if(user.banned){
      return "User has been banned"
    }
    await getCustomRepository(UserRepository).update(user, {balance: user.balance + amount});
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Returned money to costumer ${user_id}`}))
    return `Cashier ${cashier_id} gave user ${user_id} the amount of ${amount}`
  }

  public async checkTraffic(id){
    const cashier = await this.findOne(id)
    if(cashier.banned){
      return "Cashier has been banned"
    }
    const purchases = await getCustomRepository(PurchaseRespository).find({where: { cashier: cashier }})
    let traffic = 0;
    purchases.forEach(purchase => {
      traffic += purchase.sum;
    })
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Checked cashier ${id} traffic`}))
    return `Cashier ${id} has traffic of ${traffic}`
  }

  public async printData(date){
    const products = await getCustomRepository(ProductRespository).find()
    const purchases = await getCustomRepository(PurchaseRespository).find({where: {created: date}})
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
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Printed store report`}))
    return result;
  }

  public async changePassword(id, new_pass) {
    const cashier = await this.findOne(id)
    if(cashier.banned){
      return "Cashier has been banned"
    }
    cashier.password = new_pass;
    await this.save(cashier);
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Changed cashier ${id} password`}))
    return "Password changed successfuly"
  }
}