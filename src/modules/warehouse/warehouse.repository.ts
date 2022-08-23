import "fastify";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Product } from "../product/product.entity";
import { ProductRespository } from "../product/product.repository";
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
    const warehouse = await this.findOne(warehouse_id)
    const worker = await getCustomRepository(WarehouseWorkerRepository).findOne(worker_id);
    await getCustomRepository(WarehouseWorkerRepository)
        .createQueryBuilder()
        .relation(Warehouse, 'workers')
        .of(warehouse)
        .add(worker)
    await getCustomRepository(WarehouseRepository).update(warehouse, warehouse)
    return `Warehouse ${warehouse_id} employed new worker with id ${worker_id}`
  }

  public async addProduct(warehouse_id, product_id, amount : number) {
    const warehouse = await this.findOne(warehouse_id);
    const product = await getCustomRepository(ProductRespository).findOne(product_id)
    const newAmount = product.warehouseState += amount
    console.log(warehouse);
    console.log(product);
    console.log(newAmount);
    let update = await getCustomRepository(ProductRespository).createQueryBuilder()
        .update(Product)
        .set({warehouse: warehouse, warehouseState: newAmount})
        .where("id = :id", {id: product.id}).execute();
    console.log(update);
    return `Warehouse ${warehouse_id} added ${amount} new product(s) with id ${product_id}`
  }
}