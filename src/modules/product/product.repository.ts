import "fastify";
import { EntityRepository, getCustomRepository, getRepository, IsNull, Repository } from "typeorm";
import { Product } from "./product.entity";

@EntityRepository(Product)
export class ProductRespository extends Repository<Product>{
  public getProducts() {
    return this.find();
  }

  public async getProduct(id) {
    const product = await this.findOne(id)
    return product;
  }
}