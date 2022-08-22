import "reflect-metadata"

import fp from "fastify-plugin"
import { getConnectionOptions, getCustomRepository, createConnection, getRepository } from "typeorm"
//import { createConnection } from "net"
import { UserRepository } from "../modules/user/user.repository"
import { CashierRepository } from "../modules/cashier/cashier.repository"
import { ProductRespository } from "../modules/product/product.repository"
import { PurchaseRespository } from "../modules/purchase/purchase.repository"
import { WarehouseRepository } from "../modules/warehouse/warehouse.repository"
import { WarehouseWorkerRepository } from "../modules/warehouseWorker/warehouseWorker.repository"
import { AdminRepository } from "../modules/admin/admin.repository"

export default fp(async (server, opts, done)=>{
  try {
    const connectionOptions = await getConnectionOptions()

    const connection = await createConnection(connectionOptions);

    server.decorate("db", connection);
  

  server.decorate("repos", {
    users: getCustomRepository(UserRepository),
    cashiers: getCustomRepository(CashierRepository),
    products: getCustomRepository(ProductRespository),
    purchases: getCustomRepository(PurchaseRespository),
    warehouses: getCustomRepository(WarehouseRepository),
    warehouseWorkers: getCustomRepository(WarehouseWorkerRepository),
    admins: getCustomRepository(AdminRepository)
  });
  done();
}

catch(e){
  console.error(e);
}
})