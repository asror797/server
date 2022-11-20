import { Entity , Column ,PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn, ManyToMany, OneToMany, ManyToOne, JoinTable, JoinColumn } from "typeorm";
import { Position_cat } from "./position_category.entity";
import { Processes } from "./processes.entity";
import { Users } from "./users.entity";


@Entity({name:"positions"})
export class Positions {
   @PrimaryGeneratedColumn("uuid")
   position_id:string

   // Position Status
   @Column({
      type:"boolean",
      default:true
   })
   is_active:boolean


   @ManyToOne(() => Users , (users) => users.positions)
   @JoinTable()
   user:Users


   @ManyToOne(() => Position_cat  , category => category.positions)
   category:Position_cat


   @OneToMany(()=> Processes , process => process.positions)
   @JoinTable()
   processes:Processes[]
   

   // Created At
   @CreateDateColumn({select:false})
   created_at:Date

   // Update At
   @UpdateDateColumn({select:false})
   updated_at:Date
}