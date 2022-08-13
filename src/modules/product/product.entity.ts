import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({ type: "varchar", length: 50 })
    name: string

    @Column({ type: "varchar", length: 100 })
    description: string

    @Column({ type: "decimal", precision: 5, scale: 2 })
    price: number

    @Column({ type: "int" })
    stockState: number
}
