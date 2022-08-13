import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cashier } from "../cashier/cashier.entity";
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";


@Entity()
export class Purchase {

  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => Cashier, (cashier) => cashier.sales)
  cashier: Cashier

  @ManyToOne(() => User, (buyer) => buyer.purchases)
  buyer: User
  
  @Column({ type: "timestamptz" })
  time: Date

  @Column({ type: 'int' })
  numberOfProducts: number

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[]
}