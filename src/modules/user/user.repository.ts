import "fastify";
import { EntityRepository, getCustomRepository, getRepository, Repository } from "typeorm";
import { CashierRepository } from "../cashier/cashier.repository";
import { LogRepository } from "../log/log.repository";
import { ProductRespository } from "../product/product.repository";
import { PurchaseRespository } from "../purchase/purchase.repository";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
  public getUsers() {
    getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Got all users`}))
    return this.find({ where: { banned: false } });
  }

  async getUser(id) {
    const user = this.findOne(id)
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Got user ${id}`}))
    return await user;
  }

  public async addUser(user) {
    this.save(this.create(user));
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Added new ${user.role}`}))
    return "User created"
  }

  public async deleteUser(id) {
    const user = await this.findOne(id);
    if(user.banned){
      return "User has been banned"
    }
    this.remove(user);
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Deleted user ${id}`}))
    return `Deleted user with id ${id}`
  }

  public async updateUser(id, data) {
    const user = await this.findOne(id);
    if(user.banned){
      return "User has been banned"
    }
    this.update(user, data)
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Updated user ${id}`}))
    return `Updated user with id ${id}`
  }

  public async purchaseProducts(user_id, cashier_id, amounts: number[], discount : number, granted : boolean) {
    const user = await this.findOne(user_id)
    if(user.banned){
      return "User has been banned"
    }
    const cashier = await getCustomRepository(CashierRepository).findOne(cashier_id)
    if(cashier.banned){
      return "Cashier has been banned"
    }
    const products = await getCustomRepository(ProductRespository).find()
    let sum = 0;
    let newBalance = user.balance
    let ss
    for(let i = 0; i < products.length; i++) {
      ss = products[i].stockState
      if(ss >= amounts[i]){
        if(newBalance >= products[i].price){
          ss -= amounts[i]
          sum += products[i].price * amounts[i]
          newBalance -= products[i].price * amounts[i]
          await getCustomRepository(ProductRespository).update(products[i], { stockState: ss })
        } else {
          return "Not enough money"
        }
      } else {
        return `Not enough products ${products[i].id} in warehouse`
      }
    }
    if(granted) {
      sum -= sum * (discount / 100)
      newBalance += sum * (discount / 100)
    }
    await this.update(user, { balance: newBalance })
    const newPurchase = await getCustomRepository(PurchaseRespository).create({
      cashier: cashier,
      buyer: user,
      sum: sum,
      products: products
    })
    await getCustomRepository(PurchaseRespository).save(newPurchase)
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `New purchase completed in the amount of ${sum} kn`}))
    return "Purchase was successful"
  }

  public async getAllPurchasesFromUser(id) {
    const user = this.createQueryBuilder("user")
      .leftJoinAndSelect("user.purchases","purchase")
      .leftJoinAndSelect("purchase.products","product")
      .leftJoinAndSelect("product.warehouse","warehouse")
      .leftJoinAndSelect("warehouse.workers","worker")
      .where("user.id = :id",{ id: id })
      .getOne()
    return user;
  }

  public async changePassword(id, new_pass) {
    const user = await this.findOne(id)
    if(user.banned){
      return "User has been banned"
    }
    user.password = new_pass;
    await this.save(user);
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Changed user ${id} password`}))
    return "Password changed successfuly"
  }
}