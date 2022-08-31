import "fastify";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { LogRepository } from "../log/log.repository";
import { Product } from "./product.entity";

@EntityRepository(Product)
export class ProductRespository extends Repository<Product>{
  public getProducts() {
    getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Got all products`}))
    return this.find();
  }

  public async getProduct(id) {
    const product = await this.findOne(id)
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Got product ${id}`}))
    return product;
  }
}