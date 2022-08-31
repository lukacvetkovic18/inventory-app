import "fastify";
import { EntityRepository, getCustomRepository, getRepository, IsNull, Repository } from "typeorm";
import { LogRepository } from "../log/log.repository";
import { Purchase } from "./purchase.entity";

@EntityRepository(Purchase)
export class PurchaseRespository extends Repository<Purchase>{
  public getPurchases() {
    getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Got all purchases`}))
    return this.find();
  }

  public async getPurchase(id) {
    const purchase = await this.findOne(id)
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Got purchase ${id}`}))
    return purchase;
  }
}