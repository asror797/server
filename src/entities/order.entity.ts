import { Entity , PrimaryGeneratedColumn , Column , CreateDateColumn , UpdateDateColumn, OneToMany, ManyToOne, JoinTable, OneToOne } from "typeorm";
import { Processes } from "./processes.entity";
import { Products } from "./product_models.entity";



@Entity({name:'orders'})
export class Orders {
   @PrimaryGeneratedColumn('uuid')
   order_id:string

   @Column({
      type:'int',
      nullable:false
   })
   order_factory_id:Number

   @Column({
      type:'varchar',
      length:32,
      nullable:false
   })
   tissue:string

   @Column({
      type:"timestamp",
      default:() => "CURRENT_TIMESTAMP"
   })
   delivery_date:Date

   @Column({
      type:'boolean',
      default:false
   })
   is_completed:Boolean

   @Column({
      type:'boolean',
      default:false
   })
   is_shipped:Boolean
   
   @OneToMany(() => Processes , process => process.order)
   processes:Processes[]


   @ManyToOne(() => Products , product => product.orders)
   @JoinTable()
   product:Products
   
   @CreateDateColumn({select:false})
   created_at:Date

   @UpdateDateColumn({select:false})
   updated_at:Date
}