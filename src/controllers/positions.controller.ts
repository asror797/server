import { Request,Response} from "express"
import { dataSource } from "../config/ormconfig";
import { Positions } from "../entities/positions.entity";
import { Position_cat } from "../entities/position_category.entity";
import { Users } from "../entities/users.entity";


export default {
   GET:async(req:Request,res:Response) => {
      try {
         const positions = await dataSource.getRepository(Positions).find({
            relations:{
               category:true,
               user:true,
               processes:true
            }
         })
         res.json(positions)
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   INSERT_POSITION:async(req:Request,res:Response) => {
      try {

         const { category_id , staff_id } = req.body


         let category = await dataSource.getRepository(Position_cat).find({
            where:{
               position_cat_id:category_id
            }
         })

         let staff = await dataSource.getRepository(Users).find({
            where:{
               user_id:staff_id
            }
         })



         let newPosition = new Positions()
         newPosition.user = staff[0]
         newPosition.category = category[0]
         let savedItem = await dataSource.manager.save(newPosition)

         res.json(savedItem)
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   GET_BY_CATEGORY:async(req:Request,res:Response) => {
      try {
         const users = await dataSource.getRepository(Positions).find()
            
        
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   }
}




