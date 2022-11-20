import { Request , Response } from "express";
import bot from "../bot/bot";
import { dataSource } from "../config/ormconfig";
import { Orders } from "../entities/order.entity";
import { Positions } from "../entities/positions.entity";
import { Processes } from "../entities/processes.entity";




export default {
   GET:async(req:Request,res:Response) => {
      try {
         const processes = await dataSource.getRepository(Processes).find({
            relations:['positions','positions.category']
         })

         res.json(processes)
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   INSERT_NEW_PROCESS:async(req:Request,res:Response) => {
      try {
         
         const { position_id , order_id } = req.body

         let order = await dataSource.getRepository(Orders).find({
            relations:{
               product:true
            },
            where:{
               order_id:order_id
            }
         })

         let position = await dataSource.getRepository(Positions).find({
            relations:{
               user:true,
               category:true
            },
            where:{
               position_id:position_id
            }
         })


         let NewProcess = new Processes()
         NewProcess.order = order[0]
         NewProcess.positions = position[0]

         let savedProcess = await dataSource.manager.save(NewProcess)

         const button = JSON.stringify({
            reply_markup: {
               inline_keyboard: [
                   [
                       {
                           text: `sample text`,
                           callback_data: 'callbackData',
                       }
                   ]
               ]
            }
         })

         if(savedProcess) {
            bot.sendMessage(position[0].user.user_telegram_id,`ID: #${order[0].order_factory_id}\nproduct:${order[0].product.product_name} shu ish sizga yuklandi`,{
               reply_markup:{
                  inline_keyboard:[
                     [
                        {
                           text:"Ishni Tugatdim",
                           callback_data:"orderGet"
                        }
                     ]
                  ]
               }
            })
            res.json(savedProcess)
         }else {
            res.sendStatus(500)
         }
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   }
}