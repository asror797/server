import { Entity , Column , PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn, OneToMany, JoinTable, ManyToMany } from "typeorm";
import { Companies } from "./companies.entity";
import { Positions } from "./positions.entity";
import { Prices } from "./prices.entity";



@Entity({name:"position_category"})
export class Position_cat {
   @PrimaryGeneratedColumn('uuid')
   position_cat_id:string

   @Column({
      type:"varchar",
      length:64,
      nullable:false
   })
   position_cat_name:string

   @Column({
      type:'int',
      default:0
   })
   position_percent:number

   @Column({
      type:"boolean",
      default:true
   })
   is_active:boolean

   @ManyToMany(() => Companies , company => company.position_category)
   company:Companies

   @OneToMany(() => Prices , prices => prices.position_category)
   prices:Prices[]



   @OneToMany(()=> Positions , positions => positions.category)
   // @JoinTable()
   positions:Positions[]  // true

   @CreateDateColumn({select:false})
   created_at:Date

   @UpdateDateColumn({select:false})
   updated_at:Date
}
