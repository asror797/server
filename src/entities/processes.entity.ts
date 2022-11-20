import { Entity , Column , PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { Orders } from "./order.entity";
import { Positions } from "./positions.entity";
// import { Products } from "./products.entity";



@Entity({name:'processes'})
export class Processes {
   @PrimaryGeneratedColumn('uuid')
   process_id:String

   
   // @Column({
   //    type:'boolean',
   //    default:false
   // })
   // moved_forward:boolean

   @Column({
      type:'boolean',
      default:false
   })
   recieved:boolean


   @Column({
      type:'boolean',
      default:false
   })
   ignored:boolean

   @Column({
      type:'boolean',
      default:false
   })
   is_completed:boolean

   @ManyToOne(() => Positions , positions => positions.processes)
   // @JoinTable()
   positions:Positions

   @ManyToOne(()=>Orders, order => order.processes)
   @JoinTable()
   order:Orders

   @CreateDateColumn({select:false})
   created_at:Date

   @UpdateDateColumn({select:false})
   updated_at:Date
}