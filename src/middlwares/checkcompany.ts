import { Request , Response , NextFunction } from "express";
import { dataSource } from "../config/ormconfig";
import { Users } from "../entities/users.entity";
import { IncomingHttpHeaders } from 'http';
import { passwordCompare } from "./../helpers/passwordChecker"
import { tokenReader} from "../helpers/tokenGenerator"

interface CustomRequest extends Request {
   headers           : IncomingHttpHeaders & {
      token?: string
   }
}


export const checkCompany = async(req:CustomRequest,res:Response,next:NextFunction) => {

   
   try {
     
      const token = req.headers.token  

      console.log(token)

      if(token) {

         const id = tokenReader(token,res)

         console.log(id)

         if(!( id === undefined) ) {

            let user = await dataSource.getRepository(Users).find({
               where:{
                  user_id:id
               },
               select:['user_id','role'],
               relations:['company']
            })

            console.log(user[0])

            if(user[0].role == 'ADMIN') {

               req.body.company_id = user[0].company.company_id

               next()
            }else {
               res.json([])
            }
         }else {
            res.json([])
         }
      }else {
         res.json([])
      }

   } catch (error) {
      console.log(error)
      res.sendStatus(500)
   }
}
