import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cashier } from "../cashier/cashier.entity";
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";


@Entity()
export class Purchase extends BaseEntity{

  @PrimaryGeneratedColumn("increment")
  id: number

  @ManyToOne(() => Cashier, (cashier) => cashier.sales)
  cashier: Cashier

  @ManyToOne(() => User, buyer => buyer.purchases)
  buyer: User
  
  @Column({ type: "char", length: 10 })
  date: string

  @Column({ type: 'double' })
  sum: number

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[]
}