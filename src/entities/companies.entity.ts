import { Entity , Column , PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Types } from "./company_types.entity";
import { Position_cat } from "./position_category.entity";
import { Products } from "./product_models.entity";
import { Users } from "./users.entity";



@Entity({name:'companies'})
export class Companies {
   @PrimaryGeneratedColumn('uuid')
   company_id:string

   @Column({
      type:'varchar',
      length:64
   })
   company_name:string

   @OneToMany(() => Products , product => product.company)
   models:Products[]

   @OneToMany(() => Users, user => user.company)
   users:Users[]

   @OneToMany(() => Position_cat , position_cat => position_cat.company)
   position_category:Position_cat[]
   
   @ManyToOne(() => Types , type => type.companies)
   company_type:Types
}