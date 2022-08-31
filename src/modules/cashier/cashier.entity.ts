import * as bcrypt from "bcrypt"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm"
import { Purchase } from "../purchase/purchase.entity"

@Entity()
export class Cashier extends BaseEntity{

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

    @OneToMany(() => Purchase, (sale) => sale.cashier)
    sales: Purchase[]

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

    @BeforeInsert()
    async setCurrentDate(){
        const today = new Date();
        this.created = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    }

    @Column({ type: "varchar", default: "Cashier" })
    role: string
    
    @Column({ type: "varchar", default: null })
    mfaToken: string

    @Column({ type: "boolean", default: false })
    banned: boolean
}
