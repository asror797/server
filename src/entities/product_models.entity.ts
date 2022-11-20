import { Entity , Column , PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn, OneToMany, ManyToOne, JoinTable } from "typeorm"
import { Companies } from "./companies.entity"
import { Orders } from "./order.entity"
import { Prices } from "./prices.entity"
import { Processes } from "./processes.entity"




@Entity({name:"products"})
export class Products {
   @PrimaryGeneratedColumn('uuid')
   product_id:string

   // Product Name
   @Column({
      type:"varchar",
      length:64,
      nullable:false
   })
   product_name:string

   @OneToMany(() => Prices , prices => prices.product)
   @JoinTable()
   prices:Prices[]

  
   @OneToMany(() => Orders , order => order.product)
   orders:Orders[]

   @ManyToOne(() => Companies , company => company.models)
   company:Companies

   // Created Date
   @CreateDateColumn({select:false})
   created_at:Date

   // Updated Date
   @UpdateDateColumn({select:false})
   updated_at:Date
}