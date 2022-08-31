import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, BeforeInsert } from "typeorm"

@Entity()
export class Log extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "varchar", length: 100 })
    description: string

    @Column({ type: "date" })
    date: string

    @BeforeInsert()
    async setCurrentDate(){
        const today = new Date();
        this.date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    }
}
