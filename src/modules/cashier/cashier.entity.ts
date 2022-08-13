import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Purchase } from "../purchase/purchase.entity"

@Entity()
export class Cashier {

    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({ type: "varchar", length: 30 })
    firstName: string

    @Column({ type: "varchar", length: 30 })
    lastName: string

    @Column({ type: "varchar" })
    email: string

    @Column({ type: "varchar", length: 12 })
    phoneNumber: string

    @Column({ type: "int" })
    age: number

    @Column({ type: "varchar" })
    password: string

    @Column({ type: "timestamptz" })
    lastLogin: Date

    @OneToMany(() => Purchase, (sale) => sale.cashier)
    sales: Purchase[]
}
