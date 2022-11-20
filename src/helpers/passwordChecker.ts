import bcrypt from "bcrypt"

// Password hash function
export const passwordHash = (password:string) => {

   return bcrypt.hashSync(password,11);
}

// Password Compare function
 export const passwordCompare = (hash:string,password:string) => {
   return bcrypt.compareSync(hash,password);
}

