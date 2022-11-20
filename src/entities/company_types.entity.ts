import { Entity , Column , PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Companies } from "./companies.entity";



@Entity({name:"company_types"})

export class Types {
   @PrimaryGeneratedColumn('uuid')
   company_type_id:string

   @Column({
      type:'varchar',
      length:128,
      nullable:false
   })
   company_type_name:string

   @OneToMany(() => Companies , company => company.company_type)
   companies:Companies[]
}