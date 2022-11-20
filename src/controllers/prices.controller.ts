import { Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Position_cat } from "../entities/position_category.entity";
import { Prices } from "../entities/prices.entity";
import { Products } from "../entities/product_models.entity";




export default { 
   GET:async(req:Request , res:Response) => {
      try {
         const prices = await dataSource.getRepository(Prices).find({
            relations:{
               product:true,
               position_category:true
            }
         })
         res.json(prices)
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   INSERT_PRICE:async(req:Request,res:Response) => {
      try {
         const { price_cost , product_id , position_category_id } = req.body

         let product = await dataSource.getRepository(Products).find({
            where:{
               product_id:product_id
            }
         })


         let position_category = await dataSource.getRepository(Position_cat).find({
            where:{
               position_cat_id:position_category_id
            }
         })

         let newprice = new Prices()
         newprice.price_cost = price_cost
         newprice.product = product[0]
         newprice.position_category = position_category[0]

         let savedPrice = await dataSource.manager.save(newprice)

         res.json(savedPrice)

      } catch (error) {
         console.log(error);
         res.sendStatus(500)
      }
   },
   UPDATE_COST:async(req:Request,res:Response) => {
      try {
         const { price_id , price_cost } = req.body

         let updatePrice = await dataSource
                              .createQueryBuilder()
                              .update(Prices)
                              .set({price_cost:price_cost})
                              .where("price_id = :price_id",{price_id:price_id})
                              .returning('*')
                              .execute()
         res.json(updatePrice)

      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   }
}