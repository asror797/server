import { Request , Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Companies } from "../entities/companies.entity";
import { Types } from "../entities/company_types.entity";



export default {
   GET:async(req:Request,res:Response) => {
      try {
         const companies = await dataSource.getRepository(Companies).find({
            relations:{
               company_type:true
            }
         })  

         res.json(companies)

      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },


   INSERT_COMPANIES:async(req:Request,res:Response) => {
      try {
         const { company_name , type_id } = req.body


         let type = await dataSource.getRepository(Types).find({
            where: {
               company_type_id:type_id
            }
         })
         
         const newCompany = new Companies()
         newCompany.company_name = company_name
         newCompany.company_type = type[0]
         let savedCompany = await dataSource.manager.save(newCompany)

         res.json(savedCompany)
         
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   }
}


