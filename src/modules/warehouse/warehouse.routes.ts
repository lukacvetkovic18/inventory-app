import {
  getWarehousesSchema,
  getWarehouseSchema,
  postWarehouseSchema,
  deleteWarehouseSchema,
  putWarehouseSchema,
  addWorkerSchema,
  addProductSchema
} from "./warehouse.schema";
import warehouseController from "./warehouse.controller";


export default async (fastify, opts) =>{
  const warehouseCtl = warehouseController(fastify);
  
  fastify.route({
    method: "GET",
    url: "/warehouses",
    handler: (await warehouseCtl).getWarehouses,
    schema: getWarehousesSchema
  });
  
  fastify.route({
    method: "GET",
    url: "/warehouses/:id",
    handler: (await warehouseCtl).getWarehouse,
    schema: getWarehouseSchema
  });
  
  fastify.route({
    method: "POST",
    url: "/warehouses",
    handler: (await warehouseCtl).addWarehouse,
    schema: postWarehouseSchema
  });
  
  fastify.route({
    method: "DELETE",
    url: "/warehouses/:id",
    handler: (await warehouseCtl).deleteWarehouse,
    schema: deleteWarehouseSchema
  });
  
  fastify.route({
    method: "PUT",
    url: "/warehouses/:id",
    handler: (await warehouseCtl).updateWarehouse,
    schema: putWarehouseSchema
  })

  fastify.route({
    method: "PUT",
    url: "/warehouses/addWorker/:warehouse_id",
    handler: (await warehouseCtl).addWorker,
    schema: addWorkerSchema
  });

  fastify.route({
    method: "PUT",
    url: "/warehouses/addProduct/:warehouse_id",
    handler: (await warehouseCtl).addProduct,
    schema: addProductSchema
  });
}