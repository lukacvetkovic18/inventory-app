import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm"
import * as bcrypt from "bcrypt"
import { Purchase } from "../purchase/purchase.entity"

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "varchar", length: 30 })
    firstName: string

    @Column({ type: "varchar", length: 30 })
    lastName: string

    @Column({ type: "varchar", unique: true })
    email: string

    @Column({ type: "varchar", length: 12 })
    phoneNumber: string

    @Column({ type: "int" })
    age: number

    @Column({ type: "varchar" })
    password: string
    
    @Column({ type: "date" })
    created: string

    @Column({ type: "int" })
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
    async comparePassword(password : String) : Promise<Boolean>{
        return bcrypt.compare(password, this.password)
    }

    @BeforeInsert()
    async setCurrentDate(){
        const today = new Date();
        this.created = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    }

    @Column({ type: "varchar", default: "User" })
    role: string
    
    @Column({ type: "varchar", default: null })
    mfaToken: string

    @Column({ type: "boolean", default: false })
    banned: boolean
}
