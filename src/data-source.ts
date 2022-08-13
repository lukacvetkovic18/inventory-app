import "reflect-metadata"
import { DataSource } from "typeorm"
import { Cashier } from "./modules/cashier/cashier.entity"
import { Product } from "./modules/product/product.entity"
import { Purchase } from "./modules/purchase/purchase.entity"
import { User } from "./modules/user/user.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "inventory-app",
    synchronize: true,
    logging: false,
    entities: [User, Cashier, Product, Purchase],
    migrations: [],
    subscribers: [],
})
