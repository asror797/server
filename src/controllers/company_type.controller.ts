import { Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Types } from "../entities/company_types.entity";



export default  {
   GET:async(req:Request,res:Response) => {
      try {
         const types = await dataSource.getRepository(Types).find()
         res.json(types)
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   INSERT_TYPE_OF_COMPANY:async(req:Request,res:Response) => {
      try {
         const { type_name } = req.body

         const newType = await dataSource
                           .createQueryBuilder()
                           .insert()
                           .into(Types)
                           .values({
                              company_type_name:type_name
                           })
                           .returning('*')
                           .execute()
         res.json(newType)
      } catch (error) {
            console.log(error)
            res.sendStatus(500)
      }
   }

}