import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm"
import * as bcrypt from "bcrypt"
import { Purchase } from "../purchase/purchase.entity"

const userRole = {
    'user' : 0,
    'cashier' : 1,
    'admin' : 2,
    'superadmin' : 3
}

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
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
    
    @Column({ type: "char", length: 10 })
    lastLogin: string

    @Column({ type: "decimal", precision: 5, scale: 2 })
    balance: number

    @OneToMany(() => Purchase, (purchase) => purchase.buyer)
    purchases: Purchase[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(this.password){
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
    async comparePassword(password) : Promise<Boolean>{
        return bcrypt.compare(this.password, password)
    }

    @Column({ type: "varchar", default: "User" })
    role: string
}
