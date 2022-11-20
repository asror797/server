import { Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Orders } from "../entities/order.entity";
import { Products } from "../entities/product_models.entity";
import { Processes } from "../entities/processes.entity";
import { Positions } from "../entities/positions.entity";
import bot from "../bot/bot";




export default {
   GET:async(req:Request,res:Response) => {
      try {
         const orders = await dataSource.getRepository(Orders).find({
            relations:['product','processes','processes.positions','processes.positions.category']
         })

         res.json(orders)
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   GET_BY_ID:async(req:Request,res:Response) => {
      try {
         const { id } = req.params

         const order = await dataSource.getRepository(Orders).find({
            relations:['product','processes','processes.positions','processes.positions.category'],
            where:{
               order_id:id
            },
            order:{
               processes:{
                  positions:{
                     category:{
                        position_percent:'ASC'
                     }
                  }
               }
            }

         })

         res.json(order[0])

      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   INSERT_ORDER:async(req:Request,res:Response) => {
      try {
         const { order_id,  product_name , shipping_date , tissue_name } = req.body

         let existProduct = await dataSource.getRepository(Products).find({
            where:{
               product_name:product_name.trim()
            }
         })


         if(existProduct[0]) {

            let newOrder = new Orders()
            newOrder.order_factory_id = order_id
            newOrder.product = existProduct[0]
            newOrder.delivery_date = shipping_date
            newOrder.tissue = tissue_name
            let savedOrder = await dataSource.manager.save(newOrder)
            console.log(savedOrder)
            res.json(savedOrder)
         }else {
            let { raw } = await dataSource
                              .createQueryBuilder()
                              .insert()
                              .into(Products)
                              .values({
                                 product_name:product_name.trim()
                              })
                              .returning('*')
                              .execute()
            
            let newOrder = new Orders()
            newOrder.order_factory_id = order_id
            newOrder.product = raw[0]
            newOrder.delivery_date = shipping_date
            newOrder.tissue = tissue_name
            let savedOrder = await dataSource.manager.save(newOrder)
            res.json(savedOrder)
         }
         
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   INSERT_PROCESS:async(req:Request,res:Response) => {
      try {
         const { position_id , order_id } = req.body

         let position = await dataSource.getRepository(Positions).find({
            relations:{
               user:true
            },
            where:{
               position_id:position_id
            }
         })

         bot.sendMessage(position[0].user.user_telegram_id,'Sizga ish tayyinlandie')
         let newProcess = new Processes()
         newProcess.positions = position[0]



         let savedProcess = await dataSource.manager.save(newProcess)

         let order = await dataSource.getRepository(Orders).find({
            where:{
               order_id:order_id
            }
         })

         let Order = order[0]

         if(order[0]) {
            Order.processes = [savedProcess]
            let savedOrder = await dataSource.manager.save(Order)
            res.json(savedOrder)
         }else {
            res.json("error")
         }

      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   }
}