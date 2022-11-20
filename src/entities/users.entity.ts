import { Entity ,
         Column , 
         PrimaryGeneratedColumn , 
         CreateDateColumn , 
         UpdateDateColumn ,
         ManyToMany,
         JoinTable,
         OneToMany,
         ManyToOne,
      } from "typeorm";
import { Companies } from "./companies.entity";

import { Positions } from "./positions.entity";






@Entity({name:"users"})
export class Users {
   @PrimaryGeneratedColumn("uuid")
   user_id:string

   // User Fullname
   @Column({
      type:"varchar",
      length:128,
      nullable:false
   })
   user_fullname:string

   // User Phone number 
   @Column({
      type:"varchar",
      length:64,
      unique:true,
      nullable:false
   })
   user_phone_number:string

   // User telegram Id
   @Column({
      type:"bigint",
      nullable:false
   })
   user_telegram_id:number


   // User confirimed
   @Column({
      type:"boolean",
      default:false
   })
   is_confirmed:boolean

   // User Status
   @Column({
      type:"boolean",
      default:true
   })
   is_active:boolean


   // User role
   @Column({
      type:"enum",
      enum:["SUPER_ADMIN","ADMIN","STAFF","CASHIER"],
      nullable:false,
      select:false
   })
   role:string

   // User Password
   @Column({
      type:"varchar",
      length:512,
      nullable:false,
      select:false
   })
   user_password:string

   @ManyToOne(() => Companies , company => company.users)
   company:Companies


   @OneToMany(() => Positions , (positions) => positions.user)
   // @JoinTable()
   positions:Positions[]

   // Created Date
   @CreateDateColumn({select:false})
   created_at:Date

   // Updated Date
   @UpdateDateColumn({select:false})
   updated_at:Date

}




