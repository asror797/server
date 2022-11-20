import { Request , Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Positions } from "../entities/positions.entity";
import { Users } from "../entities/users.entity";
import { passwordCompare , passwordHash} from "../helpers/passwordChecker";
import { tokenGenerator } from "../helpers/tokenGenerator";
import bot from "../bot/bot"
import { Companies } from "../entities/companies.entity";

export default {
   GET:async(req:Request,res:Response) => {
      try {
         const users = await dataSource.getRepository(Users).find({
            relations:["company","positions","positions.category"]
         })

         res.json(users)
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   GET_BY_USER_ID:async(req:Request,res:Response) => {
      try {

            const user = await dataSource.getRepository(Users).find({
               relations:["positions","positions.category"],
               where:{
                  user_id:req.params.id
               }
            }) 

            res.json(user[0])
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   }, 
   CHECK_USER_FOR_TELEGRAM:async(req:Request,res:Response) => {
      try {
         const { id } = req.params
         console.log(id)
         res.json("ok")
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   INSERT_NEW_USER:async(req:Request,res:Response) => {
      try {

         const { user_fullname , user_password , user_phone_number , user_telegram_id , role , company_id} = req.body

         const hashedPassword = passwordHash(user_password);

         const company = await dataSource.getRepository(Companies).find({
            where:{
               company_id:company_id
            }
         })
                           
         const newUser = new Users()
         newUser.user_fullname = user_fullname
         newUser.user_password = hashedPassword
         newUser.user_phone_number = user_phone_number,
         newUser.user_telegram_id = user_telegram_id
         newUser.role = role
         newUser.company = company[0]

         let savedUser = await dataSource.manager.save(newUser)

         res.json(savedUser)

         // res.json(addedUser[0])
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   INSERT_POSITION:async(req:Request,res:Response) => {
      try { 
         const { user_id , position_id } = req.body

         let User = await dataSource.getRepository(Users).find({
            where:{
               user_id:user_id
            }
         })

         let position = await dataSource.getRepository(Positions).find({
            where:{
               position_id:position_id
            }
         })

         let thisuser = User[0]

         thisuser.positions = [position[0]]
         let savedPosition = await dataSource.manager.save(thisuser)

         res.json(savedPosition)

      } catch (error) {
         console.log(error);
         res.sendStatus(500)
      }
   },
   GET_USER_COUNT:async(req:Request,res:Response) => {
      try {
         const countofEmployers = await dataSource.getRepository(Users).countBy({is_active:true,role:"STAFF"})
         res.json({
            role:"STAFF",
            count:countofEmployers
         })
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   LOGIN_USERS:async(req:Request,res:Response) => {
      try {
         const { phone_number , password } = req.body

         console.log(phone_number,password)

         const user = await dataSource.getRepository(Users).find({
            where:{
               user_phone_number:phone_number
            },
            select:['user_id','user_password']
         })

         console.log(user[0])

         
         if(user[0]) {
            const isProper = passwordCompare(password,user[0].user_password)

            if(isProper) {
               res.json({
                  status:200,
                  token:tokenGenerator(user[0].user_id),
                  message:"successfull"
               })
            } else {
               res.json({
                  status:200,
                  token:"",
                  message:"WrongPasssword"
               })
            }
         } else {
            res.json({
               status:404,
               message:"notFound"
            })
         }

      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   DELETE_USER:async(req:Request,res:Response) => {
      try {
         const { user_id } = req.body
         
         res.json({
            status:200,
            message:"DELETED"
         })
         
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   }
}