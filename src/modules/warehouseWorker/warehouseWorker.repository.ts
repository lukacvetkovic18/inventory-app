import "fastify";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { LogRepository } from "../log/log.repository";
import { ProductRespository } from "../product/product.repository";
import { WarehouseRepository } from "../warehouse/warehouse.repository";
import { WarehouseWorker } from "./warehouseWorker.entity";

@EntityRepository(WarehouseWorker)
export class WarehouseWorkerRepository extends Repository<WarehouseWorker>{
  public getWorkers() {
    getCustomRepository(LogRepository)
        .save(getCustomRepository(LogRepository)
        .create({ description: `Got all warehouse workers`}))
    return this.find({ where: { banned: false } });
  }

  public async getWorker(id) {
    const worker = await this.findOne(id)
    await getCustomRepository(LogRepository)
        .save(getCustomRepository(LogRepository)
        .create({ description: `Got warehouse worker ${id}`}))
    return worker;
  }

  public async addWorker(worker) {
    await this.save(this.create(worker));
    await getCustomRepository(LogRepository)
        .save(getCustomRepository(LogRepository)
        .create({ description: `Added new Warehouse worker`}))
    return "Worker created"
  }

  public async deleteWorker(id) {
    const worker = await this.findOne(id);
    if(worker.banned){
      return "Warehouse worker has been banned"
    }
    this.remove(worker);
    await getCustomRepository(LogRepository)
        .save(getCustomRepository(LogRepository)
        .create({ description: `Deleted warehouse worker ${id}`}))
    return `Deleted worker with id ${id}`
  }

  public async updateWorker(id, data) {
    const worker = await this.findOne(id);
    if(worker.banned){
      return "Warehouse worker has been banned"
    }
    this.update(worker, data)
    await getCustomRepository(LogRepository)
        .save(getCustomRepository(LogRepository)
        .create({ description: `Updated warehouse worker ${id}`}))
    return `Updated worker with id ${id}`
  }

  /*public async transferProducts(worker_id, warehouse_id, product_ids){
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
  }*/

  public async transferProducts(worker_id, amounts : number[]){
    const worker = await this.findOne(worker_id);
    if(worker.banned){
      return "Warehouse worker has been banned"
    }
    const products = await getCustomRepository(ProductRespository).find()
    let ws: number;
    let ss: number;
    for(let i = 0; i < products.length; i++) {
      ws = products[i].warehouseState
      ss = products[i].stockState
      if(ws >= amounts[i]){
        ws -= amounts[i]
        ss += amounts[i]
        await getCustomRepository(ProductRespository).update(products[i], { warehouseState: ws, stockState: ss })
      } else {
        return `Not enough products ${products[i].id} in warehouse`
      }
    }
    await getCustomRepository(LogRepository)
        .save(getCustomRepository(LogRepository)
        .create({ description: `Transfered products from warehouse to store`}))
    return `Transfer of products was successful by worker ${worker_id}`
  }

  public async changePassword(id, new_pass) {
    const worker = await this.findOne(id)
    if(worker.banned){
      return "Warehouse worker has been banned"
    }
    worker.password = new_pass;
    await this.save(worker);
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Changed warehouse worker ${id} password`}))
    return "Password changed successfuly"
  }
}