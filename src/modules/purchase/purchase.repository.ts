import "fastify";
import { EntityRepository, getCustomRepository, getRepository, IsNull, Repository } from "typeorm";
import { Purchase } from "./purchase.entity";

@EntityRepository(Purchase)
export class PurchaseRespository extends Repository<Purchase>{
  public getPurchases() {
    return this.find();
  }

  public async getPurchase(id) {
    const purchase = await this.findOne(id)
    return purchase;
  }
}