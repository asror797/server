import jwt from "jsonwebtoken";
import { Response } from "express";



export const tokenGenerator = (user_id:string) => {
   console.log(user_id)
   return jwt.sign(user_id,'SECRET_KEY');
}

export const tokenReader = (token:string, res:Response) => {
   return jwt.verify(token,'SECRET_KEY',(err, data) => {
      if (err) res.status(500).json("Token is not valid")
      console.log(data)
      return data;
   });
}