import TelegramBot from "node-telegram-bot-api"
import { Users } from "../entities/users.entity"
import { dataSource } from "../config/ormconfig"
const TOKEN = "5708840997:AAF1aA79M_u3UytBQ6J42BYFS7HM3w2W5cw"



const bot = new TelegramBot(TOKEN,{polling:true})

var option = {
   "reply_markup": {
       "keyboard": [
         [
            {
            text: "My phone number",
            request_contact: true
            }
         ]
      ],
      resize_keyboard:true
   }
};

var balance  = {
   "reply_markup": {
       "keyboard": [
         [
            {
               text: "Balance"
            },
            {
               text: "Profile"
            }
         ]
      ],
      resize_keyboard:true
   }
};

bot.on('message',async(msg) => {
   if(msg.text === '/start') {
      let user = await dataSource.getRepository(Users).find({
         where:{
            user_telegram_id:msg.chat.id
         }
      })

      if(user[0]) {
         bot.sendMessage(msg.chat.id,`Assalomu alaykum ${user[0].user_fullname}`,balance)
      }else {
         bot.sendMessage(msg.chat.id,"Siz ro'yhatdan o'tmagansiz",option)
      }
   } else if(msg.text === 'Balance') {
      bot.sendMessage(msg.chat.id,'Balance')
   }else {
      bot.sendMessage(msg.chat.id,'Profile')
   }
})


bot.on("contact",(msg)=>{

   ;(async()=>{

      let user = await dataSource.getRepository(Users).find({
         where:{
            user_phone_number:msg.contact?.phone_number
         }
      })

      if(user[0]) {
         bot.sendMessage(msg.chat.id,'Royhatdan otgansiz')
      }else {

         let { raw } = await dataSource
                        .createQueryBuilder()
                        .insert()
                        .into(Users)
                        .values({
                           role:'STAFF',
                           user_fullname:`${msg.chat.first_name ? msg.chat.first_name : '' } ${msg.chat.last_name ? msg.chat.last_name : '' } `,
                           user_phone_number:`${msg.contact?.phone_number}`,
                           user_telegram_id:msg.contact?.user_id,
                           user_password:'12345678'
                        })
                        .returning('*')
                        .execute()
         if(raw) {
            console.log(raw)
            bot.sendMessage(msg.chat.id ,"Siz ro'yhatdan o'tdingiz",balance)
         }else {
            bot.sendMessage(msg.chat.id,'Error occured')
         }
      }


   })()

})


bot.on("polling_error",console.log)



export default bot;