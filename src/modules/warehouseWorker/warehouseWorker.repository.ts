import "fastify";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { ProductRespository } from "../product/product.repository";
import { WarehouseRepository } from "../warehouse/warehouse.repository";
import { WarehouseWorker } from "./warehouseWorker.entity";

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
      ws--;
      ss++;
      await getCustomRepository(ProductRespository).update(product, { warehouseState: ws, stockState: ss })
    })
    return `Transfer of products was successful by worker ${worker_id}`
  }
}