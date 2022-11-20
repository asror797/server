import { Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Position_cat } from "../entities/position_category.entity";



export default {
   GET:async(req:Request,res:Response) => {
      try {
         const position_cat =  await dataSource.getRepository(Position_cat).find({
            relations:['positions','positions.user'],
            
            

         })
         res.json(position_cat)
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   INSERT_CATEGORY:async(req:Request,res:Response) => {
      try {

         const { position_name , position_percent } = req.body

         const { raw } = await dataSource
                        .createQueryBuilder()
                        .insert()
                        .into(Position_cat)
                        .values({
                           position_cat_name:position_name,
                           position_percent:Number(position_percent)
                        })
                        .returning('*')
                        .execute()

         res.json(raw[0])
      } catch (error) {
         console.log(error);
         res.sendStatus(500)
      }
   },
   GET_BY_ID:async(req:Request,res:Response) => {
      try {
         const { id } = req.params

         const positions = await dataSource.getRepository(Position_cat).find({
            relations:['positions','positions.user'],
            where:{
               position_cat_id:id
            }
         })

         res.json(positions[0].positions)

      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   }
}