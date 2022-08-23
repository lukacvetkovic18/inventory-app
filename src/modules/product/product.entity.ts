import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { Warehouse } from "../warehouse/warehouse.entity"

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "varchar", length: 50 })
    name: string

    @Column({ type: "varchar", length: 100 })
    description: string

    @Column({ type: "int" })
    price: number

    @Column({ type: "int" })
    stockState: number

    @Column({ type: "int", default: 0 })
    warehouseState: number

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.products)
    warehouse: Warehouse
}
