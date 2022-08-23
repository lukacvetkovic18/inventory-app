import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, ManyToMany, JoinTable } from "typeorm"
import { Product } from "../product/product.entity"
import { WarehouseWorker } from "../warehouseWorker/warehouseWorker.entity"

@Entity()
export class Warehouse extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "varchar", length: 30 })
    name: string

    @Column({ type: "varchar", length: 30 })
    location: string

    @OneToMany(() => Product, (product) => product.warehouse)
    products: Product[]

    @ManyToMany(() => WarehouseWorker, (worker) => worker.warehouses)
    @JoinTable()
    workers: WarehouseWorker[]
    
}
