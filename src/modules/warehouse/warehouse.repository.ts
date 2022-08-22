import "fastify";
import fastify from "fastify";
import { EntityRepository, getCustomRepository, getRepository, IsNull, Repository } from "typeorm";
import { Product } from "../product/product.entity";
import { ProductRespository } from "../product/product.repository";
import { Purchase } from "../purchase/purchase.entity";
import { PurchaseRespository } from "../purchase/purchase.repository";
import { UserRepository } from "../user/user.repository";
import { WarehouseWorker } from "../warehouseWorker/warehouseWorker.entity";
import { WarehouseWorkerRepository } from "../warehouseWorker/warehouseWorker.repository";
import { Warehouse } from "./warehouse.entity";

@EntityRepository(Warehouse)
export class WarehouseRepository extends Repository<Warehouse>{
  public getWarehouses() {
    return this.find();
  }

  public async getWarehouse(id) {
    const warehouse = await this.findOne(id)
    return warehouse;
  }

  public async addWarehouse(warehouse) {
    await this.save(this.create(warehouse));
    return "Warehouse created"
  }

  public async deleteWarehouse(id) {
    const warehouse = await this.findOne(id);
    this.remove(warehouse);
    return `Deleted warehouse with id ${id}`
  }

  public async updateWarehouse(id, data) {
    const warehouse = await this.findOne(id);
    this.update(warehouse, data)
    return `Updated warehouse with id ${id}`
  }

  public async addWorker(warehouse_id, worker_id) {
    //const warehouse = await this.findOne({where: (qb) => { qb.where('workers.warehouseId = :warehouse_id', warehouse_id)},
    //relations: ['workers']});
    const warehouse = await this.findOne(warehouse_id)
    const worker = await getCustomRepository(WarehouseWorkerRepository).findOne(worker_id);
    await getCustomRepository(WarehouseWorkerRepository)
        .createQueryBuilder()
        .relation(Warehouse, 'workers')
        .of(warehouse)
        .add(worker)
    //let workers = warehouse.workers
    //workers.push(warehouse.workers)
    //workers.push(worker)
    await getCustomRepository(WarehouseRepository).update(warehouse, warehouse)
    /*this.createQueryBuilder()
        .update(Warehouse)
        .set({workers : workers})
        .where("id = :id", {id: worker_id})
        .execute()*/
    return `Warehouse ${warehouse_id} employed new worker with id ${worker_id}`
  }

  public async addProduct(warehouse_id, product_id, amount : number) {
    const warehouse = await this.findOne(warehouse_id);
    const product = await getCustomRepository(ProductRespository).findOne(product_id)
    const newAmount = product.warehouseState += amount
    console.log(warehouse);
    console.log(product);
    console.log(newAmount);
    // let update = await getCustomRepository(ProductRespository).update(product, { warehouse: warehouse, warehouseState: newAmount })
    let update = await getCustomRepository(ProductRespository).createQueryBuilder()
        .update(Product)
        .set({warehouse: warehouse, warehouseState: newAmount})
        .where("id = :id", {id: product.id}).execute();
    console.log(update);
    return `Warehouse ${warehouse_id} added ${amount} new product(s) with id ${product_id}`
  }
}