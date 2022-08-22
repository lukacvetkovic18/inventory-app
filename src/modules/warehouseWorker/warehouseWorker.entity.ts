import * as bcrypt from "bcrypt"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate, ManyToMany } from "typeorm"
import { Warehouse } from "../warehouse/warehouse.entity"

@Entity()
export class WarehouseWorker extends BaseEntity{

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

    @ManyToMany(() => Warehouse, (warehouse) => warehouse.workers)
    warehouses: Warehouse[]

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

    @Column({ type: "varchar", default: "WarehouseWorker" })
    role: string
}
