import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Purchase } from "../purchase/purchase.entity"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

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

    @Column({ type: "decimal", precision: 5, scale: 2 })
    balance: number

    @OneToMany(() => Purchase, (purchase) => purchase.buyer)
    purchases: Purchase[]
}
