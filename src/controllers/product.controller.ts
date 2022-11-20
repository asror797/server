import { Request,Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Prices } from "../entities/prices.entity";
import { Products } from "../entities/product_models.entity";



export default {
   GET:async(req:Request,res:Response) => {
      try {
         const products = await dataSource.getRepository(Products).find()
         res.json(products)
         
      } catch (error) {
         console.log(error);
         res.sendStatus(500)
      }
   },
   GET_PRODUCT_BY_ID:async(req:Request,res:Response) => {
      try {

         let product = await dataSource.getRepository(Products).findOne({where:{product_id:req.params.id},relations:['company','prices','orders']})

         res.json(product)

      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   INSERT_PRODUCT:async(req:Request,res:Response) => {
      try {
         const { product_name } = req.body
         const { raw } =  await dataSource
                           .createQueryBuilder()
                           .insert()
                           .into(Products)
                           .values({
                              product_name:product_name,
                           })
                           .returning('*')
                           .execute()

         res.json(raw[0])

      } catch (error) {
         console.log(error);
         res.sendStatus(500)
      }
   },
   UPDATE_PRODUCT:async(req:Request,res:Response) => {
      try {
         const { product_name } = req.body
      } catch (error) {
         console.log(error);
         res.sendStatus(500)
      }
   },
   DELETE_PRODUCT:async(req:Request,res:Response) => {
      try {

      } catch (error) {
         console.log(error);
         res.sendStatus(500)
      }
   }
}