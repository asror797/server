import { Entity , Column , PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { Position_cat } from "./position_category.entity"
import { Products } from "./product_models.entity"




@Entity({name:"prices"})
export class Prices {
   @PrimaryGeneratedColumn('uuid')
   price_id:String

   // Product Name
   @Column({
      type:"int",
      nullable:false
   })
   price_cost:number

   // Product relation 
   @ManyToOne(() => Products , product => product.prices)
   product:Products

   @ManyToOne(() => Position_cat , category => category.prices)
   position_category:Position_cat

   // Created Date
   @CreateDateColumn()
   created_at:Date

   // Updated Date
   @UpdateDateColumn()
   updated_at:Date

}