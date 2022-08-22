import "fastify";
import { EntityRepository, getCustomRepository, getRepository, Repository } from "typeorm";
import { CashierRepository } from "../cashier/cashier.repository";
import { Product } from "../product/product.entity";
import { ProductRespository } from "../product/product.repository";
import { Purchase } from "../purchase/purchase.entity";
import { PurchaseRespository } from "../purchase/purchase.repository";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
  public getUsers() {
    return this.find();
  }

  async getUser(id) {
    const user = this.findOne(id)
    return user;
  }

  public addUser(user) {
    this.save(this.create(user));
    return "User created"
  }

  public async deleteUser(id) {
    const user = await this.findOne(id);
    this.remove(user);
    return `Deleted user with id ${id}`
  }

  public async updateUser(id, data) {
    const user = await this.findOne(id);
    this.update(user, data)
    return `Updated user with id ${id}`
  }

  public async purchaseProducts(user_id, cashier_id, product_ids, date) {
    const user = await this.findOne(user_id)
    const cashier = await getCustomRepository(CashierRepository).findOne(cashier_id)
    const products = await getCustomRepository(ProductRespository).findByIds(product_ids)
    let sum = 0;
    let newBalance = user.balance
    let ss
    products.forEach(async product => {
      ss=product.stockState
      if(product.price<=newBalance){
        ss--
        newBalance -= product.price
        sum += product.price
        await getCustomRepository(ProductRespository).update(product, { stockState : ss })
      }else{
        return "Not enough money"
      }
    });
    await this.update(user, { balance: newBalance })
    const newPurchase = await getCustomRepository(PurchaseRespository).create({
      cashier: cashier,
      buyer: user,
      date: date,
      sum: sum,
      products: products
    })
    console.log(newPurchase);
    await getCustomRepository(PurchaseRespository).save(newPurchase)
    return "Purchase was successful"
  }
}